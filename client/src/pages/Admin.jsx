import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, LogOut, Plus, Trash2, FileText, CheckCircle, ArrowRight, Mail, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('certificates');
  const [certificates, setCertificates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Form Data State
  const [formData, setFormData] = useState({ 
    certId: '', 
    registrationNumber: '',
    name: '', 
    fatherName: '', 
    dateOfBirth: '', 
    course: '', 
    courseDuration: '',
    durationFrom: '', 
    durationTo: '', 
    issueDate: '', 
    fullMarks: '', 
    marksObtained: '', 
    percentage: '', 
    grade: '',
    center: ''
  });
  const [file, setFile] = useState(null);

  // --- ACTIONS ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'intech9304@gmail.com' && password === 'Nandu@1317') setIsLoggedIn(true);
    else alert('Invalid Credentials');
  };

  const fetchData = async () => {
    try { const res = await axios.get('https://32hhfkhdm9.us-east-1.awsapprunner.com/api/certificates'); setCertificates(res.data); } 
    catch (err) { console.error("Error"); }
  };

  const fetchContacts = async () => {
    try { const res = await axios.get('https://32hhfkhdm9.us-east-1.awsapprunner.com/api/contacts'); setContacts(res.data); } 
    catch (err) { console.error("Error fetching contacts"); }
  };

  useEffect(() => { if (isLoggedIn) { fetchData(); fetchContacts(); } }, [isLoggedIn]);

  const handleDelete = async (id) => {
    if(window.confirm('Delete this record?')) {
    await axios.delete(`https://32hhfkhdm9.us-east-1.awsapprunner.com/api/certificate/${id}`);
    fetchData();
    }
  };

  const handleDeleteContact = async (id) => {
    if(window.confirm('Delete this message?')) {
      await axios.delete(`https://32hhfkhdm9.us-east-1.awsapprunner.com/api/contact/${id}`);
      fetchContacts();
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`https://32hhfkhdm9.us-east-1.awsapprunner.com/api/contact/${id}/read`);
      fetchContacts();
    } catch (err) {
      console.error("Error marking as read");
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if(file) data.append('pdf', file);

    try {
      await axios.post('https://32hhfkhdm9.us-east-1.awsapprunner.com/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Success'); setShowForm(false); fetchData();
    } catch (err) { alert('Failed'); }
  };

  const startEdit = (cert) => {
    setIsEditing(true);
    setShowForm(true);
    setEditId(cert.certId);
    setFormData({
      certId: cert.certId || '',
      registrationNumber: cert.registrationNumber || '',
      name: cert.name || '',
      fatherName: cert.fatherName || '',
      dateOfBirth: cert.dateOfBirth || '',
      course: cert.course || '',
      courseDuration: cert.courseDuration || '',
      durationFrom: cert.durationFrom || '',
      durationTo: cert.durationTo || '',
      issueDate: cert.issueDate || '',
      fullMarks: cert.fullMarks || '',
      marksObtained: cert.marksObtained || '',
      percentage: cert.percentage || '',
      grade: cert.grade || '',
      center: cert.center || ''
    });
    setFile(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://32hhfkhdm9.us-east-1.awsapprunner.com/api/certificate/${editId}`, formData);
      alert('Certificate updated successfully');
      setIsEditing(false);
      setShowForm(false);
      setEditId(null);
      fetchData();
    } catch (err) {
      alert('Update failed');
    }
  };

  const resetForm = () => {
    setFormData({
      certId: '',
      registrationNumber: '',
      name: '',
      fatherName: '',
      dateOfBirth: '',
      course: '',
      courseDuration: '',
      durationFrom: '',
      durationTo: '',
      issueDate: '',
      fullMarks: '',
      marksObtained: '',
      percentage: '',
      grade: '',
      center: ''
    });
    setFile(null);
    setIsEditing(false);
    setEditId(null);
  };

  // --- VIEW 1: LOGIN PAGE ---
  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        {/* Navigation */}
        <nav className="nav-bar">
          <div className="nav-container">
            <div className="nav-brand">
              <img src="/favicon.png" alt="INTECH Logo" className="logo-icon" />
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

        <div className="login-container">
          <div className="login-box">
            <div className="login-header">
              <h2>Admin Portal</h2>
              <p>Secure Login</p>
            </div>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  className="login-input" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className="login-input" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Enter password"
                />
              </div>
              <button className="login-btn" type="submit">Sign In</button>
            </form>
            <div className="login-footer">
              <Link to="/">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: DASHBOARD ---
  return (
    <div className="admin-wrapper">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="nav-brand">
            <img src="/favicon.png" alt="INTECH Logo" className="logo-icon" />
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

      {/* Dashboard */}
      <div className="admin-dashboard">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <LayoutDashboard size={20} />
            <span>Intech Admin</span>
          </div>
          <div className="sidebar-menu">
            <div className="menu-item active">
              <LayoutDashboard size={18} />
              Dashboard
            </div>
            <Link to="/admin/queries" className="menu-item">
              <Mail size={18} /> Queries
            </Link>
          </div>
          <div className="sidebar-footer">
            <button 
              onClick={() => setIsLoggedIn(false)} 
              className="logout-btn"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="admin-content">
          <header className="admin-header">
            <h2>Dashboard Overview</h2>
            <span className="admin-badge">Admin</span>
          </header>

          <div className="dashboard-area">
            {/* Stats Row */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-content">
                  <p className="stat-label">Total Certificates</p>
                  <h3 className="stat-number">{certificates.length}</h3>
                </div>
                <FileText size={32} className="stat-icon" />
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <p className="stat-label">Pending Reviews</p>
                  <h3 className="stat-number">0</h3>
                </div>
                <FileText size={32} className="stat-icon" />
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <p className="stat-label">Verified Today</p>
                  <h3 className="stat-number">0</h3>
                </div>
                <CheckCircle size={32} className="stat-icon" />
              </div>
            </div>

            {/* Table Section */}
            <div className="table-card">
              {/* Tab Navigation */}
              <div className="tab-navigation">
                <button 
                  className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                  onClick={() => setActiveTab('certificates')}
                >
                  <FileText size={16} /> Certificates ({certificates.length})
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contacts')}
                >
                  <Mail size={16} /> Contact Queries ({contacts.filter(c => !c.isRead).length})
                </button>
              </div>

              {/* CERTIFICATES TAB */}
              {activeTab === 'certificates' && (
              <>
              <div className="table-header">
                <h3>Recent Certificates</h3>
                <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="add-btn">
                  <Plus size={16}/> Add New
                </button>
              </div>

              {/* Upload Form (Conditional) */}
              {showForm && (
                <div className="upload-form-section">
                  <form onSubmit={isEditing ? handleSaveEdit : handlePublish} className="upload-form">
                    <div className="form-header">
                      <h4>{isEditing ? 'Edit Certificate' : 'Add New Certificate'}</h4>
                    </div>
                    <div className="form-grid">
                      <input placeholder="Certificate Number" className="form-input" required value={formData.certId} onChange={e=>setFormData({...formData, certId: e.target.value})} disabled={isEditing} />
                      <input placeholder="Registration Number" className="form-input" required value={formData.registrationNumber} onChange={e=>setFormData({...formData, registrationNumber: e.target.value})}/>
                      <input placeholder="Student's Name" className="form-input" required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/>
                      <input placeholder="Father's Name" className="form-input" required value={formData.fatherName} onChange={e=>setFormData({...formData, fatherName: e.target.value})}/>
                      <input type="date" placeholder="Date of Birth" className="form-input" required value={formData.dateOfBirth} onChange={e=>setFormData({...formData, dateOfBirth: e.target.value})}/>
                      <input placeholder="Course Name" className="form-input" required value={formData.course} onChange={e=>setFormData({...formData, course: e.target.value})}/>
                      <input placeholder="Course Duration (e.g., 6 Months)" className="form-input" required value={formData.courseDuration} onChange={e=>setFormData({...formData, courseDuration: e.target.value})}/>
                      <input placeholder="Period - From (e.g., Jan 2024)" className="form-input" required value={formData.durationFrom} onChange={e=>setFormData({...formData, durationFrom: e.target.value})}/>
                      <input placeholder="Period - To (e.g., Jun 2024)" className="form-input" required value={formData.durationTo} onChange={e=>setFormData({...formData, durationTo: e.target.value})}/>
                      <input type="date" placeholder="Issue Date" className="form-input" required value={formData.issueDate} onChange={e=>setFormData({...formData, issueDate: e.target.value})}/>
                      <input placeholder="Full Marks" type="number" className="form-input" required value={formData.fullMarks} onChange={e=>setFormData({...formData, fullMarks: e.target.value})}/>
                      <input placeholder="Obtains Marks" type="number" className="form-input" required value={formData.marksObtained} onChange={e=>setFormData({...formData, marksObtained: e.target.value})}/>
                      <input placeholder="Percentage" type="number" step="0.01" className="form-input" required value={formData.percentage} onChange={e=>setFormData({...formData, percentage: e.target.value})}/>
                      <input placeholder="Grade (e.g., A+)" className="form-input" required value={formData.grade} onChange={e=>setFormData({...formData, grade: e.target.value})}/>
                      <input placeholder="Center" className="form-input" required value={formData.center} onChange={e=>setFormData({...formData, center: e.target.value})}/>
                    </div>
                    <input type="file" className="form-input" onChange={e=>setFile(e.target.files[0])} accept="application/pdf"/>
                    <button className="publish-btn" type="submit">{isEditing ? 'Save Changes' : 'Publish Certificate'}</button>
                  </form>
                </div>
              )}


              {/* Data Table */}
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Cert No.</th>
                      <th>Reg. No.</th>
                      <th>Name</th>
                      <th>Father's Name</th>
                      <th>Course</th>
                      <th>Center</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map(cert => (
                      <tr key={cert._id}>
                        <td className="cert-id">{cert.certId}</td>
                        <td>{cert.registrationNumber || '-'}</td>
                        <td>{cert.name}</td>
                        <td>{cert.fatherName || '-'}</td>
                        <td>{cert.course}</td>
                        <td>{cert.center || '-'}</td>
                        <td>{cert.percentage}%</td>
                        <td><span className="grade-badge">{cert.grade}</span></td>
                        <td>
                          <button onClick={() => startEdit(cert)} className="edit-btn">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(cert.certId)} className="delete-btn">
                            <Trash2 size={14}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {certificates.length === 0 && <tr><td colSpan="9" className="empty-state">No records found.</td></tr>}
                  </tbody>
                </table>
              </div>
              </>
              )}

              {/* CONTACTS TAB */}
              {activeTab === 'contacts' && (
              <div className="contacts-section">
                <div className="table-header">
                  <h3>Contact Queries</h3>
                  <span className="unread-badge">{contacts.filter(c => !c.isRead).length} unread</span>
                </div>

                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map(contact => (
                        <tr key={contact._id} className={contact.isRead ? 'read' : 'unread'}>
                          <td>{contact.name}</td>
                          <td>{contact.email}</td>
                          <td>{contact.phone || '-'}</td>
                          <td><strong>{contact.subject}</strong></td>
                          <td className="message-cell" title={contact.message}>{contact.message.substring(0, 50)}...</td>
                          <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                          <td>
                            {contact.isRead ? (
                              <span className="status-badge read">
                                <Eye size={14} /> Read
                              </span>
                            ) : (
                              <span className="status-badge unread">
                                <EyeOff size={14} /> Unread
                              </span>
                            )}
                          </td>
                          <td>
                            {!contact.isRead && (
                              <button 
                                onClick={() => handleMarkAsRead(contact._id)} 
                                className="mark-read-btn"
                                title="Mark as read"
                              >
                                <Eye size={14}/>
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteContact(contact._id)} 
                              className="delete-btn"
                              title="Delete"
                            >
                              <Trash2 size={14}/>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {contacts.length === 0 && <tr><td colSpan="8" className="empty-state">No contact queries yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links Section */}
      <section className="nav-section">
        <div className="container nav-content">
          <h3>Explore More</h3>
          <div className="nav-links-grid">
            <Link to="/" className="nav-card">
              <span>Certificate Verification</span>
              <ArrowRight size={20} />
            </Link>
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
      <footer className="admin-footer">
        <div className="container">
          <p>© 2026 Intech Groups. All Rights Reserved.</p>
          <p>Website Design by INTECH GROUPS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;