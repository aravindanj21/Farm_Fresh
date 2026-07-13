function FeaturedProducts() {
  return (
    <section
      className="product-section"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/19/17/92/50/360_F_1917925060_TQ14kazFJrbFps4o7Me63SNh4yjSyUog.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.45)",
          padding: "40px",
          borderRadius: "12px",
          width: "80%",
          maxWidth: "700px",
        }}
      >
        <h2 style={{ fontSize: "36px", marginBottom: "15px" }}>
          Featured Products
        </h2>

        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Fresh farm products delivered directly to your doorstep.
        </p>

        <button
          style={{
            padding: "12px 30px",
            backgroundColor: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default FeaturedProducts;