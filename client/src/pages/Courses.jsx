import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Star, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import '../styles/Courses.css';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const categories = [
    'All Courses',
    'DCA',
    'DTP Terms',
    'Tally Prime',
    'C++ / Java',
    'Adv. Course'
  ];

  const courses = [
    {
      id: 1,
      title: 'DCA (Diploma in Computer App)',
      category: 'DCA',
      description: 'DCA (Diploma in Computer App) is a comprehensive, and exercise smear in...',
      features: ['All Installation', 'All Frameworks', 'HTML & CSS', 'Bootstrapillustratin', 'Mongodb Presentation', 'Adves setting'],
      color: 'cyan'
    },
    {
      id: 2,
      title: 'DTP (Desktop Publishing)',
      category: 'DTP Terms',
      description: 'DTP (Desktop Publishing) is a complete computer and submarks for computer...',
      features: ['DTP Design', 'Desktop Learning', 'Page Maker', 'PSP Layer', 'PNG Having', 'Propgram Publishing'],
      color: 'pink'
    },
    {
      id: 3,
      title: 'Tally Prime (Accounting Expert)',
      category: 'Tally Prime',
      description: 'Tally Prime (Accounting expert) is a accounting expert and sit you need you...',
      features: ['Desk-In Proms', 'Desktop Instruction', 'Tally Prime', 'Tally Office', 'Tally Prime Essomprint', 'Tally Prime'],
      color: 'yellow'
    },
    {
      id: 4,
      title: 'C++ / Java (Adv. Course)',
      category: 'C++ / Java',
      description: 'C++ / Java (Adv. Course) is a complete advaces and analysis in countery slope...',
      features: ['C++ Process', 'C++ Java', 'C++ Java', 'C++ Java Course', 'C++ Java Course', 'C++ Java Course'],
      color: 'purple'
    },
  ];

  const filteredCourses = selectedCategory === 'All Courses' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  return (
    <div className="courses-wrapper">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-icon">Ⓘ</div>
            <div className="brand-text">
              <h1>INTECH</h1>
              <p>EDUCATION</p>
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
      <section className="courses-header">
        <div className="container">
          <h1>Courses</h1>
          <p>Explore Our Programs</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        <div className="courses-layout">
          {/* Sidebar */}
          <aside className="courses-sidebar">
            <div className="sidebar-section">
              <div className="section-header">
                <Filter size={20} />
                <h3>Categories</h3>
              </div>
              <div className="categories-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Career Advice Box */}
            <div className="career-advice-box">
              <h4>Need Career Advice?</h4>
              <p>We need the assistance covelet the tamis need career advice?</p>
              <button className="view-syllabus-btn">View Syllabus</button>
            </div>
          </aside>

          {/* Courses Grid */}
          <main className="courses-grid-section">
            <h2>Our Programs</h2>
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`course-card course-${course.color}`}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <div className="course-card-header">
                    <h3>{course.title}</h3>
                  </div>

                  <p className="course-description">{course.description}</p>

                  <div className="course-features">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <span className="feature-dot">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="view-syllabus-btn">
                    View Syllabus
                    <ArrowRight size={16} />
                  </button>

                  <div className="card-glow-effect" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="courses-footer">
        <div className="container">
          <p>© 2026 Intech Groups. All Rights Reserved.</p>
          <p>Website Design by INTECH GROUPS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Courses;
