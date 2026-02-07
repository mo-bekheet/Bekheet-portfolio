# Bekheet Portfolio - Project Documentation

## Project Overview

This is a personal portfolio website for Mohamed Bekheet built with React and Vite. It showcases the developer's skills, projects, education, and experience through an interactive and visually appealing interface. The portfolio includes advanced features like 3D graphics, particle effects, chatbot integration, and responsive design.

### Key Technologies Used

- **Frontend Framework**: React 18.3.1 with JSX
- **Build Tool**: Vite 6.0.5
- **Styling**: CSS modules, Bootstrap 5.3.2, Material UI (MUI)
- **State Management**: React hooks
- **Routing**: React Router DOM
- **3D Graphics**: Three.js with @react-three/fiber and @react-three/drei
- **Animations**: Framer Motion, React Awesome Reveal, Typewriter Effect
- **UI Components**: Material UI Icons, React Bootstrap, Lucide React
- **PDF Handling**: React PDF, @react-pdf-viewer
- **Particle Effects**: tsparticles
- **Carousel**: React Slick
- **Parallax Effects**: React Parallax Tilt
- **Icons**: React Icons, Font Awesome
- **Email Service**: EmailJS
- **Deployment**: Netlify

### Project Architecture

The portfolio follows a component-based architecture with the following main sections:

- **Home**: Landing page with introduction, social links, testimonials, and contact section
- **About**: Detailed information about the developer, including education, experience, and skills
- **Projects**: Showcase of recent projects with descriptions and links
- **Resume**: Interactive resume viewer
- **Certificates**: Display of certifications
- **Play**: Interactive game section
- **Chatbot**: AI-powered chatbot integration
- **Footer**: Site footer with additional links

### Directory Structure

```
Bekheet-portfolio/
├── public/                 # Static assets and files
│   ├── _headers           # Security headers for Netlify
│   ├── _redirects         # URL redirect rules for Netlify
│   ├── favicon.png        # Site favicon
│   ├── ainshams.png       # University logo
│   ├── uottawa.png        # University logo
│   ├── company/           # Company logos
│   ├── earth/             # Earth 3D model assets
│   ├── planet/            # Planet 3D model assets
│   ├── svg/               # SVG graphics
│   └── Testimonial/       # Testimonial assets
├── src/                   # Source code
│   ├── assets/            # Images, animations, and media files
│   ├── components/        # React components organized by feature
│   │   ├── About/         # About section components
│   │   ├── Home/          # Home page components
│   │   ├── Projects/      # Project showcase components
│   │   ├── Resume/        # Resume components
│   │   ├── Certificate/   # Certificate components
│   │   ├── chatEngine/    # Chatbot components
│   │   ├── play/          # Game components
│   │   ├── utils/         # Utility functions
│   │   ├── hoc/           # Higher-order components
│   │   ├── Particle.jsx   # Particle effect component
│   │   ├── Pre.jsx        # Preloader component
│   │   ├── Navbar.jsx     # Navigation bar
│   │   ├── Footer.jsx     # Footer component
│   │   └── ScrollToTop.jsx # Scroll to top functionality
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── .gitignore            # Git ignore rules
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite build configuration
├── netlify.toml          # Netlify deployment configuration
├── eslint.config.js      # ESLint configuration
└── README.md             # Project documentation
```

## Building and Running

### Prerequisites

- Node.js (version specified in netlify.toml: 18.20.4)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development Commands

- **Start development server**: `npm run dev`
  - Runs the app in development mode with hot module replacement (HMR)
  - Access at http://localhost:5173

- **Build for production**: `npm run build`
  - Creates an optimized production build in the `dist` folder
  - Copies `_redirects` and `_headers` files to the dist folder

- **Preview production build**: `npm run preview`
  - Locally previews the production build

- **Lint code**: `npm run lint`
  - Checks code for linting errors using ESLint

### Deployment

The project is configured for deployment on Netlify:
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

## Development Conventions

### Coding Standards

- **JavaScript/JSX**: ES2020+ syntax with React hooks
- **CSS**: Modular styling with Bootstrap classes and custom CSS
- **File Naming**: PascalCase for React components, camelCase for utilities
- **Component Structure**: Functional components with hooks
- **Code Quality**: Enforced through ESLint with React plugin rules

### Component Organization

Components are organized by feature in the `/src/components` directory:
- Each major section (About, Home, Projects, etc.) has its own subdirectory
- Shared utility components are in the root of `/src/components`
- Higher-order components (HOC) are in the `hoc` directory
- Utility functions are in the `utils` directory

### Environment Variables

The project uses Vite's environment variable system:
- Variables prefixed with `VITE_` are exposed to client-side code
- API configuration is stored in `.env` file
- Proxy configuration for API calls is in `vite.config.js`

### Security Features

- Content Security Policy headers configured in `netlify.toml`
- XSS protection headers
- Frame options protection
- Secure API proxy configuration in Vite config

## Special Features

### 3D Graphics
- Earth and computer 3D models using Three.js
- Interactive 3D star backgrounds
- Advanced lighting and materials

### Interactive Elements
- Animated particle systems
- Parallax tilt effects on cards
- Smooth scrolling and transitions
- Typewriter text animations

### AI Integration
- Chatbot with GenAI capabilities
- API proxy for secure AI service communication
- Session-based conversation management

### Responsive Design
- Mobile-first approach using Bootstrap grid system
- Responsive images and layouts
- Touch-friendly interactive elements

## Testing and Quality Assurance

While no explicit test files were found in the initial scan, the project follows React best practices with component-based architecture that facilitates unit testing. The build process includes linting validation through ESLint.