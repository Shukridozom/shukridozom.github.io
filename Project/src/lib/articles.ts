import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const articlesRoot = path.join(process.cwd(), 'src', 'content', 'Articles');

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

function isDirectory(entryPath: string): boolean {
  return fs.statSync(entryPath).isDirectory();
}

function readOptionalSummary(topicDir: string): string | null {
  const summaryPath = path.join(topicDir, 'summary.txt');
  if (!fs.existsSync(summaryPath)) return null;
  const text = fs.readFileSync(summaryPath, 'utf8').trim();
  return text.length > 0 ? text : null;
}

export function getTopics(): Topic[] {
  if (!fs.existsSync(articlesRoot)) return [];

  return fs
    .readdirSync(articlesRoot)
    .map((name) => path.join(articlesRoot, name))
    .filter(isDirectory)
    .map((topicDir) => {
      const title = path.basename(topicDir);
      const slug = encodeURIComponent(title);
      const articles = fs
        .readdirSync(topicDir)
        .map((name) => path.join(topicDir, name))
        .filter(isDirectory)
        .filter((articleDir) => fs.existsSync(path.join(articleDir, 'page.md')))
        .map((articleDir) => {
          const articleTitle = path.basename(articleDir);
          return {
            title: articleTitle,
            slug: encodeURIComponent(articleTitle),
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
  const topicTitle = decodeURIComponent(topicSlug);
  const articleTitle = decodeURIComponent(articleSlug);
  const pagePath = path.join(articlesRoot, topicTitle, articleTitle, 'page.md');

  if (!fs.existsSync(pagePath)) return null;

  const markdown = fs.readFileSync(pagePath, 'utf8');
  const html = marked.parse(markdown, { async: false }) as string;

  return {
    title: articleTitle,
    slug: encodeURIComponent(articleTitle),
    topicSlug: encodeURIComponent(topicTitle),
    topicTitle,
    html,
  };
}

export function getAllArticles(): ArticleSummary[] {
  return getTopics().flatMap((topic) => topic.articles);
}
