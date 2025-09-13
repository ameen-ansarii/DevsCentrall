# DevsCentral 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green.svg)](https://supabase.com/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-devscentral.tech-orange.svg)](https://devscentral.tech)

A modern, clean, and feature-rich tech news platform built with React and Supabase. DevsCentral provides curated content on AI, Startups, and Development with a beautiful dark theme and complete user authentication system.

## ✨ Features

### **📰 Content Management**
- **Curated Tech News** - Latest articles on AI, Startups, and Development
- **Multiple Categories** - AI, Agents, Developers, Programming Languages, Startups
- **Smart Search** - Real-time search within categories
- **Responsive Design** - Works perfectly on all devices

### **🔐 User Authentication**
- **Sign Up/Login** - Complete authentication system
- **OTP Verification** - 4-digit email verification codes
- **Username System** - Instagram-style unique usernames
- **Profile Management** - Edit profile, avatar, bio, location
- **Secure Sessions** - Supabase-powered authentication

### **🎨 Modern UI/UX**
- **Dark Theme** - Beautiful glassmorphism design
- **Smooth Animations** - Professional transitions and effects
- **Mobile-First** - Optimized for all screen sizes
- **Fast Loading** - Optimized React build

## 🚀 Live Demo

Visit the live website: **[devscentral.tech](https://devscentral.tech)**

## 🛠️ Technology Stack

- **Frontend:** React 19.1.1, Vite, React Router
- **Styling:** Tailwind CSS, Custom CSS
- **Backend:** Supabase (Database, Authentication, Real-time)
- **Deployment:** Production-ready build system
- **Icons:** Lucide React, Custom SVGs

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ameen-ansarii/DevsCentral.git
   cd DevsCentral
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase credentials to `.env.local`:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Go to your Supabase dashboard
   - Run the SQL script from `COMPLETE_SUPABASE_SETUP.sql`
   - Configure authentication settings

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   └── ui/             # UI components
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state
├── lib/                # Utilities and configurations
│   └── supabase.js     # Supabase client
├── ui/                 # Layout components
│   └── Layout.jsx      # Main layout
└── views/              # Page components
    ├── HomePage.jsx    # Home page
    ├── AboutPage.jsx   # About page
    ├── CategoryPage.jsx # Category pages
    └── ProfilePage.jsx # User profile
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel** - Automatic deployments from GitHub
- **Netlify** - Drag and drop deployment
- **GitHub Pages** - Free hosting for public repos
- **Any Static Host** - Upload `dist/` folder contents

## 🔐 Authentication System

### Features
- **User Registration** - Email, password, unique username
- **OTP Verification** - 4-digit email verification
- **Login Options** - Username or email login
- **Profile Management** - Complete user profiles
- **Password Reset** - Email-based password recovery
- **Secure Sessions** - JWT-based authentication

### Database Schema
- **profiles** - User profile information
- **auth.users** - Supabase authentication (automatic)
- **Row Level Security** - Secure data access

## 📊 Data Management

### Content Structure
- **JSON-based** - Easy content management
- **Category-based** - Organized by topics
- **Date-sorted** - Latest content first
- **Search-enabled** - Real-time search

### Categories
- **AI** - Artificial Intelligence news
- **Agents** - AI Agents and automation
- **Developers** - Developer tools and news
- **Programming Languages** - Language updates
- **Startups** - Startup ecosystem news

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use ESLint configuration
- Follow React best practices
- Maintain consistent formatting
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - Backend and authentication
- **React Team** - Amazing frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool

## 📞 Support

- **Website:** [devscentral.tech](https://devscentral.tech)
- **Issues:** [GitHub Issues](https://github.com/ameen-ansarii/DevsCentral/issues)
- **Email:** Contact through GitHub profile

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ameenxv)

---

**Built with ❤️ by [Ameen Ansari](https://github.com/ameen-ansarii)**
