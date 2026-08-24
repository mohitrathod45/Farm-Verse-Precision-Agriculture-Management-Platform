import { useState } from 'react';
import {
  RiMoneyRupeeCircleLine,
  RiCalculatorLine,
  RiPlantLine,
} from 'react-icons/ri';

const ProfitEstimator = () => {
  const [formData, setFormData] = useState({
    crop: 'Papaya',
    landArea: '',
    yieldPerAcre: '',
    pricePerKg: '',
    seedCost: '',
    fertilizerCost: '',
    labourCost: '',
    irrigationCost: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setResult(null);
  };

  const calculateProfit = (e) => {
    e.preventDefault();

    const landArea = Number(formData.landArea);
    const yieldPerAcre = Number(formData.yieldPerAcre);
    const pricePerKg = Number(formData.pricePerKg);

    const seedCost = Number(formData.seedCost);
    const fertilizerCost = Number(formData.fertilizerCost);
    const labourCost = Number(formData.labourCost);
    const irrigationCost = Number(formData.irrigationCost);

    if (
      !landArea ||
      !yieldPerAcre ||
      !pricePerKg
    ) {
      alert('Please enter land area, yield and selling price.');
      return;
    }

    const totalYield =
      landArea * yieldPerAcre;

    const revenue =
      totalYield * pricePerKg;

    const totalCost =
      seedCost +
      fertilizerCost +
      labourCost +
      irrigationCost;

    const profit =
      revenue - totalCost;

    const profitPerAcre =
      profit / landArea;

    setResult({
      totalYield,
      revenue,
      totalCost,
      profit,
      profitPerAcre,
    });
  };

  const resetForm = () => {
    setFormData({
      crop: 'Papaya',
      landArea: '',
      yieldPerAcre: '',
      pricePerKg: '',
      seedCost: '',
      fertilizerCost: '',
      labourCost: '',
      irrigationCost: '',
    });

    setResult(null);
  };

  const formatRupee = (value) => {
    return `₹${Number(value).toLocaleString('en-IN', {
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-green-100 rounded-xl">
            <RiMoneyRupeeCircleLine className="text-2xl text-green-600" />
          </div>

          <div>

            <h1 className="text-2xl font-extrabold text-text-dark">
              Farm Profit Estimator
            </h1>

            <p className="text-sm text-text-muted mt-1">
              Estimate your farm revenue, costs and
              potential profit.
            </p>

          </div>

        </div>

      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-light p-6 sm:p-8">

        <form onSubmit={calculateProfit}>

          {/* CROP */}
          <div className="mb-7">

            <h2 className="text-lg font-bold text-text-dark mb-1">
              Crop & Land Details
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Enter your expected crop production details.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Crop
                </label>

                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >

                  <option value="Papaya">
                    Papaya
                  </option>

                  <option value="Rice">
                    Rice
                  </option>

                  <option value="Watermelon">
                    Watermelon
                  </option>

                  <option value="Jute">
                    Jute
                  </option>

                  <option value="Maize">
                    Maize
                  </option>

                  <option value="Cotton">
                    Cotton
                  </option>

                  <option value="Banana">
                    Banana
                  </option>

                </select>

              </div>

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
                  min="0.1"
                  step="any"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />

              </div>

              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Expected Yield (kg/acre)
                </label>

                <input
                  type="number"
                  name="yieldPerAcre"
                  value={formData.yieldPerAcre}
                  onChange={handleChange}
                  placeholder="e.g. 8000"
                  min="1"
                  step="any"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />

              </div>

            </div>

          </div>

          {/* MARKET */}
          <div className="mb-7">

            <h2 className="text-lg font-bold text-text-dark mb-1">
              Market Details
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Enter the expected selling price of your crop.
            </p>

            <div className="max-w-md">

              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                Selling Price (₹/kg)
              </label>

              <input
                type="number"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleChange}
                placeholder="e.g. 40"
                min="1"
                step="any"
                required
                className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />

            </div>

          </div>

          {/* COSTS */}
          <div className="mb-7">

            <h2 className="text-lg font-bold text-text-dark mb-1">
              Estimated Farming Costs
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Enter the estimated expenses for your farm.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Seed Cost (₹)
                </label>

                <input
                  type="number"
                  name="seedCost"
                  value={formData.seedCost}
                  onChange={handleChange}
                  placeholder="e.g. 15000"
                  min="0"
                  step="any"
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm text-text-dark"
                />

              </div>

              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Fertilizer (₹)
                </label>

                <input
                  type="number"
                  name="fertilizerCost"
                  value={formData.fertilizerCost}
                  onChange={handleChange}
                  placeholder="e.g. 25000"
                  min="0"
                  step="any"
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm text-text-dark"
                />

              </div>

              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Labour (₹)
                </label>

                <input
                  type="number"
                  name="labourCost"
                  value={formData.labourCost}
                  onChange={handleChange}
                  placeholder="e.g. 30000"
                  min="0"
                  step="any"
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm text-text-dark"
                />

              </div>

              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Irrigation / Other (₹)
                </label>

                <input
                  type="number"
                  name="irrigationCost"
                  value={formData.irrigationCost}
                  onChange={handleChange}
                  placeholder="e.g. 10000"
                  min="0"
                  step="any"
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm text-text-dark"
                />

              </div>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-border-light">

            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 shadow-sm flex items-center justify-center gap-2"
            >

              <RiCalculatorLine className="text-lg" />

              Calculate Profit

            </button>

          </div>

        </form>

      </div>

      {/* RESULT */}
      {result && (

        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-green-200 overflow-hidden">

          <div className="p-6 sm:p-8">

            <div className="text-center mb-6">

              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">

                <RiPlantLine className="text-3xl text-green-600" />

              </div>

              <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                Estimated Farm Profit
              </p>

              <h2 className="text-3xl font-extrabold text-green-700 mt-2">
                {formatRupee(result.profit)}
              </h2>

              <p className="text-sm text-text-muted mt-2">
                Estimated profit for {formData.crop}
              </p>

            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="bg-green-50 border border-green-100 rounded-xl p-4">

                <p className="text-xs text-text-muted">
                  Estimated Revenue
                </p>

                <p className="text-xl font-bold text-green-700 mt-1">
                  {formatRupee(result.revenue)}
                </p>

              </div>

              <div className="bg-red-50 border border-red-100 rounded-xl p-4">

                <p className="text-xs text-text-muted">
                  Total Cost
                </p>

                <p className="text-xl font-bold text-red-600 mt-1">
                  {formatRupee(result.totalCost)}
                </p>

              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

                <p className="text-xs text-text-muted">
                  Profit / Acre
                </p>

                <p className="text-xl font-bold text-blue-700 mt-1">
                  {formatRupee(result.profitPerAcre)}
                </p>

              </div>

            </div>

            {/* DETAILS */}
            <div className="mt-6 bg-bg-light rounded-2xl p-5">

              <h3 className="font-bold text-text-dark mb-4">
                Calculation Summary
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-text-muted">
                    Crop
                  </span>

                  <span className="font-bold text-text-dark">
                    {formData.crop}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-muted">
                    Land Area
                  </span>

                  <span className="font-bold text-text-dark">
                    {formData.landArea} acres
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-muted">
                    Total Expected Yield
                  </span>

                  <span className="font-bold text-text-dark">
                    {result.totalYield.toLocaleString('en-IN')} kg
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-muted">
                    Selling Price
                  </span>

                  <span className="font-bold text-text-dark">
                    ₹{formData.pricePerKg}/kg
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ProfitEstimator;