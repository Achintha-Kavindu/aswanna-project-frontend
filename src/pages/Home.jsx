// src/pages/Home.jsx
import React, { useState } from "react";
import Navbar from "../components/common/Navbar/Navbar";
import HeroSection from "../components/home/HeroSection/HeroSection";
import SearchFilter from "../components/home/SearchFilter/SearchFilter";
import ItemsGrid from "../components/home/ItemsGrid/ItemsGrid";
import SeasonInfo from "../components/home/SeasonInfo/SeasonInfo";
import Footer from "../components/common/Footer/Footer";
import "./Home.css";

const Home = () => {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="home-page">
      <Navbar />
      <main className="home-main">
        <HeroSection />
        <SearchFilter onFilterChange={handleFilterChange} />
        <ItemsGrid filters={filters} />
        <SeasonInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
