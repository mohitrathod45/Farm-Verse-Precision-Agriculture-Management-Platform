import { useState } from 'react';
import {
  RiMoneyRupeeCircleLine,
  RiCalculatorLine,
  RiPlantLine,
  RiArrowUpCircleLine,
  RiLoader4Line,
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../services/api';

const ProfitEstimation = () => {
  const [formData, setFormData] = useState({
    crop: '',
    landArea: '',
    sellingPrice: '',
    seedCost: '',
    fertilizerCost: '',
    laborCost: '',
    irrigationCost: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setResult(null);
  };

  // ==========================================
  // CALCULATE PROFIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyField = Object.values(formData).some(
      (value) => value === ''
    );

    if (emptyField) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const payload = {
        crop: formData.crop,
        landArea: Number(formData.landArea),
        sellingPrice: Number(formData.sellingPrice),
        seedCost: Number(formData.seedCost),
        fertilizerCost: Number(formData.fertilizerCost),
        laborCost: Number(formData.laborCost),
        irrigationCost: Number(formData.irrigationCost),
      };

      console.log('Profit estimation payload:', payload);

      const response = await api.post(
        '/profit-estimation/estimate',
        payload
      );

      console.log(
        'Profit estimation response:',
        response.data
      );

      setResult(response.data);

      toast.success('Profit estimated successfully!');
    } catch (error) {
      console.error(
        'Profit estimation error:',
        error
      );

      toast.error(
        error.response?.data?.message ||
          'Failed to calculate profit.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESET
  // ==========================================
  const handleReset = () => {
    setFormData({
      crop: '',
      landArea: '',
      sellingPrice: '',
      seedCost: '',
      fertilizerCost: '',
      laborCost: '',
      irrigationCost: '',
    });

    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* ==========================================
          HEADER
      ========================================== */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-xl">
            <RiMoneyRupeeCircleLine
              className="text-2xl text-green-600"
            />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-text-dark">
              Farm Profit Estimator
            </h1>

            <p className="text-sm text-text-muted mt-1">
              Estimate your expected revenue, farming
              cost, and profit.
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
          INPUT CARD
      ========================================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-light p-6 sm:p-8">
        <form onSubmit={handleSubmit}>

          {/* ========================================
              CROP DETAILS
          ======================================== */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-text-dark mb-1">
              Crop Details
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Enter the crop and land information.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* CROP */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Crop
                </label>

                <input
                  type="text"
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  placeholder="e.g. Papaya"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>

              {/* LAND AREA */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Land Area (acres)
                </label>

                <input
                  type="number"
                  name="landArea"
                  value={formData.landArea}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  min="0"
                  step="any"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>
            </div>
          </div>

          {/* ========================================
              EXPECTED REVENUE
          ======================================== */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-text-dark mb-1">
              Expected Revenue
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Enter the expected selling price of your crop.
            </p>

            <div className="max-w-md">
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                Selling Price (₹ per acre)
              </label>

              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                placeholder="e.g. 50000"
                min="0"
                step="any"
                required
                className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
              />
            </div>
          </div>

          {/* ========================================
              FARMING COSTS
          ======================================== */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-text-dark mb-1">
              Farming Costs
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Enter your estimated expenses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* SEED COST */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Seed Cost (₹)
                </label>

                <input
                  type="number"
                  name="seedCost"
                  value={formData.seedCost}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  min="0"
                  step="any"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>

              {/* FERTILIZER COST */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Fertilizer Cost (₹)
                </label>

                <input
                  type="number"
                  name="fertilizerCost"
                  value={formData.fertilizerCost}
                  onChange={handleChange}
                  placeholder="e.g. 8000"
                  min="0"
                  step="any"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>

              {/* LABOR COST */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Labor Cost (₹)
                </label>

                <input
                  type="number"
                  name="laborCost"
                  value={formData.laborCost}
                  onChange={handleChange}
                  placeholder="e.g. 12000"
                  min="0"
                  step="any"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>

              {/* IRRIGATION COST */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Irrigation Cost (₹)
                </label>

                <input
                  type="number"
                  name="irrigationCost"
                  value={formData.irrigationCost}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  min="0"
                  step="any"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>
            </div>
          </div>

          {/* ========================================
              BUTTONS
          ======================================== */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-border-light">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RiLoader4Line className="animate-spin text-lg" />
                  Calculating...
                </>
              ) : (
                <>
                  <RiCalculatorLine className="text-lg" />
                  Calculate Profit
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ==========================================
          RESULT
      ========================================== */}
      {result && (
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-green-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* RESULT HEADER */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <RiPlantLine className="text-3xl text-green-600" />
              </div>

              <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                Estimated Farm Profit
              </p>

              <h2 className="text-3xl font-extrabold text-green-700 mt-2 capitalize">
                {result.crop}
              </h2>
            </div>

            {/* EXPECTED PROFIT */}
            <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
              <p className="text-sm font-semibold text-green-800">
                Expected Profit
              </p>

              <div className="flex items-center justify-center gap-2 mt-2">
                <RiArrowUpCircleLine className="text-3xl text-green-600" />

                <p className="text-4xl font-extrabold text-green-700">
                  ₹
                  {Number(result.profit).toLocaleString('en-IN')}
                </p>
              </div>

              <p className="text-sm text-green-700 mt-2">
                Profit margin:{' '}
                {Number(result.profitPercentage).toFixed(2)}
                %
              </p>
            </div>

            {/* FINANCIAL SUMMARY */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-text-dark mb-3">
                Financial Summary
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* REVENUE */}
                <div className="bg-bg-light rounded-xl p-4">
                  <p className="text-xs text-text-muted">
                    Expected Revenue
                  </p>

                  <p className="text-xl font-bold text-text-dark mt-1">
                    ₹
                    {Number(result.revenue).toLocaleString('en-IN')}
                  </p>
                </div>

                {/* TOTAL COST */}
                <div className="bg-bg-light rounded-xl p-4">
                  <p className="text-xs text-text-muted">
                    Total Cost
                  </p>

                  <p className="text-xl font-bold text-text-dark mt-1">
                    ₹
                    {Number(result.totalCost).toLocaleString('en-IN')}
                  </p>
                </div>

                {/* NET PROFIT */}
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs text-green-700">
                    Net Profit
                  </p>

                  <p className="text-xl font-bold text-green-700 mt-1">
                    ₹
                    {Number(result.profit).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {/* CALCULATION */}
            <div className="mt-5 bg-bg-light rounded-2xl p-5">
              <h3 className="font-bold text-text-dark mb-3">
                How it was calculated
              </h3>

              <div className="text-sm text-text-muted space-y-2">
                <p>
                  <span className="font-semibold text-text-dark">
                    Revenue:
                  </span>{' '}
                  Land Area × Selling Price
                </p>

                <p>
                  <span className="font-semibold text-text-dark">
                    Total Cost:
                  </span>{' '}
                  Seeds + Fertilizer + Labor + Irrigation
                </p>

                <p>
                  <span className="font-semibold text-text-dark">
                    Profit:
                  </span>{' '}
                  Revenue − Total Cost
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfitEstimation;
