from fastapi import APIRouter
from pydantic import BaseModel

from app.database.db import get_connection
from app.utils.connection_manager import manager

router = APIRouter()


class MessageRequest(BaseModel):
    chat_id: int
    sender_id: int
    receiver_id: int
    message_type: str
    message: str


@router.post("/api/messages/send")
async def send_message(
    data: MessageRequest
):
    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO messages
        (
            chat_id,
            sender_id,
            receiver_id,
            message_type,
            message
        )
        VALUES
        (
            %s,
            %s,
            %s,
            %s,
            %s
        )
        """,
        (
            data.chat_id,
            data.sender_id,
            data.receiver_id,
            data.message_type,
            data.message
        )
    )

    conn.commit()

    message_id = cursor.lastrowid

    cursor.close()
    conn.close()

    websocket_data = {
        "message_id": message_id,
        "chat_id": data.chat_id,
        "sender_id": data.sender_id,
        "receiver_id": data.receiver_id,
        "message_type": data.message_type,
        "message": data.message
    }

    await manager.send_personal_message(
        data.receiver_id,
        websocket_data
    )

    return {
        "success": True,
        "message": "Message Sent"
    }


@router.get("/api/messages/{chat_id}")
def get_messages(chat_id: int):

    conn = get_connection()

    cursor = conn.cursor(
        dictionary=True
    )

    cursor.execute(
        """
        SELECT
            message_id,
            chat_id,
            sender_id,
            receiver_id,
            message_type,
            message,
            created_at
        FROM messages
        WHERE chat_id=%s
        ORDER BY created_at ASC
        """,
        (chat_id,)
    )

    messages = cursor.fetchall()

    cursor.close()
    conn.close()

    return messages