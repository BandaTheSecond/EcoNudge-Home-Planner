from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/eco.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = "supersecretkey"

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Register Blueprints
    from app.routes.user_routes import user_bp
    from app.routes.nudge_routes import nudge_bp
    from app.routes.planner_routes import planner_bp
    from app.routes.reward_routes import reward_bp
    from app.routes.report_routes import report_bp

    app.register_blueprint(user_bp, url_prefix="/users")
    app.register_blueprint(nudge_bp, url_prefix="/nudges")
    app.register_blueprint(planner_bp, url_prefix="/planner")
    app.register_blueprint(reward_bp, url_prefix="/rewards")
    app.register_blueprint(report_bp, url_prefix="/reports")

    return app
