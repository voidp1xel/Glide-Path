/* "Square" flight figure: pole above the drawing, latitude = distance from it, 1° of longitude = 1° of angle.
   Start 50°N 000°: N 600 NM → 60°N; E 600 NM = 20° of long at 60°N; S 600 NM → 50°N 20°E; W 600 NM = 15.6° at 50°N → ends 4.4°E. */
const P = [400, -300], K = 14, d2r = Math.PI / 180;
const pt = (lat, lon) => { const r = K * (90 - lat), a = (lon - 10) * d2r; return [P[0] + r * Math.sin(a), P[1] + r * Math.cos(a)].map(v => +v.toFixed(1)); };
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font:${o.w || 700} ${o.s || 14}px var(--font);fill:${o.c || 'var(--ink)'}">${t}</text>`;
const par = lat => `<path d="M${pt(lat, -12)} A${K * (90 - lat)},${K * (90 - lat)} 0 0 0 ${pt(lat, 32)}" fill="none" style="stroke:var(--wire)" stroke-width="1.3"/>${T(pt(lat, 32)[0] + 6, pt(lat, 32)[1] + 4, lat + '°N', { a: 'start', s: 13, c: 'var(--muted)' })}`;
const mer = lon => { const a = pt(66, lon), b = pt(44, lon); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" style="stroke:var(--wire)" stroke-width="1.3"/>${T(b[0], b[1] + 16, lon + '°E', { s: 13, c: 'var(--muted)' })}`; };
const W_END = 20 - 600 / (60 * Math.cos(50 * d2r));
const S0 = pt(50, 0), N1 = pt(60, 0), E1 = pt(60, 20), S1 = pt(50, 20), W1 = pt(50, W_END);
const LEG = { n: `M${S0} L${N1}`, e: `M${N1} A${K * 30},${K * 30} 0 0 0 ${E1}`, s: `M${E1} L${S1}`, w: `M${S1} A${K * 40},${K * 40} 0 0 1 ${W1}` };
const SQUARE = `<svg viewBox="0 0 800 370" role="img" aria-label="A north, east, south, west flight of 600 NM each that ends east of where it started">
  ${[45, 50, 55, 60, 65].map(par).join('')}${[-10, 0, 10, 20, 30].map(mer).join('')}
  <g data-k="start"><circle cx="${S0[0]}" cy="${S0[1]}" r="7" style="fill:var(--ink)"/>${T(S0[0] - 12, S0[1] + 5, 'Start 50°N 000°', { a: 'end' })}</g>
  <g data-k="ln">${T(N1[0] - 12, (S0[1] + N1[1]) / 2, 'N 600 NM', { a: 'end', c: 'var(--h0i)' })}</g>
  <g data-k="le">${T((N1[0] + E1[0]) / 2, N1[1] - 14, 'E 600 NM = 20° of long', { c: 'var(--h1i)' })}</g>
  <g data-k="ls">${T(E1[0] + 12, (E1[1] + S1[1]) / 2, 'S 600 NM', { a: 'start', c: 'var(--h2i)' })}</g>
  <g data-k="lw">${T((S1[0] + W1[0]) / 2 + 30, S1[1] + 40, 'W 600 NM = only 15.6° of long', { c: 'var(--h3i)' })}</g>
  <g data-k="gap"><path d="M${W1} A${K * 40},${K * 40} 0 0 1 ${S0}" fill="none" style="stroke:var(--h5i)" stroke-width="4" stroke-dasharray="5 4"/><circle cx="${W1[0]}" cy="${W1[1]}" r="6" style="fill:var(--h5i)"/>${T(S0[0] - 12, S0[1] + 26, 'Gap: ends 4.4°E,', { a: 'end', w: 800, c: 'var(--h5i)' })}${T(S0[0] - 12, S0[1] + 44, '171 NM east of the start', { a: 'end', w: 800, c: 'var(--h5i)' })}</g>
</svg>`;

module.exports = {
  n: 7, title: 'Distances on the Earth', tag: 'NM · km · SM · GC distance · departure', icon: 'route', hue: 1, partOfBook: 'General Navigation',
  big: 'Units of distance and how to convert them, great-circle distance along a meridian, departure along a parallel (d.long × cos lat), and the position-finding sums built on them.',
  purpose: 'Calculation marks: unit conversion, departure, finding a longitude or latitude after flying a distance, distances over the pole.',
  lessons: [
    { id: 'map', type: 'mindmap', short: 'Mind map', icon: 'brain', ask: 'The whole chapter on one page',
      root: { label: "Distances", children: [
        { label: "Units", children: [{ label: "1 NM = 1852 m" }, { label: "1 km = 0.54 NM" }, { label: "1 SM = 0.87 NM" }] },
        { label: "Along a meridian", children: [{ label: "d.lat × 60" }, { label: "Over the pole: co-lats" }] },
        { label: "Departure", children: [{ label: "d.long′ × cos lat" }, { label: "30 NM/° at 60°" }] },
        { label: "Traps", children: [{ label: "km → NM first" }, { label: "Across 180°" }, { label: "Square does not close" }] },
      ] } },
    { id: 'units', part: 'Units', type: 'numbers', icon: 'hash', ask: 'Units to know by heart', revise: true, dgca: true,
      takeaway: '1 NM = 1852 m = one minute of latitude. 1 km = 0.54 NM; 1 SM = 0.87 NM. Longest to shortest: NM > SM > km.',
      hook: 'Nautical beats statute beats kilo.',
      items: [{ k: '1 NM', v: '1852 m', note: '6076–6080 ft' }, { k: '1 km', v: '0.54 NM', note: '3280 ft' }, { k: '1 SM', v: '0.87 NM', note: '5280 ft' }, { k: '1° latitude', v: '60 NM' }, { k: '1′ latitude', v: '1 NM' }, { k: 'km definition', v: '1/10 000 equator→pole' }, { k: 'NM longest at', v: 'the poles' }] },
    { id: 'unitpairs', type: 'pairs', icon: 'ruler', ask: 'Where do the units come from?', tier: 'exam',
      takeaway: 'The NM is an angle on the earth (1′ of arc at the centre); the km was 1/10 000 of the equator-to-pole meridian; the statute mile is just 5280 ft.',
      pairs: [{ a: { label: 'Nautical mile', body: 'Arc subtending **1′ at the earth\'s centre**; varies from ~6046 ft (equator) to ~6108 ft (poles); standard **1852 m = 6076 ft**.' }, b: { label: 'Kilometre', body: 'Originally **1/10 000** of the meridian from equator to pole: 1 km = 3280 ft = 0.54 NM.' }, rule: 'So 90° of latitude = 5400 NM ≈ 10 000 km.' }] },
    { id: 'departure', part: 'Departure', type: 'svg', fig: 'departure', icon: 'globe', ask: 'Why does a degree of longitude shrink?', dgca: true,
      takeaway: 'Meridians converge, so the distance between them along a parallel (departure) is d.long in minutes × cos latitude: 60 NM per degree at the equator, 30 NM at 60°, zero at the pole.',
      hook: 'Departure = d.long × cos lat.' },
    { id: 'calc', type: 'formulas', icon: 'calc', ask: 'Distance calculators', dgca: true,
      takeaway: 'Along a meridian: d.lat × 60. Along a parallel: d.long′ × cos lat. Turn km into NM (÷ 1.852) before turning NM into degrees.',
      items: [
        { name: 'Departure', eq: 'dep (NM) = d.long (min) × cos lat', ex: '78°23′ at 27°27′ → 4173 NM.', calc: { inputs: [{ k: 'd', label: 'd.long (degrees, decimal)', v: 78.383 }, { k: 'l', label: 'Latitude (°)', v: 27.45 }], f: 'Math.round(d*60*Math.cos(l*Math.PI/180))', unit: 'NM' } },
        { name: 'd.long from a distance flown E/W', eq: 'd.long (min) = distance / cos lat', ex: '800 NM at 45°20′ → 1138′ = 18°58′.', calc: { inputs: [{ k: 'n', label: 'Distance (NM)', v: 800 }, { k: 'l', label: 'Latitude (°)', v: 45.333 }], f: '(m=>Math.floor(m/60)+"° "+Math.round(m%60)+"′")(n/Math.cos(l*Math.PI/180))', unit: '' } },
        { name: 'km to degrees of latitude', eq: '° = km ÷ 1.852 ÷ 60', ex: '685 km = 370 NM = 6°10′.', calc: { inputs: [{ k: 'k', label: 'Kilometres', v: 685 }], f: '(m=>Math.floor(m/60)+"° "+Math.round(m%60)+"′")(k/1.852)', unit: '' } },
      ] },
    { id: 'square', type: 'fly', short: 'The square that does not close', icon: 'plane', ask: 'Fly N, E, S, W 600 NM each: where do you end up?', dgca: true,
      lead: 'Press Play all. Each leg is 600 NM.',
      takeaway: 'The east leg is flown at 60°N, where 600 NM is 20° of longitude; the west leg at 50°N, where 600 NM is only 15.6°. You end 4.4° (171 NM) east of the start.',
      hook: 'Equal miles, unequal degrees.',
      svg: SQUARE, base: ['start'],
      steps: [
        { label: 'North 600 NM', show: ['ln'], fly: [{ d: LEG.n, tone: 'h0', dur: 1.8 }], tip: '600 NM along a meridian = 10° of latitude: 50°N → 60°N.' },
        { label: 'East 600 NM', show: ['le'], fly: [{ d: LEG.e, tone: 'h1', dur: 2.2 }], tip: 'At 60°N one degree of longitude is 60 × cos 60 = 30 NM, so 600 NM = 20° of longitude.' },
        { label: 'South 600 NM', show: ['ls'], fly: [{ d: LEG.s, tone: 'h2', dur: 1.8 }], tip: 'Back down 10° of latitude to 50°N, now at 020°E.' },
        { label: 'West 600 NM', show: ['lw'], fly: [{ d: LEG.w, tone: 'h3', dur: 2.2 }], tip: 'At 50°N one degree is 60 × cos 50 = 38.6 NM, so 600 NM is only 15.6° of longitude.' },
        { label: 'It does not close', show: ['gap'], role: 'alert', tip: 'You stop at 004°24′E: 4.4° × 38.6 = 171 NM east of where you started.' },
      ] },
    { id: 'traps', part: 'Traps and test', type: 'pairs', icon: 'alert', ask: 'Traps in distance sums',
      takeaway: 'Over the pole add the two co-latitudes. Across 180° convert the longitude name. Equal legs east and west at different latitudes never cancel.',
      pairs: [
        { a: { label: 'Over the pole', body: 'Meridian + anti-meridian: (90 − lat₁) + (90 − lat₂) degrees × 60.' }, b: { label: 'Across 180°', body: 'Adding d.long past 180°E gives a W longitude: 190°E = 170°W.' }, rule: '' },
        { a: { label: 'Square flights', body: 'N, E, S, W legs of equal length do not close: the E and W legs are at different latitudes.' }, b: { label: 'Higher parallel = shorter', body: '20° of longitude: 600 NM at 60°N, 722 NM at 53°N.' }, rule: '' },
      ] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'Distance along 60°N between 010°E and 030°W:', options: ['2400 NM', '1200 NM', '600 NM'], answer: 1 },
        { q: '1000 metres is about:', options: ['1 NM', '0.54 NM', '0.87 NM'], answer: 1 },
        { q: 'GC distance from 56°N 070°W to 62°N 110°E (over the pole):', options: ['3720 NM', '7080 NM', '360 NM'], answer: 0, why: '(90 − 56) + (90 − 62) = 62° × 60 = 3720 NM.' },
        { q: 'One degree of longitude at 60°N is:', options: ['60 NM', '30 NM', '52 NM'], answer: 1 },
        { q: '685 km of latitude is about:', options: ['6°10′', '11°25′', '3°42′'], answer: 0, why: '685 ÷ 1.852 = 370 NM = 6°10′.' },
      ] },
  ],
};
