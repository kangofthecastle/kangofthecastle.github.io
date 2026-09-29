# Warren — personal website

A static, GitHub Pages-ready personal site for projects, notes, and contact information. Its visual direction is a Vancouver harbour print: warm paper, green ink, restrained red, serif headings and real project captures. The shared design rules are documented in [DESIGN.md](DESIGN.md).

## Local development

```bash
npm install
npm run dev
```

Astro serves the site at [http://127.0.0.1:4321](http://127.0.0.1:4321) by default.

```bash
npm run check
npm run build
npm run preview
```

The production build is written to `dist/`.

## Where content lives

- Identity, GitHub profile, email, and global metadata: `src/data/site.ts`
- Project summaries and case-study content: `src/data/projects.ts`
- Blog posts: Markdown in `src/content/notes/`
- Art-directed project covers: `public/images/projects/*.svg`
- Approved real screenshots/video: `public/images/projects/`

The first note is deliberately marked `draft: true`. Change the frontmatter and set `draft: false` when the first real post is ready.

## Visual and motion system

- Astro generates plain static pages.
- `src/styles/global.css` is the single shared visual system.
- Self-hosted Instrument Serif and DM Sans fonts live in `public/fonts/` with their licenses.
- `src/components/HarbourPrint.astro` supplies the homepage's SVG illustration.
- `src/scripts/motion.ts` handles brief entrances and bounded harbour parallax. There are no pinned scroll sections.
- Project content follows the same normal scrolling order on desktop and mobile.
- `prefers-reduced-motion` uses the static composition without entrance or parallax effects.
- FreeCAT screenshots use keyboard-operable buttons, with one image visible at a time.

## Project-media rules

Project pages are designed for real artifacts, not only repository links. Before adding captures:

1. Remove private names, letters, student data, credentials, and proprietary source material.
2. Prefer a short muted WebM/MP4 plus a poster image over an animated GIF.
3. Export screenshots as WebP or AVIF where possible.
4. Explain what the viewer is seeing in the caption.
5. Keep the prototype SVG until the real capture is approved.

`HUBRIS` currently includes two real, locally captured screens.

## GitHub Pages

The repository includes `.github/workflows/deploy.yml`, using Astro’s official GitHub Pages action. The Astro `site` is configured as `https://kangofthecastle.github.io`.

The root Pages repository is `kangofthecastle/kangofthecastle.github.io`.

To recreate the remote from a fresh checkout:

```bash
gh repo create kangofthecastle/kangofthecastle.github.io --public --source=. --remote=origin --push
```

Then set **Settings → Pages → Source** to **GitHub Actions** if GitHub does not select it automatically.
