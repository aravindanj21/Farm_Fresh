from fastapi import APIRouter
from app.database import get_connection

router = APIRouter(
    prefix="/api/cart",
    tags=["Cart"]
)

@router.post("/add")
def add_cart(data: dict):

    conn = get_connection()
    cursor = conn.cursor()

    customer_id = data["customer_id"]
    product_id = data["product_id"]
    quantity = data["quantity"]

    cursor.execute("""
        SELECT id,quantity
        FROM cart
        WHERE customer_id=%s
        AND product_id=%s
    """, (customer_id, product_id))

    item = cursor.fetchone()

    if item:

        cursor.execute("""
            UPDATE cart
            SET quantity=quantity+%s
            WHERE id=%s
        """, (
            quantity,
            item[0]
        ))

    else:

        cursor.execute("""
            INSERT INTO cart(
                customer_id,
                product_id,
                quantity
            )
            VALUES(%s,%s,%s)
        """, (
            customer_id,
            product_id,
            quantity
        ))

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Added successfully"
    }

@router.get("/{customer_id}")
def get_cart(customer_id: int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT

            cart.id,

            cart.quantity,

            products.id AS product_id,

            products.product_name AS name,

            products.product_image AS image,

            products.price,

            products.unit

        FROM cart

        JOIN products

        ON cart.product_id=products.id

        WHERE cart.customer_id=%s
    """, (customer_id,))

    items = cursor.fetchall()

    cursor.close()
    conn.close()

    return items

@router.put("/update")
def update_cart(data: dict):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE cart
        SET quantity=%s
        WHERE id=%s
    """, (
        data["quantity"],
        data["cart_id"]
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Updated"
    }

@router.delete("/{cart_id}")
def remove_item(cart_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM cart
        WHERE id=%s
    """, (cart_id,))

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Removed"
    }