from flask import Blueprint, Flask
from flask_swagger_ui import get_swaggerui_blueprint

SWAGGER_URL: str = "/docs"
API_URL: str = "/static/openapi.json"

SWAGGERUI_BLUEPRINT: Blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={"app_name": "openXDR"},
)


def initialize_swagger(app: Flask) -> None:
    app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
