import React, { useState } from "react";

const GlobalSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search Products, Suppliers, Vendors..."
      value={keyword}
      onChange={handleChange}
      style={{
        padding: "10px",
        width: "350px",
        borderRadius: "5px",
      }}
    />
  );
};

export default GlobalSearch;