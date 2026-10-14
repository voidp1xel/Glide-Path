import json, sys, os, glob, re
def lines_of(boxes):
    # boxes: list of (text,x0,top,x1,bot); group into lines by vertical overlap
    boxes = sorted(boxes, key=lambda b: (b[2]+b[4])/2)
    lines = []
    for b in boxes:
        cy = (b[2]+b[4])/2; h = b[4]-b[2]
        for L in lines:
            if abs(L['cy']-cy) < max(0.45*min(h, L['h']), 0.004):
                L['b'].append(b); L['cy'] = (L['cy']*(len(L['b'])-1)+cy)/len(L['b']); break
        else:
            lines.append({'cy': cy, 'h': h, 'b': [b]})
    lines.sort(key=lambda L: L['cy'])
    out = []
    for L in lines:
        bs = sorted(L['b'], key=lambda b: b[1])
        out.append((L['cy'], '  '.join(b[0] for b in bs)))
    return out
def page_text(path, allow2=True):
    raw = json.load(open(path))
    boxes = [(t, x0, 1-y1, x1, 1-y0) for t, x0, y0, x1, y1, c in raw if t.strip()]
    if not boxes: return ''
    # find gutter: x in 0.40..0.60 crossed by fewest non-spanning boxes
    best = None
    for gx in [i/100 for i in range(40, 61)]:
        cross = sum(1 for b in boxes if b[1] < gx-0.005 and b[3] > gx+0.005)
        left = sum(1 for b in boxes if b[3] <= gx+0.005); right = sum(1 for b in boxes if b[1] >= gx-0.005)
        if best is None or cross < best[0]: best = (cross, gx, left, right)
    cross, gx, left, right = best
    two_col = allow2 and left >= 8 and right >= 8 and cross <= 0.15*len(boxes)
    if not two_col:
        return '\n'.join(t for _, t in lines_of(boxes))
    span = [b for b in boxes if b[1] < gx-0.005 and b[3] > gx+0.005]
    rest = [b for b in boxes if b not in span]
    # split page into vertical bands separated by spanning boxes
    cuts = sorted(set([0.0] + [s[2] for s in span] + [s[4] for s in span] + [1.01]))
    out = []
    events = sorted(span, key=lambda b: b[2])
    ys = [0.0]
    for s in events: ys += [s[2], s[4]]
    ys.append(1.01)
    used = set()
    pos = 0.0
    for s in events + [None]:
        stop = s[2] if s else 1.01
        band = [b for b in rest if pos-0.001 <= (b[2]+b[4])/2 < stop and id(b) not in used]
        for b in band: used.add(id(b))
        L = [b for b in band if b[3] <= gx+0.005]; R = [b for b in band if b not in L]
        out += [t for _, t in lines_of(L)] + [t for _, t in lines_of(R)]
        if s:
            out.append(s[0]); pos = s[4]
    leftover = [b for b in rest if id(b) not in used]
    out += [t for _, t in lines_of(leftover)]
    return '\n'.join(out)
if __name__ == '__main__':
    d, name, out = sys.argv[1], sys.argv[2], sys.argv[3]
    allow2 = not (len(sys.argv) > 4 and sys.argv[4] == 'single')
    with open(out, 'w') as f:
        for p in sorted(glob.glob(os.path.join(d, 'p*.jpg.json'))):
            n = re.search(r'p(\d+)', os.path.basename(p)).group(1)
            f.write(f'===== [{name} {n}]\n' + page_text(p, allow2) + '\n')
