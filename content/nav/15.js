/* Declared distances, plan view: runway 60→620, displaced threshold at 140, stopway 620→690, clearway 620→760. */
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font:${o.w || 700} ${o.s || 14}px var(--font);fill:${o.c || 'var(--ink)'}">${t}</text>`;
const bar = (x1, x2, y, lab, col) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" style="stroke:${col}" stroke-width="4" stroke-linecap="round"/><line x1="${x1}" y1="${y - 8}" x2="${x1}" y2="${y + 8}" style="stroke:${col}" stroke-width="3"/><line x1="${x2}" y1="${y - 8}" x2="${x2}" y2="${y + 8}" style="stroke:${col}" stroke-width="3"/>${T(x1 + 8, y - 8, lab, { a: 'start', w: 800, c: col })}`;
const RWY = `<svg viewBox="0 0 800 330" role="img" aria-label="Runway with displaced threshold, stopway and clearway, and the four declared distances below it">
  <rect x="620" y="30" width="140" height="110" rx="4" fill="none" style="stroke:var(--h3i)" stroke-width="2" stroke-dasharray="7 6"/>${T(745, 48, 'clearway', { a: 'end', s: 13, c: 'var(--h3i)' })}
  <rect x="60" y="60" width="560" height="50" rx="3" style="fill:var(--m-asphalt)"/>
  <rect x="620" y="60" width="70" height="50" style="fill:var(--h4)"/><path d="M620 60 l50 50 M640 60 l50 50 M660 60 l30 30 M620 80 l30 30" style="stroke:var(--h4i)" stroke-width="2"/>
  <line x1="80" y1="85" x2="600" y2="85" style="stroke:var(--m-paint)" stroke-width="3" stroke-dasharray="22 16"/>
  <path d="M75 72 l18 13 l-18 13 M95 72 l18 13 l-18 13" fill="none" style="stroke:var(--m-paint)" stroke-width="3"/>
  <rect x="140" y="62" width="6" height="46" style="fill:var(--m-paint)"/>${T(143, 132, 'displaced threshold', { s: 13, c: 'var(--muted)' })}
  ${T(340, 52, 'take-off direction →', { s: 13, c: 'var(--muted)' })}
  ${bar(60, 620, 170, 'TORA', 'var(--ink)')}${bar(60, 690, 210, 'ASDA = TORA + stopway', 'var(--h4i)')}${bar(60, 760, 250, 'TODA = TORA + clearway', 'var(--h3i)')}${bar(140, 620, 290, 'LDA (from the displaced threshold)', 'var(--h1i)')}
</svg>`;

