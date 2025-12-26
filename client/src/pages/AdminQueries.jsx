import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import '../styles/Admin.css';

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/queries');
      setQueries(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load queries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div className="admin-wrapper">
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
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      <div className="admin-dashboard">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <Mail size={20} />
            <span>Query Center</span>
          </div>
          <div className="sidebar-menu">
            <Link to="/admin" className="menu-item">
              <ArrowLeft size={18} /> Back to Dashboard
            </Link>
            <div className="menu-item active">
              <Mail size={18} /> Queries
            </div>
          </div>
        </aside>

        <div className="admin-content">
          <header className="admin-header">
            <h2>Contact Queries</h2>
            <span className="admin-badge">Admin</span>
          </header>

          <div className="table-card">
            <div className="table-header">
              <h3>All Messages</h3>
              <button className="add-btn" onClick={fetchQueries}>
                Refresh
              </button>
            </div>

            {error && <div className="status-message error">{error}</div>}

            {loading ? (
              <div className="empty-state"> <Loader2 className="spin" size={20}/> Loading queries...</div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.map(q => (
                      <tr key={q._id}>
                        <td>{q.name}</td>
                        <td>{q.email}</td>
                        <td>{q.subject}</td>
                        <td className="message-cell" title={q.message}>{q.message}</td>
                        <td>{new Date(q.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                    {queries.length === 0 && (
                      <tr><td colSpan="5" className="empty-state">No queries yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQueries;
