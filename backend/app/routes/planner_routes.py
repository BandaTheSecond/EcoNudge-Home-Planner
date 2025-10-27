from flask import Blueprint, request, jsonify
from app import db
from app.models.planner import Planner
from app.schemas.planner_schema import PlannerSchema

planner_bp = Blueprint("planner_bp", __name__, url_prefix="/planner")

planner_schema = PlannerSchema()
planners_schema = PlannerSchema(many=True)

#  Get all plans
@planner_bp.route("/", methods=["GET"])
def get_all_planners():
    planners = Planner.query.all()
    return planners_schema.jsonify(planners), 200

#  Get one plan
@planner_bp.route("/<int:id>", methods=["GET"])
def get_planner(id):
    planner = Planner.query.get_or_404(id)
    return planner_schema.jsonify(planner), 200

# Create plan
@planner_bp.route("/", methods=["POST"])
def create_planner():
    data = request.get_json()
    new_planner = Planner(
        title=data.get("title"),
        description=data.get("description"),
        target_date=data.get("target_date"),
        progress=data.get("progress", 0),
        user_id=data.get("user_id"),
    )
    db.session.add(new_planner)
    db.session.commit()
    return planner_schema.jsonify(new_planner), 201

#  Update plan
@planner_bp.route("/<int:id>", methods=["PATCH"])
def update_planner(id):
    planner = Planner.query.get_or_404(id)
    data = request.get_json()

    for field in ["title", "description", "target_date", "progress"]:
        if field in data:
            setattr(planner, field, data[field])

    db.session.commit()
    return planner_schema.jsonify(planner), 200

#  Delete plan
@planner_bp.route("/<int:id>", methods=["DELETE"])
def delete_planner(id):
    planner = Planner.query.get_or_404(id)
    db.session.delete(planner)
    db.session.commit()
    return jsonify({"message": "Planner deleted successfully"}), 200
