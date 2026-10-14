# How only70.com is built — a teardown

*Studied live on 13 Oct 2026 (atlas.js build `d181594d95`). Written for re-using the construction ideas in a personal study site. Only70's own text, questions, drawings, code and brand are not copied; only the techniques are described.*

---

## 1. The one-line idea

Only70 turns a dry exam syllabus into **interactive drawings instead of paragraphs**. Every chapter is one long page of "lessons". Each lesson:

1. asks **one plain-English question** ("Who gives way?"),
2. gives a **black takeaway strip** (the answer in one or two sentences) beside a **yellow memory-hook sticky note**,
3. then answers it with **one interactive figure**: a flowchart, decision tree, animated route, altitude stack, flip cards, a "stamp the case" game, a table, or a quiz.

Tagline pattern: *"<Subject>, drawn out"*.

---

## 2. Technical architecture

| Piece | How it works |
|---|---|
| Framework | **None.** Static HTML + one CSS file (~107 KB) + one JS renderer (~181 KB, a single IIFE). |
| Pages are data | Each page holds only `<main id="app">`, an inline `<script>` that sets a global JSON object, and the renderer. Home: `window.INDEX = {...}`. Chapter: `window.CHAPTER = {...}`. |
| Boot | Renderer checks `window.CHAPTER` → draws a chapter; else `window.INDEX` → draws the home grid. |
| DOM | Built entirely in JS with a tiny `el(tag, attrs, ...children)` helper; SVG via a matching `sv()` helper. |
| Renderer registry | `R[type](lessonData, stageElement, ctx)`. Each call is wrapped in try/catch so one broken diagram never kills the page. |
| State | `localStorage` keys: `atlas-track` (Core vs Exam-Ready) and `atlas-theme` (light/dark/system). No accounts needed for content. |
| Fonts | Self-hosted Google fonts (OFL): **Bricolage Grotesque** 500–800 (headings), **DM Sans** 400–700 (body), **IBM Plex Mono** (numbers, codes). |
| Cache busting | Every asset URL carries `?v=<hash>`. |
| Analytics | Cloudflare beacon only. |
| URLs | `/index.html`, `/chapters/chapter-01.html` … `chapter-26.html`, `/pricing.html`, `/legal/*`. |

### 2.1 Chapter data shape

```js
window.CHAPTER = {
  n: 3, title: "Rules of the Air", tag: "Annex 2, CAR Sec 9",
  big: "one-sentence summary (hero subtitle)",
  purpose: "why this chapter matters for the exam",
  remember: ["5 sentences", "shown as tilted sticky notes", "in 'The chapter in one minute'"],
  icon: "plane",
  diagrams: [ /* lessons, in order */ ],
  prev: {...}, next: {...}
}
```

Every lesson (diagram) shares a header contract:

```js
{ id, type, short /*TOC label*/, icon, ask /*the question*/, lead /*one-line intro*/,
  takeaway, hook /*memory hook*/, part /*section name*/, tier /*"" = core, "exam" = exam-ready only*/ , ...type-specific }
```

### 2.2 The 23 lesson types (renderer registry)

| Type | What the learner sees | Type-specific data |
|---|---|---|
| `story` | "Start here" card deck with Back / Next and an illustration per card | `steps[{title, text[], visual, kicker}]` |
| `tree` | The "big picture" flowchart: root pill, coloured family columns, tappable boxes; boxes with **+** expand; tapping shows a tip + book quote in an info bar | `root{label, sub, children[{label, sub, icon, tip, quote, children}]}` |
| `flow` | Yes/No decision chart; buttons on each question; path lights up; "Start again" | `start`, `nodes{q1:{text,yes,no}, b1:{type:'end', text, body}}` |
| `sequence` | Animated route: plane moves along numbered stops | `steps[{label, sub, icon, tip, quote}]` |
| `layers` | Altitude stack with bands and a plane | `ground`, `bands[{label, sub, h, tip}]` |
| `plan` | Concentric rings (airspace-style) | rings |
| `matrix` | Comparison table; key cells highlighted; cells tappable for tips | `corner, cols[], rows[{label, cells[{v, key, tip}]}]` |
| `decoder` | Code chips (e.g. a message) — tap a chip to see its meaning | `parts[{text, label, tip, star}]` |
| `timeline` | Markers placed on one numeric axis | `unit, max, ticks[], marks[{at, label, tip}]` |
| `scale` | Bars on one scale | bars |
| `classify` | Sort items into buckets game | `buckets[{id,label}], items[{text, bucket, why}]` |
| `hotspot` | Picture with numbered pins | `svg, spots[{x,y,label,tip}]` |
| `signals` | Filterable pictogram card grid | `groups[], cards[{name, sub, group, svg}]` |
| `numbers` | "Numbers to know" grid of big mono numbers | `items[{k, v, note}]` |
| `pairs` | "Don't mix up": two coloured halves with a VS badge and a "Tell apart" strip | `pairs[{a{label,body}, b{label,body}, rule}]` |
| `quiz` | "Test yourself": progress dashes, one question at a time, A–D option rows, instant feedback with "why" | `questions[{q, options[], answer, why}]` |
| `svg` / `html` | Static drawing with caption | `svg` |
| `explore` | One subject, several tabbed toys | `tabs[{kind, steps[]}]` |
| `stamp` | Case-file game: a case card + a row of "stamps"; press the right one | `stamps[{id,label,sub,what}], cases[{answer,text,why,hint}]` |
| `tricks` | Memory-trick flip cards: picture + "memory trick" line, **Reveal the name**, Back/Next, Shuffle, "All at a glance", counter "0 of 19 revealed" | `cards[{n, name, trick, visual, tip}]` |
| `fly` | Animated SVG flight with step chips | `svg, steps[{label, show[], fly[{d, dur}]}]` |
| `hold` | Specialised interactive (holding entries) | — |
| `locked` | Paywall placeholder | — |

