from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.customer import router as customer_router

app = FastAPI(title="Farm Fresh API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    customer_router,
    prefix="/api/customer",
    tags=["Customer"]
)


@app.get("/")
def home():
    return {
        "message": "Farm Fresh Backend Running"
    }