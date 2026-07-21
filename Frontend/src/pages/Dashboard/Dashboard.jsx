import { RiMap2Line, RiPlantLine, RiDropLine, RiBarChart2Line } from 'react-icons/ri';
import StatCard from './components/StatCard';
import QuickActions from './components/QuickActions';
import FarmTable from './components/FarmTable';
import CropProgress from './components/CropProgress';
import WeatherWidget from './components/WeatherWidget';
import UpcomingTasks from './components/UpcomingTasks';
import RecentActivity from './components/RecentActivity';
import FarmSummary from './components/FarmSummary';

const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const stats = [
    { title: 'Total Farms', value: '3', icon: RiMap2Line, colorClass: 'text-primary' },
    { title: 'Active Crops', value: '12', subtitle: '+2 this month', icon: RiPlantLine, colorClass: 'text-secondary' },
    { title: 'Upcoming Irrigation', value: '5', icon: RiDropLine, colorClass: 'text-sky' },
    { title: 'Total Reports', value: '18', icon: RiBarChart2Line, colorClass: 'text-accent' },
  ];

  const userFullName = localStorage.getItem('fullName') || 'Farmer';

  return (
    <>
      {/* Welcome Hero */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border-light mb-8 flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="relative z-10 max-w-2xl mb-6 md:mb-0">
          <p className="text-primary font-bold text-sm mb-2 uppercase tracking-wide">{today}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-dark mb-2">
            Welcome back, {userFullName}! 🌱
          </h1>
          <p className="text-text-muted text-sm">
            Manage your farms, crops, irrigation schedules, fertilizer usage, and agricultural activities from one centralized dashboard.
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3">
          <button className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-primary/90 transition-all">Add Farm</button>
          <button className="px-5 py-2.5 bg-white text-text-dark text-sm font-bold border border-border-light rounded-xl hover:bg-bg-light transition-all">View Reports</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <FarmTable />
          <CropProgress />
          <QuickActions />
        </div>
        <div className="xl:col-span-4 space-y-6">
          <WeatherWidget />
          <UpcomingTasks />
          <RecentActivity />
          <FarmSummary />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
