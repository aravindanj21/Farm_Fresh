def order_success_email(
order_id,
product_details,
quantity,
supplier_name,
status,
order_date
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
            Order Approved Successfully
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
            Hello,
        </p>

        <p style="
            color:#555;
            line-height:1.6;
        ">
            Your order has been successfully approved by the supplier.
            Below are the order details for your reference.
        </p>

        <!-- Order Details Card -->

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
                        Order ID
                    </td>
                    <td style="padding:10px;">
                        {order_id}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">
                        Product Details
                    </td>
                    <td style="padding:10px;">
                        {product_details}
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
                        Supplier Name
                    </td>
                    <td style="padding:10px;">
                        {supplier_name}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">
                        Status
                    </td>
                    <td style="
                        padding:10px;
                        color:#198754;
                        font-weight:bold;
                    ">
                        {status}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">
                        Order Date
                    </td>
                    <td style="padding:10px;">
                        {order_date}
                    </td>
                </tr>

            </table>

        </div>

        <!-- Success Message -->

        <div style="
            margin-top:25px;
            background:#e8f5ee;
            border:1px solid #198754;
            border-radius:6px;
            padding:15px;
            color:#155724;
        ">
            Your order has been approved and is now being processed.
        </div>

        <p style="
            margin-top:25px;
            color:#555;
        ">
            Thank you for choosing our platform. We appreciate your business and look forward to serving you again.
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