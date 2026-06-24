from fastapi import APIRouter
from database import get_connection

router = APIRouter(
    prefix="/api/supplier",
    tags=["Supplier Orders"]
)

@router.get("/orders/{supplier_id}")
def get_supplier_orders(supplier_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT
        order_id AS id,
        vendor_name AS vendor,
        product_name AS product,
        quantity,
        status
    FROM orders
    WHERE supplier_id = %s
    """

    cursor.execute(query, (supplier_id,))
    orders = cursor.fetchall()

    cursor.close()
    conn.close()

    return orders