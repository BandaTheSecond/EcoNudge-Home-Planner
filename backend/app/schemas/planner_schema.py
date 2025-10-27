from app.schemas import ma
from app.models.planner import Planner

class PlannerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Planner
        load_instance = True
        include_fk = True
