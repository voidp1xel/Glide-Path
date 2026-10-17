/* Animated figure for the GC vs RL lesson: meridians converge on a pole above the drawing.
   A and B sit on the same parallel, 40° of chart convergence apart. */
const P = [400, -260], RAD = 520, d2r = Math.PI / 180;
const onR = (r, a) => [P[0] + r * Math.sin(a * d2r), P[1] + r * Math.cos(a * d2r)].map(v => +v.toFixed(1));
const A = onR(RAD, -20), B = onR(RAD, 20);
const arcAt = (c, r, b0, b1) => { const p = b => [c[0] + r * Math.sin(b * d2r), c[1] - r * Math.cos(b * d2r)].map(v => +v.toFixed(1)); const s = p(b0), e = p(b1); return `M${s} A${r},${r} 0 0 1 ${e}`; };
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font:${o.w || 700} ${o.s || 15}px var(--font);fill:${o.c || 'var(--ink)'}">${t}</text>`;
const meridians = [-30, -20, -10, 0, 10, 20, 30].map(a => { const s = onR(300, a), e = onR(660, a); return `<line x1="${s[0]}" y1="${s[1]}" x2="${e[0]}" y2="${e[1]}" style="stroke:var(--wire)" stroke-width="1.6"/>`; }).join('');
const GCSVG = `<svg viewBox="0 0 800 432" role="img" aria-label="Two points on one parallel; the great circle is the straight line on the polar side of the curved rhumb line">
  ${T(24, 30, 'MERIDIANS CONVERGE TOWARDS THE POLE ↑', { a: 'start', s: 13, w: 800, c: 'var(--muted)' })}
  <g>${meridians}</g>
  <path d="M${onR(RAD, -32)} A${RAD},${RAD} 0 0 0 ${onR(RAD, 32)}" fill="none" style="stroke:var(--wire)" stroke-width="1.5" stroke-dasharray="6 6"/>
  <g data-k="pts"><circle cx="${A[0]}" cy="${A[1]}" r="7" style="fill:var(--ink)"/><circle cx="${B[0]}" cy="${B[1]}" r="7" style="fill:var(--ink)"/>${T(A[0] - 16, A[1] + 6, 'A', { a: 'end', s: 18, w: 800 })}${T(B[0] + 16, B[1] + 6, 'B', { a: 'start', s: 18, w: 800 })}</g>
  <g data-k="gc">${T(400, A[1] - 14, 'Great circle: straight on this chart', { s: 14, c: 'var(--h0i)' })}</g>
  <g data-k="angA"><path d="${arcAt(A, 46, 20, 90)}" fill="none" style="stroke:var(--h2i)" stroke-width="2.5"/>${T(A[0] + 52, A[1] - 40, '070°', { a: 'start', s: 16, w: 800, c: 'var(--h2i)' })}${T(A[0] - 4, A[1] - 58, 'N', { s: 13, c: 'var(--muted)' })}</g>
  <g data-k="angB"><path d="${arcAt(B, 46, -20, 90)}" fill="none" style="stroke:var(--h2i)" stroke-width="2.5"/>${T(B[0] + 8, B[1] - 52, '110°', { a: 'start', s: 16, w: 800, c: 'var(--h2i)' })}${T(B[0] - 26, B[1] - 58, 'N', { s: 13, c: 'var(--muted)' })}</g>
  <g data-k="rl">${T(400, 322, 'Rhumb line: 090° all the way (crosses every meridian at 90°)', { s: 14, c: 'var(--h1i)' })}</g>
  <g data-k="ca"><path d="${arcAt(A, 70, 90, 110)}" fill="none" style="stroke:var(--h5i)" stroke-width="3"/>${T(A[0] + 40, A[1] + 70, 'CA = 20° = ½ convergency', { a: 'start', s: 15, w: 800, c: 'var(--h5i)' })}</g>
  <g data-k="sum">${T(400, 386, 'Track changes 070° → 110°: convergency 40° between the meridians of A and B', { s: 15, w: 800 })}${T(400, 410, 'The great circle lies on the polar side of the rhumb line', { s: 14, c: 'var(--muted)' })}</g>
</svg>`;
const GC = `M${A} L${B}`, RL = `M${A} A${RAD},${RAD} 0 0 0 ${B}`;

