from pydantic import BaseModel, ConfigDict
from enum import Enum

class DeviceType(str, Enum):
    light = "light"
    fan = "fan"
    air_conditioner = "air_conditioner"

class DeviceStatus(str, Enum):
    on = "on"
    off = "off"
    error = "error"

class DeviceSchema(BaseModel):
    __tablename__ = "devices"
    id: int
    name: str
    type: DeviceType
    status: DeviceStatus
    room_id: int
    id: int
    name: str
    type: DeviceType
    status: DeviceStatus
    room_id: int

    model_config = ConfigDict(from_attributes=True)