module.exports = {
  n: 15, title: 'Performance', tag: 'V-speeds · take-off segments · declared distances · balanced field', icon: 'plane', hue: 1, partOfBook: 'General Navigation',
  big: 'Performance terms, the forces in a climb, the take-off flight path and its four segments, every V-speed, cruise and descent performance, glide, and the declared runway distances with stopways, clearways and displaced thresholds.',
  purpose: 'About 57 book questions: V-speed definitions and order, segments, declared distances, balanced field length, effects of flap, temperature, wind and pressure.',
  lessons: [
    { id: 'map', type: 'mindmap', short: 'Mind map', icon: 'brain', ask: 'The whole chapter on one page',
      root: { label: "Performance", children: [
        { label: "Distances", children: [{ label: "TORA" }, { label: "ASDA + stopway" }, { label: "TODA + clearway" }, { label: "LDA" }] },
        { label: "Segments", children: [{ label: "1 gear up" }, { label: "2 limiting" }, { label: "3 accelerate" }, { label: "Final 1500 ft" }] },
        { label: "V-speeds", children: [{ label: "V1 decision" }, { label: "VR ≥ 1.05 VMCA" }, { label: "V2 at 35 ft" }, { label: "VAT 1.3 VSO" }] },
        { label: "Factors", children: [{ label: "Hot, high, heavy" }, { label: "Headwind helps" }] },
        { label: "Balanced field", children: [{ label: "ASDR = TODR" }] },
      ] } },
    { id: 'declared-hs', part: 'Declared distances', type: 'hotspot', short: 'Runway: tap the parts', icon: 'target', ask: 'Which piece of runway counts for what?', dgca: true,
      lead: 'Tap each number on the runway plan.',
      takeaway: 'TORA is the runway; ASDA adds the stopway; TODA adds the clearway; LDA starts at the (displaced) threshold.',
      hook: 'Stop on the stopway, climb over the clearway.',
      svg: RWY, minWidth: 560,
      spots: [
        { x: 340, y: 85, label: 'Runway / TORA', tip: 'Take-off run available: the runway length declared for the ground run.' },
        { x: 655, y: 85, label: 'Stopway', tip: 'Prepared area beyond the TORA to stop in after a rejected take-off. At least as wide as the runway and able to bear the aircraft. Counts **only in ASDA**.' },
        { x: 725, y: 70, label: 'Clearway', tip: 'Area beyond the runway, under aerodrome control, for the initial climb. ≤ half the TORA long, ≥ 75 m each side of the centre line (instrument runway), up-slope ≤ 1.25%. Counts **only in TODA**.' },
        { x: 143, y: 100, label: 'Displaced threshold', tip: 'Shortens the **LDA only**, and only for landings towards it. Take-offs may still use the pavement behind it.' },
        { x: 300, y: 250, label: 'TODA', tip: 'TORA + clearway: you must reach 35 ft before its end, even with an engine failure.' },
        { x: 300, y: 210, label: 'ASDA', tip: 'TORA + stopway: a take-off rejected before V1 must stop within it.' },
        { x: 585, y: 290, label: 'LDA', tip: 'Landing distance available, from the threshold.' },
      ] },
    { id: 'declared', type: 'svg', fig: 'declared', icon: 'route', ask: 'TORA, TODA, ASDA and LDA', dgca: true, tier: 'exam',
      takeaway: 'Clearway adds to TODA only; stopway adds to ASDA only; a displaced threshold shortens LDA only (for landings towards it).',
      hook: 'Clear-to-climb (TODA), stop-to-stop (ASDA).' },
    { id: 'segments', part: 'Take-off', type: 'svg', fig: 'segments', icon: 'pulse', ask: 'The take-off climb segments', dgca: true,
      takeaway: 'Segment 1 ends when the gear is up; segment 2 (to at least 400 ft at V2) is the limiting one; segment 3 is the level acceleration for flap retraction; the final segment reaches at least 1500 ft clean.',
      hook: 'Gear, climb, clean up, climb on.' },
    { id: 'vorder', type: 'sequence', icon: 'gauge', ask: 'Take-off speeds in order', dgca: true,
      takeaway: 'VMCG ≤ V1 ≤ VR ≤ VLOF ≤ V2. V1 is the go/stop decision speed; VR is at least 1.05 VMCA; V2 (at 35 ft) at least 1.1 VMCA and 1.2 VS.',
      hook: 'Control, decide, rotate, lift, climb safely.',
      steps: [{ label: 'VMCG', sub: 'control on the ground' }, { label: 'VEF', sub: 'engine fails' }, { label: 'V1', sub: 'decision' }, { label: 'VR', sub: '≥ 1.05 VMCA' }, { label: 'VLOF', sub: 'lift-off' }, { label: 'V2', sub: '≥ 1.1 VMCA, at 35 ft' }] },
    { id: 'vspeeds', part: 'Speeds', type: 'matrix', icon: 'list', ask: 'V-speeds that get asked', dgca: true, revise: true,
      takeaway: 'Learn the gear trio (VLE, VLO), the flap limit (VFE), the structural trio (VNO, VNE, VA) and the control speeds (VMCA highest with an aft CG, VMCG always below it).',
      corner: 'Speed', cols: ['Meaning'],
      rows: [['VSO', 'Stall, landing configuration'], ['VREF / VAT', '1.3 VSO (1.23 VSR)'], ['VLE', 'Max with gear extended'], ['VLO', 'Max to operate the gear'], ['VFE', 'Max with flaps extended'], ['VNO', 'Max structural cruise (caution, smooth air)'], ['VNE', 'Never exceed'], ['VA', 'Manoeuvring; higher when heavier'], ['VMCA', 'Min control in the air; highest with aft CG; ≤ 5° bank'], ['VMCG', '150 lbf rudder, ≤ 30 ft off centre line; < VMCA'], ['VMBE', 'Max brake energy'], ['VX / VY', 'Best angle / best rate']].map(r => ({ label: r[0], cells: [r[1]] })) },
    { id: 'factors', part: 'What changes performance', type: 'stamp', icon: 'check', ask: 'Better or worse take-off performance?', dgca: true,
      takeaway: 'Dense air (high pressure, low temperature), a headwind and a lighter aircraft all shorten the take-off. Heat, height, tailwind, mass and failed antiskid lengthen it.',
      hook: 'Hot, high, heavy: hopeless.',
      stamps: [{ id: 'u', label: 'Improves' }, { id: 'd', label: 'Worsens' }],
      cases: [{ text: 'Higher atmospheric pressure', answer: 'u', why: 'Denser air: more lift and thrust.' }, { text: 'Higher outside air temperature', answer: 'd', why: 'Less dense air: longer distances, lower limiting masses.' }, { text: 'Headwind component', answer: 'u', why: 'Lower groundspeed for the same airspeed.' }, { text: 'Antiskid inoperative (accelerate-stop)', answer: 'd' }, { text: 'Higher mass', answer: 'd', why: 'Higher V-speeds and longer distances.' }, { text: 'Higher aerodrome elevation', answer: 'd' }] },
    { id: 'bfl', type: 'pairs', icon: 'scale', ask: 'Balanced field and V1', dgca: true,
      takeaway: 'Raising V1 shortens the take-off distance required but lengthens the accelerate-stop distance. The balanced field length is where they are equal: the shortest field for the conditions.',
      hook: 'Balance go against stop.',
      pairs: [{ a: { label: 'Raise V1', body: 'TODR **decreases**, ASDR **increases**.' }, b: { label: 'Balanced field length', body: 'V1 where **ASDR = TODR**: the **shortest** field length, allowing the **maximum** take-off mass.' }, rule: 'Extra clearway with a balanced field allows a higher field-limited TOM with a lower V1.' }] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [{ q: 'A stopway increases only the:', options: ['TODA', 'ASDA', 'TORA'], answer: 1 }, { q: 'The performance-limiting climb segment is the:', options: ['first', 'second', 'final'], answer: 1 },
        { q: 'VAT with a VSO of 100 kt:', options: ['110 kt', '130 kt', '123 kt'], answer: 1, why: 'VAT = 1.3 VSO.' },
        { q: 'A clearway may be no longer than:', options: ['Half the TORA', 'The TORA', '300 m'], answer: 0 },
        { q: 'VMCA is highest with:', options: ['A forward CG', 'An aft CG', 'Flaps up'], answer: 1 }] },
  ],
};
