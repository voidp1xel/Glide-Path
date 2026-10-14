module.exports = {
  n: 13, title: 'In-flight Navigation', tag: 'Planning · map reading · fixes · 1-in-60 · time to station', icon: 'map', hue: 2, partOfBook: 'General Navigation',
  big: 'Planning a navigation flight, picking and using visual checkpoints, fixing position with radio aids (RBI, RMI, VOR, DME), running fixes, 1-in-60 corrections, time-to-station sums and revising ETAs.',
  purpose: 'Calculation-heavy: time/distance to a beacon from bearing change, revised ETAs, climb and descent distances, still-air distance, plus planning and checkpoint theory.',
  lessons: [
    { id: 'plan', type: 'sequence', icon: 'list', ask: 'The flight-planning sequence', dgca: true,
      steps: [{ label: 'Review info', sub: 'rules, warnings' }, { label: 'Met', sub: 'winds, temps' }, { label: 'Charts' }, { label: 'Route' }, { label: 'Tracks & distances', sub: 'into the log' }, { label: 'Safe altitudes, level' }, { label: 'RAS → TAS' }, { label: 'Headings' }, { label: 'GS & fuel' }, { label: 'Re-check' }, { label: 'Alternates' }] },
    { id: 'checkpoints', type: 'matrix', icon: 'eye', ask: 'Which features make good checkpoints?', dgca: true,
      corner: 'Feature', cols: ['Good for', 'Watch out'],
      rows: [['Coastline inlet / pier', 'Pinpoint', 'Straight beaches give no position'], ['River / lake', 'Line & pinpoint', 'Floods, drought, snow change them'], ['Railway / motorway', 'Tracking (along) or timing (across)', 'Need a junction or bridge to pinpoint'], ['Town', 'Shape', 'Cross-check roads/railways'], ['City', 'Easy to find', 'Too big for an accurate fix'], ['Mast / hill', 'Seen from a distance (elevation)', 'Hill tops may be in cloud']].map(r => ({ label: r[0], cells: r.slice(1) })) },
    { id: 'fixes', type: 'svg', fig: 'fixes', icon: 'target', ask: 'Which fix is most accurate?', dgca: true,
      takeaway: 'Two position lines crossing at 60–90° from accurate aids (twin DME) give the best fix. With three lines, aim for 120° cuts; the centre of the cocked hat is the fix. A running fix takes the time of the last line.' },
    { id: 'bearings', type: 'pairs', icon: 'compass', ask: 'RBI, RMI and VOR bearings', dgca: true,
      pairs: [
        { a: { label: 'RBI (ADF)', body: '**QDM = relative bearing + magnetic heading**; QTE uses variation **at the aircraft**.' }, b: { label: 'RMI', body: 'Card slaved to the compass: the needle head reads the **QDM** directly.' }, rule: '' },
        { a: { label: 'VOR', body: 'OBI: TO flag → QDM, FROM flag → QDR. Variation **at the station**.' }, b: { label: 'DME', body: 'Range arc around the station; slant range normally ignored.' }, rule: 'TACAN = military DME; VORTAC = VOR + TACAN.' },
      ] },
    { id: 'time', type: 'formulas', icon: 'calc', ask: 'Time to station and corrections', dgca: true,
      items: [
        { name: 'Time to station', eq: 'minutes = elapsed min × 60 ÷ bearing change (°)', ex: '5° in 1.5 min → 18 min.', calc: { inputs: [{ k: 't', label: 'Elapsed (min)', v: 1.5 }, { k: 'd', label: 'Bearing change (°)', v: 5 }], f: '(t*60/d).toFixed(1)', unit: 'min' } },
        { name: 'Total correction (1-in-60)', eq: 'TEA + CA = off×60/gone + off×60/to go', ex: '20 NM off, 600 gone, 300 to go → 6°.', calc: { inputs: [{ k: 'o', label: 'Off track (NM)', v: 20 }, { k: 'g', label: 'Gone (NM)', v: 600 }, { k: 'r', label: 'To go (NM)', v: 300 }], f: '(o*60/g+o*60/r).toFixed(1)', unit: '°' } },
        { name: 'Revised ETA', eq: 'use the GS actually achieved', ex: '30 NM in 17 min → 20 NM more ≈ 11 min.', calc: { inputs: [{ k: 'd', label: 'Leg flown (NM)', v: 30 }, { k: 't', label: 'Time taken (min)', v: 17 }, { k: 'n', label: 'Next leg (NM)', v: 20 }], f: '(n*t/d).toFixed(1)', unit: 'min' } },
      ] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [{ q: 'The most accurate two-position-line fix comes from:', options: ['Two NDBs', 'Twin DME cutting at 60–90°', 'VOR and NDB at 30°'], answer: 1 }, { q: 'On an RMI the needle head shows the:', options: ['Relative bearing', 'QDM', 'QTE'], answer: 1 }] },
  ],
};
