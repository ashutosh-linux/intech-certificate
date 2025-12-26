import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;