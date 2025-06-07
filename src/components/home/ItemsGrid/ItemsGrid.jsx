// src/components/home/ItemsGrid/ItemsGrid.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import "./ItemsGrid.css";

const ItemsGrid = ({ filters }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 12;
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  // FIXED: Updated fetchItems function
  const fetchItems = async () => {
    try {
      setLoading(true);
      console.log("Fetching items from backend...");

      // FIXED: Use correct API endpoints
      const [galleryResponse, offersResponse] = await Promise.all([
        api.get("/api/gallery/approved"), // Fixed endpoint
        api.get("/api/offers/approved"), // Fixed endpoint
      ]);

      console.log("Gallery API response:", galleryResponse.data);
      console.log("Offers API response:", offersResponse.data);

      // Process gallery items
      let galleryItems = [];
      if (galleryResponse.data && galleryResponse.data.success) {
        galleryItems = galleryResponse.data.data || [];
      }

      // Process offers
      let offerItems = [];
      if (offersResponse.data && offersResponse.data.success) {
        offerItems = offersResponse.data.data || [];
      }

      // Add type identifier to items
      const processedGalleryItems = galleryItems.map((item) => ({
        ...item,
        type: "gallery",
      }));

      const processedOfferItems = offerItems.map((item) => ({
        ...item,
        type: "offer",
      }));

      // Combine and shuffle items
      const allItems = [...processedGalleryItems, ...processedOfferItems];
      const shuffledItems = allItems.sort(() => Math.random() - 0.5);

      console.log(
        `Total items loaded: ${allItems.length} (${galleryItems.length} gallery + ${offerItems.length} offers)`
      );

      setItems(shuffledItems);

      if (allItems.length === 0) {
        setMessage(
          "No approved items available. Please check if farmers have uploaded items and admin has approved them."
        );
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setMessage(`Failed to load items: ${error.message}`);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    return (
      (!filters.name ||
        item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.location || item.location === filters.location) &&
      (!filters.minPrice ||
        parseInt(item.price) >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || parseInt(item.price) <= parseInt(filters.maxPrice))
    );
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(0, currentPage * itemsPerPage);

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="items-loading">
        <div className="loading-spinner"></div>
        <p>Loading fresh products...</p>
      </div>
    );
  }

  return (
    <div className="items-grid-section">
      <div className="items-container">
        <div className="items-header">
          <h3>Available Products ({filteredItems.length})</h3>
        </div>

        {/* FIXED: Add message display */}
        {message && (
          <div className="no-items-message">
            <p>{message}</p>
          </div>
        )}

        <div className="items-grid">
          {currentItems.map((item) => (
            <div key={item._id} className="item-card">
              <div className="item-image-container">
                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
                  }
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
                  }}
                />
                <div className={`item-type-badge ${item.type}`}>
                  {item.type === "gallery" ? "Gallery" : "Special Offer"}
                </div>
              </div>

              <div className="item-content">
                <h4 className="item-name">{item.name}</h4>
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

                <button
                  className="view-btn"
                  onClick={() => handleViewItem(item)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {currentPage * itemsPerPage < filteredItems.length && (
          <div className="load-more-container">
            <button onClick={loadMore} className="load-more-btn">
              Show More ({filteredItems.length - currentItems.length} remaining)
            </button>
          </div>
        )}

        {filteredItems.length === 0 && !message && (
          <div className="no-items">
            <h3>No products found</h3>
            <p>
              Try adjusting your search filters or check back later for new
              products
            </p>
          </div>
        )}
      </div>

      {/* Item Details Modal */}
      {showModal && selectedItem && (
        <div className="item-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="item-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Product Details</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-image">
                <img
                  src={
                    selectedItem.image ||
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
                  }
                  alt={selectedItem.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
                  }}
                />
              </div>

              <div className="modal-details">
                <h4>{selectedItem.name}</h4>
                <p className="modal-price">Rs. {selectedItem.price}</p>

                <div className="detail-item">
                  <strong>Category:</strong> {selectedItem.category}
                </div>
                <div className="detail-item">
                  <strong>Location:</strong> {selectedItem.location}
                </div>
                <div className="detail-item">
                  <strong>Harvest Date:</strong>{" "}
                  {selectedItem.harvestDay
                    ? new Date(selectedItem.harvestDay).toLocaleDateString()
                    : "N/A"}
                </div>
                <div className="detail-item">
                  <strong>Type:</strong>{" "}
                  {selectedItem.type === "gallery"
                    ? "Gallery Item"
                    : "Special Offer"}
                </div>

                <div className="description-section">
                  <strong>Description:</strong>
                  <p>{selectedItem.description}</p>
                </div>

                {/* FIXED: Add conditions display for offers */}
                {selectedItem.condition &&
                  Array.isArray(selectedItem.condition) &&
                  selectedItem.condition.length > 0 && (
                    <div className="conditions-section">
                      <strong>Offer Conditions:</strong>
                      <ul>
                        {selectedItem.condition.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsGrid;
