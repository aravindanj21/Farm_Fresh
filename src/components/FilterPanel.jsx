import React from "react";

const FilterPanel = ({ filters, onChange }) => {
  return (
    <div className="filter-panel">

      {Object.keys(filters).map((key) => (
        <select
          key={key}
          value={filters[key]}
          onChange={(e) =>
            onChange({
              ...filters,
              [key]: e.target.value,
            })
          }
        >
          <option value="">Select {key}</option>
        </select>
      ))}

    </div>
  );
};

export default FilterPanel;