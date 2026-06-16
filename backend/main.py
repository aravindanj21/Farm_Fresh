from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth_routes import router as auth_router
from routes.vendor_routes import router as vendor_router
from routes.order_routes import router as order_router   
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(vendor_router)
app.include_router(order_router)   

@app.get("/")
def root():
    return {"message": "API Running"}