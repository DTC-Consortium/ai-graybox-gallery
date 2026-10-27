# AI Gray Box Gallery

**<https://dtc-consortium.github.io/ai-graybox-gallery/>**

A gallery of *gray box* examples for using generative and agentic AI to
illustrate concepts in college courses.

## What is a gray box?

Open an engineering textbook and every chapter or so you find a shaded box set
into the page. It doesn't introduce new theory — it takes the concept you just
read and works it through on something concrete. That box is usually where the
concept clicks.

An **AI gray box** is that device, built with AI and published as a short
interactive [Slidev](https://sli.dev/) deck:

- **One concept** — narrow enough to state in a sentence
- **One context** — real data a student recognizes
- **Interactive** — the reader steps it forward and watches it move
- **A URL** — drop it into a lecture, a syllabus, or a problem set

Two in the gallery today:

| Gray box | Concept | Context |
|---|---|---|
| [Sorting the Spider-Verse](https://dtc-consortium.github.io/graybox-sortingthespiderverse/) | How four sorting algorithms differ in the work they do | Box office for every Spider-Man film |
| [A-Star Path Planning](https://ocj-dev.github.io/kineval/pathfinding/) | How a heuristic steers graph search | A grid world planned like a navigation app |

## Make one

Step through the guide deck — it covers prompting an AI to draft a deck,
creating the repository, choosing a license, making an access token, deploying
to GitHub Pages, optionally forking into the DTC Consortium organization, and
opening the pull request that adds your entry here:

**<https://dtc-consortium.github.io/ai-graybox-gallery/guide/>**

[`template/`](template/) is a working starter deck to copy.
[`CONTRIBUTING.md`](CONTRIBUTING.md) is the same checklist in text form.

## How the gallery works

The front page is static HTML; every tile is generated from
[`gallery.json`](gallery.json). Adding a gray box means adding one object to
that file and one image under `files/thumbs/`. Authors host their own decks —
under the DTC Consortium organization or under their own account — and the
entry records whichever URL they choose.

```
index.html               the gallery page
gallery.json             the entries
files/main.css           panel + grid styling
files/gallery.js         renders tiles from gallery.json
files/thumbs/            one image per entry, 1600x900
guide/                   "Make Your Own Gray Box" Slidev deck
template/                starter deck for contributors
scripts/thumb.mjs        capture a thumbnail from a published deck
scripts/check-gallery.mjs validate entries, thumbnails and links
scripts/serve.mjs        dependency-free local preview server
```

## Working on it locally

```bash
npm install                  # only needed for the thumbnail script
npm run serve                # preview the front page at localhost:4173
npm run check                # validate gallery.json, thumbnails, links
npm run check -- --offline   # skip the link checks

npm run thumb -- https://you.github.io/graybox-topic/ 11 \
  files/thumbs/your-graybox.png
```

To preview the whole site the way GitHub Pages serves it, guide deck included:

```bash
cd guide && npm install && npm run build && cd ..
mkdir -p site/guide && cp index.html gallery.json site/
cp -r files template site/ && cp -r guide/dist/. site/guide/
npm run serve -- site
```

Deployment is automatic: `.github/workflows/deploy.yml` builds the guide deck,
assembles the site, and publishes to GitHub Pages on every push to `main`.

## License

© 2026 Chad Jenkins · DTC Consortium, and the individual gray box authors.

Pages, prose, and the guide and template decks are licensed
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) ([`LICENSE`](LICENSE)).
The code in `scripts/` and `files/*.js` is additionally available under the
[BSD 3-Clause License](LICENSE-BSD), because Creative Commons recommends against
using CC licenses for software — and because BSD 3-Clause's no-endorsement
clause mirrors the one CC BY 4.0 already applies to the prose beside it.

Each gray box linked from this gallery is licensed by its own author; see that
project's repository.
