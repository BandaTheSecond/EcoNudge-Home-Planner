from .. import db

class Nudge(db.Model):
    __tablename__ = 'nudges'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(200))
