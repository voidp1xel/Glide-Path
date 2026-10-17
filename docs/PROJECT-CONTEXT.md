# Glidepath — project context and work log

**Read this first in any new chat.** It is the single source of truth for what the owner asked for, the rules they set, what has been done, and what is left. A new chat (even on a different account) should be able to continue from this file alone.

**Keep it current:** whoever finishes a piece of work updates the status tables in section 6 in the same turn.

Last updated: 2026-10-17 (Air Regulations fully complete: ch. 1–26 notes/lessons/figures, 25 chapter banks (932 Qs), plus HF practice sets and 16 sample papers (821 Qs) via content/reg/banks.json — 1,753 Reg Qs in all.)

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
- Null children are now filtered by the engine, so optional fields (`axisLabel`, band `points`, card `tip`) can simply be left out.
- **Do not use `type: 'tree'` in content chapters**: any tree lesson switches off the automatic "The big picture" lesson (`pages.js`). Use `mindmap` for topic overviews (Reg ch. 1, 2, 5, 8, 10, 11 were converted).
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
| 2 | International Organisations and Conventions | 1613–2625 (2436) | done | done | done | 27 Qs |
| 3 | Aircraft Nationality and Registration Marks | 2626–2862 (2777) | done | done | done | 13 Qs |
| 4 | Rules of the Air | 2863–4905 (4306) | done | done | done | 101 Qs |
| 5 | Air Traffic Services | 4906–6107 (5664) | done | done | done | 75 Qs |
| 6 | Separation Methods and Minima | 6108–6936 (6731) | done | done | done | 25 Qs |
| 7 | Separation in the Vicinity of Aerodromes | 6937–7246 (7178) | done | done | done | 8 Qs |
| 8 | Procedures for Aerodrome Control Service | 7247–7755 (7697) | done | done | done | 10 Qs |
| 9 | Use of ATS Surveillance Systems | 7756–8165 (8032) | done | done | done | 21 Qs |
| 10 | Aeronautical Information Services | 8166–8862 (8676) | done | done | none needed | 30 Qs |
| 11 | Search and Rescue | 8863–9164 (9055) | done | done | done | 17 Qs |
| 12 | Visual Aids for Navigation | 9165–11262 (10978) | done | done | done | 50 Qs |
| 13 | PANS-OPS: Aircraft Operations | 11263–13303 (12727) | done | done | done | 94 Qs |
| 14 | National Law | 13304–14216 (14020) | done | done | uses plan type | 31 Qs |
| 15 | Personnel Licensing | 14217–15183 (15006) | done | done | none needed | 22 Qs |
| 16 | Airworthiness of Aircraft | 15184–15342 (15306) | done | done | none needed | 5 Qs |
| 17 | Operational Procedures | 15343–16448 (16317) | done | done | none needed | 20 Qs |
| 18 | Special Operational Procedures and Hazards | 16449–17723 (17025) | done | done | done | 100 Qs |
| 19 | Communications | 17724–18826 (18496) | done | done | none needed | 58 Qs |
| 20 | Aircraft Accident and Incident | 18827–19147 (19073) | done | done | none needed | 10 Qs |
| 21 | Facilitation | 19148–19515 (19414) | done | done | none needed | 12 Qs |
| 22 | Security | 19516–19724 (19625) | done | done | none needed | 10 Qs |
| 23 | Human Performance and Limitations | 19725–19900 (19876) | done | done | none needed | 5 Qs |
| 24 | CRM, TEM and LOFT | 19901–20530 (20403) | done | done | reg-shel | 20 Qs |
| 25 | Aviation Psychology | 20531–21852 (21496) | done | done | none (chart/timeline lessons) | 64 Qs |
| 26 | Aviation Physiology | 21853–24081 (23500) | done | done | reg-eye, reg-slope-illusion | 104 Qs |
| 27 | Additional practice questions (HF) | 24082–24798 | bank only | — | — | 116 Qs (reg-hf-1..4) |
| 28 | Sample question papers | 24799–29484 | bank only | — | — | 705 Qs (reg-paper-01..16) |

