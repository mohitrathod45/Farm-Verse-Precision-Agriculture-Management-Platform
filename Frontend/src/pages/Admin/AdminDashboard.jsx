import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RiGroupLine,
  RiMap2Line,
  RiPlantLine,
  RiDropLine,
  RiFlaskLine,
  RiBarChart2Line,
  RiArrowRightLine,
  RiUser3Line,
  RiCalendarLine,
} from 'react-icons/ri';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFarms: 0,
    totalCrops: 0,
    totalIrrigation: 0,
    totalFertilizers: 0,
    totalReports: 0,
    recentUsers: [],
    recentFarms: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/stats');
      setStats(res.data || {});
    } catch (error) {
      toast.error('Failed to load admin dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers || 0,
      icon: RiGroupLine,
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      link: '/admin/users',
      subtitle: 'Registered Farmers & Admins',
    },
    {
      title: 'Total Farms',
      value: stats.totalFarms || 0,
      icon: RiMap2Line,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-700',
      link: '/admin/farms',
      subtitle: 'Monitored Agricultural Land',
    },
    {
      title: 'Total Crops',
      value: stats.totalCrops || 0,
      icon: RiPlantLine,
      color: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-700',
      link: '/admin/crops',
      subtitle: 'Active & Harvested Crops',
    },
    {
      title: 'Total Irrigation',
      value: stats.totalIrrigation || 0,
      icon: RiDropLine,
      color: 'bg-cyan-500',
      lightBg: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      link: '/admin/irrigation',
      subtitle: 'Watering Schedules',
    },
    {
      title: 'Total Fertilizers',
      value: stats.totalFertilizers || 0,
      icon: RiFlaskLine,
      color: 'bg-amber-500',
      lightBg: 'bg-amber-50',
      textColor: 'text-amber-700',
      link: '/admin/fertilizers',
      subtitle: 'Applications Logged',
    },
    {
      title: 'Total Reports',
      value: stats.totalReports || 0,
      icon: RiBarChart2Line,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-700',
      link: '/admin/reports',
      subtitle: 'Agronomy Reports Filed',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center space-x-3 text-primary font-semibold">
          <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading System Overview...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            System Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display mt-3">
            Admin Overview & Analytics
          </h1>
          <p className="text-emerald-100 text-sm mt-1 max-w-xl">
            Monitor system-wide agricultural data, registered farmers, farm land holdings, crops, and resource logs across FarmVerse.
          </p>
        </div>
      </div>

      {/* Global Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white rounded-2xl p-6 shadow-sm border border-border-light hover:shadow-md hover:border-primary/30 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    {card.title}
                  </p>
                  <p className="text-3xl font-extrabold font-display text-text-dark mt-2">
                    {card.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${card.lightBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`text-2xl ${card.textColor}`} />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border-light/60 flex items-center justify-between">
                <span className="text-xs text-text-muted font-medium">
                  {card.subtitle}
                </span>
                <span className="text-xs font-bold text-primary flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>View</span>
                  <RiArrowRightLine />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registered Farmers */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border-light space-y-4">
          <div className="flex items-center justify-between border-b border-border-light pb-4">
            <div>
              <h2 className="text-lg font-bold text-text-dark font-display">Recent Registrations</h2>
              <p className="text-xs text-text-muted">Latest registered users in FarmVerse</p>
            </div>
            <Link to="/admin/users" className="text-xs font-bold text-primary hover:underline flex items-center space-x-1">
              <span>All Users</span>
              <RiArrowRightLine />
            </Link>
          </div>

          <div className="divide-y divide-border-light/60">
            {stats.recentUsers && stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((u) => (
                <div key={u.userId} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {u.fullName ? u.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-dark">{u.fullName || 'Farmer'}</p>
                      <p className="text-xs text-text-muted">{u.email}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${u.role === 'Admin' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {u.role || 'Farmer'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-muted py-4 text-center">No users registered yet.</p>
            )}
          </div>
        </div>

        {/* Recent Registered Farms */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border-light space-y-4">
          <div className="flex items-center justify-between border-b border-border-light pb-4">
            <div>
              <h2 className="text-lg font-bold text-text-dark font-display">Recent Farms</h2>
              <p className="text-xs text-text-muted">Latest agricultural land added</p>
            </div>
            <Link to="/admin/farms" className="text-xs font-bold text-primary hover:underline flex items-center space-x-1">
              <span>All Farms</span>
              <RiArrowRightLine />
            </Link>
          </div>

          <div className="divide-y divide-border-light/60">
            {stats.recentFarms && stats.recentFarms.length > 0 ? (
              stats.recentFarms.map((f) => (
                <div key={f.farmId} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                      <RiMap2Line className="text-base" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-dark">{f.farmName}</p>
                      <p className="text-xs text-text-muted">{f.location || 'N/A'} • {f.area ? `${f.area} Acres` : 'N/A'}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-muted bg-bg-light px-2.5 py-1 rounded-lg">
                    {f.soilType || 'Soil Logged'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-muted py-4 text-center">No farms added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
