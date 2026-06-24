from fastapi import APIRouter
from pydantic import BaseModel
from database import get_connection

router = APIRouter(prefix="/api/products", tags=["Products"])


class Product(BaseModel):
    supplier_id: int
    category_id: int
    product_name: str
    description: str
    price: float
    stock: int
    image_url: str


@router.post("")
def add_product(product: Product):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO product
    (
        supplier_id,
        category_id,
        product_name,
        description,
        price,
        stock,
        image_url
    )
    VALUES (%s,%s,%s,%s,%s,%s,%s)
    """

    cursor.execute(
        query,
        (
            product.supplier_id,
            product.category_id,
            product.product_name,
            product.description,
            product.price,
            product.stock,
            product.image_url
        )
    )

    conn.commit()

    product_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return {
        "message": "Product added successfully",
        "product_id": product_id
    }