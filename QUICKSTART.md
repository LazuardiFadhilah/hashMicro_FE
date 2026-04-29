# Quick Start Guide

Get the Student Management System frontend up and running in 3 minutes!

## Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:3000`

## Setup Steps

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

The `.env.local` file is already created with default settings:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

If your backend runs on a different URL, update this file.

### 3. Start Development Server

```bash
npm run dev
```

The app will start on **http://localhost:3001**

### 4. Login

Open your browser to [http://localhost:3001](http://localhost:3001)

Use these demo credentials:
- **Email**: `admin@example.com`
- **Password**: `password123`

## What's Next?

After logging in, you'll see the dashboard with:

1. **Dashboard** - Overview with statistics
2. **Students** - Manage student records
3. **Grades** - Assign and view grades
4. **Checker** - Character comparison tool

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   ├── components/       # Reusable components
│   ├── context/          # React Context (Auth)
│   └── api/              # API integration layer
├── .env.local            # Environment variables
└── package.json          # Dependencies
```

## Available Scripts

```bash
npm run dev      # Start development server (port 3001)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Features Overview

### 🔐 Authentication
- JWT-based login
- Auto-redirect on authentication
- Protected routes

### 👥 Students Page
- View all students (paginated)
- Add new students
- Edit existing students
- Delete students (soft delete)

### 📊 Grades Page
- Assign grades to students
- Select student and subject from dropdowns
- Enter score (0-100) and attendance (0-100)
- View grade report with:
  - Automatic grade letter calculation
  - Final score (bonus +5 if attendance >= 80%)
  - Pass/Fail status (Pass if final score >= 60)
  - Color-coded rows (green = Pass, red = Fail)

### ✅ Checker Page
- Compare two text inputs
- Case-sensitive or non-sensitive matching
- Visual percentage display
- Highlighted matched characters

## Troubleshooting

### Port Already in Use

If port 3001 is busy, change it in `package.json`:

```json
"dev": "next dev -p 3002"
```

### Cannot Connect to Backend

1. Verify backend is running on port 3000
2. Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
3. Ensure backend has CORS enabled

### Login Fails

1. Check backend is running
2. Verify credentials exist in backend database
3. Check browser console for errors

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## API Endpoints Used

The frontend connects to these backend endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/students` - Get students (paginated)
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/subjects` - Get all subjects
- `POST /api/grades` - Assign grade
- `GET /api/grades/report` - Get grade report
- `POST /api/checker` - Check character matches

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Icons**: react-icons (Feather Icons)
- **Auth**: JWT with localStorage

## Need Help?

Check the main [README.md](./README.md) for detailed documentation.

## Production Deployment

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables for Production

Update `.env.local` or set environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## Development Tips

1. **Hot Reload**: Changes auto-refresh in dev mode
2. **Console Logs**: Check browser console for API errors
3. **Network Tab**: Monitor API calls in browser DevTools
4. **React DevTools**: Install for component debugging

Enjoy building with the Student Management System! 🚀
