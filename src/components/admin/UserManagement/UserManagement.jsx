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
      await api.put(`/api/users/approve/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
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
              <img src={user.img} alt={user.firstName} />
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
            </div>

            <div className="user-actions">
              <button className="view-btn" onClick={() => viewUser(user)}>
                <Eye size={16} />
                View
              </button>

              {!user.emailVerified && (
                <button
                  className="approve-btn"
                  onClick={() => approveUser(user._id)}
                >
                  <Check size={16} />
                  Approve
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteUser(user._id)}
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

      {/* Modal remains the same */}
    </div>
  );
};

export default UserManagement;
