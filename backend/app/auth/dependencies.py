from fastapi import Depends
from fastapi.security import HTTPBearer
from jose import jwt

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

security = HTTPBearer()


def get_current_user(
    credentials=Depends(security)
):

    token = credentials.credentials

    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )

    return payload