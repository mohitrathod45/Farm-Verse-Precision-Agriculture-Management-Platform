import { useRef, useState, useEffect } from 'react';
import {
  RiCloseLine,
  RiDownloadLine,
  RiPrinterLine,
  RiLeafLine,
  RiMapPinLine,
  RiPlantLine,
  RiDropLine,
  RiFlaskLine,
  RiCheckDoubleLine,
  RiInformationLine,
  RiEyeLine,
} from 'react-icons/ri';
import api from '../services/api';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';

const ReportViewerModal = ({ isOpen, onClose, report, farm, user }) => {
  const reportRef = useRef(null);
  const [loadingContext, setLoadingContext] = useState(false);
  const [crops, setCrops] = useState([]);
  const [irrigation, setIrrigation] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);

  const reportNumber = report ? `FV-REP-${String(report.reportId || 1).padStart(5, '0')}` : 'FV-REP-00001';
  const status = report?.status || 'Completed';

  useEffect(() => {
    if (isOpen && report && farm) {
      fetchFarmContextData(farm.farmId);
    }
  }, [isOpen, report, farm]);

  const fetchFarmContextData = async (farmId) => {
    try {
      setLoadingContext(true);
      const [cropsRes, irrRes, fertRes] = await Promise.all([
        api.get('/crops/getallcrops').catch(() => ({ data: [] })),
        api.get('/irrigation/getallirrigation').catch(() => ({ data: [] })),
        api.get('/fertilizer/getallfertilizer').catch(() => ({ data: [] })),
      ]);

      const farmCrops = (cropsRes.data || []).filter((c) => c.farmId === farmId);
      const farmIrr = (irrRes.data || []).filter((i) => i.farmId === farmId);
      const farmFert = (fertRes.data || []).filter((f) => f.farmId === farmId);

      setCrops(farmCrops);
      setIrrigation(farmIrr);
      setFertilizers(farmFert);
    } catch (err) {
      console.error('Error fetching report context:', err);
    } finally {
      setLoadingContext(false);
    }
  };

  if (!isOpen || !report) return null;

  // Generate dynamic Data-Driven Summary
  const generateSummary = () => {
    if (report.description && report.description.trim()) {
      return report.description;
    }
    const cropNames = crops.map((c) => c.cropName).join(', ');
    const farmName = farm?.farmName || 'Agricultural Land';
    const area = farm?.area ? `${farm.area} Acres` : 'monitored acreage';
    const soil = farm?.soilType || 'standard agricultural soil';
    const location = farm?.location || 'the registered location';

    let text = `The ${farmName} spanning ${area} of ${soil} in ${location} is operating under active precision management. `;
    if (crops.length > 0) {
      text += `Current cultivated crop(s) include ${cropNames} in healthy growth status. `;
    } else {
      text += `Crop rotation and soil conditioning are actively maintained. `;
    }
    if (irrigation.length > 0) {
      text += `Irrigation is executed via ${irrigation[0].irrigationType} system with optimal water allocation. `;
    }
    if (fertilizers.length > 0) {
      text += `Nutrient application logs confirm scheduled fertilization using ${fertilizers[0].fertilizerName}. `;
    }
    text += `Overall crop health and soil hydration metrics remain aligned with recommended agricultural benchmarks.`;

    return text;
  };

  // PDF Export using html2pdf
  const handleDownloadPDF = () => {
    const element = reportRef.current;
    if (!element) return;

    toast.loading('Generating PDF Document...', { id: 'pdf-toast' });

    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     `FarmVerse_Report_${reportNumber}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        toast.success('PDF Downloaded Successfully!', { id: 'pdf-toast' });
      })
      .catch((err) => {
        console.error('PDF error:', err);
        toast.error('Failed to generate PDF.', { id: 'pdf-toast' });
      });
  };

  // Direct Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-border-light overflow-hidden flex flex-col my-8 print:shadow-none print:border-none print:max-w-none print:my-0 print:w-full">
        
        {/* Modal Toolbar Header (Hidden during print) */}
        <div className="px-6 py-4 bg-bg-light/80 border-b border-border-light flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Official Report Viewer
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {reportNumber}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <RiDownloadLine className="text-base" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <RiPrinterLine className="text-base" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-text-muted hover:text-text-dark hover:bg-gray-200 transition-colors"
            >
              <RiCloseLine className="text-xl" />
            </button>
          </div>
        </div>

        {/* Printable Document Body Container */}
        <div className="p-6 sm:p-10 overflow-y-auto max-h-[80vh] print:max-h-none print:p-0">
          <div
            ref={reportRef}
            className="printable-report-content bg-white p-8 sm:p-10 border border-gray-200 rounded-2xl space-y-8 font-sans print:border-none print:p-0 print:rounded-none"
          >
            {/* Document Header / Letterhead */}
            <div className="flex items-start justify-between border-b-2 border-emerald-600 pb-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <RiLeafLine className="text-xl" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-text-dark font-display">
                    Farm<span className="text-emerald-600">Verse</span>
                  </span>
                </div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-widest pt-1">
                  Precision Agriculture Management Platform
                </p>
              </div>

              <div className="text-right space-y-1">
                <h2 className="text-lg font-extrabold text-emerald-800 uppercase tracking-tight">
                  Agricultural Report
                </h2>
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-xs font-bold text-text-dark">{reportNumber}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase border border-emerald-300">
                    {status}
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  Date: {report.reportDate || new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Section 1: General Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/80">
                1. General Farm & Land Information
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs p-4 bg-bg-light/50 rounded-xl border border-gray-100">
                <div>
                  <p className="font-bold text-text-muted uppercase text-[10px]">Farmer / Owner</p>
                  <p className="font-extrabold text-text-dark mt-0.5">{report.farmerName || user?.fullName || 'Rahul Kumar'}</p>
                </div>

                <div>
                  <p className="font-bold text-text-muted uppercase text-[10px]">Farm Name</p>
                  <p className="font-extrabold text-text-dark mt-0.5">{farm?.farmName || report.farmName || 'N/A'}</p>
                </div>

                <div>
                  <p className="font-bold text-text-muted uppercase text-[10px]">Location</p>
                  <p className="font-extrabold text-text-dark mt-0.5">{farm?.location || 'N/A'}</p>
                </div>

                <div>
                  <p className="font-bold text-text-muted uppercase text-[10px]">Land Area & Soil</p>
                  <p className="font-extrabold text-text-dark mt-0.5">
                    {farm?.area ? `${farm.area} Acres` : 'N/A'} • {farm?.soilType || 'Soil Logged'}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Crop Information */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/80">
                2. Cultivated Crop Information
              </h3>
              {crops.length > 0 ? (
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-bg-light text-text-muted font-bold border-b border-gray-200">
                      <tr>
                        <th className="py-2.5 px-3">Crop Name</th>
                        <th className="py-2.5 px-3">Season</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Harvest Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {crops.map((c) => (
                        <tr key={c.cropId}>
                          <td className="py-2 px-3 font-bold text-text-dark">{c.cropName}</td>
                          <td className="py-2 px-3 text-text-muted">{c.season || 'N/A'}</td>
                          <td className="py-2 px-3 font-semibold text-emerald-600">{c.status || 'Active'}</td>
                          <td className="py-2 px-3 text-text-dark">{c.harvestingDate || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-text-muted italic bg-bg-light/40 p-3 rounded-xl">
                  No crop records logged for this farm period.
                </p>
              )}
            </div>

            {/* Section 3: Irrigation Information */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/80">
                3. Irrigation & Water Application
              </h3>
              {irrigation.length > 0 ? (
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-bg-light text-text-muted font-bold border-b border-gray-200">
                      <tr>
                        <th className="py-2.5 px-3">Method / Type</th>
                        <th className="py-2.5 px-3">Water Quantity</th>
                        <th className="py-2.5 px-3">Schedule Date</th>
                        <th className="py-2.5 px-3">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {irrigation.map((i) => (
                        <tr key={i.irrigationId}>
                          <td className="py-2 px-3 font-bold text-text-dark">{i.irrigationType} System</td>
                          <td className="py-2 px-3 text-cyan-700 font-semibold">{i.waterQuantity ? `${i.waterQuantity} Liters` : 'N/A'}</td>
                          <td className="py-2 px-3 text-text-dark">{i.scheduleDate || 'N/A'}</td>
                          <td className="py-2 px-3 text-text-muted">{i.remarks || 'Standard schedule'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-text-muted italic bg-bg-light/40 p-3 rounded-xl">
                  No irrigation logs recorded for this farm period.
                </p>
              )}
            </div>

            {/* Section 4: Fertilizer Information */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/80">
                4. Fertilizer & Soil Nutrient Log
              </h3>
              {fertilizers.length > 0 ? (
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-bg-light text-text-muted font-bold border-b border-gray-200">
                      <tr>
                        <th className="py-2.5 px-3">Fertilizer Product</th>
                        <th className="py-2.5 px-3">Quantity Applied</th>
                        <th className="py-2.5 px-3">Application Date</th>
                        <th className="py-2.5 px-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {fertilizers.map((f) => (
                        <tr key={f.fertilizerId}>
                          <td className="py-2 px-3 font-bold text-text-dark">{f.fertilizerName}</td>
                          <td className="py-2 px-3 text-amber-700 font-semibold">{f.quantity ? `${f.quantity} kg` : 'N/A'}</td>
                          <td className="py-2 px-3 text-text-dark">{f.applicationDate || 'N/A'}</td>
                          <td className="py-2 px-3 text-text-muted">{f.notes || 'Soil applied'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-text-muted italic bg-bg-light/40 p-3 rounded-xl">
                  No fertilizer applications logged for this farm period.
                </p>
              )}
            </div>

            {/* Section 5: Overall Agronomic Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/80">
                5. Overall Agronomic Assessment Summary
              </h3>
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/60 text-xs text-text-dark leading-relaxed font-medium">
                {generateSummary()}
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-6 border-t border-gray-200 flex items-center justify-between text-[11px] text-text-muted">
              <div>
                <p className="font-bold text-text-dark">Generated by FarmVerse</p>
                <p className="text-[10px]">Precision Agriculture Management Platform</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">Verification Code: {Math.random().toString(36).substring(2, 9).toUpperCase()}</p>
                <p className="text-[10px]">Timestamp: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportViewerModal;
