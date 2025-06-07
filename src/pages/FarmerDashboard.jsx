// src/pages/FarmerDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/common/Sidebar/Sidebar";
import FarmerProfile from "../components/farmer/FarmerProfile/FarmerProfile";
import FarmerGallery from "../components/farmer/FarmerGallery/FarmerGallery";
import FarmerOffers from "../components/farmer/FarmerOffers/FarmerOffers";
import api from "../utils/api";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  // Gallery item create function
  const handleCreateGalleryItem = async (formData) => {
    try {
      setLoading(true);
      setMessage("");

      // Image field optional කරන්න
      const galleryData = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        harvestDay: formData.harvestDay,
        // Image optional - only include if provided
        ...(formData.image && { image: formData.image }),
      };

      console.log("Creating gallery item:", galleryData);

      const response = await api.post("/api/gallery/create", galleryData);

      setMessage("Gallery item created successfully!");

      // Refresh gallery items if needed
      if (window.refreshGalleryItems) {
        window.refreshGalleryItems();
      }
    } catch (error) {
      console.error("Error creating gallery item:", error);
      setMessage(
        error.response?.data?.message || "Failed to create gallery item"
      );
    } finally {
      setLoading(false);
    }
  };

  // Offer create function
  const handleCreateOffer = async (formData) => {
    try {
      setLoading(true);
      setMessage("");

      // Image field optional කරන්න
      const offerData = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        harvestDay: formData.harvestDay,
        condition: formData.conditions || [], // if applicable
        // Image optional - only include if provided
        ...(formData.image && { image: formData.image }),
      };

      console.log("Creating offer:", offerData);

      const response = await api.post("/api/offers", offerData);

      setMessage("Offer created successfully!");

      // Refresh offers if needed
      if (window.refreshOffers) {
        window.refreshOffers();
      }
    } catch (error) {
      console.error("Error creating offer:", error);
      setMessage(error.response?.data?.message || "Failed to create offer");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <FarmerProfile />;
      case "gallery":
        return (
          <FarmerGallery
            onCreateItem={handleCreateGalleryItem}
            loading={loading}
            message={message}
            setMessage={setMessage}
          />
        );
      case "offers":
        return (
          <FarmerOffers
            onCreateOffer={handleCreateOffer}
            loading={loading}
            message={message}
            setMessage={setMessage}
          />
        );
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
