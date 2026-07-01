import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import PageLoader from '../components/Loader/PageLoader';
import { USER_ROLES } from '../constants';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const VerifyOtp = lazy(() => import('../pages/auth/VerifyOtp'));
const Search = lazy(() => import('../pages/Search'));
const CarDetails = lazy(() => import('../pages/CarDetails'));
const Checkout = lazy(() => import('../pages/Checkout'));
const BookingSuccess = lazy(() => import('../pages/BookingSuccess'));
const MyBookings = lazy(() => import('../pages/MyBookings'));
const BookingDetails = lazy(() => import('../pages/BookingDetails'));
const Profile = lazy(() => import('../pages/Profile'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Chat = lazy(() => import('../pages/Chat'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const MyCars = lazy(() => import('../pages/dashboard/MyCars'));
const AddCar = lazy(() => import('../pages/dashboard/AddCar'));
const EditCar = lazy(() => import('../pages/dashboard/EditCar'));
const DashboardBookings = lazy(() => import('../pages/dashboard/DashboardBookings'));
const DashboardPayments = lazy(() => import('../pages/dashboard/DashboardPayments'));
const DashboardReviews = lazy(() => import('../pages/dashboard/DashboardReviews'));
const DashboardSettings = lazy(() => import('../pages/dashboard/DashboardSettings'));

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const AdminCars = lazy(() => import('../pages/admin/AdminCars'));
const AdminBookings = lazy(() => import('../pages/admin/AdminBookings'));
const AdminPayments = lazy(() => import('../pages/admin/AdminPayments'));
const AdminReports = lazy(() => import('../pages/admin/AdminReports'));

const LazyRoute = ({ element }) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LazyRoute element={<Home />} />} />
        <Route path="search" element={<LazyRoute element={<Search />} />} />
        <Route path="car/:id" element={<LazyRoute element={<CarDetails />} />} />
        <Route path="checkout" element={<LazyRoute element={<Checkout />} />} />
        <Route path="booking-success" element={<LazyRoute element={<BookingSuccess />} />} />
        <Route path="my-bookings" element={<LazyRoute element={<AuthGuard><MyBookings /></AuthGuard>} />} />
        <Route path="booking/:id" element={<LazyRoute element={<AuthGuard><BookingDetails /></AuthGuard>} />} />
        <Route path="profile" element={<LazyRoute element={<AuthGuard><Profile /></AuthGuard>} />} />
        <Route path="wishlist" element={<LazyRoute element={<AuthGuard><Wishlist /></AuthGuard>} />} />
        <Route path="notifications" element={<LazyRoute element={<AuthGuard><Notifications /></AuthGuard>} />} />
        <Route path="chat" element={<LazyRoute element={<AuthGuard><Chat /></AuthGuard>} />} />
      </Route>

      <Route path="login" element={<LazyRoute element={<GuestGuard><Login /></GuestGuard>} />} />
      <Route path="register" element={<LazyRoute element={<GuestGuard><Register /></GuestGuard>} />} />
      <Route path="forgot-password" element={<LazyRoute element={<GuestGuard><ForgotPassword /></GuestGuard>} />} />
      <Route path="reset-password" element={<LazyRoute element={<GuestGuard><ResetPassword /></GuestGuard>} />} />
      <Route path="verify-otp" element={<LazyRoute element={<VerifyOtp />} />} />

      <Route path="dashboard" element={<AuthGuard><DashboardLayout /></AuthGuard>}>
        <Route index element={<LazyRoute element={<Dashboard />} />} />
        <Route path="my-cars" element={<LazyRoute element={<MyCars />} />} />
        <Route path="add-car" element={<LazyRoute element={<AddCar />} />} />
        <Route path="edit-car/:id" element={<LazyRoute element={<EditCar />} />} />
        <Route path="bookings" element={<LazyRoute element={<DashboardBookings />} />} />
        <Route path="payments" element={<LazyRoute element={<DashboardPayments />} />} />
        <Route path="reviews" element={<LazyRoute element={<DashboardReviews />} />} />
        <Route path="settings" element={<LazyRoute element={<DashboardSettings />} />} />
      </Route>

      <Route path="admin" element={<AuthGuard allowedRoles={[USER_ROLES.ADMIN]}><AdminLayout /></AuthGuard>}>
        <Route index element={<LazyRoute element={<AdminDashboard />} />} />
        <Route path="users" element={<LazyRoute element={<AdminUsers />} />} />
        <Route path="cars" element={<LazyRoute element={<AdminCars />} />} />
        <Route path="bookings" element={<LazyRoute element={<AdminBookings />} />} />
        <Route path="payments" element={<LazyRoute element={<AdminPayments />} />} />
        <Route path="reports" element={<LazyRoute element={<AdminReports />} />} />
      </Route>

      <Route path="*" element={<LazyRoute element={<NotFound />} />} />
    </Routes>
  );
};

export default AppRoutes;
