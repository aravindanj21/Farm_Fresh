import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/customer/categories"
      );

      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Categories...</h2>;
  }

  return (
    <section className="categories">

      <h2>Shop by Category</h2>

      <div className="category-grid">

        {categories.map((category) => (

          <div
            key={category.id}
            className="category-card"
            onClick={() => navigate(`/category/${category.id}`)}
          >

            <div className="category-image">

              <img
                src={category.category_image}
                alt={category.category_name}
              />

            </div>

            <h3>{category.category_name}</h3>

            <button>Shop Now</button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Categories;