// src/components/home/SeasonInfo/SeasonInfo.jsx
import React, { useState } from "react";
import {
  Calendar,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  X,
  MapPin,
  Clock,
  TrendingUp,
  Leaf,
  Package,
  Refrigerator,
  Timer,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import "./SeasonInfo.css";

const SeasonInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState(null);

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 12 || month <= 2) return "winter";
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    return "autumn";
  };

  const storageGuidelines = {
    vegetables: {
      name: "Vegetables Storage",
      sinhala: "එළවළු ගබඩා කිරීම",
      icon: <Leaf size={40} />,
      color: "#27ae60",
      description:
        "Proper storage methods for fresh vegetables to maintain quality and extend shelf life",
      items: [
        {
          name: "Leafy Greens",
          sinhala: "කොළ එළවළු",
          storage: "Refrigerator",
          temperature: "0-4°C",
          humidity: "95-100%",
          duration: "3-7 days",
          method: "Wrap in damp paper towel, store in perforated plastic bag",
          tips: [
            "Remove damaged leaves before storage",
            "Don't wash before storing",
            "Store away from ethylene-producing fruits",
          ],
        },
        {
          name: "Root Vegetables",
          sinhala: "මූල එළවළු",
          storage: "Cool, dark place",
          temperature: "10-15°C",
          humidity: "85-95%",
          duration: "2-4 weeks",
          method: "Store in ventilated containers, remove soil",
          tips: [
            "Cut off green tops",
            "Store in sand or peat moss for longer storage",
            "Check regularly and remove spoiled ones",
          ],
        },
        {
          name: "Tomatoes",
          sinhala: "තක්කාලි",
          storage: "Room temperature",
          temperature: "18-21°C",
          humidity: "85-90%",
          duration: "3-5 days",
          method: "Store stem-side down, away from direct sunlight",
          tips: [
            "Refrigerate only when fully ripe",
            "Store separately from other vegetables",
            "Use paper bags to ripen faster",
          ],
        },
        {
          name: "Onions & Garlic",
          sinhala: "ලූණු සහ සුදුලූණු",
          storage: "Cool, dry place",
          temperature: "15-18°C",
          humidity: "65-70%",
          duration: "2-6 months",
          method: "Store in mesh bags or braided, good ventilation",
          tips: [
            "Keep away from potatoes",
            "Store in dark, well-ventilated area",
            "Don't store in plastic bags",
          ],
        },
      ],
    },
    fruits: {
      name: "Fruits Storage",
      sinhala: "පලතුරු ගබඩා කිරීම",
      icon: <Package size={40} />,
      color: "#e74c3c",
      description:
        "Best practices for storing different types of fruits to maintain freshness",
      items: [
        {
          name: "Citrus Fruits",
          sinhala: "සිට්‍රස් පලතුරු",
          storage: "Refrigerator",
          temperature: "4-10°C",
          humidity: "85-90%",
          duration: "2-4 weeks",
          method: "Store in crisper drawer, in perforated bags",
          tips: [
            "Don't store in plastic bags",
            "Keep away from strong-smelling foods",
            "Store at room temperature for better flavor",
          ],
        },
        {
          name: "Bananas",
          sinhala: "කෙසෙල්",
          storage: "Room temperature",
          temperature: "18-20°C",
          humidity: "85-90%",
          duration: "3-7 days",
          method: "Hang or place in fruit bowl, separate from other fruits",
          tips: [
            "Wrap stems in plastic wrap",
            "Separate bananas to slow ripening",
            "Refrigerate only when fully ripe",
          ],
        },
        {
          name: "Apples",
          sinhala: "ඇපල්",
          storage: "Refrigerator",
          temperature: "0-4°C",
          humidity: "90-95%",
          duration: "1-2 months",
          method: "Store in crisper drawer, in perforated plastic bags",
          tips: [
            "Store away from other fruits",
            "Check regularly and remove spoiled ones",
            "Can be stored at room temperature for 1 week",
          ],
        },
        {
          name: "Mangoes",
          sinhala: "අඹ",
          storage: "Room temperature until ripe",
          temperature: "18-21°C",
          humidity: "85-90%",
          duration: "3-5 days ripe",
          method: "Ripen at room temperature, then refrigerate",
          tips: [
            "Ripen in paper bag to speed up process",
            "Refrigerate only when soft and fragrant",
            "Store cut mangoes in refrigerator",
          ],
        },
      ],
    },
    grains: {
      name: "Grains & Cereals Storage",
      sinhala: "ධාන්‍ය ගබඩා කිරීම",
      icon: <Shield size={40} />,
      color: "#f39c12",
      description: "Long-term storage solutions for grains and cereals",
      items: [
        {
          name: "Rice",
          sinhala: "සහල්",
          storage: "Cool, dry place",
          temperature: "10-15°C",
          humidity: "12-14%",
          duration: "6-12 months",
          method: "Store in airtight containers, add bay leaves",
          tips: [
            "Use airtight containers to prevent pests",
            "Add dried neem leaves as natural pesticide",
            "Store in cool, dark place",
          ],
        },
        {
          name: "Wheat",
          sinhala: "තිරිඟු",
          storage: "Cool, dry place",
          temperature: "10-15°C",
          humidity: "12-14%",
          duration: "8-12 months",
          method: "Store in sealed containers with oxygen absorbers",
          tips: [
            "Freeze for 48 hours before storage to kill insects",
            "Use food-grade buckets with tight lids",
            "Label with storage date",
          ],
        },
        {
          name: "Lentils & Pulses",
          sinhala: "පරිප්පු",
          storage: "Cool, dry place",
          temperature: "10-15°C",
          humidity: "10-12%",
          duration: "12-24 months",
          method: "Store in airtight jars with tight-fitting lids",
          tips: [
            "Sort and remove damaged pieces before storage",
            "Use glass jars or food-grade plastic containers",
            "Check regularly for signs of insects",
          ],
        },
      ],
    },
    herbs: {
      name: "Herbs & Spices Storage",
      sinhala: "ගම්මිරිස් ගබඩා කිරීම",
      icon: <Leaf size={40} />,
      color: "#9b59b6",
      description: "Preserving the flavor and potency of herbs and spices",
      items: [
        {
          name: "Fresh Herbs",
          sinhala: "නැවුම් ගම්මිරිස්",
          storage: "Refrigerator",
          temperature: "0-4°C",
          humidity: "95-100%",
          duration: "1-2 weeks",
          method: "Store like flowers in water, cover with plastic bag",
          tips: [
            "Trim stems and place in water",
            "Change water every 2-3 days",
            "Some herbs store better at room temperature",
          ],
        },
        {
          name: "Dried Spices",
          sinhala: "වියලි ගම්මිරිස්",
          storage: "Cool, dark place",
          temperature: "15-20°C",
          humidity: "50-60%",
          duration: "1-3 years",
          method: "Store in airtight containers away from light",
          tips: [
            "Use dark glass jars or opaque containers",
            "Label with purchase/expiry dates",
            "Grind whole spices just before use",
          ],
        },
        {
          name: "Chili Peppers",
          sinhala: "මිරිස්",
          storage: "Cool, dry place",
          temperature: "10-15°C",
          humidity: "60-70%",
          duration: "2-3 weeks fresh",
          method: "String and hang to dry, or freeze whole",
          tips: [
            "Dry thoroughly before storage",
            "Store dried chilies in airtight containers",
            "Freeze fresh chilies for long-term storage",
          ],
        },
      ],
    },
  };

  const seasons = {
    winter: {
      name: "Winter Season",
      sinhala: "ශීත කාලය",
      months: "December - February",
      icon: <Cloud size={40} />,
      color: "#3498db",
      temperature: "20°C - 28°C",
      rainfall: "Low to Moderate",
      humidity: "60% - 75%",
      description: "Cool and dry season with pleasant weather conditions",
      crops: [
        {
          name: "Tomatoes",
          sinhala: "තක්කාලි",
          season: "Peak harvest",
          price: "Rs. 150-200/kg",
          regions: ["Nuwara Eliya", "Badulla", "Kandy"],
          storage: "Room temperature, stem-side down",
        },
        {
          name: "Carrots",
          sinhala: "කැරට්",
          season: "Best quality",
          price: "Rs. 120-180/kg",
          regions: ["Nuwara Eliya", "Bandarawela"],
          storage: "Refrigerator, remove green tops",
        },
        {
          name: "Cabbage",
          sinhala: "ගෝවා",
          season: "Peak harvest",
          price: "Rs. 80-120/kg",
          regions: ["Nuwara Eliya", "Welimada"],
          storage: "Refrigerator, whole head lasts longer",
        },
        {
          name: "Potatoes",
          sinhala: "අල",
          season: "Fresh harvest",
          price: "Rs. 100-150/kg",
          regions: ["Nuwara Eliya", "Badulla"],
          storage: "Cool, dark place, away from onions",
        },
      ],
      tips: [
        "Best time for highland vegetable cultivation",
        "Ideal weather for leafy greens",
        "Good season for root vegetables",
        "Perfect for cool-season crops",
      ],
      weatherPattern:
        "Cool, dry northeast monsoon period with minimal rainfall",
    },
    spring: {
      name: "Spring Season",
      sinhala: "වසන්ත කාලය",
      months: "March - May",
      icon: <Sun size={40} />,
      color: "#f39c12",
      temperature: "25°C - 32°C",
      rainfall: "Moderate",
      humidity: "65% - 80%",
      description:
        "Warm season with increasing temperatures and occasional showers",
      crops: [
        {
          name: "Mangoes",
          sinhala: "අඹ",
          season: "Peak season",
          price: "Rs. 200-400/kg",
          regions: ["Jaffna", "Anuradhapura", "Kurunegala"],
          storage: "Room temperature until ripe, then refrigerate",
        },
        {
          name: "Watermelon",
          sinhala: "කොමඩු",
          season: "Best quality",
          price: "Rs. 80-120/kg",
          regions: ["Hambantota", "Monaragala"],
          storage: "Room temperature, refrigerate after cutting",
        },
        {
          name: "Pineapple",
          sinhala: "අන්නාසි",
          season: "Sweet variety",
          price: "Rs. 150-250/piece",
          regions: ["Gampaha", "Kurunegala"],
          storage: "Room temperature, upside down to distribute sugars",
        },
        {
          name: "Green Beans",
          sinhala: "බෝංචි",
          season: "Fresh harvest",
          price: "Rs. 180-250/kg",
          regions: ["Kandy", "Matale"],
          storage: "Refrigerator in perforated plastic bag",
        },
      ],
      tips: [
        "Great season for tropical fruits",
        "Ideal for summer vegetables",
        "Good time for irrigation crops",
        "Perfect for fruit tree cultivation",
      ],
      weatherPattern: "Inter-monsoon period with hot, humid conditions",
    },
    summer: {
      name: "Summer Season",
      sinhala: "ග්‍රීෂ්ම කාලය",
      months: "June - August",
      icon: <CloudRain size={40} />,
      color: "#27ae60",
      temperature: "24°C - 30°C",
      rainfall: "High",
      humidity: "75% - 90%",
      description:
        "Monsoon season with heavy rainfall and lush green landscapes",
      crops: [
        {
          name: "Rice",
          sinhala: "සහල්",
          season: "Yala season",
          price: "Rs. 120-180/kg",
          regions: ["Polonnaruwa", "Anuradhapura", "Ampara"],
          storage: "Cool, dry place in airtight containers",
        },
        {
          name: "Coconut",
          sinhala: "පොල්",
          season: "Peak harvest",
          price: "Rs. 80-120/piece",
          regions: ["Gampaha", "Kalutara", "Puttalam"],
          storage: "Room temperature, refrigerate coconut water",
        },
        {
          name: "Banana",
          sinhala: "කෙසෙල්",
          season: "Year-round",
          price: "Rs. 150-200/dozen",
          regions: ["Kegalle", "Ratnapura"],
          storage: "Room temperature, separate to slow ripening",
        },
        {
          name: "Papaya",
          sinhala: "පැපොල්",
          season: "Abundant",
          price: "Rs. 100-150/kg",
          regions: ["Puttalam", "Hambantota"],
          storage: "Room temperature until ripe, then refrigerate",
        },
      ],
      tips: [
        "Southwest monsoon brings abundant water",
        "Perfect for rice cultivation",
        "Ideal for water-loving crops",
        "Good season for coconut and spices",
      ],
      weatherPattern:
        "Southwest monsoon with heavy rainfall and cooler temperatures",
    },
    autumn: {
      name: "Autumn Season",
      sinhala: "සරත් කාලය",
      months: "September - November",
      icon: <Wind size={40} />,
      color: "#e67e22",
      temperature: "23°C - 29°C",
      rainfall: "Moderate to High",
      humidity: "70% - 85%",
      description:
        "Post-monsoon season with retreating rains and pleasant weather",
      crops: [
        {
          name: "Onions",
          sinhala: "ලූණු",
          season: "Maha season prep",
          price: "Rs. 200-300/kg",
          regions: ["Anuradhapura", "Polonnaruwa"],
          storage: "Cool, dry place with good ventilation",
        },
        {
          name: "Chili",
          sinhala: "මිරිස්",
          season: "Peak harvest",
          price: "Rs. 400-600/kg",
          regions: ["Matale", "Kurunegala"],
          storage: "Dry thoroughly, store in airtight containers",
        },
        {
          name: "Eggplant",
          sinhala: "වම්බටු",
          season: "Good quality",
          price: "Rs. 120-180/kg",
          regions: ["Kandy", "Matale"],
          storage: "Room temperature, use within few days",
        },
        {
          name: "Okra",
          sinhala: "බණ්ඩක්කා",
          season: "Fresh harvest",
          price: "Rs. 150-220/kg",
          regions: ["Kurunegala", "Puttalam"],
          storage: "Refrigerator in paper bag, use quickly",
        },
      ],
      tips: [
        "Preparation time for Maha season",
        "Good for spice cultivation",
        "Ideal for vegetable farming",
        "Perfect for land preparation",
      ],
      weatherPattern: "Second inter-monsoon with decreasing rainfall",
    },
  };

  const currentSeason = getCurrentSeason();
  const currentSeasonData = seasons[currentSeason];

  const openSeasonModal = (seasonKey) => {
    setSelectedSeason(seasons[seasonKey]);
    setShowModal(true);
  };

  const openStorageModal = (storageKey) => {
    setSelectedStorage(storageGuidelines[storageKey]);
    setShowStorageModal(true);
  };

  return (
    <div className="season-info">
      <div className="season-container">
        <div className="season-header">
          <h2>Sri Lankan Agricultural Seasons & Storage Guide</h2>
          <p>
            Discover the best crops for each season and learn proper storage
            techniques
          </p>
        </div>

        <div className="current-season-highlight">
          <div
            className="current-season-card"
            onClick={() => openSeasonModal(currentSeason)}
          >
            <div
              className="season-icon"
              style={{ color: currentSeasonData.color }}
            >
              {currentSeasonData.icon}
            </div>
            <div className="season-content">
              <h3>Current Season</h3>
              <h4>{currentSeasonData.name}</h4>
              <p className="season-sinhala">{currentSeasonData.sinhala}</p>
              <p className="season-months">{currentSeasonData.months}</p>
              <div className="season-stats">
                <div className="stat">
                  <Thermometer size={16} />
                  <span>{currentSeasonData.temperature}</span>
                </div>
                <div className="stat">
                  <Droplets size={16} />
                  <span>{currentSeasonData.rainfall}</span>
                </div>
              </div>
            </div>
            <div className="click-indicator">
              <span>Click for details</span>
            </div>
          </div>
        </div>

        <div className="seasons-grid">
          {Object.entries(seasons).map(([key, season]) => (
            <div
              key={key}
              className={`season-card ${key === currentSeason ? "active" : ""}`}
              onClick={() => openSeasonModal(key)}
            >
              <div className="season-icon" style={{ color: season.color }}>
                {season.icon}
              </div>
              <h4>{season.name}</h4>
              <p className="season-sinhala">{season.sinhala}</p>
              <p className="season-months">{season.months}</p>
              <div className="season-preview">
                <span>{season.crops.length} crops in season</span>
              </div>
            </div>
          ))}
        </div>

        {/* Storage Guidelines Section */}
        <div className="storage-guidelines-section">
          <div className="storage-header">
            <h2>Storage Guidelines</h2>
            <p>
              Learn proper storage techniques to keep your produce fresh longer
            </p>
          </div>

          <div className="storage-grid">
            {Object.entries(storageGuidelines).map(([key, storage]) => (
              <div
                key={key}
                className="storage-card"
                onClick={() => openStorageModal(key)}
              >
                <div className="storage-icon" style={{ color: storage.color }}>
                  {storage.icon}
                </div>
                <h4>{storage.name}</h4>
                <p className="storage-sinhala">{storage.sinhala}</p>
                <p className="storage-description">{storage.description}</p>
                <div className="storage-preview">
                  <span>{storage.items.length} storage methods</span>
                </div>
                <div className="click-indicator">
                  <span>Click for details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Season Modal */}
      {showModal && selectedSeason && (
        <div
          className="season-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="season-modal" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-header"
              style={{
                background: `linear-gradient(135deg, ${selectedSeason.color}, ${selectedSeason.color}dd)`,
              }}
            >
              <div className="header-content">
                <div className="header-icon">{selectedSeason.icon}</div>
                <div>
                  <h3>{selectedSeason.name}</h3>
                  <p className="season-sinhala">{selectedSeason.sinhala}</p>
                  <p className="season-months">{selectedSeason.months}</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-content">
              <div className="weather-section">
                <h4>
                  <Cloud size={20} />
                  Weather Conditions
                </h4>
                <div className="weather-grid">
                  <div className="weather-item">
                    <Thermometer size={18} />
                    <div>
                      <span className="label">Temperature</span>
                      <span className="value">
                        {selectedSeason.temperature}
                      </span>
                    </div>
                  </div>
                  <div className="weather-item">
                    <CloudRain size={18} />
                    <div>
                      <span className="label">Rainfall</span>
                      <span className="value">{selectedSeason.rainfall}</span>
                    </div>
                  </div>
                  <div className="weather-item">
                    <Droplets size={18} />
                    <div>
                      <span className="label">Humidity</span>
                      <span className="value">{selectedSeason.humidity}</span>
                    </div>
                  </div>
                </div>
                <p className="weather-description">
                  {selectedSeason.weatherPattern}
                </p>
              </div>

              <div className="crops-section">
                <h4>
                  <Leaf size={20} />
                  Seasonal Crops & Storage Tips
                </h4>
                <div className="crops-grid">
                  {selectedSeason.crops.map((crop, index) => (
                    <div key={index} className="crop-card">
                      <div className="crop-header">
                        <h5>{crop.name}</h5>
                        <span className="crop-sinhala">{crop.sinhala}</span>
                      </div>
                      <div className="crop-details">
                        <div className="crop-info">
                          <Clock size={14} />
                          <span>{crop.season}</span>
                        </div>
                        <div className="crop-info">
                          <TrendingUp size={14} />
                          <span>{crop.price}</span>
                        </div>
                        <div className="crop-regions">
                          <MapPin size={14} />
                          <span>{crop.regions.join(", ")}</span>
                        </div>
                        <div className="crop-storage">
                          <Package size={14} />
                          <span>{crop.storage}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tips-section">
                <h4>
                  <Sun size={20} />
                  Farming Tips
                </h4>
                <div className="tips-list">
                  {selectedSeason.tips.map((tip, index) => (
                    <div key={index} className="tip-item">
                      <span className="tip-number">{index + 1}</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="description-section">
                <h4>Season Overview</h4>
                <p>{selectedSeason.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Storage Modal */}
      {showStorageModal && selectedStorage && (
        <div
          className="season-modal-overlay"
          onClick={() => setShowStorageModal(false)}
        >
          <div
            className="season-modal storage-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-header"
              style={{
                background: `linear-gradient(135deg, ${selectedStorage.color}, ${selectedStorage.color}dd)`,
              }}
            >
              <div className="header-content">
                <div className="header-icon">{selectedStorage.icon}</div>
                <div>
                  <h3>{selectedStorage.name}</h3>
                  <p className="season-sinhala">{selectedStorage.sinhala}</p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowStorageModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-content">
              <div className="storage-overview">
                <h4>
                  <Package size={20} />
                  Storage Overview
                </h4>
                <p className="storage-description">
                  {selectedStorage.description}
                </p>
              </div>

              <div className="storage-items-section">
                <h4>
                  <Refrigerator size={20} />
                  Storage Methods
                </h4>
                <div className="storage-items-grid">
                  {selectedStorage.items.map((item, index) => (
                    <div key={index} className="storage-item-card">
                      <div className="storage-item-header">
                        <h5>{item.name}</h5>
                        <span className="storage-item-sinhala">
                          {item.sinhala}
                        </span>
                      </div>

                      <div className="storage-conditions">
                        <div className="condition-item">
                          <Refrigerator size={14} />
                          <span>
                            <strong>Storage:</strong> {item.storage}
                          </span>
                        </div>
                        <div className="condition-item">
                          <Thermometer size={14} />
                          <span>
                            <strong>Temperature:</strong> {item.temperature}
                          </span>
                        </div>
                        <div className="condition-item">
                          <Droplets size={14} />
                          <span>
                            <strong>Humidity:</strong> {item.humidity}
                          </span>
                        </div>
                        <div className="condition-item">
                          <Timer size={14} />
                          <span>
                            <strong>Duration:</strong> {item.duration}
                          </span>
                        </div>
                      </div>

                      <div className="storage-method">
                        <h6>
                          <Package size={14} /> Method
                        </h6>
                        <p>{item.method}</p>
                      </div>

                      <div className="storage-tips">
                        <h6>
                          <CheckCircle size={14} /> Tips
                        </h6>
                        <ul>
                          {item.tips.map((tip, tipIndex) => (
                            <li key={tipIndex}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="general-storage-tips">
                <h4>
                  <AlertTriangle size={20} />
                  General Storage Tips
                </h4>
                <div className="general-tips-grid">
                  <div className="general-tip">
                    <CheckCircle size={16} />
                    <span>Always clean produce before storage</span>
                  </div>
                  <div className="general-tip">
                    <CheckCircle size={16} />
                    <span>Check stored items regularly</span>
                  </div>
                  <div className="general-tip">
                    <CheckCircle size={16} />
                    <span>Use proper containers and bags</span>
                  </div>
                  <div className="general-tip">
                    <CheckCircle size={16} />
                    <span>Maintain proper temperature and humidity</span>
                  </div>
                  <div className="general-tip">
                    <CheckCircle size={16} />
                    <span>
                      Separate ethylene producers from sensitive items
                    </span>
                  </div>
                  <div className="general-tip">
                    <CheckCircle size={16} />
                    <span>Label containers with storage dates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonInfo;
