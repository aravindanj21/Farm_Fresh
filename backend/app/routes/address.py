from fastapi import APIRouter
from app.database import get_connection

router = APIRouter(
    prefix="/api/address",
    tags=["Customer Address"]
)

@router.post("/add")
def add_address(data: dict):

    conn = get_connection()
    cursor = conn.cursor()

    if data.get("is_default"):

        cursor.execute("""
            UPDATE customer_addresses
            SET is_default = 0
            WHERE customer_id=%s
        """, (data["customer_id"],))

    cursor.execute("""
        INSERT INTO customer_addresses
        (
            customer_id,
            full_name,
            mobile,
            street,
            city,
            district,
            state,
            pincode,
            landmark,
            is_default
        )
        VALUES
        (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """,(
        data["customer_id"],
        data["full_name"],
        data["mobile"],
        data["street"],
        data["city"],
        data["district"],
        data["state"],
        data["pincode"],
        data.get("landmark"),
        data.get("is_default",False)
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Address Added"}

@router.get("/{customer_id}")
def get_addresses(customer_id:int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM customer_addresses
        WHERE customer_id=%s
        ORDER BY is_default DESC,id DESC
    """,(customer_id,))

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data

@router.put("/update")
def update_address(data:dict):

    conn=get_connection()
    cursor=conn.cursor()

    if data.get("is_default"):

        cursor.execute("""
            UPDATE customer_addresses
            SET is_default=0
            WHERE customer_id=%s
        """,(data["customer_id"],))

    cursor.execute("""
        UPDATE customer_addresses
        SET
            full_name=%s,
            mobile=%s,
            street=%s,
            city=%s,
            district=%s,
            state=%s,
            pincode=%s,
            landmark=%s,
            is_default=%s
        WHERE id=%s
    """,(
        data["full_name"],
        data["mobile"],
        data["street"],
        data["city"],
        data["district"],
        data["state"],
        data["pincode"],
        data.get("landmark"),
        data.get("is_default",False),
        data["id"]
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Address Updated"}

@router.delete("/{id}")
def delete_address(id:int):

    conn=get_connection()
    cursor=conn.cursor()

    cursor.execute("""
        DELETE FROM customer_addresses
        WHERE id=%s
    """,(id,))

    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Address Deleted"}

@router.put("/default")
def default_address(data:dict):

    conn=get_connection()
    cursor=conn.cursor()

    cursor.execute("""
        UPDATE customer_addresses
        SET is_default=0
        WHERE customer_id=%s
    """,(data["customer_id"],))

    cursor.execute("""
        UPDATE customer_addresses
        SET is_default=1
        WHERE id=%s
    """,(data["address_id"],))

    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Default Address Updated"}