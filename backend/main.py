from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.orders import router as order_router
from routers.notifications import router as notification_router
from routers.reports import router as report_router
from routers.login import router as login_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(login_router)
app.include_router(order_router)
app.include_router(notification_router)
app.include_router(report_router)


@app.get("/")
def home():
    return {
        "message":
        "Order Management Backend Running"
    }

