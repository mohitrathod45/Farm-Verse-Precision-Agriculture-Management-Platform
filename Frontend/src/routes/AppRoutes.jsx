import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminRoute from './AdminRoute';

import Landing from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

// Farmer Pages
import Dashboard from '../pages/Dashboard/Dashboard';
import Farms from '../pages/Farms/Farms';
import Crops from '../pages/Crops/Crops';
import CropRecommendation from '../pages/CropRecommendation/CropRecommendation';
import Irrigation from '../pages/Irrigation/Irrigation';
import Fertilizer from '../pages/Fertilizer/Fertilizer';
import Reports from '../pages/Reports/Reports';
import Profile from '../pages/Profile/Profile';
import Notifications from '../pages/Notifications/Notifications';
import Help from '../pages/Help/Help';
import NotFound from '../pages/NotFound/NotFound';

// Admin Pages
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminUsers from '../pages/Admin/AdminUsers';
import AdminFarms from '../pages/Admin/AdminFarms';
import AdminCrops from '../pages/Admin/AdminCrops';
import AdminIrrigation from '../pages/Admin/AdminIrrigation';
import AdminFertilizers from '../pages/Admin/AdminFertilizers';
import AdminReports from '../pages/Admin/AdminReports';

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated Layout Wrapper */}
      <Route element={<DashboardLayout />}>

        {/* Shared Profile & Common Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />

        {/* Farmer Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/crops" element={<Crops />} />

        {/* AI Crop Recommendation */}
        <Route
          path="/crop-recommendation"
          element={<CropRecommendation />}
        />

        <Route path="/irrigation" element={<Irrigation />} />
        <Route path="/fertilizer" element={<Fertilizer />} />
        <Route path="/reports" element={<Reports />} />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/farms" element={<AdminFarms />} />
          <Route path="/admin/crops" element={<AdminCrops />} />
          <Route path="/admin/irrigation" element={<AdminIrrigation />} />
          <Route path="/admin/fertilizers" element={<AdminFertilizers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>

      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;