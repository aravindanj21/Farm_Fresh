from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.utils.connection_manager import manager
import json

router = APIRouter()

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    print(f"🔵 User {user_id} connecting")

    await manager.connect(websocket, user_id)

    print(f"✅ User {user_id} connected")

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)

            print("📩 Received:", message)

            

            receiver_id = message.get("receiver_id")

            if receiver_id:
                await manager.send_personal_message(receiver_id,
    message)

    except WebSocketDisconnect:
        print(f"❌ User {user_id} disconnected")
        manager.disconnect(user_id)