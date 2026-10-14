"""Build qb/<id>.json from tools/qbspec/<id>.json.
spec: {id,title,src,text,start,end,[first],key:"abcd..." (book's printed key; '?' = unknown), fix:{n:{q?,o?}}, ex:{n:"why"}, drop:[n], add:[{n,q,o,a,ex}]}"""
import sys, json, subprocess, os, re
def clean(t):
    t = re.sub(r'\s*(\.\s*){2,}', ' … ', t)
    t = re.sub(r'\s+\.$', ' …', t.strip())
    t = re.sub(r'(… ?){2,}', '… ', t)
    t = re.sub(r'\s{2,}', ' ', t)
    t = re.sub(r'^[&(•@©]+\s*', '', t.strip())
    t = re.sub(r'\s*[•]$', '', t)
    return t.strip()
here = os.path.dirname(os.path.abspath(__file__))
for sid in sys.argv[1:]:
    spec = json.load(open(f'{here}/qbspec/{sid}.json'))
    raw = json.loads(subprocess.check_output(['python3', f'{here}/parse_qs.py', f'{here}/ocr/{spec["text"]}.txt', str(spec['start']), str(spec['end']), str(spec.get('first', 1))]))
    groups = spec['key'].split()
    if len(groups) > 1 and any(len(g) != len(groups[0]) for g in groups[:-1]): warn_rows = f'KEY ROW SIZES {[len(g) for g in groups]}'
    else: warn_rows = None
    key = spec['key'].replace(' ', '')
    out, warn = [], ([warn_rows] if warn_rows else [])
    byn = {q['n']: q for q in raw}
    last = max(byn) if byn else 0
    if len(key) != max(last, max([q['n'] for q in spec.get('add', [])], default=0)): warn.append(f'key has {len(key)} answers but parsed {last} questions')
    for n in range(spec.get('first', 1), last + 1):
        if str(n) in [str(x) for x in spec.get('drop', [])]: continue
        q = byn.get(n, {'q': '', 'o': []})
        f = spec.get('fix', {}).get(str(n), {})
        text = f.get('q', q['q']).strip(); opts = f.get('o', q['o'])
        k = key[n - spec.get('first', 1)] if n - spec.get('first', 1) < len(key) else '?'
        if k == '?': warn.append(f'Q{n} no key'); continue
        if f.get('a'): k = f['a']
        a = 'abcde'.index(k)
        if len(opts) not in (2, 3, 4, 5) or a >= len(opts): warn.append(f'Q{n} bad options {opts}')
        item = {'n': n, 'q': clean(text), 'o': [clean(o) for o in opts], 'a': a}
        if str(n) in spec.get('ex', {}): item['ex'] = spec['ex'][str(n)]
        out.append(item)
    for q in spec.get('add', []): out.append(q)
    out.sort(key=lambda q: q['n'])
    json.dump({'title': spec['title'], 'src': spec['src'], 'qs': out}, open(f'{here}/../qb/{sid}.json', 'w'), ensure_ascii=False, indent=0)
    print(sid, len(out), 'questions', '; '.join(warn) if warn else 'OK')
