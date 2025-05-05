from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CheckinReadSchema(BaseModel):
    id: int
    booking_id: int
    checkin_time: datetime
    checkout_time: datetime | None

    model_config = ConfigDict(from_attributes=True)