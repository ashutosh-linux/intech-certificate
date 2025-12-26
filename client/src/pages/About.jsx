import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, Award, Zap } from 'lucide-react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-wrapper">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-icon">Ⓘ</div>
            <div className="brand-text">
              <h1>INTECH</h1>
              <p>Computer Education</p>
            </div>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/Home">Certificate</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <section className="about-header">
        <div className="container">
          <h1>About INTECH Academy</h1>
          <p>Leading Computer Education for Over Two Decades</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        {/* Mission & Vision */}
        <section className="mission-vision">
          <div className="mv-card">
            <h2>Our Mission</h2>
            <p>
              To empower individuals with cutting-edge technology skills and knowledge, 
              enabling them to excel in their professional careers and contribute to the 
              digital transformation of organizations worldwide.
            </p>
          </div>
          <div className="mv-card">
            <h2>Our Vision</h2>
            <p>
              To be a globally recognized leader in computer education and professional 
              development, fostering innovation, excellence, and continuous learning in 
              the ever-evolving tech industry.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <h2>Why Choose INTECH Academy?</h2>
          <div className="benefits-grid">
            {[
              {
                icon: Award,
                title: '20+ Years of Excellence',
                description: 'Trusted by thousands of students and professionals worldwide'
              },
              {
                icon: Users,
                title: 'Expert Instructors',
                description: 'Learn from industry veterans with real-world experience'
              },
              {
                icon: Zap,
                title: 'Latest Technology',
                description: 'Stay updated with current industry standards and tools'
              },
              {
                icon: CheckCircle,
                title: 'Certified Programs',
                description: 'Earn recognized certifications that boost your career'
              }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="benefit-card">
                  <IconComponent size={40} className="benefit-icon" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-item">
            <h3>5000+</h3>
            <p>Happy Students</p>
          </div>
          <div className="stat-item">
            <h3>20+</h3>
            <p>Years of Service</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Courses Offered</p>
          </div>
          <div className="stat-item">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </section>

        {/* Our Journey */}
        <section className="our-journey">
          <h2>Our Journey</h2>
          <p>
            Founded in 2003, INTECH Academy started with a simple mission: to provide quality 
            computer education to aspiring professionals. Over the past two decades, we have evolved 
            into a comprehensive educational institution offering diverse programs ranging from 
            foundational courses to advanced specializations.
          </p>
          <p>
            Our commitment to excellence, combined with our team of dedicated instructors and 
            state-of-the-art infrastructure, has enabled us to transform countless careers and 
            contribute significantly to the tech industry's growth.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="about-footer">
        <div className="container">
          <p>© 2026 Intech Groups. All Rights Reserved.</p>
          <p>Website Design by INTECH GROUPS.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
