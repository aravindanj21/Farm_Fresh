from pydantic import BaseModel


class LoginSchema(BaseModel):
    username: str
    password: str


class OrderCreate(BaseModel):
    vendor_name: str
    supplier_name: str
    product_name: str
    quantity: int


class OrderStatusUpdate(BaseModel):
    status: str