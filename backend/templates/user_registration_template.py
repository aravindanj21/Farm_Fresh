def registration_email(
    user_id,
    name,
    role,
    registration_date
):
    return f"""
    <html>
    <body style="background:#f4f6f9;padding:20px;font-family:Arial,sans-serif;">

    <div style="
        max-width:700px;
        margin:auto;
        background:white;
        border-radius:10px;
        overflow:hidden;
        box-shadow:0 2px 10px rgba(0,0,0,0.1);
    ">

        <div style="
            background:#0d6efd;
            padding:20px;
            text-align:center;
        ">
           

            <h2 style="color:white;margin-top:10px;">
                Registration Successful
            </h2>
        </div>

        <div style="padding:30px;">

            <p>Hello <b>{name}</b>,</p>

            <p>
                Welcome to Supplier Vendor Management System.
                Your account has been successfully created.
            </p>

            <table style="
                width:100%;
                border-collapse:collapse;
                margin-top:20px;
            ">

                <tr>
                    <td style="padding:10px;border:1px solid #ddd;">
                        User ID
                    </td>

                    <td style="padding:10px;border:1px solid #ddd;">
                        {user_id}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;border:1px solid #ddd;">
                        Name
                    </td>

                    <td style="padding:10px;border:1px solid #ddd;">
                        {name}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;border:1px solid #ddd;">
                        Role
                    </td>

                    <td style="padding:10px;border:1px solid #ddd;">
                        {role}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;border:1px solid #ddd;">
                        Registration Date
                    </td>

                    <td style="padding:10px;border:1px solid #ddd;">
                        {registration_date}
                    </td>
                </tr>

            </table>

        </div>

        <div style="
            background:#f8f9fa;
            text-align:center;
            padding:15px;
            color:#666;
        ">
            © 2026 Supplier Vendor Management System
        </div>

    </div>

    </body>
    </html>
    """