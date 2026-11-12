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

Two of the gray boxes in the gallery today:

| Gray box | Concept | Context |
|---|---|---|
| [Sorting the Spider-Verse](https://dtc-consortium.github.io/graybox-sortingthespiderverse/) | How four sorting algorithms differ in the work they do | Box office for every Spider-Man film |
| [A-Star Path Planning](https://ocj-dev.github.io/kineval/pathfinding/) | How a heuristic steers graph search | A grid world planned like a navigation app |

The gallery also hosts fifteen gray boxes written by the DTCC-MLU Course 1
faculty working groups, one or two for each of weeks 1 to 14. These are
prebuilt single-file HTML decks rather than Slidev projects, so they live in
this repository under [`grayboxes/`](grayboxes/) and each is served from its
own URL, `https://dtc-consortium.github.io/ai-graybox-gallery/grayboxes/<slug>/`:

| Week | Gray box | Discipline | Concepts |
|---|---|---|---|
| 1 | [The Meal Swipe Mystery](grayboxes/meal-swipe-mystery/) | Sociology and public policy | search vs. delegation, failure modes, human review |
| 2 | [The Quiet District](grayboxes/quiet-district-311/) | Social sciences and public service | supervised learning, overfitting, missing data |
| 3 | [The Phantom Sighting](grayboxes/phantom-sighting/) | STEM | ml lifecycle, train/test split, precision and recall |
| 4 | [The Vitals Upload](grayboxes/vitals-upload/) | Health | cloud services, shared responsibility, access control |
| 5 | [The Letter in the Archive](grayboxes/letter-in-the-archive/) | Humanities and arts | generative ai, invented quotations, source verification |
| 5 | [The Print Quota Audit](grayboxes/print-quota-audit/) | Campus information | generative ai, citations, run-to-run variability |
| 6 | [The Missing Milliliters](grayboxes/missing-milliliters/) | STEM | prompting, context management, rubrics |
| 7 | [The Missing Exception](grayboxes/missing-exception/) | Social sciences and public service | retrieval-augmented generation, chunking, citations |
| 8 | [The Overnight Invoices](grayboxes/overnight-invoices/) | Business | model selection, cost, tokens |
| 9 | [Forty-Two, Not 420](grayboxes/forty-two-not-420/) | STEM | fine-tuning, evaluation, metrics |
| 10 | [Available Is Not Ordered](grayboxes/available-is-not-ordered/) | Career-technical | agents, tools and permissions, least privilege |
| 11 | [Unknown Is an Answer](grayboxes/unknown-is-an-answer/) | Health | agents, tool errors, testing |
| 12 | [The Invisible Part-Time Student](grayboxes/invisible-part-time-student/) | Social sciences and public service | responsible ai, bias, fairness |
| 13 | [The Governance Dead Letter](grayboxes/governance-dead-letter/) | Business | governance, transparency, model cards |
| 14 | [Confirmation Fatigue](grayboxes/confirmation-fatigue/) | Health | confirmation controls, human oversight, monitoring |

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
entry records whichever URL they choose. A deck that already exists as a single
self-contained `.html` file can instead be hosted here, under `grayboxes/`.

```
index.html               the gallery page
gallery.json             the entries
files/main.css           panel + grid styling
files/gallery.js         renders tiles from gallery.json
files/thumbs/            one image per entry, 1600x900
guide/                   "Make Your Own Gray Box" Slidev deck
template/                starter deck for contributors
grayboxes/<slug>/        prebuilt HTML decks hosted by the gallery itself
scripts/thumb.mjs        capture a thumbnail from a published Slidev deck
scripts/thumb-html.mjs   capture a thumbnail from a prebuilt HTML deck
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
node scripts/build-site.mjs
npm run serve -- site --base /ai-graybox-gallery/
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
