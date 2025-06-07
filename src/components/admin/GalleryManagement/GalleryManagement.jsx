// src/components/admin/GalleryManagement/GalleryManagement.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Eye, Check, Trash2 } from "lucide-react";
import SearchFilterBar from "../../common/SearchFilterBar/SearchFilterBar";
import "./GalleryManagement.css";

const GalleryManagement = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, filterStatus]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      console.log("Fetching gallery items from backend...");

      const response = await api.get("/api/gallery/admin/items");
      let itemsData = response.data || [];
      console.log("Raw API response:", itemsData);

      if (!Array.isArray(itemsData)) {
        if (itemsData && typeof itemsData === "object") {
          itemsData =
            itemsData.items || itemsData.data || itemsData.galleryItems || [];
        } else {
          itemsData = [];
        }
      }

      console.log("Processed items data:", itemsData);
      setItems(itemsData);

      if (itemsData.length === 0) {
        setMessage(
          "No gallery items found. Make sure farmers have uploaded items and backend is running."
        );
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      setMessage(
        `Failed to connect to backend server. Error: ${error.message}`
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    if (!Array.isArray(items)) {
      setFilteredItems([]);
      return;
    }

    let filtered = [...items];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }

    setFilteredItems(filtered);
  };

  const approveItem = async (itemId) => {
    try {
      console.log("Approving item:", itemId);
      await api.put(`/api/gallery/approve/${itemId}`);
      setMessage("Item approved successfully!");
      fetchItems();
    } catch (error) {
      console.error("Error approving item:", error);
      setMessage(`Failed to approve item: ${error.message}`);
    }
  };

  const deleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        console.log("Deleting item:", itemId);
        await api.delete(`/api/gallery/delete/${itemId}`);
        setMessage("Item deleted successfully!");
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        setMessage(`Failed to delete item: ${error.message}`);
      }
    }
  };

  const viewItem = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const filterOptions = [
    { value: "all", label: `All Items (${items.length})` },
    {
      value: "pending",
      label: `Pending (${items.filter((i) => i.status === "pending").length})`,
    },
    {
      value: "approved",
      label: `Approved (${
        items.filter((i) => i.status === "approved").length
      })`,
    },
  ];

  if (loading) {
    return (
      <div className="gallery-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading gallery items from backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-management">
      <div className="section-header">
        <h2>Gallery Management</h2>
        <p>Manage farmer gallery items ({items.length} total items)</p>
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
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterValue={filterStatus}
        setFilterValue={setFilterStatus}
        filterOptions={filterOptions}
        onRefresh={fetchItems}
        placeholder="Search by name, category, or location..."
      />

      <div className="items-grid">
        {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item._id || item.id} className="item-card">
              <div className="item-image">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
                  }}
                />
                <div className={`status-badge ${item.status}`}>
                  {item.status?.toUpperCase()}
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
                  {item.description && item.description.length > 80
                    ? `${item.description.substring(0, 80)}...`
                    : item.description}
                </p>
                <div className="item-date">
                  <strong>Harvest:</strong>{" "}
                  {item.harvestDay
                    ? new Date(item.harvestDay).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>

              <div className="item-actions">
                <button className="view-btn" onClick={() => viewItem(item)}>
                  <Eye size={16} />
                  View
                </button>

                {item.status === "pending" && (
                  <button
                    className="approve-btn"
                    onClick={() => approveItem(item.itemId || item._id)}
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.itemId || item._id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-items">
            <h3>No items found</h3>
            <p>
              {items.length === 0
                ? "No gallery items available. Please ensure backend server is running on http://localhost:5000 and farmers have uploaded items."
                : "No gallery items match your search criteria"}
            </p>
          </div>
        )}
      </div>

      {/* Modal code remains the same */}
      {showModal && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Gallery Item Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="item-detail-image">
                <img src={selectedItem.image} alt={selectedItem.name} />
              </div>
              <div className="item-details">
                <h4>{selectedItem.name}</h4>
                <div className="detail-row">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">Rs. {selectedItem.price}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{selectedItem.category}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedItem.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Harvest Date:</span>
                  <span className="detail-value">
                    {selectedItem.harvestDay
                      ? new Date(selectedItem.harvestDay).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`detail-value status-${selectedItem.status}`}
                  >
                    {selectedItem.status?.toUpperCase()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Item ID:</span>
                  <span className="detail-value">
                    {selectedItem.itemId || selectedItem._id}
                  </span>
                </div>
                <div className="description-section">
                  <strong>Description:</strong>
                  <p>{selectedItem.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
