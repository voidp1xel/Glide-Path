module.exports = {
  n: 4, title: 'Convergency', tag: 'Convergency · conversion angle · GC vs RL tracks', icon: 'compass', hue: 2, partOfBook: 'General Navigation',
  big: 'Why great-circle tracks change as you fly, how to work out convergency and the conversion angle, how to turn a GC track into a rhumb-line track and back, and how to tell the hemisphere from two GC bearings.',
  purpose: 'A calculation favourite: convergency = d.long × sin mean lat, CA = ½ convergency, then add or subtract it the right way. Draw the sketch and remember: the GC lies on the polar side.',
  lessons: [
    { id: 'sim', type: 'sim', sim: 'convergency', icon: 'sliders', ask: 'Play with it: watch the great circle bend', dgca: true,
      takeaway: 'Move the points towards the pole and the great circle bows further from the rhumb line: convergency (d.long × sin lat) grows, and the conversion angle is half of it.',
      hook: 'The great circle always sits on the polar side of the rhumb line.' },
    { id: 'formula', type: 'formulas', icon: 'calc', ask: 'The two formulas', dgca: true,
      items: [
        { name: 'Convergency', eq: 'conv = d.long × sin mean lat', ex: '040°W to 040°E at 30°N: 80 × 0.5 = 40°.', calc: { inputs: [{ k: 'dl', label: 'd.long (°)', v: 80 }, { k: 'lat', label: 'Mean latitude (°)', v: 30 }], f: '(dl*Math.sin(lat*Math.PI/180)).toFixed(1)', unit: '°' } },
        { name: 'Conversion angle', eq: 'CA = ½ convergency', ex: '60°S, 165°W to 177°E: d.long 18°, conv 15.6°, CA 7.8°.', calc: { inputs: [{ k: 'dl', label: 'd.long (°)', v: 18 }, { k: 'lat', label: 'Mean latitude (°)', v: 60 }], f: '(dl*Math.sin(lat*Math.PI/180)/2).toFixed(1)', unit: '°' } },
      ] },
    { id: 'hemisphere', type: 'flow', icon: 'help', ask: 'Which hemisphere are the points in?', dgca: true,
      start: 'q1', nodes: {
        q1: { text: 'Take the two GC bearings (A→B and B→A) and subtract. Is the difference exactly 180°?', yes: 'eq', no: 'q2' },
        q2: { text: 'Is the difference more than 180°?', yes: 'nh', no: 'sh' },
        eq: { end: true, text: 'Both on the equator', body: 'e.g. 270 − 090 = 180.', hue: 1 },
        nh: { end: true, text: 'Northern hemisphere', body: 'e.g. 245 − 055 = 190.', hue: 0 },
        sh: { end: true, text: 'Southern hemisphere', body: 'e.g. 235 − 065 = 170.', hue: 3 },
      } },
    { id: 'apply', type: 'stamp', icon: 'route', ask: 'Add or subtract the conversion angle?', dgca: true,
      lead: 'Sketch it: the GC is on the polar side of the RL. Apply CA where the GC direction is measured.',
      stamps: [{ id: 'p', label: 'RL = GC + CA' }, { id: 'm', label: 'RL = GC − CA' }],
      cases: [
        { text: 'NH, eastbound, GC measured at departure.', answer: 'p', why: 'Initial GC heads more northerly (smaller angle) than the RL.' },
        { text: 'NH, westbound, GC measured at departure.', answer: 'm', why: 'Initial GC (e.g. 279) is more northerly than RL 270.' },
        { text: 'SH, eastbound, GC measured at departure.', answer: 'm', why: 'Initial GC (e.g. 095) is more southerly than the RL (088).' },
        { text: 'SH, westbound, GC measured at departure.', answer: 'p' },
      ] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'Convergency at the equator is:', options: ['Zero', 'Equal to d.long', 'Half d.long'], answer: 0 },
        { q: 'The conversion angle is:', options: ['Equal to convergency', 'Half the convergency', 'Twice the convergency'], answer: 1 },
        { q: 'GC bearings 245° and 055° between two places mean they are in the:', options: ['Northern hemisphere', 'Southern hemisphere', 'On the equator'], answer: 0 },
      ] },
  ],
};
