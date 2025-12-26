import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminQueries from './pages/AdminQueries';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Landing Page - Default */}
        <Route path="/" element={<Landing />} />
        
        {/* Certificate Verification Page */}
        <Route path="/home" element={<Home />} />
        
        {/* Admin Section */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/queries" element={<AdminQueries />} />
        
        {/* Course Page */}
        <Route path="/courses" element={<Courses />} />
        
        {/* Contact & Verification */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify" element={<Contact />} />
        
        {/* About Page */}
        <Route path="/about" element={<About />} />
        
        {/* Services redirect to Landing */}
        <Route path="/services" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;