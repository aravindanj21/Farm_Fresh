import React from "react"

const ProductTable = () => {

  const products = [
    {
      id: 1,
      image: "/images/rice.jpg",
      name: 'Rice Bag',
      category: 'Food',
      stock: 120,
      price: 900,
      status: 'Available'
    },
    {
      id: 2,
      image: "/images/oil.jpg",
      name: 'Oil Bottle',
      category: 'Grocery',
      stock: 80,
      price: 150,
      status: 'Low Stock'
    },
    { id: 3, 
      image:"/images/wheat.jpg", 
      name: 'Wheat', 
      category: 'Food', 
      stock: 100, 
      price: 70, 
      status: 'Low Stock'
     },
     { id: 3, 
      image:"/images/soap.avif", 
      name: 'Wheat', 
      category: 'Food', 
      stock: 100, 
      price: 70, 
      status: 'Low Stock'
     },
     { id: 5, 
      image:"/images/detergent.png", 
      name: 'Detergent Liquid', 
      category: 'Grocery', 
      stock: 600, 
      price: 140, 
      status: 'Medium Stock'
     },
     { id: 6, 
      image:"/images/washingsoap.jpg", 
      name: 'Washing Soap', 
      category: 'Grocery', 
      stock: 300, 
      price: 30, 
      status: 'Medium Stock'
     },
     { id: 7, 
      image:"/images/fan.webp", 
      name: 'Fan', 
      category: 'Electricals', 
      stock: 200, 
      price: 2000, 
      status: 'Low Stock' 
    },
    { id: 8, 
      image:"/images/lights.jpg", 
      name: 'Lights', 
      category: 'Electricals', 
      stock: 1000, 
      price: 100, 
      status: 'High Stock' 
    },
    { id: 9, 
      image:"/images/biscuits.jpg",
       name: 'Biscuits', 
       category: 'Food', 
       stock: 2000, 
       price: 20, 
       status: 'High Stock' 
      },
      { id: 10, 
        image:"/images/microwaveoven.jpg",
         name: 'Microwave oven', 
         category: 'Electricals',
          stock: 300, 
          price: 6000, 
          status: 'Medium Stock' 
        },
  ]

  return (
    <div style={styles.container}>

      
      <style>
        {`
          .title {
          text-align: center;
           margin: 25px 0;
          font-size: 30px;
          font-weight: bold;
          color: white;
          background: linear-gradient(90deg, #2563eb, #1e40af);
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
         letter-spacing: 2px;
         text-transform: uppercase;
          }

        .add-product {
        display: inline-block;
        background: #000;
        color: #fff;
        padding: 10px 15px;
        border-radius: 8px;
       cursor: pointer;
       margin-bottom: 15px;
      transition: 0.3s;
      font-weight: bold;
    }

    .add-product:hover {
      background: #333;
      transform: scale(1.05);
    }
        `}
      </style>

      
      <h2 className="title">Product List</h2>

      <h3 className="add-product">
        + Add Product
      </h3>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>

              <td>
                <img src={product.image} alt="" style={styles.image} />
              </td>

              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>₹{product.price}</td>
              <td>{product.status}</td>

              <td>
                <button style={styles.edit}>Edit</button>
                <button style={styles.delete}>Delete</button>
                <button style={styles.view}>View</button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}

const styles = {
  container: {
    background: '#c7bd7c',
    padding: '20px',
    borderRadius: '12px',
    marginTop: '20px',
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },

  image: {
    width: '50px',
    height: '50px',
    borderRadius: '6px'
  },

  edit: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    marginRight: '5px',
    borderRadius: '6px',
    cursor: 'pointer'
  },

  delete: {
    background: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    marginRight: '5px',
    borderRadius: '6px',
    cursor: 'pointer'
  },

  view: {
    background: '#16a34a',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
}

export default ProductTable