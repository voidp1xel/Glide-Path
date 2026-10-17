/* Mountain-wave figure: wind from the left over a ridge; waves, cap cloud, lenticulars and the rotor under the first crest. */
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font:${o.w || 700} ${o.s || 14}px var(--font);fill:${o.c || 'var(--ink)'}">${t}</text>`;
const wave = (y0, a) => { let d = `M0,${y0}`; for (let x = 10; x <= 800; x += 10) { const k = x < 170 ? 0 : Math.max(0, 1 - (x - 170) / 900); const yy = x < 170 ? y0 - (x > 90 ? (x - 90) * 0.55 : 0) : y0 - 44 + a * k * Math.sin(((x - 170) / 180) * 2 * Math.PI + Math.PI / 2) * -1; d += ` L${x},${yy.toFixed(1)}`; } return d; };
const lens = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="52" ry="11" style="fill:var(--m-cloud);stroke:var(--m-cloudline)" stroke-width="1.5"/>`;
const WAVE_SVG = `<svg viewBox="0 0 800 340" role="img" aria-label="Wind blowing over a ridge forms waves downwind with a cap cloud, lenticular clouds at the crests and a rotor cloud under the first crest">
  <rect x="0" y="0" width="800" height="300" style="fill:var(--m-sky)" opacity=".35"/>
  <path d="M0 300 L90 300 L180 205 L270 300 L800 300 L800 340 L0 340 Z" style="fill:var(--m-ground)"/>
  <g data-k="wind">${[70, 120].map(y => `<path d="M10 ${y} L70 ${y}" style="stroke:var(--h0i)" stroke-width="3"/><path d="M60 ${y - 7} L72 ${y} L60 ${y + 7}" fill="none" style="stroke:var(--h0i)" stroke-width="3"/>`).join('')}${T(14, 36, 'strong wind, across the ridge', { a: 'start', s: 13, c: 'var(--h0i)' })}</g>
  <g data-k="wave"><path d="${wave(200, 46)}" fill="none" style="stroke:var(--h0i)" stroke-width="2.2" stroke-dasharray="6 5"/><path d="${wave(150, 34)}" fill="none" style="stroke:var(--h0i)" stroke-width="2.2" stroke-dasharray="6 5"/>${T(786, 30, 'stable layer near ridge level → waves 100–200 km downwind', { a: 'end', s: 13, c: 'var(--ink)' })}</g>
  <g data-k="cap"><path d="M150 214 q30 -30 60 0 q-10 26 -30 40 q-14 -18 -30 -40z" style="fill:var(--m-cloud);stroke:var(--m-cloudline)" stroke-width="1.5"/>${T(180, 180, 'cap cloud', { s: 13 })}</g>
  <g data-k="lent">${lens(350, 96)}${lens(530, 104)}${lens(710, 110)}${T(530, 80, 'lenticulars at the crests', { s: 13 })}</g>
  <g data-k="rotor"><circle cx="350" cy="236" r="26" style="fill:var(--m-cloud);stroke:var(--m-cloudline)" stroke-width="1.5"/><path d="M330 228 a22 22 0 1 1 6 22" fill="none" style="stroke:var(--h5i)" stroke-width="3"/>${T(350, 284, 'ROTOR: 2–4 g common, 7 g exceeded', { s: 13, w: 800, c: 'var(--h5i)' })}</g>
