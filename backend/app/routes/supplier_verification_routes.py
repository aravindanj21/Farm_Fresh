from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from app.database import get_connection
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_file(file: UploadFile):
    path = os.path.join(UPLOAD_DIR, file.filename)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return path


@router.post("/api/supplier/verification")
async def submit_verification(
    supplier_id: int = Form(...),
    business_name: str = Form(...),
    owner_name: str = Form(...),
    mobile_number: str = Form(...),
    email: str = Form(...),
    business_address: str = Form(...),
    gst_number: str = Form(None),
    pan_number: str = Form(None),
    business_license: UploadFile = File(...),
    gst_certificate: UploadFile = File(...),
    id_proof: UploadFile = File(...)
):

    conn = get_connection()
    cursor = conn.cursor()

    try:

        license_path = save_file(business_license)
        gst_path = save_file(gst_certificate)
        id_path = save_file(id_proof)

        sql = """
        INSERT INTO supplier_verifications (
            supplier_id,
            business_name,
            owner_name,
            mobile_number,
            email,
            business_address,
            gst_number,
            pan_number,
            business_license_file,
            gst_certificate_file,
            id_proof_file,
            status
        )
        VALUES (
            %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,'pending'
        )
        """

        values = (
            supplier_id,
            business_name,
            owner_name,
            mobile_number,
            email,
            business_address,
            gst_number,
            pan_number,
            license_path,
            gst_path,
            id_path
        )

        cursor.execute(sql, values)
        conn.commit()

        return {
            "success": True,
            "message": "Verification submitted successfully"
        }

    except Exception as e:

        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cursor.close()
        conn.close()


@router.get("/api/supplier/verification/status/{supplier_id}")
def get_verification_status(supplier_id: int):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT
                supplier_id,
                business_name,
                owner_name,
                status,
                submitted_at
            FROM supplier_verifications
            WHERE supplier_id = %s
            ORDER BY verification_id DESC
            LIMIT 1
            """,
            (supplier_id,)
        )

        verification = cursor.fetchone()

        if not verification:
            raise HTTPException(
                status_code=404,
                detail="Verification not found"
            )

        return verification

    finally:

        cursor.close()
        conn.close()