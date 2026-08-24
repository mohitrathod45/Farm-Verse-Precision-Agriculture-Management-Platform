import { useState, useEffect } from 'react';
import { RiAddLine, RiFlaskLine, RiCalendarLine, RiEditLine, RiDeleteBinLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ConfirmModal from '../../components/ConfirmModal';
import { formatDate } from '../../utils/dateUtils';
import PageHeader from '../../components/PageHeader';
import { useNotifications } from '../../context/NotificationContext';

const Fertilizer = () => {
  const { refreshNotifications } = useNotifications();
  const [fertilizers, setFertilizers]   = useState([]);
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
    farmId:          '',
    fertilizerName:  '',
    quantity:        '',
    applicationDate: '',
    notes:           '',
  });

  // Fetch Fertilizers and Farms
  const fetchFertilizersAndFarms = async () => {
    try {
      setLoading(true);
      const [fertRes, farmRes] = await Promise.all([
        api.get('/fertilizers/getallfertilizers'),
        api.get('/farms/getallfarms')
      ]);
      setFertilizers(fertRes.data || []);
      setFarms(farmRes.data || []);
    } catch (error) {
      console.error('Error fetching fertilizer data:', error);
      toast.error('Failed to load fertilizer records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFertilizersAndFarms();
  }, []);

  // Helper to resolve farm name
  const getFarmName = (farmId) => {
    const found = farms.find(f => f.farmId === farmId);
    return found ? found.farmName : `Farm #${farmId}`;
  };

  // Search filter
  const filtered = fertilizers.filter(item => {
    const farmName = getFarmName(item.farmId);
    const name = item.fertilizerName || '';
    const notes = item.notes || '';
    const query = search.toLowerCase();
    return farmName.toLowerCase().includes(query) ||
           name.toLowerCase().includes(query) ||
           notes.toLowerCase().includes(query);
  });

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.farmId) {
      newErrors.farmId = 'Farm selection is required';
    }
    if (!formData.fertilizerName.trim()) {
      newErrors.fertilizerName = 'Fertilizer Name is required';
    }
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    if (!formData.applicationDate) {
      newErrors.applicationDate = 'Application Date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditId(null);
    setFormData({
      farmId:          farms.length > 0 ? farms[0].farmId : '',
      fertilizerName:  '',
      quantity:        '',
      applicationDate: '',
      notes:           '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setEditId(item.fertilizerId);
    setFormData({
      farmId:          item.farmId          ?? (farms.length > 0 ? farms[0].farmId : ''),
      fertilizerName:  item.fertilizerName  ?? '',
      quantity:        item.quantity        ?? '',
      applicationDate: item.applicationDate ?? '',
      notes:           item.notes           ?? '',
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
        farmId:          parseInt(formData.farmId),
        fertilizerName:  formData.fertilizerName.trim(),
        quantity:        parseFloat(formData.quantity),
        applicationDate: formData.applicationDate,
        notes:           formData.notes || null,
      };

      if (editId) {
        await api.put(`/fertilizers/updatefertilizer/${editId}`, payload);
        toast.success('Fertilizer Updated Successfully');
      } else {
        await api.post('/fertilizers/addfertilizer', payload);
        toast.success('Fertilizer Added Successfully');
      }

      setIsModalOpen(false);
      setEditId(null);
      setErrors({});
      fetchFertilizersAndFarms();
      refreshNotifications();
    } catch (error) {
      console.error('Error saving fertilizer:', error);
      toast.error(error.response?.data?.message || 'Failed to save fertilizer.');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (fertilizerId) => {
    setDeletingId(fertilizerId);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      setDeleting(true);
      await api.delete(`/fertilizers/deletefertilizer/${deletingId}`);
      toast.success('Fertilizer Deleted Successfully');
      setDeleteModalOpen(false);
      setDeletingId(null);
      fetchFertilizersAndFarms();
      refreshNotifications();
    } catch (error) {
      console.error('Error deleting fertilizer:', error);
      toast.error(error.response?.data?.message || 'Failed to delete fertilizer.');
    } finally {
      setDeleting(false);
    }
  };

  // Derived stats
  const totalQty = fertilizers.reduce((sum, f) =>
    sum + (parseFloat(f.quantity) || 0), 0).toFixed(1);

  const uniqueNames = new Set(fertilizers.map(f => f.fertilizerName).filter(Boolean)).size;

  const stats = [
    { title: 'Total Records',   value: fertilizers.length, color: 'text-primary',   desc: 'All time' },
    { title: 'Products Used',   value: uniqueNames,         color: 'text-sky',       desc: 'Unique types' },
    { title: 'Total Quantity',  value: `${totalQty} kg`,    color: 'text-secondary', desc: 'Combined' },
  ];

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Fertilizer"
        description="Manage fertilizer usage and application records."
        action={
          <button
            onClick={openAddModal}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 text-sm font-extrabold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <RiAddLine className="text-lg" />
            <span>Add Fertilizer</span>
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
            placeholder="🔍 Search fertilizers by product name, farm, or notes..."
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

      {/* Loading / Empty */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border-light">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-3"></div>
          <p className="text-text-muted text-sm font-semibold">Loading Fertilizer Records...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-border-light mb-8">
          <RiFlaskLine className="text-4xl text-text-muted mx-auto mb-3" />
          {search.trim() ? (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">No matching records found</h3>
              <p className="text-xs text-text-muted">No results for &ldquo;{search.trim()}&rdquo;. Try a different keyword.</p>
            </>
          ) : (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">No Fertilizer Records</h3>
              <p className="text-xs text-text-muted">Click &ldquo;Add Fertilizer&rdquo; to log your first application.</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">

          {/* Table — left column */}
          <div className="xl:col-span-8 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
            <h3 className="text-lg font-bold text-text-dark mb-5">Fertilizer Records</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-light">
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Fertilizer</th>
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Farm</th>
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Application Date</th>
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Quantity</th>
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Notes</th>
                    <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {filtered.map(f => (
                    <tr key={f.fertilizerId} className="hover:bg-bg-light/60 transition-colors">
                      <td className="py-3 px-3">
                        <p className="text-sm font-bold text-text-dark">{f.fertilizerName || '—'}</p>
                      </td>
                      <td className="py-3 px-3 text-sm text-text-muted">{getFarmName(f.farmId)}</td>
                      <td className="py-3 px-3 text-sm text-text-muted">{formatDate(f.applicationDate)}</td>
                      <td className="py-3 px-3 text-sm font-semibold text-text-dark">{f.quantity ? `${f.quantity} kg` : '—'}</td>
                      <td className="py-3 px-3 text-sm text-text-muted max-w-[140px] truncate">{f.notes || '—'}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center space-x-1">
                          <button
                            onClick={() => openEditModal(f)}
                            className="text-xs font-semibold text-primary hover:bg-primary/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(f.fertilizerId)}
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

          {/* Application History — right column */}
          <div className="xl:col-span-4 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
            <h3 className="text-lg font-bold text-text-dark mb-5">Application History</h3>
            <div className="relative pl-5 border-l-2 border-border-light space-y-6">
              {filtered.slice(0, 6).map((f) => (
                <div key={f.fertilizerId} className="relative">
                  <div className="absolute -left-[27px] top-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center ring-4 ring-white">
                    <RiFlaskLine className="text-[10px] text-white" />
                  </div>
                  <p className="text-sm font-bold text-text-dark">{f.fertilizerName || 'Fertilizer'}</p>
                  <p className="text-xs text-text-muted">{getFarmName(f.farmId)}</p>
                  <p className="text-xs font-semibold text-text-muted mt-1">
                    {formatDate(f.applicationDate)}{f.quantity ? ` · ${f.quantity} kg` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-border-light overflow-hidden transform transition-all duration-300">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-text-dark">
                {editId ? 'Edit Fertilizer' : 'Add Fertilizer'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-bg-light text-text-muted transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              {/* Farm Dropdown + Fertilizer Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Farm *</label>
                  <select
                    value={formData.farmId}
                    onChange={e => {
                      setFormData({ ...formData, farmId: e.target.value });
                      if (errors.farmId) setErrors({ ...errors, farmId: null });
                    }}
                    className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark cursor-pointer ${
                      errors.farmId ? 'border-red-500 focus:ring-red-200' : 'border-border-light focus:ring-primary/20 focus:border-primary'
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

                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Fertilizer Name *</label>
                  <input
                    type="text"
                    value={formData.fertilizerName}
                    onChange={e => {
                      setFormData({ ...formData, fertilizerName: e.target.value });
                      if (errors.fertilizerName) setErrors({ ...errors, fertilizerName: null });
                    }}
                    placeholder="e.g. Urea, NPK, DAP"
                    className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark ${
                      errors.fertilizerName ? 'border-red-500 focus:ring-red-200' : 'border-border-light focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.fertilizerName && <p className="text-xs text-red-500 font-semibold mt-1">{errors.fertilizerName}</p>}
                </div>
              </div>

              {/* Quantity + Application Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Quantity (kg) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.quantity}
                    onChange={e => {
                      setFormData({ ...formData, quantity: e.target.value });
                      if (errors.quantity) setErrors({ ...errors, quantity: null });
                    }}
                    placeholder="e.g. 25.00"
                    className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark ${
                      errors.quantity ? 'border-red-500 focus:ring-red-200' : 'border-border-light focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.quantity && <p className="text-xs text-red-500 font-semibold mt-1">{errors.quantity}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Application Date *</label>
                  <input
                    type="date"
                    value={formData.applicationDate}
                    onChange={e => {
                      setFormData({ ...formData, applicationDate: e.target.value });
                      if (errors.applicationDate) setErrors({ ...errors, applicationDate: null });
                    }}
                    className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark ${
                      errors.applicationDate ? 'border-red-500 focus:ring-red-200' : 'border-border-light focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.applicationDate && <p className="text-xs text-red-500 font-semibold mt-1">{errors.applicationDate}</p>}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Optional application notes..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark resize-none"
                />
              </div>

              {/* Buttons */}
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
                  {submitting ? (editId ? 'Updating...' : 'Adding...') : editId ? 'Update Fertilizer' : 'Add Fertilizer'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Fertilizer?"
        message="Are you sure you want to delete this fertilizer record? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default Fertilizer;
