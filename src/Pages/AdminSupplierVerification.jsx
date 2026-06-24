import React, { useEffect, useState } from "react";
import {
  getVerifications,
  approveSupplier,
  rejectSupplier,
  requestResubmission,
  getVerificationDetails
} from "../services/adminVerificationService";

const AdminSupplierVerification = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getVerifications();
      setSuppliers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (supplierId) => {
    await approveSupplier(supplierId);
    loadData();
  };

  const handleReject = async (supplierId) => {
    const reason = prompt("Enter rejection reason");
    if (!reason) return;

    await rejectSupplier(supplierId, reason);
    loadData();
  };

  const handleResubmit = async (supplierId) => {
    await requestResubmission(supplierId);
    loadData();
  };

  const handleViewDocs = async (supplierId) => {
    const data = await getVerificationDetails(supplierId);

    alert(`
Business License:
${data.business_license_file}

GST Certificate:
${data.gst_certificate_file}

ID Proof:
${data.id_proof_file}
    `);
  };

  return (
    <>
      <style>{`
        .verification-container{
          padding:30px;
          background:#f1f5f9;
          min-height:100vh;
        }

        .verification-card{
          background:#fff;
          border-radius:20px;
          padding:25px;
          box-shadow:0 10px 30px rgba(0,0,0,0.08);
        }

        .verification-title{
          text-align:center;
          margin-bottom:25px;
          color:#0f172a;
          font-size:28px;
          font-weight:700;
        }

        .verification-table{
          width:100%;
          border-collapse:collapse;
          overflow:hidden;
          border-radius:12px;
        }

        .verification-table thead{
          background:#2563eb;
          color:white;
        }

        .verification-table th,
        .verification-table td{
          padding:14px;
          text-align:center;
        }

        .verification-table tbody tr{
          border-bottom:1px solid #e2e8f0;
          transition:0.3s;
        }

        .verification-table tbody tr:hover{
          background:#f8fafc;
        }

        .status{
          padding:6px 12px;
          border-radius:20px;
          font-size:13px;
          font-weight:600;
          display:inline-block;
        }

        .pending{
          background:#fef3c7;
          color:#92400e;
        }

        .approved{
          background:#dcfce7;
          color:#166534;
        }

        .rejected{
          background:#fee2e2;
          color:#991b1b;
        }

        .btn{
          border:none;
          padding:8px 14px;
          margin:3px;
          border-radius:8px;
          cursor:pointer;
          color:white;
          font-size:13px;
          font-weight:600;
          transition:0.3s;
        }

        .btn:hover{
          transform:translateY(-2px);
        }

        .view-btn{
          background:#64748b;
        }

        .approve-btn{
          background:#16a34a;
        }

        .reject-btn{
          background:#dc2626;
        }

        .resubmit-btn{
          background:#ea580c;
        }

        .empty-row{
          text-align:center;
          padding:20px;
          color:#64748b;
          font-weight:500;
        }
      `}</style>

      <div className="verification-container">
        <div className="verification-card">
          <h2 className="verification-title">
            Supplier Verification Management
          </h2>

          <table className="verification-table">
            <thead>
              <tr>
                <th>Supplier ID</th>
                <th>Owner Name</th>
                <th>Business Name</th>
                <th>Status</th>
                <th>Submitted Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((item) => (
                  <tr key={item.supplier_id}>
                    <td>{item.supplier_id}</td>
                    <td>{item.owner_name}</td>
                    <td>{item.business_name}</td>

                    <td>
                      <span
                        className={`status ${
                          item.status === "approved"
                            ? "approved"
                            : item.status === "rejected"
                            ? "rejected"
                            : "pending"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>{item.submitted_at}</td>

                    <td>
                      <button
                        className="btn view-btn"
                        onClick={() =>
                          handleViewDocs(item.supplier_id)
                        }
                      >
                        View Docs
                      </button>

                      <button
                        className="btn approve-btn"
                        onClick={() =>
                          handleApprove(item.supplier_id)
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn reject-btn"
                        onClick={() =>
                          handleReject(item.supplier_id)
                        }
                      >
                        Reject
                      </button>

                      <button
                        className="btn resubmit-btn"
                        onClick={() =>
                          handleResubmit(item.supplier_id)
                        }
                      >
                        Resubmit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No Verification Requests Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminSupplierVerification;

