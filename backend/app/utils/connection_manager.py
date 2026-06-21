from fastapi import WebSocket
import json


class ConnectionManager:

    def __init__(self):
        self.active_connections = {}

    async def connect(
        self,
        websocket: WebSocket,
        user_id: int
    ):
        await websocket.accept()

        self.active_connections[user_id] = websocket

        print(f"✅ Connected user {user_id}")
        print(
            f"📊 Active connections: "
            f"{list(self.active_connections.keys())}"
        )

    def disconnect(
        self,
        user_id: int
    ):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

        print(f"❌ Disconnected user {user_id}")
        print(
            f"📊 Active connections: "
            f"{list(self.active_connections.keys())}"
        )

    async def send_personal_message(
        self,
        user_id: int,
        data: dict
    ):
        print("\n===== SOCKET DEBUG =====")
        print(
            "Active Users:",
            list(self.active_connections.keys())
        )
        print(
            "Sending To:",
            user_id
        )
        print(
            "Data:",
            data
        )

        websocket = self.active_connections.get(
            user_id
        )

        if websocket:
            try:
                await websocket.send_text(
                    json.dumps(data)
                )

                print("✅ Delivered")

            except Exception as e:
                print("❌ Error:", e)
                self.disconnect(user_id)

        else:
            print("❌ User not connected")

        print("========================\n")


manager = ConnectionManager()