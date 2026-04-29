# Student Management System - Frontend

A modern Next.js 14 frontend application for managing students, grades, and academic records.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TailwindCSS** for styling
- **Axios** for API calls
- **Context API** for state management
- **react-icons** for icons
- **jwt-decode** for JWT token parsing

## Features

- 🔐 **Authentication** - JWT-based login system
- 👥 **Student Management** - CRUD operations for students
- 📊 **Grade Management** - Assign and view grades with automatic calculations
- ✅ **Character Checker** - Compare text inputs with match highlighting
- 📱 **Responsive Design** - Mobile-friendly with hamburger menu
- 🎨 **Modern UI** - Clean, professional interface with TailwindCSS

## Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout with AuthProvider
│   ├── page.js                # Home page (redirects to dashboard/login)
│   ├── login/
│   │   └── page.js            # Login page
│   ├── dashboard/
│   │   └── page.js            # Dashboard with stats
│   ├── students/
│   │   └── page.js            # Student management
│   ├── grades/
│   │   └── page.js            # Grade assignment and report
│   └── checker/
│       └── page.js            # Character checker tool
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   └── TopBar.jsx         # Top navigation bar
│   ├── ui/
│   │   ├── Modal.jsx          # Reusable modal component
│   │   ├── ConfirmDialog.jsx  # Confirmation dialog
│   │   └── Pagination.jsx     # Pagination component
│   └── PrivateRoute.jsx       # Protected route wrapper
├── context/
│   └── AuthContext.jsx        # Authentication context
└── api/
    ├── axiosInstance.js       # Configured axios instance
    ├── auth.api.js            # Authentication API calls
    ├── students.api.js        # Student API calls
    ├── subjects.api.js        # Subject API calls
    ├── grades.api.js          # Grade API calls
    └── checker.api.js         # Checker API calls
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (default: http://localhost:3000)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3000` |

## Pages

### Login (`/login`)
- Email and password authentication
- JWT token storage in localStorage
- Auto-redirect to dashboard on success

### Dashboard (`/dashboard`)
- Welcome message with user info
- Summary cards: Total Students, Total Subjects, Total Grades
- Quick action links

### Students (`/students`)
- Paginated student list
- Add/Edit student modal
- Delete confirmation dialog
- Fields: name, studentId, class, age

### Grades (`/grades`)
- Grade assignment form
- Student and subject dropdowns
- Score and attendance inputs
- Grade report table with:
  - Student name
  - Subject
  - Score
  - Attendance
  - Grade letter
  - Final score (score + 5 if attendance >= 80%)
  - Status (Pass/Fail based on final score >= 60)
- Color-coded rows (green for Pass, red for Fail)

### Checker (`/checker`)
- Two text input fields
- Case sensitivity toggle
- Match percentage display
- Character match breakdown
- Highlighted matched characters

## API Integration

All API calls are made through the axios instance with automatic JWT token attachment. The instance handles:

- Base URL configuration
- Authorization header injection
- 401 error handling (auto-logout)
- Request/response interceptors

## Authentication Flow

1. User logs in via `/login`
2. JWT token received and stored in localStorage
3. Token decoded to extract user info
4. AuthContext provides `user`, `isAuthenticated`, `login()`, `logout()`
5. PrivateRoute component protects authenticated pages
6. Axios interceptor attaches token to all requests
7. 401 responses trigger automatic logout

## Styling

- TailwindCSS utility classes
- Responsive design (mobile-first)
- Custom color scheme:
  - Primary: Blue (#2563eb)
  - Success: Green (#16a34a)
  - Danger: Red (#dc2626)
  - Warning: Yellow (#eab308)

## Components

### Layout Components
- **Sidebar**: Navigation menu with active state highlighting
- **TopBar**: User info and mobile menu toggle

### UI Components
- **Modal**: Reusable modal with backdrop
- **ConfirmDialog**: Confirmation dialog for destructive actions
- **Pagination**: Page navigation with items-per-page selector
- **PrivateRoute**: HOC for protected routes

## Development Notes

- Uses Next.js 14 App Router (not Pages Router)
- Client components marked with `'use client'`
- Server-side rendering disabled for authenticated pages
- All icons from `react-icons/fi` (Feather Icons)

## Demo Credentials

```
Email: admin@example.com
Password: password123
```

## Troubleshooting

### CORS Issues
Ensure backend has CORS enabled for the frontend origin.

### Token Expiration
Tokens are validated on mount. Expired tokens trigger auto-logout.

### API Connection
Check `NEXT_PUBLIC_API_URL` matches your backend URL.

## License

MIT
