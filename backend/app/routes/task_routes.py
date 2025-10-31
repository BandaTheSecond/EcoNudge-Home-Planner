from flask import Blueprint, request, jsonify
from app import db
from app.models.task import Task
from app.models.reward import Reward  # 🟢 import Reward model
from app.schemas.task_schema import TaskSchema
from app.schemas.reward_schema import RewardSchema

task_bp = Blueprint("task_bp", __name__, url_prefix="/planner")

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)
reward_schema = RewardSchema()

# 🟢 Get all tasks
@task_bp.route("/", methods=["GET"])
def get_all_tasks():
    tasks = Task.query.all()
    return tasks_schema.jsonify(tasks), 200


# 🟢 Get single task
@task_bp.route("/<int:id>", methods=["GET"])
def get_task(id):
    task = Task.query.get_or_404(id)
    return task_schema.jsonify(task), 200


# 🟢 Create task
@task_bp.route("/", methods=["POST"])
def create_task():
    data = request.get_json() or {}
    if "task" not in data:
        return jsonify({"error": "Task name is required"}), 400

    new_task = Task(
        task=data.get("task"),
        completed=data.get("completed", False),
        user_id=data.get("user_id", 1),
        points=data.get("points", 5),
    )

    db.session.add(new_task)
    db.session.commit()

    return task_schema.jsonify(new_task), 201


# 🟢 Update task (Auto reward when completed)
@task_bp.route("/<int:id>", methods=["PATCH"])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json() or {}

    # Update allowed fields
    for field in ["task", "completed", "points"]:
        if field in data:
            setattr(task, field, data[field])

    db.session.commit()

    # 🟢 If task marked as completed, generate reward
    reward = None
    if data.get("completed") is True:
        existing_reward = Reward.query.filter_by(description=f"Reward for task {task.id}").first()
        if not existing_reward:
            reward = Reward(
                title=f"Completed: {task.task}",
                points=task.points or 5,
                description=f"Reward for task {task.id}",
                user_id=task.user_id,
            )
            db.session.add(reward)
            db.session.commit()

    return task_schema.jsonify(task), 200
