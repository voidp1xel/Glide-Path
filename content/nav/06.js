module.exports = {
  n: 6, title: 'Compass and Directions', tag: 'True · magnetic · compass · CDMVT', icon: 'compass', hue: 0, partOfBook: 'General Navigation',
  big: 'True, magnetic and compass north, variation and deviation, and how to convert a heading from compass to true and back without mixing up the signs.',
  purpose: 'Conversions appear in almost every DGCA paper, often inside a bigger problem. One rhyme does it: east is least, west is best.',
  lessons: [
    { id: 'sim', type: 'sim', sim: 'cdmvt', icon: 'sliders', ask: 'Play with it: three norths, one heading', dgca: true,
      takeaway: 'Compass + deviation = magnetic; magnetic + variation = true (easterly +, westerly −). The aircraft never moves; only the north you measure from changes.',
      hook: 'Cadbury\'s Dairy Milk Very Tasty: C D M V T.' },
    { id: 'rhyme', type: 'pairs', icon: 'spark', ask: 'East is least, west is best', dgca: true,
      pairs: [
        { a: { label: 'Variation EAST', body: 'Magnetic **least**: T 100° with 10°E var → M 090°.' }, b: { label: 'Variation WEST', body: 'Magnetic **best**: T 100° with 10°W var → M 110°.' }, rule: 'Same rule for deviation: compass least / best.' },
        { a: { label: 'Isogonal', body: 'Line of **equal variation**.' }, b: { label: 'Agonic', body: 'Line of **zero variation**.' }, rule: 'Do not confuse with aclinic (zero dip).' },
      ] },
    { id: 'practice', type: 'stamp', icon: 'calc', ask: 'Quick conversions', dgca: true,
      lead: 'Work C → D → M → V → T. Add east, subtract west.',
      stamps: [{ id: 'a', label: '088°' }, { id: 'b', label: '125°' }, { id: 'c', label: '244°' }, { id: 'd', label: '316°' }],
      cases: [
        { text: 'C 074°, dev 4°E, var 10°E → true?', answer: 'a' }, { text: 'C 120°, dev 10°W, var 15°E → true?', answer: 'b' },
        { text: 'T 220°, var 12°W, dev 12°W → compass?', answer: 'c' }, { text: 'M 300°, dev 16°W → compass?', answer: 'd' },
      ] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'When variation is east, magnetic direction is:', options: ['Less than true', 'More than true', 'Equal to true'], answer: 0 },
        { q: 'Deviation is caused by:', options: ['The earth\'s field', 'The aircraft\'s own magnetism', 'Latitude'], answer: 1 },
      ] },
  ],
};
