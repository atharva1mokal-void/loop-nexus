# NEXUS CORE 🚀
## AI-Powered Project Intelligence & Operations Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

> **Advanced Project Intelligence and Operations Command. Synchronize your vision with neural processing.**

---

## 📖 Overview

**NEXUS CORE** (formerly loop26) is a cutting-edge project management platform that combines traditional project tracking with AI-powered intelligence to provide real-time insights, automated analysis, and actionable recommendations. Built for teams working on software development projects, it seamlessly integrates with GitHub and provides a comprehensive suite of collaboration tools.

### ✨ Key Highlights

- 🤖 **AI Intelligence Engine** - Automated sentiment analysis, bottleneck detection, and risk prediction
- 🔗 **GitHub Integration** - Real-time repository synchronization and data mapping
- 💬 **Team Collaboration** - Built-in chat system with real-time messaging
- 📊 **Advanced Analytics** - Live metrics, velocity charts, and health scores
- 🎯 **Smart Insights** - AI-generated recommendations and alerts
- 🔐 **Enterprise Security** - JWT authentication with role-based access control
- 🎨 **Premium UI/UX** - Modern dark theme with glassmorphism and animations

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- MongoDB (local or cloud instance)
- GitHub Personal Access Token (optional, for GitHub integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/atharva1mokal-void/loop26.git
cd loop26

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Core Features

### 1. **Authentication & Security**
- JWT-based authentication with HTTP-only cookies
- Role-based access control (Admin, Developer, Client)
- Bcrypt password hashing
- Password reset functionality
- Protected route middleware

### 2. **Project Management**
- Create and track multiple projects
- GitHub repository integration and sync
- Task management with status tracking
- Resource and cost tracking
- Work logs and time tracking
- Project analytics and metrics

### 3. **AI Intelligence**
- Automated sentiment analysis
- Bottleneck detection
- Risk prediction and health scoring
- Velocity tracking
- Actionable recommendations
- Alert categorization

### 4. **Team Collaboration**
- Real-time chat system
- Team messaging with user presence
- Widget and full-page modes
- Message history and persistence

### 5. **Additional Features**
- Attendance management
- Hackathon event management
- Admin dashboard
- Notifications system
- Insights feed
- Analytics dashboard

---

## 📚 Documentation

- **[Complete Documentation](DOCUMENTATION.md)** - Quick reference guide
- **[Detailed Features](FEATURES.md)** - Comprehensive feature list
- **[Full Documentation](./artifacts/project_documentation.md)** - In-depth technical documentation

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: Jose (JWT), Bcrypt

### External Services
- **GitHub API**: Octokit
- **Version Control**: Git

---

## 📁 Project Structure

```
Looprep/
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   ├── components/       # Reusable React components
│   ├── lib/             # Utilities and business logic
│   └── models/          # MongoDB data models
├── middleware.ts         # Authentication middleware
├── .env.local           # Environment configuration
└── package.json         # Dependencies and scripts
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/nexus-core

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# GitHub Integration (optional)
GITHUB_TOKEN=ghp_your_github_personal_access_token

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🎨 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Authentication | ✅ | JWT-based auth with RBAC |
| Project Management | ✅ | Full CRUD with GitHub sync |
| AI Intelligence | ✅ | Sentiment analysis & predictions |
| Team Chat | ✅ | Real-time messaging |
| Attendance | ✅ | Daily tracking system |
| Hackathons | ✅ | Event management |
| Admin Panel | ✅ | User & system management |
| Notifications | ✅ | Real-time alerts |
| Analytics | ✅ | Live metrics & charts |

**Total Features**: 150+  
**Overall Completion**: ~93%

---

## 🚦 User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management, project oversight |
| **Developer** | Create/edit projects, chat, attendance, limited analytics |
| **Client** | View assigned projects, read-only access, chat |

---

## 📱 Responsive Design

- **Mobile**: Optimized for 320px+
- **Tablet**: Enhanced layout for 768px+
- **Desktop**: Full features at 1024px+
- **Large Screens**: Max-width 1400px container

---

## 🔮 Roadmap

### Upcoming Features
- [ ] WebSocket for real-time chat
- [ ] Advanced GitHub analytics
- [ ] Calendar integration
- [ ] File attachments in chat
- [ ] Email notifications
- [ ] Mobile app
- [ ] Advanced reporting
- [ ] Integration with Jira/Linear

---

## 👨‍💻 Author

**Atharva Mokal**  
- Email: command@nexus-ops.ai
- GitHub: [@atharva1mokal-void](https://github.com/atharva1mokal-void)

---

## 📄 License

© 2026 NEXUS PROJECT INTELLIGENCE - All Rights Reserved

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub or contact the development team.

**Version**: 0.1β  
**Last Updated**: February 2026

---

*Synchronize your vision with neural processing.* 🧠✨
