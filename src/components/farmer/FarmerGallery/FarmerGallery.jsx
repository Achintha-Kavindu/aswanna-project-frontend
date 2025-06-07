// src/components/farmer/FarmerGallery/FarmerGallery.jsx
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
} from "lucide-react";
import "./FarmerGallery.css";

const FarmerGallery = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
  });

  const categories = [
    "vegetables",
    "fruits",
    "grains",
    "herbs",
    "dairy",
    "seeds",
  ];

  useEffect(() => {
    fetchMyItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, filterStatus]);

  const fetchMyItems = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/gallery/my-items");
      setItems(response.data.galleryItems || []);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      setMessage("Failed to fetch gallery items");
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }

    setFilteredItems(filtered);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
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
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/api/gallery/create", formData);
      setMessage(
        "Gallery item created successfully! Waiting for admin approval."
      );
      setShowCreateModal(false);
      resetForm();
      fetchMyItems();
    } catch (error) {
      setMessage("Failed to create gallery item. Please try again.");
      console.error("Create error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/api/gallery/update/${selectedItem.itemId}`, formData);
      setMessage(
        "Gallery item updated successfully! Waiting for admin approval."
      );
      setShowEditModal(false);
      resetForm();
      fetchMyItems();
    } catch (error) {
      setMessage("Failed to update gallery item. Please try again.");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/api/gallery/my-items/${itemId}`);
        setMessage("Gallery item deleted successfully!");
        fetchMyItems();
      } catch (error) {
        setMessage("Failed to delete gallery item. Please try again.");
        console.error("Delete error:", error);
      }
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      image: item.image,
      price: item.price,
      category: item.category,
      location: item.location,
      description: item.description,
      harvestDay: item.harvestDay ? item.harvestDay.split("T")[0] : "",
    });
    setShowEditModal(true);
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  if (loading && items.length === 0) {
    return (
      <div className="farmer-gallery">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading gallery items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="farmer-gallery">
      <div className="gallery-header">
        <div className="header-content">
          <h2>My Gallery Items</h2>
          <p>Manage your agricultural products</p>
        </div>
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          <Plus size={20} />
          Add New Item
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
                placeholder="Search by name, category, or location..."
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
                <option value="all">All Items ({items.length})</option>
                <option value="pending">
                  Pending ({items.filter((i) => i.status === "pending").length})
                </option>
                <option value="approved">
                  Approved (
                  {items.filter((i) => i.status === "approved").length})
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
            onClick={fetchMyItems}
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

      {/* Items Grid */}
      <div className="items-grid">
        {filteredItems.map((item) => (
          <div key={item._id} className="item-card">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
              <div className={`status-badge ${item.status}`}>
                {item.status.toUpperCase()}
              </div>
            </div>

            <div className="item-content">
              <h3>{item.name}</h3>
              <p className="item-price">Rs. {item.price}</p>
              <div className="item-meta">
                <span className="item-category">{item.category}</span>
                <span className="item-location">{item.location}</span>
              </div>
              <p className="item-description">
                {item.description.length > 80
                  ? `${item.description.substring(0, 80)}...`
                  : item.description}
              </p>
              <div className="item-date">
                <strong>Harvest:</strong>{" "}
                {new Date(item.harvestDay).toLocaleDateString()}
              </div>
            </div>

            <div className="item-actions">
              <button className="view-btn" onClick={() => openViewModal(item)}>
                <Eye size={16} />
                View
              </button>

              <button className="edit-btn" onClick={() => openEditModal(item)}>
                <Edit size={16} />
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item.itemId)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          <h3>No gallery items found</h3>
          <p>
            {items.length === 0
              ? "Create your first gallery item to get started!"
              : "No gallery items match your search criteria"}
          </p>
          {items.length === 0 && (
            <button
              className="create-first-btn"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={20} />
              Create First Item
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Gallery Item</h3>
              <button
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price (Rs.)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
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

                <div className="form-group">
                  <label>Harvest Date</label>
                  <input
                    type="date"
                    name="harvestDay"
                    value={formData.harvestDay}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Creating..." : "Create Item"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Gallery Item</h3>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEdit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price (Rs.)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
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

                <div className="form-group">
                  <label>Harvest Date</label>
                  <input
                    type="date"
                    name="harvestDay"
                    value={formData.harvestDay}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <small>Leave empty to keep current image</small>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Updating..." : "Update Item"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div
            className="modal-content view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Gallery Item Details</h3>
              <button
                className="close-btn"
                onClick={() => setShowViewModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="view-content">
              <div className="view-image">
                <img src={selectedItem.image} alt={selectedItem.name} />
                <div className={`status-badge ${selectedItem.status}`}>
                  {selectedItem.status.toUpperCase()}
                </div>
              </div>

              <div className="view-details">
                <h4>{selectedItem.name}</h4>

                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Price</span>
                    <span className="detail-value">
                      Rs. {selectedItem.price}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Category</span>
                    <span className="detail-value">
                      {selectedItem.category}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">
                      {selectedItem.location}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Harvest Date</span>
                    <span className="detail-value">
                      {new Date(selectedItem.harvestDay).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="description-section">
                  <h5>Description</h5>
                  <p>{selectedItem.description}</p>
                </div>

                <div className="item-id-section">
                  <strong>Item ID:</strong> {selectedItem.itemId}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerGallery;
