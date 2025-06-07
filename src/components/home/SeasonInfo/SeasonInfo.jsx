// src/components/home/SeasonInfo/SeasonInfo.jsx
import React from "react";
import { Calendar, Thermometer, Droplets, Sun } from "lucide-react";
import "./SeasonInfo.css";

const SeasonInfo = () => {
  const seasons = [
    {
      id: 1,
      season: "Yala Season",
      period: "April - September",
      description: "Main cultivation season with southwest monsoon",
      crops: ["Rice", "Vegetables", "Fruits"],
      icon: <Droplets className="season-icon" />,
      color: "#3498db",
    },
    {
      id: 2,
      season: "Maha Season",
      period: "October - March",
      description: "Secondary season with northeast monsoon",
      crops: ["Rice", "Coconut", "Spices"],
      icon: <Calendar className="season-icon" />,
      color: "#e74c3c",
    },
    {
      id: 3,
      season: "Dry Season",
      period: "January - April",
      description: "Best time for root vegetables and fruits",
      crops: ["Carrots", "Beetroot", "Mangoes"],
      icon: <Sun className="season-icon" />,
      color: "#f39c12",
    },
    {
      id: 4,
      season: "Wet Season",
      period: "May - September",
      description: "Ideal for leafy vegetables and herbs",
      crops: ["Spinach", "Kale", "Herbs"],
      icon: <Thermometer className="season-icon" />,
      color: "#27ae60",
    },
  ];

  return (
    <section className="season-info-section">
      <div className="season-container">
        <div className="season-header">
          <h2>Sri Lankan Harvest Seasons</h2>
          <p>
            Understanding our agricultural calendar for the freshest produce
          </p>
        </div>

        <div className="seasons-grid">
          {seasons.map((season) => (
            <div
              key={season.id}
              className="season-card"
              style={{ "--season-color": season.color }}
            >
              <div className="season-card-header">
                <div className="season-icon-container">{season.icon}</div>
                <div className="season-info">
                  <h3>{season.season}</h3>
                  <p className="season-period">{season.period}</p>
                </div>
              </div>

              <p className="season-description">{season.description}</p>

              <div className="season-crops">
                <h4>Main Crops:</h4>
                <div className="crops-list">
                  {season.crops.map((crop, index) => (
                    <span key={index} className="crop-tag">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="season-tips">
          <div className="tips-content">
            <h3>🌱 Seasonal Tips</h3>
            <div className="tips-grid">
              <div className="tip-item">
                <strong>Best Quality:</strong> Shop seasonal produce for maximum
                freshness and flavor
              </div>
              <div className="tip-item">
                <strong>Lower Prices:</strong> Seasonal items are more
                affordable during peak harvest
              </div>
              <div className="tip-item">
                <strong>Support Local:</strong> Buying seasonal helps support
                Sri Lankan farmers
              </div>
              <div className="tip-item">
                <strong>Nutrition:</strong> Seasonal produce retains more
                nutrients and vitamins
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonInfo;
