import { useLocation } from "react-router-dom";

function SearchResults() {

  const { state } = useLocation();

  const products = state?.products || [];

  return (

    <div className="category-products">

      <h2>
        Search Results
      </h2>

      <div className="product-grid">

        {products.length > 0 ? (

          products.map((product) => (

            <div className="product-card" key={product.id}>

              <img
                src={product.product_image}
                alt={product.product_name}
              />

              <h3>{product.product_name}</h3>

              <p>{product.category_name}</p>

              <p>{product.description}</p>

              <h4>₹{product.price}</h4>

            </div>

          ))

        ) : (

          <h3>No products found.</h3>

        )}

      </div>

    </div>

  );
}

export default SearchResults;