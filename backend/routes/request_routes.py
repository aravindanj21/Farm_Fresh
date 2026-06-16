from fastapi import APIRouter
from datetime import datetime

from services.email_service import send_email
from templates.vendor_request_template import vendor_request_email

router = APIRouter()


@router.post("/vendor-request")
def create_request(data: dict):

    email_html = vendor_request_email(
        vendor_name=data["vendor_name"],
        product_name=data["product_name"],
        quantity=data["quantity"],
        request_date=str(datetime.now()),
        request_id=data["request_id"]
    )

    send_email(
        to_email=data["supplier_email"],
        subject="New Vendor Product Request",
        html_content=email_html
    )

    return {
        "message": "Request Created & Email Sent"
    }