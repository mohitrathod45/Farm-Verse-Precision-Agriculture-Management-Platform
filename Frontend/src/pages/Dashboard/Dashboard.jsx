import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiMap2Line, RiPlantLine, RiDropLine, RiFlaskLine, RiBarChart2Line } from 'react-icons/ri';
import api from '../../services/api';
import { formatDate } from '../../utils/dateUtils';
import StatCard from './components/StatCard';
import QuickActions from './components/QuickActions';
import FarmTable from './components/FarmTable';
import CropProgress from './components/CropProgress';
import WeatherWidget from './components/WeatherWidget';
import UpcomingTasks from './components/UpcomingTasks';
import RecentActivity from './components/RecentActivity';
import FarmSummary from './components/FarmSummary';
import ChartsSection from './components/ChartsSection';

const Dashboard = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    farms: 0,
    crops: 0,
    irrigation: 0,
    fertilizers: 0,
    reports: 0,
  });

  const [farmsList, setFarmsList]         = useState([]);
  const [cropsList, setCropsList]         = useState([]);
  const [irrigationList, setIrrigationList] = useState([]);
  const [fertList, setFertList]           = useState([]);
  const [repList, setRepList]             = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [tasksList, setTasksList]         = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [farmRes, cropRes, irrRes, fertRes, repRes] = await Promise.all([
          api.get('/farms/getallfarms').catch(() => ({ data: [] })),
          api.get('/crops/getallcrops').catch(() => ({ data: [] })),
          api.get('/irrigation/getallirrigation').catch(() => ({ data: [] })),
          api.get('/fertilizers/getallfertilizers').catch(() => ({ data: [] })),
          api.get('/reports/getallreports').catch(() => ({ data: [] })),
        ]);

        const farmsData = farmRes.data || [];
        const cropsData = cropRes.data || [];
        const irrData   = irrRes.data || [];
        const fertData  = fertRes.data || [];
        const repData   = repRes.data || [];

        setFarmsList(farmsData);
        setCropsList(cropsData);
        setIrrigationList(irrData);
        setFertList(fertData);
        setRepList(repData);

        setCounts({
          farms: farmsData.length,
          crops: cropsData.length,
          irrigation: irrData.length,
          fertilizers: fertData.length,
          reports: repData.length,
        });

        // ── 1. Generate Recent Activities ────────────────────
        const farmNameMap = {};
        farmsData.forEach(f => { farmNameMap[f.farmId] = f.farmName; });

        const rawActivities = [];

        farmsData.forEach(f => {
          rawActivities.push({
            id: f.farmId || 0,
            type: 'farm',
            title: `Added Farm: ${f.farmName}`,
            subtitle: `${f.location || 'Location not specified'} · ${f.area || 0} Acres`,
          });
        });

        cropsData.forEach(c => {
          const farmName = farmNameMap[c.farmId] || `Farm #${c.farmId}`;
          rawActivities.push({
            id: c.cropId || 0,
            type: 'crop',
            title: `Added Crop: ${c.cropName}`,
            subtitle: `${farmName} · ${c.season || 'Season'} · ${c.status || 'Growing'}`,
          });
        });

        irrData.forEach(i => {
          const farmName = farmNameMap[i.farmId] || `Farm #${i.farmId}`;
          rawActivities.push({
            id: i.irrigationId || 0,
            type: 'irrigation',
            title: `Scheduled Irrigation: ${i.irrigationType || 'Watering'}`,
            subtitle: `${farmName} · ${i.waterQuantity ? i.waterQuantity + ' Litres' : 'Standard'}`,
          });
        });

        fertData.forEach(ft => {
          const farmName = farmNameMap[ft.farmId] || `Farm #${ft.farmId}`;
          rawActivities.push({
            id: ft.fertilizerId || 0,
            type: 'fertilizer',
            title: `Added Fertilizer: ${ft.fertilizerName}`,
            subtitle: `${farmName} · ${ft.quantity ? ft.quantity + ' kg' : 'Standard'}`,
          });
        });

        repData.forEach(r => {
          const farmName = farmNameMap[r.farmId] || `Farm #${r.farmId}`;
          rawActivities.push({
            id: r.reportId || 0,
            type: 'report',
            title: `Created Report: ${r.reportType || 'General'}`,
            subtitle: `${farmName} · ${formatDate(r.reportDate)}`,
          });
        });

        // Sort latest IDs first
        rawActivities.sort((a, b) => b.id - a.id);
        setActivitiesList(rawActivities.slice(0, 6));

        // ── 2. Generate Upcoming Tasks ───────────────────────
        const rawTasks = [];

        cropsData.forEach(c => {
          if (c.harvestingDate) {
            const farmName = farmNameMap[c.farmId] || `Farm #${c.farmId}`;
            rawTasks.push({
              title: `Harvest Crop: ${c.cropName}`,
              date: `${formatDate(c.harvestingDate)} (${farmName})`,
              rawDate: new Date(c.harvestingDate).getTime(),
            });
          }
        });

        fertData.forEach(ft => {
          if (ft.applicationDate) {
            const farmName = farmNameMap[ft.farmId] || `Farm #${ft.farmId}`;
            rawTasks.push({
              title: `Apply Fertilizer: ${ft.fertilizerName}`,
              date: `${formatDate(ft.applicationDate)} (${farmName})`,
              rawDate: new Date(ft.applicationDate).getTime(),
            });
          }
        });

        irrData.forEach(i => {
          if (i.scheduleDate) {
            const farmName = farmNameMap[i.farmId] || `Farm #${i.farmId}`;
            rawTasks.push({
              title: `Irrigation: ${i.irrigationType || 'Watering'}`,
              date: `${formatDate(i.scheduleDate)} (${farmName})`,
              rawDate: new Date(i.scheduleDate).getTime(),
            });
          }
        });

        repData.forEach(r => {
          if (r.reportDate) {
            const farmName = farmNameMap[r.farmId] || `Farm #${r.farmId}`;
            rawTasks.push({
              title: `Review Report: ${r.reportType || 'Analytics'}`,
              date: `${formatDate(r.reportDate)} (${farmName})`,
              rawDate: new Date(r.reportDate).getTime(),
            });
          }
        });

        // Sort nearest dates first
        rawTasks.sort((a, b) => (a.rawDate || 0) - (b.rawDate || 0));
        setTasksList(rawTasks.slice(0, 5));

      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { title: 'Total Farms', value: loading ? '...' : counts.farms.toString(), icon: RiMap2Line, colorClass: 'text-primary' },
    { title: 'Total Crops', value: loading ? '...' : counts.crops.toString(), icon: RiPlantLine, colorClass: 'text-secondary' },
    { title: 'Total Irrigation Records', value: loading ? '...' : counts.irrigation.toString(), icon: RiDropLine, colorClass: 'text-sky' },
    { title: 'Total Fertilizers', value: loading ? '...' : counts.fertilizers.toString(), icon: RiFlaskLine, colorClass: 'text-amber-500' },
    { title: 'Total Reports', value: loading ? '...' : counts.reports.toString(), icon: RiBarChart2Line, colorClass: 'text-accent' },
  ];

  const userFullName = localStorage.getItem('fullName') || 'Farmer';

  return (
    <>
      {/* Welcome Hero */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-700/50 mb-8 flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden text-white">
        {/* Soft Nature/Green Glow & Decorative Watermark */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none translate-x-1/4 -translate-y-1/4" />
        <div className="absolute -bottom-10 right-1/3 w-60 h-60 bg-emerald-900/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block text-emerald-200">
          <RiPlantLine className="text-[170px]" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-2xl mb-6 md:mb-0">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-emerald-100 font-semibold text-xs mb-3 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>{today}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 font-display">
            Welcome back, {userFullName}! 🌱
          </h1>
          <p className="text-emerald-100/90 text-sm leading-relaxed">
            Manage your farms, crops, irrigation schedules, fertilizer usage, and agricultural activities from one centralized dashboard.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => navigate('/farms')}
            className="px-5 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 text-sm font-extrabold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Add Farm</span>
          </button>
          <button 
            onClick={() => navigate('/reports')}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>View Reports</span>
          </button>
        </div>
      </div>

      {/* 5 Live Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Analytics Charts */}
      <ChartsSection
        farms={farmsList}
        crops={cropsList}
        irrigations={irrigationList}
        fertilizers={fertList}
        reports={repList}
        loading={loading}
      />

      {/* Two-column grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <FarmTable farms={farmsList} loading={loading} />
          <CropProgress crops={cropsList} loading={loading} />
          <QuickActions />
        </div>
        <div className="xl:col-span-4 space-y-6">
          <WeatherWidget />
          <UpcomingTasks tasks={tasksList} loading={loading} />
          <RecentActivity activities={activitiesList} loading={loading} />
          <FarmSummary farms={farmsList} crops={cropsList} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;