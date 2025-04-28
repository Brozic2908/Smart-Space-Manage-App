from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base
from app.api import auth_route, booking_route, checkin_route

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="S3-MRS",
    description="Smart Study Space Management and Reservation System at HCMUT.",
    docs_url="/docs",
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

app.include_router(auth_route.router, tags=["auth"])
app.include_router(booking_route.router, tags=["booking"])
app.include_router(checkin_route.router, tags=["checkin"])