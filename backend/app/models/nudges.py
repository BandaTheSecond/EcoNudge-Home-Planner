from .. import db

class Nudge(db.Model):
    __tablename__ = 'nudges'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    message = db.Column(db.String(200))
    category = db.Column(db.String(50))
    impact_score = db.Column(db.Integer, default=0)
