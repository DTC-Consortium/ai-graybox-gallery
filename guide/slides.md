---
theme: default
title: Make Your Own Gray Box
base: /ai-graybox-gallery/guide/
colorSchema: light
info: |
  ## Make Your Own Gray Box
  How to use AI to build a Slidev gray box example, publish it on GitHub Pages,
  license it CC BY 4.0, and add it to the AI Gray Box Gallery.
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  enabled: false
transition: slide-left
mdc: true
fonts:
  sans: 'Inter'
  mono: 'JetBrains Mono'
---

# Make Your Own <span class="accent">Gray Box</span>

### From a concept you teach to a published, interactive example in the gallery

<div class="pt-6">
<span class="tag">prompt it</span><span class="tag">build it</span><span class="tag">license it</span><span class="tag">deploy it</span><span class="tag">share it</span>
</div>

<div class="title-footer">
<div class="nav-hint">Press <span class="key">&rarr;</span> to move forward through the deck</div>
<div class="credit">AI Gray Box Gallery &#183; DTC Consortium &#183; CC BY 4.0 &#183; 2026</div>
</div>

<!--
This deck is itself a gray box: it teaches one thing (how to make a gray box)
through one worked, contextualized example (making this gallery's entries).
-->

---
layout: default
---

## Where this ends up

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel">
<span class="panel-label">You will have</span>

- A **Slidev deck** of 15&ndash;25 slides that teaches one concept
- A **public GitHub repository** holding its source
- A **live URL** on GitHub Pages anyone can open
- A **CC BY 4.0 license**, so other instructors may reuse it
- An **entry in the gallery** with a thumbnail of your best slide

</div>
<div class="panel plain">
<span class="panel-label">It takes</span>

- An afternoon for a first deck, less once you've done one
- A GitHub account
- Node.js 20 or newer
- An AI assistant you already use &mdash; Claude, ChatGPT, Gemini, or an
  agentic coding tool such as Claude Code

</div>
</div>

<div class="mt-4 text-sm" style="color: var(--ink-soft)">
Seven short sections follow, in the order you'll actually do them.
</div>

---
layout: center
class: text-center
---

<div class="section-kicker">Section 0</div>

# What is a gray box?

---
layout: default
---

## The textbook device

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

Open an engineering textbook and you find, every chapter or so, a **shaded box**
set into the page.

It doesn't introduce new theory. It takes the concept you just read and works it
through on something concrete: a real bridge, a real circuit, a real dataset.

That box is where the concept usually clicks &mdash; not in the derivation that
preceded it.

<div class="panel mt-4">
A gray box is <b>one concept</b>, worked through <b>one context</b> your students
already care about, <b>end to end</b>.
</div>

</div>
<div class="panel plain">
<span class="panel-label">An AI gray box adds</span>

- **Interaction.** The reader steps the example forward and watches it move,
  rather than reading a finished figure.
- **Generative provenance.** You built it by prompting an AI, so the next
  instructor can re-prompt it for *their* context.
- **A URL.** It is a link you drop into a lecture, a syllabus, or a problem set.

</div>
</div>

---
layout: default
---

## What makes a good one

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel good">
<span class="panel-label">Do</span>

- Pick **one** concept. "Sorting" is a course; "why quicksort's pivot choice
  matters" is a gray box.
- Pick a context with **real data** your students recognize.
- Make the student **press a key** and see the next step.
- Name the **misconception** you are dissolving.
- Keep it to **15&ndash;25 slides** &mdash; one class segment.

</div>
<div class="panel warn">
<span class="panel-label">Avoid</span>

- Re-teaching the whole unit. A gray box supplements a lecture; it doesn't
  replace one.
- Decorative interactivity. If clicking doesn't change what the student
  understands, make it a static figure.
- Fake data. Students notice, and the example stops being contextual.
- Depending on a login, an API key, or a server. It must work from a plain URL.

</div>
</div>

---
layout: default
---

## Two worked examples

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel">
<span class="panel-label">Sorting the Spider-Verse</span>

**Concept:** how four sorting algorithms differ in the work they do.

**Context:** box-office revenue for every Spider-Man film.

**Interaction:** each algorithm races on the same bars, step by step, with
comparison and swap counts ticking up.

<div class="text-xs mt-2" style="color: var(--ink-soft)">
dtc-consortium.github.io/graybox-sortingthespiderverse
</div>

</div>
<div class="panel">
<span class="panel-label">A-Star Path Planning</span>

**Concept:** how a heuristic steers graph search.

**Context:** a grid world with an obstacle, planned the way a navigation app
plans a route.

**Interaction:** expand one node at a time; compare Euclidean against Manhattan
on the very same cell.

<div class="text-xs mt-2" style="color: var(--ink-soft)">
ocj-dev.github.io/kineval/pathfinding
</div>

</div>
</div>

<div class="mt-3 text-sm" style="color: var(--ink-soft)">
Both are in the gallery. Open one in a second tab and step through it before you
start writing your own &mdash; it is the fastest way to calibrate scope.
</div>

---
layout: center
class: text-center
---

<div class="section-kicker">Section 1</div>

# Draft it with AI

### The part that saves you the afternoon

---
layout: default
---

## Five things your prompt must say

<div class="grid grid-cols-5 gap-3 mt-4 text-sm">

<div class="panel"><span class="panel-label">1 Concept</span>
The single idea. Narrow enough to state in one sentence.
</div>

<div class="panel"><span class="panel-label">2 Context</span>
The concrete thing it runs on, with the actual data named.
</div>

<div class="panel"><span class="panel-label">3 Misconception</span>
What students get wrong today. This shapes every slide.
</div>

<div class="panel"><span class="panel-label">4 Artifact</span>
A Slidev deck, how many slides, what sections.
</div>

<div class="panel"><span class="panel-label">5 Interaction</span>
What the student presses, and what changes when they do.
</div>

</div>

<div class="panel warn mt-5">
Leave any one of these out and the AI will fill it in with something generic.
The <b>misconception</b> is the one people skip, and it is the one that turns a
slide deck into a gray box.
</div>

---
layout: default
---

## The prompt template

```text
Build a Slidev presentation that works as a textbook "gray box": one concept,
taught through one concrete worked example, in about 20 slides.

CONCEPT:       <the single idea, in one sentence>
CONTEXT:       <the concrete example and the real data it uses>
MISCONCEPTION: <what students typically get wrong, which this should dissolve>
AUDIENCE:      <course, level, what they already know>
INTERACTION:   <what the student steps through, and what visibly changes>

Structure it as: motivation (2-3 slides), the concept stated plainly (2-3),
the worked example stepped through (8-12), what to take away (2-3).

Use Slidev conventions: a single slides.md with --- between slides, Vue single
file components under components/ for anything interactive, UnoCSS utility
classes for layout, presenter notes in HTML comments.

Start by giving me the slide-by-slide outline only. Do not write slides yet.
```

<div class="panel mt-3 text-sm">
That last line is the whole trick. Approve an outline first and you will not
spend an hour reading twenty slides built on the wrong framing.
</div>

---
layout: default
---

## Filled in, for real

```text
CONCEPT:       Different sorting algorithms do dramatically different amounts
               of work on the same input.
CONTEXT:       Worldwide box office for all 10 live-action Spider-Man films,
               sorted by revenue. Use the real figures; cite the source.
MISCONCEPTION: Students read O(n^2) vs O(n log n) as "slower vs faster" without
               any feel for what the algorithm is physically doing.
AUDIENCE:      First-year CS, has seen loops and arrays, has not seen heaps.
INTERACTION:   Bars for each film. The student presses a key to advance one
               comparison at a time, for bubble, insertion, heap and quicksort,
               with running comparison and swap counters on screen.
```

<div class="grid grid-cols-2 gap-4 mt-3 text-sm">
<div class="panel good">
<span class="panel-label">Why this works</span>
The data is real and checkable, the interaction is one key press, and the
misconception tells the AI what every slide is for.
</div>
<div class="panel warn">
<span class="panel-label">Compare</span>
"Make me a slide deck about sorting algorithms" &mdash; which produces a correct,
forgettable deck with a bubble-sort diagram you have seen a hundred times.
</div>
</div>

---
layout: default
---

## Slidev specifics worth naming

<div class="grid grid-cols-2 gap-4 mt-2 text-sm">
<div class="panel">
<span class="panel-label">Put these in the prompt</span>

- One `slides.md`; slides separated by `---`
- Per-slide frontmatter for `layout:` only when needed
- Interactive pieces as **Vue SFCs** in `components/`, used by tag name
- **UnoCSS** utility classes (`grid grid-cols-2 gap-4`) for layout
- `mdc: true` in the headmatter so class syntax works
- Presenter notes in `<!-- ... -->` at the end of a slide
- No external API calls, no build-time data fetching

</div>
<div class="panel plain">
<span class="panel-label">Ask for, separately</span>

- `package.json` with `@slidev/cli` and a `build` script
- A `style.css` defining the deck's look in one place
- A `README.md` saying what the gray box teaches
- The data as a typed `data/` module, not inline in slides

</div>
</div>

<div class="panel mt-4">
Slidev's own documentation is at <b>sli.dev</b>. Pointing the AI at it in the
prompt measurably improves the first draft.
</div>

---
layout: default
---

## Two ways to run it

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel">
<span class="panel-label">Chat assistant</span>

You paste the prompt, it returns files, you save them yourself.

- Works with any assistant, nothing to install
- You control every file that lands on disk
- Tedious past a handful of files
- The AI cannot run the deck, so it cannot see what it broke

</div>
<div class="panel">
<span class="panel-label">Agentic coding tool</span>

You point it at an empty directory and it scaffolds, writes, runs, and fixes.

- Creates the project and installs dependencies itself
- Can run `npm run dev` and iterate against real errors
- Much faster for interactive components
- Read the diffs. It will happily rewrite a slide you liked.

</div>
</div>

<div class="panel good mt-4">
Either way, you are the editor. The AI drafts; you decide what is true, what is
clear, and what stays.
</div>

---
layout: default
---

## Iterate in three passes

<div class="mt-3">

<div class="panel mb-3">
<span class="step">1</span><b>Outline.</b> Ask for slide titles and a one-line purpose each. Cut
anything that isn't the concept. Reorder until the worked example is the spine
of the deck, not an appendix.
</div>

<div class="panel mb-3">
<span class="step">2</span><b>The interactive component first.</b> Ask for the one Vue component
that does the stepping, as a standalone file, and run it before any slides exist.
If the visualization isn't convincing on its own, no amount of slide text saves it.
</div>

<div class="panel">
<span class="step">3</span><b>Slides around it.</b> Now ask for the full deck. Expect to rewrite
the motivation and the takeaway yourself &mdash; those carry your voice, and they are
the two places generated prose sounds most generic.
</div>

</div>

---
layout: default
---

## Check what you were given

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel warn">
<span class="panel-label">Verify every one of these</span>

- **Numbers.** Box-office figures, dates, complexity bounds. AI assistants state
  wrong ones fluently.
- **Claims about the algorithm.** Step the animation and confirm it does what
  the caption says.
- **Every click.** Press through the whole deck. Components that render at slide
  1 sometimes break at slide 14.
- **Citations.** If a source is named, open it.

</div>
<div class="panel">
<span class="panel-label">Then read it as a teacher</span>

- Does a student who holds the misconception leave without it?
- Is there a slide you'd skip in class? Delete it.
- Could a colleague teach from this without you in the room?

<div class="mt-3 text-sm" style="color: var(--ink-soft)">
Your name goes on it. The AI's doesn't.
</div>

</div>
</div>

---
layout: default
---

## Running it locally

```bash
npm create slidev@latest my-graybox     # scaffold a new deck
cd my-graybox
npm install
npm run dev                             # live preview at localhost:3030
```

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">
<div class="panel">
<span class="panel-label">While you work</span>

- The preview reloads as you save `slides.md`
- <span class="key">o</span> opens the slide overview
- <span class="key">d</span> toggles dark mode &mdash; check your deck in both, or pin
  `colorSchema: light` in the headmatter
- Browser console open: a broken component usually says so there

</div>
<div class="panel plain">
<span class="panel-label">Or start from this gallery's template</span>

The `template/` directory of the gallery repository is a working deck with the
license line, the deploy workflow, and the file layout already in place. Copy it
and replace the slides.

</div>
</div>

---
layout: center
class: text-center
---

<div class="section-kicker">Section 2</div>

# Put it on GitHub

---
layout: default
---

## Create the repository

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

<div class="panel mb-3">
<span class="step">1</span>On GitHub, <b>New repository</b>. Make it <b>public</b> &mdash; GitHub Pages
on a private repository needs a paid plan, and an open gray box should be public anyway.
</div>

<div class="panel mb-3">
<span class="step">2</span>Name it <code>graybox-&lt;topic&gt;</code>. That's the convention the
DTC Consortium org uses, and it reads well in a URL: <code>graybox-sortingthespiderverse</code>.
</div>

<div class="panel">
<span class="step">3</span>Don't let GitHub add a license yet &mdash; the next section covers
choosing one deliberately.
</div>

</div>
<div class="panel plain">
<span class="panel-label">Then, locally</span>

```bash
cd my-graybox
git init
git add .
git commit -m "Initial gray box deck"
git branch -M main
git remote add origin \
  https://github.com/<you>/graybox-<topic>.git
```

Don't push yet &mdash; pushing over HTTPS needs the token from Section 4.

</div>
</div>

---
layout: default
---

## What lives in the repository

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel">
<span class="panel-label">Structure</span>

```text
graybox-<topic>/
├── slides.md          the deck
├── style.css          its look
├── components/        interactive Vue pieces
├── data/              the real data, as a module
├── public/            images and static files
├── package.json       deps + the build script
├── README.md          what it teaches
├── LICENSE            CC BY 4.0
└── .github/workflows/
    └── deploy.yml     build and publish to Pages
```

</div>
<div class="panel plain">
<span class="panel-label">Not in the repository</span>

- `node_modules/` &mdash; gitignore it
- `dist/` &mdash; CI builds it on every push
- **Your access token.** Ever. Section 4 says where it goes instead.
- Anything you don't have the right to redistribute. If you use an image you
  didn't make, credit it on the slide and check its license.

</div>
</div>

---
layout: center
class: text-center
---

<div class="section-kicker">Section 3</div>

# Choose a license

### The five minutes that decide whether anyone can use your work

---
layout: default
---

## No license is not "open"

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel warn">
<span class="panel-label">The default</span>

A public repository with no `LICENSE` file is still **fully copyrighted** by you.

Posting it publicly grants **no** reuse rights. A colleague who wants to adapt
your gray box for their course technically cannot &mdash; not legally, not without
asking you.

"It's on GitHub" is not permission.

</div>
<div class="panel good">
<span class="panel-label">With a license</span>

A license is a standing grant of permission. It answers, in advance and without
an email thread:

- May I use this in my class?
- May I change it?
- May I publish my changed version?
- What do I owe you in return?

</div>
</div>

---
layout: default
---

## CC BY 4.0, in plain terms

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel">
<span class="panel-label">Anyone may</span>

- **Share** it &mdash; copy and redistribute it anywhere
- **Adapt** it &mdash; remix, translate, rebuild it for another course
- Do both **commercially**, including at a for-profit institution

</div>
<div class="panel">
<span class="panel-label">On one condition</span>

- **Attribution.** They credit you, link the license, and note if they changed
  anything.

And two guarantees:

- You cannot add extra restrictions later for work already released
- The grant is **irrevocable** &mdash; which is exactly what makes it safe to
  build on

</div>
</div>

<div class="panel good mt-4 text-sm">
CC BY 4.0 is the <b>de facto standard for open educational resources</b>. Choosing
it means your gray box can be combined with material from MIT OpenCourseWare,
OpenStax, and most OER repositories without a license conflict. That
interoperability is the practical reason to prefer it over a bespoke "free for
educational use" note.
</div>

---
layout: default
---

## The one caveat: code

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel warn">
<span class="panel-label">Creative Commons' own advice</span>

CC licenses are **not recommended for software**. They were written for creative
and educational works, so they say nothing about source versus object code,
patent grants, or warranty disclaimers &mdash; the things software licenses exist to
settle.

Your gray box is both: prose and slides, plus a real Vue component.

</div>
<div class="panel good">
<span class="panel-label">What to do</span>

Dual-license, and say so in two lines of `README.md`:

- **Slides, text and figures:** CC BY 4.0
- **Code (components, scripts):** MIT

This is what the gallery repository itself does. If your deck has no meaningful
code, plain CC BY 4.0 is fine on its own.

</div>
</div>

---
layout: default
---

## Say it in three places

<div class="mt-2">

<div class="panel mb-3">
<span class="step">1</span><b>A <code>LICENSE</code> file.</b> Paste the full CC BY 4.0 legal text
from <code>creativecommons.org/licenses/by/4.0/legalcode</code>, or pick
"Creative Commons Attribution 4.0" when GitHub offers to add one.
</div>

<div class="panel mb-3">
<span class="step">2</span><b>A line in <code>README.md</code>.</b> One sentence naming the license
and the holder: <i>&copy; 2026 Your Name. Slides and text licensed CC BY 4.0; code MIT.</i>
</div>

<div class="panel good">
<span class="step">3</span><b>On your title slide.</b> Add <code>CC BY 4.0 &#183; 2026</code> to the
credit line. The title slide is what gets screenshotted, embedded, and
re-shared &mdash; it should carry the license with it. <b>Gallery entries are expected
to have this.</b>
</div>

</div>

```html
<div class="credit">Your Name (you@university.edu) &#183; CC BY 4.0 &#183; 2026</div>
```

---
layout: center
class: text-center
---

<div class="section-kicker">Section 4</div>

# Create an access token

---
layout: default
---

## Why you need one

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

GitHub stopped accepting account passwords for `git push` in 2021. Pushing over
HTTPS needs a **Personal Access Token** &mdash; a credential you generate, scope to
exactly what it may do, and can revoke without changing your password.

<div class="panel mt-4">
<span class="panel-label">Think of it as</span>
A key cut for one door, for a limited time, that you can throw away without
rekeying the house.
</div>

</div>
<div class="panel plain">
<span class="panel-label">Two kinds</span>

**Fine-grained** &mdash; scoped to specific repositories, permission by permission.
Preferred for new tokens.

**Classic** &mdash; broader, scoped by capability across everything you can reach.
Simpler, still widely used.

Either works. Pick fine-grained unless something you use requires classic.

</div>
</div>

---
layout: default
---

## Making one

<div class="grid grid-cols-2 gap-4 mt-2 text-sm">
<div class="panel">
<span class="panel-label">Fine-grained</span>

Settings &rarr; Developer settings &rarr; Personal access tokens &rarr;
**Fine-grained tokens** &rarr; Generate new token

- **Repository access:** only your gray box repository
- **Contents:** Read and write
- **Workflows:** Read and write &nbsp;<span style="color:var(--warn)">(needed to push <code>deploy.yml</code>)</span>
- **Pages:** Read and write &nbsp;<span style="color:var(--ink-soft)">(only if you'll enable Pages via the API)</span>
- **Expiration:** 90 days is a sane default

</div>
<div class="panel">
<span class="panel-label">Classic</span>

Settings &rarr; Developer settings &rarr; Personal access tokens &rarr;
**Tokens (classic)** &rarr; Generate new token

- **`repo`** &mdash; full control of your repositories
- **`workflow`** &mdash; lets you push files under `.github/workflows/`

Without `workflow`, your push is rejected the moment it touches `deploy.yml`.
That error message is the single most common first-push surprise.

</div>
</div>

<div class="panel warn mt-3 text-sm">
Copy the token when it is shown. GitHub will not show it to you again.
</div>

---
layout: default
---

## Using it, safely

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel good">
<span class="panel-label">Do</span>

Let git remember it in a credential helper:

```bash
git config --global credential.helper store
git push -u origin main
# Username: your-github-username
# Password: paste the token
```

Or keep it in a file **outside** the repository and read it when needed. Or use
the GitHub CLI: `gh auth login`.

</div>
<div class="panel warn">
<span class="panel-label">Don't</span>

- Commit it. Not in a config file, not in a comment, not "temporarily".
- Paste it into a URL like `https://user:token@github.com/...` &mdash; it lands in
  `.git/config` and your shell history.
- Share one token across projects and people.

**If you ever commit a token: revoke it immediately.** Deleting the commit does
not help; it was public, and it is scraped within minutes.

</div>
</div>

---
layout: center
class: text-center
---

<div class="section-kicker">Section 5</div>

# Deploy to GitHub Pages

---
layout: default
---

## Turn on Pages, then push

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

<div class="panel mb-3">
<span class="step">1</span>Repository <b>Settings</b> &rarr; <b>Pages</b> &rarr; <b>Source:
GitHub Actions</b>. Not "Deploy from a branch" &mdash; there is no branch holding built
output, and there shouldn't be.
</div>

<div class="panel mb-3">
<span class="step">2</span>Commit <code>.github/workflows/deploy.yml</code> (next slide).
</div>

<div class="panel">
<span class="step">3</span><code>git push</code>. Watch the <b>Actions</b> tab. Two jobs run:
<b>build</b>, then <b>deploy</b>. When both are green your deck is live at
<code>&lt;you&gt;.github.io/&lt;repo&gt;/</code>.
</div>

</div>
<div class="panel plain">
<span class="panel-label">Every push after that</span>

Edit `slides.md`, commit, push. The workflow rebuilds and republishes in about a
minute. There is nothing else to do, and no build output to commit.

<div class="mt-3 text-sm" style="color: var(--ink-soft)">
First deploy can take a few minutes longer while GitHub provisions the site.
</div>

</div>
</div>

---
layout: default
class: compact-code
---

## The workflow

```yaml
name: Deploy Slidev site
on:
  push: { branches: [main] }
  workflow_dispatch: {}
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - run: cp dist/index.html dist/404.html
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages }
    steps:
      - uses: actions/deploy-pages@v4
```

<div class="text-sm mt-2" style="color: var(--ink-soft)">
Copy this from <code>template/.github/workflows/deploy.yml</code> in the gallery repository.
</div>

---
layout: default
---

## Two lines that cause most failures

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel warn">
<span class="panel-label">The base path</span>

Your site is served from `/<repo-name>/`, not `/`. Slidev has to be told:

```json
"build": "slidev build --base /graybox-topic/"
```

Get it wrong and you get a **blank white page** with 404s for every `.js` and
`.css` in the browser console. The deck built fine; the browser is looking in
the wrong directory.

Leading and trailing slashes both matter.

</div>
<div class="panel warn">
<span class="panel-label">The 404 copy</span>

```bash
cp dist/index.html dist/404.html
```

Slidev routes slides by path &mdash; `/11` is slide 11. GitHub Pages has no such
file, so it serves `404.html`. Copying the app there lets it boot and route to
the slide anyway.

Skip this line and **every deep link into your deck breaks**, including the one
the gallery uses to screenshot your thumbnail.

</div>
</div>

---
layout: default
---

## When the build fails

<div class="grid grid-cols-2 gap-4 mt-2 text-sm">
<div class="panel">
<span class="panel-label">Read it in this order</span>

1. **Actions** tab &rarr; the red run &rarr; the red step. The real error is
   usually the first red line, not the last.
2. `npm ci` failing &rarr; your `package-lock.json` is stale or uncommitted. Run
   `npm install` locally and commit the lock file.
3. Build failing on a component &rarr; reproduce with `npm run build` locally;
   the same error appears, faster.
4. Deploy failing with a permissions error &rarr; Pages source isn't set to
   GitHub Actions yet.

</div>
<div class="panel plain">
<span class="panel-label">Green but wrong</span>

- **Blank page** &rarr; base path. Check the console.
- **Missing images** &rarr; they belong in `public/`, referenced as `/image.png`.
- **Old content** &rarr; hard-reload; Pages caches aggressively.
- **404 on the whole site** &rarr; Pages is on, but the first deploy hasn't
  finished. Give it five minutes.

</div>
</div>

---
layout: center
class: text-center
---

<div class="section-kicker">Section 6 &#183; optional</div>

# Fork into the DTC Consortium

---
layout: default
---

## Why you might, and might not

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel good">
<span class="panel-label">Reasons to</span>

- A **durable URL** under the consortium, which survives you renaming,
  archiving, or moving your own repository
- Discovery &mdash; your gray box sits alongside the others in one organization
- Continuity if you change institutions

</div>
<div class="panel plain">
<span class="panel-label">Reasons not to</span>

- You keep sole control of the canonical copy
- One repository, not two to keep in sync
- Your own URL is the one you already put in a syllabus

</div>
</div>

<div class="panel mt-4">
<b>Either is fine.</b> The gallery links to whichever URL you give it &mdash; your own
account or the consortium fork. Both seed entries do it differently: Sorting the
Spider-Verse points at the consortium copy, A-Star Path Planning at the author's.
</div>

---
layout: default
---

## Forking it, and the gotcha

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

<div class="panel mb-3">
<span class="step">1</span>Ask a DTC Consortium owner to add you to the organization.
</div>

<div class="panel mb-3">
<span class="step">2</span>On your repository: <b>Fork</b> &rarr; set <b>Owner</b> to
<b>DTC-Consortium</b> &rarr; Create fork.
</div>

<div class="panel">
<span class="step">3</span>On the fork: <b>Settings</b> &rarr; <b>Pages</b> &rarr; Source:
<b>GitHub Actions</b>, and enable Actions if prompted. Forks don't inherit either.
</div>

</div>
<div class="panel warn">
<span class="panel-label">The gotcha</span>

The fork has a **different repository name**, so it is served from a different
path &mdash; and the base path in `package.json` is now wrong.

```json
"build": "slidev build --base /graybox-topic/"
```

must become the fork's own name. One commit on the fork, and it is the reason
the two copies of a deck are never byte-identical.

Keeping the fork current afterwards: **Sync fork** on GitHub, then re-apply that
one line if a sync overwrites it.

</div>
</div>

---
layout: center
class: text-center
---

<div class="section-kicker">Section 7</div>

# Add it to the gallery

---
layout: default
---

## One JSON object and one image

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

Everything in the gallery front page is generated from `gallery.json`. Adding
your gray box means appending one object to it.

```json
{
  "slug": "your-graybox",
  "title": "Your Gray Box",
  "subtitle": "One line on what it shows",
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

</div>
<div class="panel plain">
<span class="panel-label">Notes</span>

- `url` is **your** choice &mdash; your account or the consortium fork
- `thumbSlide` records which slide the image came from, so it can be
  regenerated later
- `.png` for text and diagrams; `.jpg` if the slide is mostly photograph
- `subtitle` is what a reader sees on hover. Make it say what they'll learn,
  not what the deck is about.

</div>
</div>

---
layout: default
---

## Make the thumbnail

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

Pick the slide that shows the concept at its clearest &mdash; **not** the title
slide. Then, in your clone of the gallery repository:

```bash
npm install
npm run thumb -- \
  https://you.github.io/graybox-topic/ \
  11 \
  files/thumbs/your-graybox.png
```

It opens the published deck in a headless browser, navigates to that slide,
hides the nav chrome, and writes a 1600&times;900 image.

```bash
npm run check      # validates the entry and the image
```

</div>
<div class="panel">
<span class="panel-label">Why the published URL</span>

The thumbnail is captured from the **live deck**, so what the gallery shows is
what a visitor will actually get. If the capture is blank or lands on the wrong
slide, that is a real problem with the deployment &mdash; usually the missing
`404.html` copy from Section 5.

<div class="mt-3 text-sm" style="color: var(--ink-soft)">
The script handles decks whose deep links redirect: it walks forward with the
arrow key until it reaches your slide.
</div>

</div>
</div>

---
layout: default
---

## Open the pull request

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel">
<span class="panel-label">Steps</span>

```bash
# fork DTC-Consortium/ai-graybox-gallery on GitHub, then
git clone https://github.com/<you>/ai-graybox-gallery
cd ai-graybox-gallery
git checkout -b add-your-graybox
# edit gallery.json, add files/thumbs/your-graybox.png
npm run check
git commit -am "Add Your Gray Box to the gallery"
git push -u origin add-your-graybox
```

Then open a pull request against `main`.

</div>
<div class="panel good">
<span class="panel-label">Checklist before you do</span>

- Deck loads at its public URL, from a fresh browser
- Every slide steps correctly, start to finish
- Title slide shows **CC BY 4.0 &#183; 2026**
- `LICENSE` file present in your repository
- Thumbnail is 1600&times;900 and shows the concept
- `npm run check` passes
- `gallery.json` still parses &mdash; watch the trailing comma

</div>
</div>

---
layout: center
class: text-center
---

# That's the whole loop

<div class="lede mx-auto mt-6">
Prompt it. Verify it. License it. Deploy it. Submit it.
</div>

<div class="grid grid-cols-3 gap-4 mt-8 text-sm text-left">
<div class="panel">
<span class="panel-label">The gallery</span>
dtc-consortium.github.io/ai-graybox-gallery
</div>
<div class="panel">
<span class="panel-label">Questions</span>
Open an issue on the gallery repository
</div>
<div class="panel">
<span class="panel-label">Slidev docs</span>
sli.dev
</div>
</div>

<div class="title-footer">
<div class="credit">AI Gray Box Gallery &#183; DTC Consortium &#183; CC BY 4.0 &#183; 2026</div>
</div>

<!--
Closing slide. The gallery is only as good as its entries -- the point of this
deck is to make the second one easier to produce than the first.
-->
