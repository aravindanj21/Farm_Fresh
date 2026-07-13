import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../CustomerService";

function SearchBar() {

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
  if (!keyword.trim()) return;

  try {
    const products = await searchProducts(keyword);

    navigate("/search", {
      state: {
        products,
        keyword,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="search-section">

      <input
        type="text"
        placeholder="Search by Product or Category"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

    </div>
  );
}

export default SearchBar;

