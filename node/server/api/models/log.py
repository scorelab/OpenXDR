from sqlalchemy import func
from api.extensions import db


class Log(db.Model):
    __tablename__ = "log"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    os = db.Column(db.String(16), nullable=False)
    source = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(16), nullable=False, default='pending')
    created_date = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return 'LogModel(id=%d, name=%s, os=%s, source=%s, status=%s, created_date=%s)'.format(
            self.id, self.name, self.price, self.source, self.source, self.created_date
        )

    # def json(self):
    #     return {'id': self.id, 'name': self.name, 'price': self.price}
