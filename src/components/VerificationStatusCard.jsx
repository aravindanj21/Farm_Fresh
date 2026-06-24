import React from "react";

const VerificationStatusCard = ({
  status,
}) => {

  const getColor = () => {

    switch (status) {

      case "approved":
        return "green";

      case "rejected":
        return "red";

      case "under_review":
        return "blue";

      default:
        return "orange";
    }
  };

  return (
    <div
      className="status-card"
      style={{
        borderLeft:
          `6px solid ${getColor()}`
      }}
    >
      <h3>
        Verification Status
      </h3>

      <p>
        {status}
      </p>
    </div>
  );
};

export default VerificationStatusCard;