module.exports = {
  n: 29, title: 'Flight Forecast: Tabular and Cross-Section', tag: 'Met T-3 and Met T-4 samples', icon: 'route', hue: 2,
  big: 'How to read the two route-forecast forms handed to crews: the tabular Met T-3 and the pictorial cross-section Met T-4.',
  purpose: 'Reading practice: where to find winds, temperatures, cloud, freezing level, QNH and significant weather on each form.',
  lessons: [
    { id: 't3', type: 'matrix', icon: 'list', ask: 'Read the sample Met T-3 (Kolkata → Delhi)', dgca: true,
      corner: 'Item', cols: ['Kolkata', 'Lucknow', 'Delhi'],
      rows: [
        { label: '30 000 ft', cells: ['M33', '300/60 … 270/70', 'M30'] }, { label: '20 000 ft', cells: ['M20', '330/45 … 260/55', 'M18'] },
        { label: '10 000 ft', cells: ['12', '050/15 … 120/25', '14'] }, { label: '5 000 ft', cells: ['22', '050/10 … 160/15', '24'] },
        { label: 'Clouds', cells: ['SCT ST 1000, FEW SC 2500', 'SCT AC 12 000, ISOL EMBD CB 2000/35 000', 'BKN CS 35 000'] },
        { label: 'Visibility', cells: ['6 km', '3000 m in rain', '1500 m in TS'] }, { label: 'Significant wx', cells: ['ISOL TS', 'Icing, turbulence in CB', '25 000/15 000'] },
        { label: '0 °C isotherm', cells: ['15 000 ft', '—', '14 000 ft'] }, { label: 'Forecast QNH', cells: ['1006', '—', '1008'] },
      ] },
    { id: 't4', type: 'svg', fig: 't4-section', icon: 'layers', ask: 'What a Met T-4 cross-section looks like', dgca: true,
      takeaway: 'Met T-4 draws the route as a vertical slice: cloud layers by flight level (CI high, AS middle, SC/CB/ST low), with a table of winds and temperatures at FL100–400 at each end and words like veering, backing, weakening.' },
    { id: 'abbr', type: 'numbers', icon: 'hash', ask: 'Abbreviations on the forms', revise: true,
      items: [{ k: 'ISOL', v: '< 50 %' }, { k: 'OCNL', v: '50–75 %' }, { k: 'FRQ', v: '> 75 %' }, { k: 'FEW / SCT', v: '1–2 / 3–4 octas' }, { k: 'BKN / OVC', v: '5–7 / 8 octas' }, { k: 'M', v: 'minus' }, { k: 'EMBD', v: 'embedded' }, { k: 'LOC', v: 'locally' }] },
  ],
};
