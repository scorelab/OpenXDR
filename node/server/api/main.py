#!/usr/bin/env python3

import connexion
from flask_cors import CORS

from api import encoder
from api.config import config
from api.extensions import db, socketio, migrate


def create_app(config_name):
    conx = connexion.App(
        __name__,
        specification_dir='openapi/',
        options={'swagger_ui': False}
    )
    conx.add_api('openapi.yaml', pythonic_params=True)
    conx.app.json_encoder = encoder.JSONEncoder

    conx.app.config.from_object(config[config_name])
    config[config_name].init_app(conx.app)

    CORS(conx.app)
    db.init_app(conx.app)
    migrate.init_app(conx.app, db)
    socketio.init_app(conx.app)

    return conx.app

