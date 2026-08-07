import { useState, useEffect } from 'react';
import {
  RiBarChart2Line,
  RiSearchLine,
  RiUser3Line,
  RiMap2Line,
  RiCalendarLine,
  RiFileTextLine,
  RiEyeLine,
  RiDownloadLine,
  RiPrinterLine,
} from 'react-icons/ri';
import api from '../../services/api';
import toast from 'react-hot-toast';
import ReportViewerModal from '../../components/ReportViewerModal';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Viewer State
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/reports');
      setReports(res.data || []);
    } catch (error) {
      toast.error('Failed to load agronomy reports');
    } finally {
      setLoading(false);
    }
  };

  const openViewerModal = (report) => {
    setSelectedReport(report);
    setViewerOpen(true);
  };

  const filtered = reports.filter((item) => {
    const query = searchQuery.toLowerCase();
    const typeMatch = item.reportType && item.reportType.toLowerCase().includes(query);
    const farmerMatch = item.farmerName && item.farmerName.toLowerCase().includes(query);
    const farmMatch = item.farmName && item.farmName.toLowerCase().includes(query);
    const descMatch = item.description && item.description.toLowerCase().includes(query);
    const reportNum = `FV-REP-${String(item.reportId || 1).padStart(5, '0')}`;
    return typeMatch || farmerMatch || farmMatch || descMatch || reportNum.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark font-display">
            System Agronomy Reports
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Global view of farm health, yield analysis, and official reports ({reports.length} Total Reports)
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-lg" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by report #, type, farmer, farm..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-bg-light/50"
          />
        </div>
        <div className="text-xs font-semibold text-text-muted">
          Showing <span className="text-text-dark font-bold">{filtered.length}</span> of {reports.length} Reports
        </div>
      </div>

      {/* Reports Grid */}
      {loading ? (
        <div className="p-12 text-center text-primary font-semibold flex items-center justify-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading system reports...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-border-light">
          <RiBarChart2Line className="text-4xl text-text-muted mx-auto" />
          <p className="text-base font-bold text-text-dark">No reports found</p>
          <p className="text-xs text-text-muted">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => {
            const reportNum = `FV-REP-${String(item.reportId || 1).padStart(5, '0')}`;
            return (
              <div
                key={item.reportId}
                className="bg-white rounded-3xl p-6 border border-border-light shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl shrink-0">
                      <RiFileTextLine />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-emerald-800">{reportNum}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase border border-emerald-200">
                          Completed
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-text-dark font-display group-hover:text-primary transition-colors mt-0.5">
                        {item.reportType}
                      </h3>
                      <p className="text-xs text-text-muted flex items-center space-x-1 mt-0.5">
                        <RiMap2Line className="text-primary" />
                        <span>Farm: {item.farmName || 'Unknown Farm'}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-muted bg-bg-light px-2.5 py-1 rounded-lg">
                    {item.reportDate || 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-100/80 text-xs text-emerald-800 font-bold">
                  <div className="flex items-center space-x-2">
                    <RiUser3Line className="text-emerald-600" />
                    <span>Farmer: {item.farmerName || 'Unknown Farmer'}</span>
                  </div>
                </div>

                {item.description && (
                  <div className="bg-bg-light/60 p-3.5 rounded-2xl border border-border-light/40 text-xs text-text-dark leading-relaxed">
                    {item.description}
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 border-t border-border-light/60 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => openViewerModal(item)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <RiEyeLine />
                    <span>View Official Report</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Official Report Document Viewer Modal */}
      <ReportViewerModal
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        report={selectedReport}
        farm={selectedReport ? { farmId: selectedReport.farmId, farmName: selectedReport.farmName, location: 'Farm Location', area: 5.0, soilType: 'Fertile Soil' } : null}
        user={selectedReport ? { fullName: selectedReport.farmerName } : null}
      />
    </div>
  );
};

export default AdminReports;
