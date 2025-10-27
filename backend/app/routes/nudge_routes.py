from flask import Blueprint, jsonify, request
from app import db
from app.models.nudge import Nudge

nudge_bp = Blueprint("nudges", __name__)

@nudge_bp.route("/", methods=["GET"])
def get_nudges():
    nudges = Nudge.query.all()
    return jsonify([{"id": n.id, "title": n.title, "description": n.description} for n in nudges])

@nudge_bp.route("/", methods=["POST"])
def create_nudge():
    data = request.get_json()
    new_nudge = Nudge(title=data["title"], description=data["description"])
    db.session.add(new_nudge)
    db.session.commit()
    return jsonify({"message": "Nudge created"}), 201
