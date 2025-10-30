from .. import db

class Report(db.Model):
    __tablename__ = 'reports'
    id = db.Column(db.Integer, primary_key=True)
    summary = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
