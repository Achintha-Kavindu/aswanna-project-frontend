// src/components/admin/UserManagement/UserManagement.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Eye, Check, Trash2 } from "lucide-react";
import SearchFilterBar from "../../common/SearchFilterBar/SearchFilterBar";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterType]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((user) => user.type === filterType);
    }

    setFilteredUsers(filtered);
  };

  const approveUser = async (userId) => {
    try {
      console.log("Approving user:", userId);

      const response = await api.put(`/api/users/approve/${userId}`);

      if (response.data.success) {
        setMessage("User approved successfully!");
        fetchUsers();
      } else {
        setMessage("Failed to approve user");
      }
    } catch (error) {
      console.error("Error approving user:", error);
      setMessage(
        `Failed to approve user: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/users/${userId}`);
        setMessage("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        setMessage("Failed to delete user");
      }
    }
  };

  const viewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filterOptions = [
    { value: "all", label: `All Users (${users.length})` },
    {
      value: "farmer",
      label: `Farmers (${users.filter((u) => u.type === "farmer").length})`,
    },
    {
      value: "buyer",
      label: `Buyers (${users.filter((u) => u.type === "buyer").length})`,
    },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>User Management</h2>
        <p>Manage farmers and buyers registration</p>
      </div>

      {/* FIXED: Add message display */}
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
        filterValue={filterType}
        setFilterValue={setFilterType}
        filterOptions={filterOptions}
        onRefresh={fetchUsers}
        placeholder="Search by name or email..."
      />

      <div className="users-grid">
        {filteredUsers.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-avatar">
              <img
                src={user.img || "https://via.placeholder.com/150"}
                alt={user.firstName}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>

            <div className="user-info">
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <p className="user-email">{user.email}</p>
              <div className="user-meta">
                <span className={`user-type ${user.type}`}>
                  {user.type.toUpperCase()}
                </span>
                <span className="user-location">{user.location}</span>
              </div>
              {user.phone && <p className="user-phone">{user.phone}</p>}

              {/* FIXED: Add approval status display */}
              <div className="approval-status">
                <span
                  className={`status-badge ${
                    user.approvalStatus ||
                    (user.emailVerified ? "approved" : "pending")
                  }`}
                >
                  {user.approvalStatus ||
                    (user.emailVerified ? "Approved" : "Pending")}
                </span>
              </div>
            </div>

            <div className="user-actions">
              <button className="view-btn" onClick={() => viewUser(user)}>
                <Eye size={16} />
                View
              </button>

              {/* FIXED: Better approval status check */}
              {(!user.emailVerified || user.approvalStatus === "pending") && (
                <button
                  className="approve-btn"
                  onClick={() => approveUser(user._id)}
                  disabled={loading}
                >
                  <Check size={16} />
                  Approve
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteUser(user._id)}
                disabled={loading}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-users">
          <h3>No users found</h3>
          <p>No users match your search criteria</p>
        </div>
      )}

      {/* FIXED: Complete User Detail Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-detail-image">
                <img
                  src={selectedUser.img || "https://via.placeholder.com/150"}
                  alt={selectedUser.firstName}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
              <div className="user-detail-info">
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedUser.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{selectedUser.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedUser.location}</span>
                </div>
                {selectedUser.phone && (
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{selectedUser.phone}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`detail-value status-${
                      selectedUser.approvalStatus ||
                      (selectedUser.emailVerified ? "approved" : "pending")
                    }`}
                  >
                    {selectedUser.approvalStatus ||
                      (selectedUser.emailVerified ? "Approved" : "Pending")}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Joined:</span>
                  <span className="detail-value">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">User ID:</span>
                  <span className="detail-value">{selectedUser._id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
