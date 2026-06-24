from fastapi import APIRouter, HTTPException

from app.schemas.auth_schema import (
    RegisterRequest,
    LoginRequest
)

from app.database import get_connection

router = APIRouter()


@router.post("/api/register")
def register(data: RegisterRequest):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT user_id
            FROM users
            WHERE email=%s
            """,
            (data.email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        password = data.password

        cursor.execute(
            """
            INSERT INTO users
            (
                name,
                email,
                mobile,
                password,
                role
            )
            VALUES
            (
                %s,%s,%s,%s,%s
            )
            """,
            (
                data.name,
                data.email,
                data.mobile,
                password,
                data.role
            )
        )

        conn.commit()

        return {
            "success": True,
            "message": "User registered successfully"
        }

    except Exception as e:

        print("REGISTER ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cursor.close()
        conn.close()


@router.post("/api/login")
def login(data: LoginRequest):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM users
            WHERE email=%s
            """,
            (data.email,)
        )

        user = cursor.fetchone()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid Email"
            )

        if user["password"] != data.password:
            raise HTTPException(
                status_code=401,
                detail="Invalid Password"
            )

        return {
            "success": True,
            "user_id": user["user_id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }

    except Exception as e:

        print("LOGIN ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cursor.close()
        conn.close()