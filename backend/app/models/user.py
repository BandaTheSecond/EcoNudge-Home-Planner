from .. import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    planners = db.relationship('Planner', back_populates='user', cascade='all, delete')
    rewards = db.relationship('Reward', back_populates='user', cascade='all, delete')

    def __repr__(self):
        return f"<User {self.username}>"
