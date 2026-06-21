from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.database.db import get_connection
from app.auth.security import create_access_token

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/api/login")
def login(data: LoginRequest):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE email=%s
        AND password=%s
        """,
        (
            data.email,
            data.password
        )
    )

    user = cursor.fetchone()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token({
        "user_id": user["user_id"],
        "role": user["role"]
    })

    return {
        "access_token": token,
        "role": user["role"]
    }