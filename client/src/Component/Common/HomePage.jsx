import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">

        <h1 className="main-title">
          Online Examination System
        </h1>

        <p className="subtitle">
          Conduct exams digitally with complete security, instant evaluation
          and detailed performance reports — anytime, anywhere.
        </p>

        <div className="button-group">

          {/* Student Login Navigation */}
          <Link to="/StudentLogin" className="btn primary-btn">
            Student Login
          </Link>

          {/* Teacher Login Navigation */}
          <Link to="/TeacherLogin" className="btn outline-btn">
            Teacher Login
          </Link>

        </div>

        <div className="features">
          <div className="feature-card">
            <div className="icon">🔐</div>
            <h3>Secure Platform</h3>
            <p>Protected login system with safe exam environment.</p>
          </div>

          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Instant Results</h3>
            <p>Automatic evaluation with immediate score generation.</p>
          </div>

          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>Performance Reports</h3>
            <p>Detailed analytics to track student performance easily.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;