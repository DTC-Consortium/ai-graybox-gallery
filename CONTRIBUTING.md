# Contributing a gray box

This is the checklist version. For the walkthrough — including how to prompt an
AI to draft your deck, and why CC BY 4.0 — step through the guide deck:
**<https://dtc-consortium.github.io/ai-graybox-gallery/guide/>**

## 1. Build the deck

A gray box is **one concept**, worked through **one context** with real data, in
**15–25 slides**, where the reader steps the example forward themselves.

Start from [`template/`](template/) — it ships the file layout, the deploy
workflow, and the title-slide credit line already in place.

```bash
cp -r template ../graybox-yourtopic && cd ../graybox-yourtopic
npm install && npm run dev
```

## 2. Publish it

1. Create a **public** repository, conventionally named `graybox-<topic>`.
2. Set the base path in `package.json`: `slidev build --base /<repo-name>/`.
   Getting this wrong gives you a blank page with 404s in the console.
3. Keep `cp dist/index.html dist/404.html` in the deploy workflow — without it
   every deep link into your deck breaks, including the one used to capture
   your thumbnail.
4. Repository **Settings → Pages → Source: GitHub Actions**.
5. Push to `main` and confirm the deck loads at its public URL.

Pushing over HTTPS needs a personal access token with `repo` **and** `workflow`
scope (fine-grained: Contents and Workflows, read and write). Never commit it.

## 3. License it

Add a `LICENSE` file. **CC BY 4.0** is the recommended open option: anyone may
share and adapt your gray box, including commercially, as long as they credit
you — and it's the standard for open educational resources, so your deck
interoperates with the rest of the OER world.

If your deck contains substantial code, dual-license: slides and text CC BY 4.0,
code MIT. Creative Commons recommends against CC licenses for software.

**Put `CC BY 4.0 · 2026` on your title slide.** Gallery entries are expected to
carry the license and year on the slide that gets screenshotted and re-shared:

```html
<div class="credit">Your Name (you@university.edu) · CC BY 4.0 · 2026</div>
```

## 4. Optional: fork into DTC-Consortium

Hosting under the organization gives your gray box a durable URL that survives
you renaming or moving your own repository. It is entirely optional — the
gallery links to whichever URL you give it.

Fork → set **Owner** to **DTC-Consortium** → on the fork, enable Actions and
set Pages to GitHub Actions → **update `--base` to the fork's repository name**,
since the fork is served from a different path.

## 5. Open the pull request

```bash
# fork DTC-Consortium/ai-graybox-gallery, then
git clone https://github.com/<you>/ai-graybox-gallery
cd ai-graybox-gallery && npm install
git checkout -b add-your-graybox

# capture a thumbnail from your published deck
npm run thumb -- https://you.github.io/graybox-topic/ 11 \
  files/thumbs/your-graybox.png

# add your entry to gallery.json, then
npm run check
git commit -am "Add Your Gray Box to the gallery"
git push -u origin add-your-graybox
```

Your `gallery.json` entry:

```json
{
  "slug": "your-graybox",
  "title": "Your Gray Box",
  "subtitle": "One line on what a reader will understand",
  "author": "Your Name",
  "course": "Course or discipline",
  "topics": ["topic", "topic"],
  "url": "https://you.github.io/graybox-topic/",
  "repo": "https://github.com/you/graybox-topic",
  "thumb": "files/thumbs/your-graybox.png",
  "thumbSlide": 11,
  "added": "2026-10-27"
}
```

`url` is your choice: your own Pages site or the DTC-Consortium fork.

Pick a **thumbnail slide that shows the concept**, not the title slide. Use
`.png` for text and diagrams, `.jpg` for a slide that is mostly photograph.

### Before you submit

- [ ] Deck loads at its public URL in a fresh browser
- [ ] Every slide steps correctly, start to finish
- [ ] Title slide shows `CC BY 4.0 · 2026`
- [ ] `LICENSE` file present in your repository
- [ ] Thumbnail is 1600×900 and shows the concept
- [ ] `npm run check` passes
- [ ] `gallery.json` still parses

## What gets reviewed

Maintainers check that the deck is a gray box rather than a lecture, that it
loads and steps cleanly, that it is licensed, and that the entry is accurate.
We don't review your pedagogy — it's your example, and your name is on it.

## Questions

Open an issue on this repository.
