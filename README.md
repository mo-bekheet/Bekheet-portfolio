# Bekheet Portfolio - Professional Developer Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Firebase Integration](#firebase-integration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The Bekheet Portfolio is a modern, responsive portfolio website showcasing the professional profile, projects, and skills of Mohamed Bekheet. Built with React 19 and enhanced with Firebase backend services, this portfolio demonstrates expertise in modern web development, AI integration, and cloud technologies.

## Features

- 🚀 **Modern React 19 Architecture**: Utilizes latest React patterns and best practices
- 🔐 **Secure Backend**: Firebase integration for authentication and data management
- 📱 **Fully Responsive**: Works seamlessly across all device sizes
- ⚡ **High Performance**: Optimized loading times and efficient resource usage
- 🎨 **Interactive UI**: Engaging animations and modern design elements
- 🤖 **AI-Powered Chatbot**: Integrated chatbot for enhanced user interaction
- 🔍 **SEO Optimized**: Proper meta tags and structured data
- ♿ **Accessible**: WCAG compliant for inclusive user experience
- 🌐 **Real-time Content**: Dynamic content management via Firestore

## Technologies Used

### Frontend
- **React 19**: Modern component-based architecture
- **Vite**: Fast build tool and development server
- **Bootstrap 5**: Responsive layout framework
- **Material UI (MUI)**: Advanced UI components
- **Three.js**: 3D graphics and animations
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing

### Backend & Services
- **Firebase**: Authentication, Firestore database, and Storage
- **Netlify Functions**: Serverless functions for secure operations
- **EmailJS**: Secure email delivery

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting
- **PropTypes**: Runtime type checking

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase account (for backend services)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/mohamedbakhet/Bekheet.github.io.git
cd Bekheet-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory with the following variables:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_CLIENT_EMAIL=your_firebase_client_email
VITE_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----"
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email
RECIPIENT_EMAIL=your_recipient_email
```

4. **Run the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   ├── layout/          # Layout components
│   ├── sections/        # Page sections
│   └── hooks/           # Custom React hooks
├── lib/                # Library configurations
│   ├── firebase.js      # Firebase configuration
│   ├── auth.js          # Authentication utilities
│   └── db.js            # Database utilities
├── hooks/              # Custom React hooks
│   ├── useFirestore.js  # Firestore data fetching
│   └── useAuth.js       # Authentication state
├── contexts/           # React Context providers
│   └── AppContext.js    # Global state context
├── pages/              # Route components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   └── ...
├── services/           # Business logic services
│   ├── contentService.js # Content management
│   └── assetService.js  # Asset handling
├── utils/              # Utility functions
│   ├── validators.js    # Validation utilities
│   └── helpers.js       # Helper functions
├── data/               # Static data
│   └── sampleContent.js # Sample content for migration
├── assets/             # Static assets (images, icons)
└── App.jsx             # Main application component
```

## Firebase Integration

The portfolio leverages Firebase for backend services:

### Authentication
- Secure user authentication
- Protected content access

### Firestore Database
- Real-time content management
- Dynamic portfolio data
- Contact form submissions

### Storage
- Asset management (images, documents)
- File upload/download capabilities

### Security Rules
Firebase security rules ensure proper access control:
```javascript
// Example security rule
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Usage

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Environment Variables

The application requires the following environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_CLIENT_EMAIL` | Firebase client email |
| `VITE_FIREBASE_PRIVATE_KEY` | Firebase private key |
| `SMTP_USER` | SMTP username for email |
| `SMTP_PASS` | SMTP password for email |
| `SENDER_EMAIL` | Email address for sending |
| `RECIPIENT_EMAIL` | Email address for receiving |

## Contributing

We welcome contributions to enhance the portfolio! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and component patterns
- Maintain consistent code style using ESLint and Prettier
- Write meaningful commit messages
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Mohamed Bekheet - [LinkedIn](https://www.linkedin.com/in/mohamedbekheet-/)

Project Link: [https://github.com/mohamedbakhet/Bekheet.github.io](https://github.com/mohamedbakhet/Bekheet.github.io)

---

Made with ❤️ using React, Firebase, and modern web technologies.