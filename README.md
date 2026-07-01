# Car Rental Marketplace Frontend

A full-featured car rental marketplace built with React, Redux Toolkit, Tailwind CSS, and more.

## Tech Stack

- React 18 + Vite
- React Router DOM
- Redux Toolkit
- Axios
- React Hook Form + Zod
- Tailwind CSS
- Framer Motion
- React Hot Toast
- Socket.io Client
- Headless UI

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Features

- Authentication (Login, Register, OTP, Forgot/Reset Password)
- Home page with search, featured cars, categories
- Car listing with filters, sorting, pagination
- Car details with booking widget
- Checkout and booking flow
- Owner dashboard (My Cars, Add/Edit Car)
- Payments, Wishlist, Reviews
- Notifications and Real-time Chat
- Admin panel (Users, Cars, Bookings, Payments, Reports)

## Demo Login

Use the "Demo Login" button on the login page to explore the app without a backend.

## Project Structure

```
src/
├── api/          # API service modules
├── components/   # Reusable UI components
├── pages/        # Page components
├── layouts/      # Layout wrappers
├── routes/       # Routing & guards
├── redux/        # Redux store & slices
├── hooks/        # Custom hooks
├── services/     # Socket & mock data
├── utils/        # Utility functions
├── constants/    # App constants
└── styles/       # Global styles
```
