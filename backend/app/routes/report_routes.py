from flask import Blueprint, jsonify, request
from app import db
from app.models.report import Report

report_bp = Blueprint("report_bp", __name__)

# ✅ Get all reports
@report_bp.route("/", methods=["GET"])
def get_reports():
    reports = Report.query.order_by(Report.created_at.desc()).all()
    return jsonify([
        {"id": r.id, "summary": r.summary, "created_at": r.created_at.isoformat()}
        for r in reports
    ])

# ✅ Create a report
@report_bp.route("/", methods=["POST"])
def create_report():
    data = request.get_json()
    new_report = Report(summary=data["summary"])
    db.session.add(new_report)
    db.session.commit()
    return jsonify({"message": "Report created successfully"}), 201

# ✅ Update a report
@report_bp.route("/<int:id>", methods=["PATCH"])
def update_report(id):
    report = Report.query.get_or_404(id)
    data = request.get_json()
    report.summary = data.get("summary", report.summary)
    db.session.commit()
    return jsonify({"message": "Report updated successfully"})

# ✅ Delete report
@report_bp.route("/<int:id>", methods=["DELETE"])
def delete_report(id):
    report = Report.query.get_or_404(id)
    db.session.delete(report)
    db.session.commit()
    return jsonify({"message": "Report deleted successfully"})
