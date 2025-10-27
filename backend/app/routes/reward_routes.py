from flask import Blueprint, jsonify, request
from app import db
from app.models.reward import Reward

reward_bp = Blueprint("reward_bp", __name__)

# ✅ Get all rewards
@reward_bp.route("/", methods=["GET"])
def get_rewards():
    rewards = Reward.query.all()
    return jsonify([
        {"id": r.id, "title": r.title, "points": r.points, "user_id": r.user_id}
        for r in rewards
    ])

# ✅ Create a reward
@reward_bp.route("/", methods=["POST"])
def create_reward():
    data = request.get_json()
    new_reward = Reward(title=data["title"], points=data["points"], user_id=data.get("user_id"))
    db.session.add(new_reward)
    db.session.commit()
    return jsonify({"message": "Reward created successfully"}), 201

# ✅ Update reward details
@reward_bp.route("/<int:id>", methods=["PATCH"])
def update_reward(id):
    reward = Reward.query.get_or_404(id)
    data = request.get_json()
    reward.title = data.get("title", reward.title)
    reward.points = data.get("points", reward.points)
    db.session.commit()
    return jsonify({"message": "Reward updated successfully"})

# ✅ Delete reward
@reward_bp.route("/<int:id>", methods=["DELETE"])
def delete_reward(id):
    reward = Reward.query.get_or_404(id)
    db.session.delete(reward)
    db.session.commit()
    return jsonify({"message": "Reward deleted successfully"})
