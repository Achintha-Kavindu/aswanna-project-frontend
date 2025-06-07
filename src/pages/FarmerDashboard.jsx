// src/pages/FarmerDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/common/Sidebar/Sidebar";
import FarmerProfile from "../components/farmer/FarmerProfile/FarmerProfile";
import FarmerGallery from "../components/farmer/FarmerGallery/FarmerGallery";
import FarmerOffers from "../components/farmer/FarmerOffers/FarmerOffers";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");

  // Redirect if not farmer
  if (!user || user.type !== "farmer") {
    window.location.href = "/";
    return null;
  }

  // Check if farmer is approved
  if (!user.emailVerified) {
    return (
      <div className="farmer-dashboard">
        <div className="approval-pending">
          <div className="approval-content">
            <div className="approval-icon">⏳</div>
            <h2>Account Pending Approval</h2>
            <p>
              Your farmer account is currently under review by our
              administrators. You will be able to access your dashboard and
              upload items once your account is approved.
            </p>
            <div className="approval-info">
              <h3>What happens next?</h3>
              <ul>
                <li>Our team will review your registration details</li>
                <li>You'll receive an email notification once approved</li>
                <li>After approval, you can start uploading your products</li>
              </ul>
            </div>
            <button
              className="back-home-btn"
              onClick={() => (window.location.href = "/")}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <FarmerProfile />;
      case "gallery":
        return <FarmerGallery />;
      case "offers":
        return <FarmerOffers />;
      default:
        return <FarmerProfile />;
    }
  };

  return (
    <div className="farmer-dashboard">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userType="farmer"
      />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Farmer Dashboard</h1>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span className="separator">›</span>
            <span className="current">
              {activeSection === "profile" && "Profile"}
              {activeSection === "gallery" && "Gallery Items"}
              {activeSection === "offers" && "Special Offers"}
            </span>
          </div>
        </div>
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
