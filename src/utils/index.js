import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date, format = 'DD MMM YYYY') => {
  return dayjs(date).format(format);
};

export const formatRelativeTime = (date) => {
  return dayjs(date).fromNow();
};

export const calculateDays = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, 'day');
  return days > 0 ? days : 1;
};

export const calculateBookingPrice = (pricePerDay, startDate, endDate, discount = 0) => {
  const days = calculateDays(startDate, endDate);
  const subtotal = pricePerDay * days;
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.18;
  const total = subtotal - discountAmount + tax;
  return { days, subtotal, discountAmount, tax, total };
};

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const getErrorMessage = (error) => {
  const data = error?.response?.data;
  if (data?.errors?.length) {
    return data.errors.map((e) => e.message).join(', ');
  }
  if (error?.errors?.length) {
    return error.errors.map((e) => e.message).join(', ');
  }
  if (data?.message) return data.message;
  if (error?.message) return error.message;
  return 'Something went wrong. Please try again.';
};

export const getDisplayName = (user) => {
  if (!user) return '';
  return (
    user.fullName ||
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    user.name ||
    ''
  );
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const generateStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));
};
