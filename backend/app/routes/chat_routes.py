from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

from app.database.db import get_connection
from app.utils.connection_manager import manager

router = APIRouter()


class MessageRequest(BaseModel):
    chat_id: int
    sender_id: int
    receiver_id: int
    message_type: str
    message: str


@router.get("/api/chats")
def get_chats():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            c.chat_id,
            c.supplier_id AS user_id,
            u.name AS user_name,
            u.business_name,

            (
                SELECT message
                FROM messages m
                WHERE m.chat_id = c.chat_id
                ORDER BY m.created_at DESC
                LIMIT 1
            ) AS last_message,

            (
                SELECT created_at
                FROM messages m
                WHERE m.chat_id = c.chat_id
                ORDER BY m.created_at DESC
                LIMIT 1
            ) AS last_message_time,

            (
                SELECT COUNT(*)
                FROM messages m
                WHERE m.chat_id = c.chat_id
                AND m.is_read = 0
            ) AS unread_count

        FROM chats c
        JOIN users u
            ON u.user_id = c.supplier_id

        ORDER BY c.chat_id DESC
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data


@router.get("/api/messages/{chat_id}")
def get_messages(chat_id: int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            message_id,
            chat_id,
            sender_id,
            receiver_id,
            message,
            file_url,
            message_type,
            status,
            created_at
        FROM messages
        WHERE chat_id = %s
        ORDER BY created_at ASC
    """, (chat_id,))

    messages = cursor.fetchall()

    cursor.close()
    conn.close()

    return messages


@router.post("/api/messages/send")
async def send_message(
    data: MessageRequest
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO messages
        (
            chat_id,
            sender_id,
            receiver_id,
            message_type,
            message,
            status
        )
        VALUES
        (
            %s,
            %s,
            %s,
            %s,
            %s,
            'sent'
        )
    """, (
        data.chat_id,
        data.sender_id,
        data.receiver_id,
        data.message_type,
        data.message
    ))

    conn.commit()

    message_id = cursor.lastrowid

    cursor.execute("""
        INSERT INTO notifications
        (
            user_id,
            chat_id,
            sender_id,
            notification_type,
            title,
            message
        )
        VALUES
        (
            %s,
            %s,
            %s,
            'message',
            'New Message',
            %s
        )
    """, (
        data.receiver_id,
        data.chat_id,
        data.sender_id,
        data.message
    ))

    conn.commit()

    websocket_data = {
        "message_id": message_id,
        "chat_id": data.chat_id,
        "sender_id": data.sender_id,
        "receiver_id": data.receiver_id,
        "message_type": data.message_type,
        "message": data.message,
        "status": "delivered",
        "created_at": str(datetime.now())
    }

    print("\n========== CHAT DEBUG ==========")
    print("Sender:", data.sender_id)
    print("Receiver:", data.receiver_id)
    print("Message:", data.message)
    print("Active socket send...")
    print("================================")

    await manager.send_personal_message(
        data.receiver_id,
        websocket_data
    )

    cursor.close()
    conn.close()

    return {
        "success": True,
        "message_id": message_id
    }


@router.put("/api/messages/read/{chat_id}")
def mark_read(chat_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE messages
        SET
            is_read = 1,
            status = 'read'
        WHERE chat_id = %s
    """, (chat_id,))

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Messages marked as read"
    }


@router.get("/api/notifications/{user_id}")
def get_notifications(user_id: int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM notifications
        WHERE user_id = %s
        ORDER BY created_at DESC
    """, (user_id,))

    notifications = cursor.fetchall()

    cursor.close()
    conn.close()

    return notifications


@router.put("/api/notifications/read/{notification_id}")
def mark_notification_read(notification_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE notifications
        SET is_read = 1
        WHERE notification_id = %s
    """, (notification_id,))

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Notification marked read"
    }