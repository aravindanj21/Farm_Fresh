from fastapi import Depends
from fastapi.security import HTTPBearer

from app.auth.jwt_handler import (
    verify_token
)

security = HTTPBearer()

def get_current_user(
    credentials=Depends(security)
):
    token = credentials.credentials

    return verify_token(token)