from fastapi import APIRouter
from db import connection, cursor
from schemas import (
    OrderCreate,
    OrderStatusUpdate
)

router = APIRouter(
    prefix="/orders"
)


@router.post("/")
def create_order(
    order: OrderCreate
):

    sql = """
    INSERT INTO orders
    (
        order_id,
        vendor_name,
        supplier_name,
        product_name,
        quantity,
        status
    )
    VALUES
    (%s,%s,%s,%s,%s,%s)
    """

    values = (
        "ORD001",
        order.vendor_name,
        order.supplier_name,
        order.product_name,
        order.quantity,
        "Pending"
    )

    cursor.execute(sql, values)
    connection.commit()

    return {
        "success": True,
        "message": "Order Created"
    }


@router.get("/")
def get_orders():

    cursor.execute(
        "SELECT * FROM orders"
    )

    orders = cursor.fetchall()

    return {
        "success": True,
        "data": orders
    }


@router.put("/{id}")
def update_status(
    id: int,
    payload: OrderStatusUpdate
):

    sql = """
    UPDATE orders
    SET status=%s
    WHERE id=%s
    """

    cursor.execute(
        sql,
        (
            payload.status,
            id
        )
    )

    connection.commit()

    return {
        "success": True,
        "message": "Status Updated"
    }