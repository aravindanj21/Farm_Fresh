from fastapi import FastAPI, WebSocket

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id: int
):
    await websocket.accept()

    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"User {user_id}: {data}")