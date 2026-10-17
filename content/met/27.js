module.exports = {
  n: 27, title: 'Radar Report, SIGMET and Satellite Bulletin', tag: 'RAREP · SIGMET format · SAT BLTN', icon: 'target', hue: 1,
  big: 'How a ground radar report (RAREP) describes echoes, how a SIGMET message is laid out, and what a satellite bulletin says.',
  purpose: 'Asked as decoding and order-of-groups questions: RAREP echo terms and units, SIGMET order, SIGMET SST, outlook (OTLK).',
  lessons: [
    { id: 'rarep', part: 'RAREP', type: 'svg', fig: 'rarep-plot', icon: 'target', ask: 'Plot the book\'s radar report', dgca: true,
      takeaway: 'RAREP gives echo-area points as bearing/range (km), the echo character (SLD, BRKN, SCT…), its tendency, movement (direction in tens of degrees, speed in km/h) and echo-top heights in km AMSL (only within 200 km).' },
    { id: 'echo-terms', takeaway: 'Radar reports describe echoes in standard words: EYE and SPRL BAND for cyclones, SQL LN for a squall line, SLD, BRKN, SCT and WDLY SCT for coverage, and INCG/DEC/NO CHG for the trend.', hook: 'Words for shape, words for cover, words for change.', type: 'matrix', icon: 'list', ask: 'Echo character words', dgca: true, revise: true,
      corner: 'Term', cols: ['Meaning'],
      rows: [['EYE', 'Eye wall of a tropical cyclone'], ['SPRL BAND', 'Curved line of echoes: spiral band of a cyclone'], ['SQL LN', 'Squall line ≥ 60 km, length:width ≈ 10:1'], ['BRKN LN', 'Broken line of echoes'], ['SLD', 'Area fully covered'], ['BRKN', '4/8–7/8 covered'], ['SCT', '1/8–4/8 covered'], ['WDLY SCT', '< 1/8 covered'], ['ISLTD', 'Isolated solid echo'], ['ECHO ALOFT', 'Seen only above the beam width'], ['INCG / DEC / NO CHG', 'Tendency']].map(r => ({ label: r[0], cells: [r[1]] })) },
    { id: 'sigmet', takeaway: 'A SIGMET names the MWO, its sequence number and validity (no more than 4 h, 6 h for TC and VA), the phenomenon, whether observed or forecast, where and how high, its movement and intensity change, and an outlook for cyclones and ash.', hook: 'Who, number, when, what, where, which way, worse or better.', part: 'SIGMET message', type: 'decoder', icon: 'alert', ask: 'Tap through a SIGMET', dgca: true, title: 'Cyclone SIGMET from Kolkata MWO',
      parts: [
        { text: 'VECC', label: 'Originating MWO (Kolkata)' }, { text: 'SIGMET 4', label: 'Fourth SIGMET in the series' }, { text: 'VALID 101200/101600', label: 'Valid 10th 1200–1600 UTC (≤ 4 h)', star: true },
        { text: 'TC', label: 'Phenomenon: tropical cyclone' }, { text: 'OBS 20.2N 89.2E AT 1130 UTC', label: 'Observed position and time' }, { text: 'FRQ TS TOPS FL350', label: 'Frequent TS, tops FL350' },
        { text: 'WI 150NM OF CENTRE', label: 'Within 150 NM of the centre' }, { text: 'MOV NW 10KT', label: 'Moving NW at 10 kt' }, { text: 'OTLK TC CENTRE 110300 21N 87.9E …', label: 'Outlook: forecast centre positions beyond the validity', star: true },
      ] },
    { id: 'sigmet-order', takeaway: 'Write a SIGMET in fixed order: MWO, SIGMET number, VALID, phenomenon, OBS/FCST with time, location and levels, movement, intensity change, then the outlook.', type: 'sequence', icon: 'list', ask: 'In what order are SIGMET items written?', tier: 'exam',
      steps: [{ label: 'MWO', sub: 'e.g. VECC' }, { label: 'SIGMET n', sub: 'sequence number' }, { label: 'VALID', sub: 'ddhhmm/ddhhmm' }, { label: 'Phenomenon', sub: 'SEV TURB, FRQ TS…' }, { label: 'OBS / FCST', sub: 'with time' }, { label: 'Location & level', sub: 'TOPS FL390 S OF 25N' }, { label: 'Movement', sub: 'MOV E 25KT' }, { label: 'Intensity', sub: 'INTSF / WKN / NC' }, { label: 'OTLK', sub: 'VA / TC outlook' }] },
    { id: 'sigmet-facts', type: 'numbers', icon: 'hash', ask: 'SIGMET distribution facts', revise: true,
      items: [{ k: 'Supersonic aircraft', v: 'SIGMET SST', note: 'separate numbering' }, { k: 'Sent on AFTN priority', v: 'DD' }, { k: 'To neighbouring MWOs within', v: '1100 NM' }, { k: 'Other MWOs\' SIGMETs go to', v: 'local FIC' }, { k: 'RAREP heights only within', v: '200 km' }, { k: 'Squall-line echo', v: '≥ 60 km, 10:1' }] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'In RAREP the range of echo points is given in:', options: ['NM', 'km', 'hundreds of ft'], answer: 1 },
        { q: 'SIGMET for supersonic flight is called:', options: ['SIGMET SST', 'AIRMET', 'GAMET'], answer: 0 },
        { q: 'WDLY SCT in a RAREP means the area covered is:', options: ['< 1/8', '1/8–4/8', '4/8–7/8'], answer: 0 },
      ] },
  ],
};
