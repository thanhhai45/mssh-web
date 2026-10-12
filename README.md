# mssh-web

The product page for [mssh](https://github.com/thanhhai45/mssh): one static page,
built with Next.js and published to GitHub Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

`next dev` serves at the root. The build is served under `/mssh-web/`, because
that is where GitHub Pages puts a project site. Everything about the site — its URL, the version it offers, the
download links — lives in [`src/lib/site.ts`](src/lib/site.ts).

## Check and build

```bash
npm run typecheck
npm run lint
npm run build      # static HTML in out/
```

`next build` writes a plain static site to `out/`: no server, no API routes.

## Publish

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
publishes on every push to `main`. Once, in the repository settings:
**Pages → Source → GitHub Actions**.

The site URL defaults to `https://<owner>.github.io/<repo>`. For a domain of its
own, set the repository variable `SITE_URL` (Settings → Secrets and variables →
Actions → Variables), e.g. `https://mssh.dev`. The base path follows from it:
canonical links, Open Graph images, `sitemap.xml` and `robots.txt` all use it.

## After each mssh release

Change `version` in [`src/lib/site.ts`](src/lib/site.ts). The download buttons
link to that exact `.dmg` and `.zip`, and the structured data reports it.

## SEO

| What | Where |
|---|---|
| Title, description, keywords, canonical, robots | `metadata` in [`src/app/layout.tsx`](src/app/layout.tsx), text from `site.ts` |
| Open Graph / Twitter card (1200×630) | [`src/app/opengraph-image.png`](src/app/opengraph-image.png), `twitter-image.png`, with `.alt.txt` |
| Structured data | JSON-LD in `layout.tsx`: `SoftwareApplication` (free, macOS, version, download URL) and `FAQPage` |
| FAQ | [`src/lib/faqs.ts`](src/lib/faqs.ts) — one list, shown on the page and sent as FAQPage, so they cannot disagree |
| Sitemap, robots | [`src/app/sitemap.ts`](src/app/sitemap.ts), [`src/app/robots.ts`](src/app/robots.ts) |
| Icons | `src/app/icon.png`, `apple-icon.png` — the app icon |

## Screenshots

Every screenshot is the real mssh frontend, running in a headless browser
against a fake Wails bridge with made-up data
([`scripts/screenshots/mock-wails.js`](scripts/screenshots/mock-wails.js)) — no
real servers, no real accounts. To take them again after the UI changes:

```bash
cd scripts/screenshots
npm install                 # puppeteer, kept apart so the site build never downloads Chrome
./serve.sh &                # mssh's frontend + the fake bridge on :5192 (mssh is expected at ../../../mssh)
npm run capture             # all scenes; `node capture.mjs history` for one
npm run og                  # the social card, from the new terminal screenshot
```

`capture` writes WebP for this site to `src/assets/screenshots/` and PNG for the
mssh README to `mssh/.github/assets/`.
