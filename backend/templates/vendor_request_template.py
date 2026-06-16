def vendor_request_email(
vendor_name,
product_name,
quantity,
request_date,
request_id
):
 return f"""




<div style="
    max-width:700px;
    margin:auto;
    background:#ffffff;
    border-radius:10px;
    overflow:hidden;
    box-shadow:0 2px 10px rgba(0,0,0,0.08);
">

    <!-- Header -->

    <div style="
        background:#198754;
        padding:25px;
        text-align:center;
    ">


        <h2 style="
            color:white;
            margin:0;
        ">
            New Vendor Request
        </h2>

        <p style="
            color:#e8f5ee;
            margin-top:8px;
        ">
            Supplier Vendor Management System
        </p>

    </div>

    <!-- Content -->

    <div style="padding:30px;">

        <p style="font-size:16px;">
            Hello Supplier,
        </p>

        <p style="
            color:#555;
            line-height:1.6;
        ">
            A new product request has been submitted by a vendor.
            Please review the request details below and take the necessary action.
        </p>

        <!-- Request Details Card -->

        <div style="
            background:#f8f9fa;
            border-left:5px solid #198754;
            padding:20px;
            margin-top:20px;
            border-radius:6px;
        ">

            <table style="
                width:100%;
                border-collapse:collapse;
            ">

                <tr>
                    <td style="padding:10px;font-weight:bold;">
                        Request ID
                    </td>
                    <td style="padding:10px;">
                        {request_id}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">
                        Vendor Name
                    </td>
                    <td style="padding:10px;">
                        {vendor_name}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">
                        Product Name
                    </td>
                    <td style="padding:10px;">
                        {product_name}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">
                        Quantity
                    </td>
                    <td style="padding:10px;">
                        {quantity}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">
                        Request Date
                    </td>
                    <td style="padding:10px;">
                        {request_date}
                    </td>
                </tr>

            </table>

        </div>

        <p style="
            margin-top:25px;
            color:#555;
        ">
            Kindly review this request and proceed with approval or further processing through the system.
        </p>

    </div>

    <!-- Footer -->

    <div style="
        background:#f8f9fa;
        text-align:center;
        padding:15px;
        color:#666;
        font-size:13px;
    ">
        © 2026 Supplier Vendor Management System<br>
        Automated Transactional Notification
    </div>

</div>

</body>
</html>
"""