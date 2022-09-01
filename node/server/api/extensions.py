from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from sqlalchemy.ext.declarative import declarative_base
from flask_socketio import SocketIO

"""
Extensions for the app context. 
"""

db = SQLAlchemy()
migrate = Migrate()
Base = declarative_base()
ma = Marshmallow()
socketio = SocketIO(cors_allowed_origins="*")
