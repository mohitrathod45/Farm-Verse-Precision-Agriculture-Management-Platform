import { useState, useEffect } from 'react';
import {
  RiPlantLine,
  RiSearchLine,
  RiUser3Line,
  RiMap2Line,
  RiCalendarLine,
  RiFlagLine,
} from 'react-icons/ri';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { getCropImage } from '../../utils/cropImageMapper';

const AdminCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/crops');
      setCrops(res.data || []);
    } catch (error) {
      toast.error('Failed to load crops');
    } finally {
      setLoading(false);
    }
  };

  const filteredCrops = crops.filter((c) => {
    const query = searchQuery.toLowerCase();
    const cropMatch = c.cropName && c.cropName.toLowerCase().includes(query);
    const farmerMatch = c.farmerName && c.farmerName.toLowerCase().includes(query);
    const farmMatch = c.farmName && c.farmName.toLowerCase().includes(query);
    const seasonMatch = c.season && c.season.toLowerCase().includes(query);
    const statusMatch = c.status && c.status.toLowerCase().includes(query);
    return cropMatch || farmerMatch || farmMatch || seasonMatch || statusMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark font-display">
            System Crops Management
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Global view of all crops registered across all farms ({crops.length} Total Crops)
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-lg" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by crop, farmer, farm name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-bg-light/50"
          />
        </div>
        <div className="text-xs font-semibold text-text-muted">
          Showing <span className="text-text-dark font-bold">{filteredCrops.length}</span> of {crops.length} Crops
        </div>
      </div>

      {/* Crops Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-primary font-semibold flex items-center justify-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading crop records...</span>
        </div>
      ) : filteredCrops.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-border-light">
          <RiPlantLine className="text-4xl text-text-muted mx-auto" />
          <p className="text-base font-bold text-text-dark">No crops found</p>
          <p className="text-xs text-text-muted">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => {
            const heroImg = getCropImage(crop.cropName);
            return (
              <div
                key={crop.cropId}
                className="bg-white rounded-3xl overflow-hidden border border-border-light shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Hero Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-bg-light">
                  <img
                    src={heroImg}
                    alt={crop.cropName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 backdrop-blur-md bg-white/90 shadow-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-800 border border-white/60 flex items-center space-x-1.5">
                    <RiUser3Line className="text-emerald-600" />
                    <span>Farmer: {crop.farmerName || 'Unknown'}</span>
                  </div>
                  <div className="absolute top-3 right-3 backdrop-blur-md bg-white/90 shadow-sm px-2.5 py-1 rounded-full text-xs font-bold text-text-dark border border-white/60">
                    {crop.season || 'Season'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-dark font-display group-hover:text-primary transition-colors">
                      {crop.cropName}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 flex items-center space-x-1">
                      <RiMap2Line className="text-primary" />
                      <span>Farm: {crop.farmName || 'Unknown Farm'}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-border-light/60">
                    <div className="bg-bg-light/60 p-2.5 rounded-xl">
                      <p className="text-[10px] font-bold uppercase text-text-muted">Status</p>
                      <p className="font-bold text-emerald-600 mt-0.5">{crop.status || 'Active'}</p>
                    </div>

                    <div className="bg-bg-light/60 p-2.5 rounded-xl">
                      <p className="text-[10px] font-bold uppercase text-text-muted">Harvest Date</p>
                      <p className="font-bold text-text-dark mt-0.5">{crop.harvestingDate || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminCrops;
