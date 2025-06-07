// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/common/Sidebar/Sidebar";
import UserManagement from "../components/admin/UserManagement/UserManagement";
import GalleryManagement from "../components/admin/GalleryManagement/GalleryManagement";
import OfferManagement from "../components/admin/OfferManagement/OfferManagement";
import AdminProfile from "../components/admin/AdminProfile/AdminProfile";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("users");

  // Redirect if not admin
  if (!user || user.type !== "admin") {
    window.location.href = "/";
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />;
      case "gallery":
        return <GalleryManagement />;
      case "offers":
        return <OfferManagement />;
      case "profile":
        return <AdminProfile />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userType="admin"
      />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span className="separator">›</span>
            <span className="current">
              {activeSection === "users" && "User Management"}
              {activeSection === "gallery" && "Gallery Management"}
              {activeSection === "offers" && "Offer Management"}
              {activeSection === "profile" && "Profile"}
            </span>
          </div>
        </div>
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