</svg>`;
const FLIGHT = 'M0,178 C140,178 240,180 296,204 C326,218 338,262 362,242 C382,220 402,258 436,236 C520,210 640,200 800,198';

module.exports = {
  n: 16, title: 'CAT and Mountain Waves', tag: 'Clear air turbulence · lee waves · rotors', icon: 'mountain', hue: 4,
  big: 'Turbulence you cannot see: where clear-air turbulence hides near jets and the tropopause, and how strong wind over a ridge sets up lee waves, lenticular and rotor clouds.',
  purpose: 'Short chapters with fixed numbers: CAT 23,000–39,000 ft on jet fringes, Oct–May over N India; mountain-wave conditions (30°, 7/15 m/s, stable layer), worst turbulence in rotors, 100–200 km downwind.',
  lessons: [
    { id: 'map', type: 'mindmap', short: 'Mind map', icon: 'brain', ask: 'Both chapters on one page',
      root: { label: 'CAT & waves', children: [
        { label: 'CAT', children: [{ label: '23,000–39,000 ft' }, { label: 'Shear + steep LR' }, { label: 'Jet fringes, upper fronts' }, { label: 'Lee of mountains, above CB' }] },
        { label: 'CAT India', children: [{ label: 'Oct–May N/C/NE (STJ)' }, { label: 'Jul–Aug S (TEJ)' }, { label: 'Severe Dec–Feb' }, { label: '120 × 250 km, 2000 ft deep' }] },
        { label: 'Wave needs', children: [{ label: 'Within 30° of ⊥' }, { label: '7 m/s small, 15 m/s big' }, { label: 'Stable below, less stable above' }] },
        { label: 'Clouds', children: [{ label: 'Cap · Föhn wall' }, { label: 'Lenticular at crests' }, { label: 'Rotor below crests' }] },
        { label: 'Hazards', children: [{ label: 'Draughts 10–25 m/s' }, { label: 'Rotor 2–4 g (7 g)' }, { label: 'Altimeter hysteresis' }, { label: 'Icing' }] },
        { label: 'Extent', children: [{ label: '100–200 km downwind' }, { label: 'λ ≈ 10 km' }, { label: 'More in winter' }] },
      ] } },
    { id: 'cat', part: 'Clear air turbulence', type: 'bullets', icon: 'wind', ask: 'Where does clear air turbulence hide?', dgca: true,
      takeaway: 'High up (23,000–39,000 ft) near the tropopause, on the fringes of jet streams and upper fronts where wind shear and a steep lapse rate combine; also above and downwind of mountains and CB tops.',
      hook: 'CAT lives on the edges of the jet, not in its heart.',
      groups: [
        { title: 'Needs', icon: 'sliders', points: ['Marked horizontal or vertical **wind shear**', '**Steep lapse rate**'] },
        { title: 'Where', icon: 'map', points: ['Jet **fringes**, cold side below the core', 'Upper frontal zones', 'Lee of mountains (wave + jet = severe)', 'Downstream of CB tops'] },
        { title: 'Over India', icon: 'globe', points: ['Oct–May: N, central, NE India (STJ)', 'Jul–Aug: S India (TEJ)', 'Severe Dec–Feb', 'Patches ~120 km N–S × 250 km E–W, ~2,000 ft deep'] },
        { title: 'Escape', icon: 'route', points: ['Climb or descend', 'Turn north or south', 'About 1 km above the tropopause is often clear'] },
      ] },
    { id: 'wave', part: 'Mountain waves', type: 'svg', fig: 'mountain-wave', icon: 'mountain', ask: 'What happens when strong wind crosses a ridge?', dgca: true,
      takeaway: 'With wind within 30° of perpendicular (≥ 7 m/s small hills, ≥ 15 m/s big ranges), increasing with height, and a stable layer at ridge level, standing waves form downwind: cap cloud on the top, lenticulars at the crests, rotors beneath them.',
      hook: 'Rotor = rollercoaster: the worst ride.' },
    { id: 'wavefly', type: 'fly', short: 'Mountain wave, animated', icon: 'mountain', ask: 'What happens downwind of a ridge?', dgca: true,
      lead: 'Step through how a mountain wave builds, then fly through it low down.',
      takeaway: 'A strong wind across a ridge with a stable layer near the top sets up standing waves far downwind. Cap clouds and lenticulars mark them; the rotor under the first crest holds the worst turbulence.',
      hook: 'Lens means wave; roll means rotor.',
      svg: WAVE_SVG, base: [],
      steps: [
        { label: 'Strong wind across the ridge', show: ['wind'], tip: 'Waves need the wind within 30° of perpendicular to the ridge: at least 7 m/s for small hills, 15 m/s for big ranges, increasing with height.' },
        { label: 'Stable air makes waves', show: ['wave'], tip: 'A stable layer near ridge level (less stable above) bounces the flow into standing waves, about 10 km or more apart, reaching 100–200 km downwind and high into the stratosphere.' },
        { label: 'Cap cloud', show: ['cap'], tip: 'On the summit; it can pour down the lee side as a Föhn wall. Severe turbulence near it.' },
        { label: 'Lenticulars', show: ['lent'], tip: 'Lens-shaped clouds at the wave crests, a few thousand feet above the ridge. They look stationary. Smooth edges: smooth air; ragged edges: turbulence.' },
        { label: 'The rotor', show: ['rotor'], tip: 'Under the first crest, about ridge level: the worst turbulence, like a violent thunderstorm (2–4 g common, 7 g exceeded).' },
        { label: 'Fly through low down', fly: [{ d: FLIGHT, tone: 'h5', dur: 3.2 }], role: 'alert', tip: 'Expect moderate to severe turbulence 20–30 NM downwind, strong up- and downdraughts, sudden onset without warning, and altimeter errors.' },
      ] },
    { id: 'wave-flow', takeaway: 'Mountain waves need a wind within 30° of perpendicular to the ridge, strong enough (7 m/s for hills, 15 m/s for ranges) and increasing with height, and a stable layer near ridge level with less stable air above.', hook: 'Across, strong, stable.', type: 'flow', icon: 'help', ask: 'Will mountain waves form?',
      start: 'q1', nodes: {
        q1: { text: 'Is the wind within 30° of perpendicular to the ridge?', yes: 'q2', no: 'e1' },
        q2: { text: 'Is it at least 7 m/s (small hills) or 15 m/s (large ranges), increasing with height?', yes: 'q3', no: 'e1' },
        q3: { text: 'Is there a stable layer at ridge level with less stable air above?', yes: 'e2', no: 'e3' },
        e1: { end: true, text: 'No significant waves', body: 'Flow passes round or weakly over the ridge.', hue: 1 },
        e2: { end: true, text: 'Mountain waves', body: 'Lenticulars, rotors; turbulence up to 20–30 NM (100–200 km) downwind; strong up/down currents; altimeter errors.', hue: 5 },
        e3: { end: true, text: 'Turbulent eddies, no organised wave', body: 'Unstable air mixes rather than oscillating.', hue: 4 },
      } },
    { id: 'clouds', takeaway: 'Cap clouds sit on the summit; lenticulars mark wave crests downwind (smooth if their edges are clean); rotor clouds below the crests mark the worst turbulence, especially under the first wave.', hook: 'Lens means wave; roll means rotor.', type: 'matrix', icon: 'cloud', ask: 'Wave clouds and what they warn of', revise: true,
      corner: 'Cloud', cols: ['Where', 'Warning'],
      rows: [
        { label: 'Cap cloud', cells: ['On the summit', 'Severe turbulence; may pour down the lee as a Föhn wall'] },
        { label: 'Lenticular', cells: ['Wave crests, a few thousand ft above ridge, downwind', 'Smooth if edges clean; ragged edges = turbulence'] },
        { label: 'Rotor / roll', cells: ['Below crests, strongest in the 1st wave, ~ridge level', { v: 'Worst turbulence: 2–4 g common, 7 g exceeded', key: true }] },
        { label: 'Nacreous', cells: ['Upper stratosphere', 'Waves reach very high'] },
      ] },
    { id: 'numbers', part: 'Numbers', type: 'numbers', icon: 'hash', ask: 'Numbers to know',
      items: [{ k: 'CAT band', v: '23,000–39,000 ft' }, { k: 'CAT patch', v: '120 × 250 km', note: '~2,000 ft deep' }, { k: 'Wave wind angle', v: '≤ 30° from ⊥' }, { k: 'Wave wind speed', v: '7 m/s small · 15 m/s large' }, { k: 'Vertical currents', v: '10–25 m/s' }, { k: 'Rotor g', v: '2–4 g (7 g)' }, { k: 'Downwind extent', v: '100–200 km', note: 'expect turbulence 20–30 NM' }, { k: 'Wavelength', v: '≈ 10 km' }] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'Over North India CAT is most frequent in:', options: ['Jul–Aug', 'Oct–May', 'Jun–Sep'], answer: 1 },
        { q: 'The most severe turbulence in a mountain wave is in the:', options: ['Lenticular cloud', 'Rotor cloud', 'Cirrus above'], answer: 1 },
        { q: 'For mountain waves the air at ridge level should be:', options: ['Stable', 'Unstable', 'Neutral'], answer: 0 },
      ] },
  ],
};
