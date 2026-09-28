# shukridozom.com

Personal portfolio website built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Local development

```bash
cd Project
npm install
npm run dev
```

Build for production:

```bash
cd Project
npm run build
npm run preview
```

## GitHub Pages setup

1. Push this repository to GitHub.
2. In the repo **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Merge (or push) to `main` to trigger the deploy workflow (`.github/workflows/deploy.yml`).

### Site URL / base path

The site is configured with `base: '/'` (root URL), e.g. `https://<USERNAME>.github.io/` or a custom domain.

Update `site` in [`Project/astro.config.mjs`](Project/astro.config.mjs) to match your real GitHub Pages URL.

## Placeholders

Edit personal details in [`Project/src/data/site.ts`](Project/src/data/site.ts) (name, title, about, photo, phone, email, LinkedIn).

## Articles

Add topics and articles under `Project/src/content/Articles/` using this layout:

```text
Articles/
├── Topic Name/
│   ├── summary.txt
│   └── Article Name/
│       └── page.md
```
