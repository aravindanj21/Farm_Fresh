from fastapi import APIRouter
from datetime import datetime

from templates.order_success_template import order_success_email
from services.email_service import send_email

router = APIRouter()

@router.put("/approve-order/{order_id}")
def approve_order(order_id: int):

    vendor_email = "vendor@gmail.com"

    html = order_success_email(
        order_id=order_id,
        product_details="Dell Laptop",
        quantity=10,
        supplier_name="ABC Suppliers",
        status="Approved",
        order_date=str(datetime.now())
    )

    send_email(
        to_email=vendor_email,
        subject="Order Approved",
        html_content=html,
        email_type="Order Success"
    )

    return {
        "message":
        "Order Success Email Sent"
    }