import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import HomePage from '../pages/HomePage';
import BusListingPage from '../pages/BusListingPage';
import SeatSelectionPage from '../pages/SeatSelectionPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';

// User Protected Pages
import BookingSummaryPage from '../pages/BookingSummaryPage';
import ConfirmationPage from '../pages/ConfirmationPage';

import MyBookingsPage from '../pages/MyBookingsPage';

// Admin Pages
import DashboardPage from '../pages/admin/DashboardPage';
import BusManagementPage from '../pages/admin/BusManagementPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public Routes */}
                <Route index element={<HomePage />} />
                <Route path="buses" element={<BusListingPage />} />
                <Route path="seats/:busId" element={<SeatSelectionPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />

                {/* User Routes */}
                <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
                    <Route path="booking-details" element={<BookingSummaryPage />} />
                    <Route path="confirmation" element={<ConfirmationPage />} />
                    <Route path="my-bookings" element={<MyBookingsPage />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="admin/dashboard" element={<DashboardPage />} />
                    <Route path="admin/buses" element={<BusManagementPage />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
