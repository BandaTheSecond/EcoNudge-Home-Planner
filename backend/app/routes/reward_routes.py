from flask import Blueprint, request, jsonify
from app import db
from app.models.reward import Reward
from app.schemas.reward_schema import RewardSchema

reward_bp = Blueprint("reward_bp", __name__, url_prefix="/rewards")

reward_schema = RewardSchema()
rewards_schema = RewardSchema(many=True)

# Get all rewards
@reward_bp.route("/", methods=["GET"])
def get_rewards():
    rewards = Reward.query.all()
    return rewards_schema.jsonify(rewards), 200

# Get one reward
@reward_bp.route("/<int:id>", methods=["GET"])
def get_reward(id):
    reward = Reward.query.get_or_404(id)
    return reward_schema.jsonify(reward), 200

# Create reward
@reward_bp.route("/", methods=["POST"])
def create_reward():
    data = request.get_json()
    new_reward = Reward(
        title=data.get("title"),
        points=data.get("points"),
        description=data.get("description"),
        user_id=data.get("user_id"),
    )
    db.session.add(new_reward)
    db.session.commit()
    return reward_schema.jsonify(new_reward), 201

# Update reward
@reward_bp.route("/<int:id>", methods=["PATCH"])
def update_reward(id):
    reward = Reward.query.get_or_404(id)
    data = request.get_json()

    for field in ["title", "points", "description"]:
        if field in data:
            setattr(reward, field, data[field])

    db.session.commit()
    return reward_schema.jsonify(reward), 200

# Delete reward
@reward_bp.route("/<int:id>", methods=["DELETE"])
def delete_reward(id):
    reward = Reward.query.get_or_404(id)
    db.session.delete(reward)
    db.session.commit()
    return jsonify({"message": "Reward deleted successfully"}), 200
