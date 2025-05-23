import React from "react";
import Navbar from "./Navbar";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h1>Welcome to your Dashboard</h1>
        <p>You are logged in 🎉</p>
      </div>
    </div>
  );
}

export default Dashboard;
