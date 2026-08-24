import { useState, useEffect } from 'react';
import { RiDropLine, RiCalendarCheckLine, RiAddLine, RiCloseLine, RiDeleteBinLine, RiEditLine, RiSearchLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ConfirmModal from '../../components/ConfirmModal';
import { formatDate } from '../../utils/dateUtils';
import { getIrrigationImage, DEFAULT_IRRIGATION_IMAGE } from '../../utils/irrigationImageMapper';
import PageHeader from '../../components/PageHeader';
import { useNotifications } from '../../context/NotificationContext';

const typeColorMap = {
  'Drip Irrigation':   'bg-blue-100 text-blue-700',
  'Sprinkler':         'bg-sky-100 text-sky-700',
  'Flood Irrigation':  'bg-cyan-100 text-cyan-700',
  'Surface Irrigation':'bg-teal-100 text-teal-700',
};

const getTypeColor = (type) =>
  typeColorMap[type] || 'bg-green-100 text-green-700';

const Irrigation = () => {
  const { refreshNotifications } = useNotifications();
  const [irrigations, setIrrigations]   = useState([]);
  const [farms, setFarms]               = useState([]);
  const [search, setSearch]             = useState('');
  const [loading, setLoading]           = useState(true);
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [editId, setEditId]             = useState(null);
  const [errors, setErrors]             = useState({});

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId]           = useState(null);
  const [deleting, setDeleting]               = useState(false);

  const [formData, setFormData]         = useState({
    farmId:         '',
    irrigationType: 'Drip Irrigation',
    scheduleDate:   '',
    remarks:        '',
  });

  // Fetch Irrigations and Farms
  const fetchIrrigationsAndFarms = async () => {
    try {
      setLoading(true);
      const [irrRes, farmRes] = await Promise.all([
        api.get('/irrigation/getallirrigation'),
        api.get('/farms/getallfarms')
      ]);
      setIrrigations(irrRes.data || []);
      setFarms(farmRes.data || []);
    } catch (error) {
      console.error('Error fetching irrigation data:', error);
      toast.error('Failed to load irrigation records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIrrigationsAndFarms();
  }, []);

  // Helper to resolve farm name
  const getFarmName = (farmId) => {
    const found = farms.find(f => f.farmId === farmId);
    return found ? found.farmName : `Farm #${farmId}`;
  };

  // Search filter
  const filtered = irrigations.filter(item => {
    const farmName = getFarmName(item.farmId);
    const type = item.irrigationType || '';
    const remarks = item.remarks || '';
    const query = search.toLowerCase();
    return farmName.toLowerCase().includes(query) ||
           type.toLowerCase().includes(query) ||
           remarks.toLowerCase().includes(query);
  });

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.farmId) {
      newErrors.farmId = 'Please select a farm';
    }
    if (!formData.irrigationType) {
      newErrors.irrigationType = 'Please select an irrigation type';
    }
    if (!formData.scheduleDate) {
      newErrors.scheduleDate = 'Please select a schedule date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Open modal (Add)
  const openAddModal = () => {
    setEditId(null);
    const defaultFarmId = farms.length > 0 ? farms[0].farmId : '';
    const defaultDate = new Date().toISOString().split('T')[0];
    setFormData({
      farmId:         defaultFarmId,
      irrigationType: 'Drip Irrigation',
      scheduleDate:   defaultDate,
      remarks:        '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Open modal (Edit)
  const openEditModal = (item) => {
    setEditId(item.irrigationId);
    setFormData({
      farmId:         item.farmId ?? (farms.length > 0 ? farms[0].farmId : ''),
      irrigationType: item.irrigationType ?? 'Drip Irrigation',
      scheduleDate:   item.scheduleDate ?? '',
      remarks:        item.remarks ?? '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const payload = {
        farmId:         parseInt(formData.farmId),
        irrigationType: formData.irrigationType,
        scheduleDate:   formData.scheduleDate,
        waterQuantity:  null,
        remarks:        formData.remarks ? formData.remarks.trim() : null,
      };

      if (editId) {
        await api.put(`/irrigation/updateirrigation/${editId}`, payload);
        toast.success('Irrigation Updated Successfully');
      } else {
        await api.post('/irrigation/addirrigation', payload);
        toast.success('Irrigation Added Successfully');
      }

      setIsModalOpen(false);
      setEditId(null);
      setErrors({});
      fetchIrrigationsAndFarms();
      refreshNotifications();
    } catch (error) {
      console.error('Error saving irrigation:', error);
      toast.error(error.response?.data?.message || 'Failed to save irrigation.');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (irrigationId) => {
    setDeletingId(irrigationId);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      setDeleting(true);
      await api.delete(`/irrigation/deleteirrigation/${deletingId}`);
      toast.success('Irrigation Deleted Successfully');
      setDeleteModalOpen(false);
      setDeletingId(null);
      fetchIrrigationsAndFarms();
      refreshNotifications();
    } catch (error) {
      console.error('Error deleting irrigation:', error);
      toast.error(error.response?.data?.message || 'Failed to delete irrigation.');
    } finally {
      setDeleting(false);
    }
  };

  const stats = [
    { title: 'Total Records', value: irrigations.length, color: 'text-primary', desc: 'All time' },
    { title: 'Drip Irrigation', value: irrigations.filter(i => i.irrigationType === 'Drip Irrigation').length, color: 'text-sky', desc: 'Sessions' },
    { title: 'Sprinkler', value: irrigations.filter(i => i.irrigationType === 'Sprinkler' || i.irrigationType === 'Sprinkler Irrigation').length, color: 'text-accent', desc: 'Sessions' },
    { title: 'Flood Irrigation', value: irrigations.filter(i => i.irrigationType === 'Flood Irrigation').length, color: 'text-secondary', desc: 'Sessions' },
  ];

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Irrigation"
        description="Schedule and manage irrigation activities for your farms."
        action={
          <button
            onClick={openAddModal}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 text-sm font-extrabold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <RiAddLine className="text-lg" />
            <span>Add Irrigation</span>
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-border-light">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">{s.title}</p>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-text-muted mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search irrigation by farm, type, or remarks..."
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
      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border-light">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-3"></div>
          <p className="text-text-muted text-sm font-semibold">Loading Irrigation Records...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-border-light mb-8">
          <RiDropLine className="text-4xl text-text-muted mx-auto mb-3" />
          {search.trim() ? (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">No matching records found</h3>
              <p className="text-xs text-text-muted">No results for &ldquo;{search.trim()}&rdquo;. Try a different keyword.</p>
            </>
          ) : (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">No Irrigation Records</h3>
              <p className="text-xs text-text-muted">Click &ldquo;Add Irrigation&rdquo; to schedule your first irrigation.</p>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {filtered.map(item => (
              <div
                key={item.irrigationId}
                className="bg-white rounded-2xl shadow-sm border border-border-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Hero Image Section */}
                <div className="relative h-44 w-full overflow-hidden bg-bg-light">
                  <img
                    src={getIrrigationImage(item.irrigationType)}
                    alt={item.irrigationType || 'Irrigation'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_IRRIGATION_IMAGE;
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md bg-white/90 ${getTypeColor(item.irrigationType)}`}>
                      {item.irrigationType || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-text-dark">{getFarmName(item.farmId)}</h3>
                    <p className="text-xs text-text-muted mt-0.5 mb-3 flex items-center space-x-1">
                      <RiCalendarCheckLine className="text-primary" />
                      <span>{formatDate(item.scheduleDate)}</span>
                    </p>

                    {item.remarks && (
                      <p className="text-xs text-text-muted italic mb-3 line-clamp-2">&ldquo;{item.remarks}&rdquo;</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end space-x-2 border-t border-border-light pt-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex items-center space-x-1 text-xs font-semibold text-primary hover:bg-primary/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <RiEditLine /> <span>Edit</span>
                    </button>
                    <button
                      onClick={() => openDeleteModal(item.irrigationId)}
                      className="flex items-center space-x-1 text-xs font-semibold text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <RiDeleteBinLine /> <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
            <h3 className="text-lg font-bold text-text-dark mb-5">All Irrigation Records</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-light">
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Farm</th>
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Irrigation Type</th>
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Schedule Date</th>
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Remarks</th>
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {filtered.map(item => (
                    <tr key={item.irrigationId} className="hover:bg-bg-light/60 transition-colors">
                      <td className="py-3.5 px-4 text-sm font-bold text-text-dark flex items-center space-x-3">
                        <img
                          src={getIrrigationImage(item.irrigationType)}
                          alt={item.irrigationType}
                          className="w-8 h-8 rounded-lg object-cover border border-border-light"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = DEFAULT_IRRIGATION_IMAGE;
                          }}
                        />
                        <span>{getFarmName(item.farmId)}</span>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-text-muted font-medium">{item.irrigationType || '—'}</td>
                      <td className="py-3.5 px-4 text-sm text-text-muted">{formatDate(item.scheduleDate)}</td>
                      <td className="py-3.5 px-4 text-sm text-text-muted max-w-[220px] truncate">{item.remarks || '—'}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-xs font-semibold text-primary hover:bg-primary/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(item.irrigationId)}
                            className="text-xs font-semibold text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Clean & Simple Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-border-light overflow-hidden transform transition-all duration-300">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-text-dark font-display">
                {editId ? 'Edit Irrigation' : 'Add Irrigation'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-bg-light text-text-muted transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              {/* 1. Farm Dropdown */}
              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">
                  Farm *
                </label>
                <select
                  value={formData.farmId}
                  onChange={e => {
                    setFormData({ ...formData, farmId: e.target.value });
                    if (errors.farmId) setErrors({ ...errors, farmId: null });
                  }}
                  className={`w-full px-4 py-2.5 bg-bg-light/60 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark cursor-pointer ${
                    errors.farmId ? 'border-red-500 focus:ring-red-200' : 'border-border-light'
                  }`}
                >
                  {farms.length === 0 && <option value="">No farms available</option>}
                  {farms.map(f => (
                    <option key={f.farmId} value={f.farmId}>
                      {f.farmName} (#{f.farmId})
                    </option>
                  ))}
                </select>
                {errors.farmId && <p className="text-xs text-red-500 font-semibold mt-1">{errors.farmId}</p>}
              </div>

              {/* 2. Irrigation Type Dropdown */}
              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">
                  Irrigation Type *
                </label>
                <select
                  value={formData.irrigationType}
                  onChange={e => setFormData({ ...formData, irrigationType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg-light/60 border border-border-light rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark cursor-pointer"
                >
                  <option value="Drip Irrigation">Drip Irrigation</option>
                  <option value="Sprinkler Irrigation">Sprinkler Irrigation</option>
                  <option value="Flood Irrigation">Flood Irrigation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* 3. Schedule Date */}
              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">
                  Schedule Date *
                </label>
                <input
                  type="date"
                  value={formData.scheduleDate}
                  onChange={e => {
                    setFormData({ ...formData, scheduleDate: e.target.value });
                    if (errors.scheduleDate) setErrors({ ...errors, scheduleDate: null });
                  }}
                  className={`w-full px-4 py-2.5 bg-bg-light/60 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark ${
                    errors.scheduleDate ? 'border-red-500 focus:ring-red-200' : 'border-border-light'
                  }`}
                />
                {errors.scheduleDate && <p className="text-xs text-red-500 font-semibold mt-1">{errors.scheduleDate}</p>}
              </div>

              {/* 4. Remarks (Optional) */}
              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">
                  Remarks <span className="text-text-muted font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={e => setFormData({ ...formData, remarks: e.target.value })}
                  placeholder="Optional notes..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-bg-light/60 border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark resize-none"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border-light mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 cursor-pointer flex items-center space-x-2"
                >
                  {submitting ? (editId ? 'Updating...' : 'Adding...') : editId ? 'Update Irrigation' : 'Add Irrigation'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Irrigation Record?"
        message="Are you sure you want to delete this irrigation record? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default Irrigation;
