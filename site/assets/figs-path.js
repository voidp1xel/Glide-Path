/* My Path figures: roadmap Gantt and route flowchart (parent-friendly, printable). */
(function () {
  'use strict';
  const F = G.FIGS;
  /* months from Oct 2026 */
  const M0 = 2026 * 12 + 9; // Oct 2026
  const mi = (y, m) => y * 12 + (m - 1) - M0;
  F['path-roadmap'] = () => {
    const W = 1300, L = 270, R = 24, top = 52, lane = 76;
    const end = mi(2031, 1);
    const X = m => L + (m / end) * (W - L - R);
    const lanes = [
      ['College (IIIT-H B.Tech CSE)', 0], ['Health & medicals', 2], ['DGCA ground exams', 3], ['Cadet programme applications', 4], ['Flying training → airline', 1],
    ];
    const bar = (li, a, b, text, hue, dashed) => {
      const y = top + li * lane + 12, x1 = X(a), x2 = X(b);
      const fits = (x2 - x1) > text.length * 8.4 + 16;
      return `<rect x="${x1}" y="${y}" width="${Math.max(6, x2 - x1)}" height="38" rx="10" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="1.4" ${dashed ? 'stroke-dasharray="5 4"' : ''}/>
        <text x="${fits ? x1 + 9 : x1 + 2}" y="${fits ? y + 25 : y - 6}" style="font:700 15px var(--font);fill:var(--h${hue}i)">${text}</text>`;
    };
    const star = (li, m, text, left) => { const x = X(m), y = top + li * lane + 60; return `<path d="M${x} ${y - 11} l3.2 7 7.6.8 -5.7 5.1 1.6 7.5 -6.7-3.9 -6.7 3.9 1.6-7.5 -5.7-5.1 7.6-.8z" fill="var(--m-sun)" stroke="var(--ink)" stroke-width="1"/><text x="${left ? x - 11 : x + 11}" y="${y + 1}" text-anchor="${left ? 'end' : 'start'}" style="font:700 14px var(--font);fill:var(--ink)">${text}</text>`; };
    let years = '';
    for (let y = 2027; y <= 2030; y++) { const x = X(mi(y, 1)); years += `<line x1="${x}" x2="${x}" y1="${top - 10}" y2="${top + lanes.length * lane}" stroke="var(--line)" stroke-width="1.5"/><text x="${x + 4}" y="${top - 18}" class="hd" style="font-size:18px">${y}</text>`; }
    const nowX = X(0.4);
    return `<svg viewBox="0 0 ${W} ${top + lanes.length * lane + 40}">
      ${years}
      
      ${lanes.map(([n], i) => `<text x="${L - 12}" y="${top + i * lane + 37}" text-anchor="end" class="hd" style="font-size:16px">${n}</text><line x1="${L}" x2="${W - R}" y1="${top + i * lane + 70}" y2="${top + i * lane + 70}" stroke="var(--line)" stroke-dasharray="2 4"/>`).join('')}
      ${bar(0, 0, mi(2027, 7), '2nd year', 0)}${bar(0, mi(2027, 7), mi(2028, 7), '3rd year', 0)}${bar(0, mi(2028, 7), mi(2029, 6), '4th year', 0)}${star(0, mi(2029, 6), 'Degree')}
      ${bar(1, 0, mi(2026, 12), 'Get fit', 5)}${star(1, mi(2026, 12), 'Class 2', true)}${bar(1, mi(2027, 1), mi(2027, 4), 'Class 1', 2)}${star(1, mi(2027, 4), 'Class 1 (~Apr 2027)')}${bar(1, mi(2027, 4), mi(2031, 1), 'Stay fit · renew Class 1 yearly', 1, true)}
      ${bar(2, mi(2026, 12), mi(2027, 6), 'Meteorology', 3)}${bar(2, mi(2027, 6), mi(2027, 12), 'Air Regulations', 4)}${bar(2, mi(2028, 1), mi(2028, 6), 'Air Navigation', 0)}${bar(2, mi(2028, 7), mi(2028, 12), 'Tech General', 2)}${bar(2, mi(2029, 1), mi(2029, 6), 'RTR + Tech Specific', 1)}
      ${bar(3, mi(2027, 4), mi(2029, 6), 'Apply to every cadet intake: IndiGo · Air India · Akasa', 5)}
      ${bar(4, mi(2029, 7), mi(2030, 12), 'Plan B: flying school CPL (~18 months) → airline', 1, true)}
      ${star(4, mi(2027, 6), 'Selected by a cadet programme? Leave college, train full time')}
      <line x1="${nowX}" x2="${nowX}" y1="${top - 6}" y2="${top + lanes.length * lane}" stroke="var(--warn)" stroke-width="2.5"/><text x="${nowX + 4}" y="${top + lanes.length * lane + 20}" style="font:800 15px var(--head);fill:var(--warn)">You are here</text>
      <text x="${W - R}" y="${top + lanes.length * lane + 34}" text-anchor="end" class="sm" style="font-size:14px">Dashed = depends on results / plan B. DGCA passes stay valid 5 years from the first pass.</text>
    </svg>`;
  };

  /* route flowchart with decisions */
  F['path-flow'] = () => {
    const box = (x, y, w, h, t, sub, hue, shape) => `<g><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${shape === 'pill' ? h / 2 : 12}" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="1.6"/>
      <text x="${x}" y="${y + (sub ? -3 : 5)}" text-anchor="middle" style="font:800 13px var(--head);fill:var(--ink)">${t}</text>${sub ? `<text x="${x}" y="${y + 14}" text-anchor="middle" class="sm">${sub}</text>` : ''}</g>`;
    const dia = (x, y, t, t2) => `<g><path d="M${x} ${y - 38} L${x + 110} ${y} L${x} ${y + 38} L${x - 110} ${y}z" fill="var(--hook)" stroke="var(--ink)" stroke-width="1.6"/><text x="${x}" y="${y - 2}" text-anchor="middle" style="font:800 12.5px var(--head);fill:var(--ink)">${t}</text><text x="${x}" y="${y + 14}" text-anchor="middle" class="sm">${t2 || ''}</text></g>`;
    const ar = (x1, y1, x2, y2, lab, lx, ly) => G.FH.arrow(x1, y1, x2, y2, 'var(--ink)', 2) + (lab ? `<text x="${lx ?? (x1 + x2) / 2 + 6}" y="${ly ?? (y1 + y2) / 2}" style="font:800 11.5px var(--font);fill:var(--ink)">${lab}</text>` : '');
    return `<svg viewBox="0 0 1000 1010">
      ${box(500, 40, 360, 50, 'Today · Oct 2026', 'B.Tech CSE 2nd year, IIIT-H · no DGCA exams yet', 0, 'pill')}
      ${ar(500, 66, 500, 104)}
      ${box(500, 135, 420, 56, 'Get medically fit (Oct–Dec 2026)', 'weight < 71 kg · triglycerides & B12 corrected · doctor check', 5)}
      ${ar(500, 164, 500, 196)}
      ${dia(500, 236, 'Class 2 medical', 'Dec 2026')}
      ${ar(610, 236, 760, 236, 'Not fit', 640, 226)}${box(860, 236, 190, 60, 'Fix the issue', 're-examine in 3–6 months', 5)}${ar(860, 268, 860, 300)}<path d="M860 300 Q860 320 640 300" fill="none" stroke="var(--wire)" stroke-width="2" stroke-dasharray="5 4"/>
      ${ar(500, 275, 500, 316, 'Fit')}
      ${dia(500, 356, 'Class 1 medical', 'Jan–Apr 2027')}
      ${ar(610, 356, 760, 356, 'Unfit', 640, 346)}${box(860, 356, 190, 66, 'Rethink / appeal', 'airline career needs Class 1', 2)}
      ${ar(500, 395, 500, 436, 'Fit')}
      ${box(500, 466, 520, 56, 'Two tracks run together while in college', 'apply to every cadet intake  +  clear DGCA exams one by one', 3)}
      ${ar(380, 495, 250, 545)}${ar(620, 495, 750, 545)}
      ${box(250, 575, 340, 56, 'Track A: cadet programmes', 'IndiGo · Air India · Akasa — tests, interviews', 4)}
      ${box(750, 575, 340, 56, 'Track B: DGCA ground exams', 'Met → Regs → Nav → Tech → RTR (2027–29)', 0)}
      ${ar(250, 604, 250, 650)}
      ${dia(250, 690, 'Selected?', 'any time before 2029')}
      ${ar(250, 728, 250, 780, 'Yes')}
      ${box(250, 815, 360, 62, 'Leave college · full-time cadet', 'training ~2 years with airline-linked academy', 1)}
      ${ar(360, 690, 600, 760, 'No', 470, 712)}
      ${ar(750, 604, 750, 760)}
      ${box(750, 800, 380, 70, 'Graduate 2029 with all exams done', 'join a flying school straight away', 1)}
      ${ar(750, 836, 750, 880)}
      ${box(750, 910, 380, 56, 'CPL (~18 months) → type rating → airline', 'or keep applying to cadet / airline hiring', 1)}
      ${ar(250, 847, 250, 940)}
      ${box(500, 975, 560, 50, 'First Officer at an airline', 'either track ends here', 1, 'pill')}
      ${ar(250, 940, 330, 962)}${ar(750, 939, 670, 962)}
    </svg>`;
  };
})();
