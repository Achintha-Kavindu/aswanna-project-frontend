// src/components/common/Sidebar/Sidebar.jsx
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Home,
  User,
  Users,
  Image,
  Gift,
  LogOut,
  Settings,
  ShoppingBag,
  Shield,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ activeSection, setActiveSection, userType }) => {
  const { user, logout } = useAuth();

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const getMenuItems = () => {
    switch (userType || user?.type) {
      case "admin":
        return [
          { id: "profile", label: "Profile", icon: User },
          { id: "users", label: "User Management", icon: Users },
          { id: "gallery", label: "Gallery Management", icon: Image },
          { id: "offers", label: "Offer Management", icon: Gift },
        ];
      case "farmer":
        return [
          { id: "profile", label: "Profile", icon: User },
          { id: "gallery", label: "My Gallery", icon: Image },
          { id: "offers", label: "My Offers", icon: Gift },
        ];
      case "buyer":
        return [
          { id: "profile", label: "Profile", icon: User },
          { id: "orders", label: "My Orders", icon: ShoppingBag },
          { id: "favorites", label: "Favorites", icon: Settings },
        ];
      default:
        return [];
    }
  };

  const getUserTypeIcon = () => {
    switch (userType || user?.type) {
      case "admin":
        return <Shield size={16} />;
      case "farmer":
        return <Image size={16} />;
      case "buyer":
        return <ShoppingBag size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getUserTypeBadge = () => {
    switch (userType || user?.type) {
      case "admin":
        return "Administrator";
      case "farmer":
        return "Farmer";
      case "buyer":
        return "Buyer";
      default:
        return "User";
    }
  };

  if (!user) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>අස්වැන්න Dashboard</h2>

        <div className="user-info">
          <div className="user-avatar">
            <img
              src={user.img || "https://www.w3schools.com/howto/img_avatar.png"}
              alt="User Avatar"
            />
          </div>
          <div className="user-details">
            <div className="user-name">
              {user.firstName} {user.lastName}
            </div>
            <div className="user-type-badge">
              {getUserTypeIcon()}
              <span>{getUserTypeBadge()}</span>
            </div>
          </div>
        </div>

        <button className="back-to-home-btn" onClick={handleBackToHome}>
          <Home size={16} />
          Back to Home
        </button>
      </div>

      <nav className="sidebar-nav">
        {getMenuItems().map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <IconComponent size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button className="logout-btn" onClick={logout}>
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
