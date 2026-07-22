import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProductById,
  getRelatedProducts,
  getSimilarProducts,
} from "../../services/ProductService";

import { addToCart as addCartAPI } from "../../services/CartService";

import "./ProductDetails.css";

import Navbar from "./components/Navbar";
import Header from "./components/Header";


function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();


  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [similarProducts, setSimilarProducts] = useState([]);


  const [selectedImage, setSelectedImage] = useState("");

  const [quantity, setQuantity] = useState(1);


  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  useEffect(() => {

    loadProduct();

  }, [id]);




  const loadProduct = async () => {

    try {

      setLoading(true);


      const productData =
        await getProductById(id);


      const relatedData =
        await getRelatedProducts(id);


      const similarData =
        await getSimilarProducts(id);



      setProduct(productData);


      setRelatedProducts(
        relatedData || []
      );


      setSimilarProducts(
        similarData || []
      );



      if(productData.product_images?.length > 0){

        setSelectedImage(
          productData.product_images[0]
        );

      }
      else{

        setSelectedImage(
          productData.product_image
        );

      }


      setError("");


    }
    catch(err){

      console.log(err);

      setError(
        "Unable to load product"
      );

    }
    finally{

      setLoading(false);

    }

  };




  const increaseQty = () => {

    setQuantity(
      prev => prev + 1
    );

  };



  const decreaseQty = () => {

    if(quantity > 1){

      setQuantity(
        prev => prev - 1
      );

    }

  };





  const addProductToCart = async () => {


    const customer =
      JSON.parse(
        localStorage.getItem("customer")
      );



    if(!customer){

      alert("Please login first");

      navigate("/customer-login");

      return;

    }



    const data = {

      customer_id: customer.id,

      product_id: product.id,

      quantity: quantity

    };



    try{


      await addCartAPI(data);


      alert("Added to Cart");


    }
    catch(err){


      console.log(err);


      alert("Cart Error");


    }


  };





  const buyNow = async () => {


    await addProductToCart();


    navigate("/cart");


  };





  const openProduct = (productId)=>{


    navigate(
      `/product/${productId}`
    );


  };





  if(loading){

    return (

      <>

      <Header />

      <Navbar />


      <div className="product-details-container">

        <h2>
          Loading Product...
        </h2>

      </div>


      </>

    );

  }




  if(error || !product){


    return (

      <>

      <Header />

      <Navbar />


      <div className="product-details-container">


        <h2>
          {error || "Product Not Found"}
        </h2>


        <button
          onClick={() => navigate(-1)}
        >

          Go Back

        </button>


      </div>


      </>

    );


  }






  return (

    <>


    <Header />

    <Navbar />



    <div className="product-details-container">



      <div className="product-details">



        <div className="image-section">


          <div className="main-image">


            <img

              src={selectedImage}

              alt={product.product_name}

            />


          </div>





          <div className="thumbnail-section">


          {
            product.product_images?.map(
              (img,index)=>(


                <img

                  key={index}

                  src={img}

                  alt="product"

                  className={
                    selectedImage === img
                    ?
                    "active-thumb"
                    :
                    ""
                  }


                  onClick={() =>
                    setSelectedImage(img)
                  }

                />


              )
            )
          }


          </div>


        </div>






        <div className="details-section">


          <h1>

            {product.product_name}

          </h1>




          <p>

            <strong>
              Category :
            </strong>

            {" "}

            {product.category_name}

          </p>





          <h2>

            ₹ {product.price}

          </h2>





          <p>

            <strong>
              Unit :
            </strong>

            {" "}

            {product.unit}

          </p>





          <p>

            <strong>
              Stock :
            </strong>

            {" "}

            {product.stock}

          </p>





          <p>

            <strong>
              Description :
            </strong>

          </p>


          <p>

            {product.description}

          </p>





          <p>

            <strong>
              Freshness :
            </strong>

            {" "}

            {product.freshness}

          </p>





          <p>

            <strong>
              Delivery :
            </strong>

            {" "}

            {product.delivery}

          </p>





          <div className="quantity-box">


            <button onClick={decreaseQty}>
              -
            </button>


            <span>

              {quantity}

            </span>



            <button onClick={increaseQty}>
              +
            </button>


          </div>





          <div className="action-buttons">


             <button
    className="cart-btn"
    onClick={addProductToCart}
  >
    Add to Cart
  </button>


  <button
    className="buy-btn"
    onClick={buyNow}
  >
    Buy Now
  </button>


          </div>



        </div>



      </div>






      <section className="product-list-section">


        <h2>
          Related Products
        </h2>


        <div className="product-grid">


        {
          relatedProducts.map(item=>(


            <div

              className="product-card"

              key={item.id}

              onClick={() =>
                openProduct(item.id)
              }

            >


              <img

                src={item.product_image}

                alt={item.product_name}

              />


              <h3>

                {item.product_name}

              </h3>


              <p>

                ₹ {item.price}

              </p>


            </div>


          ))
        }


        </div>


      </section>






      <section className="product-list-section">


        <h2>
          Similar Products
        </h2>


        <div className="product-grid">


        {
          similarProducts.map(item=>(


            <div

              className="product-card"

              key={item.id}


              onClick={() =>
                openProduct(item.id)
              }


            >


              <img

                src={item.product_image}

                alt={item.product_name}

              />


              <h3>

                {item.product_name}

              </h3>


              <p>

                ₹ {item.price}

              </p>


            </div>


          ))
        }


        </div>


      </section>




    </div>


    </>

  );

}


export default ProductDetails;