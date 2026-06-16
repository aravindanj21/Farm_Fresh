from fastapi import APIRouter
from datetime import datetime

from templates.user_registration_template import registration_email
from services.email_service import send_email

router = APIRouter()

@router.post("/register")
def register_user(user: dict):

    html = registration_email(
        user_id=user["user_id"],
        name=user["name"],
        role=user["role"],
        registration_date=str(datetime.now())
    )

    send_email(
        to_email=user["email"],
        subject="Registration Successful",
        html_content=html,
        email_type="Registration"
    )

    return {
        "message":
        "Registration Email Sent"
    }