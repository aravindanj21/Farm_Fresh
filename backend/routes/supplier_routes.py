from fastapi import APIRouter
from data.app_data import suppliers

router = APIRouter(prefix="/suppliers", tags=["Suppliers"])

@router.get("/search")
def search_suppliers(keyword: str = ""):

    keyword = keyword.lower()

    result = [
        supplier
        for supplier in suppliers
        if keyword in supplier["supplierName"].lower()
        or keyword in supplier["businessName"].lower()
    ]

    return result