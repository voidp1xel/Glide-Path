module.exports = {
  n: 23, title: 'Met Instruments', tag: 'What measures what, and in which unit', icon: 'thermo', hue: 5,
  big: 'One table: every weather element, the instrument that measures it and the unit it is reported in.',
  purpose: 'Asked as one-liners: which instrument measures X, which thermometer uses alcohol, what a nephoscope or transmissometer does.',
  lessons: [
    { id: 'table', type: 'matrix', icon: 'thermo', ask: 'Element → instrument → unit', dgca: true, revise: true,
      corner: 'Element', cols: ['Instruments', 'Unit'],
      rows: [
        { label: 'Pressure', cells: ['Mercury & aneroid barometer, barograph', 'hPa / mb / in Hg'] },
        { label: 'Temperature', cells: [{ v: 'Max: mercury · Min: alcohol', key: true }, '°C'] },
        { label: 'Dew point / RH', cells: ['Dry & wet bulb, hygrometer, hygrograph, psychrometer', '°C / %'] },
        { label: 'Mixing ratio', cells: ['Hygrograph', 'g/kg'] },
        { label: 'Rain / snow', cells: ['Rain gauge, hyetograph, snow gauge', 'mm or cm'] },
        { label: 'Surface wind', cells: ['Wind vane, anemometer, anemograph', { v: '° from TRUE north; kt', key: true }] },
        { label: 'Cloud base', cells: ['Ceilometer, searchlight/laser, ceiling balloon, alidade', 'ft or m'] },
        { label: 'Cloud movement', cells: [{ v: 'Nephoscope', key: true }, '8 compass points'] },
        { label: 'Visibility / RVR', cells: ['Transmissometer, forward scatterometer, AVRA, landmarks', 'm or km'] },
        { label: 'Upper winds', cells: ['Theodolite + pilot balloon, RAWIN', '°; kt, km/h, m/s'] },
        { label: 'Upper P, T, humidity', cells: [{ v: 'Radiosonde; dropsonde (cyclones)', key: true }, 'hPa, °C, %'] },
      ] },
    { id: 'match', type: 'stamp', icon: 'check', ask: 'Which element does it measure?', tier: 'exam',
      stamps: [{ id: 'P', label: 'Pressure' }, { id: 'W', label: 'Wind' }, { id: 'C', label: 'Cloud' }, { id: 'V', label: 'Visibility' }, { id: 'R', label: 'Rain' }],
      cases: [
        { text: 'Aneroid barometer', answer: 'P' }, { text: 'Anemograph', answer: 'W' }, { text: 'Nephoscope', answer: 'C' },
        { text: 'Transmissometer', answer: 'V' }, { text: 'Hyetograph', answer: 'R' }, { text: 'Ceilometer', answer: 'C' },
      ] },
  ],
};