- Q-banks: every chapter 2–26 ends with QUESTIONS/ANSWERS in the OCR, but the answer keys are partly garbled, so each answer must be checked by hand. Planned after all chapter text is done (spec files in `tools/qbspec/reg-NN.json`, then `python3 tools/mkqb.py reg-NN`).
- Chapter 10 figures: none drawn; it uses tree, decoder, matrix and timeline lessons instead.


**Reg extra banks (done 2026-10-17):** `content/reg/banks.json` lists `reg-hf-1..4` (HF practice sets, 116 Qs) and `reg-paper-01..16` (sample papers, 705 Qs); they show on practice.html under Air Regulations. Same hand-keyed method; garbled or uncertain items dropped (some papers are much shorter than 50 for that reason). Reg total on the site: 1,753 Qs.

**Reg question banks (done 2026-10-16):** `qb/reg-02.json` … `qb/reg-26.json` (932 questions; ch 1 has none in the book). The book's printed answer keys are OCR-garbled, so every answer was set by hand from the chapter text/notes; questions with a missing stem or an answer that could not be confirmed were left out (so numbering has gaps). They were written directly as qb JSON (like the Nav banks), not via `tools/qbspec` + `mkqb.py` — `tools/parse_qs.py` misreads two-digit question numbers in reg.txt (its optional prefix eats the first digit), and the tools were left untouched. Each item: `{n,q,o[3],a,ex?}`; `ex` gives a one-line reason on tricky ones.

### 6b. Aviator's Handbook (`hb`) — "handbook" chat (update when it reports)

| # | Chapter | Book part | Status | Bank |
|---|---|---|---|---|
| 1 | Aerodynamics Basics | Part 2 Aerodynamics | done (before 15 Oct) | hb-01 (30 q, original) |
| 2 | Airflow, Lift and Drag | Part 2 | written | hb-02 (32 q, original) |
| 3 | Stalls, Spins and Upsets | Part 2 | written | hb-03 (32 q, original) |
| 4 | Aerofoils, Wings and High-Lift Devices | Part 2 | written | hb-04 (32 q, original) |
| 5 | Stability | Part 2 | written | hb-05 (30 q, original) |
| 6 | Flight Controls, Tabs and Balancing | Part 2 | written | hb-06 (30 q, original) |
| 7 | Flight Mechanics: Climb, Glide, Turn, Range | Part 2 | written | hb-07 (31 q, original) |
| 8 | High-Speed Flight, Envelope and Aeroelasticity | Part 2 | written | hb-08 (30 q, original) |
| 9 | Propellers | Part 2 | written | hb-09 (30 q, original) |
| 10 | Structures, Hydraulics and Pneumatics | Part 3 Airframe, 3-3 to 3-8 | written | hb-10 (32 q, original) |
| 11 | Landing Gear, Brakes, Tyres and Powered Controls | Part 3, 3-9 to 3-15 | written | hb-11 (32 q, original) |
| 12 | Air Conditioning, Pressurisation and Ice Protection | Part 3, 3-16 to 3-18 | written | hb-12 (30 q, original) |
| 13 | Composites, Fuel, Fuel Systems and Emergency Equipment | Part 3, 3-19 to 3-22 | written | hb-13 (30 q, original) |
| 14 | Piston Engines | Part 4 Engines, 4-3 to 4-8 | written | hb-14 (30 q, original) |
| 15 | Gas Turbine Theory and Engine Types | Part 4, 4-9 to 4-14 | written | hb-15 (30 q, original) |
| 16 | Intakes, Compressors, Combustors and Turbines | Part 4, 4-15 to 4-26 | written | hb-16 (32 q, original) |
| 17 | Exhaust, Reverse Thrust, Reheat and Engine Systems | Part 4, 4-27 to 4-38 | written | hb-17 (31 q, original) |
| 18 | Electrical Principles, Magnetism and Batteries | Part 5 Electrics, 5-3 to 5-8 | written | hb-18 (30 q, original) |
| 19 | AC and DC Machines and Aircraft Power Systems | Part 5, 5-9 to 5-20 | written | hb-19 (32 q, original) |
| 20 | Pitot-Static Instruments | Part 6 Instruments, 6-3 to 6-8 | written | hb-20 (30 q, original) |
| 21 | Compasses and Gyroscopic Instruments | Part 6, 6-9 to 6-17 | written | hb-21 (30 q, original) |
| 22 | Radio Altimeter, Air Data and Engine Instruments | Part 6, 6-18 to 6-23 | written | hb-22 (30 q, original) |
| 23 | INS, Ring-Laser Gyros, Autopilot, EFIS and FMS | Part 6, 6-24 to 6-31 | written | hb-23 (30 q, original) |
| 24 | Radio Waves, Propagation and Communications | Part 7 Radio & Nav-aids, 7-3 to 7-10 | written | hb-24 (30 q, original) |
| 25 | NDB and ADF, VOR and DME | Part 7, 7-11 to 7-17 | written | hb-25 (30 q, original) |
| 26 | ILS, MLS, Radar and SSR | Part 7, 7-18 to 7-28 | written | hb-26 (30 q, original) |
| 27 | GNSS, GPWS, ACAS, ADS and Datalink | Part 7, 7-29 to 7-39 | written | hb-27 (30 q, original) |
| 28 | Mass and Balance, and Declared Distances | Part 9, 9-3 to 9-8 | written | hb-28 (30 q, original) |
| 29 | V-Speeds and Aircraft Performance | Part 9, 9-9 to 9-22 | written | hb-29 (30 q, original) |
| 30 | Human Performance: Body, Senses and Mind | Part 11 Aeromedical, 11-3 to 11-8 | written | hb-30 (30 q, original) |
| 31 | Disorientation, Illusions, Decompression and Hypoxia | Part 11, 11-9 to 11-16 | written | hb-31 (30 q, original) |

