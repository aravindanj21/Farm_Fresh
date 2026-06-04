from fastapi import APIRouter
from db import cursor

router = APIRouter(
    prefix="/reports"
)


@router.get("/")
def get_reports():

    cursor.execute(
        "SELECT * FROM reports"
    )

    reports = cursor.fetchall()

    total_sales = sum(
        item["sales"]
        for item in reports
    )

    return {
        "success": True,
        "totalOrders": len(reports),
        "totalSales": total_sales,
        "data": reports
    }