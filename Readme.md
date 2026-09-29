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

## Updating site content

### Home (photo and personal details)

1. Open [`Project/src/data/site.ts`](Project/src/data/site.ts).
2. Update these fields:
   - `name` — display name on the home page and in the nav
   - `jobTitle` — title shown under your name
   - `about` — short introduction / About Me text
   - `photo` — filename of your profile image (see next step)
3. To change the photo:
   1. Put your image in [`Project/public/`](Project/public/) (for example `me.jpg` or `profile.png`).
   2. Set `photo` in `site.ts` to that filename, e.g. `photo: 'me.jpg'`.
4. Restart or refresh `npm run dev` to preview. Push to `main` to publish.

### Contact Me

1. Open [`Project/src/data/site.ts`](Project/src/data/site.ts).
2. Update:
   - `phone` — shown on the Contact page (can include spaces for display)
   - `whatsapp` — digits only, with country code (no `+` or spaces), used for the WhatsApp link
   - `email` — mailto link on Contact
   - `linkedin` — full LinkedIn profile URL
3. Preview on `/contact`, then push to `main` to publish.

### Articles (where to add them)

Articles live under [`Project/Articles/`](Project/Articles/). Folder names become titles; URLs use hyphenated slugs (e.g. `Getting Started` → `/articles/getting-started/...`).

1. Create a topic folder: `Project/Articles/Your Topic Name/`
2. Optional: add `summary.txt` in that folder (shown on the Articles cards page).
3. Create an article folder inside the topic: `Project/Articles/Your Topic Name/Your Article Name/`
4. Add the Markdown content as `page.md` inside that article folder.
5. Preview at `/articles`. Open an article from the topic card list.

Layout:

```text
Project/Articles/
├── Topic Name/
│   ├── summary.txt          (optional)
│   └── Article Name/
│       └── page.md          (required)
```

Example already in the repo: [`Project/Articles/Getting Started/Welcome/page.md`](Project/Articles/Getting%20Started/Welcome/page.md).

### Projects (where to add them)

There is no projects content folder yet. The Projects page is a placeholder.

1. Edit [`Project/src/pages/projects.astro`](Project/src/pages/projects.astro) to change the empty-state text or add project listings manually.
2. Preview at `/projects`.
3. When a fuller projects system is added later, this section of the Readme will be updated with a dedicated content folder.
