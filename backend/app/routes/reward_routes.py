from flask import Blueprint, request, jsonify
from app import db
from app.models.reward import Reward
from app.models.task import Task  # 🟢 Ensure this model exists
from app.schemas.reward_schema import RewardSchema
from sqlalchemy.exc import IntegrityError

reward_bp = Blueprint("reward_bp", __name__, url_prefix="/rewards")

reward_schema = RewardSchema()
rewards_schema = RewardSchema(many=True)


# 🟢 Get all rewards
@reward_bp.route("/", methods=["GET"])
def get_rewards():
    rewards = Reward.query.all()
    return rewards_schema.jsonify(rewards), 200


# 🟢 Get single reward
@reward_bp.route("/<int:id>", methods=["GET"])
def get_reward(id):
    reward = Reward.query.get_or_404(id)
    return reward_schema.jsonify(reward), 200


# 🟢 Create reward manually (used by frontend)
@reward_bp.route("/", methods=["POST"])
def create_reward():
    data = request.get_json() or {}

    try:
        new_reward = Reward(
            title=data.get("title", "Eco Achievement"),
            points=data.get("points", 10),
            description=data.get("description", "Completed a sustainable action!"),
            user_id=data.get("user_id"),
        )
        db.session.add(new_reward)
        db.session.commit()

        return reward_schema.jsonify(new_reward), 201

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "Database integrity error", "details": str(e)}), 400

    except Exception as e:
        return jsonify({"error": "Failed to create reward", "details": str(e)}), 500


# 🟢 Automatically generate reward when task is completed
@reward_bp.route("/auto", methods=["POST"])
def auto_reward():
    """Generates a reward when a completed task is detected."""
    data = request.get_json() or {}
    task_id = data.get("task_id")

    if not task_id:
        return jsonify({"error": "Task ID required"}), 400

    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    if not task.completed:
        return jsonify({"error": "Task must be completed to earn a reward"}), 400

    # 🛑 Prevent duplicate rewards for the same task
    existing_reward = Reward.query.filter_by(description=f"Reward for task {task_id}").first()
    if existing_reward:
        return jsonify({"message": "Reward already granted for this task"}), 200

    new_reward = Reward(
        title=f"Completed: {task.title}",
        points=task.points or 5,  # Default small reward if not defined
        description=f"Reward for task {task_id}",
        user_id=task.user_id,
    )
    db.session.add(new_reward)
    db.session.commit()

    return reward_schema.jsonify(new_reward), 201


# 🟢 Update reward
@reward_bp.route("/<int:id>", methods=["PATCH"])
def update_reward(id):
    reward = Reward.query.get_or_404(id)
    data = request.get_json() or {}

    for field in ["title", "points", "description"]:
        if field in data:
            setattr(reward, field, data[field])

    db.session.commit()
    return reward_schema.jsonify(reward), 200


# 🟢 Delete reward
@reward_bp.route("/<int:id>", methods=["DELETE"])
def delete_reward(id):
    reward = Reward.query.get_or_404(id)
    db.session.delete(reward)
    db.session.commit()
    return jsonify({"message": "Reward deleted successfully"}), 200
