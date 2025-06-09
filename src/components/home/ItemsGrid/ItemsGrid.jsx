// src/components/home/ItemsGrid/ItemsGrid.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import {
  User,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  DollarSign,
} from "lucide-react";
import "./ItemsGrid.css";

const ItemsGrid = ({ filters }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  const itemsPerPage = 12;
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

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

  // NEW: Handle farmer details view
  const handleViewFarmer = (item) => {
    if (item.userId) {
      setSelectedFarmer({
        ...item.userId,
        itemName: item.name,
        itemType: item.type,
      });
      setShowFarmerModal(true);
    } else {
      alert("Farmer information not available for this item.");
    }
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

                {/* ENHANCED: Show farmer info preview */}
                {item.userId && (
                  <div className="farmer-preview">
                    <User size={14} />
                    <span>Farmer : {item.owner.name}</span>
                  </div>
                )}
                {item.userId && (
                  <div className="farmer-preview">
                    <User size={14} />
                    <span>Phone : {item.owner.phone}</span>
                  </div>
                )}
                {item.userId && (
                  <div className="farmer-preview">
                    <User size={14} />
                    <span>Location : {item.owner.location}</span>
                  </div>
                )}

                {/* ENHANCED: Updated action buttons */}
                <div className="item-actions">
                  <button
                    className="view-btn"
                    onClick={() => handleViewItem(item)}
                  >
                    <Eye size={16} />
                    View Product
                  </button>

                  {/* NEW: Farmer details button */}
                  {item.userId && (
                    <button
                      className="farmer-btn"
                      onClick={() => handleViewFarmer(item)}
                    >
                      <User size={16} />
                      View Farmer
                    </button>
                  )}
                </div>
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

      {/* EXISTING: Item Details Modal */}
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
                {selectedItem.type === "offer" && (
                  <div className="modal-offer-badge">SPECIAL OFFER</div>
                )}
              </div>

              <div className="modal-details">
                <h4>{selectedItem.name}</h4>
                <p className="modal-price">Rs. {selectedItem.price}</p>

                {/* Product Information */}
                <div className="product-info-section">
                  <h5>Product Information</h5>
                  <div className="detail-item">
                    <Tag size={16} />
                    <strong>Category:</strong> {selectedItem.category}
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <strong>Location:</strong> {selectedItem.location}
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <strong>Harvest Date:</strong>{" "}
                    {selectedItem.harvestDay
                      ? new Date(selectedItem.harvestDay).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <strong>Type:</strong>{" "}
                    {selectedItem.type === "gallery"
                      ? "Gallery Item"
                      : "Special Offer"}
                  </div>
                </div>

                {/* Product Description */}
                <div className="description-section">
                  <h5>Description</h5>
                  <p>{selectedItem.description}</p>
                </div>

                {/* FIXED: Add conditions display for offers */}
                {selectedItem.condition &&
                  Array.isArray(selectedItem.condition) &&
                  selectedItem.condition.length > 0 && (
                    <div className="conditions-section">
                      <h5>Offer Conditions</h5>
                      <ul>
                        {selectedItem.condition.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Quick Farmer Info */}
                {selectedItem.userId && (
                  <div className="quick-farmer-info">
                    <h5>Farmer Information</h5>
                    <div className="farmer-quick-details">
                      <p>
                        <strong>Name:</strong> {selectedItem.userId.firstName}{" "}
                        {selectedItem.userId.lastName}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {selectedItem.userId.location}
                      </p>
                      <button
                        className="view-full-farmer-btn"
                        onClick={() => {
                          setShowModal(false);
                          handleViewFarmer(selectedItem);
                        }}
                      >
                        <User size={16} />
                        View Full Farmer Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Farmer Details Modal */}
      {showFarmerModal && selectedFarmer && (
        <div
          className="farmer-modal-overlay"
          onClick={() => setShowFarmerModal(false)}
        >
          <div className="farmer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header farmer-header">
              <h3>Farmer Details</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowFarmerModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="farmer-profile-section">
                <div className="farmer-avatar">
                  <img
                    src={
                      selectedFarmer.img ||
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    alt={selectedFarmer.firstName}
                    onError={(e) => {
                      e.target.src =
                        "https://www.w3schools.com/howto/img_avatar.png";
                    }}
                  />
                </div>
                <div className="farmer-basic-info">
                  <h4>
                    {selectedFarmer.firstName} {selectedFarmer.lastName}
                  </h4>
                  <p className="farmer-type">Local Farmer</p>
                  <p className="farmer-item-info">
                    Creator of: <strong>{selectedFarmer.itemName}</strong> (
                    {selectedFarmer.itemType})
                  </p>
                </div>
              </div>

              <div className="farmer-details-grid">
                <div className="farmer-detail-item">
                  <Mail size={16} />
                  <div>
                    <strong>Email:</strong>
                    <p>{selectedFarmer.email}</p>
                  </div>
                </div>

                {selectedFarmer.phone && (
                  <div className="farmer-detail-item">
                    <Phone size={16} />
                    <div>
                      <strong>Phone:</strong>
                      <p>{selectedFarmer.phone}</p>
                    </div>
                  </div>
                )}

                <div className="farmer-detail-item">
                  <MapPin size={16} />
                  <div>
                    <strong>Farm Location:</strong>
                    <p>{selectedFarmer.location}</p>
                  </div>
                </div>

                <div className="farmer-detail-item">
                  <Calendar size={16} />
                  <div>
                    <strong>Farmer Since:</strong>
                    <p>
                      {new Date(selectedFarmer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="farmer-contact-actions">
                <h5>Contact This Farmer</h5>
                <div className="contact-buttons">
                  <a
                    href={`mailto:${selectedFarmer.email}?subject=Inquiry about ${selectedFarmer.itemName}`}
                    className="contact-btn email-btn"
                  >
                    <Mail size={16} />
                    Send Email
                  </a>
                  {selectedFarmer.phone && (
                    <a
                      href={`tel:${selectedFarmer.phone}`}
                      className="contact-btn phone-btn"
                    >
                      <Phone size={16} />
                      Call Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsGrid;
