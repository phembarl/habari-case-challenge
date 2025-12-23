# Habari Challenge - Email Dashboard Application

A modern, responsive email dashboard built with React, TypeScript, and Tailwind CSS. Features a complete authentication system, real-time email management, analytics dashboard, and mobile-responsive design.

## 🚀 Features

### 📧 Email Management
- **Real-time Email List** - Browse emails with pagination and search
- **Debounced Search** - Efficient email filtering with 500ms debounce
- **Email Actions** - Star/unstar, mark as read/unread, delete emails
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Email Sidebar** - Quick access to folders and labels

### 📊 Analytics Dashboard
- **Interactive Charts** - Line charts, bar charts, and progress indicators
- **Key Metrics** - Total spend, visitors, acquisition, and revenue tracking
- **Responsive Layouts** - Charts adapt to screen size
- **Time Filters** - View data for 7 days, 14 days, or 1 month

### 🔐 Authentication
- **Secure Login** - JWT token-based authentication
- **Protected Routes** - Route guards for authenticated pages
- **Auto-refresh** - Seamless token management
- **Logout Functionality** - Secure session termination

### 🎨 Modern UI/UX
- **Responsive Sidebar** - Collapsible navigation with mobile toggle
- **Dark/Light Elements** - Consistent design system
- **Loading States** - Smooth user experience with loading indicators
- **Error Handling** - Graceful error states with retry options

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router v6
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: React Icons
- **HTTP Client**: Fetch API with custom ApiClient
- **Build Tool**: Vite
- **Utilities**: use-debounce

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd habari-challenge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The application will start and be available at `http://localhost:3002` (or the next available port).

### 4. Login Credentials
Use the following demo credentials to access the application:

- **Email**: `sarah.johnson@techcorp.com`
- **Password**: `SecurePass123!`

## 🔧 Available Scripts

### Development
```bash
# Start development server
npm run dev

# Start development server with host exposure
npm run dev -- --host
```

### Building
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Run TypeScript type checking
npm run typecheck
```

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── auth.ts            # Authentication API
│   ├── client.ts          # HTTP client wrapper
│   └── email.ts           # Email API
├── components/            # Reusable components
│   ├── charts/           # Chart components
│   ├── EmailItem.tsx     # Email list item
│   ├── EmailList.tsx     # Email list container
│   ├── EmailSidebar.tsx  # Email navigation
│   ├── Header.tsx        # Main header
│   ├── Layout.tsx        # App layout wrapper
│   ├── ProtectedRoute.tsx # Route protection
│   └── Sidebar.tsx       # Main navigation
├── contexts/             # React contexts
│   ├── auth.ts          # Auth context definition
│   └── AuthContext.tsx  # Auth provider
├── hooks/               # Custom hooks
│   └── useAuth.ts       # Authentication hook
├── models/              # TypeScript interfaces
│   ├── auth.ts         # Auth types
│   ├── email.ts        # Email types
│   └── index.ts        # Type exports
├── pages/               # Page components
│   ├── Email.tsx        # Email dashboard
│   ├── Login.tsx        # Login page
│   ├── Marketing.tsx    # Analytics dashboard
│   └── NotFound.tsx     # 404 page
├── queriesandmutations/ # React Query hooks
│   ├── auth.ts         # Auth queries
│   └── email.ts        # Email queries
├── utils/              # Utility functions
│   └── index.ts        # Navigation items
├── App.tsx             # Root component
└── main.tsx           # App entry point
```

## 🌐 API Integration

The application integrates with the following API endpoints:

- **Base URL**: `https://test-api.squadinc.co/email-list/v1/api`
- **Authentication**: `/auth/login`
- **Emails**: `/emails`

### Authentication Flow
1. User submits login credentials
2. API returns JWT token and user data
3. Token stored in localStorage
4. Subsequent requests include Bearer token
5. Auto-logout on token expiration

### Email Operations
- **GET /emails** - Fetch email list with pagination and search
- **PATCH /emails/:id/star** - Toggle email star status
- **PATCH /emails/:id/read** - Mark email as read
- **DELETE /emails/:id** - Delete email

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: `< 768px` - Stacked layout, hidden sidebar
- **Tablet**: `768px - 1024px` - Mixed layouts
- **Desktop**: `> 1024px` - Full sidebar, side-by-side layouts

### Mobile Features
- Hamburger menu for navigation
- Collapsible sidebar with backdrop
- Touch-friendly buttons and inputs
- Optimized chart sizes
- Responsive typography

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Route Protection** - Authenticated route guards
- **Token Auto-refresh** - Seamless session management
- **Secure Storage** - LocalStorage with proper cleanup
- **HTTPS API** - Encrypted API communications

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Environment Variables
No environment variables required - API base URL is configured in the code.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

Built with ❤️ for the Habari Challenge

---

## 🔧 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or start on different port
npm run dev -- --port 3001
```

**Build failures**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

**Authentication issues**
- Ensure API is accessible
- Check network connectivity
- Verify credentials are correct
- Clear browser storage if needed

### Performance Tips

- Enable React DevTools for debugging
- Use browser network tab to monitor API calls
- Check console for any error messages
- Ensure stable internet connection for API calls

---

For more information or support, please open an issue in the repository.
