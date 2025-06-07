// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main App Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/farmer-dashboard"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buyer-dashboard"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Root App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
