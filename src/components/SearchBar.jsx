import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-box"
    />
  );
};

export default SearchBar;