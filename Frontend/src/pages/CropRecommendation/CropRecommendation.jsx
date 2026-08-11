import { useState } from 'react';
import { RiPlantLine, RiLeafLine, RiLoader4Line } from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../services/api';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });

  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous recommendation when user changes input
    setRecommendation('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check that all fields are filled
    const emptyField = Object.values(formData).some(
      (value) => value === ''
    );

    if (emptyField) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setRecommendation('');

      const payload = {
        N: Number(formData.N),
        P: Number(formData.P),
        K: Number(formData.K),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall),
      };

      const response = await api.post(
        '/crop-recommendation/recommend',
        payload
      );

      // Spring Boot returns the recommended crop
      const result = response.data;

      setRecommendation(
        typeof result === 'string'
          ? result
          : result.recommendation ||
            result.crop ||
            result.predictedCrop ||
            result.result ||
            JSON.stringify(result)
      );

      toast.success('Crop recommendation generated!');
    } catch (error) {
      console.error('Crop recommendation error:', error);

      toast.error(
        error.response?.data?.message ||
          'Failed to get crop recommendation.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      N: '',
      P: '',
      K: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: '',
    });

    setRecommendation('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-xl">
            <RiLeafLine className="text-2xl text-green-600" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-text-dark">
              AI Crop Recommendation
            </h1>

            <p className="text-sm text-text-muted mt-1">
              Get an AI-based crop recommendation using soil and weather
              conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-light p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          {/* Soil Parameters */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-text-dark mb-1">
              Soil Parameters
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Enter the nutrient values available in your soil.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Nitrogen */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Nitrogen (N)
                </label>

                <input
                  type="number"
                  name="N"
                  value={formData.N}
                  onChange={handleChange}
                  placeholder="e.g. 90"
                  step="any"
                  min="0"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>

              {/* Phosphorus */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Phosphorus (P)
                </label>

                <input
                  type="number"
                  name="P"
                  value={formData.P}
                  onChange={handleChange}
                  placeholder="e.g. 42"
                  step="any"
                  min="0"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>

              {/* Potassium */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Potassium (K)
                </label>

                <input
                  type="number"
                  name="K"
                  value={formData.K}
                  onChange={handleChange}
                  placeholder="e.g. 43"
                  step="any"
                  min="0"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>
            </div>
          </div>

          {/* Weather Parameters */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-text-dark mb-1">
              Weather Parameters
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Enter the current or expected environmental conditions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Temperature */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Temperature (°C)
                </label>

                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="e.g. 25.5"
                  step="any"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>

              {/* Humidity */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Humidity (%)
                </label>

                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  placeholder="e.g. 80"
                  step="any"
                  min="0"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>

              {/* pH */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Soil pH
                </label>

                <input
                  type="number"
                  name="ph"
                  value={formData.ph}
                  onChange={handleChange}
                  placeholder="e.g. 6.5"
                  step="any"
                  min="0"
                  max="14"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>

              {/* Rainfall */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Rainfall (mm)
                </label>

                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  placeholder="e.g. 200"
                  step="any"
                  min="0"
                  required
                  className="w-full px-4 py-3 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
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
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <RiPlantLine className="text-lg" />
                  <span>Get Recommendation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Recommendation Result */}
      {recommendation && (
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-green-200 overflow-hidden">
          <div className="p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <RiPlantLine className="text-3xl text-green-600" />
            </div>

            <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">
              AI Recommended Crop
            </p>

            <h2 className="text-3xl font-extrabold text-green-700 mt-2 capitalize">
              {recommendation}
            </h2>

            <p className="text-sm text-text-muted mt-3">
              Based on the soil and weather conditions you entered.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;