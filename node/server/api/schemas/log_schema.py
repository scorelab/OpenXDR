from api.extensions import ma
from api.models import Log


class LogSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Log
        load_instance = True
