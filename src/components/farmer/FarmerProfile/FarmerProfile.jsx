// src/components/farmer/FarmerProfile/FarmerProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Leaf,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";
import "./FarmerProfile.css";

const FarmerProfile = () => {
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
  const [stats, setStats] = useState({
    totalGalleryItems: 0,
    approvedGalleryItems: 0,
    pendingGalleryItems: 0,
    totalOffers: 0,
    approvedOffers: 0,
    pendingOffers: 0,
  });

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
      fetchFarmerStats();
    }
  }, [user]);

  const fetchFarmerStats = async () => {
    try {
      const [galleryRes, offersRes] = await Promise.all([
        api.get("/api/gallery/my-items"),
        api.get("/api/offers/my-offers"),
      ]);

      const galleryItems = galleryRes.data.galleryItems || [];
      const offers = offersRes.data.offers || [];

      setStats({
        totalGalleryItems: galleryItems.length,
        approvedGalleryItems: galleryItems.filter(
          (item) => item.status === "approved"
        ).length,
        pendingGalleryItems: galleryItems.filter(
          (item) => item.status === "pending"
        ).length,
        totalOffers: offers.length,
        approvedOffers: offers.filter((offer) => offer.status === "approved")
          .length,
        pendingOffers: offers.filter((offer) => offer.status === "pending")
          .length,
      });
    } catch (error) {
      console.error("Error fetching farmer stats:", error);
    }
  };

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
    <div className="farmer-profile">
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
                  alt="Farmer Avatar"
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
              <div className="farmer-badge">
                <Leaf size={16} />
                <span>Farmer</span>
              </div>
            </div>

            <div className="profile-info">
              <h1>
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="profile-email">{profileData.email}</p>
              <p className="profile-role">Agricultural Producer</p>
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

          {/* Farmer Statistics */}
          <div className="profile-section">
            <h2 className="section-title">My Farm Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon gallery">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalGalleryItems}</div>
                  <div className="stat-label">Total Gallery Items</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon approved">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {stats.approvedGalleryItems}
                  </div>
                  <div className="stat-label">Approved Gallery</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.pendingGalleryItems}</div>
                  <div className="stat-label">Pending Gallery</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon offers">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalOffers}</div>
                  <div className="stat-label">Total Offers</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon approved-offers">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.approvedOffers}</div>
                  <div className="stat-label">Approved Offers</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending-offers">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.pendingOffers}</div>
                  <div className="stat-label">Pending Offers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Farming Information */}
          <div className="profile-section">
            <h2 className="section-title">Farming Information</h2>
            <div className="farming-info">
              <div className="farming-item">
                <Leaf className="farming-icon" size={20} />
                <div className="farming-content">
                  <h4>Organic Farming</h4>
                  <p>Committed to sustainable and organic farming practices</p>
                </div>
              </div>

              <div className="farming-item">
                <Leaf className="farming-icon" size={20} />
                <div className="farming-content">
                  <h4>Fresh Produce</h4>
                  <p>Providing fresh, high-quality agricultural products</p>
                </div>
              </div>

              <div className="farming-item">
                <Leaf className="farming-icon" size={20} />
                <div className="farming-content">
                  <h4>Local Community</h4>
                  <p>Supporting local community with farm-fresh products</p>
                </div>
              </div>

              <div className="farming-item">
                <Leaf className="farming-icon" size={20} />
                <div className="farming-content">
                  <h4>Seasonal Crops</h4>
                  <p>
                    Growing seasonal crops for optimal quality and nutrition
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
