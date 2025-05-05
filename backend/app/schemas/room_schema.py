from pydantic import BaseModel, ConfigDict
from enum import Enum

class RoomType(str, Enum):
    individual = "individual"
    group = "group"
    mentoring = "mentoring"

class RoomStatus(str, Enum):
    available = "available"
    in_use = "in_use"
    maintenance = "maintenance"

class SensorStatus(str, Enum):
    active = "active"
    inactive = "inactive"

class RoomReadSchema(BaseModel):
    id: int
    room_code: str
    room_type: RoomType
    location: str
    status: RoomStatus
    sensor: SensorStatus

    model_config = ConfigDict(from_attributes=True)