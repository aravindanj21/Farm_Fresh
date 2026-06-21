from fastapi import APIRouter, UploadFile, File, Form
from datetime import datetime
import os

from app.database.db import get_connection
from app.utils.connection_manager import manager

router = APIRouter()


@router.post("/api/files/upload")
async def upload_file(
    file: UploadFile = File(...),
    chat_id: int = Form(...),
    sender_id: int = Form(...),
    receiver_id: int = Form(...)
):

    upload_dir = "app/uploads"
    os.makedirs(upload_dir, exist_ok=True)

    filepath = os.path.join(
        upload_dir,
        file.filename
    )

    with open(filepath, "wb") as f:
        f.write(await file.read())

    file_url = f"/uploads/{file.filename}"

    ext = file.filename.split(".")[-1].lower()

    if ext in ["jpg", "jpeg", "png", "gif", "webp"]:
        message_type = "image"
    elif ext == "pdf":
        message_type = "pdf"
    else:
        message_type = "file"

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO messages
        (
            chat_id,
            sender_id,
            receiver_id,
            file_url,
            message_type,
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
        chat_id,
        sender_id,
        receiver_id,
        file_url,
        message_type
    ))

    conn.commit()

    message_id = cursor.lastrowid

    socket_data = {
        "message_id": message_id,
        "chat_id": chat_id,
        "sender_id": sender_id,
        "receiver_id": receiver_id,
        "file_url": file_url,
        "message_type": message_type,
        "status": "delivered",
        "created_at": str(datetime.now())
    }

    print("\n========== FILE DEBUG ==========")
    print("Receiver:", receiver_id)
    print("File URL:", file_url)
    print("Type:", message_type)
    print("================================")

    await manager.send_personal_message(
        receiver_id,
        socket_data
    )

    cursor.close()
    conn.close()

    return {
        "success": True,
        "message_id": message_id,
        "file_url": file_url,
        "message_type": message_type
    }