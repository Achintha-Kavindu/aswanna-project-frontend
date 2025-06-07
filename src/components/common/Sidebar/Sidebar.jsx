// src/components/common/Sidebar/Sidebar.jsx
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  ArrowLeft,
  User,
  Users,
  Image,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ activeSection, setActiveSection, userType }) => {
  const { user, logout } = useAuth();

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const getMenuItems = () => {
    switch (userType) {
      case "admin":
        return [
          { id: "users", label: "User Management", icon: Users },
          { id: "gallery", label: "Gallery Management", icon: Image },
          { id: "offers", label: "Offer Management", icon: ShoppingBag },
          { id: "profile", label: "Profile", icon: User },
        ];
      case "farmer":
        return [
          { id: "profile", label: "Profile", icon: User },
          { id: "gallery", label: "Gallery Items", icon: Image },
          { id: "offers", label: "Offer Items", icon: ShoppingBag },
        ];
      case "buyer":
        return [{ id: "profile", label: "Profile", icon: User }];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>
          {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
        </h2>
        <div className="user-info">
          <div className="user-avatar">
            <img
              src={
                user?.img || "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt={user?.firstName}
            />
          </div>
          <span className="user-name">
            {user?.firstName} {user?.lastName}
          </span>
        </div>

        <button className="back-to-home-btn" onClick={handleBackToHome}>
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button className="logout-btn" onClick={logout}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
