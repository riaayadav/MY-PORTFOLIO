import http.server
import socketserver
import os
import sys
import mimetypes

DEFAULT_PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class PortfolioHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def translate_path(self, path):
        root_path = super().translate_path(path)
        if os.path.exists(root_path):
            return root_path
        # Check in public folder if not found in root directory
        rel_path = os.path.relpath(root_path, DIRECTORY)
        public_path = os.path.join(DIRECTORY, "public", rel_path)
        if os.path.exists(public_path):
            return public_path
        return root_path

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

def run_server(port=DEFAULT_PORT):
    mimetypes.add_type("application/javascript", ".js")
    mimetypes.add_type("text/css", ".css")
    mimetypes.add_type("image/svg+xml", ".svg")
    
    # Try port, fall back to alternative ports if in use
    candidate_ports = [port, 3000, 5000, 8000, 8081]
    for p in candidate_ports:
        try:
            httpd = socketserver.TCPServer(("127.0.0.1", p), PortfolioHTTPRequestHandler)
            print(f"Server started successfully at http://127.0.0.1:{p}")
            sys.stdout.flush()
            httpd.serve_forever()
            return
        except OSError as e:
            if "Address already in use" in str(e) or getattr(e, 'winerror', 0) in (10048, None):
                continue
            raise

if __name__ == "__main__":
    run_server()
