# Gray Box Template

A starter [Slidev](https://sli.dev/) deck for an **AI gray box** — one concept,
taught through one worked, contextualized example, in 15–25 slides.

Copy this directory into a new repository and replace the slides.

## Quick start

```bash
npm install
npm run dev          # live preview at localhost:3030
```

## Before you publish

1. **Set the base path.** In `package.json`, change `--base /graybox-template/`
   to `/<your-repo-name>/`. Serving from the wrong base is the single most
   common cause of a blank page on GitHub Pages.
2. **Fill in the title slide credit line**, keeping `CC BY 4.0 · 2026`. The
   gallery expects the license and year on the title slide.
3. **Add a `LICENSE` file.** Copy the one from the gallery repository, or pick
   "Creative Commons Attribution 4.0" when GitHub offers to add one.
4. **Enable Pages:** repository Settings → Pages → Source: **GitHub Actions**.
5. Push. `.github/workflows/deploy.yml` builds and publishes on every push to
   `main`.

## Layout

```
slides.md             the deck
style.css             its look; .panel is the gray box itself
components/           interactive Vue single-file components
data/                 real data, as a module
public/               images and static files, referenced as /name.png
```

Components under `components/` are auto-registered: `components/SortBars.vue`
is used in a slide as `<SortBars />`, with no import.

## Adding it to the gallery

See [CONTRIBUTING.md](../CONTRIBUTING.md) in the gallery repository, or step
through the [guide deck](https://dtc-consortium.github.io/ai-graybox-gallery/guide/).

---

© 2026 — slides and text licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); code MIT.
