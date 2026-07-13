from fastapi import APIRouter, Query
from app.database import get_connection

router = APIRouter(
    prefix="/api/customer",
    tags=["Customer Categories"]
)


@router.get("/categories")
def get_categories():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT
                id,
                category_name,
                category_image
            FROM categories
            WHERE status='Active'
            ORDER BY category_name
        """)

        categories = cursor.fetchall()

        return {
            "success": True,
            "categories": categories
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

    finally:
        cursor.close()
        conn.close()


@router.get("/products/category/{category_id}")
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
                c.category_name
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            WHERE
                p.category_id = %s
                AND p.status='Active'
                AND c.status='Active'
            ORDER BY p.product_name
        """, (category_id,))

        products = cursor.fetchall()

        return {
            "success": True,
            "products": products
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

    finally:
        cursor.close()
        conn.close()

@router.get("/products/featured")
def get_featured_products():

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
                c.category_name
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            WHERE
                p.status='Active'
                AND c.status='Active'
                AND p.featured=1
            ORDER BY p.id DESC
            LIMIT 10
        """)

        products = cursor.fetchall()

        return {
            "success": True,
            "products": products
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

    finally:
        cursor.close()
        conn.close()
        
@router.get("/products/popular")
def get_popular_products():

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
                c.category_name
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            WHERE
                p.status='Active'
                AND c.status='Active'
                AND p.popular=1
            ORDER BY p.id DESC
            LIMIT 10
        """)

        products = cursor.fetchall()

        return {
            "success": True,
            "products": products
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

    finally:
        cursor.close()
        conn.close()

@router.get("/search")
def search_products(keyword: str = Query(...)):

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
                c.category_name
            FROM products p
            INNER JOIN categories c
                ON p.category_id = c.id
            WHERE
                p.status = 'Active'
                AND c.status = 'Active'
                AND (
                    p.product_name LIKE %s
                    OR c.category_name LIKE %s
                )
        """, (f"%{keyword}%", f"%{keyword}%"))

        products = cursor.fetchall()

        return {
            "success": True,
            "products": products
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

    finally:
        cursor.close()
        conn.close()