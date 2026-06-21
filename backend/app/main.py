from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat_routes import router as chat_router
from app.routes.file_routes import router as file_router
from app.routes.websocket import router as ws_router
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Vendor Supplier Chat API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)

app.include_router(chat_router)
app.include_router(file_router)


app.include_router(ws_router)


@app.get("/")
def home():
    return {
        "message": "Chat Server Running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


print("\n===== REGISTERED ROUTES =====")

for route in app.routes:
    try:
        print(route.path)
    except Exception:
        pass

print("=============================\n")