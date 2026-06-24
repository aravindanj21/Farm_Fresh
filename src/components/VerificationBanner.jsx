import React from "react";

const VerificationBanner = ({
  status,
}) => {

  if (
    status === "approved"
  ) {
    return (
      <div className="success-banner">
        ✅ Verification Approved
      </div>
    );
  }

  if (
    status === "rejected"
  ) {
    return (
      <div className="error-banner">
        ❌ Verification Rejected.
        Please re-upload
        documents.
      </div>
    );
  }

  return (
    <div className="warning-banner">
      ⚠ Verification Pending.
      Product uploads and
      orders are disabled.
    </div>
  );
};

export default VerificationBanner;