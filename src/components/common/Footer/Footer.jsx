// src/components/common/Footer/Footer.jsx
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Leaf,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <Leaf className="logo-icon" />
              <h2>අස්වැන්න</h2>
            </div>
            <p className="brand-description">
              Connect directly with local farmers and get the freshest produce
              delivered to your doorstep. Supporting Sri Lankan agriculture with
              quality organic products.
            </p>
            <div className="social-links">
              <a
                href="#"
                className="social-link facebook"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="social-link instagram"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link twitter" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link youtube" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/farmers">Our Farmers</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li>
                <a href="/category/vegetables">Vegetables</a>
              </li>
              <li>
                <a href="/category/fruits">Fruits</a>
              </li>
              <li>
                <a href="/category/grains">Grains</a>
              </li>
              <li>
                <a href="/category/herbs">Herbs</a>
              </li>
              <li>
                <a href="/category/dairy">Dairy</a>
              </li>
              <li>
                <a href="/category/seeds">Seeds</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li>
                <a href="/help">Help Center</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/shipping">Shipping Info</a>
              </li>
              <li>
                <a href="/returns">Returns</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section contact-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" size={18} />
                <div>
                  <p>123 Farm Street</p>
                  <p>Colombo 07, Sri Lanka</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" size={18} />
                <div>
                  <p>+94 11 234 5678</p>
                  <p>+94 77 123 4567</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" size={18} />
                <div>
                  <p>info@aswanna.lk</p>
                  <p>support@aswanna.lk</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="newsletter">
              <h4>Subscribe to our Newsletter</h4>
              <p>Get updates on fresh products and special offers</p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} අස්වැන්න. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
