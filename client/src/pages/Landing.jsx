import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Zap, Briefcase, ArrowRight, Star } from 'lucide-react';
import '../styles/Landing.css';

const Landing = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="landing-wrapper">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-icon">Ⓘ</div>
            <div className="brand-text">
              <h1>INTECH</h1>
              <h3>Computer Education</h3>
            </div>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/home">Certificate</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/verify" className="nav-link-primary">Contact & Verify</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-main">
            Empowering Enterprises with
            <br />
            <span className="gradient-text">Next-Gen Technology</span>
          </h2>
          <p className="hero-subtitle">
            Comprehensive IT Infrastructure, Cloud Solutions,<br />
            and Digital Transformation for a smarter tomorrow.
          </p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">
              Explore Our Courses
              <ArrowRight size={20} />
            </Link>
            <Link to="/courses" className="btn btn-secondary">
              View Our Portfolio
            </Link>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="network-animation">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="network-node" 
              style={{
                '--delay': `${i * 0.1}s`,
                '--x': Math.random() * 100,
                '--y': Math.random() * 100,
              }}
            />
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <h3 className="section-title">Our Core Services</h3>
          <div className="services-grid">
            {[
              {
                title: 'IT Infrastructure Management',
                description: 'Manage entire IT infrastructure management, ecommercis and tarrelsuchices.',
                icon: Briefcase,
                color: 'cyan'
              },
              {
                title: 'Cybersecurity Solutions',
                description: 'Cybersecurte IT infrastructure, and demonst acresecurity solutions.',
                icon: Zap,
                color: 'purple'
              },
              {
                title: 'Cloud & Virtualization',
                description: 'Cloud & Virtualization, aoow webssite in cloud & virtualization and services.',
                icon: Code,
                color: 'blue'
              },
              {
                title: 'Software Development',
                description: 'Software Development to project standers and software development.',
                icon: BookOpen,
                color: 'pink'
              }
            ].map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={idx}
                  className={`service-card service-${service.color}`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="service-icon">
                    <IconComponent size={40} />
                  </div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <div className="service-hover-effect" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

            
      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h5>INTECH</h5>
              <p>Comprehensive IT Infrastructure Solutions</p>
            </div>
            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/Home">Certificate</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Contact</h5>
              <p>📞 +91 9304364405</p>
              <p>📧 intechnalanda@intech.com</p>
            </div>
            <div className="footer-col">
              <h5>Social Media</h5>
              <div className="social-links">
                <a href="#facebook">f</a>
                <a href="#twitter">𝕏</a>
                <a href="#instagram">📷</a>
                <a href="#youtube">▶</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Intech Groups. All Rights Reserved.</p>
            <p>Website Design by INTECH GROUPS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
