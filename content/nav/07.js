module.exports = {
  n: 7, title: 'Distances on the Earth', tag: 'NM · km · SM · GC distance · departure', icon: 'route', hue: 1, partOfBook: 'General Navigation',
  big: 'Units of distance and how to convert them, great-circle distance along a meridian, departure along a parallel (d.long × cos lat), and the position-finding sums built on them.',
  purpose: 'Calculation marks: unit conversion, departure, finding a longitude or latitude after flying a distance, distances over the pole.',
  lessons: [
    { id: 'units', type: 'numbers', icon: 'hash', ask: 'Units to know by heart', revise: true, dgca: true,
      items: [{ k: '1 NM', v: '1852 m', note: '6076–6080 ft' }, { k: '1 km', v: '0.54 NM', note: '3280 ft' }, { k: '1 SM', v: '0.87 NM', note: '5280 ft' }, { k: '1° latitude', v: '60 NM' }, { k: '1′ latitude', v: '1 NM' }, { k: 'km definition', v: '1/10 000 equator→pole' }, { k: 'NM longest at', v: 'the poles' }] },
    { id: 'departure', type: 'svg', fig: 'departure', icon: 'globe', ask: 'Why does a degree of longitude shrink?', dgca: true,
      takeaway: 'Meridians converge, so the distance between them along a parallel (departure) is d.long in minutes × cos latitude: 60 NM per degree at the equator, 30 NM at 60°, zero at the pole.' },
    { id: 'calc', type: 'formulas', icon: 'calc', ask: 'Distance calculators', dgca: true,
      items: [
        { name: 'Departure', eq: 'dep (NM) = d.long (min) × cos lat', ex: '78°23′ at 27°27′ → 4173 NM.', calc: { inputs: [{ k: 'd', label: 'd.long (degrees, decimal)', v: 78.383 }, { k: 'l', label: 'Latitude (°)', v: 27.45 }], f: 'Math.round(d*60*Math.cos(l*Math.PI/180))', unit: 'NM' } },
        { name: 'd.long from a distance flown E/W', eq: 'd.long (min) = distance / cos lat', ex: '800 NM at 45°20′ → 1138′ = 18°58′.', calc: { inputs: [{ k: 'n', label: 'Distance (NM)', v: 800 }, { k: 'l', label: 'Latitude (°)', v: 45.333 }], f: '(m=>Math.floor(m/60)+"° "+Math.round(m%60)+"′")(n/Math.cos(l*Math.PI/180))', unit: '' } },
        { name: 'km to degrees of latitude', eq: '° = km ÷ 1.852 ÷ 60', ex: '685 km = 370 NM = 6°10′.', calc: { inputs: [{ k: 'k', label: 'Kilometres', v: 685 }], f: '(m=>Math.floor(m/60)+"° "+Math.round(m%60)+"′")(k/1.852)', unit: '' } },
      ] },
    { id: 'traps', type: 'pairs', icon: 'alert', ask: 'Traps in distance sums',
      pairs: [
        { a: { label: 'Over the pole', body: 'Meridian + anti-meridian: (90 − lat₁) + (90 − lat₂) degrees × 60.' }, b: { label: 'Across 180°', body: 'Adding d.long past 180°E gives a W longitude: 190°E = 170°W.' }, rule: '' },
        { a: { label: 'Square flights', body: 'N, E, S, W legs of equal length do not close: the E and W legs are at different latitudes.' }, b: { label: 'Higher parallel = shorter', body: '20° of longitude: 600 NM at 60°N, 722 NM at 53°N.' }, rule: '' },
      ] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'Distance along 60°N between 010°E and 030°W:', options: ['2400 NM', '1200 NM', '600 NM'], answer: 1 },
        { q: '1000 metres is about:', options: ['1 NM', '0.54 NM', '0.87 NM'], answer: 1 },
      ] },
  ],
};
