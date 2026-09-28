import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const articlesRoot = path.join(process.cwd(), 'Articles');

export interface Topic {
  title: string;
  slug: string;
  summary: string | null;
  articles: ArticleSummary[];
}

export interface ArticleSummary {
  title: string;
  slug: string;
  topicSlug: string;
  topicTitle: string;
}

export interface Article extends ArticleSummary {
  html: string;
}

/** URL-safe slug from a folder title (spaces → hyphens). */
export function toSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isDirectory(entryPath: string): boolean {
  return fs.statSync(entryPath).isDirectory();
}

function readOptionalSummary(topicDir: string): string | null {
  const summaryPath = path.join(topicDir, 'summary.txt');
  if (!fs.existsSync(summaryPath)) return null;
  const text = fs.readFileSync(summaryPath, 'utf8').trim();
  return text.length > 0 ? text : null;
}

function findDirBySlug(parentDir: string, slug: string): string | null {
  if (!fs.existsSync(parentDir)) return null;

  const match = fs
    .readdirSync(parentDir)
    .map((name) => path.join(parentDir, name))
    .filter(isDirectory)
    .find((dir) => toSlug(path.basename(dir)) === slug);

  return match ?? null;
}

export function getTopics(): Topic[] {
  if (!fs.existsSync(articlesRoot)) return [];

  return fs
    .readdirSync(articlesRoot)
    .map((name) => path.join(articlesRoot, name))
    .filter(isDirectory)
    .map((topicDir) => {
      const title = path.basename(topicDir);
      const slug = toSlug(title);
      const articles = fs
        .readdirSync(topicDir)
        .map((name) => path.join(topicDir, name))
        .filter(isDirectory)
        .filter((articleDir) => fs.existsSync(path.join(articleDir, 'page.md')))
        .map((articleDir) => {
          const articleTitle = path.basename(articleDir);
          return {
            title: articleTitle,
            slug: toSlug(articleTitle),
            topicSlug: slug,
            topicTitle: title,
          };
        })
        .sort((a, b) => a.title.localeCompare(b.title));

      return {
        title,
        slug,
        summary: readOptionalSummary(topicDir),
        articles,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getArticle(topicSlug: string, articleSlug: string): Article | null {
  const topicDir = findDirBySlug(articlesRoot, topicSlug);
  if (!topicDir) return null;

  const articleDir = findDirBySlug(topicDir, articleSlug);
  if (!articleDir) return null;

  const pagePath = path.join(articleDir, 'page.md');
  if (!fs.existsSync(pagePath)) return null;

  const topicTitle = path.basename(topicDir);
  const articleTitle = path.basename(articleDir);
  const markdown = fs.readFileSync(pagePath, 'utf8');
  const html = marked.parse(markdown, { async: false }) as string;

  return {
    title: articleTitle,
    slug: toSlug(articleTitle),
    topicSlug: toSlug(topicTitle),
    topicTitle,
    html,
  };
}

export function getAllArticles(): ArticleSummary[] {
  return getTopics().flatMap((topic) => topic.articles);
}
