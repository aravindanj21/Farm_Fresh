from fastapi import APIRouter
from data.app_data import invoices

router = APIRouter(prefix="/invoices", tags=["Invoices"])

@router.get("/search")
def search_invoices(keyword: str = ""):

    keyword = keyword.lower()

    result = [
        invoice
        for invoice in invoices
        if keyword in invoice["invoiceNumber"].lower()
        or keyword in invoice["vendorName"].lower()
    ]

    return result