module.exports = {
  n: 4, title: 'Convergency', tag: 'Convergency · conversion angle · GC vs RL tracks', icon: 'compass', hue: 2, partOfBook: 'General Navigation',
  big: 'Why great-circle tracks change as you fly, how to work out convergency and the conversion angle, how to turn a GC track into a rhumb-line track and back, and how to tell the hemisphere from two GC bearings.',
  purpose: 'A calculation favourite: convergency = d.long × sin mean lat, CA = ½ convergency, then add or subtract it the right way. Draw the sketch and remember: the GC lies on the polar side.',
  lessons: [
    { id: 'map', type: 'mindmap', short: 'Mind map', icon: 'brain', ask: 'The whole chapter on one page',
      root: { label: "Convergency", children: [
        { label: "Definition", children: [{ label: "Angle between meridians" }, { label: "= change of GC track" }, { label: "0 at equator, d.long at pole" }] },
        { label: "Formulas", children: [{ label: "d.long × sin mean lat" }, { label: "CA = ½ convergency" }] },
        { label: "Charts", children: [{ label: "Mercator 0" }, { label: "Lambert × sin origin" }, { label: "Polar = d.long" }] },
        { label: "Rules", children: [{ label: "GC on polar side" }, { label: "RL = GC ± CA" }, { label: "Sketch first" }] },
        { label: "Hemisphere", children: [{ label: "= 180° equator" }, { label: "> 180° north" }, { label: "< 180° south" }] },
      ] } },
    { id: 'gcfly', type: 'fly', short: 'GC vs RL, animated', icon: 'plane', ask: 'Why does a great-circle track keep changing?', dgca: true, part: 'What convergency is',
      lead: 'Press Play all, or step through. Same two points, two different routes.',
      takeaway: 'Meridians are not parallel, so a straight (great-circle) route crosses each one at a different angle: here 070° at A and 110° at B. That 40° change is the convergency. The rhumb line keeps 090° but is longer.',
      hook: 'Track change between two meridians = convergency.',
      svg: GCSVG, base: ['pts'],
      steps: [
        { label: 'Two points on one parallel', tip: 'A and B are at the same latitude. The meridians through them lean towards the pole above the drawing.' },
        { label: 'Fly the great circle', show: ['gc'], fly: [{ d: GC, tone: 'h0', dur: 2.6 }], tip: 'The great circle is the shortest route. On a Lambert or polar chart it is (nearly) a straight line.' },
        { label: 'Track at A: 070°', show: ['angA'], tip: 'Measured from the meridian through A, the great circle leaves on 070°T.' },
        { label: 'Track at B: 110°', show: ['angB'], tip: 'At B the same straight line crosses B\'s meridian at 110°T. The track changed by 40° without any turn on the chart.' },
        { label: 'Now fly the rhumb line', show: ['rl'], fly: [{ d: RL, tone: 'h1', dur: 2.8 }], tip: 'Along the parallel the track stays 090°: one heading, but a longer route bowed towards the equator.' },
        { label: 'Conversion angle', show: ['ca'], tip: 'The angle between the GC and the RL at either end is the conversion angle: half the convergency (20° here).' },
        { label: 'Put it together', show: ['sum'], role: 'alert', tip: 'Convergency = d.long × sin mean lat on the earth. CA = ½ convergency. The GC is always on the polar side of the RL.' },
      ] },
    { id: 'sim', type: 'sim', sim: 'convergency', icon: 'sliders', ask: 'Play with it: watch the great circle bend', dgca: true,
      takeaway: 'Move the points towards the pole and the great circle bows further from the rhumb line: convergency (d.long × sin lat) grows, and the conversion angle is half of it.',
      hook: 'The great circle always sits on the polar side of the rhumb line.' },
    { id: 'formula', type: 'formulas', icon: 'calc', ask: 'The two formulas', dgca: true, part: 'Working it out',
      takeaway: 'Convergency = d.long × sin mean latitude (0 at the equator, = d.long at the pole). Conversion angle = half of it.',
      hook: 'Long × sine, then halve it.',
      items: [
        { name: 'Convergency', eq: 'conv = d.long × sin mean lat', ex: '040°W to 040°E at 30°N: 80 × 0.5 = 40°.', calc: { inputs: [{ k: 'dl', label: 'd.long (°)', v: 80 }, { k: 'lat', label: 'Mean latitude (°)', v: 30 }], f: '(dl*Math.sin(lat*Math.PI/180)).toFixed(1)', unit: '°' } },
        { name: 'Conversion angle', eq: 'CA = ½ convergency', ex: '60°S, 165°W to 177°E: d.long 18°, conv 15.6°, CA 7.8°.', calc: { inputs: [{ k: 'dl', label: 'd.long (°)', v: 18 }, { k: 'lat', label: 'Mean latitude (°)', v: 60 }], f: '(dl*Math.sin(lat*Math.PI/180)/2).toFixed(1)', unit: '°' } },
      ] },
    { id: 'hemisphere', type: 'flow', icon: 'help', ask: 'Which hemisphere are the points in?', dgca: true,
      takeaway: 'Subtract the two great-circle bearings (A→B and B→A): exactly 180° → equator; more than 180° → northern hemisphere; less → southern.',
      hook: 'More than 180, north is your fate.',
      start: 'q1', nodes: {
        q1: { text: 'Take the two GC bearings (A→B and B→A) and subtract. Is the difference exactly 180°?', yes: 'eq', no: 'q2' },
        q2: { text: 'Is the difference more than 180°?', yes: 'nh', no: 'sh' },
        eq: { end: true, text: 'Both on the equator', body: 'e.g. 270 − 090 = 180.', hue: 1 },
        nh: { end: true, text: 'Northern hemisphere', body: 'e.g. 245 − 055 = 190.', hue: 0 },
        sh: { end: true, text: 'Southern hemisphere', body: 'e.g. 235 − 065 = 170.', hue: 3 },
      } },
    { id: 'apply', type: 'stamp', icon: 'route', ask: 'Add or subtract the conversion angle?', dgca: true,
      takeaway: 'Draw it: the GC sits on the polar side. NH eastbound at departure, RL = GC + CA; NH westbound, RL = GC − CA. The southern hemisphere is the mirror image.',
      hook: 'Sketch first, sign second.',
      lead: 'Sketch it: the GC is on the polar side of the RL. Apply CA where the GC direction is measured.',
      stamps: [{ id: 'p', label: 'RL = GC + CA' }, { id: 'm', label: 'RL = GC − CA' }],
      cases: [
        { text: 'NH, eastbound, GC measured at departure.', answer: 'p', why: 'Initial GC heads more northerly (smaller angle) than the RL.' },
        { text: 'NH, westbound, GC measured at departure.', answer: 'm', why: 'Initial GC (e.g. 279) is more northerly than RL 270.' },
        { text: 'SH, eastbound, GC measured at departure.', answer: 'm', why: 'Initial GC (e.g. 095) is more southerly than the RL (088).' },
        { text: 'SH, westbound, GC measured at departure.', answer: 'p', why: 'Initial GC (e.g. 261) is more southerly than RL 270.' },
        { text: 'NH, eastbound, GC measured at the destination.', answer: 'm', why: 'By the far end the GC has swung past the RL (e.g. 110 vs 090).' },
      ] },
    { id: 'charts', type: 'matrix', icon: 'map', ask: 'Convergence on each chart', revise: true, dgca: true,
      takeaway: 'Mercator shows no convergence (correct only at the equator); Lambert shows d.long × sin (parallel of origin); polar stereographic shows d.long (correct at the pole).',
      corner: 'Chart', cols: ['Chart convergence', 'Correct at'],
      rows: [
        { label: 'Earth', cells: ['d.long × sin mean lat', '—'] },
        { label: 'Mercator', cells: [{ v: '0', key: true, tip: 'Meridians are parallel straight lines.' }, 'Equator'] },
        { label: 'Lambert conformal', cells: [{ v: 'd.long × sin origin', key: true, tip: 'The constant n = sin of the parallel of origin.' }, 'Parallel of origin'] },
        { label: 'Polar stereographic', cells: [{ v: 'd.long', key: true, tip: 'Convergence factor 1.' }, 'Pole'] },
      ] },
    { id: 'nums', part: 'Numbers and test', type: 'numbers', icon: 'hash', ask: 'Numbers to know', revise: true,
      items: [{ k: 'Convergency at the equator', v: '0' }, { k: 'Convergency at the pole', v: '= d.long' }, { k: 'sin 30°', v: '0.5' }, { k: 'sin 45°', v: '0.707' }, { k: 'sin 60°', v: '0.866' }, { k: 'Conversion angle', v: '½ conv' }] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'Convergency at the equator is:', options: ['Zero', 'Equal to d.long', 'Half d.long'], answer: 0 },
        { q: 'The conversion angle is:', options: ['Equal to convergency', 'Half the convergency', 'Twice the convergency'], answer: 1 },
        { q: 'GC bearings 245° and 055° between two places mean they are in the:', options: ['Northern hemisphere', 'Southern hemisphere', 'On the equator'], answer: 0 },
        { q: 'Convergency between 040°W and 040°E at 30°N is:', options: ['80°', '40°', '69°'], answer: 1, why: '80 × sin 30 = 40°.' },
        { q: 'On a Mercator chart, convergence is:', options: ['Zero', 'd.long × sin lat', 'd.long'], answer: 0 },
        { q: 'The great circle lies on which side of the rhumb line?', options: ['Equatorial side', 'Polar side', 'Either, depending on direction'], answer: 1 },
      ] },
  ],
};
