from fastapi import APIRouter
from db import cursor

router = APIRouter(
    prefix="/notifications"
)


@router.get("/")
def get_notifications():

    cursor.execute(
        "SELECT * FROM notifications"
    )

    data = cursor.fetchall()

    return {
        "success": True,
        "data": data
    }