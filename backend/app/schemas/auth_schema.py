from pydantic import BaseModel

class RegisterRequest(BaseModel):
    name: str
    email: str
    mobile: str
    password: str
    role: str


class LoginRequest(BaseModel):
    email: str
    password: str