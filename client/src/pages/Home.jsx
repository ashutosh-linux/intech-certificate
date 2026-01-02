import React, { useState } from 'react';
import axios from 'axios';
import { Download, CheckCircle, AlertCircle, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDate = (value) => {
    if (!value) return '-';
    const d = new Date(value);
    if (isNaN(d)) return value; // fallback to raw string
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!certId) return;
    setLoading(true); setError(''); setResult(null);

    try {
      // Simulate a "searching" delay for effect
      await new Promise(resolve => setTimeout(resolve, 600)); 
      const response = await axios.get(`https://32hhfkhdm9.us-east-1.awsapprunner.com/api/certificate/${certId}`);
      console.log("Database Response:", response.data);
      setResult(response.data);
    } catch (err) {
      setError('Certificate ID not found in our records.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper">
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
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin" className="nav-link-admin">Admin Login</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-container">
        <div className="cert-section">
          
          <div className="cert-header">
            <h1>VIEW YOUR CERTIFICATE</h1>
            <p>Enter the unique certificate ID to verify.</p>
          </div>

          {/* Search Card */}
          <div className="cert-card">
            <form onSubmit={handleSearch} className="search-form">
              <input 
                type="text" 
                className="cert-input" 
                placeholder="Enter Certificate ID (e.g. CERT-123)" 
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
              />
              <button type="submit" className="cert-btn" disabled={loading}>
                {loading ? 'Searching...' : 'Verify Now'}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <AlertCircle size={20}/>
              <span>{error}</span>
            </div>
          )}

          {/* Result Card */}
          {result && (
            <div className="result-card">
              <div className="result-header">
                <h2>Certificate Details</h2>
                <span className="badge-success"><CheckCircle size={14}/> Valid Record</span>
              </div>

              <div className="cert-details">
                <div className="detail-row">
                  <span className="detail-label">Certificate Number</span>
                  <span className="detail-value cert-id">{result?.certId || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Registration Number</span>
                  <span className="detail-value">{result?.registrationNumber || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Student Name</span>
                  <span className="detail-value">{result?.name || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Father's Name</span>
                  <span className="detail-value">{result?.fatherName || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date of Birth</span>
                  <span className="detail-value">{formatDate(result?.dateOfBirth)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Course Name</span>
                  <span className="detail-value">{result?.course || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Course Duration</span>
                  <span className="detail-value">{result?.courseDuration || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Period - From</span>
                  <span className="detail-value">{result?.durationFrom || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Period - To</span>
                  <span className="detail-value">{result?.durationTo || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Certificate Issue Date</span>
                  <span className="detail-value">{formatDate(result?.issueDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Full Marks</span>
                  <span className="detail-value">{result?.fullMarks ?? '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Marks Obtained</span>
                  <span className="detail-value">{result?.marksObtained ?? '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Percentage</span>
                  <span className="detail-value">{result?.percentage ? `${result.percentage}%` : '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Grade</span>
                  <span className="detail-value">{result?.grade ? <span className="grade-badge">{result.grade}</span> : '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Center</span>
                  <span className="detail-value">{result?.center || '-'}</span>
                </div>
              </div>

              {result?.pdfFileName && (
                <a href={`https://32hhfkhdm9.us-east-1.awsapprunner.com/uploads/${result.pdfFileName}`} target="_blank" className="download-btn">
                  <Download size={18}/> Download Official Certificate PDF
                </a>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Navigation Links Section */}
      <section className="nav-section">
        <div className="container nav-content">
          <h3>Explore More</h3>
          <div className="nav-links-grid">
            <Link to="/courses" className="nav-card">
              <span>View Courses</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="nav-card">
              <span>About Us</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="nav-card">
              <span>Contact Us</span>
              <ArrowRight size={20} />
            </Link>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <p>© 2026 Intech Groups. All Rights Reserved.</p>
          <p>Website Design by INTECH GROUPS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;