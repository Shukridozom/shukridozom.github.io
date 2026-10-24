import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const articlesRoot = path.join(process.cwd(), 'Articles');
const articleAssetsPublicRoot = 'article-assets';

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

/** Leading number from a title like "11. My Article" → 11. */
function leadingNumber(title: string): number | null {
  const match = title.trim().match(/^(\d+)/);
  return match ? Number(match[1]) : null;
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

function resolvePagePath(articleDir: string): string | null {
  for (const name of ['page.md', 'Page.md']) {
    const candidate = path.join(articleDir, name);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
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

function compareByLeadingNumber(aTitle: string, bTitle: string): number {
  const aNum = leadingNumber(aTitle);
  const bNum = leadingNumber(bTitle);

  if (aNum != null && bNum != null && aNum !== bNum) {
    return aNum - bNum;
  }
  if (aNum != null && bNum == null) return -1;
  if (aNum == null && bNum != null) return 1;
  return aTitle.localeCompare(bTitle, undefined, { sensitivity: 'base' });
}

/** Copy article `assets/` into public so Astro can serve the files. */
function copyArticleAssets(articleDir: string, topicSlug: string, articleSlug: string): void {
  const srcAssets = path.join(articleDir, 'assets');
  if (!fs.existsSync(srcAssets) || !isDirectory(srcAssets)) return;

  const dest = path.join(
    process.cwd(),
    'public',
    articleAssetsPublicRoot,
    topicSlug,
    articleSlug,
  );

  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(srcAssets, dest, { recursive: true });
}

/**
 * Copy every article `assets/` folder into `public/article-assets/` before the
 * build. Astro syncs `public` → `dist` before pages render, so copying only
 * inside `getArticle` leaves images out of the deploy.
 */
export function syncAllArticleAssets(): void {
  if (!fs.existsSync(articlesRoot)) return;

  for (const topicName of fs.readdirSync(articlesRoot)) {
    const topicDir = path.join(articlesRoot, topicName);
    if (!isDirectory(topicDir)) continue;

    const topicSlug = toSlug(topicName);

    for (const articleName of fs.readdirSync(topicDir)) {
      const articleDir = path.join(topicDir, articleName);
      if (!isDirectory(articleDir)) continue;
      if (!resolvePagePath(articleDir)) continue;

      copyArticleAssets(articleDir, topicSlug, toSlug(articleName));
    }
  }
}

function isAbsoluteOrExternalUrl(url: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(url);
}

/** Rewrite relative media `src` paths to the published article-assets URL. */
function rewriteRelativeMediaUrls(
  html: string,
  topicSlug: string,
  articleSlug: string,
): string {
  const base = `/${articleAssetsPublicRoot}/${topicSlug}/${articleSlug}`;

  return html.replace(/\bsrc=(["'])([^"']+)\1/gi, (match, quote: string, src: string) => {
    if (isAbsoluteOrExternalUrl(src)) return match;
    if (src.includes('..')) return match;

    let rel = src.replace(/^\.\//, '');
    if (rel.startsWith('assets/')) {
      rel = rel.slice('assets/'.length);
    }

    return `src=${quote}${base}/${rel}${quote}`;
  });
}

function listArticles(topicDir: string, topicTitle: string, topicSlug: string): ArticleSummary[] {
  return fs
    .readdirSync(topicDir)
    .map((name) => path.join(topicDir, name))
    .filter(isDirectory)
    .filter((articleDir) => resolvePagePath(articleDir) != null)
    .map((articleDir) => {
      const articleTitle = path.basename(articleDir);
      return {
        title: articleTitle,
        slug: toSlug(articleTitle),
        topicSlug,
        topicTitle,
      };
    })
    .sort((a, b) => compareByLeadingNumber(a.title, b.title));
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
      return {
        title,
        slug,
        summary: readOptionalSummary(topicDir),
        articles: listArticles(topicDir, title, slug),
      };
    })
    .sort((a, b) => compareByLeadingNumber(a.title, b.title));
}

export function getTopic(topicSlug: string): Topic | null {
  return getTopics().find((topic) => topic.slug === topicSlug) ?? null;
}

export function getArticle(topicSlug: string, articleSlug: string): Article | null {
  const topicDir = findDirBySlug(articlesRoot, topicSlug);
  if (!topicDir) return null;

  const articleDir = findDirBySlug(topicDir, articleSlug);
  if (!articleDir) return null;

  const pagePath = resolvePagePath(articleDir);
  if (!pagePath) return null;

  const topicTitle = path.basename(topicDir);
  const articleTitle = path.basename(articleDir);
  const resolvedTopicSlug = toSlug(topicTitle);
  const resolvedArticleSlug = toSlug(articleTitle);

  copyArticleAssets(articleDir, resolvedTopicSlug, resolvedArticleSlug);

  const markdown = fs.readFileSync(pagePath, 'utf8');
  const rawHtml = marked.parse(markdown, { async: false }) as string;
  const html = rewriteRelativeMediaUrls(rawHtml, resolvedTopicSlug, resolvedArticleSlug);

  return {
    title: articleTitle,
    slug: resolvedArticleSlug,
    topicSlug: resolvedTopicSlug,
    topicTitle,
    html,
  };
}

export function getAllArticles(): ArticleSummary[] {
  return getTopics().flatMap((topic) => topic.articles);
}
