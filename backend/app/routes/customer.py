from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from app.database import get_connection
import random
from app.auth import create_access_token, verify_token

router = APIRouter(
    prefix="/api/customer",
    tags=["Customer"]
)




class CustomerRegister(BaseModel):
    full_name: str
    mobile: str
    email: EmailStr
    location: str
    password: str
    confirm_password: str


class CustomerLogin(BaseModel):
    mobile: str
    password: str

class OTPRequest(BaseModel):
    mobile: str


class OTPVerify(BaseModel):
    mobile: str
    otp: str


class ResetPassword(BaseModel):
    mobile: str
    otp: str
    password: str



otp_storage = {}




@router.post("/register")
def register_customer(customer: CustomerRegister):

    if customer.password != customer.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        
        cursor.execute(
            "SELECT id FROM customers WHERE mobile=%s",
            (customer.mobile,)
        )

        if cursor.fetchone():
            raise HTTPException(
                status_code=400,
                detail="Mobile number already registered"
            )

        
        cursor.execute(
            "SELECT id FROM customers WHERE email=%s",
            (customer.email,)
        )

        if cursor.fetchone():
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

       
        cursor.execute(
            "SELECT customer_id FROM customers ORDER BY id DESC LIMIT 1"
        )

        row = cursor.fetchone()

        if row:
            last_no = int(row["customer_id"].replace("CUS", ""))
            customer_id = f"CUS{last_no + 1:03d}"
        else:
            customer_id = "CUS001"

        
        cursor.execute(
            """
            INSERT INTO customers
            (customer_id, full_name, mobile, email, location, password)
            VALUES (%s,%s,%s,%s,%s,%s)
            """,
            (
                customer_id,
                customer.full_name,
                customer.mobile,
                customer.email,
                customer.location,
                customer.password,
            ),
        )

        conn.commit()

        return {
            "success": True,
            "message": "Customer Registered Successfully",
            "customer_id": customer_id,
        }

    finally:
        cursor.close()
        conn.close()




@router.post("/login")
def login_customer(data: CustomerLogin):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM customers
            WHERE mobile=%s
            AND password=%s
            """,
            (data.mobile, data.password)
        )

        customer = cursor.fetchone()

        if not customer:
            raise HTTPException(
                status_code=401,
                detail="Invalid Mobile Number or Password"
            )

        token = create_access_token(
            {
                "customer_id": customer["customer_id"],
                "mobile": customer["mobile"]
            }
        )

        return {
            "success": True,
            "access_token": token,
            "token_type": "bearer",
             "id": customer["id"], 
            "customer_id": customer["customer_id"],
            "full_name": customer["full_name"],
            "mobile": customer["mobile"]
        }

    finally:
        cursor.close()
        conn.close()


@router.post("/send-otp")
def send_otp(data: OTPRequest):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM customers WHERE mobile=%s",
        (data.mobile,)
    )

    customer = cursor.fetchone()

    cursor.close()
    conn.close()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Mobile number not registered"
        )

    otp = str(random.randint(100000, 999999))

    print("Generated OTP:", otp)

    otp_storage[data.mobile] = otp

    return {
        "success": True,
        "message": "OTP Sent Successfully",
        "otp": otp
    }


@router.post("/verify-otp")
def verify_otp(data: OTPVerify):

    saved_otp = otp_storage.get(data.mobile)

    if not saved_otp:
        raise HTTPException(
            status_code=400,
            detail="OTP Expired"
        )

    if saved_otp != data.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM customers WHERE mobile=%s",
        (data.mobile,)
    )

    customer = cursor.fetchone()

    cursor.close()
    conn.close()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    del otp_storage[data.mobile]

    
    token = create_access_token(
        {
            "customer_id": customer["customer_id"],
            "mobile": customer["mobile"]
        }
    )

    return {
        "success": True,
        "message": "OTP Verified",
        "access_token": token,
        "token_type": "bearer",
         "id": customer["id"], 
        "customer_id": customer["customer_id"],
        "full_name": customer["full_name"],
        "mobile": customer["mobile"]
    }

@router.post("/forgot-password")
def forgot_password(data: OTPRequest):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM customers WHERE mobile=%s",
        (data.mobile,)
    )

    customer = cursor.fetchone()

    cursor.close()
    conn.close()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    otp = str(random.randint(100000, 999999))

    otp_storage[data.mobile] = otp

    return {
        "success": True,
        "message": "OTP Sent",
        "otp": otp
    }

@router.post("/reset-password")
def reset_password(data: ResetPassword):

    saved_otp = otp_storage.get(data.mobile)

    if not saved_otp:
        raise HTTPException(
            status_code=400,
            detail="OTP Expired"
        )

    if saved_otp != data.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE customers
        SET password=%s
        WHERE mobile=%s
        """,
        (
            data.password,
            data.mobile
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    del otp_storage[data.mobile]

    return {
        "success": True,
        "message": "Password Reset Successfully"
    }

@router.get("/profile")
def get_customer_profile(payload: dict = Depends(verify_token)):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT
                customer_id,
                full_name,
                mobile,
                email,
                location,
                created_at
            FROM customers
            WHERE customer_id = %s
            """,
            (payload["customer_id"],)
        )

        customer = cursor.fetchone()

        if not customer:
            raise HTTPException(
                status_code=404,
                detail="Customer not found"
            )

        return {
            "success": True,
            "customer": customer
        }

    finally:
        cursor.close()
        conn.close()
