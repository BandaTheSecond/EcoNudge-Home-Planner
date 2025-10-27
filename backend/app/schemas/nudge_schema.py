from app.schemas import ma
from app.models.nudge import Nudge

class NudgeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Nudge
        load_instance = True
