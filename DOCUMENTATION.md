# NEXUS CORE - Project Intelligence System
## Quick Reference Guide

> **AI-Powered Project Management & Intelligence Platform**

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and JWT secret

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📋 Core Features Summary

### 1. **Authentication & Authorization**
- JWT-based secure authentication
- Role-based access (Admin, Developer, Client)
- Password reset functionality
- Session management with middleware

### 2. **Project Management**
- Create and track multiple projects
- GitHub repository integration
- Task management (Todo, In-Progress, Completed)
- Resource and cost tracking
- Work logs and time tracking
- Real-time progress visualization

### 3. **AI Intelligence Engine**
- Automated sentiment analysis
- Bottleneck detection
- Risk prediction
- Velocity tracking
- Actionable recommendations
- Health scoring

### 4. **Team Collaboration**
- Real-time chat system
- Team messaging
- Widget and full-page modes
- User presence indicators

### 5. **Attendance Management**
- Daily attendance tracking
- Present/Absent/Excused status
- User-based records
- Date filtering

### 6. **Hackathon Management**
- Event creation and management
- Registration system
- Location tracking
- Tag-based categorization

### 7. **Admin Dashboard**
- User management
- Project oversight
- System analytics
- Role assignment

### 8. **Notifications**
- Real-time alerts
- User-specific notifications
- Read/unread tracking

### 9. **Insights Feed**
- Global activity stream
- AI-generated insights
- Timestamped events

### 10. **Analytics Dashboard**
- Live metrics
- Velocity charts
- Health scores
- Performance indicators

---

## 🔑 Default Credentials

> **Note**: Change these after first login!

**Admin Account**:
- Username: `admin`
- Password: `admin123`

**Developer Account**:
- Username: `developer`
- Password: `dev123`

---

## 🗂️ Project Structure

```
src/
├── app/              # Next.js pages and API routes
├── components/       # React UI components
├── lib/             # Utilities and business logic
└── models/          # MongoDB data models
```

---

## 🔌 Key API Endpoints

| Feature | Endpoint | Method |
|---------|----------|--------|
| Login | `/api/auth/login` | POST |
| Register | `/api/auth/register` | POST |
| Projects | `/api/projects` | GET/POST |
| Sync GitHub | `/api/projects/sync` | POST |
| Chat | `/api/chat` | GET/POST |
| Attendance | `/api/attendance` | GET/POST |
| Hackathons | `/api/hackathons` | GET/POST |
| Insights | `/api/insights` | GET |
| Notifications | `/api/notifications` | GET |

---

## 🎨 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (Jose), Bcrypt
- **External APIs**: GitHub API (Octokit)

---

## 📊 Data Models

1. **User** - Authentication and profile
2. **Project** - Project details and tasks
3. **Attendance** - Daily attendance records
4. **Hackathon** - Event management
5. **Message** - Team chat messages
6. **Notification** - System alerts
7. **Insight** - AI-generated insights

---

## 🛡️ Protected Routes

All routes except `/login` and `/register` require authentication:
- `/` - Dashboard
- `/admin` - Admin panel (admin only)
- `/projects` - Project management
- `/chat` - Team chat
- `/attendance` - Attendance tracking
- `/hackathons` - Hackathon events
- `/insights` - Insights feed
- `/intelligence` - AI reports
- `/notifications` - Notifications
- `/profile` - User profile

---

## ⚙️ Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/nexus-core
JWT_SECRET=your-secret-key-here
GITHUB_TOKEN=ghp_your_github_token (optional)
```

---

## 🎯 Key Features Explained

### GitHub Integration
1. Create project with GitHub URL
2. Click sync button to pull data
3. Automatically maps commits/issues to tasks

### AI Intelligence
- Analyzes team communication sentiment
- Detects project bottlenecks
- Predicts deadline risks
- Generates actionable recommendations

### Real-time Updates
- Dashboard auto-refreshes every 60 seconds
- Chat polls every 3 seconds
- Live progress indicators

---

## 🚦 User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management |
| **Developer** | Create/edit projects, chat, attendance |
| **Client** | View projects, limited analytics |

---

## 📱 Responsive Design

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Max width: 1400px

---

## 🔧 Development Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

---

## 📞 Support

**Developer**: Atharva Mokal  
**Version**: 0.1β  
**License**: © 2026 NEXUS PROJECT INTELLIGENCE

---

## 📚 Additional Resources

- Full Documentation: See `project_documentation.md`
- API Reference: `/api` endpoints
- Component Library: `/src/components`

---

*For detailed feature documentation, see the comprehensive guide in the artifacts.*
