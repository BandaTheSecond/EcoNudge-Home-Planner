from app.schemas import ma
from app.models.reward import Reward

class RewardSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reward
        load_instance = True
        include_fk = True
        include_relationships = False
        exclude = ('user',)
