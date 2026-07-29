import { useState, useEffect } from 'react';
import { RiAddLine, RiCloseLine, RiDeleteBinLine, RiEditLine, RiFileTextLine, RiSearchLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ConfirmModal from '../../components/ConfirmModal';
import { formatDate } from '../../utils/dateUtils';

const Reports = () => {
  const [reports, setReports]         = useState([]);
  const [farms, setFarms]             = useState([]);
  const [search, setSearch]           = useState('');
  const [loading, setLoading]         = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [editId, setEditId]           = useState(null);
  const [errors, setErrors]           = useState({});

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId]           = useState(null);
  const [deleting, setDeleting]               = useState(false);

  const [formData, setFormData]       = useState({
    farmId:      '',
    reportType:  'Yield Analysis',
    reportDate:  '',
    description: '',
  });

  // Fetch Reports and Farms
  const fetchReportsAndFarms = async () => {
    try {
      setLoading(true);
      const [repRes, farmRes] = await Promise.all([
        api.get('/reports/getallreports'),
        api.get('/farms/getallfarms')
      ]);
      setReports(repRes.data || []);
      setFarms(farmRes.data || []);
    } catch (error) {
      console.error('Error fetching reports or farms:', error);
      toast.error('Failed to load reports data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsAndFarms();
  }, []);

  // Helper to match farmId to farmName
  const getFarmName = (farmId) => {
    const found = farms.find(f => f.farmId === farmId);
    return found ? found.farmName : `Farm #${farmId}`;
  };

  // Search filter
  const filtered = reports.filter(item => {
    const farmName = getFarmName(item.farmId);
    const type = item.reportType || '';
    const desc = item.description || '';
    const query = search.toLowerCase();
    return farmName.toLowerCase().includes(query) ||
           type.toLowerCase().includes(query) ||
           desc.toLowerCase().includes(query);
  });

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.farmId) {
      newErrors.farmId = 'Farm selection is required';
    }
    if (!formData.reportType) {
      newErrors.reportType = 'Report Type is required';
    }
    if (!formData.reportDate) {
      newErrors.reportDate = 'Report Date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditId(null);
    setFormData({
      farmId:      farms.length > 0 ? farms[0].farmId : '',
      reportType:  'Yield Analysis',
      reportDate:  '',
      description: '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setEditId(item.reportId);
    setFormData({
      farmId:      item.farmId      ?? (farms.length > 0 ? farms[0].farmId : ''),
      reportType:  item.reportType  ?? 'Yield Analysis',
      reportDate:  item.reportDate  ?? '',
      description: item.description ?? '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const payload = {
        farmId:      parseInt(formData.farmId),
        reportType:  formData.reportType,
        reportDate:  formData.reportDate,
        description: formData.description ? formData.description.trim() : null,
      };

      if (editId) {
        await api.put(`/reports/updatereport/${editId}`, payload);
        toast.success('Report Updated Successfully');
      } else {
        await api.post('/reports/addreport', payload);
        toast.success('Report Added Successfully');
      }

      setIsModalOpen(false);
      setEditId(null);
      setErrors({});
      fetchReportsAndFarms();
    } catch (error) {
      console.error('Error saving report:', error);
      toast.error(error.response?.data?.message || 'Failed to save report.');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (reportId) => {
    setDeletingId(reportId);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      setDeleting(true);
      await api.delete(`/reports/deletereport/${deletingId}`);
      toast.success('Report Deleted Successfully');
      setDeleteModalOpen(false);
      setDeletingId(null);
      fetchReportsAndFarms();
    } catch (error) {
      console.error('Error deleting report:', error);
      toast.error(error.response?.data?.message || 'Failed to delete report.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark">Reports Management</h1>
          <p className="text-sm text-text-muted mt-1">View farm analytics, yield summaries, and resource usage reports.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={openAddModal}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            <RiAddLine className="text-lg" />
            <span>Add Report</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search reports by farm, type, or description..."
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
          <p className="text-text-muted text-sm font-semibold">Loading Reports...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-border-light mb-8">
          <RiFileTextLine className="text-4xl text-text-muted mx-auto mb-3" />
          {search.trim() ? (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">No matching records found</h3>
              <p className="text-xs text-text-muted">No results for &ldquo;{search.trim()}&rdquo;. Try a different keyword.</p>
            </>
          ) : (
            <>
              <h3 className="text-base font-bold text-text-dark mb-1">No Reports Generated</h3>
              <p className="text-xs text-text-muted">Click &ldquo;Add Report&rdquo; to generate your first farm report.</p>
            </>
          )}
        </div>
      ) : (
        /* Report Table */
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light mb-8">
          <h3 className="text-lg font-bold text-text-dark mb-5">Generated Reports</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Farm</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Report Type</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Report Date</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Description</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {filtered.map(r => (
                  <tr key={r.reportId} className="hover:bg-bg-light/60 transition-colors">
                    <td className="py-3.5 px-4 text-sm font-bold text-text-dark">
                      {getFarmName(r.farmId)}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-text-muted font-semibold">
                      <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-bold">
                        {r.reportType || 'General'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-text-muted">
                      {formatDate(r.reportDate)}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-text-muted max-w-xs truncate">
                      {r.description && r.description.trim() ? r.description : <span className="italic text-text-muted">No description available</span>}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => openEditModal(r)}
                          className="text-xs font-semibold text-primary hover:bg-primary/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <RiEditLine className="inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(r.reportId)}
                          className="text-xs font-semibold text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <RiDeleteBinLine className="inline mr-1" />
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
      )}

      {/* Add / Edit Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-border-light overflow-hidden transform transition-all duration-300">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-text-dark">
                {editId ? 'Edit Report' : 'Add Report'}
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

              {/* Farm Dropdown */}
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

              {/* Report Type + Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Report Type *</label>
                  <select
                    value={formData.reportType}
                    onChange={e => {
                      setFormData({ ...formData, reportType: e.target.value });
                      if (errors.reportType) setErrors({ ...errors, reportType: null });
                    }}
                    className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark cursor-pointer ${
                      errors.reportType ? 'border-red-500 focus:ring-red-200' : 'border-border-light focus:ring-primary/20 focus:border-primary'
                    }`}
                  >
                    <option>Yield Analysis</option>
                    <option>Soil Health</option>
                    <option>Water Audit</option>
                    <option>Fertilizer Usage</option>
                    <option>Financial Summary</option>
                  </select>
                  {errors.reportType && <p className="text-xs text-red-500 font-semibold mt-1">{errors.reportType}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Report Date *</label>
                  <input
                    type="date"
                    value={formData.reportDate}
                    onChange={e => {
                      setFormData({ ...formData, reportDate: e.target.value });
                      if (errors.reportDate) setErrors({ ...errors, reportDate: null });
                    }}
                    className={`w-full px-4 py-2.5 bg-bg-light border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-text-dark ${
                      errors.reportDate ? 'border-red-500 focus:ring-red-200' : 'border-border-light focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.reportDate && <p className="text-xs text-red-500 font-semibold mt-1">{errors.reportDate}</p>}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary or details of the report..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark resize-none"
                />
              </div>

              {/* Footer Buttons */}
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
                  {submitting ? (editId ? 'Updating...' : 'Adding...') : editId ? 'Update Report' : 'Add Report'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Report?"
        message="Are you sure you want to delete this report? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default Reports;
