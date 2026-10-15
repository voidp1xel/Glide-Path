# Glidepath — project context and work log

**Read this first in any new chat.** It is the single source of truth for what the owner asked for, the rules they set, what has been done, and what is left. A new chat (even on a different account) should be able to continue from this file alone.

**Keep it current:** whoever finishes a piece of work updates the status tables in section 6 in the same turn.

Last updated: 2026-10-15 (Air Regulations ch. 1–10 done, all lessons have short + takeaway; Handbook ch. 1–11 present; polish chat has added new lesson types and the auto big picture)

---

## 1. What this project is

- **Glidepath** is a personal static study website for the Indian **DGCA CPL** ground exams, modelled on **only70.com** (a site that teaches DGCA Air Regulations as interactive drawings). Owner: Aniket Goel. **Personal learning only.**
- Repo: `/Users/aniketgoel/Documents/Glide Path` (GitHub `voidp1xel/Glide-Path`). PDFs are tracked with Git LFS.
- Source books (PDFs in the repo root, already OCR'd to plain text in `tools/ocr/`):

| Subject | Book | OCR text | Site id | Notes file |
|---|---|---|---|---|
| Meteorology | I.C. Joshi | `tools/ocr/met.txt` | `met` | `notes/meteorology.md` |
| Air Navigation | R.K. Bali | `tools/ocr/nav.txt` | `nav` | `notes/air-navigation.md` |
| Air Regulations & Human Factors | R.K. Bali (2026 ed.) | `tools/ocr/reg.txt` | `reg` | `notes/air-regulations-human-factors.md` |
| Aviator's Handbook | Cdr Thomas Tom (2nd ed. 2022) | `tools/ocr/avh.txt` | `hb` | `notes/aviators-handbook.md` |

- OCR page markers look like `===== [reg 0091]`. Reg book: **PDF page = book page + 14**. The Handbook's contents list is near line 400 of `avh.txt`.

## 2. The owner's requests, in order (15 Oct 2026)

1. Study only70.com: how it's made, its features, how it displays content, how its diagrams are made. (Done; see `docs/only70-site-analysis.md`.)
2. Read the books and **write the text of the chapters not yet implemented**, the same way existing chapters are done. Ask if in doubt.
3. Scope chosen by the owner: **Air Regulations first, then the Handbook**. Depth chosen: **match the Met chapters** (mind map, figures, matrices, pairs, stamps, numbers, quiz, plus point-wise notes).
4. Hand the **Handbook** to a separate chat; the original chat does **Air Regulations**.
5. **Rule for content chats:** "you have no authority to make changes to how the site works or looks. You can't delete things." Better ideas or parts from only70.com may be used, but the job is only to **implement the information the same way as the rest of the site**.
6. Start another chat to **polish** text, diagrams and mind maps "according to need", and to **clone the features only70.com has that Glidepath lacks**. That chat **is** allowed to change the engine and look (the owner's exception to rule 5). Limit agreed: copy only70's *features, layout and behaviour*, not its actual text, drawings or code.
7. Keep **this document** so any new chat can continue with a small context window.

## 3. Rules every chat must follow

- Content chats add content only: no engine/CSS/build changes, no deleting or rewriting existing content. Adding figures to a `figs-*.js` file is allowed (that's how existing chapters do it).
- Only the polish chat edits engine files (`site/assets/lessons.js`, `lessons2.js`, `core.js`, `pages.js`, `*.css`, `build.js`), and it must stay backward compatible with existing chapter data.
- Write facts from the books, not from memory; where the OCR is garbled, check against the ICAO Annex/CAR the book quotes.
- Never commit or push unless the owner asks.
- All chats build into the same `site/` folder; `node build.js` is safe to run at any time.

## 4. How the site is built

- `content/<subject>/NN.js` — one chapter each: `module.exports = { n, title, tag, icon, hue, partOfBook, big, purpose, lessons: [...] }`. `partOfBook` groups chapters on the home page.
- `notes/<book>.md` — point-wise notes. A section `## <n>. <Title>` is attached to the chapter with the same `n` and shown as the "Every fact, drawn out" lesson; `**Term**: definition` bullets feed the glossary; a `### Exam traps` list feeds the exam guide.
- `qb/<id>.json` — question banks `{title, src, qs:[{n,q,o[],a,ex?}]}`, auto-attached to chapter `<subject>-NN`. Built from `tools/qbspec/<id>.json` with `python3 tools/mkqb.py <id>` (parses the OCR between `start`/`end` lines; `key` = printed answer letters).
- `site/assets/figs-*.js` — SVG figures, `F['name'] = () => '<svg viewBox="0 0 700 H">…</svg>'`, used by lessons with `fig: 'name'`. Every `figs-*.js` is loaded automatically. Use theme variables (`--ink`, `--panel`, `--h0..h5` / `--h0i..h5i`, `--m-asphalt`, `--m-ground`, `--m-sky`, `--m-sea`, `--m-cloud`, `--m-paint`…) and keep text ≥ 13 px (each figs file has a `T(x, y, text, {a, s, w, c})` helper).
- Lesson header fields: `id, type, part (starts a new Part), icon, ask, lead, takeaway, hook, dgca: true (DGCA favourite badge), tier: 'exam' (Exam-Ready track only), revise: true (goes to the Flight bag)`.
- Lesson types (`site/assets/lessons.js`): `mindmap, story, tree, flow, sequence, layers, matrix, decoder, timeline, scale, numbers, pairs, tricks, classify, stamp, svg/fig, explore, cycle, bullets, formulas, chart, gallery, quiz, qbank, sim`.
- **New types from the polish chat** (`site/assets/lessons2.js`, all additive): `hotspot`, `signals`, `fly`, `hold`, `plan`; upgraded `tree` and `flow`; `explore` tabs gain `kind: dial | wheel | board | shelf`; chapters now auto-get a "The big picture" lesson (`G.bigPicture`). The polish chat should document the data shapes in section 6.
- Icons must come from `core.js`: cloud wind thermo drop eye zap globe compass map plane clock book check star layers target gauge radio sat shield user brain heart search sun moon right left history flag list calc snow mountain waves storm spark info help bookmark grid file home refresh shuffle x menu alert tower ruler magnet sigma play pen timer trophy rain fog ice pulse sliders signal doc scale medal route fuel weight rotate lock calendar hash.
- **Gotchas** (until the engine filters nulls): a `timeline` needs `axisLabel`; every `layers` band needs both `tip` and `points`; unrevealed `tricks` cards show "null" (engine bug, reported to the polish chat).
- Build: `node build.js`. Preview: `python3 tools/serve.py` → http://localhost:8765 (launch config `glidepath` in `.claude/launch.json`). Chapter URL: `/chapters/<subject>-NN.html`.
- Quick checks in the browser console on any page: `tools/figaudit.js` (clipping, overlap, tiny text in figures). To eyeball figures, render them with `G.fig('name')` into an overlay.

## 5. Chats that have worked on this

| Name | Job | Files it owns |
|---|---|---|
| Original chat ("reg") | Air Regulations & Human Factors ch. 1–26, this document | `content/reg/*`, `notes/air-regulations-human-factors.md`, `site/assets/figs-reg.js` |
| "handbook" | Aviator's Handbook: rest of Part 2 Aerodynamics, Parts 3–7, 9, 11 (skip Parts 1, 8, 10, covered by the other books) | `content/hb/*`, `notes/aviators-handbook.md`, `site/assets/figs-hb.js` |
| "polish" | Polish Met/Nav content and figures; add only70 features to the engine | engine files, `content/met/*`, `content/nav/*`, `figs-met/nav/clouds/sims.js`. Polishes Reg/HB only after the owner says those are finished. |

## 6. Status

### 6a. Air Regulations & Human Factors (`reg`)

| # | Chapter | Lines in `reg.txt` (Qs start) | Notes | Lessons | Figures | Q-bank |
|---|---|---|---|---|---|---|
| 1 | Definitions and Abbreviations | 240–1612 | done | done | done | none in book |
| 2 | International Organisations and Conventions | 1613–2625 (2436) | done | done | done | todo |
| 3 | Aircraft Nationality and Registration Marks | 2626–2862 (2777) | done | done | done | todo |
| 4 | Rules of the Air | 2863–4905 (4306) | done | done | done | todo |
| 5 | Air Traffic Services | 4906–6107 (5664) | done | done | done | todo |
| 6 | Separation Methods and Minima | 6108–6936 (6731) | done | done | done | todo |
| 7 | Separation in the Vicinity of Aerodromes | 6937–7246 (7178) | done | done | done | todo |
| 8 | Procedures for Aerodrome Control Service | 7247–7755 (7697) | done | done | done | todo |
| 9 | Use of ATS Surveillance Systems | 7756–8165 (8032) | done | done | done | todo |
| 10 | Aeronautical Information Services | 8166–8862 (8676) | done | done | none needed | todo |
| 11 | Search and Rescue | 8863–9164 (9055) | todo | todo | todo | todo |
| 12 | Visual Aids for Navigation | 9165–11262 (10978) | todo | todo | todo | todo |
| 13 | PANS-OPS: Aircraft Operations | 11263–13303 (12727) | todo | todo | todo | todo |
| 14 | National Law | 13304–14216 (14020) | todo | todo | todo | todo |
| 15 | Personnel Licensing | 14217–15183 (15006) | todo | todo | todo | todo |
| 16 | Airworthiness of Aircraft | 15184–15342 (15306) | todo | todo | todo | todo |
| 17 | Operational Procedures | 15343–16448 (16317) | todo | todo | todo | todo |
| 18 | Special Operational Procedures and Hazards | 16449–17723 (17025) | todo | todo | todo | todo |
| 19 | Communications | 17724–18826 (18496) | todo | todo | todo | todo |
| 20 | Aircraft Accident and Incident | 18827–19147 (19073) | todo | todo | todo | todo |
| 21 | Facilitation | 19148–19515 (19414) | todo | todo | todo | todo |
| 22 | Security | 19516–19724 (19625) | todo | todo | todo | todo |
| 23 | Human Performance and Limitations | 19725–19900 (19876) | todo | todo | todo | todo |
| 24 | CRM, TEM and LOFT | 19901–20530 (20403) | todo | todo | todo | todo |
| 25 | Aviation Psychology | 20531–21852 (21496) | todo | todo | todo | todo |
| 26 | Aviation Physiology | 21853–24081 (23500) | todo | todo | todo | todo |
| 27 | Additional practice questions (HF) | 24082–24798 | bank only | — | — | todo |
| 28 | Sample question papers | 24799–29484 | bank only | — | — | todo |

- Q-banks: every chapter 2–26 ends with QUESTIONS/ANSWERS in the OCR, but the answer keys are partly garbled, so each answer must be checked by hand. Planned after all chapter text is done (spec files in `tools/qbspec/reg-NN.json`, then `python3 tools/mkqb.py reg-NN`).
- Chapter 10 figures: none drawn; it uses tree, decoder, matrix and timeline lessons instead.

### 6b. Aviator's Handbook (`hb`) — "handbook" chat (update when it reports)

| # | Chapter | Book part | Status |
|---|---|---|---|
| 1 | Aerodynamics Basics | Part 2 Aerodynamics | done (before 15 Oct) |
| 2 | Airflow, Lift and Drag | Part 2 | written |
| 3 | Stalls, Spins and Upsets | Part 2 | written |
| 4 | Aerofoils, Wings and High-Lift Devices | Part 2 | written |
| 5 | Stability | Part 2 | written |
| 6 | Flight Controls, Tabs and Balancing | Part 2 | written |
| 7 | Flight Mechanics: Climb, Glide, Turn, Range | Part 2 | written |
| 8 | High-Speed Flight, Envelope and Aeroelasticity | Part 2 | written |
| 9 | Propellers | Part 2 | written |
| 10 | Structures, Hydraulics and Pneumatics | Part 3 Airframe | written |
| — | Rest of Part 3 Airframe; Parts 4 Engines, 5 Electrics, 6 Instruments, 7 Radio & Nav-aids, 9 Mass & Balance and Performance, 11 Aeromedical | | todo |

"written" = files exist; not yet reviewed by the reg chat.

### 6c. Met and Nav
- Complete: Met 1–30 (book ch. 17 merged into 16), Nav 1–18, with question banks. The polish chat is improving them (Nav 1–2 already expanded).

### 6d. Polish / only70 features — "polish" chat (it should keep this subsection current)
- Added `site/assets/lessons2.js` + `lessons2.css`: new lesson types `hotspot`, `signals`, `fly`, `hold`, `plan`; upgraded `tree` and `flow`; new explore kinds; automatic "The big picture" lesson per chapter.
- Edited `pages.js`, `lessons.js`, `core.js`, `build.js`, `content/pages/settings.js`; expanded `content/nav/01.js`, `02.js`.
- Known engine bugs reported to it: "null" text from `tricks`, `layers`, `story`, `timeline` renderers appending null children.

## 7. How a Reg chapter is written (recipe used for ch. 1–10)

1. Read the chapter's line range from `tools/ocr/reg.txt`, e.g. `sed -n 8863,9054p tools/ocr/reg.txt | grep -v -E '^\s*$|^=====|^\s*[0-9]{1,3}\s*$'` (stop at the QUESTIONS line).
2. Append `## <n>. <Title>` to `notes/air-regulations-human-factors.md` (separate chapters with `---`): `### Subsection (p.X)` with book page refs, bold key terms and numbers, tables where useful, ending with `### Exam traps`.
3. Write `content/reg/NN.js`. `partOfBook: 'Part I · Air Regulations'` for ch. 1–22 and `'Part II · Human Factors'` for 23–26; rotate `hue` 0–5. Lesson order: `mindmap` → optional `story` → Parts (`part:` on the first lesson of each) of 2–5 lessons mixing svg / matrix / pairs / stamp / classify / flow / sequence / tricks / gallery / bullets / decoder / timeline / layers → `numbers` → `quiz` (6–8 questions). Put `takeaway` + `hook` on the key lessons; mark DGCA-favourite lessons `dgca: true`, extra-detail lessons `tier: 'exam'`, revision tables `revise: true`. Typical size: 18–30 lessons.
4. Add figures to `site/assets/figs-reg.js` as a new `(function(){ … })();` block per chapter.
   **Required for "The big picture" (owner's request via the polish chat):** every lesson gets a `short` label (2–4 words) and a `takeaway` (mindmap/numbers/quiz may skip the takeaway); put `part:` on the first lesson of each Part. Give every tappable item a one-line explanation: tree/timeline/sequence/layers `tip`, numbers `note` or `tip`, matrix cells `{ v, tip }` where useful, flow end-node `body`, classify item `why`, stamp case `why` (and a `quote` from the book where you have one). New lesson types from `lessons2.js` (hotspot, signals, fly, hold, plan, explore kinds) may be used.
5. `node build.js`; open `http://localhost:8765/chapters/reg-NN.html`; check no console errors, no "[figure: …]" placeholders, no stray "null"; look at each new figure.
6. Update table 6a.

## 8. Ready-to-paste prompts for a new chat

- **Continue Air Regulations:** "Read docs/PROJECT-CONTEXT.md. Continue the Air Regulations chapters from the first 'todo' row in table 6a, following section 7 and the rules in section 3. Update the table as each chapter is finished."
- **Reg question banks:** "Read docs/PROJECT-CONTEXT.md. Build the Air Regulations question banks: for each chapter in table 6a, write tools/qbspec/reg-NN.json from the QUESTIONS/ANSWERS block in tools/ocr/reg.txt (see the existing met specs), check every answer against the chapter notes, run python3 tools/mkqb.py reg-NN, rebuild and verify. Content only; follow section 3."
- **Continue the Handbook:** "Read docs/PROJECT-CONTEXT.md. Continue the Aviator's Handbook chapters after the last row of table 6b (Parts 3–7, 9, 11 of tools/ocr/avh.txt), in the style of content/hb/01.js–10.js and notes/aviators-handbook.md, following the rules in section 3. Update table 6b."
- **Polish / only70 features:** "Read docs/PROJECT-CONTEXT.md and docs/only70-site-analysis.md. You are the polish chat (section 3 exception): compare Glidepath with only70.com, add missing features to the engine without breaking existing chapter data, fix the null-text bugs in 6d, and polish Met/Nav chapters. Keep 6d current."
