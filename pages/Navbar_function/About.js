import React from "react";
import "./About.css";
import Navbar from "@/components/Navbar";

const AboutUs = () => {
  return (
    <section className="about-us-section">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Welcome to Hasham Travelers</h1>
          <p className="hero-subtext">
            Your trusted partner in exploring the world's most breathtaking
            destinations. At Hasham Travelers, we make your travel dreams a
            reality.
          </p>
        </div>
        <img
          className="hero-image"
          src="/images/china.jpg"
          alt="Beautiful travel destinations"
        />
      </div>

      <div className="mission-vision container">
        <h2 className="section-heading">Our Mission & Vision</h2>
        <p className="section-text">
          At Hasham Travelers, we aim to provide unparalleled travel experiences
          that inspire and enrich lives. Our vision is to become the leading
          travel partner, creating journeys that are cherished for a lifetime.
        </p>
      </div>

      <div className="highlights-section container">
        <h2 className="section-heading">Why Choose Us?</h2>
        <div className="grid grid-three-cols">
          <div className="highlight">
            <img className="highlight-image" src="/images/taj.jpg" alt="Global travel" />
            <h3>Worldwide Destinations</h3>
            <p>
              From the iconic landmarks of Europe to the hidden gems of Asia, our travel packages cover a wide array of destinations.
              Experience the world with personalized itineraries that match your interests and pace.
            </p>
            <ul className="highlight-list">
              <li>Top-rated destinations in every continent</li>
              <li>Handpicked accommodations and activities</li>
              <li>Travel insurance and support included</li>
            </ul>
          </div>
          <div className="highlight">
            <img className="highlight-image" src="/images/inter.jpg" alt="Expert guides" />
            <h3>Expert Travel Guides</h3>
            <p>
              Our travel guides are seasoned professionals with deep knowledge of local cultures, ensuring your journey is both safe
              and enriching. They go beyond just showing you places—they bring destinations to life.
            </p>
            <ul className="highlight-list">
              <li>Fluent in multiple languages</li>
              <li>Specialized in cultural and adventure tours</li>
              <li>Available 24/7 for assistance</li>
            </ul>
          </div>
          <div className="highlight">
            <img className="highlight-image" src="/images/sky.jpg" alt="Unique experiences" />
            <h3>Unique Experiences</h3>
            <p>
              Dive into local cultures and enjoy curated experiences that you won’t find in typical travel packages.
              From cooking classes to wildlife safaris, each journey is tailored to create lifelong memories.
            </p>
            <ul className="highlight-list">
              <li>Customized cultural and adventure experiences</li>
              <li>Private tours and local expert interactions</li>
              <li>Special seasonal events and activities</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <h2 className="cta-heading">Why Travel with Hasham Travelers?</h2>
        <p className="cta-text">
          From personalized itineraries to 24/7 support, we ensure that every
          journey is safe, comfortable, and unforgettable. Trust us to craft
          your perfect getaway.
        </p>
        <button className="cta-button">Start Planning</button>
      </div>
    </section>
  );
};

export default AboutUs;
