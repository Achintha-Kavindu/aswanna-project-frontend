// src/components/farmer/FarmerOffers/FarmerOffers.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  RefreshCw,
  AlertCircle,
  Save,
  Camera,
  Gift,
  Percent,
  Tag,
  DollarSign,
  Grid,
  MapPin,
  Calendar,
  FileText,
  Star,
  Clock,
  Truck,
  Award,
} from "lucide-react";
import "./FarmerOffers.css";

const FarmerOffers = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    location: "",
    description: "",
    harvestDay: "",
    condition: [],
  });

  const [newCondition, setNewCondition] = useState("");

  const categories = [
    "vegetables",
    "fruits",
    "grains",
    "herbs",
    "dairy",
    "seeds",
  ];

  const defaultImage =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";

  useEffect(() => {
    fetchMyOffers();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [offers, searchTerm, filterStatus]);

  const fetchMyOffers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/offers/my-offers");
      setOffers(response.data.offers || []);
    } catch (error) {
      console.error("Error fetching offers:", error);
      setMessage("Failed to fetch offers");
    } finally {
      setLoading(false);
    }
  };

  const filterOffers = () => {
    let filtered = offers;

    if (searchTerm) {
      filtered = filtered.filter(
        (offer) =>
          offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((offer) => offer.status === filterStatus);
    }

    setFilteredOffers(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilter = () => {
    setFilterStatus("all");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setMessage("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // Clear image if no file selected
      setFormData((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setFormData((prev) => ({
        ...prev,
        condition: [...prev.condition, newCondition.trim()],
      }));
      setNewCondition("");
    }
  };

  const removeCondition = (index) => {
    setFormData((prev) => ({
      ...prev,
      condition: prev.condition.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      price: "",
      category: "",
      location: "",
      description: "",
      harvestDay: "",
      condition: [],
    });
    setNewCondition("");
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Required fields validation (image නැතිව)
    const { name, price, category, location, description, harvestDay } =
      formData;

    if (
      !name ||
      !price ||
      !category ||
      !location ||
      !description ||
      !harvestDay
    ) {
      setMessage("Please fill in all required fields (image is optional)");
      return;
    }

    try {
      setLoading(true);

      // Create form data object - image is optional
      const submitData = {
        name,
        price,
        category,
        location,
        description,
        harvestDay,
        condition: formData.condition,
        // Only include image if provided
        ...(formData.image && { image: formData.image }),
      };

      await api.post("/api/offers", submitData);
      setMessage(
        "Special offer created successfully! Waiting for admin approval."
      );
      setShowCreateModal(false);
      resetForm();
      fetchMyOffers();
    } catch (error) {
      setMessage("Failed to create offer. Please try again.");
      console.error("Create error:", error);
    } finally {
      setLoading(false);
    }
  };

  // FarmerOffers.jsx එකේ handleEdit function
  const handleEdit = async (e) => {
    e.preventDefault();

    // Required fields validation (image නැතිව)
    const { name, price, category, location, description, harvestDay } =
      formData;

    if (
      !name ||
      !price ||
      !category ||
      !location ||
      !description ||
      !harvestDay
    ) {
      setMessage("Please fill in all required fields (image is optional)");
      return;
    }

    try {
      setLoading(true);

      // Create form data object - image is optional
      const submitData = {
        name,
        price,
        category,
        location,
        description,
        harvestDay,
        condition: formData.condition,
        // Only include image if provided
        ...(formData.image && { image: formData.image }),
      };

      console.log("Updating offer:", selectedOffer.itemId, submitData);

      // Make sure using correct API endpoint with itemId
      const response = await api.put(
        `/api/offers/update/${selectedOffer.itemId}`,
        submitData
      );

      if (response.data.success) {
        setMessage("Offer updated successfully! Waiting for admin approval.");
        setShowEditModal(false);
        resetForm();
        fetchMyOffers();
      } else {
        setMessage("Failed to update offer");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage(error.response?.data?.message || "Failed to update offer");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await api.delete(`/api/offers/my-offers/${itemId}`);
        setMessage("Offer deleted successfully!");
        fetchMyOffers();
      } catch (error) {
        setMessage("Failed to delete offer. Please try again.");
        console.error("Delete error:", error);
      }
    }
  };

  const openEditModal = (offer) => {
    setSelectedOffer(offer);
    setFormData({
      name: offer.name,
      image: offer.image,
      price: offer.price,
      category: offer.category,
      location: offer.location,
      description: offer.description,
      harvestDay: offer.harvestDay ? offer.harvestDay.split("T")[0] : "",
      condition: offer.condition || [],
    });
    setShowEditModal(true);
  };

  const openViewModal = (offer) => {
    setSelectedOffer(offer);
    setShowViewModal(true);
  };

  if (loading && offers.length === 0) {
    return (
      <div className="farmer-offers">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="farmer-offers">
      <div className="offers-header">
        <div className="header-content">
          <h2>My Special Offers</h2>
          <p>Manage your special promotional offers</p>
        </div>
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          <Plus size={20} />
          Create New Offer
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
          <button onClick={() => setMessage("")} className="message-close">
            ×
          </button>
        </div>
      )}

      {/* Enhanced Search & Filter */}
      <div className="search-filter-bar">
        <div className="search-filter-container">
          {/* Enhanced Search Bar */}
          <div className="enhanced-search-bar">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search by offer name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Filter Bar */}
          <div className="enhanced-filter-bar">
            <div className="filter-wrapper">
              <Filter className="filter-icon" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Offers ({offers.length})</option>
                <option value="pending">
                  Pending ({offers.filter((o) => o.status === "pending").length}
                  )
                </option>
                <option value="approved">
                  Approved (
                  {offers.filter((o) => o.status === "approved").length})
                </option>
              </select>
              {filterStatus !== "all" && (
                <button
                  className="clear-filter-btn"
                  onClick={clearFilter}
                  aria-label="Clear filter"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Refresh Button */}
          <button
            className="refresh-btn"
            onClick={fetchMyOffers}
            aria-label="Refresh data"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || filterStatus !== "all") && (
          <div className="active-filters">
            <span className="active-filters-label">Active filters:</span>
            {searchTerm && (
              <div className="filter-tag">
                <span>Search: "{searchTerm}"</span>
                <button onClick={clearSearch}>
                  <X size={12} />
                </button>
              </div>
            )}
            {filterStatus !== "all" && (
              <div className="filter-tag">
                <span>Status: {filterStatus}</span>
                <button onClick={clearFilter}>
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Offers Grid */}
      <div className="offers-grid">
        {filteredOffers.map((offer) => (
          <div key={offer._id} className="offer-card">
            <div className="offer-image">
              <img
                src={offer.image || defaultImage}
                alt={offer.name}
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
              <div className={`status-badge ${offer.status}`}>
                {offer.status.toUpperCase()}
              </div>
              <div className="offer-badge">SPECIAL OFFER</div>
            </div>

            <div className="offer-content">
              <h3>{offer.name}</h3>
              <p className="offer-price">Rs. {offer.price}</p>
              <div className="offer-meta">
                <span className="offer-category">{offer.category}</span>
                <span className="offer-location">{offer.location}</span>
              </div>
              <p className="offer-description">
                {offer.description.length > 80
                  ? `${offer.description.substring(0, 80)}...`
                  : offer.description}
              </p>
              {offer.condition && offer.condition.length > 0 && (
                <div className="offer-conditions">
                  <strong>Conditions:</strong>
                  <ul>
                    {offer.condition.slice(0, 2).map((cond, index) => (
                      <li key={index}>{cond}</li>
                    ))}
                    {offer.condition.length > 2 && (
                      <li>+{offer.condition.length - 2} more...</li>
                    )}
                  </ul>
                </div>
              )}
              <div className="offer-date">
                <strong>Harvest:</strong>{" "}
                {new Date(offer.harvestDay).toLocaleDateString()}
              </div>
            </div>

            <div className="offer-actions">
              <button className="view-btn" onClick={() => openViewModal(offer)}>
                <Eye size={16} />
                View
              </button>

              <button className="edit-btn" onClick={() => openEditModal(offer)}>
                <Edit size={16} />
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(offer.itemId)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="no-offers">
          <h3>No special offers found</h3>
          <p>
            {offers.length === 0
              ? "Create your first special offer to attract more customers!"
              : "No offers match your search criteria"}
          </p>
          {offers.length === 0 && (
            <button
              className="create-first-btn"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={20} />
              Create First Offer
            </button>
          )}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="modal-content create-modal offer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header offer-header">
              <div className="header-content">
                <div className="header-icon offer-icon">
                  <Gift size={24} />
                </div>
                <div>
                  <h3>Create Special Offer</h3>
                  <p>Create an attractive offer for your products</p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={handleCreate}
              className="enhanced-modal-form offer-form"
            >
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div className="image-preview offer-preview">
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" />
                      <div className="offer-overlay">
                        <div className="offer-badge-preview">SPECIAL OFFER</div>
                      </div>
                    </>
                  ) : (
                    <div className="image-placeholder">
                      <Camera size={48} />
                      <p>Upload Offer Image (Optional)</p>
                      <span>Make it attractive!</span>
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <label
                    htmlFor="offer-image-upload"
                    className="upload-btn offer-upload"
                  >
                    <Camera size={20} />
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    // Remove required attribute
                    style={{ display: "none" }}
                  />
                  <small className="form-help">
                    Optional: High-quality images get more attention!
                  </small>
                </div>
              </div>

              {/* Form Fields */}
              <div className="form-sections">
                {/* Offer Details */}
                <div className="form-section">
                  <h4 className="section-title offer-title">
                    <Percent size={20} />
                    Offer Details
                  </h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <Tag size={16} />
                        Offer Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Weekend Special - Fresh Mangoes"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <DollarSign size={16} />
                        Special Price (Rs.) *
                      </label>
                      <div className="price-input-wrapper">
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="200"
                          min="1"
                          required
                        />
                        <span className="price-label">per KG</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <Grid size={16} />
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <MapPin size={16} />
                        Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Galle, Sri Lanka"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Calendar size={16} />
                        Harvest Date *
                      </label>
                      <input
                        type="date"
                        name="harvestDay"
                        value={formData.harvestDay}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Offer Description */}
                <div className="form-section">
                  <h4 className="section-title">
                    <FileText size={20} />
                    Offer Description
                  </h4>
                  <div className="form-group full-width">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Describe what makes this offer special, discount details, quality, etc..."
                      required
                    />
                    <div className="char-count">
                      {formData.description.length}/500 characters
                    </div>
                  </div>
                </div>

                {/* Special Conditions */}
                <div className="form-section">
                  <h4 className="section-title">
                    <AlertCircle size={20} />
                    Terms & Conditions (Optional)
                  </h4>

                  <div className="conditions-input-section">
                    <div className="condition-input-wrapper">
                      <input
                        type="text"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        placeholder="e.g., Minimum 5kg order, Valid for 7 days"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addCondition())
                        }
                      />
                      <button
                        type="button"
                        onClick={addCondition}
                        className="add-condition-btn"
                        disabled={!newCondition.trim()}
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>

                    {formData.condition.length > 0 && (
                      <div className="conditions-list">
                        <h5>Added Conditions:</h5>
                        {formData.condition.map((cond, index) => (
                          <div key={index} className="condition-tag">
                            <span>{cond}</span>
                            <button
                              type="button"
                              onClick={() => removeCondition(index)}
                              className="remove-condition"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Offer Highlights */}
                <div className="form-section">
                  <h4 className="section-title">
                    <Star size={20} />
                    Offer Highlights
                  </h4>
                  <div className="offer-highlights">
                    <div className="highlight-item">
                      <Percent size={16} />
                      <span>Special Discount</span>
                    </div>
                    <div className="highlight-item">
                      <Clock size={16} />
                      <span>Limited Time</span>
                    </div>
                    <div className="highlight-item">
                      <Truck size={16} />
                      <span>Fresh Delivery</span>
                    </div>
                    <div className="highlight-item">
                      <Award size={16} />
                      <span>Premium Quality</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions offer-actions">
                <button
                  type="submit"
                  className="submit-btn offer-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Creating Offer...
                    </>
                  ) : (
                    <>
                      <Gift size={16} />
                      Create Special Offer
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div
            className="modal-content create-modal offer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header offer-header">
              <div className="header-content">
                <div className="header-icon offer-icon">
                  <Edit size={24} />
                </div>
                <div>
                  <h3>Edit Special Offer</h3>
                  <p>Update your offer details</p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={handleEdit}
              className="enhanced-modal-form offer-form"
            >
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div className="image-preview offer-preview">
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" />
                      <div className="offer-overlay">
                        <div className="offer-badge-preview">SPECIAL OFFER</div>
                      </div>
                    </>
                  ) : (
                    <div className="image-placeholder">
                      <Camera size={48} />
                      <p>Upload Offer Image (Optional)</p>
                      <span>Leave empty to keep current image</span>
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <label
                    htmlFor="edit-offer-image-upload"
                    className="upload-btn offer-upload"
                  >
                    <Camera size={20} />
                    Change Image
                  </label>
                  <input
                    id="edit-offer-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <small>Optional: Leave empty to keep current image</small>
                </div>
              </div>

              {/* Same form sections as create modal */}
              <div className="form-sections">
                <div className="form-section">
                  <h4 className="section-title offer-title">
                    <Percent size={20} />
                    Offer Details
                  </h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <Tag size={16} />
                        Offer Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <DollarSign size={16} />
                        Special Price (Rs.) *
                      </label>
                      <div className="price-input-wrapper">
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          min="1"
                          required
                        />
                        <span className="price-label">per KG</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <Grid size={16} />
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <MapPin size={16} />
                        Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Calendar size={16} />
                        Harvest Date *
                      </label>
                      <input
                        type="date"
                        name="harvestDay"
                        value={formData.harvestDay}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">
                    <FileText size={20} />
                    Offer Description
                  </h4>
                  <div className="form-group full-width">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      required
                    />
                    <div className="char-count">
                      {formData.description.length}/500 characters
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">
                    <AlertCircle size={20} />
                    Terms & Conditions (Optional)
                  </h4>

                  <div className="conditions-input-section">
                    <div className="condition-input-wrapper">
                      <input
                        type="text"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        placeholder="e.g., Minimum 5kg order, Valid for 7 days"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addCondition())
                        }
                      />
                      <button
                        type="button"
                        onClick={addCondition}
                        className="add-condition-btn"
                        disabled={!newCondition.trim()}
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>

                    {formData.condition.length > 0 && (
                      <div className="conditions-list">
                        <h5>Added Conditions:</h5>
                        {formData.condition.map((cond, index) => (
                          <div key={index} className="condition-tag">
                            <span>{cond}</span>
                            <button
                              type="button"
                              onClick={() => removeCondition(index)}
                              className="remove-condition"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-actions offer-actions">
                <button
                  type="submit"
                  className="submit-btn offer-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Updating Offer...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Update Special Offer
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedOffer && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div
            className="modal-content view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Special Offer Details</h3>
              <button
                className="close-btn"
                onClick={() => setShowViewModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="view-content">
              <div className="view-image">
                <img
                  src={selectedOffer.image || defaultImage}
                  alt={selectedOffer.name}
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
                <div className={`status-badge ${selectedOffer.status}`}>
                  {selectedOffer.status.toUpperCase()}
                </div>
                <div className="offer-badge">SPECIAL OFFER</div>
              </div>

              <div className="view-details">
                <h4>{selectedOffer.name}</h4>

                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Price</span>
                    <span className="detail-value">
                      Rs. {selectedOffer.price}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Category</span>
                    <span className="detail-value">
                      {selectedOffer.category}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">
                      {selectedOffer.location}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Harvest Date</span>
                    <span className="detail-value">
                      {new Date(selectedOffer.harvestDay).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="description-section">
                  <h5>Description</h5>
                  <p>{selectedOffer.description}</p>
                </div>

                {selectedOffer.condition &&
                  selectedOffer.condition.length > 0 && (
                    <div className="conditions-section">
                      <h5>Special Conditions</h5>
                      <ul className="conditions-view-list">
                        {selectedOffer.condition.map((cond, index) => (
                          <li key={index}>
                            <AlertCircle size={14} />
                            {cond}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                <div className="offer-id-section">
                  <strong>Offer ID:</strong> {selectedOffer.itemId}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerOffers;
