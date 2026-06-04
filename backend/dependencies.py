from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )


def admin_required(
    current_user=Depends(
        get_current_user
    )
):
    if current_user["role"] != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Admin Only"
        )

    return current_user