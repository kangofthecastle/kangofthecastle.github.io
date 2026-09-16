# Warren — personal website

A static, GitHub Pages-ready personal site for projects, field notes, interests, and contact information. The visual concept is **Rainline Workshop**: a dark, tactile field notebook from Vancouver after rain, with project artifacts providing the light.

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
- GSAP + ScrollTrigger handles the short focus/parallax transitions on the homepage.
- CSS handles the Vancouver scene, depth layers, lighting, and all responsive layout.
- Mobile removes the desktop depth corridor in favor of a normal linear reading order.
- `prefers-reduced-motion` disables parallax, blur movement, and reveal choreography.

Three.js was intentionally left out of this first version: the rainy-window depth reads clearly with CSS layers, while avoiding a persistent WebGL canvas on a content-first site. It can still be introduced later if an actual interactive scene earns the cost.

## Project-media rules

Project pages are designed for real artifacts, not only repository links. Before adding captures:

1. Remove private names, letters, student data, credentials, and proprietary source material.
2. Prefer a short muted WebM/MP4 plus a poster image over an animated GIF.
3. Export screenshots as WebP or AVIF where possible.
4. Explain what the viewer is seeing in the caption.
5. Keep the prototype SVG until the real capture is approved.

`HUBRIS / Goldwake` currently includes two real, locally captured screens. The other case studies intentionally retain prototype compositions until their privacy/publication boundaries are confirmed.

## GitHub Pages

The repository includes `.github/workflows/deploy.yml`, using Astro’s official GitHub Pages action. The Astro `site` is configured as `https://kangofthecastle.github.io`.

The root Pages repository is `kangofthecastle/kangofthecastle.github.io`.

To recreate the remote from a fresh checkout:

```bash
gh repo create kangofthecastle/kangofthecastle.github.io --public --source=. --remote=origin --push
```

Then set **Settings → Pages → Source** to **GitHub Actions** if GitHub does not select it automatically.
