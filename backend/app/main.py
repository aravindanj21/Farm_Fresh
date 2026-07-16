from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.customer import router as customer_router
from app.routes.category import router as category_router
from app.routes.product import router as product_router
from app.routes.cart import router as cart_router

app = FastAPI(title="Farm Fresh API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(customer_router)
app.include_router(category_router)
app.include_router(product_router)
app.include_router(cart_router)

@app.get("/")
def home():
    return {
        "message": "Farm Fresh Backend Running"
    }