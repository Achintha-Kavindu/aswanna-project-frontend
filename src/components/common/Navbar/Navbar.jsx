// src/components/common/Navbar/Navbar.jsx
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import AuthModal from "../AuthModal/AuthModal";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const getDashboardPath = () => {
    if (!user) return "/";
    switch (user.type) {
      case "admin":
        return "/admin-dashboard";
      case "farmer":
        return "/farmer-dashboard";
      case "buyer":
        return "/buyer-dashboard";
      default:
        return "/";
    }
  };

  const handleDashboardClick = () => {
    if (user) {
      window.location.href = getDashboardPath();
    } else {
      setShowAuthModal(true);
    }
  };

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={handleHomeClick}>
            <h2>අස්වැන්න</h2>
          </div>

          <div className="navbar-menu">
            {user ? (
              <div className="navbar-user">
                <span className="user-greeting">Hello, {user.firstName}</span>
                <button
                  className="navbar-btn dashboard-btn"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>
                <button className="navbar-btn logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-guest">
                <button
                  className="navbar-btn login-btn"
                  onClick={() => setShowAuthModal(true)}
                >
                  Login
                </button>
                <button
                  className="navbar-btn dashboard-btn"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
