import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('https://32hhfkhdm9.us-east-1.awsapprunner.com/api/contact', formData);
      setSubmitStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Failed to send message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
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
      <section className="contact-header">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container contact-container">
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Get in Touch</h2>
            
            {submitStatus && (
              <div className={`status-message ${submitStatus.type}`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>{submitStatus.message}</span>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject of your inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="send-btn">
                <Send size={18} />
                Send Enquiry
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="contact-right">
           
            {/* Visit Our Center */}
            <div className="visit-center-box">
              <h3>Visit Our Center</h3>
              <div className="center-info">
                <MapPin size={20} />
                <p>BANDHU BAZAR, SAHOKHAR, SOHSARAI, BIHAR SHARIF, BIHAR, NALANDA, 803118</p>
              </div>

              <h4>Direct Contact</h4>
              <div className="contact-methods">
                <div className="method">
                  <Phone size={20} />
                  <input type="text" placeholder="Phone" />
                </div>
                <div className="method">
                  <Mail size={20} />
                  <input type="text" placeholder="Email" />
                </div>
              </div>

              {/* Map */}
              <div className="map-container">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=25.228444,85.515278"
                  target="_blank"
                  rel="noreferrer"
                  className="map-link"
                  title="Open directions to Intech"
                >
                  <iframe
                    title="Intech location"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3577.0706496236743!2d85.515278!3d25.228444!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEzJzQyLjQiTiA4NcKwMzAnNTUuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="map-overlay">
                    <p>📍 Location Map (tap for directions)</p>
                    <small>Opens Google Maps with directions</small>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="container">
          <p>© 2026 Intech Groups. All Rights Reserved.</p>
          <p>Website Design by INTECH GROUPS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