### 2.3 Standard chapter recipe

`story` (Start here) → `tree` (The big picture) → **Parts** (P1, P2…) each holding 2–5 lessons of mixed types → `numbers` (Numbers to know) → `pairs` (Don't mix up) → `quiz` (Test yourself). Lessons marked `tier:"exam"` only appear on the **◆ Exam-Ready** track.

---

## 3. Page layouts

### Home
- Top bar: logo (wordmark with the "70" in an inked, tilted box) · nav pills (Pricing / Get Pass / Sign in / Theme).
- Hero: huge heading, lede, **search box** (pill, inked border, "Find a topic: FIR, hypoxia, NOTAM…"), and a **circle illustration** with a dotted flight path and a plane.
- Grid of chapter cards: big coloured number, round icon badge, title, 3-line summary, footer with lesson counts and an arrow button. Each card takes one of six pastel hues in rotation.

### Chapter
- **Sticky left sidebar**: the two-track switch (Core & Revision · N lessons / ◆ Exam-Ready · N lessons), then a numbered table of contents grouped by Part (P1, P2…), current lesson highlighted with an ink pill, "Free" badges.
- **Hero**: chapter chip, track chip, giant title, subtitle, and a pastel circle with the chapter icon and a dotted plane path.
- **"The chapter in one minute"**: a row of 5 pastel sticky cards with big numbers.
- **Lessons**: icon tile + big question heading + badge; lead line; **takeaway** (dark pill, sparkle icon) beside a **MEMORY HOOK** yellow note; then a large white rounded panel holding the interactive.
- **Info bar** under interactive figures: magnifier icon + "Tap any box — see what it means in the book."
- Part dividers: small caps "PART 1" + large title.
- Footer: next-chapter card, legal links, disclaimer.

---

## 4. Visual design system

| Token | Light | Dark |
|---|---|---|
| paper (page) | `#FBFAF7` warm off-white with a dot grid | `#111318` |
| panel | `#FFFFFF` | `#1A1D24` |
| ink | `#16181D` | `#ECEDF0` |
| muted | `#5F6470` | `#A4A9B4` |
| line | `#E7E4DD` | `#2B2F38` |
| 6 pastel hues (bg / ink-on-bg) | blue `#DCE6FF/#2541A3`, green `#D3F1E3/#126B4D`, orange `#FFE1D1/#AB4A17`, violet `#E8E0FF/#5636B0`, yellow `#FFF0C2/#7D5A00`, pink `#FFDCE3/#A8243F` | deep versions of each |
| accent | `#3D5BD9` | `#8EA6FF` |
| exam track | warm cream/gold tint | gold on dark |

- **Signature "pop" shadow**: `3px 3px 0 ink` (hard offset, no blur) on buttons, pills and active cards: a hand-drawn, sticker feel.
- Soft card shadow elsewhere: `0 1px 2px rgba(…,.06), 0 6px 18px rgba(…,.06)`.
- Big radii (14–22 px), thick ink outlines on interactive pills.
- Sticky notes are slightly **rotated** (±1–2°).
- Real-world "material" colours are fixed in both themes (asphalt, runway paint, signal reds/greens).
- ~35 keyframe animations (pop, draw, fade, shake on wrong answer, pulsing, plane bob, wave, dial…), all disabled under `prefers-reduced-motion`.
- Responsive breakpoints from 920 px down to 360 px; the sidebar collapses on mobile; `pointer:coarse` enlarges tap targets.

---

## 5. Why it works for learning

- **One question per screen**: the learner always knows what they're trying to answer.
- **Answer first, then explore**: the takeaway is shown before the figure, so the figure confirms rather than hides.
- **Memory hooks** sit beside every answer.
- **Active recall everywhere**: flip cards, stamps, sorting games and quizzes make you produce the answer.
- **Two depths**: Core for understanding, Exam-Ready for the extra numbers the exam asks.
- **Consistent visual grammar**: colour = family, ink outline = tappable, yellow = remember this.

## 6. What my site keeps, and what it adds

Kept: data-driven pages, a renderer registry, the lesson header contract, the two tracks, "chapter in one minute", takeaway + memory hook, tree/flow/sequence/layers/matrix/decoder/timeline/classify/numbers/pairs/tricks/stamp/quiz, info bars, dot-grid paper, pastel hue system, pop shadows, light/dark theme.

Added for DGCA prep (not on only70): full end-of-chapter **question banks** from the four books, a **mock-exam mode** in DGCA format, **wrong-answer review**, a **one-stop revision hub** (every value and formula), **mind maps**, **resume where you left off**, and **calculators** (ISA, 1-in-60, wind triangle, PNR/PET, METAR/TAF decoder).
