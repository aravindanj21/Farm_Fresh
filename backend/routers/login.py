from fastapi import APIRouter
from auth import create_access_token
from schemas import LoginSchema

router = APIRouter()


@router.post("/login")
def login(data: LoginSchema):

    if (
        data.username == "admin"
        and data.password == "admin"
    ):

        token = create_access_token(
            {
                "username": "admin",
                "role": "Admin"
            }
        )

        return {
            "success": True,
            "token": token
        }

    return {
        "success": False,
        "message": "Invalid Credentials"
    }