// src/components/home/HeroSection/HeroSection.jsx
import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Fresh Farm Products
            <br />
            <span className="hero-subtitle">
              Direct from Sri Lankan Farmers
            </span>
          </h1>
          <p className="hero-description">
            Connect directly with local farmers and get the freshest produce
            delivered to your doorstep. Support local agriculture while enjoying
            organic, high-quality fruits and vegetables.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🌱</span>
              <span>Fresh & Organic</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <span>Direct Delivery</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👨‍🌾</span>
              <span>Support Farmers</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600"
            alt="Sri Lankan Farmer"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
