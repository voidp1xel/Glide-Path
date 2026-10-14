"""Serve site/ on http://localhost:8765 with caching disabled (handy while editing)."""
import http.server, functools, os, sys
port = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get('PORT', 8765))
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def log_message(self, *a): pass
print(f'Glidepath running at http://localhost:{port}')
http.server.ThreadingHTTPServer(('127.0.0.1', port), functools.partial(H, directory=root)).serve_forever()
