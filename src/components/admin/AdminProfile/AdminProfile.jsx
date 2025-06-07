// src/components/admin/AdminProfile/AdminProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";
import "./AdminProfile.css";

const AdminProfile = () => {
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
    totalUsers: 0,
    totalFarmers: 0,
    totalBuyers: 0,
    pendingApprovals: 0,
    totalGalleryItems: 0,
    totalOffers: 0,
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
      fetchAdminStats();
    }
  }, [user]);

  const fetchAdminStats = async () => {
    try {
      const [usersRes, galleryRes, offersRes] = await Promise.all([
        api.get("/api/users"),
        api.get("/api/gallery/admin/items"),
        api.get("/api/offers/admin/all"),
      ]);

      const users = usersRes.data.users || [];
      const galleryItems = galleryRes.data || [];
      const offers = offersRes.data || [];

      setStats({
        totalUsers: users.length,
        totalFarmers: users.filter((u) => u.type === "farmer").length,
        totalBuyers: users.filter((u) => u.type === "buyer").length,
        pendingApprovals: users.filter((u) => !u.emailVerified).length,
        totalGalleryItems: galleryItems.length,
        totalOffers: offers.length,
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
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
    <div className="admin-profile">
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
                  alt="Admin Avatar"
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
              <div className="admin-badge">
                <Shield size={16} />
                <span>Administrator</span>
              </div>
            </div>

            <div className="profile-info">
              <h1>
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="profile-email">{profileData.email}</p>
              <p className="profile-role">System Administrator</p>
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

          {/* Admin Statistics */}
          <div className="profile-section">
            <h2 className="section-title">System Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users">
                  <User size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalUsers}</div>
                  <div className="stat-label">Total Users</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon farmers">
                  <User size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalFarmers}</div>
                  <div className="stat-label">Farmers</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon buyers">
                  <User size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalBuyers}</div>
                  <div className="stat-label">Buyers</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending">
                  <Calendar size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.pendingApprovals}</div>
                  <div className="stat-label">Pending Approvals</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon gallery">
                  <Calendar size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalGalleryItems}</div>
                  <div className="stat-label">Gallery Items</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon offers">
                  <Calendar size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalOffers}</div>
                  <div className="stat-label">Special Offers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Privileges */}
          <div className="profile-section">
            <h2 className="section-title">Administrator Privileges</h2>
            <div className="privileges-grid">
              <div className="privilege-item">
                <Shield className="privilege-icon" size={20} />
                <div className="privilege-content">
                  <h4>User Management</h4>
                  <p>Approve, manage, and delete user accounts</p>
                </div>
              </div>

              <div className="privilege-item">
                <Shield className="privilege-icon" size={20} />
                <div className="privilege-content">
                  <h4>Content Moderation</h4>
                  <p>Review and approve gallery items and offers</p>
                </div>
              </div>

              <div className="privilege-item">
                <Shield className="privilege-icon" size={20} />
                <div className="privilege-content">
                  <h4>System Analytics</h4>
                  <p>Access to system statistics and reports</p>
                </div>
              </div>

              <div className="privilege-item">
                <Shield className="privilege-icon" size={20} />
                <div className="privilege-content">
                  <h4>Platform Control</h4>
                  <p>Full administrative control over the platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
