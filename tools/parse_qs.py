"""Draft-parse MCQs from OCR text. Usage: parse_qs.py <text> <startline> <endline> [startnum]
Prints JSON list [{n,q,o:[...],flag}] for review."""
import sys, re, json
src = open(sys.argv[1]).read().split('\n')
a, b = int(sys.argv[2]), int(sys.argv[3])
lines = [l for l in src[a-1:b] if not l.startswith('=====')]
expect = int(sys.argv[4]) if len(sys.argv) > 4 else 1
QRE = re.compile(r'^\s*(?:Q|0|O|2|\d)?\s?\.?\s*([0-9IlOoS]{1,3})\s*[.:)\-]\s*(.*)$')
def num(s):
    s = s.replace('I','1').replace('l','1').replace('O','0').replace('o','0').replace('S','5')
    return int(s) if s.isdigit() else None
qs = []; cur = None
for l in lines:
    t = l.strip()
    if not t or re.fullmatch(r'[\d\s•.]{1,6}', t): continue  # page numbers
    m = QRE.match(t)
    k = num(m.group(1)) if m else None
    if m and k is not None and expect <= k <= expect + 2 and (t[0] in 'Q0O2' or t[0].isdigit()) and (k == expect or t[0] == 'Q'):
        for miss in range(expect, k): qs.append({'n': miss, 'stem': ['[MISSING]'], 'opt': []})
        cur = {'n': k, 'stem': [m.group(2)] if m.group(2) else [], 'opt': []}; qs.append(cur); expect = k + 1; continue
    if cur is None: continue
    if not cur['stem']: cur['stem'].append(t); continue
    cur['opt' if (cur['opt'] or re.match(r'^\(?[a-dA-D0-9@øeGo]{1,2}\)', t) or '  ' in t) else 'stem'].append(t)
MK = re.compile(r'^\(?[a-dA-DøG@eos0-9]{1,2}\)\s*|^[a-d][.)]\s+')
for q in qs:
    segs = []
    for l in q['opt']:
        parts = re.split(r'\s{2,}', l)
        pend = False
        for p in parts:
            p = p.strip()
            if not p: continue
            if re.fullmatch(r'\(?[a-dA-DøG@eos0-9]{1,2}\)|[a-d][.)]|\(?[a-d]', p): pend = True; continue
            if MK.match(p): p = MK.sub('', p)
            if segs and not pend and re.match(r'^[a-z]', p) and len(segs[-1]) > 25: segs[-1] += ' ' + p; continue
            segs.append(p); pend = False
    q['o'] = segs; q['q'] = ' '.join(q['stem'])
    del q['stem']; del q['opt']
    q['flag'] = len(segs) not in (3, 4)
print(json.dumps(qs, ensure_ascii=False, indent=0))
