import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, LogOut, Plus, Trash2, User, Search, Upload, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form Data State
  const [formData, setFormData] = useState({ certId: '', name: '', course: '', score: '', grade: '', coordinator: '', date: '' });
  const [file, setFile] = useState(null);

  // --- ACTIONS ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') setIsLoggedIn(true);
    else alert('Invalid Password');
  };

  const fetchData = async () => {
    try { const res = await axios.get('http://localhost:5000/api/certificates'); setCertificates(res.data); } 
    catch (err) { console.error("Error"); }
  };

  useEffect(() => { if (isLoggedIn) fetchData(); }, [isLoggedIn]);

  const handleDelete = async (id) => {
    if(window.confirm('Delete this record?')) {
      await axios.delete(`http://localhost:5000/api/certificate/${id}`);
      fetchData();
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if(file) data.append('pdf', file);

    try {
      await axios.post('http://localhost:5000/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Success'); setShowForm(false); fetchData();
    } catch (err) { alert('Failed'); }
  };

  // --- VIEW 1: LOGIN PAGE ---
  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f4f7fa' }}>
        <div className="card" style={{ width: '400px' }}>
          <div className="text-center" style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>Admin Portal</h2>
            <p style={{ color: '#666' }}>Secure Login</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" className="input-field" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary w-full center" style={{ marginTop: '10px' }}>Sign In</button>
          </form>
          <div className="text-center" style={{ marginTop: '20px' }}>
            <Link to="/" style={{ color: '#0044cc', textDecoration: 'none', fontSize: '14px' }}>Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: DASHBOARD ---
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header"><LayoutDashboard size={20} style={{marginRight:'10px'}}/> Intech Admin</div>
        <div className="sidebar-menu">
          <div className="menu-item active"><LayoutDashboard size={18}/> Dashboard</div>
          </div>
        <div style={{ padding: '20px' }}>
          <button onClick={() => setIsLoggedIn(false)} className="menu-item" style={{ color: '#fc8181', width:'100%' }}>
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="topbar">
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Dashboard Overview</h2>
          <div className="flex center gap-10">
            <span className="badge badge-blue">Admin</span>
          </div>
        </header>

        <div className="content-area">
          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
            <div className="card flex between">
              <div><p style={{color:'#666'}}>Total Certificates</p><h3 style={{fontSize:'24px'}}>{certificates.length}</h3></div>
              <FileText size={32} color="#0044cc" opacity={0.2}/>
            </div>
            <div className="card flex between">
              <div><p style={{color:'#666'}}>Pending Reviews</p><h3 style={{fontSize:'24px'}}>0</h3></div>
              <Search size={32} color="#ecc94b" opacity={0.2}/>
            </div>
            <div className="card flex between">
              <div><p style={{color:'#666'}}>Verified Today</p><h3 style={{fontSize:'24px'}}>0</h3></div>
              <CheckCircle size={32} color="#48bb78" opacity={0.2}/>
            </div>
          </div>

          {/* Table Section */}
          <div className="card" style={{ padding: '0' }}>
            <div className="flex between" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
              <h3 style={{ fontWeight: 'bold' }}>Recent Certificates</h3>
              <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
                <Plus size={16}/> Add New
              </button>
            </div>

            {/* Upload Form (Conditional) */}
            {showForm && (
              <div style={{ padding: '20px', background: '#f8fafc', borderBottom: '1px solid #eee' }}>
                <form onSubmit={handlePublish} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <input placeholder="Cert ID" className="input-field" onChange={e=>setFormData({...formData, certId: e.target.value})}/>
                  <input placeholder="Name" className="input-field" onChange={e=>setFormData({...formData, name: e.target.value})}/>
                  <input placeholder="Course" className="input-field" onChange={e=>setFormData({...formData, course: e.target.value})}/>
                  <input placeholder="Score" className="input-field" onChange={e=>setFormData({...formData, score: e.target.value})}/>
                  <input placeholder="Grade" className="input-field" onChange={e=>setFormData({...formData, grade: e.target.value})}/>
                  <input type="date" className="input-field" onChange={e=>setFormData({...formData, date: e.target.value})}/>
                  <div style={{ gridColumn: 'span 2' }}>
                    <input type="file" className="input-field" onChange={e=>setFile(e.target.files[0])} accept="application/pdf"/>
                  </div>
                  <button className="btn btn-primary" style={{ gridColumn: 'span 2' }}>Publish Certificate</button>
                </form>
              </div>
            )}

            {/* Data Table */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map(cert => (
                    <tr key={cert._id}>
                      <td style={{fontWeight:'bold', color:'#0044cc'}}>{cert.certId}</td>
                      <td>{cert.name}</td>
                      <td>{cert.course}</td>
                      <td><span className="badge badge-green">{cert.grade}</span></td>
                      <td>
                        <button onClick={() => handleDelete(cert.certId)} className="btn btn-danger" style={{padding:'5px 10px'}}>
                          <Trash2 size={14}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {certificates.length === 0 && <tr><td colSpan="5" className="text-center" style={{padding:'40px'}}>No records found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;