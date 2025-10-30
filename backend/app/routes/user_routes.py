from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
from app.schemas.user_schema import UserSchema

user_bp = Blueprint("user_bp", __name__, url_prefix="/users")

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Get all users
@user_bp.route("/", methods=["GET"])
def get_users():
    users = User.query.all()
    return users_schema.jsonify(users), 200

# Get one user
@user_bp.route("/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.get_or_404(id)
    return user_schema.jsonify(user), 200

# Create user
@user_bp.route("/", methods=["POST"])
def create_user():
    data = request.get_json()
    new_user = User(
        username=data.get("username"),
        email=data.get("email"),
        password=data.get("password"),  # ⚠️ Ideally hashed via utils/auth.py
    )
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user), 201

# Update user
@user_bp.route("/<int:id>", methods=["PATCH"])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()

    for field in ["username", "email", "password"]:
        if field in data:
            setattr(user, field, data[field])

    db.session.commit()
    return user_schema.jsonify(user), 200

# Delete user
@user_bp.route("/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
