// src/components/home/SearchFilter/SearchFilter.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import "./SearchFilter.css";

const SearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const categories = [
    "vegetables",
    "fruits",
    "grains",
    "herbs",
    "dairy",
    "seeds",
  ];
  const locations = [
    "Colombo",
    "Kandy",
    "Galle",
    "Matara",
    "Kurunegala",
    "Anuradhapura",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      name: "",
      category: "",
      location: "",
      minPrice: "",
      maxPrice: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="search-filter-section">
      <div className="search-filter-container">
        <h2 className="section-title">Find Fresh Products</h2>

        <div className="search-bar">
          <input
            type="text"
            name="name"
            placeholder="Search by product name..."
            value={filters.name}
            onChange={handleInputChange}
            className="search-input"
          />
        </div>

        <div className="filter-bar">
          <div className="filter-group">
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <div className="price-filter">
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={handleInputChange}
                className="price-input"
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={handleInputChange}
                className="price-input"
              />
            </div>

            <button onClick={clearFilters} className="clear-btn">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
