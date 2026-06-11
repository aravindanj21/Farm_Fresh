from fastapi import APIRouter
from data.app_data import vendors

router = APIRouter(prefix="/vendors", tags=["Vendors"])

@router.get("/search")
def search_vendors(keyword: str = ""):

    keyword = keyword.lower()

    result = [
        vendor
        for vendor in vendors
        if keyword in vendor["vendorName"].lower()
        or keyword in vendor["businessName"].lower()
    ]

    return result