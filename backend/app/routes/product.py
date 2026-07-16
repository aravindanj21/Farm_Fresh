from fastapi import APIRouter
from app.database import get_connection

router = APIRouter(
    prefix="/api/customer/products",
    tags=["Customer Products"]
)


@router.get("/category/{category_id}")
def get_products_by_category(category_id: int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT
                p.id,
                p.product_name,
                p.description,
                p.product_image,
                p.price,
                p.stock,
                p.unit,
                p.freshness,
                p.delivery,
                c.category_name
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            WHERE p.category_id=%s
            AND p.status='Active'
            ORDER BY p.product_name
        """, (category_id,))

        products = cursor.fetchall()

        return {
            "success": True,
            "products": products
        }

    finally:
        cursor.close()
        conn.close()



@router.get("/{product_id}")
def get_product_by_id(product_id:int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute("""
            SELECT
                p.*,
                c.category_name

            FROM products p

            JOIN categories c
            ON p.category_id=c.id

            WHERE p.id=%s

        """,(product_id,))


        product = cursor.fetchone()


        if not product:
            return {
                "message":"Product not found"
            }


        cursor.execute("""
            SELECT image_url
            FROM product_images
            WHERE product_id=%s
        """,(product_id,))


        images = cursor.fetchall()


        product["product_images"] = [
            img["image_url"]
            for img in images
        ]


        return product


    except Exception as e:

        return {
            "error":str(e)
        }


    finally:

        cursor.close()
        conn.close()



@router.get("/{product_id}/related")
def related_products(product_id: int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute("""
            SELECT category_id
            FROM products
            WHERE id=%s
        """, (product_id,))

        category = cursor.fetchone()

        if not category:
            return {
                "success": False,
                "products": []
            }

        cursor.execute("""
            SELECT
                p.id,
                p.product_name,
                p.product_image,
                p.price,
                p.unit
            FROM products p
            WHERE p.category_id=%s
            AND p.id<>%s
            AND p.status='Active'
            LIMIT 8
        """, (
            category["category_id"],
            product_id
        ))

        products = cursor.fetchall()

        return {
            "success": True,
            "products": products
        }

    finally:
        cursor.close()
        conn.close()



@router.get("/{product_id}/similar")
def similar_products(product_id: int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute("""
            SELECT
                category_id,
                unit
            FROM products
            WHERE id=%s
        """, (product_id,))

        current = cursor.fetchone()

        if not current:
            return {
                "success": False,
                "products": []
            }

        cursor.execute("""
            SELECT
                p.id,
                p.product_name,
                p.product_image,
                p.price,
                p.unit
            FROM products p
            WHERE
                (
                    p.category_id=%s
                    OR p.unit=%s
                )
            AND p.id<>%s
            AND p.status='Active'
            LIMIT 8
        """, (
            current["category_id"],
            current["unit"],
            product_id
        ))

        products = cursor.fetchall()

        return {
            "success": True,
            "products": products
        }

    finally:
        cursor.close()
        conn.close()