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
          <button 
            onClick={() => navigate('/farms')}
            className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            Add Farm
          </button>
          <button 
            onClick={() => navigate('/reports')}
            className="px-5 py-2.5 bg-white text-text-dark text-sm font-bold border border-border-light rounded-xl hover:bg-bg-light transition-all cursor-pointer"
          >
            View Reports
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
