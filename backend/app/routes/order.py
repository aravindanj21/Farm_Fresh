from fastapi import APIRouter
from app.database import get_connection
from datetime import datetime


router = APIRouter(
    prefix="/api/orders",
    tags=["Orders"]
)


@router.post("/place")
def place_order(data: dict):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        customer_id = data["customer_id"]
        address_id = data["address_id"]
        payment_method = data["payment_method"]


        print("Received data:", data)
        print("Customer ID:", customer_id)


        
        cursor.execute(
            "SELECT * FROM cart WHERE customer_id=%s",
            (customer_id,)
        )

        cart_rows = cursor.fetchall()

        print("Cart rows:", cart_rows)


        
        cursor.execute("""
            SELECT
                c.product_id,
                c.quantity,
                p.price
            FROM cart c
            JOIN products p
                ON c.product_id = p.id
            WHERE c.customer_id = %s
        """, (customer_id,))


        cart_items = cursor.fetchall()

        print("Cart items after JOIN:", cart_items)



        if len(cart_items) == 0:

            return {
                "success": False,
                "message": "Cart is empty"
            }



       

        subtotal = sum(
            item["price"] * item["quantity"]
            for item in cart_items
        )


        delivery_charge = 40

        grand_total = subtotal + delivery_charge



        
        order_id = (
            "ORD" +
            datetime.now().strftime("%Y%m%d%H%M%S")
        )



       

        cursor.execute("""
            INSERT INTO orders
            (
                order_id,
                customer_id,
                address_id,
                payment_method,
                subtotal,
                delivery_charge,
                grand_total,
                order_status
            )
            VALUES
            (%s,%s,%s,%s,%s,%s,%s,%s)

        """,
        (
            order_id,
            customer_id,
            address_id,
            payment_method,
            subtotal,
            delivery_charge,
            grand_total,
            "Pending"
        ))



      

        for item in cart_items:

            cursor.execute("""
                INSERT INTO order_items
                (
                    order_id,
                    product_id,
                    quantity,
                    price
                )
                VALUES
                (%s,%s,%s,%s)

            """,
            (
                order_id,
                item["product_id"],
                item["quantity"],
                item["price"]
            ))



       

        cursor.execute("""
            DELETE FROM cart
            WHERE customer_id=%s
        """,
        (customer_id,))



        conn.commit()



        

        cursor.execute("""
    SELECT *
    FROM customer_addresses
    WHERE id=%s
     """, (address_id,))


        address = cursor.fetchone()



        return {

            "success": True,

            "message": "Order placed successfully",

            "order_id": order_id,

            "order_date":
                datetime.now().strftime(
                    "%d-%m-%Y %H:%M"
                ),

            "payment_method": payment_method,

            "status": "Pending",

            "address": address,

            "subtotal": subtotal,

            "delivery_charge": delivery_charge,

            "grand_total": grand_total
        }



    except Exception as e:

        conn.rollback()

        print("ORDER ERROR:", e)

        return {
            "success": False,
            "message": str(e)
        }



    finally:

        cursor.close()
        conn.close()