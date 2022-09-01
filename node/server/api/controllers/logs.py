import connexion

from datetime import datetime

from api.repository import LogRepo
from api.schemas import LogSchema
from api.models.log import Log

from api.messages import ApiResponse, ApiError, LogsActionRequest  # noqa: E501


log_repo = LogRepo()
log_schema = LogSchema()
logs_schema = LogSchema(many=True)


def action(log_id, logs_action_request=None):  # noqa: E501
    """runLogCollectorAction

    Run actions on a given log collector # noqa: E501

    :param log_id: 
    :type log_id: str
    :param logs_action_request: 
    :type logs_action_request: dict | bytes

    :rtype: Union[ApiResponse, Tuple[ApiResponse, int], Tuple[ApiResponse, int, Dict[str, str]]
    """
    if connexion.request.is_json:
        logs_action_request = LogsActionRequest.from_dict(connexion.request.get_json())  # noqa: E501

    # TODO - Implement action functionality

    return ApiResponse(
        msg=f'Log Collector `{log_id}` {logs_action_request.action} Success.',
        timestamp=datetime.now()
    )


def create(logs_create_request=None):  # noqa: E501
    """createLogCollector

    Create a new log collector # noqa: E501

    :param logs_create_request: 
    :type logs_create_request: dict | bytes

    :rtype: Union[ApiResponse, Tuple[ApiResponse, int], Tuple[ApiResponse, int, Dict[str, str]]
    """
    req_json = connexion.request.get_json()
    data = log_schema.load(req_json)
    log_repo.create(data)
    return ApiResponse(msg=f'Log Collector Created.',timestamp=datetime.now()), 201


def delete(log_id):  # noqa: E501
    """deleteLogCollector

    Delete an existing log collector # noqa: E501

    :param log_id: 
    :type log_id: str

    :rtype: Union[ApiResponse, Tuple[ApiResponse, int], Tuple[ApiResponse, int, Dict[str, str]]
    """
    data = log_repo.fetch_by_id(log_id)
    if data:
        log_repo.delete(log_id)
        return ApiResponse(msg=f'Log Collector `{log_id}` Deleted.', timestamp=datetime.now()), 200
    return ApiError(msg="Log Collector not found.", timestamp=datetime.now()), 404


def get(log_id):  # noqa: E501
    """getLogCollector

    Get a single log collector # noqa: E501

    :param log_id: 
    :type log_id: str

    :rtype: Union[Log, Tuple[Log, int], Tuple[Log, int, Dict[str, str]]
    """
    data = log_repo.fetch_by_id(log_id)
    if data:
        return log_schema.dump(data)
    return ApiError(msg="Log Collector not found.", timestamp=datetime.now()), 404


def get_all():  # noqa: E501
    """getLogCollectors

    Get all the log collectors # noqa: E501


    :rtype: Union[List[Log], Tuple[List[Log], int], Tuple[List[Log], int, Dict[str, str]]
    """
    return logs_schema.dump(log_repo.fetch_all()), 200


def update(log_id, log=None):  # noqa: E501
    """updateLogCollector

    Update an existing log collector # noqa: E501

    :param log_id: 
    :type log_id: str
    :param log: 
    :type log: dict | bytes

    :rtype: Union[ApiResponse, Tuple[ApiResponse, int], Tuple[ApiResponse, int, Dict[str, str]]
    """
    data = log_repo.fetch_by_id(log_id)
    req_json = connexion.request.get_json()
    if data:
        data.name = req_json['name']
        data.os = req_json['os']
        data.source = req_json['source']
        data.status = req_json['status']

        log_repo.update(data)
        return ApiResponse(msg=f'Log Collector `{log_id}` Updated.', timestamp=datetime.now()), 200
    return ApiError(msg="Log Collector not found.", timestamp=datetime.now()), 404
