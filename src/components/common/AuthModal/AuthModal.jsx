// src/components/common/AuthModal/AuthModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    type: "buyer",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          onClose();
          // Redirect based on user type
          const dashboardPath = getDashboardPath(result.user.type);
          window.location.href = dashboardPath;
        } else {
          setMessage(result.message);
        }
      } else {
        const result = await register(formData);
        setMessage(result.message);
        if (result.success) {
          setIsLogin(true);
          setFormData({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            location: "",
            type: "buyer",
          });
        }
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDashboardPath = (userType) => {
    switch (userType) {
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

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Account Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="buyer">Buyer</option>
                  <option value="farmer">Farmer</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {message && (
            <div
              className={`message ${
                message.includes("successful") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
