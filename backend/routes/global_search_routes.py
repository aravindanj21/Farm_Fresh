from fastapi import APIRouter

from data.app_data import (
    products,
    suppliers,
    vendors,
    orders,
    invoices
)

router = APIRouter(tags=["Global Search"])

@router.get("/global-search")
def global_search(keyword: str = ""):

    keyword = keyword.lower()

    return {
        "products": [
            p for p in products
            if keyword in p["productName"].lower()
            or keyword in p["category"].lower()
        ],

        "suppliers": [
            s for s in suppliers
            if keyword in s["supplierName"].lower()
            or keyword in s["businessName"].lower()
        ],

        "vendors": [
            v for v in vendors
            if keyword in v["vendorName"].lower()
            or keyword in v["businessName"].lower()
        ],

        "orders": [
            o for o in orders
            if keyword in o["orderId"].lower()
            or keyword in o["productName"].lower()
        ],

        "invoices": [
            i for i in invoices
            if keyword in i["invoiceNumber"].lower()
            or keyword in i["vendorName"].lower()
        ]
    }