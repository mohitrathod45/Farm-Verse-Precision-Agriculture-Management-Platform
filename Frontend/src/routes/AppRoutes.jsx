import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

import Landing from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

import Dashboard from '../pages/Dashboard/Dashboard';
import Farms from '../pages/Farms/Farms';
import Crops from '../pages/Crops/Crops';
import Irrigation from '../pages/Irrigation/Irrigation';
import Fertilizer from '../pages/Fertilizer/Fertilizer';
import Reports from '../pages/Reports/Reports';
import Profile from '../pages/Profile/Profile';
import Notifications from '../pages/Notifications/Notifications';
import Help from '../pages/Help/Help';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated routes — wrapped in DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/irrigation" element={<Irrigation />} />
        <Route path="/fertilizer" element={<Fertilizer />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
