// src/components/buyer/BuyerProfile/BuyerProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  ShoppingBag,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";
import "./BuyerProfile.css";

const BuyerProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    img: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        img: user.img || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.put(`/api/users/${user.id}`, profileData);

      setMessage("Profile updated successfully!");
      setIsEditing(false);

      // Update local storage
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      img: user.img || "",
    });
    setIsEditing(false);
    setMessage("");
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="buyer-profile">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img
                  src={
                    profileData.img ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  alt="Buyer Avatar"
                />
                {isEditing && (
                  <div className="avatar-overlay">
                    <label
                      htmlFor="avatar-upload"
                      className="avatar-upload-btn"
                    >
                      <Camera size={20} />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div className="buyer-badge">
                <ShoppingBag size={16} />
                <span>Buyer</span>
              </div>
            </div>

            <div className="profile-info">
              <h1>
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="profile-email">{profileData.email}</p>
              <p className="profile-role">Product Buyer</p>
            </div>

            <div className="profile-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <Edit size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <Save size={16} />
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="profile-content">
          {/* Personal Information */}
          <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <User className="info-icon" size={18} />
                  First Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.firstName}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <User className="info-icon" size={18} />
                  Last Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.lastName}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Mail className="info-icon" size={18} />
                  Email
                </div>
                <div className="info-value">{profileData.email}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Phone className="info-icon" size={18} />
                  Phone
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="info-input"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="info-value">
                    {profileData.phone || "Not provided"}
                  </div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <MapPin className="info-icon" size={18} />
                  Location
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.location}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Calendar className="info-icon" size={18} />
                  Member Since
                </div>
                <div className="info-value">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Information */}
          <div className="profile-section">
            <h2 className="section-title">Buyer Information</h2>
            <div className="buyer-info">
              <div className="buyer-item">
                <ShoppingBag className="buyer-icon" size={20} />
                <div className="buyer-content">
                  <h4>Fresh Products</h4>
                  <p>
                    Access to fresh, organic products directly from local
                    farmers
                  </p>
                </div>
              </div>

              <div className="buyer-item">
                <ShoppingBag className="buyer-icon" size={20} />
                <div className="buyer-content">
                  <h4>Quality Assurance</h4>
                  <p>
                    All products are verified and approved by our quality team
                  </p>
                </div>
              </div>

              <div className="buyer-item">
                <ShoppingBag className="buyer-icon" size={20} />
                <div className="buyer-content">
                  <h4>Direct Connection</h4>
                  <p>
                    Connect directly with farmers for the best prices and
                    freshness
                  </p>
                </div>
              </div>

              <div className="buyer-item">
                <ShoppingBag className="buyer-icon" size={20} />
                <div className="buyer-content">
                  <h4>Support Local</h4>
                  <p>
                    Support local farmers and contribute to sustainable
                    agriculture
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Tips */}
          <div className="profile-section">
            <h2 className="section-title">Shopping Tips</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <h4>🌱 Seasonal Shopping</h4>
                <p>
                  Buy seasonal products for the best quality and prices. Check
                  our seasonal guide for optimal harvest times.
                </p>
              </div>

              <div className="tip-card">
                <h4>📍 Local Sourcing</h4>
                <p>
                  Choose products from your local area to reduce transportation
                  time and support nearby farmers.
                </p>
              </div>

              <div className="tip-card">
                <h4>🏷️ Special Offers</h4>
                <p>
                  Keep an eye on special offers from farmers for bulk purchases
                  and promotional deals.
                </p>
              </div>

              <div className="tip-card">
                <h4>📞 Direct Contact</h4>
                <p>
                  Contact farmers directly for custom orders, bulk purchases, or
                  specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
