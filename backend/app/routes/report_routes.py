from flask import Blueprint, request, jsonify
from app import db
from app.models.report import Report
from app.schemas.report_schema import ReportSchema

report_bp = Blueprint("report_bp", __name__, url_prefix="/reports")

report_schema = ReportSchema()
reports_schema = ReportSchema(many=True)

# Get all reports
@report_bp.route("/", methods=["GET"])
def get_reports():
    reports = Report.query.all()
    return reports_schema.jsonify(reports), 200

# Get one report
@report_bp.route("/<int:id>", methods=["GET"])
def get_report(id):
    report = Report.query.get_or_404(id)
    return report_schema.jsonify(report), 200

# Create report
@report_bp.route("/", methods=["POST"])
def create_report():
    data = request.get_json()
    new_report = Report(
        title=data.get("title"),
        content=data.get("content"),
        category=data.get("category"),
        user_id=data.get("user_id"),
    )
    db.session.add(new_report)
    db.session.commit()
    return report_schema.jsonify(new_report), 201

# Update report
@report_bp.route("/<int:id>", methods=["PATCH"])
def update_report(id):
    report = Report.query.get_or_404(id)
    data = request.get_json()

    for field in ["title", "content", "category"]:
        if field in data:
            setattr(report, field, data[field])

    db.session.commit()
    return report_schema.jsonify(report), 200

# Delete report
@report_bp.route("/<int:id>", methods=["DELETE"])
def delete_report(id):
    report = Report.query.get_or_404(id)
    db.session.delete(report)
    db.session.commit()
    return jsonify({"message": "Report deleted successfully"}), 200
