from fastapi import APIRouter
from app.database import get_connection

router = APIRouter()

@router.get("/products/category/{category_id}")
def get_products(category_id: int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM products
        WHERE category_id = %s
          AND status = 'Active'
        """,
        (category_id,)
    )

    products = cursor.fetchall()

    cursor.close()
    conn.close()

    return products