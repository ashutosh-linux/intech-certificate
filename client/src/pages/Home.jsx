import React, { useState } from 'react';
import axios from 'axios';
import { Search, Download, CheckCircle, AlertCircle, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!certId) return;
    setLoading(true); setError(''); setResult(null);

    try {
      // Simulate a "searching" delay for effect
      await new Promise(resolve => setTimeout(resolve, 600)); 
      const response = await axios.get(`/api/certificate/${certId}`);
      setResult(response.data);
    } catch (err) {
      setError('Certificate ID not found in our records.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar">
        <div className="container between flex">
          <div className="nav-logo">
            <GraduationCap size={28} />
            <span>INTECH COMPUTER EDUCATION</span>
          </div>
          <Link to="/admin" className="btn btn-outline">Admin Login</Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="container" style={{ marginTop: '60px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#1a202c' }}>VIEW YOUR CERTIFICATE</h1>
            <p style={{ color: '#718096' }}>Enter the unique certificate ID to verify.</p>
          </div>

          {/* Search Card */}
          <div className="card">
            <form onSubmit={handleSearch} className="flex gap-10">
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter Certificate ID (e.g. CERT-123)" 
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Verify Now'}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="card fade-in" style={{ marginTop: '20px', background: '#fff5f5', border: '1px solid #feb2b2', color: '#c53030', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20}/> {error}
            </div>
          )}

          {/* Result Card */}
          {result && (
            <div className="card fade-in" style={{ marginTop: '30px', borderTop: '4px solid #0044cc' }}>
              <div className="flex between" style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Certificate Details</h2>
                <span className="badge badge-green flex center gap-10"><CheckCircle size={14}/> Valid Record</span>
              </div>

              <table style={{ marginBottom: '25px' }}>
                <tbody>
                  <tr><td style={{ fontWeight: 'bold', width: '30%' }}>Student Name</td><td>{result.name}</td></tr>
                  <tr><td style={{ fontWeight: 'bold' }}>Certificate ID</td><td style={{ fontFamily: 'monospace', color: '#0044cc' }}>{result.certId}</td></tr>
                  <tr><td style={{ fontWeight: 'bold' }}>Course Name</td><td>{result.course}</td></tr>
                  <tr><td style={{ fontWeight: 'bold' }}>Score / Grade</td><td>{result.score} ({result.grade})</td></tr>
                  <tr><td style={{ fontWeight: 'bold' }}>Issued Date</td><td>{result.date}</td></tr>
                </tbody>
              </table>

              <div className="text-center">
                <a href={`http://localhost:5000/uploads/${result.pdfFileName}`} target="_blank" className="btn btn-primary w-full center">
                  <Download size={18}/> Download Official Certificate PDF
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;