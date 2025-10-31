from .. import db

class Reward(db.Model):
    __tablename__ = 'rewards'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    points = db.Column(db.Integer)
    description = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='rewards')
