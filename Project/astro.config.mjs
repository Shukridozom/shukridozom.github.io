import { defineConfig } from 'astro/config';
import { syncAllArticleAssets } from './src/lib/articles.ts';

/** Ensure article images land in `public/` before Astro copies it to `dist/`. */
function articleAssetsIntegration() {
  return {
    name: 'article-assets',
    hooks: {
      'astro:config:setup': () => {
        syncAllArticleAssets();
      },
    },
  };
}

// Update `site` to your GitHub username (or custom domain) when the remote is known.
export default defineConfig({
  site: 'https://shukridozom.com',
  base: '/',
  integrations: [articleAssetsIntegration()],
});
