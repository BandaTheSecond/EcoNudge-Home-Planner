from flask import Blueprint, request, jsonify
from app import db
from app.models.nudges import Nudge
from app.schemas.nudge_schema import NudgeSchema

nudge_bp = Blueprint("nudge_bp", __name__, url_prefix="/nudges")

nudge_schema = NudgeSchema()
nudges_schema = NudgeSchema(many=True)

# Get all nudges
@nudge_bp.route("/", methods=["GET"])
def get_nudges():
    nudges = Nudge.query.all()
    return nudges_schema.jsonify(nudges), 200

# Get one nudge
@nudge_bp.route("/<int:id>", methods=["GET"])
def get_nudge(id):
    nudge = Nudge.query.get_or_404(id)
    return nudge_schema.jsonify(nudge), 200

# Create nudge
@nudge_bp.route("/", methods=["POST"])
def create_nudge():
    data = request.get_json()
    new_nudge = Nudge(
        title=data.get("title"),
        message=data.get("message"),
        category=data.get("category"),
        impact_score=data.get("impact_score", 0)
    )
    db.session.add(new_nudge)
    db.session.commit()
    return nudge_schema.jsonify(new_nudge), 201

# Update nudge
@nudge_bp.route("/<int:id>", methods=["PATCH"])
def update_nudge(id):
    nudge = Nudge.query.get_or_404(id)
    data = request.get_json()

    for field in ["title", "message", "category", "impact_score"]:
        if field in data:
            setattr(nudge, field, data[field])

    db.session.commit()
    return nudge_schema.jsonify(nudge), 200

# Delete nudge
@nudge_bp.route("/<int:id>", methods=["DELETE"])
def delete_nudge(id):
    nudge = Nudge.query.get_or_404(id)
    db.session.delete(nudge)
    db.session.commit()
    return jsonify({"message": "Nudge deleted successfully"}), 200
