# Hosted gray boxes

Prebuilt gray boxes that the gallery hosts itself: single-file HTML decks, and
videos with a page that plays them. Each folder is one gray box, served at

    https://dtc-consortium.github.io/ai-graybox-gallery/grayboxes/<slug>/

Every deck's `index.html` here is the author's file, committed unmodified. To
add one, see "Already have the deck as an HTML file?" in
[`CONTRIBUTING.md`](../CONTRIBUTING.md).

## DTCC-MLU Course 1

Collected on 2026-11-11 from the working groups' "Updated Files - Slides and
Gray Box Examples" folders. The source file name is kept here so a deck can be
traced back to, and refreshed from, the course drive.

| Week | Folder | Working group | Source file |
|---|---|---|---|
| 1 | [`meal-swipe-mystery/`](meal-swipe-mystery/) | WG-1 | `GBU1_meal-swipe-mystery.html` |
| 2 | [`quiet-district-311/`](quiet-district-311/) | WG-1 | `GBU2_quiet-district-311.html` |
| 3 | [`phantom-sighting/`](phantom-sighting/) | WG-1 | `GB3_phantom-sighting-stem.html` |
| 4 | [`vitals-upload/`](vitals-upload/) | WG-1 | `GB4_vitals-upload-health.html` |
| 5 | [`letter-in-the-archive/`](letter-in-the-archive/) | WG-2 | `GBU5_1_letter-in-the-archive.html` |
| 5 | [`print-quota-audit/`](print-quota-audit/) | WG-2 | `GBU5_2_print-quota-audit.html` |
| 6 | [`missing-milliliters/`](missing-milliliters/) | WG-2 | `GB_6_missing-milliliters.html` |
| 7 | [`missing-exception/`](missing-exception/) | WG-3 | `GB7_missing-exception.html` |
| 8 | [`overnight-invoices/`](overnight-invoices/) | WG-2 | `GB8_overnight-invoices.html` |
| 9 | [`forty-two-not-420/`](forty-two-not-420/) | WG-5 | `GB9_forty-two-not-420.html` |
| 10 | [`available-is-not-ordered/`](available-is-not-ordered/) | WG-3 | `GB10_available-is-not-ordered.html` |
| 11 | [`unknown-is-an-answer/`](unknown-is-an-answer/) | WG-3 | `GB11_unknown-is-an-answer.html` |
| 12 | [`invisible-part-time-student/`](invisible-part-time-student/) | WG-4 | `GB12_invisible-part-time-student.html` |
| 13 | [`governance-dead-letter/`](governance-dead-letter/) | WG-4 | `GB13_governance-dead-letter.html` |
| 14 | [`confirmation-fatigue/`](confirmation-fatigue/) | WG-4 | `GB14_confirmation-fatigue.html` |

## Videos

| Weeks | Folder | Working group | Source file |
|---|---|---|---|
| 10–11 | [`northstar-workshop-assistant/`](northstar-workshop-assistant/) | WG-3 | `Northstar_Agent_Demo.mp4` |

`northstar-agent-demo.mp4` is the source video with its index moved to the
front of the file (`ffmpeg -c copy -movflags +faststart`), so it starts playing
before it has finished downloading. The picture itself is unchanged: no
re-encode. `poster.jpg` is the frame at 0:04; the gallery thumbnail is the frame
at 1:37 with a "video" badge added. The page around the video, its chapter
list and its summary were written for the gallery, from the video and the
course's Northstar build-and-test handout.
