from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles


from app.routes.supplier_verification_routes import (
    router as supplier_verification_router
)

from app.routes.admin_verification_routes import (
    router as admin_verification_router
)

from app.routes.auth_routes import router as auth_router

from app.routes.product import router as product_router

from app.routes.order_routes import router as order_router


app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


app.include_router(
    supplier_verification_router
)

app.include_router(
    admin_verification_router
)

app.include_router(auth_router)

app.include_router(product_router)

app.include_router(order_router)






