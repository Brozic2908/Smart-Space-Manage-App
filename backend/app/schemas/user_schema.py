from pydantic import BaseModel, ConfigDict, EmailStr
from enum import Enum

class Role(str, Enum):
    student = "student"
    lecturer = "lecturer"
    admin = "admin"
    it = "it"
    technician = "technician"

class UserCreateSchema(BaseModel):
    name: str
    email: EmailStr
    role: Role
    password: str

class UserReadSchema(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: Role
    model_config = ConfigDict(from_attributes=True)
