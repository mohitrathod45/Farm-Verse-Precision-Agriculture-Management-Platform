import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiAddLine,
  RiSearchLine,
  RiFilterLine,
  RiPlantLine,
  RiSunLine,
  RiCalendarLine,
  RiDeleteBinLine,
  RiCloseLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ConfirmModal from '../../components/ConfirmModal';
import { formatDate } from '../../utils/dateUtils';
import { getCropImage, DEFAULT_CROP_IMAGE } from '../../utils/cropImageMapper';
import PageHeader from '../../components/PageHeader';

const statusColorMap = {
  Growing: 'bg-green-100 text-green-700',
  Flowering: 'bg-yellow-100 text-yellow-700',
  'Harvest Ready': 'bg-orange-100 text-orange-700',
  Seedling: 'bg-blue-100 text-blue-700',
  Harvested: 'bg-gray-100 text-gray-600',
};

const getStatusColor = (status) =>
  statusColorMap[status] || 'bg-green-100 text-green-700';

const Crops = () => {
  const navigate = useNavigate();

  const [crops, setCrops] = useState([]);
  const [farms, setFarms] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    farmId: '',
    cropName: '',
    season: 'Kharif',
    sowingDate: '',
    harvestingDate: '',
    status: 'Growing',
  });

  // Fetch all crops and farms from backend
  const fetchCropsAndFarms = async () => {
    try {
      setLoading(true);

      const [cropRes, farmRes] = await Promise.all([
        api.get('/crops/getallcrops'),
        api.get('/farms/getallfarms')
      ]);

      setCrops(cropRes.data || []);
      setFarms(farmRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load crops data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCropsAndFarms();
  }, []);

  // Helper to resolve farm name from farmId
  const getFarmName = (farmId) => {
    const found = farms.find(f => f.farmId === farmId);
    return found ? found.farmName : `Farm #${farmId}`;
  };

  // Filter by search and season
  const filtered = crops.filter(c => {
    const q = search.trim().toLowerCase();
    const farmName = getFarmName(c.farmId);

    const matchSearch =
      !q ||
      (c.cropName || '').toLowerCase().includes(q) ||
      (c.season || '').toLowerCase().includes(q) ||
      (c.status || '').toLowerCase().includes(q) ||
      farmName.toLowerCase().includes(q);

    const matchFilter = filter === 'All' || c.season === filter;

    return matchSearch && matchFilter;
  });

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.farmId) {
      newErrors.farmId = 'Farm selection is required';
    }

    if (!formData.cropName.trim()) {
      newErrors.cropName = 'Crop Name is required';
    }

    if (!formData.season) {
      newErrors.season = 'Season is required';
    }

    if (formData.sowingDate && formData.harvestingDate) {
      if (
        new Date(formData.harvestingDate) <
        new Date(formData.sowingDate)
      ) {
        newErrors.harvestingDate =
          'Harvest Date cannot be before Sowing Date';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Add Crop
  const handleAddCrop = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const payload = {
        farmId: parseInt(formData.farmId),
        cropName: formData.cropName.trim(),
        season: formData.season,
        sowingDate: formData.sowingDate || null,
        harvestingDate: formData.harvestingDate || null,
        status: formData.status,
      };

      await api.post('/crops/addcrop', payload);

      toast.success('Crop Added Successfully');

      setIsModalOpen(false);

      setFormData({
        farmId: farms.length > 0 ? farms[0].farmId : '',
        cropName: '',
        season: 'Kharif',
        sowingDate: '',
        harvestingDate: '',
        status: 'Growing'
      });

      setErrors({});

      fetchCropsAndFarms();
    } catch (error) {
      console.error('Error adding crop:', error);

      toast.error(
        error.response?.data?.message ||
        'Failed to add crop.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (cropId) => {
    setDeletingId(cropId);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDeleteCrop = async () => {
    if (!deletingId) return;

    try {
      setDeleting(true);

      await api.delete(`/crops/deletecrop/${deletingId}`);

      toast.success('Crop Deleted Successfully');

      setDeleteModalOpen(false);
      setDeletingId(null);

      fetchCropsAndFarms();
    } catch (error) {
      console.error('Error deleting crop:', error);

      toast.error(
        error.response?.data?.message ||
        'Failed to delete crop.'
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Crop Management"
        description="Manage and monitor the crops across your farms."
        action={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => navigate('/crop-recommendation')}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              <RiPlantLine className="text-lg" />
              <span>Crop Recommendation</span>
            </button>
            <button
              onClick={() => {
                setFormData({
                  farmId: farms.length > 0 ? farms[0].farmId : '',
                  cropName: '',
                  season: 'Kharif',
                  sowingDate: '',
                  harvestingDate: '',
                  status: 'Growing'
                });
                setErrors({});
                setIsModalOpen(true);
              }}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 text-sm font-extrabold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <RiAddLine className="text-lg" />
              <span>Add Crop</span>
            </button>
          </div>
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
            placeholder="🔍 Search crops by name, season, status, or farm..."
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
            <option value="All">All Seasons</option>
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Zaid">Zaid</option>
          </select>

        </div>

      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border-light">

          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-3"></div>

          <p className="text-text-muted text-sm font-semibold">
            Loading Crops...
          </p>

        </div>
      ) : filtered.length === 0 ? (

        <div className="bg-white rounded-2xl p-12 text-center border border-border-light mb-8">

          <RiPlantLine className="text-4xl text-text-muted mx-auto mb-3" />

          {search.trim() ? (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">
                No matching crops found
              </h3>

              <p className="text-xs text-text-muted">
                No results for &ldquo;{search.trim()}&rdquo;. Try a different keyword.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">
                No Crops Available
              </h3>

              <p className="text-xs text-text-muted">
                Click &ldquo;Add Crop&rdquo; to register your first crop.
              </p>
            </>
          )}

        </div>

      ) : (

        /* Crop Cards with Hero Images */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {filtered.map(crop => (

            <div
              key={crop.cropId}
              className="bg-white rounded-2xl shadow-sm border border-border-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
            >

              {/* Hero Image Section */}
              <div className="relative h-44 w-full overflow-hidden bg-bg-light group">

                <img
                  src={getCropImage(crop.cropName)}
                  alt={crop.cropName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_CROP_IMAGE;
                  }}
                />

                <div className="absolute top-3 right-3">

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md bg-white/90 ${getStatusColor(crop.status)}`}
                  >
                    {crop.status || 'Growing'}
                  </span>

                </div>

              </div>

              {/* Card Content Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">

                <div>

                  <h3 className="text-base font-bold text-text-dark">
                    {crop.cropName}
                  </h3>

                  <p className="text-xs text-text-muted mt-0.5 mb-3">
                    {getFarmName(crop.farmId)}
                  </p>

                  <div className="flex items-center space-x-3 text-xs text-text-muted mb-4">

                    <span className="flex items-center space-x-1">
                      <RiSunLine className="text-accent" />
                      <span>{crop.season || '—'}</span>
                    </span>

                    <span className="flex items-center space-x-1">
                      <RiCalendarLine className="text-sky" />
                      <span>{formatDate(crop.harvestingDate)}</span>
                    </span>

                  </div>

                </div>

                <div className="flex items-center justify-end border-t border-border-light pt-3">

                  <button
                    onClick={() => openDeleteModal(crop.cropId)}
                    className="flex items-center space-x-1 text-xs font-semibold text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <RiDeleteBinLine />
                    <span>Delete</span>
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Crop Table */}
      {!loading && filtered.length > 0 && (

        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">

          <h3 className="text-lg font-bold text-text-dark mb-5">
            All Crops
          </h3>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-border-light">

                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">
                    Crop Name
                  </th>

                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">
                    Farm
                  </th>

                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">
                    Season
                  </th>

                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">
                    Sowing Date
                  </th>

                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">
                    Harvest Date
                  </th>

                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4 text-right">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-border-light">

                {filtered.map(c => (

                  <tr
                    key={c.cropId}
                    className="hover:bg-bg-light/60 transition-colors"
                  >

                    <td className="py-3.5 px-4 text-sm font-bold text-text-dark flex items-center space-x-3">

                      <img
                        src={getCropImage(c.cropName)}
                        alt={c.cropName}
                        className="w-8 h-8 rounded-lg object-cover border border-border-light"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = DEFAULT_CROP_IMAGE;
                        }}
                      />

                      <span>{c.cropName}</span>

                    </td>

                    <td className="py-3.5 px-4 text-sm text-text-muted">
                      {getFarmName(c.farmId)}
                    </td>

                    <td className="py-3.5 px-4 text-sm text-text-muted">
                      {c.season || '—'}
                    </td>

                    <td className="py-3.5 px-4 text-sm text-text-muted">
                      {formatDate(c.sowingDate)}
                    </td>

                    <td className="py-3.5 px-4 text-sm text-text-muted">
                      {formatDate(c.harvestingDate)}
                    </td>

                    <td className="py-3.5 px-4 text-right">

                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusColor(c.status)}`}
                      >
                        {c.status || 'Growing'}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* Add Crop Modal */}
      {isModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">

          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-border-light overflow-hidden transform transition-all duration-300">

            <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">

              <h3 className="text-lg font-extrabold text-text-dark">
                Add New Crop
              </h3>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-bg-light text-text-muted transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <RiCloseLine className="text-xl" />
              </button>

            </div>

            <form onSubmit={handleAddCrop} className="p-6 space-y-4">

              {/* Farm Dropdown */}
              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Farm *
                </label>

                <select
                  value={formData.farmId}
                  onChange={e => {
                    setFormData({
                      ...formData,
                      farmId: e.target.value
                    });

                    if (errors.farmId) {
                      setErrors({
                        ...errors,
                        farmId: null
                      });
                    }
                  }}
                  className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark cursor-pointer ${
                    errors.farmId
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-border-light focus:ring-primary/20 focus:border-primary'
                  }`}
                >

                  {farms.length === 0 && (
                    <option value="">
                      No farms available
                    </option>
                  )}

                  {farms.map(f => (
                    <option key={f.farmId} value={f.farmId}>
                      {f.farmName} (#{f.farmId})
                    </option>
                  ))}

                </select>

                {errors.farmId && (
                  <p className="text-xs text-red-500 font-semibold mt-1">
                    {errors.farmId}
                  </p>
                )}

              </div>

              {/* Crop Name */}
              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Crop Name *
                </label>

                <input
                  type="text"
                  value={formData.cropName}
                  onChange={e => {
                    setFormData({
                      ...formData,
                      cropName: e.target.value
                    });

                    if (errors.cropName) {
                      setErrors({
                        ...errors,
                        cropName: null
                      });
                    }
                  }}
                  placeholder="e.g. Rice, Wheat, Tomato"
                  className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark ${
                    errors.cropName
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-border-light focus:ring-primary/20 focus:border-primary'
                  }`}
                />

                {errors.cropName && (
                  <p className="text-xs text-red-500 font-semibold mt-1">
                    {errors.cropName}
                  </p>
                )}

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                    Season *
                  </label>

                  <select
                    value={formData.season}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        season: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark cursor-pointer"
                  >
                    <option>Kharif</option>
                    <option>Rabi</option>
                    <option>Zaid</option>
                  </select>

                </div>

                <div>

                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                    Status
                  </label>

                  <select
                    value={formData.status}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        status: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark cursor-pointer"
                  >
                    <option>Seedling</option>
                    <option>Growing</option>
                    <option>Flowering</option>
                    <option>Harvest Ready</option>
                    <option>Harvested</option>
                  </select>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                    Sowing Date
                  </label>

                  <input
                    type="date"
                    value={formData.sowingDate}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        sowingDate: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark"
                  />

                </div>

                <div>

                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                    Harvest Date
                  </label>

                  <input
                    type="date"
                    value={formData.harvestingDate}
                    onChange={e => {
                      setFormData({
                        ...formData,
                        harvestingDate: e.target.value
                      });

                      if (errors.harvestingDate) {
                        setErrors({
                          ...errors,
                          harvestingDate: null
                        });
                      }
                    }}
                    className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark ${
                      errors.harvestingDate
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-border-light focus:ring-primary/20 focus:border-primary'
                    }`}
                  />

                  {errors.harvestingDate && (
                    <p className="text-xs text-red-500 font-semibold mt-1">
                      {errors.harvestingDate}
                    </p>
                  )}

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
                  {submitting ? 'Adding...' : 'Add Crop'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Crop?"
        message="Are you sure you want to delete this crop record? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={confirmDeleteCrop}
        onCancel={() => setDeleteModalOpen(false)}
      />

    </>
  );
};

export default Crops;