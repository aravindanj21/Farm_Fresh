import React, { useEffect, useState } from "react";
import "./paymentHistory.css";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    setPayments(storedPayments);
  }, []);

  const deletePayment = (transactionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment record?"
    );

    if (!confirmDelete) return;

    const updatedPayments = payments.filter(
      (payment) =>
        payment.transactionId !== transactionId
    );

    setPayments(updatedPayments);

    localStorage.setItem(
      "payments",
      JSON.stringify(updatedPayments)
    );

    alert("Payment Deleted Successfully");
  };

  const paidAmount = payments
    .filter((payment) => payment.status === "Paid")
    .reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    );

  const pendingAmount = payments
    .filter(
      (payment) => payment.status === "Pending"
    )
    .reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    );

  const failedAmount = payments
    .filter((payment) => payment.status === "Failed")
    .reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    );

  return (
    <div className="payment-container">
      <div className="page-header">
        <h1>Payment History</h1>
        <p>
          View and manage payment transaction
          records
        </p>
      </div>

      

      <div className="summary-cards">
        <div className="summary-card paid-card">
          <h3>Paid Amount</h3>
          <h2>
            ₹ {paidAmount.toLocaleString()}
          </h2>
        </div>

        <div className="summary-card pending-card">
          <h3>Pending Amount</h3>
          <h2>
            ₹ {pendingAmount.toLocaleString()}
          </h2>
        </div>

        <div className="summary-card failed-card">
          <h3>Failed Amount</h3>
          <h2>
            ₹ {failedAmount.toLocaleString()}
          </h2>
        </div>
      </div>

      
      <div className="table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Invoice No</th>
              <th>Vendor Name</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.length > 0 ? (
              payments.map(
                (payment, index) => (
                  <tr key={index}>
                    <td>
                      {payment.transactionId}
                    </td>

                    <td>
                      {payment.invoiceNumber}
                    </td>

                    <td>
                      {payment.vendorName}
                    </td>

                    <td>
                      ₹{" "}
                      {Number(
                        payment.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      {payment.paymentMethod}
                    </td>

                    <td>
                      {payment.paymentDate}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          payment.status ===
                          "Paid"
                            ? "paid"
                            : payment.status ===
                              "Pending"
                            ? "pending"
                            : "failed"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deletePayment(
                            payment.transactionId
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="no-data"
                >
                  No Payment Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;