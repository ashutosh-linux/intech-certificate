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
      const response = await axios.post('http://localhost:5000/api/contact', formData);
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
            {/* Verification Section */}
            <div className="verification-box">
              <h2>Student Certificate Verification</h2>
              <p>Query Student Certificate Verification</p>
              <div className="verification-form">
                <input type="text" placeholder="Reg No." />
                <button className="verify-btn">Verify Now</button>
              </div>
            </div>

            {/* Visit Our Center */}
            <div className="visit-center-box">
              <h3>Visit Our Center</h3>
              <div className="center-info">
                <MapPin size={20} />
                <p>38 Shwaun Street Bhanp Road, Cehval Road, Manhan- 728311</p>
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
                <div className="map-placeholder">
                  <p>📍 Location Map</p>
                  <small>Interactive map would be displayed here</small>
                </div>
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
