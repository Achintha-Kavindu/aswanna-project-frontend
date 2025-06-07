// src/components/common/SearchFilterBar/SearchFilterBar.jsx
import React from "react";
import { Search, Filter, X, RefreshCw } from "lucide-react";
import "./SearchFilterBar.css";

const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  filterValue,
  setFilterValue,
  filterOptions,
  onRefresh,
  placeholder = "Search...",
  showRefresh = true,
  customFilters = [],
}) => {
  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilter = () => {
    setFilterValue("all");
  };

  return (
    <div className="search-filter-bar">
      <div className="search-filter-container">
        {/* Enhanced Search Bar */}
        <div className="enhanced-search-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder={placeholder}
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
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="filter-select"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {filterValue !== "all" && (
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

        {/* Custom Filters */}
        {customFilters.length > 0 && (
          <div className="custom-filters">
            {customFilters.map((filter, index) => (
              <div key={index} className="custom-filter">
                {filter}
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        {showRefresh && (
          <button
            className="refresh-btn"
            onClick={onRefresh}
            aria-label="Refresh data"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || filterValue !== "all") && (
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
          {filterValue !== "all" && (
            <div className="filter-tag">
              <span>
                Status:{" "}
                {filterOptions.find((opt) => opt.value === filterValue)?.label}
              </span>
              <button onClick={clearFilter}>
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
