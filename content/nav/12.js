module.exports = {
  n: 12, title: 'PNR, PET and Range', tag: 'Point of no return · critical point · SAR', icon: 'fuel', hue: 4, partOfBook: 'General Navigation',
  big: 'How far you can go and still get back (PNR), where it is equally quick to go on or turn back (critical point), still-air range, and how wind, fuel and engine failure move each of them.',
  purpose: 'Every paper has a PNR or CP sum plus "what moves the CP" theory questions.',
  lessons: [
    { id: 'calc', type: 'tool', tool: 'pnr', icon: 'calc', ask: 'Calculator: PET and PNR', dgca: true,
      takeaway: 'Both use H ÷ (O + H): distance to CP = D × H/(O + H); time to PNR = E × H/(O + H), distance = that time × O.' },
    { id: 'rules', type: 'pairs', icon: 'route', ask: 'What moves the CP and the PNR?', dgca: true,
      pairs: [
        { a: { label: 'Critical point (PET)', body: 'Half way in nil or beam wind. **Moves into wind**. Not affected by fuel. Lower TAS (engine failure) → further into wind.' }, b: { label: 'PNR', body: 'Proportional to **fuel**. **Greatest in still air**; any wind reduces it. If PNR is before the CP, you cannot reach the destination.' }, rule: 'CP: D × H/(O+H). PNR: E × O × H/(O+H).' },
        { a: { label: 'Beam wind grows', body: 'CP distance unchanged; **time** to it increases.' }, b: { label: 'Head ↔ tail swap', body: 'CP moves the same distance the other side of half way.' }, rule: '' },
      ] },
    { id: 'formulas', type: 'formulas', icon: 'calc', ask: 'Formula card', revise: true,
      items: [
        { name: 'Safe endurance', eq: 'E = (FOB − reserve) ÷ FC', ex: '(1000 − 200) ÷ 180 = 4.44 h.', calc: { inputs: [{ k: 'f', label: 'FOB', v: 1000 }, { k: 'r', label: 'Reserve', v: 200 }, { k: 'c', label: 'FC per hour', v: 180 }], f: '((f-r)/c).toFixed(2)', unit: 'h' } },
        { name: 'Still air range', eq: 'SAR = fuel available × TAS ÷ FC', ex: '800 × 240 ÷ 120 = 1600 NM.', calc: { inputs: [{ k: 'f', label: 'Fuel available', v: 800 }, { k: 't', label: 'TAS', v: 240 }, { k: 'c', label: 'FC per hour', v: 120 }], f: 'Math.round(f*t/c)', unit: 'NM' } },
      ] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [{ q: 'With a headwind on the way out, the CP is:', options: ['Before half way', 'Beyond half way', 'At half way'], answer: 1 }, { q: 'The PNR distance is greatest:', options: ['With a tailwind out', 'With a headwind out', 'In still air'], answer: 2 }] },
  ],
};
