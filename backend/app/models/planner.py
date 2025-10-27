from .. import db

class Planner(db.Model):
    __tablename__ = 'planners'
    id = db.Column(db.Integer, primary_key=True)
    goal = db.Column(db.String(100))
    completed = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='planners')
