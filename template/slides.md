---
theme: default
title: Your Gray Box Title
base: /graybox-template/
colorSchema: light
info: |
  ## Your Gray Box Title
  One sentence on the concept this gray box teaches and the context it uses.
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

# Your Gray Box <span class="accent">Title</span>

### The one-line subtitle that says what a reader will understand by the end

<div class="pt-8">
<span class="tag">concept</span><span class="tag">context</span><span class="tag">interaction</span>
</div>

<div class="title-footer">
<div class="nav-hint">Press &rarr; to move forward through the deck</div>
<!--
Keep this credit line. The gallery expects the license and year on the title
slide: it is the slide that gets screenshotted, embedded and re-shared, so it
should carry the license with it.
-->
<div class="credit">Your Name (you@university.edu) &#183; CC BY 4.0 &#183; 2026</div>
</div>

<!--
Presenter notes go in HTML comments at the end of a slide.
-->

---
layout: default
---

## The question this answers

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

Open with the thing students get wrong, in their words, not yours.

A gray box earns its place by dissolving one specific misconception. Name it
here so every slide that follows has a job.

</div>
<div class="panel">
<span class="panel-label">Replace this panel</span>

The `.panel` class is the gray box itself: a shaded aside set into the page.
Use it for definitions, asides, and takeaways.

</div>
</div>

---
layout: default
---

## The concept, stated plainly

Two or three slides. No example yet &mdash; just the idea, in the smallest number of
words that are still true.

<div class="panel mt-4">
If you cannot state the concept in one sentence, the gray box is scoped too
wide. Split it.
</div>

---
layout: default
---

## The worked example

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel text-sm">

This is the spine of the deck: eight to twelve slides that step through the
concept on real data the reader recognizes.

Put the interactive component in the other column and advance it one step per
click.

</div>
<div class="panel" style="min-height: 280px; display: flex; align-items: center; justify-content: center;">

<span style="color: var(--ink-soft)">&lt;YourComponent /&gt; goes here</span>

</div>
</div>

<!--
Interactive pieces are Vue single-file components in components/. A component
named components/YourComponent.vue is used as <YourComponent /> with no import.
-->

---
layout: default
---

## What to take away

<div class="grid grid-cols-2 gap-4 mt-2">
<div class="panel good">
<span class="panel-label">The point</span>

One or two sentences. This is the slide a student should be able to recall a
week later.

</div>
<div class="panel plain">
<span class="panel-label">Where it goes next</span>

The follow-on concept, the textbook section, or the assignment this sets up.

</div>
</div>

<div class="title-footer">
<div class="credit">Your Name (you@university.edu) &#183; CC BY 4.0 &#183; 2026</div>
</div>
