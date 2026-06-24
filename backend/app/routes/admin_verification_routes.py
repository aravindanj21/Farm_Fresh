from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.database import get_connection

router = APIRouter()


class RejectRequest(BaseModel):
    reason: str



@router.get("/api/admin/supplier-verifications")
def get_all_verifications():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute("""
            SELECT
                verification_id,
                supplier_id,
                owner_name,
                business_name,
                status,
                submitted_at
            FROM supplier_verifications
            ORDER BY submitted_at DESC
        """)

        return cursor.fetchall()

    finally:

        cursor.close()
        conn.close()



@router.get(
    "/api/admin/supplier-verification/{supplier_id}"
)
def get_supplier_verification(
    supplier_id: int
):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute("""
            SELECT *
            FROM supplier_verifications
            WHERE supplier_id=%s
        """, (supplier_id,))

        data = cursor.fetchone()

        if not data:
            raise HTTPException(
                status_code=404,
                detail="Verification not found"
            )

        return data

    finally:

        cursor.close()
        conn.close()



@router.put(
    "/api/admin/supplier-verification/{supplier_id}/approve"
)
def approve_supplier(
    supplier_id: int
):

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute("""
            UPDATE supplier_verifications
            SET
                status='approved',
                updated_at=NOW()
            WHERE supplier_id=%s
        """, (supplier_id,))

        conn.commit()

        return {
            "message": "Supplier Approved"
        }

    finally:

        cursor.close()
        conn.close()



@router.put(
    "/api/admin/supplier-verification/{supplier_id}/reject"
)
def reject_supplier(
    supplier_id: int,
    data: RejectRequest
):

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute("""
            UPDATE supplier_verifications
            SET
                status='rejected',
                rejection_reason=%s,
                updated_at=NOW()
            WHERE supplier_id=%s
        """, (
            data.reason,
            supplier_id
        ))

        conn.commit()

        return {
            "message": "Supplier Rejected"
        }

    finally:

        cursor.close()
        conn.close()



@router.put(
    "/api/admin/supplier-verification/{supplier_id}/resubmit"
)
def request_resubmission(
    supplier_id: int
):

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute("""
            UPDATE supplier_verifications
            SET
                status='resubmission_required',
                updated_at=NOW()
            WHERE supplier_id=%s
        """, (supplier_id,))

        conn.commit()

        return {
            "message":
            "Resubmission Requested"
        }

    finally:

        cursor.close()
        conn.close()



@router.get(
    "/api/admin/supplier-verification/{supplier_id}/documents"
)
def get_documents(
    supplier_id: int
):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute("""
            SELECT
                business_license_file,
                gst_certificate_file,
                id_proof_file
            FROM supplier_verifications
            WHERE supplier_id=%s
        """, (supplier_id,))

        docs = cursor.fetchone()

        if not docs:
            raise HTTPException(
                status_code=404,
                detail="Documents not found"
            )

        return docs

    finally:

        cursor.close()
        conn.close()