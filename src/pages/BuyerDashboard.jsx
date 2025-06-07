// src/pages/BuyerDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/common/Sidebar/Sidebar";
import BuyerProfile from "../components/buyer/BuyerProfile/BuyerProfile";
import "./BuyerDashboard.css";

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");

  // Redirect if not buyer
  if (!user || user.type !== "buyer") {
    window.location.href = "/";
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <BuyerProfile />;
      default:
        return <BuyerProfile />;
    }
  };

  return (
    <div className="buyer-dashboard">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userType="buyer"
      />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Buyer Dashboard</h1>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span className="separator">›</span>
            <span className="current">
              {activeSection === "profile" && "Profile"}
            </span>
          </div>
        </div>
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
