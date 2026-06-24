import React, { useState } from "react";
import { submitVerification } from "../services/verificationService";

const SupplierVerification = () => {
  const [form, setForm] = useState({
    business_name: "",
    owner_name: "",
    mobile_number: "",
    email: "",
    business_address: "",
    gst_number: "",
    pan_number: "",
  });

  const [files, setFiles] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

   
    formData.append("supplier_id", localStorage.getItem("user_id"));

   
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    
    Object.keys(files).forEach((key) => {
      formData.append(key, files[key]);
    });

    try {
      const response = await submitVerification(formData);

      console.log(response);
      alert("Verification Submitted Successfully");

     
      setForm({
        business_name: "",
        owner_name: "",
        mobile_number: "",
        email: "",
        business_address: "",
        gst_number: "",
        pan_number: "",
      });

      setFiles({});

    } catch (err) {
      console.error(err.response?.data || err);
      alert("Submission Failed");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
    },

    card: {
      width: "100%",
      maxWidth: "750px",
      background: "#ffffff",
      borderRadius: "20px",
      padding: "35px",
      boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    },

    title: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#1e293b",
      fontSize: "30px",
      fontWeight: "700",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },

    input: {
      width: "100%",
      padding: "14px",
      border: "1px solid #d1d5db",
      borderRadius: "10px",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
    },

    textarea: {
      width: "100%",
      minHeight: "100px",
      padding: "14px",
      border: "1px solid #d1d5db",
      borderRadius: "10px",
      fontSize: "15px",
      resize: "vertical",
      outline: "none",
      boxSizing: "border-box",
    },

    label: {
      fontWeight: "600",
      color: "#334155",
      marginTop: "5px",
    },

    fileInput: {
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "10px",
      background: "#f8fafc",
      cursor: "pointer",
    },

    button: {
      marginTop: "15px",
      background: "#4f46e5",
      color: "#fff",
      padding: "15px",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Supplier Verification</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="business_name"
            placeholder="Business Name"
            value={form.business_name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="owner_name"
            placeholder="Owner Name"
            value={form.owner_name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="mobile_number"
            placeholder="Mobile Number"
            value={form.mobile_number}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="business_address"
            placeholder="Business Address"
            value={form.business_address}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <input
            type="text"
            name="gst_number"
            placeholder="GST Number"
            value={form.gst_number}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="pan_number"
            placeholder="PAN Number"
            value={form.pan_number}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Business License</label>
          <input
            type="file"
            name="business_license"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />

          <label style={styles.label}>GST Certificate</label>
          <input
            type="file"
            name="gst_certificate"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />

          <label style={styles.label}>ID Proof</label>
          <input
            type="file"
            name="id_proof"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />

          <button type="submit" style={styles.button}>
            Submit Verification
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierVerification;