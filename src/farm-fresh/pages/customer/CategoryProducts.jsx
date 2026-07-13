import { useParams } from "react-router-dom";
import "./CategoryProducts.css";
const products = [
  
  {
    id: 1,
    category: "milk-dairy",
    name: "Fresh Cow Milk",
    description: "100% Fresh Organic Milk",
    price: 60,
    unit: "Litre",
    stock: 40,
    image: "https://hgic.clemson.edu/wp-content/uploads/2023/12/milk-from-jug-pouring-into-glass-.jpeg",
  },
  {
    id: 2,
    category: "milk-dairy",
    name: "Paneer",
    description: "Homemade Paneer",
    price: 120,
    unit: "Kg",
    stock: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3IZbmu59OO0ffg7E0I7gA9s86kMQ5LUNcU9MAj-rixA&s=10",
  },
  {
    id: 3,
    category: "milk-dairy",
    name: "Curd",
    description: "Homemade Curd",
    price: 20,
    unit: "Kg",
    stock: 20,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMgn_2SSrLLflYpZyK7e3QfmixNtYPPL1QpyjVWjSLw&s=10",
  },
  
  {
    id: 4,
    category: "milk-dairy",
    name: "Butter Milk",
    description: "Natural Butter Milk",
    price: 30,
    unit: "Kg",
    stock: 40,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYTn3gwYREOFZxrzPLhphZp-yp_poNDzWAt90Jm_24Gw&s=10",
  },
  
  {
    id: 5,
    category: "goat-farm",
    name: "Goat Meat",
    description: "Fresh Goat Meat",
    price: 950,
    unit: "Kg",
    stock: 15,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIYX4Qo9sWuVzEHUqi3QuVdFR7UuIzwlePsMcsWDBiWg&s",
  },
  {
    id: 6,
    category: "goat-farm",
    name: "Goat Milk",
    description: "Fresh Goat Milk",
    price: 150,
    unit: "Litre",
    stock: 20,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgIjD1wyExKOWEGF5e_a3B89aanYNfUqAfvfUg9eP3vw&s",
  },

  
  {
    id: 7,
    category: "chicken-farm",
    name: "Country Chicken",
    description: "Fresh Country Chicken",
    price: 350,
    unit: "Kg",
    stock: 30,
    image: "https://desitreat.in/cdn/shop/files/Mock_Chicken_22d5f18c-470c-4a73-8bad-cd3860305687.png?v=1764917106",
  },
  {
    id: 6,
    category: "chicken-farm",
    name: "Broiler Chicken",
    description: "Fresh Broiler Chicken",
    price: 220,
    unit: "Kg",
    stock: 50,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU_vWRB4na3ZbW2j2dgJGieleGGh4R1toz2uBizJP3Lg&s",
  },

  
  {
    id: 7,
    category: "eggs",
    name: "Country Eggs",
    description: "Farm Fresh Eggs",
    price: 8,
    unit: "Piece",
    stock: 250,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGyVeLPeQxQv3OhMwVs-nw8eDLHMLErIE-u9FpPHPKVw&s=10",
  },
  

  
  {
    id: 8,
    category: "fresh-water-fish",
    name: "Rohu Fish",
    description: "Fresh River Rohu",
    price: 220,
    unit: "Kg",
    stock: 35,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQen4a811BC3B9vRICyAmKXeN8hYSLZhK0ZCfdHIdWU8w&s=10",
  },
  

  
  {
    id: 9,
    category: "sea-fish",
    name: "Seer Fish",
    description: "Fresh Seer Fish",
    price: 700,
    unit: "Kg",
    stock: 15,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK6h_bmMjMy-puEvPkVkFz3fy9D26r_TZknbRvhI79Tg&s=10",
  },
  

  
  {
    id: 10,
    category: "fresh-water-prawn",
    name: "River Prawn",
    description: "Fresh Water Prawn",
    price: 500,
    unit: "Kg",
    stock: 18,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRqhl8pGLgu0VylPQFfm9f5-CsATZ4ywMX6x3yqlFa3g&s=10",
  },

 
  {
    id: 11,
    category: "sea-prawn",
    name: "Tiger Prawn",
    description: "Fresh Tiger Prawn",
    price: 800,
    unit: "Kg",
    stock: 10,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HHGzi2Cxnzv2pHbRT6xSCw-Tx9AoxRS2SwyuUj0swQ&s=10",
  },
  

  
  {
    id: 12,
    category: "crab",
    name: "Mud Crab",
    description: "Fresh Mud Crab",
    price: 900,
    unit: "Kg",
    stock: 14,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqH0r07yI359FUIbYZ7Gzlg-Senq1Goa3qeOyCFfUo6g&s=10",
  },
  {
    id: 13,
    category: "crab",
    name: "Blue Crab",
    description: "Fresh Blue Crab",
    price: 750,
    unit: "Kg",
    stock: 18,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYg78cDPVlSLqj0LKJNojNBm3PQZNWq6RO4kJ9A-bp2A&s=10",
  },

  
  {
    id: 14,
    category: "meat",
    name: "Mutton",
    description: "Fresh Mutton",
    price: 950,
    unit: "Kg",
    stock: 22,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq7njiBaKUklFYLxgXwl1t1WWtj6_Bf6T3MpQlY0pxYw&s=10",
  },
 
];

function CategoryProducts() {
  const { id } = useParams();

  const filteredProducts = products.filter(
    (product) => product.category === id
  );

  return (
    <div className="category-products">
      <h2>Products</h2>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <h4>₹{product.price}</h4>

              <p>Unit : {product.unit}</p>

              <p>Stock : {product.stock}</p>

              <div className="product-buttons">
                <button>Add to Cart</button>
                <button>View Details</button>
              </div>
            </div>
          ))
        ) : (
          <h3>No products available.</h3>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;

