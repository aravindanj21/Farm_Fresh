from database import get_connection

def log_email(
    recipient_email,
    email_type,
    status
):

    conn = get_connection()

    cursor = conn.cursor()

    query = """
    INSERT INTO email_logs
    (
        recipient_email,
        email_type,
        status
    )
    VALUES
    (%s,%s,%s)
    """

    values = (
        recipient_email,
        email_type,
        status
    )

    cursor.execute(
        query,
        values
    )

    conn.commit()

    cursor.close()
    conn.close()