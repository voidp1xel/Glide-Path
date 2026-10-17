/* CP and PNR figure: A → B 1200 NM, headwind out (O = 200 kt, H = 300 kt), safe endurance 7 h.
   CP = 1200 × 300 / 500 = 720 NM; PNR time = 7 × 300 / 500 = 4.2 h → 840 NM. x = 80 + NM × 0.53 */
const X = nm => +(80 + nm * 0.53).toFixed(1), Y = 150;
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font:${o.w || 700} ${o.s || 14}px var(--font);fill:${o.c || 'var(--ink)'}">${t}</text>`;
const flag = (nm, lab, sub, col, k, up) => `<g data-k="${k}"><line x1="${X(nm)}" y1="${Y - 34}" x2="${X(nm)}" y2="${Y + 34}" style="stroke:${col}" stroke-width="3"/>${T(X(nm), up ? Y - 44 : Y + 56, lab, { w: 800, c: col })}${T(X(nm), up ? Y - 62 : Y + 74, sub, { s: 13, w: 600, c: 'var(--muted)' })}</g>`;
const CPSVG = `<svg viewBox="0 0 800 260" role="img" aria-label="Route A to B with a headwind out: the critical point lies beyond half way and the PNR beyond that">
  <line x1="${X(0)}" y1="${Y}" x2="${X(1200)}" y2="${Y}" style="stroke:var(--wire)" stroke-width="3" stroke-dasharray="8 7"/>
  <circle cx="${X(0)}" cy="${Y}" r="8" style="fill:var(--ink)"/><circle cx="${X(1200)}" cy="${Y}" r="8" style="fill:var(--ink)"/>
  ${T(X(0), Y + 30, 'A', { s: 18, w: 800 })}${T(X(1200), Y + 30, 'B', { s: 18, w: 800 })}${T(X(600), Y + 30, '1200 NM', { s: 13, c: 'var(--muted)' })}
  <g data-k="wind"><path d="M690 40 L560 40" style="stroke:var(--h0i)" stroke-width="3"/><path d="M574 32 L560 40 L574 48" fill="none" style="stroke:var(--h0i)" stroke-width="3"/>${T(625, 28, 'headwind out: GS 200 kt out, 300 kt home', { s: 13, c: 'var(--h0i)' })}</g>
  ${flag(600, 'Half way', '600 NM', 'var(--muted)', 'half', true)}
  ${flag(720, 'CP 720 NM', '2.4 h on = 2.4 h back', 'var(--h2i)', 'cp', false)}
  ${flag(840, 'PNR 840 NM', 'E 7 h × 300/500 = 4.2 h out', 'var(--h5i)', 'pnr', true)}
</svg>`;

