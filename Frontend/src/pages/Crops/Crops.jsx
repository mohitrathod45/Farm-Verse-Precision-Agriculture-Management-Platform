import { useState } from 'react';
import { RiAddLine, RiSearchLine, RiFilterLine, RiPlantLine, RiSunLine, RiCalendarLine } from 'react-icons/ri';

const cropsData = [
  { id: 1, name: 'Rice', farm: 'Green Valley Farm', season: 'Kharif', area: '2 Acres', planted: '15 Jun 2026', harvest: '20 Oct 2026', progress: 70, status: 'Growing', statusColor: 'bg-green-100 text-green-700' },
  { id: 2, name: 'Tomato', farm: 'Organic Field', season: 'Rabi', area: '3 Acres', planted: '10 Jan 2026', harvest: '15 Apr 2026', progress: 45, status: 'Flowering', statusColor: 'bg-yellow-100 text-yellow-700' },
  { id: 3, name: 'Maize', farm: 'Riverside Farm', season: 'Kharif', area: '4 Acres', planted: '01 May 2026', harvest: '25 Aug 2026', progress: 90, status: 'Harvest Ready', statusColor: 'bg-orange-100 text-orange-700' },
  { id: 4, name: 'Groundnut', farm: 'Sunny Farm', season: 'Kharif', area: '3 Acres', planted: '20 Jun 2026', harvest: '30 Nov 2026', progress: 60, status: 'Growing', statusColor: 'bg-green-100 text-green-700' },
  { id: 5, name: 'Cotton', farm: 'Hilltop Acres', season: 'Kharif', area: '2 Acres', planted: '01 Jul 2026', harvest: '15 Dec 2026', progress: 30, status: 'Seedling', statusColor: 'bg-blue-100 text-blue-700' },
  { id: 6, name: 'Wheat', farm: 'Green Valley Farm', season: 'Rabi', area: '3 Acres', planted: '15 Nov 2025', harvest: '20 Mar 2026', progress: 100, status: 'Harvested', statusColor: 'bg-gray-100 text-gray-600' },
];

const progressColor = (p) => {
  if (p >= 80) return 'bg-orange-500';
  if (p >= 50) return 'bg-primary';
  return 'bg-sky';
};

const Crops = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = cropsData.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.farm.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || c.season === filter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark">Crop Management</h1>
          <p className="text-sm text-text-muted mt-1">Track all your crops, growth stages, and harvest timelines.</p>
        </div>
        <button className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-primary/90 transition-all">
          <RiAddLine className="text-lg" />
          <span>Add Crop</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search crops..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
        </div>
        <div className="relative">
          <RiFilterLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <select value={filter} onChange={e => setFilter(e.target.value)} className="pl-10 pr-8 py-2.5 bg-white border border-border-light rounded-xl text-sm font-semibold text-text-dark appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            <option>All</option>
            <option>Kharif</option>
            <option>Rabi</option>
          </select>
        </div>
      </div>

      {/* Crop Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filtered.map(crop => (
          <div key={crop.id} className="bg-white rounded-2xl p-5 shadow-sm border border-border-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <RiPlantLine className="text-xl" />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${crop.statusColor}`}>{crop.status}</span>
            </div>
            <h3 className="text-base font-bold text-text-dark">{crop.name}</h3>
            <p className="text-xs text-text-muted mt-0.5 mb-3">{crop.farm} · {crop.area}</p>
            <div className="flex items-center space-x-3 text-xs text-text-muted mb-4">
              <span className="flex items-center space-x-1"><RiSunLine className="text-accent" /><span>{crop.season}</span></span>
              <span className="flex items-center space-x-1"><RiCalendarLine className="text-sky" /><span>{crop.harvest}</span></span>
            </div>
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-text-muted">Growth</span>
                <span className="text-xs font-bold text-text-dark">{crop.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className={`${progressColor(crop.progress)} h-2 rounded-full transition-all duration-700`} style={{ width: `${crop.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Crop Table */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
        <h3 className="text-lg font-bold text-text-dark mb-5">All Crops</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light">
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Crop</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Farm</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Season</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Area</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Harvest</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Progress</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-bg-light/60 transition-colors">
                  <td className="py-3.5 px-4 text-sm font-bold text-text-dark">{c.name}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{c.farm}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{c.season}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{c.area}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{c.harvest}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5"><div className={`${progressColor(c.progress)} h-1.5 rounded-full`} style={{ width: `${c.progress}%` }} /></div>
                      <span className="text-xs font-bold text-text-dark">{c.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.statusColor}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Crops;
