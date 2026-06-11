from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.product_routes import router as product_router
from routes.supplier_routes import router as supplier_router
from routes.vendor_routes import router as vendor_router
from routes.order_routes import router as order_router
from routes.invoice_routes import router as invoice_router
from routes.global_search_routes import router as global_router
from routes.auth_routes import router as auth_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(supplier_router)
app.include_router(vendor_router)
app.include_router(order_router)
app.include_router(invoice_router)
app.include_router(global_router)
app.include_router(auth_router)