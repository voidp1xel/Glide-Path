/* Cloud portraits, species/feature sketches and optical-phenomena geometry (Met ch 8 and ch 10 galleries). */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const W = 320, HH = 200;
  const sky = (top = 'var(--m-sky,#cfe6f7)', o = .55) => `<rect width="${W}" height="${HH}" fill="${top}" opacity="${o}"/>`;
  const ground = (y = 182) => `<rect x="0" y="${y}" width="${W}" height="${HH - y}" fill="var(--m-ground)" opacity=".85"/>`;
  const ruler = (label, hue) => `<rect x="${W - 92}" y="8" width="84" height="22" rx="11" fill="var(--h${hue})" stroke="var(--h${hue}i)"/><text x="${W - 50}" y="23" text-anchor="middle" style="font:800 11px var(--font);fill:var(--h${hue}i)">${label}</text>`;
  const puff = (x, y, s, fill = 'var(--m-cloud)', stroke = 'var(--m-cloudline)') => H.cloud(x, y, s, fill, stroke);
  // Long one-line captions don't fit a 320-wide card: split them over two lines at the space nearest the middle.
  const wrapCaps = body => body.replace(/<text x="12" y="(\d+)" class="sm"([^>]*)>([^<]{41,})<\/text>/g, (m, y, attr, t) => {
    const mid = t.length / 2; let cut = -1;
    for (let i = 0; i < t.length; i++) if (t[i] === ' ' && (cut < 0 || Math.abs(i - mid) < Math.abs(cut - mid))) cut = i;
    if (cut < 0) return m;
    y = +y; const [y1, y2] = y > 100 ? [y - 15, y] : [y, y + 16];
    return `<text x="12" y="${y1}" class="sm"${attr}>${t.slice(0, cut)}</text><text x="12" y="${y2}" class="sm"${attr}>${t.slice(cut + 1)}</text>`;
  });
  const svg = body => `<svg viewBox="0 0 ${W} ${HH}">${wrapCaps(body)}</svg>`;
  const sun = (x, y, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--m-sun)"/>`;

  /* ---------------- the ten genera ---------------- */
  F['cl-ci'] = () => svg(`${sky()}${ruler('HIGH · ice', 3)}
    ${[[30, 60], [120, 40], [200, 75], [80, 110], [210, 120]].map(([x, y]) => `<path d="M${x} ${y} q35 -18 80 -8 q12 3 18 -8 M${x + 10} ${y + 8} q30 -12 60 -4" fill="none" stroke="var(--m-cloudline)" stroke-width="2.4" stroke-linecap="round"/>`).join('')}
    <text x="12" y="190" class="sm">fibrous white filaments, often hooked</text>`);
  F['cl-cs'] = () => svg(`${sky()}${ruler('HIGH · ice', 3)}<rect x="0" y="34" width="${W}" height="96" fill="#fff" opacity=".45"/>
    ${sun(160, 82, 11)}<circle cx="160" cy="82" r="48" fill="none" stroke="#e8a04a" stroke-width="3" opacity=".9"/><circle cx="160" cy="82" r="44" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/>
    <text x="214" y="70" class="sm">22° halo</text><text x="12" y="190" class="sm">thin milky veil; sun sharp, casts shadows</text>`);
  F['cl-cc'] = () => svg(`${sky()}${ruler('HIGH · ice', 3)}
    ${Array.from({ length: 30 }, (_, i) => { const x = 22 + (i % 10) * 28 + ((i / 10 | 0) % 2) * 12, y = 50 + (i / 10 | 0) * 22; return `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#fff" stroke="var(--m-cloudline)" stroke-width=".8"/>`; }).join('')}
    <text x="12" y="190" class="sm">tiny white grains/ripples, no shading</text>`);
  F['cl-ac'] = () => svg(`${sky()}${ruler('MEDIUM', 0)}
    ${Array.from({ length: 12 }, (_, i) => puff(40 + (i % 4) * 78, 62 + (i / 4 | 0) * 38, .55, i % 3 ? 'var(--m-cloud)' : '#dfe4ec')).join('')}
    <text x="12" y="190" class="sm">rounded masses in rows, with shading</text>`);
  F['cl-as'] = () => svg(`${sky('#b8c4d4', .6)}${ruler('MEDIUM', 0)}<rect x="0" y="30" width="${W}" height="120" fill="#c3cad6" opacity=".9"/>
    <circle cx="160" cy="88" r="16" fill="var(--m-sun)" opacity=".45"/><circle cx="160" cy="88" r="26" fill="none" stroke="#c98" stroke-width="2" opacity=".5"/>
    <text x="196" y="80" class="sm">"ground glass" sun</text><text x="12" y="190" class="sm">grey sheet, no halo, no shadows</text>`);
  F['cl-ns'] = () => svg(`<rect width="${W}" height="${HH}" fill="#8a93a3" opacity=".45"/>${ruler('LOW–MEDIUM', 1)}
    <path d="M0 40 H${W} V128 q-30 10 -60 0 q-40 12 -80 0 q-40 12 -90 0 q-40 10 -90 0z" fill="#6f7888"/>
    ${Array.from({ length: 22 }, (_, i) => `<line x1="${12 + i * 14}" y1="132" x2="${6 + i * 14}" y2="180" stroke="var(--m-rain)" stroke-width="1.8" opacity=".8"/>`).join('')}${ground()}
    <text x="12" y="30" class="sm" style="fill:#fff">dark, thick, blots out the sun · continuous rain</text>`);
  F['cl-sc'] = () => svg(`${sky()}${ruler('LOW', 1)}
    ${Array.from({ length: 7 }, (_, i) => `<ellipse cx="${26 + i * 46}" cy="${110 + (i % 2) * 6}" rx="26" ry="15" fill="#d5dae2" stroke="var(--m-cloudline)"/>`).join('')}
    ${ground()}<text x="12" y="40" class="sm">grey rolls/patches with gaps, low</text>`);
  F['cl-st'] = () => svg(`${sky('#c8cfd9', .7)}${ruler('LOW', 1)}<rect x="0" y="96" width="${W}" height="40" fill="#bcc3cf"/>
    ${Array.from({ length: 30 }, (_, i) => `<line x1="${8 + i * 10.5}" y1="${140 + (i % 3) * 8}" x2="${7 + i * 10.5}" y2="${144 + (i % 3) * 8}" stroke="var(--m-rain)" stroke-width="1.5"/>`).join('')}
    ${ground()}<text x="12" y="88" class="sm">uniform grey layer, very low base · drizzle</text>`);
  F['cl-cu'] = () => svg(`${sky()}${ruler('VERTICAL', 5)}${sun(40, 40)}
    ${[[90, 120, 1.1], [200, 112, 1.4], [280, 130, .8]].map(([x, y, s]) => puff(x, y, s)).join('')}
    <line x1="40" x2="${W - 10}" y1="140" y2="140" stroke="var(--m-cloudline)" stroke-dasharray="4 4" opacity=".6"/><text x="${W - 10}" y="154" text-anchor="end" class="sm">flat bases at the LCL</text>${ground()}`);
  F['cl-cb'] = () => svg(`${sky('#9aa6b8', .45)}${ruler('VERTICAL', 5)}${H.cb(150, 168, .62)}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="${110 + i * 11}" y1="170" x2="${104 + i * 11}" y2="184" stroke="var(--m-rain)" stroke-width="2"/>`).join('')}
    <path d="M232 120 l-14 26 h12 l-10 26" fill="none" stroke="#f2c84b" stroke-width="3" stroke-linejoin="round"/>
    <text x="250" y="60" class="sm">anvil</text>${ground(184)}`);

  /* ---------------- species and supplementary features ---------------- */
  F['sp-lenticularis'] = () => svg(`${sky()}<path d="M0 180 L120 90 L190 180z" fill="var(--m-ground)"/>${[60, 150, 240].map((x, i) => `<ellipse cx="${x + 30}" cy="${70 - i * 4}" rx="44" ry="11" fill="#fff" stroke="var(--m-cloudline)"/>`).join('')}
    <path d="M0 110 Q60 70 120 110 T240 110 T360 110" fill="none" stroke="var(--h4i)" stroke-dasharray="4 4"/><text x="12" y="196" class="sm">lens clouds on lee-wave crests</text>`);
  F['sp-castellanus'] = () => svg(`${sky()}<rect x="20" y="110" width="280" height="22" rx="11" fill="#e8ebf0" stroke="var(--m-cloudline)"/>${[50, 110, 170, 230].map(x => `<path d="M${x} 112 q-6 -30 8 -40 q4 -14 16 -6 q12 -4 10 12 q8 10 0 34z" fill="#eef1f5" stroke="var(--m-cloudline)"/>`).join('')}
    <text x="12" y="160" class="sm">turrets on a common base → mid-level instability</text>`);
  F['sp-fractus'] = () => svg(`${sky('#c8cfd9', .6)}${[[40, 90], [120, 110], [210, 85], [260, 120]].map(([x, y]) => `<path d="M${x} ${y} l18 -8 l14 6 l20 -6 l10 10 l-18 6 l-12 -4 l-20 8z" fill="#9ea7b6"/>`).join('')}${ground()}<text x="12" y="40" class="sm">ragged shreds (often under NS / CB)</text>`);
  F['sp-congestus'] = () => svg(`${sky()}${puff(160, 160, 1.6)}${puff(160, 115, 1.2)}${puff(165, 75, .9)}${ground()}<text x="12" y="40" class="sm">towering cauliflower = TCU</text>`);
  F['sp-calvus'] = () => svg(`${sky()}<path d="M100 170 q-20 -40 10 -60 q-10 -40 30 -50 q20 -20 50 0 q36 4 30 50 q30 20 10 60z" fill="var(--m-cloud)" stroke="var(--m-cloudline)"/>${ground(176)}<text x="12" y="30" class="sm">CB whose top is still rounded (no cirrus yet)</text>`);
  F['sp-capillatus'] = () => svg(`${sky('#9aa6b8', .4)}${H.cb(150, 170, .62)}<text x="12" y="196" class="sm">fibrous cirrus top / anvil: mature CB</text>`);
  F['sp-mammatus'] = () => svg(`${sky('#9aa6b8', .4)}<rect x="0" y="20" width="${W}" height="46" fill="#7c8698"/>${Array.from({ length: 11 }, (_, i) => `<ellipse cx="${18 + i * 29}" cy="70" rx="14" ry="12" fill="#7c8698"/>`).join('')}<text x="12" y="120" class="sm">pouches hanging under the anvil</text><text x="12" y="138" class="sm">→ severe turbulence near a CB</text>`);
  F['sp-virga'] = () => svg(`${sky()}${puff(160, 80, 1.3)}${Array.from({ length: 9 }, (_, i) => `<path d="M${118 + i * 10} 92 q-4 26 -14 40" fill="none" stroke="var(--m-rain)" stroke-width="2" opacity="${.9 - i * .05}"/>`).join('')}${ground()}<text x="12" y="170" class="sm">streaks evaporate before the ground</text>`);
  F['sp-pileus'] = () => svg(`${sky()}${puff(160, 168, 1.5)}${puff(160, 120, 1.1)}<ellipse cx="160" cy="62" rx="50" ry="9" fill="#fff" stroke="var(--m-cloudline)"/>${ground(178)}<text x="220" y="56" class="sm">cap cloud</text>`);
  F['sp-arcus'] = () => svg(`${sky('#9aa6b8', .45)}<path d="M0 60 H${W} V90 L60 130 L0 128z" fill="#6f7888"/><path d="M0 128 L60 130 L${W} 92 V104 L70 146 L0 144z" fill="#8b94a3"/>${H.arrow(250, 160, 140, 160, 'var(--m-cold)', 3)}${ground(176)}<text x="160" y="190" class="sm">shelf/roll at the gust front</text>`);

  /* ---------------- optical phenomena geometry ---------------- */
  const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="6" fill="var(--ink)"/><path d="M${x - 8} ${y + 8} h16 v16 h-16z" fill="var(--ink)" opacity=".6"/>`;
  F['op-halo'] = () => svg(`${sky()}<rect x="0" y="0" width="${W}" height="${HH}" fill="#fff" opacity=".3"/>${sun(160, 100, 12)}
    <circle cx="160" cy="100" r="66" fill="none" stroke="#d65b3a" stroke-width="4"/><circle cx="160" cy="100" r="62" fill="none" stroke="#f0c050" stroke-width="2"/><circle cx="160" cy="100" r="58" fill="none" stroke="#fff" stroke-width="2"/>
    <line x1="160" y1="100" x2="207" y2="53" stroke="var(--ink)" stroke-dasharray="3 3"/><text x="186" y="88" class="sm">22°</text><text x="12" y="190" class="sm">red on the OUTSIDE · ice crystals in CS (refraction)</text>`);
  F['op-corona'] = () => svg(`<rect width="${W}" height="${HH}" fill="#1d2433"/><rect width="${W}" height="${HH}" fill="#9aa6b8" opacity=".25"/>
    <circle cx="160" cy="96" r="44" fill="none" stroke="#c0503a" stroke-width="5" opacity=".9"/><circle cx="160" cy="96" r="36" fill="none" stroke="#e6c35a" stroke-width="4" opacity=".9"/><circle cx="160" cy="96" r="28" fill="none" stroke="#6aa6e0" stroke-width="4" opacity=".9"/>
    <circle cx="160" cy="96" r="13" fill="#f4f1de"/><text x="12" y="190" class="sm" style="fill:#e8eef3">small rings (≤ 5°), red outside · water drops in AS (diffraction)</text>`);
  F['op-rainbow'] = () => svg(`${sky()}${ground(168)}${sun(30, 30, 10)}
    ${[['#d65b3a', 120], ['#f0a040', 114], ['#f0d050', 108], ['#5fb36b', 102], ['#3c8cf0', 96], ['#7a5cc4', 90]].map(([c, r]) => `<path d="M${200 - r} 168 A${r} ${r} 0 0 1 ${200 + r} 168" fill="none" stroke="${c}" stroke-width="5"/>`).join('')}
    ${[['#7a5cc4', 146], ['#3c8cf0', 141], ['#5fb36b', 136], ['#f0d050', 131], ['#d65b3a', 126]].map(([c, r]) => `<path d="M${200 - r} 168 A${r} ${r} 0 0 1 ${200 + r} 168" fill="none" stroke="${c}" stroke-width="2.5" opacity=".5"/>`).join('')}
    ${eye(200, 150)}<text x="44" y="34" class="sm">sun BEHIND you</text><text x="312" y="20" text-anchor="end" class="sm">primary 42° · red outside</text><text x="312" y="36" text-anchor="end" class="sm">secondary ~52° · reversed</text>`);
  F['op-glory'] = () => svg(`<rect width="${W}" height="${HH}" fill="#e8ebf0"/>${[56, 46, 36].map((r, i) => `<circle cx="160" cy="110" r="${r}" fill="none" stroke="${['#d65b3a', '#f0c050', '#3c8cf0'][i]}" stroke-width="5" opacity=".7"/>`).join('')}
    ${H.plane(160, 110, 1.4, 0, '#555')}<text x="12" y="24" class="sm">rings round your own (aircraft) shadow</text><text x="12" y="190" class="sm">on cloud/fog of small drops, opposite the sun</text>`);
  F['op-mirage-inf'] = () => svg(`${sky()}<rect x="0" y="130" width="${W}" height="70" fill="#7d6a52"/><rect x="0" y="130" width="${W}" height="14" fill="#a9c4dc" opacity=".8"/>
    <path d="M250 130 v-40 l20 -14 l20 14 v40z" fill="#5a6a4a"/><path d="M250 132 v26 l20 10 l20 -10 v-26z" fill="#5a6a4a" opacity=".35"/>${eye(30, 116)}
    <path d="M36 116 Q170 168 250 112" fill="none" stroke="var(--warn)" stroke-width="2"/><text x="12" y="30" class="sm">hot surface (steep lapse rate): image BELOW, like water</text>`);
  F['op-mirage-sup'] = () => svg(`${sky('#bcd2e8', .7)}<rect x="0" y="140" width="${W}" height="60" fill="#5d86a8"/><path d="M240 140 h50 v-16 h-50z" fill="#444"/>
    <path d="M240 64 h50 v16 h-50z" fill="#444" opacity=".45"/>${eye(30, 128)}<path d="M36 126 Q150 40 260 132" fill="none" stroke="var(--h0i)" stroke-width="2"/><text x="12" y="30" class="sm">cold sea/snow (inversion): image ABOVE</text>`);
  F['op-bishop'] = () => svg(`<rect width="${W}" height="${HH}" fill="#c9c2b4" opacity=".6"/>${sun(160, 100, 12)}<circle cx="160" cy="100" r="66" fill="none" stroke="#a8622f" stroke-width="8" opacity=".5"/><circle cx="160" cy="100" r="58" fill="none" stroke="#8fb3d9" stroke-width="6" opacity=".5"/><text x="12" y="190" class="sm">~22° dusty ring: bluish inside, reddish-brown outside</text>`);
  F['op-irisation'] = () => svg(`${sky()}${puff(160, 110, 2.2, '#fff')}<path d="M70 80 q40 -40 110 -36" fill="none" stroke="#e48fb0" stroke-width="5" opacity=".8"/><path d="M76 90 q40 -36 104 -32" fill="none" stroke="#7fd0b0" stroke-width="4" opacity=".7"/><text x="12" y="190" class="sm">pastel bands along cloud edges (pink dominates)</text>`);
  F['op-crepuscular'] = () => svg(`<rect width="${W}" height="${HH}" fill="#f0c48a" opacity=".55"/>${sun(160, 170, 18)}${[-60, -35, -12, 12, 35, 60].map(a => { const r = a * Math.PI / 180; return `<path d="M160 170 L${160 + 260 * Math.sin(r - .05)} ${170 - 260 * Math.cos(r - .05)} L${160 + 260 * Math.sin(r + .05)} ${170 - 260 * Math.cos(r + .05)}z" fill="#6c7aa0" opacity=".35"/>`; }).join('')}${ground(176)}<text x="12" y="22" class="sm">shadows of clouds below the horizon</text>`);
  F['op-aurora'] = () => svg(`<rect width="${W}" height="${HH}" fill="#0f1828"/>${[0, 1, 2].map(i => `<path d="M0 ${70 + i * 18} Q80 ${30 + i * 18} 160 ${70 + i * 14} T320 ${60 + i * 16}" fill="none" stroke="${['#3fe0a0', '#7af0c0', '#e05a7a'][i]}" stroke-width="${10 - i * 3}" opacity=".55"/>`).join('')}${Array.from({ length: 14 }, (_, i) => `<circle cx="${12 + i * 23}" cy="${20 + (i * 37) % 30}" r="1.2" fill="#fff"/>`).join('')}<rect x="0" y="176" width="${W}" height="24" fill="#08101c"/><text x="12" y="192" class="sm" style="fill:#cfe">70–1000 km up, near the magnetic poles</text>`);
  F['op-sundog'] = () => svg(`${sky()}<rect x="0" y="60" width="${W}" height="70" fill="#fff" opacity=".35"/>${sun(160, 96, 11)}<circle cx="160" cy="96" r="66" fill="none" stroke="#fff" stroke-width="1.5" opacity=".7"/>
    ${[94, 226].map(x => `<ellipse cx="${x}" cy="96" rx="6" ry="12" fill="#f0c050"/><ellipse cx="${x + (x < 160 ? -3 : 3)}" cy="96" rx="3" ry="10" fill="#d65b3a" opacity=".8"/>`).join('')}<text x="12" y="190" class="sm">bright spots 22° either side of the sun (plate crystals)</text>`);
  F['op-stelmo'] = () => svg(`<rect width="${W}" height="${HH}" fill="#2a3242"/>${H.plane(160, 100, 4, 0, '#c9d2e0')}${[[100, 100], [222, 100], [186, 52], [186, 148]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#7fd4ff" opacity=".5"/><circle cx="${x}" cy="${y}" r="5" fill="#bff0ff"/>`).join('')}<text x="12" y="190" class="sm" style="fill:#dfe8f2">blue-green glow on wingtips/nose in CU/CB</text>`);
  F['op-twilight'] = () => svg(`<defs><linearGradient id="tw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#28366b"/><stop offset=".55" stop-color="#c76b7a"/><stop offset=".85" stop-color="#f2b05a"/></linearGradient></defs><rect width="${W}" height="${HH}" fill="url(#tw)"/>${ground(176)}<text x="12" y="24" class="sm" style="fill:#fff">long path through air: blue scattered out, reds remain</text>`);

  /* ---------------- where clouds live: bands by latitude ---------------- */
  F['cloud-bands-lat'] = () => {
    const Y = kft => 330 - kft * 4.8;
    const col = (x, name, low, mid0, mid1, hi0, hi1) => `<g>
      <rect x="${x}" y="${Y(hi1)}" width="150" height="${Y(hi0) - Y(hi1)}" fill="var(--h3)" stroke="var(--h3i)"/><text x="${x + 75}" y="${(Y(hi0) + Y(hi1)) / 2 + 4}" text-anchor="middle" class="lbl">HIGH ${hi0}–${hi1}k</text>
      <rect x="${x}" y="${Y(mid1)}" width="150" height="${Y(mid0) - Y(mid1)}" fill="var(--h0)" stroke="var(--h0i)" opacity=".9"/><text x="${x + 75}" y="${(Y(mid0) + Y(mid1)) / 2 + 4}" text-anchor="middle" class="lbl">MEDIUM ${mid0}–${mid1}k</text>
      <rect x="${x}" y="${Y(low)}" width="150" height="${Y(0) - Y(low)}" fill="var(--h1)" stroke="var(--h1i)"/><text x="${x + 75}" y="${(Y(0) + Y(low)) / 2 + 4}" text-anchor="middle" class="lbl">LOW 0–${low}k</text>
      <text x="${x + 75}" y="350" text-anchor="middle" class="hd">${name}</text></g>`;
    let ticks = ''; for (let k = 0; k <= 60; k += 10) ticks += `<line x1="44" x2="52" y1="${Y(k)}" y2="${Y(k)}" stroke="var(--ink)"/><text x="40" y="${Y(k) + 4}" text-anchor="end" class="sm">${k}k</text>`;
    return `<svg viewBox="0 0 640 362"><line x1="52" x2="52" y1="${Y(60)}" y2="${Y(0)}" stroke="var(--ink)"/>${ticks}
      ${col(80, 'Polar', 6.5, 6.5, 13, 10, 25)}${col(260, 'Temperate', 6.5, 6.5, 23, 16, 45)}${col(440, 'Tropical (India)', 6.5, 6.5, 25, 20, 60)}
      <text x="620" y="20" text-anchor="end" class="sm">feet (thousands) · bands overlap: medium and high meet higher towards the equator</text></svg>`;
  };
})();
