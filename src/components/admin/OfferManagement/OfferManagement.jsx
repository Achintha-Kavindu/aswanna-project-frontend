// src/components/admin/OfferManagement/OfferManagement.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Eye, Check, Trash2 } from "lucide-react";
import SearchFilterBar from "../../common/SearchFilterBar/SearchFilterBar";
import "./OfferManagement.css";

const OfferManagement = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [offers, searchTerm, filterStatus]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      console.log("Fetching offers from backend...");

      const response = await api.get("/api/offers/admin/all");
      let offersData = response.data || [];
      console.log("Raw offers API response:", offersData);

      if (!Array.isArray(offersData)) {
        if (offersData && typeof offersData === "object") {
          offersData =
            offersData.offers || offersData.data || offersData.items || [];
        } else {
          offersData = [];
        }
      }

      console.log("Processed offers data:", offersData);
      setOffers(offersData);

      if (offersData.length === 0) {
        setMessage(
          "No offers found. Make sure farmers have created offers and backend is running."
        );
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
      setMessage(
        `Failed to connect to backend server. Error: ${error.message}`
      );
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterOffers = () => {
    if (!Array.isArray(offers)) {
      setFilteredOffers([]);
      return;
    }

    let filtered = [...offers];

    if (searchTerm) {
      filtered = filtered.filter(
        (offer) =>
          offer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((offer) => offer.status === filterStatus);
    }

    setFilteredOffers(filtered);
  };

  const approveOffer = async (itemId) => {
    try {
      console.log("Approving offer:", itemId);
      await api.put(`/api/offers/approve/${itemId}`);
      setMessage("Offer approved successfully!");
      fetchOffers();
    } catch (error) {
      console.error("Error approving offer:", error);
      setMessage(`Failed to approve offer: ${error.message}`);
    }
  };

  // src/components/admin/OfferManagement/OfferManagement.jsx
  // Update the deleteOffer function

  const deleteOffer = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        console.log("Deleting offer:", itemId);

        // FIXED: Use the correct API endpoint
        await api.delete(`/api/offers/delete/${itemId}`);

        setMessage("Offer deleted successfully!");
        fetchOffers();
      } catch (error) {
        console.error("Error deleting offer:", error);
        setMessage(
          `Failed to delete offer: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  const viewOffer = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const filterOptions = [
    { value: "all", label: `All Offers (${offers.length})` },
    {
      value: "pending",
      label: `Pending (${offers.filter((o) => o.status === "pending").length})`,
    },
    {
      value: "approved",
      label: `Approved (${
        offers.filter((o) => o.status === "approved").length
      })`,
    },
  ];

  if (loading) {
    return (
      <div className="offer-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading offers from backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="offer-management">
      <div className="section-header">
        <h2>Offer Management</h2>
        <p>Manage farmer special offers ({offers.length} total offers)</p>
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
        onRefresh={fetchOffers}
        placeholder="Search by offer name, category, or location..."
      />

      <div className="offers-grid">
        {Array.isArray(filteredOffers) && filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <div key={offer._id || offer.id} className="offer-card">
              <div className="offer-image">
                <img
                  src={offer.image}
                  alt={offer.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
                  }}
                />
                <div className={`status-badge ${offer.status}`}>
                  {offer.status?.toUpperCase()}
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
                  {offer.description && offer.description.length > 80
                    ? `${offer.description.substring(0, 80)}...`
                    : offer.description}
                </p>
                {offer.condition &&
                  Array.isArray(offer.condition) &&
                  offer.condition.length > 0 && (
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
                  {offer.harvestDay
                    ? new Date(offer.harvestDay).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>

              <div className="offer-actions">
                <button className="view-btn" onClick={() => viewOffer(offer)}>
                  <Eye size={16} />
                  View
                </button>

                {offer.status === "pending" && (
                  <button
                    className="approve-btn"
                    onClick={() => approveOffer(offer.itemId || offer._id)}
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteOffer(offer.itemId || offer._id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-offers">
            <h3>No offers found</h3>
            <p>
              {offers.length === 0
                ? "No special offers available. Please ensure backend server is running on http://localhost:5000 and farmers have created offers."
                : "No offers match your search criteria"}
            </p>
          </div>
        )}
      </div>

      {/* Modal remains the same */}
    </div>
  );
};

export default OfferManagement;
