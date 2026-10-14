module.exports = {
  n: 5, title: 'Time', tag: 'LMT · UTC · zone time · IST · date line', icon: 'clock', hue: 4, partOfBook: 'General Navigation',
  big: 'How longitude turns into time, converting between LMT, UTC, zone time and IST, what happens at the international date line, and how to use almanac sunrise times.',
  purpose: 'Arithmetic questions every paper: arc-to-time, LMT ↔ UTC, IST, flight-time ETA problems, sunrise at another longitude, date-line crossing.',
  lessons: [
    { id: 'sim', type: 'sim', sim: 'time', icon: 'sliders', ask: 'Play with it: what time is it along the world?', dgca: true,
      takeaway: 'Every degree of longitude is 4 minutes. East is ahead, west is behind. Slide UTC and watch day and night sweep westwards; cross 180° and the date changes.',
      hook: 'Longitude east, UTC least; longitude west, UTC best.' },
    { id: 'arc', type: 'matrix', icon: 'hash', ask: 'Arc to time', revise: true, dgca: true,
      corner: 'Arc', cols: ['Time'],
      rows: [['360°', '24 h'], ['15°', '1 h'], ['1°', '4 min'], ['15′', '1 min'], ['1′', '4 s'], ['15″', '1 s']].map(r => ({ label: r[0], cells: [r[1]] })) },
    { id: 'convert', type: 'formulas', icon: 'calc', ask: 'Converters', dgca: true,
      items: [
        { name: 'LMT from UTC', eq: 'LMT = UTC + long/15 (E +, W −)', ex: 'UTC 0000 at 95°20′W → 1738:40 previous day.', calc: { inputs: [{ k: 'u', label: 'UTC (hours, e.g. 13.5)', v: 0 }, { k: 'l', label: 'Longitude (E +, W −)', v: -95.333 }], f: '(t=>{t=((t%24)+24)%24;const h=Math.floor(t),m=Math.round((t-h)*60);return String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")})(u+l/15)', unit: 'LMT' } },
        { name: 'Arc to time', eq: 'minutes = degrees × 4', ex: '87°35′ = 5 h 50 min 20 s.', calc: { inputs: [{ k: 'd', label: 'Degrees (decimal)', v: 87.583 }], f: '(m=>Math.floor(m/60)+" h "+Math.floor(m%60)+" min "+Math.round((m*60)%60)+" s")(d*4)', unit: '' } },
      ] },
    { id: 'dateline', type: 'pairs', icon: 'calendar', ask: 'Crossing the date line', dgca: true,
      pairs: [{ a: { label: 'Westbound (e.g. USA → Japan)', body: 'Date goes **forward** one day.' }, b: { label: 'Eastbound (e.g. Japan → USA)', body: 'Date goes **back** one day.' }, rule: 'East of the line the date is one day earlier.' }] },
    { id: 'kinds', type: 'matrix', icon: 'list', ask: 'Kinds of time', revise: true,
      corner: 'Time', cols: ['Meaning'],
      rows: [['LMT', 'Mean time on your own meridian (from the mean sun at your anti-meridian)'], ['UTC / GMT', 'LMT at Greenwich; atomic-kept; same everywhere'], ['Zone time', '24 zones of 15°; ZN = long ÷ 15; ZT = UTC + ZN'], ['Standard time', 'Legal time for a country; IST = UTC + 5:30 (82°30′E)'], ['Almanac sunrise/sunset', 'In LMT; same LMT along a latitude']].map(r => ({ label: r[0], cells: [r[1]] })) },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: '1° of longitude equals:', options: ['1 min', '4 min', '15 min'], answer: 1 },
        { q: 'GMT 1100 at Chennai. IST at Kolkata is:', options: ['1100', '1630', '1122'], answer: 1 },
        { q: 'Sunrise on a given day occurs at the same ___ along a parallel:', options: ['UTC', 'LMT', 'IST'], answer: 1 },
      ] },
  ],
};
