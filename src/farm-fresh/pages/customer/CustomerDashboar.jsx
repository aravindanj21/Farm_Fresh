import CustomerNavbar from "./CustomerNavbar";
import CustomerSidebar from "./CustomerSidebar";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  return (
    <div className="customer-dashboard">
      <CustomerNavbar />

      <div className="dashboard-body">
        <CustomerSidebar />

        <main className="dashboard-content">
          <h1>Welcome Customer</h1>
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard;