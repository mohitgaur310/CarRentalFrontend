export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_OTP: '/verify-otp',
  SEARCH: '/search',
  CAR_DETAILS: '/car/:id',
  CHECKOUT: '/checkout',
  BOOKING_SUCCESS: '/booking-success',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  MY_CARS: '/dashboard/my-cars',
  ADD_CAR: '/dashboard/add-car',
  EDIT_CAR: '/dashboard/edit-car/:id',
  DASHBOARD_BOOKINGS: '/dashboard/bookings',
  DASHBOARD_PAYMENTS: '/dashboard/payments',
  DASHBOARD_REVIEWS: '/dashboard/reviews',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  WISHLIST: '/wishlist',
  NOTIFICATIONS: '/notifications',
  CHAT: '/chat',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_CARS: '/admin/cars',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_REPORTS: '/admin/reports',
  MY_BOOKINGS: '/my-bookings',
  BOOKING_DETAILS: '/booking/:id',
  WRITE_REVIEW: '/review/:carId',
  PAYMENT_SUCCESS: '/payment-success',
  PAYMENT_FAILED: '/payment-failed',
  NOT_FOUND: '*',
};

export const USER_ROLES = {
  USER: 'user',
  HOST: 'host',
  ADMIN: 'admin',
};

export const OTP_TYPES = {
  EMAIL_VERIFICATION: 'email_verification',
  PHONE_VERIFICATION: 'phone_verification',
  PASSWORD_RESET: 'password_reset',
};

export const TRANSMISSION_TYPES = ['Automatic', 'Manual'];
export const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
export const CAR_CATEGORIES = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Sports', 'Van'];

export const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const NOTIFICATION_TYPES = {
  BOOKING: 'booking',
  PAYMENT: 'payment',
  REVIEW: 'review',
  CHAT: 'chat',
  SYSTEM: 'system',
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
};

export const DEFAULT_PAGE_SIZE = 12;

export const CAR_SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];
