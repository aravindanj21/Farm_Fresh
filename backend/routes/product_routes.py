from fastapi import APIRouter
from data.app_data import products

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/search")
def search_products(keyword: str = ""):

    keyword = keyword.lower()

    result = [
        product
        for product in products
        if keyword in product["productName"].lower()
        or keyword in product["category"].lower()
        or keyword in product["supplierName"].lower()
    ]

    return result