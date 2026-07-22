import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsByCategory } from "../../services/ProductService";
import "./CategoryProducts.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { addToCart as addCartAPI } from "../../services/CartService";


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

  const addToCart = async (e, product) => {

    e.stopPropagation();

    const customer =
        JSON.parse(localStorage.getItem("customer"));


    const data = {
        customer_id: customer.id,
        product_id: product.id,
        quantity: 1
    };


    try {

        await addCartAPI(data);

        alert("Added to Cart");

    } catch(err) {

        console.log(err);
        alert("Cart Error");

    }

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
     <>
    <Header />
    <Navbar />

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
  src={product.product_image}
  alt={product.product_name}
  className="product-image"
/>

<h3>{product.product_name}</h3>

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
    </>
  );
}

export default CategoryProducts;