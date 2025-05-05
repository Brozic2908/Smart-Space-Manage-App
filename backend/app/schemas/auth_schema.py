from pydantic import BaseModel, EmailStr, ConfigDict
from app.schemas.user_schema import Role

class TokenSchema(BaseModel):
    access_token: str
    token_type: str
    role: Role

    model_config = ConfigDict(from_attributes=True)