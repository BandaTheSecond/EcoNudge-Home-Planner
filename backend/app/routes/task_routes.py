from flask import Blueprint, request, jsonify
from app import db
from app.models.task import Task
from app.schemas.task_schema import TaskSchema

task_bp = Blueprint("task_bp", __name__, url_prefix="/planner")

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

#  Get all tasks
@task_bp.route("/", methods=["GET"])
def get_all_tasks():
    tasks = Task.query.all()
    return tasks_schema.jsonify(tasks), 200

#  Get one task
@task_bp.route("/<int:id>", methods=["GET"])
def get_task(id):
    task = Task.query.get_or_404(id)
    return task_schema.jsonify(task), 200

# Create task
@task_bp.route("/", methods=["POST"])
def create_task():
    data = request.get_json()
    new_task = Task(
        task=data.get("task"),
        completed=data.get("completed", False),
        user_id=data.get("user_id", 1),
    )
    db.session.add(new_task)
    db.session.commit()
    return task_schema.jsonify(new_task), 201

#  Update task
@task_bp.route("/<int:id>", methods=["PATCH"])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()

    for field in ["task", "completed"]:
        if field in data:
            setattr(task, field, data[field])

    db.session.commit()
    return task_schema.jsonify(task), 200

#  Delete task
@task_bp.route("/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"}), 200
