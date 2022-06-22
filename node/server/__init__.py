from os.path import abspath, join, dirname, realpath
from flask import Flask, request
from flask_cors import CORS
from cache import initialize_cache
from compress import initialize_compress
from controllers import initialize_routes
from flask_restful import Api
from mailer import initialize_mailer
from middleware.error_handling import errors
from server.logging import initialize_logs
from swagger import initialize_swagger
from config import Config

from ..actions import create_soc, init_prob, update_prob, status_prob, init_loader, update_loader, status_loader,
    status_flink_pu, init_schema, update_schema, status_flink_pu

app: Flask = Flask(
    __name__,
    static_folder=abspath(join(dirname(dirname(realpath(__file__))), "static")),
    static_url_path="/static",
)
app.config.from_object(Config)

if __name__ != "__main__":
    initialize_logs(app)

cors: CORS = CORS(
    app,
    resources={r"/*": {"origins": ["*"]}},
)
api: Api = Api(app, errors=errors)

initialize_mailer(app)
initialize_cache(app)
initialize_compress(app)
initialize_swagger(app)
initialize_routes(api)


@app.route('/create_soc', methods=['POST'])
def create_soc():
    args = request.args
    name = args.get('name')
    kwargs = args.get('kwargs')
    create_soc(name, kwargs)


@app.route('/init_prob', methods=['POST'])
def init_prob():
    args = request.args
    name = args.get('name')
    type = args.get('type')
    kwargs = args.get('kwargs')
    init_prob(name, type, kwargs)


@app.route('/update_prob', methods=['PUT'])
def update_prob():
    args = request.args
    id = args.get('id')
    kwargs = args.get('kwargs')
    update_prob(id, kwargs)


@app.route('/status_prob', methods=['GET'])
def status_prob():
    args = request.args
    id = args.get('id')
    status_prob(id)


@app.route('/init_loader', methods=['POST'])
def init_loader(name, type, kwargs):
    args = request.args
    name = args.get('name')
    type = args.get('type')
    kwargs = args.get('kwargs')
    init_loader(name, type, kwargs)


@app.route('/update_loader', methods=['PUT'])
def update_loader():
    args = request.args
    id = args.get('id')
    kwargs = args.get('kwargs')
    update_loader(id, kwargs)


@app.route('/status_loader')
def status_loader():
    args = request.args
    id = args.get('id')
    status_loader(id)


@app.route('/status_flink_pu')
def status_flink_pu():
    status_flink_pu()


@app.route('/init_schema')
def init_schema():
    args = request.args
    name = args.get('name')
    type = args.get('type')
    kwargs = args.get('kwargs')
    init_schema(name, type, kwargs)


@app.route('/update_schema')
def update_schema(id, kwargs):
    args = request.args
    id = args.get('id')
    kwargs = args.get('kwargs')
    update_schema(id, kwargs)


@app.route('/status_schema')
def status_schema():
    args = request.args
    id = args.get('id')
    status_schema(id)


@app.route('/status_kudu_pu')
def status_kudu_pu():
    status_kudu_pu()