All 30 new chapters (2–31) build cleanly and render with no console errors; all 82 figures in `figs-hb.js` pass `_figaudit` in light and dark. Every lesson has `short`; every non-mindmap/numbers/quiz lesson has `takeaway`. **Question banks:** the Handbook prints no end-of-chapter questions, so `qb/hb-01.json`–`hb-31.json` (946 questions, 30–32 per chapter; ch 1 added and ch 2–31 topped up on 17 Oct at the coordinator's request for ~30 per chapter) are **original MCQs written for Glidepath from the book's facts**, each answer checked against the notes. They are built through the normal pipeline from add-only specs `tools/qbspec/hb-NN.json` (`python3 tools/mkqb.py hb-NN`; the "key has 0 answers but parsed 0 questions" warning is expected). Each bank's `src` says "questions written for Glidepath from the book's text (the book prints no question bank)", and each chapter sets `bankLead` to say the same, replacing the default "Every end-of-chapter question from the book…" lead. The qbank heading "Test yourself: the book's question bank" is hard-coded in `pages.js` and still says "the book's"; changing it is for the chat that owns pages.js. Every chapter including ch 1 has a bank and a `bankLead`. Source data for the questions: scratchpad `qdata_a…f.py` → `genqb.py` → `tools/qbspec/hb-NN.json` (the specs are the durable copy). Where the OCR was garbled or the book looks wrong, the notes say so in place (e.g. ch 20 pitot/static blockage rows, ch 19 synchronous-motor formula, ch 12 relief-valve psi). Fig names that collided with other figure files were prefixed `hb-` (`hb-pitot-static`, `hb-mass-stack`).

"written" = files exist; not yet reviewed by the reg chat.

### 6c. Met and Nav
- Complete: Met 1–30 (book ch. 17 merged into 16), Nav 1–18, with question banks; polished (see 6d). Topic-by-topic check against the books (16 Oct, polish chat): Met, Nav 1–18, Reg 1–26 and Handbook Parts 2–7, 9, 11 all covered. Gaps filled: Nav 8 compass requirements and serviceability tests (notes + lesson `drc-req`); Met 6 turbulence factors (notes); Reg 26 visual-acuity factors, Gestalt laws, misleading outside references, food contamination, medication rules, severe hypothermia (notes) + lesson `fit` (fit to fly? stamp).
- **Nav 19–25 (Part II Instruments, 17 Oct, handbook chat):** 19 ASI and Machmeter (96 q), 20 VSI (20 q), 21 Gyroscope (80 q), 22 INS (21 q), 23 Altitude Alert — RADALT/TCAS/GPWS (29 q), 24 Power Plant Instruments (5 q), 25 Electronic Displays (34 q; 16 diagram-only questions dropped). Notes `## 19.`–`## 25.`, 8 figures in `figs-nav2.js`. **Answer keys were read from the scanned PDF pages**, not the OCR (the OCR mangles the key grids). The tool is `pdfpage.swift` in the side-session notes folder; `[nav NNNN]` = PDF page. Where the book's key looks wrong it is kept, with an `ex` note (nav-19 Q92, Q96; nav-24 Q1, Q4). Book ch 1 (Air Data) has no questions, so nav-17 has no bank.
- **Who owns what now (16 Oct) — do not work on another chat's rows:**

| Work | Book chapters | Site files | Owner |
|---|---|---|---|
| Nav Part II Instruments | VSI, gyroscope, INS, altitude alert, power-plant instruments, electronic displays (+ ASI) | `content/nav/19–25.js`, notes `## 19.`–`## 25.`, `site/assets/figs-nav2.js` (figures `n2-*`), `tools/qbspec/nav-19…25.json` | handbook chat — **all done 17 Oct** |
| Nav Part III Radio Navigation | radio theory, ADF/NDB, track & drift Qs, VOR, VOR/RMI/ADF Qs, holding/intercepts, ILS, radar, GNSS | `content/nav/26–33.js`, `tools/qbspec/nav-26…33*.json` | "Nav Part III" session |
| Nav Part IV sample papers 1–8 | sample papers | question banks only | "Nav sample papers" session |
| Reg question banks, Reg 26 | — | `tools/qbspec/reg-*.json` | reg chat |
| Polish (additive) of each new Nav chapter, once its owner says it is finished; engine | — | engine files | polish chat |

### 6d. Polish / only70 features — "polish" chat (it keeps this subsection current)

**Engine files added:** `site/assets/lessons2.js` (renderers, loaded after `lessons.js`) and `site/assets/lessons2.css` (loaded after `content.css`); both are in the `build.js` page shell. Gap list vs only70: `side-session-notes/…/only70-gap-list.md`.

**Chapter chrome (automatic, no content change needed)**
- Sidebar is a framed panel (own background, border, radius 20), gold on the Exam-Ready track; Part headings fold/unfold (▾); exam lessons show ◆ instead of a number; phone strip highlights the current lesson in ink.
- **The big picture**: every chapter without a `type:'tree'` lesson gets one as lesson 1 (after a `story` if that is first). Columns = Parts (carried forward from the last `part:`), boxes = lessons (label `short`/`ask`, sub = first sentence of `takeaway`), tapping a box shows the takeaway + "Go to this lesson". Chapters with no parts are grouped as See how it works / Know it by heart / Test yourself. Opt out: `bigPicture: false` on the chapter.
- "The chapter in one minute": tilted sticky notes; `remember: [...]` accepted as an alias of `minute: [...]`.
- Exam lessons get a "◆ Exam-Ready" kicker above the heading.
- **Focus centring**: tapping anything interactive in a lesson glides the page so the figure + its info bar are centred (tall figures: the info bar is brought on screen while the tapped item stays visible); brief glow. Settings → "Centre what I tap" turns it off (pref `autocenter`).
- Info bar: `ctx.info(title, text, quote, {icon, jump, jumpLabel, tone:'good'|'bad'})`; the icon changes with the lesson type.
- `el()` now applies CSS custom properties in `style` (`'--n': 4`); `append / prepend / replaceChildren` drop `null`, `undefined`, `false` (fixes the stray "null" in tricks, layers, story, timeline everywhere).
- Global CSS: knockout labels (`fill:var(--panel)` / `var(--paper)`) no longer get the halo; wide lesson figures scroll sideways on phones (min 600 px) instead of shrinking text.

**Upgraded types (old data unchanged)**
- `tree`: org-chart wires (root → bus → family heads; leaves hang off a rail); phone = accordion with "N boxes ▾"; 5+ families switch to a dense layout. Leaves accept `jump: '<lesson id>'` and `tier: 'exam'`. Optional `infoTitle`, `infoText`.
- `flow`: if the graph is a ladder (each question leads to at most one further question) the whole chart is drawn at once, "No/Yes" wires to answer boxes, path lights up; other graphs keep the step-by-step reveal. Force the old look with `layout: 'steps'`.
- `timeline`: `bands: [{from, to, label, tip, h}]` shaded under the axis; labels near the ends hang inwards.
- `stamp`: `prompt` (info-bar text) and `trayLabel` (heading over the stamps).

**New lesson types** (each also takes the normal header fields)
- `hotspot` — numbered pins on a drawing + legend chips + "Name the parts" test. `{ svg: '<svg viewBox=…>' | fig: 'name', spots: [{x, y, label, sub, tip, quote, hue}], pct: false, minWidth: 520, caption }` — x/y in the drawing's viewBox units (or % with `pct: true`).
- `signals` — filterable picture cards + "Hide the names and test me". `{ groups: ['A','B'], cards: [{name, sub, group, svg | fig | visual | emoji, tip, quote, hue}] }`.
- `fly` — animated, step-by-step drawing with Back / Play all / Replay / Next and numbered step chips. `{ svg | fig, base: ['k'], steps: [{label, show: ['k'], hide: ['k'], fly: [{d: 'M… path', dur: 2.4, tone: 'h1', dash, keep}], tip, quote, role: 'alert'}] }` — groups in the SVG carry `data-k="k"`.
- `hold` — holding-entry trainer (PANS-OPS sectors: direct 180°, teardrop 70°, parallel 110°), random arrivals/holds, animated entry. `{ inbound: 270, turn: 'R'|'L', heading: 135 }` (all optional). `G.holdEntry(inbound, turn, heading)` returns the entry.
- `plan` — concentric rings seen from above + list. `{ center: {label, tip}, rings: [{label, short, sub, r, dim, tip, quote, hue, dash}] }` outermost first; `r` optional for true proportions.
- `explore` tabs may use `kind` instead of `type`: `dial` `{unit, min, max, step, start, ticks[], ends[2], fmt:'{v} …', bands:[{from, to, label, sub, tip, quote}]}` · `wheel` `{items:[{k, label, tip, quote}], spin:'Spin'}` · `board` `{board:'Title', columns[], rows:[{cells[], tag, tip, quote}]}` · `shelf` `{ends[2], items:[{label, sub, scope, tip, quote}]}`. Tabs take `label, icon, title, intro`.

**Content polished** (chapter by chapter; Met/Nav only)
- **Every Nav and Met lesson now has a `takeaway`** (except mindmap/numbers/quiz/tricks), so every chapter's auto big picture and "chapter in one minute" are full. Every Nav chapter has Parts and a mind map.
- Nav 1: story, year `timeline` (bands), cause `classify`, twilight `layers`, horizon pairs, leap-year `flow`, moon, tricks; quiz 6.
- Nav 2: story, lat/long pairs, GC/small circle/rhumb `classify`, numbers. Nav 3: Mercator-scale `dial`, large/small scale pairs.
- Nav 4: **`fly`** GC vs RL across converging meridians, chart-convergence matrix, numbers. Nav 5: LMT-offset `dial`, date-line `stamp`, sunrise `sequence`, numbers, tricks.
- Nav 6: **`hotspot`** three norths, isogonal/isoclinal `classify`. Nav 7: **`fly`** "square flight that doesn't close", unit pairs.
- Nav 8: hard/soft iron `classify`, compass-swing bullets, numbers, tricks. Nav 9: wind-triangle `classify`, crosswind `dial`, 60° dog-leg `sequence`.
- Nav 10: ISA pressure `layers`, over/under-read `stamp`, 1-in-60 bullets. Nav 11: SAT/TAT pairs, C-T-M order matrix. Nav 12: **`fly`** CP/PNR on a windy route, "does the CP move?" `stamp`.
- Nav 13: **`hold`** entry trainer (exam tier), numbers. Nav 14: DOM `classify`. Nav 15: runway declared-distance **`hotspot`**. Nav 16: Item 19 **`signals`**. Nav 17: blockage `stamp` (SOD/SUC checked against the book). Nav 18: tricks, takeaways.
- Met: ~105 missing takeaways/hooks written (ch 1–30). Met 13 CB avoidance **`plan`**; Met 16 mountain-wave **`fly`**; Met 21 met-office **`board`**; Met 23 instrument **`signals`** + quiz; Met 24 station-model **`hotspot`** + ww `classify`; Met 28 briefing `sequence` + high/low-level `stamp`; Met 29 T-3 reading `stamp` + quiz.
- Figures: all Met/Nav figures pass `tools/figaudit.js` (no clipping, overlap or low contrast) in light and dark; light labels on dark scenery get a dark halo (`G.figTextTone`).
- **Reg 1–17 (owner's go-ahead, 16 Oct; additive only, 18+ untouched):** 9 missing takeaways (ch 11–14, 17) and ~50 memory hooks on DGCA-favourite lessons; Reg 3 mark-height `dial`; Reg 4 tower light-signal picture **`signals`** (own pictograms); Reg 16 C-of-A life `sequence`, Annex 8/6 `classify`, numbers. Figures: `reg-vertical-refs` label overlap fixed; white paint/cloud labels (`var(--m-paint)`, `var(--m-cloud)`) and dark ink on fixed colours now get the right halo engine-wide, so **every figure on the site passes figaudit in light and dark**.
- **Reg 18–25 (owner's go-ahead, 16 Oct; additive, Reg 26 untouched):** takeaway for reg-19 `q-stamp`; hooks on 17 DGCA-favourite lessons (ch 18–25); Reg 20 damage `stamp` (accident or not); Reg 21 numbers + green/red channel pairs; Reg 22 seizure-notification `classify` + dates/names numbers.
- **Handbook 01–31 (owner's go-ahead, 16 Oct; additive):** 6 missing takeaways in hb-01; hooks on all 85 DGCA-favourite lessons that lacked one (ch 2–30); HB 7 bank-angle `dial` (load factor and stall-speed rise); HB 31 illusion **`signals`** cards. All 234 figures on the site pass figaudit in light and dark.
- **Reg 26:** hooks on its 4 key lessons (alcohol, dcs, incap, approach); it was already complete otherwise.
- **Phones:** `fly` drawings now keep a 620 px minimum width and scroll sideways, the box follows the plane, and the step-chip row scrolls to the current step.
- Polish of all four subjects is complete as of 16 Oct.
- **New Nav 19–22 (16 Oct, additive):** hooks on nav-19 `marks` and nav-21 `nb-cases`; nav-21 earth-rate drift `dial` (`drift-dial`, 15 sin lat °/h). Engine: `--bad` (= `--warn`) and `--bg` (= `--paper`) colour aliases defined, since figures were using them undefined. Reported to the handbook chat: label overlap in `n2-asi-mach` (its file). Nav 23–24 (17 Oct): hooks on 8 lessons (ra-use, ra-ind, tcas-gen, tcas-ra, gpws-act, coat, rpm, torque). `n2-asi-mach` overlap since fixed by its owner: all 241 figures pass figaudit in light and dark. Nav 25 (17 Oct): hooks on dh, routes, eicas. **Nav Instruments 19–25 polished**; all 8 `n2-*` figures pass. Nav 26–33 wait for the Part III session's "done".
- **Question-bank heading** (pages.js): a chapter with `bankLead` (i.e. original questions, like the Handbook) now shows "Test yourself: practice questions"; `bankAsk` sets any other wording; book banks keep "the book's question bank".

## 7. How a Reg chapter is written (recipe used for ch. 1–11)

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
