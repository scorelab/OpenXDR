import os
import sys
from dotenv import load_dotenv

from api.main import create_app
from api.extensions import socketio


sys.path.insert(0, os.getcwd())
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)


app = create_app(os.getenv("FLASK_CONFIG") or "default")

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)