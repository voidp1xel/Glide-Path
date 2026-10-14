module.exports = {
  n: 2, title: 'The Earth', tag: 'Shape · latitude · longitude · great circles · d.lat and d.long', icon: 'globe', hue: 0, partOfBook: 'General Navigation',
  big: 'The earth\'s real shape and size, the nautical mile, latitude (geocentric vs geodetic) and longitude, great circles, small circles and rhumb lines, and how to work out change of latitude and longitude.',
  purpose: 'Definitions plus two quick sums: d.lat and d.long (including across the 180° meridian). Ellipticity 1/297 and the NM length also appear.',
  lessons: [
    { id: 'map', type: 'mindmap', short: 'Mind map', icon: 'brain', ask: 'The whole chapter on one page',
      root: { label: 'The earth', children: [
        { label: 'Shape', children: [{ label: 'Oblate spheroid' }, { label: '1/297' }, { label: 'Polar 23½ NM shorter' }] },
        { label: 'NM', children: [{ label: '1′ of meridian' }, { label: '1852 m / 6076 ft' }, { label: 'Longer at poles' }] },
        { label: 'Latitude', children: [{ label: 'From equator 0–90°' }, { label: 'Geodetic on charts' }, { label: 'Max diff 45°' }] },
        { label: 'Longitude', children: [{ label: 'From Greenwich 0–180°' }, { label: 'Anti-meridian' }] },
        { label: 'Lines', children: [{ label: 'Great circle' }, { label: 'Small circle' }, { label: 'Rhumb line' }] },
      ] } },
    { id: 'size', part: 'Shape and size', type: 'numbers', icon: 'globe', ask: 'The earth in numbers', revise: true, dgca: true,
      items: [{ k: 'Polar radius', v: '3432 NM', note: '6 356 752 m' }, { k: 'Equatorial radius', v: '3443 NM', note: '6 378 137 m' }, { k: 'Compression', v: '1/297' }, { k: 'Polar diameter shorter by', v: '~23½ NM' }, { k: '1 NM (standard)', v: '1852 m = 6076 ft' }, { k: 'NM at equator / pole', v: '6046 / 6108 ft' }, { k: 'Geodetic–geocentric max', v: '11.6′ at 45°' }] },
    { id: 'geodetic', type: 'svg', fig: 'geodetic-lat', icon: 'target', ask: 'Geocentric or geodetic latitude?', tier: 'exam',
      takeaway: 'Charts use geodetic latitude (from the normal to the spheroid). Geocentric latitude uses the line to the centre. They differ most, about 11.6′, at 45°.' },
    { id: 'lines', part: 'Lines on the earth', type: 'svg', fig: 'gc-rhumb', icon: 'route', ask: 'Great circle or rhumb line?', dgca: true,
      takeaway: 'A great circle\'s plane passes through the earth\'s centre and its shorter arc is the shortest distance. A rhumb line crosses every meridian at the same angle (constant track) and is longer. The equator is both.',
      hook: 'Great = through the centre. Rhumb = same angle.' },
    { id: 'dlong', part: 'd.lat and d.long', type: 'formulas', icon: 'calc', ask: 'Working out d.lat and d.long', dgca: true,
      items: [
        { name: 'd.lat', eq: 'same hemisphere: subtract · opposite: add', ex: '20°30′N to 41°30′S = 62°.', calc: { inputs: [{ k: 'a', label: 'Lat A (N +, S −)', v: 20.5 }, { k: 'b', label: 'Lat B (N +, S −)', v: -41.5 }], f: 'Math.abs(a-b)', unit: '°' } },
        { name: 'd.long', eq: 'difference; if > 180° use 360° − it', ex: '165°W to 170°E: 15° + 10° = 25° (westwards across 180°).', calc: { inputs: [{ k: 'a', label: 'Long A (E +, W −)', v: -165 }, { k: 'b', label: 'Long B (E +, W −)', v: 170 }], f: '(d=>d>180?360-d:d)(Math.abs(a-b))', unit: '°' } },
      ] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'The only line that is both a great circle and a rhumb line (book):', options: ['A meridian', 'The equator', 'Any parallel'], answer: 1 },
        { q: 'The anti-meridian of 030°W is:', options: ['150°E', '030°E', '150°W'], answer: 0 },
        { q: 'Charts are plotted in:', options: ['Geocentric latitude', 'Geodetic latitude', 'Astronomical latitude'], answer: 1 },
      ] },
  ],
};
