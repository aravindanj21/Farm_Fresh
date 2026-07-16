import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsByCategory } from "../../services/ProductService";
import "./CategoryProducts.css";

function CategoryProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProductsByCategory(id);

      setProducts(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (e, product) => {
    e.stopPropagation();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to Cart");
  };

  if (loading) {
    return (
      <div className="category-products">
        <h2>Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-products">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="category-products">

      <h2>Products</h2>

      <div className="product-grid">

        {products.length > 0 ? (
          products.map((product) => (

            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <h4>₹ {product.price}</h4>

              <p>Unit : {product.unit}</p>

              <p>Stock : {product.stock}</p>

              <div className="product-buttons">

                <button
                  onClick={(e) => addToCart(e, product)}
                >
                  Add to Cart
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                >
                  View Details
                </button>

              </div>

            </div>

          ))
        ) : (
          <h3>No Products Available.</h3>
        )}

      </div>

    </div>
  );
}

export default CategoryProducts;