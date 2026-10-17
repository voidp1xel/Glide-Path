/* Three norths drawing for the hotspot lesson: true north straight up, magnetic 10°E of it, compass 4°E of magnetic; heading 088°T. */
const O = [360, 330], L = 250, d2r = Math.PI / 180;
const tip = (b, r = L) => [O[0] + r * Math.sin(b * d2r), O[1] - r * Math.cos(b * d2r)].map(v => +v.toFixed(1));
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font:${o.w || 700} ${o.s || 15}px var(--font);fill:${o.c || 'var(--ink)'}">${t}</text>`;
const arrow = (b, col, w = 3, r = L) => { const e = tip(b, r), h1 = tip(b - 4, r - 16), h2 = tip(b + 4, r - 16); return `<line x1="${O[0]}" y1="${O[1]}" x2="${e[0]}" y2="${e[1]}" style="stroke:${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${h1} L${e} L${h2}" fill="none" style="stroke:${col}" stroke-width="${w}" stroke-linejoin="round"/>`; };
const arc = (b0, b1, r, col) => `<path d="M${tip(b0, r)} A${r},${r} 0 0 1 ${tip(b1, r)}" fill="none" style="stroke:${col}" stroke-width="3"/>`;
const NORTHS = `<svg viewBox="0 0 720 360" role="img" aria-label="True, magnetic and compass north drawn from one point, with variation and deviation between them and the aircraft heading">
  ${arrow(0, 'var(--ink)')}${T(tip(0)[0] - 12, tip(0)[1] + 6, 'True N', { a: 'end' })}
  ${arrow(20, 'var(--h0i)')}${T(tip(20)[0] + 4, tip(20)[1] - 8, 'Magnetic N', { a: 'start', c: 'var(--h0i)' })}
  ${arrow(32, 'var(--h2i)', 3, 200)}${T(tip(32, 200)[0] + 10, tip(32, 200)[1] + 4, 'Compass N', { a: 'start', c: 'var(--h2i)' })}
  ${arc(0, 20, 150, 'var(--h0i)')}${arc(20, 32, 120, 'var(--h2i)')}
  ${arrow(88, 'var(--h1i)', 4, 300)}${T(tip(88, 300)[0] - 6, tip(88, 300)[1] - 14, 'Heading', { a: 'end', c: 'var(--h1i)' })}
  <circle cx="${O[0]}" cy="${O[1]}" r="7" style="fill:var(--ink)"/>
  ${T(30, 40, 'C 074° + dev 4°E = M 078° + var 10°E = T 088°', { a: 'start', s: 15, w: 800 })}${T(30, 62, 'angles drawn larger than life', { a: 'start', s: 13, w: 600, c: 'var(--muted)' })}
</svg>`;

