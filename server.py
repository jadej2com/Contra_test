import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 7777
DIR = os.path.dirname(os.path.abspath(__file__))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        pass

httpd = http.server.HTTPServer(('0.0.0.0', PORT), NoCacheHandler)
print(f'Server on port {PORT} — no cache')
httpd.serve_forever()
