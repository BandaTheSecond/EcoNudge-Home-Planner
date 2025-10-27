from flask import Blueprint, jsonify, request
from app import db
from app.models.planner import Planner

planner_bp = Blueprint("planner_bp", __name__)

# ✅ Get all planner goals
@planner_bp.route("/", methods=["GET"])
def get_all_goals():
    goals = Planner.query.all()
    return jsonify([
        {"id": g.id, "goal": g.goal, "completed": g.completed, "user_id": g.user_id}
        for g in goals
    ])

# ✅ Create a new goal
@planner_bp.route("/", methods=["POST"])
def create_goal():
    data = request.get_json()
    new_goal = Planner(goal=data["goal"], completed=data.get("completed", False), user_id=data.get("user_id"))
    db.session.add(new_goal)
    db.session.commit()
    return jsonify({"message": "Goal created successfully"}), 201

# ✅ Update goal completion or text
@planner_bp.route("/<int:id>", methods=["PATCH"])
def update_goal(id):
    goal = Planner.query.get_or_404(id)
    data = request.get_json()
    goal.goal = data.get("goal", goal.goal)
    goal.completed = data.get("completed", goal.completed)
    db.session.commit()
    return jsonify({"message": "Goal updated successfully"})

# ✅ Delete goal
@planner_bp.route("/<int:id>", methods=["DELETE"])
def delete_goal(id):
    goal = Planner.query.get_or_404(id)
    db.session.delete(goal)
    db.session.commit()
    return jsonify({"message": "Goal deleted successfully"})
