module.exports = {
  n: 24, title: 'Station Models', tag: 'Reading a plotted weather observation', icon: 'target', hue: 0,
  big: 'How a surface observation is plotted around a station circle: wind barbs, temperature, dew point, visibility and weather codes, QFF, pressure change, cloud types, amounts and heights.',
  purpose: 'DGCA gives a plotted station model and asks you to read each element. Learn the positions and the decoding rules (QFF tenths, barbs, VV and h codes).',
  lessons: [
    { id: 'layout', type: 'svg', fig: 'station-model-layout', icon: 'target', ask: 'Where each element sits', dgca: true,
      takeaway: 'Left: TT, VV ww, TdTd. Right: PPP (QFF), 24-h change, past weather. Above: high and medium cloud. Below: low cloud, Nh/h, RRR. Wind shaft points to where the wind comes from; full barb 10 kt, half barb 5 kt.' },
    { id: 'example', type: 'svg', fig: 'station-model-ex', icon: 'eye', ask: 'The book\'s worked example', dgca: true,
      takeaway: '998 means QFF 999.8 hPa (add 9 or 10 in front, tenths last). VV 93 = 500 to < 1000 m. h code 2 = base 100–199 m.' },
    { id: 'codes', type: 'matrix', icon: 'list', ask: 'Visibility and cloud-base codes', revise: true, dgca: true,
      corner: 'Code', cols: ['VV (visibility)', 'h (cloud base)'],
      rows: [['0 / 90', '< 50 m', '0–49 m'], ['1 / 91', '50–<200 m', '50–99 m'], ['2 / 92', '200–<500 m', '100–199 m'], ['3 / 93', '500–<1000 m', '200–299 m'], ['4 / 94', '1–<2 km', '300–599 m'], ['5 / 95', '2–<4 km', '600–999 m'], ['6 / 96', '4–<10 km', '1000–1499 m'], ['7 / 97', '10–<20 km', '1500–1999 m'], ['8 / 98', '20–<50 km', '2000–2500 m'], ['9 / 99', '≥ 50 km', 'none below 2500 m']].map(r => ({ label: r[0], cells: [r[1], r[2]] })) },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'PPP plotted as 962 means QFF:', options: ['962 hPa', '996.2 hPa', '1096.2 hPa'], answer: 1 },
        { q: 'A wind shaft with two full barbs shows:', options: ['10 kt', '20 kt', '50 kt'], answer: 1 },
        { q: 'ww codes 20–29 mean weather:', options: ['Now', 'In the last hour, not now', 'Within sight'], answer: 1 },
      ] },
  ],
};
