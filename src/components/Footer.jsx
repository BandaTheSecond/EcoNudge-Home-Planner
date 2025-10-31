import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <span className="footer-brand">© {currentYear} EcoNudge</span>
          <span className="separator">|</span>
          <span className="footer-note">All rights reserved</span>
        </div>

        {/* Center Message */}
        <p className="footer-message">Make today a greener day 🌿</p>

        {/* Right Section */}
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
}
