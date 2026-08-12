import { useState, useEffect } from 'react';
import { RiAddLine, RiSearchLine, RiFilterLine, RiMapPin2Line, RiPlantLine, RiDeleteBinLine, RiCloseLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ConfirmModal from '../../components/ConfirmModal';
import { getFarmImage, DEFAULT_FARM_IMAGE } from '../../utils/farmImageMapper';

import PageHeader from '../../components/PageHeader';

const Farms = () => {
  const [farms, setFarms] = useState([]);
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  
  // Modal & form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    area: '',
    soilType: 'Loamy Soil'
  });
  const [errors, setErrors] = useState({});

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Loading & submitting states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all farms from backend
  const fetchFarms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/farms/getallfarms');
      setFarms(response.data || []);
    } catch (error) {
      console.error('Error fetching farms:', error);
      toast.error('Failed to load farms.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch current user profile to get userId
  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      if (response.data && response.data.userId) {
        setUserId(response.data.userId);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchFarms();
    fetchProfile();
  }, []);

  // Filter farms by search query and soil/type
  const filtered = farms.filter(f => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q ||
      (f.farmName  || '').toLowerCase().includes(q) ||
      (f.location  || '').toLowerCase().includes(q) ||
      (f.soilType  || '').toLowerCase().includes(q);
    const matchFilter = filter === 'All' || (f.soilType && f.soilType.includes(filter));
    return matchSearch && matchFilter;
  });

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.farmName.trim()) {
      newErrors.farmName = 'Farm Name is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.area || parseFloat(formData.area) <= 0) {
      newErrors.area = 'Area must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Add Farm submit
  const handleAddFarm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!userId) {
      toast.error('User not authenticated. Please log in again.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        userId: userId,
        farmName: formData.farmName.trim(),
        location: formData.location.trim(),
        area: parseFloat(formData.area),
        soilType: formData.soilType
      };

      await api.post('/farms/addfarms', payload);
      toast.success('Farm Added Successfully');
      setIsModalOpen(false);
      setFormData({
        farmName: '',
        location: '',
        area: '',
        soilType: 'Loamy Soil'
      });
      setErrors({});
      fetchFarms();
    } catch (error) {
      console.error('Error adding farm:', error);
      toast.error(error.response?.data?.message || 'Failed to add farm.');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (farmId) => {
    setDeletingId(farmId);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDeleteFarm = async () => {
    if (!deletingId) return;
    try {
      setDeleting(true);
      await api.delete(`/farms/deletefarm/${deletingId}`);
      toast.success('Farm Deleted Successfully');
      fetchFarms();
    } catch (error) {
      console.error('Error deleting farm:', error);
      toast.error(error.response?.data?.message || 'Failed to delete farm.');
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setDeletingId(null);
    }
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="My Farms"
        description="Manage and organize all your farm properties."
        action={
          <button 
            onClick={() => {
              setFormData({ farmName: '', location: '', area: '', soilType: 'Loamy Soil' });
              setErrors({});
              setIsModalOpen(true);
            }}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 text-sm font-extrabold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <RiAddLine className="text-lg" />
            <span>Add Farm</span>
          </button>
        }
      />

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search farms by name, location, or soil type..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <RiCloseLine className="text-base" />
            </button>
          )}
        </div>
        <div className="relative">
          <RiFilterLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <select 
            value={filter} 
            onChange={e => setFilter(e.target.value)} 
            className="pl-10 pr-8 py-2.5 bg-white border border-border-light rounded-xl text-sm font-semibold text-text-dark appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            <option value="All">All Soil Types</option>
            <option value="Black Soil">Black Soil</option>
            <option value="Red Soil">Red Soil</option>
            <option value="Loamy Soil">Loamy Soil</option>
            <option value="Alluvial Soil">Alluvial Soil</option>
            <option value="Sandy Soil">Sandy Soil</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border-light">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-3"></div>
          <p className="text-text-muted text-sm font-semibold">Loading Farms...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-border-light mb-8">
          <RiMapPin2Line className="text-4xl text-text-muted mx-auto mb-3" />
          {search.trim() ? (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">No matching farms found</h3>
              <p className="text-xs text-text-muted">No results for &ldquo;{search.trim()}&rdquo;. Try a different keyword.</p>
            </>
          ) : (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">No Farms Found</h3>
              <p className="text-xs text-text-muted">Click &ldquo;Add Farm&rdquo; to register your first farm property.</p>
            </>
          )}
        </div>
      ) : (
        /* Farm Cards with Hero Images */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filtered.map(farm => (
            <div
              key={farm.farmId}
              className="bg-white rounded-2xl shadow-sm border border-border-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Hero Image Section */}
              <div className="relative h-44 w-full overflow-hidden bg-bg-light">
                <img
                  src={getFarmImage(farm.farmName)}
                  alt={farm.farmName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_FARM_IMAGE;
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md bg-white/90 text-green-700">
                    Active
                  </span>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-text-dark mb-1">{farm.farmName}</h3>
                  <p className="text-xs text-text-muted mb-3">{farm.location} · {farm.area} Acres · {farm.soilType || 'Loamy Soil'}</p>
                  <div className="flex items-center space-x-2 mb-4">
                    <RiPlantLine className="text-secondary text-sm" />
                    <span className="text-xs font-semibold text-text-muted">Registered Farm</span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 border-t border-border-light pt-3">
                  <button 
                    onClick={() => openDeleteModal(farm.farmId)}
                    className="flex items-center space-x-1 text-xs font-semibold text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <RiDeleteBinLine /> <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Farm Table */}
      {!loading && filtered.length > 0 && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light mb-6">
          <h3 className="text-lg font-bold text-text-dark mb-5">All Farms</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Farm Name</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Location</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Area</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Soil Type</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {filtered.map(farm => (
                  <tr key={farm.farmId} className="hover:bg-bg-light/60 transition-colors">
                    <td className="py-3.5 px-4 text-sm font-bold text-text-dark flex items-center space-x-3">
                      <img
                        src={getFarmImage(farm.farmName)}
                        alt={farm.farmName}
                        className="w-8 h-8 rounded-lg object-cover border border-border-light"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = DEFAULT_FARM_IMAGE;
                        }}
                      />
                      <span>{farm.farmName}</span>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-text-muted">{farm.location}</td>
                    <td className="py-3.5 px-4 text-sm text-text-muted">{farm.area} Acres</td>
                    <td className="py-3.5 px-4 text-sm text-text-muted">{farm.soilType || '—'}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => openDeleteModal(farm.farmId)}
                        className="text-xs font-semibold text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Farm Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-border-light overflow-hidden transform transition-all duration-300">
            <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-text-dark">Add New Farm</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 rounded-lg hover:bg-bg-light text-text-muted transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleAddFarm} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Farm Name *</label>
                <input 
                  type="text" 
                  value={formData.farmName} 
                  onChange={e => {
                    setFormData({ ...formData, farmName: e.target.value });
                    if (errors.farmName) setErrors({ ...errors, farmName: null });
                  }} 
                  placeholder="e.g. Green Valley Farm" 
                  className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark ${
                    errors.farmName ? 'border-red-500 focus:ring-red-200' : 'border-border-light focus:ring-primary/20 focus:border-primary'
                  }`}
                />
                {errors.farmName && <p className="text-xs text-red-500 font-semibold mt-1">{errors.farmName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Location *</label>
                <input 
                  type="text" 
                  value={formData.location} 
                  onChange={e => {
                    setFormData({ ...formData, location: e.target.value });
                    if (errors.location) setErrors({ ...errors, location: null });
                  }} 
                  placeholder="e.g. Hyderabad" 
                  className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark ${
                    errors.location ? 'border-red-500 focus:ring-red-200' : 'border-border-light focus:ring-primary/20 focus:border-primary'
                  }`}
                />
                {errors.location && <p className="text-xs text-red-500 font-semibold mt-1">{errors.location}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Area (Acres) *</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={formData.area} 
                    onChange={e => {
                      setFormData({ ...formData, area: e.target.value });
                      if (errors.area) setErrors({ ...errors, area: null });
                    }} 
                    placeholder="e.g. 5.5" 
                    className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark ${
                      errors.area ? 'border-red-500 focus:ring-red-200' : 'border-border-light focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.area && <p className="text-xs text-red-500 font-semibold mt-1">{errors.area}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Soil Type</label>
                  <select 
                    value={formData.soilType} 
                    onChange={e => setFormData({ ...formData, soilType: e.target.value })} 
                    className="w-full px-4 py-2.5 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark cursor-pointer"
                  >
                    <option>Black Soil</option>
                    <option>Red Soil</option>
                    <option>Loamy Soil</option>
                    <option>Alluvial Soil</option>
                    <option>Sandy Soil</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border-light mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 cursor-pointer flex items-center space-x-2"
                >
                  {submitting ? 'Adding...' : 'Add Farm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Farm?"
        message="Are you sure you want to delete this farm? This action will remove the record."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={confirmDeleteFarm}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default Farms;
