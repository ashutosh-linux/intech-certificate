# INTECH Academy - Complete Website

A modern, fully-featured educational website built with React and featuring stunning visual effects, smooth animations, and responsive design.

## 🚀 Features

### Pages Created

1. **Landing Page** (`/`)
   - Hero section with network animations
   - Service cards with hover effects
   - Call-to-action sections
   - Professional navigation
   - Responsive footer

2. **Courses Page** (`/courses`)
   - Category filter sidebar
   - Course cards with detailed information
   - Course features listing
   - Career advice section
   - Dynamic filtering system

3. **Contact Page** (`/contact` & `/verify`)
   - Contact form with validation
   - Certificate verification section
   - Center location information
   - Interactive contact methods
   - Success notifications

4. **About Us Page** (`/about`)
   - Mission and vision statements
   - Benefits showcase with icons
   - Statistics section
   - Company journey narrative
   - Responsive grid layout

5. **Pricing Page** (`/pricing`)
   - Three-tier pricing plans
   - Feature comparison
   - Featured plan highlighting
   - FAQ section
   - Call-to-action buttons

6. **Original Pages**
   - Home page (Certificate verification)
   - Admin login page

## 🎨 Design Features

### Visual Effects
- **Network Animations**: Floating nodes on landing page
- **Gradient Backgrounds**: Modern linear and radial gradients
- **Smooth Transitions**: Hover effects on cards and buttons
- **Glowing Effects**: Cyberpunk-style borders and shadows
- **Backdrop Blur**: Modern glass-morphism effects

### Color Scheme
- **Primary**: Cyan (#00d4ff)
- **Dark Background**: #0a1628
- **Text Light**: #e0e7ee
- **Text Secondary**: #b0c4de
- **Accent Colors**: Purple, Pink, Blue, Yellow variants

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 640px
- Flexible grid layouts
- Touch-friendly buttons

## 📁 Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx          (Main landing page)
│   │   ├── Courses.jsx          (Courses listing)
│   │   ├── Contact.jsx          (Contact & verify)
│   │   ├── About.jsx            (About company)
│   │   ├── Pricing.jsx          (Pricing plans)
│   │   ├── Home.jsx             (Certificate verification)
│   │   └── Admin.jsx            (Admin login)
│   ├── styles/
│   │   ├── Landing.css          (Landing styles)
│   │   ├── Courses.css          (Courses styles)
│   │   ├── Contact.css          (Contact styles)
│   │   ├── About.css            (About styles)
│   │   └── Pricing.css          (Pricing styles)
│   ├── App.jsx                  (Main app component)
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 🔧 Available Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Landing | Main landing page with services |
| `/courses` | Courses | All available courses |
| `/contact` | Contact | Contact form & verification |
| `/verify` | Contact | Redirects to contact page |
| `/about` | About | About INTECH Academy |
| `/pricing` | Pricing | Pricing plans & FAQ |
| `/home` | Home | Certificate verification |
| `/admin` | Admin | Admin login page |
| `/services` | Landing | Services page (redirects to landing) |

## 📦 Dependencies

- **React**: 19.2.0
- **React Router DOM**: 7.11.0
- **Lucide React**: 0.562.0 (Icons)
- **Axios**: 1.13.2

## 🎯 Key Components

### Navigation Bar
- Sticky positioning
- Logo with gradient background
- Responsive navigation links
- Smooth underline hover effects

### Service Cards
- Icon-based design
- Hover lift animation
- Glow effects
- Color-coded variants

### Course Cards
- Feature lists with bullets
- Course metadata
- Hover transformations
- Color-coded borders

### Pricing Cards
- Three-tier system
- Featured plan scaling
- Feature checkmarks
- CTA buttons

### Form Elements
- Custom styled inputs
- Select dropdowns with custom arrows
- Textarea support
- Success notifications
- Validation feedback

## 🌈 CSS Features

### Animations
- `slideInDown`: Title entrance
- `slideInUp`: Subtitle entrance
- `fadeIn`: Button entrance
- `float`: Network nodes animation
- Custom hover transitions

### Responsive Grid
- Auto-fit columns
- Minimum column widths
- Flexible gaps
- Mobile stacking

### Interactive Effects
- Backdrop blur for nav
- Gradient text on headers
- Radial gradients on cards
- Transform on hover
- Box shadows for depth

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Website**
   - Open browser to `http://localhost:5173`
   - or `http://localhost:5174` (if port 5173 is busy)

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Content

All pages include relevant content about:
- Computer education programs
- Certificate courses (DCA, DTP, Tally, C++/Java)
- Professional development
- Career guidance
- Student success stories

## 📧 Contact Information

- **Phone**: +91 123 257 800
- **Email**: intech@intech.com
- **Address**: 38 Shwaun Street Bhanp Road, Cehval Road, Manhan- 728311

## 📄 License

© 2023 Intech Academy. All Rights Reserved.

---

**Built with ❤️ using React & Vite**
