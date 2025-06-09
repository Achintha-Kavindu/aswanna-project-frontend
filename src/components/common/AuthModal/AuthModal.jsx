// src/components/common/AuthModal/AuthModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { uploadImage } from "../../../utils/supabaseClient";
import { Camera, X } from "lucide-react";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    type: "buyer",
    img: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 20 * 1024 * 1024) {
        setMessage("Image size should be less than 20MB");
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setMessage("Only JPEG, PNG, and WebP images are allowed");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setMessage(""); // Clear any previous error messages
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, img: "" }));
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
        let imageUrl = "";

        // Upload image to Supabase if file is selected
        if (imageFile) {
          setUploading(true);
          setMessage("Uploading profile image...");

          try {
            const uploadResult = await uploadImage(imageFile, "profiles");
            imageUrl = uploadResult.url;
            setMessage("Profile image uploaded successfully!");
          } catch (uploadError) {
            console.error("Image upload failed:", uploadError);
            setMessage(
              "Image upload failed, but registration will continue without image."
            );
          }

          setUploading(false);
        }

        // Create registration data
        const registrationData = {
          ...formData,
          ...(imageUrl && { img: imageUrl }),
        };

        const result = await register(registrationData);
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
            img: "",
          });
          setImageFile(null);
          setImagePreview(null);
        }
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setUploading(false);
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
              {/* Profile Image Upload Section */}
              <div className="profile-image-section">
                <label className="profile-image-label">
                  Profile Picture (Optional)
                </label>
                <div className="profile-image-upload">
                  {imagePreview ? (
                    <div className="profile-image-preview">
                      <img src={imagePreview} alt="Profile Preview" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="remove-profile-image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="profile-image-placeholder">
                      <Camera size={32} />
                      <p>Add Profile Picture</p>
                    </div>
                  )}
                  <label
                    htmlFor="profile-image-input"
                    className="profile-upload-btn"
                  >
                    <Camera size={16} />
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="profile-image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
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
                  <label>Location *</label>
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
                <label>Account Type *</label>
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
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
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

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading || uploading}
          >
            {uploading
              ? "Uploading Image..."
              : loading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Sign Up"}
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
