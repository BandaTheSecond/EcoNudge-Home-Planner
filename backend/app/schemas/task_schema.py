from app.schemas import ma
from app.models.task import Task

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        load_instance = True
        include_fk = True
        include_relationships = False
        exclude = ('user',)
