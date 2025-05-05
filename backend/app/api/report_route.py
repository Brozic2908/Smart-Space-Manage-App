from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import extract, func
from app.db.session import get_db
from app.models.booking import Booking
from app.models.room import Room

router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("/monthly-booking-count")
def report_booking_count_per_room(
    month: int = Query(..., ge=1, le=12),
    year: int = Query(..., ge=2000),
    db: Session = Depends(get_db)
):
    results = (
        db.query(Room.room_code, func.count(Booking.id).label("total_bookings"))
        .join(Booking, Booking.room_id == Room.id)
        .filter(
            extract("month", Booking.start_time) == month,
            extract("year", Booking.start_time) == year
        )
        .group_by(Room.room_code)
        .all()
    )

    return [{"room_code": room_code, "total_bookings": total} for room_code, total in results]