module.exports = {
  n: 6, title: 'Compass and Directions', tag: 'True · magnetic · compass · CDMVT', icon: 'compass', hue: 0, partOfBook: 'General Navigation',
  big: 'True, magnetic and compass north, variation and deviation, and how to convert a heading from compass to true and back without mixing up the signs.',
  purpose: 'Conversions appear in almost every DGCA paper, often inside a bigger problem. One rhyme does it: east is least, west is best.',
  lessons: [
    { id: 'map', type: 'mindmap', short: 'Mind map', icon: 'brain', ask: 'The whole chapter on one page',
      root: { label: "Directions", children: [
        { label: "Norths", children: [{ label: "True" }, { label: "Magnetic" }, { label: "Compass" }] },
        { label: "Variation", children: [{ label: "True ↔ magnetic" }, { label: "Isogonal / agonic" }, { label: "From the chart" }] },
        { label: "Deviation", children: [{ label: "Magnetic ↔ compass" }, { label: "Aircraft magnetism" }, { label: "Deviation card" }] },
        { label: "Rule", children: [{ label: "C D M V T" }, { label: "East least" }, { label: "West best" }] },
      ] } },
    { id: 'norths', part: 'Three norths', type: 'hotspot', short: 'Three norths', icon: 'compass', ask: 'Which north is which?', dgca: true,
      lead: 'Tap the numbers. Every heading can be measured from three different norths.',
      takeaway: 'True north is the geographic pole; magnetic north is where a free magnet points; compass north is where your compass points in this aircraft. Variation separates true and magnetic, deviation separates magnetic and compass.',
      hook: 'Variation is the earth\'s fault; deviation is the aeroplane\'s.',
      svg: NORTHS, minWidth: 480,
      spots: [
        { x: 360, y: 64, label: 'True north', tip: 'Towards the geographic pole on the earth\'s spin axis. Any line drawn on a chart shows a **true** direction.' },
        { x: 446, y: 96, label: 'Magnetic north', tip: 'Where a freely suspended magnet points. The magnetic and geographic poles are not in the same place.' },
        { x: 470, y: 168, label: 'Compass north', tip: 'Where this aircraft\'s compass points: the aircraft\'s own metal, magnets and electrics pull it off magnetic north.' },
        { x: 386, y: 182, label: 'Variation', sub: 'true ↔ magnetic', tip: 'Angle between true and magnetic north. Magnetic north east of true = easterly (+). Changes from place to place; printed on charts as isogonals.' },
        { x: 413, y: 222, label: 'Deviation', sub: 'magnetic ↔ compass', tip: 'Angle between magnetic and compass north, caused by the aircraft. Changes with heading; read it off the deviation card.' },
        { x: 600, y: 330, label: 'Heading', tip: 'The same nose direction reads 074°C, 078°M and 088°T here. Only the reference changes.' },
      ] },
    { id: 'sim', type: 'sim', sim: 'cdmvt', short: 'Play: C D M V T', icon: 'sliders', ask: 'Play with it: three norths, one heading', dgca: true,
      takeaway: 'Compass + deviation = magnetic; magnetic + variation = true (easterly +, westerly −). The aircraft never moves; only the north you measure from changes.',
      hook: 'Cadbury\'s Dairy Milk Very Tasty: C D M V T.' },
    { id: 'rhyme', part: 'Converting', type: 'pairs', icon: 'spark', ask: 'East is least, west is best', dgca: true,
      takeaway: 'Going from true to magnetic (or magnetic to compass): subtract east, add west. Going the other way (C → T): add east, subtract west.',
      hook: 'East is least, west is best.',
      pairs: [
        { a: { label: 'Variation EAST', body: 'Magnetic **least**: T 100° with 10°E var → M 090°.' }, b: { label: 'Variation WEST', body: 'Magnetic **best**: T 100° with 10°W var → M 110°.' }, rule: 'Same rule for deviation: compass least / best.' },
        { a: { label: 'Isogonal', body: 'Line of **equal variation**.' }, b: { label: 'Agonic', body: 'Line of **zero variation**.' }, rule: 'Do not confuse with aclinic (zero dip).' },
      ] },
    { id: 'practice', type: 'stamp', icon: 'calc', ask: 'Quick conversions', dgca: true,
      takeaway: 'Write C D M V T across the page and fill in the gaps one step at a time; the sign comes from east/west, never from memory of the answer.',
      lead: 'Work C → D → M → V → T. Add east, subtract west.',
      stamps: [{ id: 'a', label: '088°' }, { id: 'b', label: '125°' }, { id: 'c', label: '244°' }, { id: 'd', label: '316°' }],
      cases: [
        { text: 'C 074°, dev 4°E, var 10°E → true?', answer: 'a', why: '074 + 4 = 078°M; 078 + 10 = 088°T.' }, { text: 'C 120°, dev 10°W, var 15°E → true?', answer: 'b', why: '120 − 10 = 110°M; 110 + 15 = 125°T.' },
        { text: 'T 220°, var 12°W, dev 12°W → compass?', answer: 'c', why: '220 + 12 = 232°M; 232 + 12 = 244°C (west is best).' }, { text: 'M 300°, dev 16°W → compass?', answer: 'd', why: '300 + 16 = 316°C.' },
      ] },
    { id: 'lines', type: 'classify', icon: 'grid', ask: 'Variation or dip?', tier: 'exam',
      takeaway: 'Iso-GONAL / a-GONIC are about variation (the angle). Iso-CLINAL / a-CLINIC are about dip (the slope). Next chapter covers dip.',
      hook: 'Gon = angle, clin = slope.',
      buckets: [{ id: 'v', label: 'Variation' }, { id: 'd', label: 'Dip' }],
      items: [
        { text: 'Isogonal', bucket: 'v', why: 'Line joining places of equal variation.' },
        { text: 'Agonic line', bucket: 'v', why: 'Line of zero variation.' },
        { text: 'Isoclinal', bucket: 'd', why: 'Line of equal dip.' },
        { text: 'Aclinic line', bucket: 'd', why: 'Zero dip: the magnetic equator.' },
        { text: 'Magnetic declination', bucket: 'v', why: 'Another name for variation.' },
        { text: 'Magnetic inclination', bucket: 'd', why: 'Another name for dip.' },
      ] },
    { id: 'nums', part: 'Numbers and test', type: 'numbers', icon: 'hash', ask: 'Rules to know', revise: true,
      items: [{ k: 'Order', v: 'C D M V T' }, { k: 'C → T', v: '+E −W' }, { k: 'T → C', v: '−E +W' }, { k: 'Variation east', v: 'M < T' }, { k: 'Deviation caused by', v: 'the aircraft' }, { k: 'Zero variation', v: 'agonic' }] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'When variation is east, magnetic direction is:', options: ['Less than true', 'More than true', 'Equal to true'], answer: 0 },
        { q: 'Deviation is caused by:', options: ['The earth\'s field', 'The aircraft\'s own magnetism', 'Latitude'], answer: 1 },
        { q: 'C 272°, deviation 6°W, variation 4°E. True heading?', options: ['270°', '282°', '274°'], answer: 0, why: '272 − 6 = 266°M; 266 + 4 = 270°T.' },
        { q: 'A line joining places of zero variation is:', options: ['Aclinic', 'Agonic', 'Isogonal'], answer: 1 },
        { q: 'A track drawn on a chart is a:', options: ['True direction', 'Magnetic direction', 'Compass direction'], answer: 0 },
      ] },
  ],
};
