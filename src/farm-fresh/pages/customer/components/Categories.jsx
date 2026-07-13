import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "milk-dairy",
    name: "Milk & Dairy",
    image: "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/news16569.jpg",
    products: 18,
  },
  {
    id: "goat-farm",
    name: "Goat Farm",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6B2a92G8B4Wc-TGrZY_vs4771z4T1L-Njl-d2KyFXQ&s=10",
    products: 12,
  },
  {
    id: "chicken-farm",
    name: "Chicken Farm",
    image: "https://desitreat.in/cdn/shop/files/Mock_Chicken_22d5f18c-470c-4a73-8bad-cd3860305687.png?v=1764917106",
    products: 25,
  },
  {
    id: "eggs",
    name: "Eggs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtZhTb31KcCv9Zr9FnC5z6Hoa38hcR0GpzG4Uz2ndbSg&s=10",
    products: 15,
  },
  {
    id: "fresh-water-fish",
    name: "Fresh Water Fish",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOJ3Jwbz7w7C0SoVetwJTXbn9c5OZocpZtDUME74SdpQ&s=10",
    products: 30,
  },
  {
    id: "sea-fish",
    name: "Sea Fish",
    image: "https://m.media-amazon.com/images/I/71pvWguoyTL._AC_UF1000,1000_QL80_.jpg",
    products: 27,
  },
  {
    id: "fresh-water-prawn",
    name: "Fresh Water Prawn",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQILtuUfbThpzFUqqOZUyyAW_lAL80guHoZL55v_I91PA&s=10",
    products: 9,
  },
  {
    id: "sea-prawn",
    name: "Sea Prawn",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQzvakiio9ut1XdPgRMGOiCmJHK209IQ443NPvITZzyw&s=10",
    products: 11,
  },
  {
    id: "crab",
    name: "Crab",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrhgtyIrypqIOJO7u45PwAw8km0teLogbFF3SrDE0HQ&s",
    products: 10,
  },
  {
    id: "meat",
    name: "Meat",
    image: "https://www.kitchentreasures.in/wp-content/uploads/2023/03/kt-meat-masala2.webp",
    products: 22,
  },
];

function Categories() {
  const navigate = useNavigate();

  return (
  <section className="categories">
  <h2>Shop by Category</h2>

  <div className="category-grid">
    {categories.map((cat) => (
      <div
        key={cat.id}
        className="category-card"
        onClick={() => navigate(`/category/${cat.id}`)}
      >
        <div className="category-image">
          <img src={cat.image} alt={cat.name} />
        </div>

        <h3>{cat.name}</h3>

        <p>{cat.products} Products</p>

        <button>Shop Now</button>
      </div>
    ))}
  </div>
</section>
);
}

export default Categories;
