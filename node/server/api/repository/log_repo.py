from api.extensions import db
from api.models import Log
from typing import List


class LogRepo:

    @staticmethod
    def create(log: Log):
        db.session.add(log)
        db.session.commit()

    @staticmethod
    def fetch_by_id(_id) -> 'Log':
        return db.session.query(Log).filter_by(id=_id).first()

    @staticmethod
    def fetch_all() -> List['Log']:
        return db.session.query(Log).all()

    @staticmethod
    def delete(_id) -> None:
        item = db.session.query(Log).filter_by(id=_id).first()
        db.session.delete(item)
        db.session.commit()

    @staticmethod
    def update(item_data: Log):
        db.session.merge(item_data)
        db.session.commit()