from fastapi import HTTPException

def vendor_only(user):

    if user["role"] != "vendor":
        raise HTTPException(
            status_code=403,
            detail="Vendor access required"
        )


def supplier_only(user):

    if user["role"] != "supplier":
        raise HTTPException(
            status_code=403,
            detail="Supplier access required"
        )