module.exports = {
  n: 12, title: 'PNR, PET and Range', tag: 'Point of no return · critical point · SAR', icon: 'fuel', hue: 4, partOfBook: 'General Navigation',
  big: 'How far you can go and still get back (PNR), where it is equally quick to go on or turn back (critical point), still-air range, and how wind, fuel and engine failure move each of them.',
  purpose: 'Every paper has a PNR or CP sum plus "what moves the CP" theory questions.',
  lessons: [
    { id: 'map', type: 'mindmap', short: 'Mind map', icon: 'brain', ask: 'The whole chapter on one page',
      root: { label: "PNR & CP", children: [
        { label: "CP", children: [{ label: "D × H/(O+H)" }, { label: "Into wind" }, { label: "Fuel no effect" }] },
        { label: "PNR", children: [{ label: "E × H/(O+H) time" }, { label: "∝ fuel" }, { label: "Max in still air" }] },
        { label: "SAR", children: [{ label: "Fuel × TAS ÷ FC" }] },
        { label: "Checks", children: [{ label: "PNR before CP: short of fuel" }] },
      ] } },
    { id: 'cpfly', type: 'fly', part: 'Critical point and PNR', short: 'CP and PNR, animated', icon: 'plane', ask: 'Where are the CP and the PNR on a windy route?', dgca: true,
      lead: 'One route, a headwind on the way out. Step through.',
      takeaway: 'The CP (equal time on or back) moves into wind: with a headwind out it is beyond half way. The PNR depends on fuel: here 7 h of safe endurance takes you 840 NM out and back.',
      hook: 'CP creeps into wind; PNR follows the fuel.',
      svg: CPSVG, base: ['wind'],
      steps: [
        { label: 'The route and the wind', tip: 'A to B is 1200 NM. Out, the headwind cuts the GS to 200 kt; coming home the same wind gives 300 kt.' },
        { label: 'Not half way', show: ['half'], tip: 'In still air (or a pure beam wind) the critical point would be half way, 600 NM.' },
        { label: 'Find the CP', show: ['cp'], fly: [{ d: `M${X(0)},${Y} L${X(720)},${Y}`, tone: 'h2', dur: 2.4 }], tip: 'Distance to CP = D × H ÷ (O + H) = 1200 × 300 ÷ 500 = 720 NM. From there: 480 NM on at 200 kt = 2.4 h; 720 NM back at 300 kt = 2.4 h.' },
        { label: 'Find the PNR', show: ['pnr'], fly: [{ d: `M${X(720)},${Y} L${X(840)},${Y}`, tone: 'h5', dur: 1.2 }], tip: 'Time to PNR = E × H ÷ (O + H) = 7 × 300 ÷ 500 = 4.2 h; × 200 kt = 840 NM.' },
        { label: 'Turn back at the PNR', fly: [{ d: `M${X(840)},${Y + 14} L${X(0)},${Y + 14}`, tone: 'h5', dur: 2.6, dash: true }], tip: '840 NM home at 300 kt = 2.8 h. 4.2 + 2.8 = 7 h: exactly the safe endurance.' },
        { label: 'Check: PNR beyond the CP', role: 'alert', tip: 'If the PNR were before the CP, the fuel would not reach the destination. Fuel moves the PNR, never the CP.' },
      ] },
    { id: 'calc', type: 'tool', tool: 'pnr', icon: 'calc', ask: 'Calculator: PET and PNR', dgca: true, short: 'PET / PNR calculator',
      takeaway: 'Both use H ÷ (O + H): distance to CP = D × H/(O + H); time to PNR = E × H/(O + H), distance = that time × O.',
      hook: 'Home over the sum.' },
    { id: 'rules', part: 'What moves them', type: 'pairs', icon: 'route', ask: 'What moves the CP and the PNR?', dgca: true,
      takeaway: 'Wind moves the CP (into wind); fuel moves the PNR (in proportion). Still air gives the furthest PNR; any wind, from any direction, brings it closer.',
      hook: 'Wind for the CP, fuel for the PNR.',
      pairs: [
        { a: { label: 'Critical point (PET)', body: 'Half way in nil or beam wind. **Moves into wind**. Not affected by fuel. Lower TAS (engine failure) → further into wind.' }, b: { label: 'PNR', body: 'Proportional to **fuel**. **Greatest in still air**; any wind reduces it. If PNR is before the CP, you cannot reach the destination.' }, rule: 'CP: D × H/(O+H). PNR: E × O × H/(O+H).' },
        { a: { label: 'Beam wind grows', body: 'CP distance unchanged; **time** to it increases.' }, b: { label: 'Head ↔ tail swap', body: 'CP moves the same distance the other side of half way.' }, rule: '' },
      ] },
    { id: 'moves', type: 'stamp', icon: 'check', ask: 'Does the CP move?', dgca: true,
      takeaway: 'Only the groundspeeds out and home move the CP. Extra fuel, a beam wind or a heavier aircraft at the same TAS leave its distance alone.',
      stamps: [{ id: 'f', label: 'Further from A' }, { id: 'n', label: 'Nearer A' }, { id: 'x', label: 'No change' }],
      cases: [
        { text: 'The headwind on the way out gets stronger.', answer: 'f', why: 'The CP moves into wind.' },
        { text: 'You load 20% more fuel.', answer: 'x', why: 'Fuel moves the PNR, not the CP.' },
        { text: 'A tailwind on the way out instead of a headwind.', answer: 'n', why: 'Into wind now means back towards A.' },
        { text: 'The beam wind doubles.', answer: 'x', why: 'Distance stays half way; only the time to reach it grows.' },
        { text: 'Engine failure CP: reduced TAS with a headwind out.', answer: 'f', why: 'Lower TAS makes the wind matter more: further into wind.' },
      ] },
    { id: 'formulas', part: 'Formulas and test', type: 'formulas', icon: 'calc', ask: 'Formula card', revise: true,
      takeaway: 'Safe endurance = (fuel on board − reserve) ÷ consumption. Still-air range = fuel available × TAS ÷ consumption.',
      items: [
        { name: 'Safe endurance', eq: 'E = (FOB − reserve) ÷ FC', ex: '(1000 − 200) ÷ 180 = 4.44 h.', calc: { inputs: [{ k: 'f', label: 'FOB', v: 1000 }, { k: 'r', label: 'Reserve', v: 200 }, { k: 'c', label: 'FC per hour', v: 180 }], f: '((f-r)/c).toFixed(2)', unit: 'h' } },
        { name: 'Still air range', eq: 'SAR = fuel available × TAS ÷ FC', ex: '800 × 240 ÷ 120 = 1600 NM.', calc: { inputs: [{ k: 'f', label: 'Fuel available', v: 800 }, { k: 't', label: 'TAS', v: 240 }, { k: 'c', label: 'FC per hour', v: 120 }], f: 'Math.round(f*t/c)', unit: 'NM' } },
      ] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [{ q: 'With a headwind on the way out, the CP is:', options: ['Before half way', 'Beyond half way', 'At half way'], answer: 1 }, { q: 'The PNR distance is greatest:', options: ['With a tailwind out', 'With a headwind out', 'In still air'], answer: 2 },
        { q: 'D 1200 NM, GS out 200 kt, home 300 kt. Distance to the CP:', options: ['480 NM', '600 NM', '720 NM'], answer: 2 },
        { q: 'Carrying 10% more usable fuel moves the PNR:', options: ['10% further out', 'Not at all', '10% closer'], answer: 0 },
        { q: 'Time to the CP is worked with:', options: ['The engine-out GS', 'The normal all-engines GS out', 'TAS'], answer: 1 }] },
  ],
};
