import { useState } from 'react';
import { RiAddLine, RiSearchLine, RiFilterLine, RiMapPin2Line, RiPlantLine, RiEditLine, RiDeleteBinLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const farmsData = [
  { id: 1, name: 'Green Valley Farm', location: 'Hyderabad', area: '5 Acres', type: 'Organic', crop: 'Rice', soil: 'Black Soil', status: 'Active', statusColor: 'bg-green-100 text-green-700' },
  { id: 2, name: 'Sunny Farm', location: 'Anantapur', area: '3 Acres', type: 'Traditional', crop: 'Groundnut', soil: 'Red Soil', status: 'Active', statusColor: 'bg-green-100 text-green-700' },
  { id: 3, name: 'Organic Field', location: 'Tirupati', area: '7 Acres', type: 'Organic', crop: 'Tomato', soil: 'Loamy Soil', status: 'Harvest Ready', statusColor: 'bg-orange-100 text-orange-700' },
  { id: 4, name: 'Riverside Farm', location: 'Vijayawada', area: '10 Acres', type: 'Mixed', crop: 'Maize', soil: 'Alluvial Soil', status: 'Growing', statusColor: 'bg-blue-100 text-blue-700' },
  { id: 5, name: 'Hilltop Acres', location: 'Warangal', area: '4 Acres', type: 'Organic', crop: 'Cotton', soil: 'Sandy Soil', status: 'Active', statusColor: 'bg-green-100 text-green-700' },
];

const Farms = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = farmsData.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || f.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark">My Farms</h1>
          <p className="text-sm text-text-muted mt-1">Manage and organize all your farm properties.</p>
        </div>
        <button className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-primary/90 transition-all">
          <RiAddLine className="text-lg" />
          <span>Add Farm</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search farms..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
        </div>
        <div className="relative">
          <RiFilterLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <select value={filter} onChange={e => setFilter(e.target.value)} className="pl-10 pr-8 py-2.5 bg-white border border-border-light rounded-xl text-sm font-semibold text-text-dark appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            <option>All</option>
            <option>Organic</option>
            <option>Traditional</option>
            <option>Mixed</option>
          </select>
        </div>
      </div>

      {/* Farm Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filtered.map(farm => (
          <div key={farm.id} className="bg-white rounded-2xl p-5 shadow-sm border border-border-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <RiMapPin2Line className="text-xl" />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${farm.statusColor}`}>{farm.status}</span>
            </div>
            <h3 className="text-base font-bold text-text-dark mb-1">{farm.name}</h3>
            <p className="text-xs text-text-muted mb-3">{farm.location} · {farm.area} · {farm.soil}</p>
            <div className="flex items-center space-x-2 mb-4">
              <RiPlantLine className="text-secondary text-sm" />
              <span className="text-xs font-semibold text-text-muted">{farm.crop}</span>
              <span className="text-xs text-text-muted">·</span>
              <span className="text-xs font-semibold text-text-muted">{farm.type}</span>
            </div>
            <div className="flex items-center space-x-2 border-t border-border-light pt-3">
              <button className="flex items-center space-x-1 text-xs font-semibold text-primary hover:bg-primary/10 px-2.5 py-1.5 rounded-lg transition-colors">
                <RiEditLine /> <span>Edit</span>
              </button>
              <button className="flex items-center space-x-1 text-xs font-semibold text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors">
                <RiDeleteBinLine /> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Farm Table */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light mb-6">
        <h3 className="text-lg font-bold text-text-dark mb-5">All Farms</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light">
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Farm Name</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Location</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Area</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Crop</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Type</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filtered.map(farm => (
                <tr key={farm.id} className="hover:bg-bg-light/60 transition-colors">
                  <td className="py-3.5 px-4 text-sm font-bold text-text-dark">{farm.name}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{farm.location}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{farm.area}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{farm.crop}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{farm.type}</td>
                  <td className="py-3.5 px-4 text-right"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${farm.statusColor}`}>{farm.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted font-medium">Showing {filtered.length} of {farmsData.length} farms</p>
        <div className="flex items-center space-x-1">
          <button className="p-2 rounded-lg border border-border-light text-text-muted hover:bg-bg-light transition-colors"><RiArrowLeftSLine /></button>
          <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-bold">1</button>
          <button className="px-3 py-1.5 rounded-lg border border-border-light text-text-muted text-sm font-bold hover:bg-bg-light transition-colors">2</button>
          <button className="p-2 rounded-lg border border-border-light text-text-muted hover:bg-bg-light transition-colors"><RiArrowRightSLine /></button>
        </div>
      </div>
    </>
  );
};

export default Farms;
