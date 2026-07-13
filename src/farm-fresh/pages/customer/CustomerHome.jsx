import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import HeroBanner from "./components/HeroBanner";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import PopularProducts from "./components/PopularProducts";
import Footer from "./components/Footer";




import "./CustomerHome.css";

function CustomerHome() {
  return (
    <>
      <Header />
       <Navbar />
        <SearchBar />
      <HeroBanner />
      <Categories />
      <FeaturedProducts />
      <PopularProducts />
      <Footer />
      
    </>
  );
}

export default CustomerHome;

