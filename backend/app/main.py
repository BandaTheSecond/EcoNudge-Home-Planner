from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from app.models import user, nudge, planner, reward, report
from app.schemas import ma
from app.utils.error_handlers import register_error_handlers
from app import db

# Import all blueprints
from app.routes.user_routes import user_bp
from app.routes.nudge_routes import nudge_bp
from app.routes.planner_routes import planner_bp
from app.routes.reward_routes import reward_bp
from app.routes.report_routes import report_bp


def create_app():
    app = Flask(__name__)

    # --- Configuration ---
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../instance/eco.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "supersecretkey"

    # --- Initialize Extensions ---
    db.init_app(app)
    ma.init_app(app)
    Migrate(app, db)
    CORS(app)

    # --- Register Blueprints ---
    app.register_blueprint(user_bp)
    app.register_blueprint(nudge_bp)
    app.register_blueprint(planner_bp)
    app.register_blueprint(reward_bp)
    app.register_blueprint(report_bp)

    # --- Error Handlers ---
    register_error_handlers(app)

    # --- Health Check ---
    @app.route("/")
    def home():
        return jsonify({"message": "🌱 Eco-Nudge Backend is running!"}), 200

    return app
