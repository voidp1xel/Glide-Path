# Glidepath · DGCA CPL, Made Visual

An interactive, visual study and exam preparation platform for DGCA Commercial Pilot License (CPL) examinations.

---

## 🛫 Subjects Covered

1. **Meteorology (Met)**
   - Reference: *Aviation Meteorology* by Dr. I.C. Joshi
   - Comprehensive study notes, question banks, and interactive diagrams covering atmospheres, wind, pressure systems, clouds, thunderstorms, icing, and METAR/TAF decoding.

2. **Air Navigation (Nav)**
   - Reference: *Air Navigation* by R.K. Bali
   - Lessons, formula sheets, interactive navigation calculators, compass error visualizers, and route planning exercises.

3. **Air Regulations & Human Factors (Reg)**
   - Reference: *Air Regulation and Human Factors* by R.K. Bali
   - Visual breakdowns of ICAO Annexes, CARs, airspace classifications, rules of the air, and aviation physiology.

4. **Aviator's Handbook (HB)**
   - Reference: *Aviator's Handbook* by Capt. Thomas Tom
   - Practical flight concepts, aircraft instruments, aerodynamics, performance, and general aviation knowledge.

---

## 📁 Repository Structure

```
.
├── AVIATOR'S HANDBOOK.pdf                        # Reference textbook (tracked via Git LFS)
├── Air Navigation R.K Bali.pdf                  # Reference textbook (tracked via Git LFS)
├── Air Regulation and Human Factors - R.K. Bali.pdf # Reference textbook (tracked via Git LFS)
├── Meteorology IC JOSHI .pdf                    # Reference textbook (tracked via Git LFS)
├── content/                                     # Structured chapter & lesson definitions (met, nav, hb)
├── notes/                                       # Curated Markdown study notes for each subject
├── qb/                                          # Question bank JSON data categorized by subject/chapter
├── site/                                        # Static web application (HTML, CSS, JS, PWA assets)
├── tools/                                       # Automation scripts, OCR utilities, and local server
├── firebase/                                    # Firebase security rules & emulator configs
├── docs/                                        # Architecture notes and tear-downs
├── build.js                                     # Build compiler: content + notes + qb -> site/
└── .gitattributes                               # Git LFS configuration for PDFs
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **Python 3** (for local server / tools)
- **Git LFS** (Git Large File Storage)

### Git LFS (for PDF textbooks)

This repository uses [Git LFS](https://git-lfs.github.com/) to manage the large PDF reference books. If you are cloning this repository:

```bash
git lfs install
git clone https://github.com/voidp1xel/Glide-Path.git
```

If you already cloned without LFS:

```bash
git lfs pull
```

### Local Development

1. **Start the local server:**
   ```bash
   python3 tools/serve.py
   ```
   Open your browser at `http://localhost:8765`.

2. **Rebuilding the site:**
   If you modify notes (`notes/*.md`), question banks (`qb/*.json`), or content files (`content/**/*.js`):
   ```bash
   node build.js
   ```

---

## 🛠️ Built With

- **Frontend**: Vanilla JavaScript (ES modules, IIFE renderers), CSS3 (CSS variables, responsive design, dark/light themes), PWA with Service Worker support.
- **Backend / Sync**: Firebase / Firestore integration for offline-capable progress tracking.
- **Visuals & Diagrams**: Custom SVG generators, interactive canvas figures, and responsive motion animations.
