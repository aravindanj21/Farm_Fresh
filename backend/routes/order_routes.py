from fastapi import APIRouter
from data.app_data import orders

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.get("/search")
def search_orders(keyword: str = ""):

    keyword = keyword.lower()

    result = [
        order
        for order in orders
        if keyword in order["orderId"].lower()
        or keyword in order["productName"].lower()
    ]

    return result