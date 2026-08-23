import { useState } from 'react';

import {
  RiPlantLine,
  RiLeafLine,
  RiLoader4Line,
  RiMapPin2Line,
  RiSearchLine,
} from 'react-icons/ri';

import toast from 'react-hot-toast';

import api from '../../services/api';
import { fetchWeatherData } from '../../services/weatherService';

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

  const [city, setCity] = useState('Hyderabad');

  const [weatherLoading, setWeatherLoading] =
    useState(false);

  const [weatherLoaded, setWeatherLoaded] =
    useState(false);

  const [recommendation, setRecommendation] =
    useState('');

  const [loading, setLoading] = useState(false);

  // ==================================================
  // LOAD WEATHER
  // ==================================================
  const loadWeather = async (targetCity = city) => {
    if (!targetCity.trim()) {
      toast.error('Please enter a city name.');
      return;
    }

    try {
      setWeatherLoading(true);

      const weather =
        await fetchWeatherData(targetCity);

      // ----------------------------------------------
      // Current temperature
      // ----------------------------------------------
      const currentTemperature =
        weather.current?.temp ?? '';

      // ----------------------------------------------
      // Current humidity
      // ----------------------------------------------
      const currentHumidity =
        weather.current?.humidityValue ?? '';

      // ----------------------------------------------
      // Rainfall
      //
      // IMPORTANT:
      // We use the actual precipitation values
      // returned by the weather API.
      //
      // We DO NOT multiply or artificially change
      // the rainfall value.
      // ----------------------------------------------
      const forecast =
        weather.forecast || [];

      const totalRainfall =
        forecast.reduce(
          (total, day) =>
            total +
            (Number(day.precipSum) || 0),
          0
        );

      // ----------------------------------------------
      // Update form
      // ----------------------------------------------
      setFormData((prev) => ({
        ...prev,

        temperature: currentTemperature,

        humidity: currentHumidity,

        rainfall:
          Number(totalRainfall.toFixed(2)),
      }));

      setCity(
        weather.rawCity || targetCity
      );

      setWeatherLoaded(true);

      toast.success(
        `Weather data loaded for ${
          weather.rawCity || targetCity
        }`
      );

      console.log(
        'Weather data:',
        weather
      );

      console.log(
        'Total forecast rainfall:',
        totalRainfall,
        'mm'
      );
    } catch (error) {
      console.error(
        'Weather error:',
        error
      );

      setWeatherLoaded(false);

      toast.error(
        error.message ||
          'Unable to fetch weather data for this location.'
      );
    } finally {
      setWeatherLoading(false);
    }
  };

  // ==================================================
  // HANDLE INPUT CHANGE
  // ==================================================
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setRecommendation('');
  };

  // ==================================================
  // SUBMIT CROP RECOMMENDATION
  // ==================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check empty fields
    const emptyField =
      Object.values(formData).some(
        (value) => value === ''
      );

    if (emptyField) {
      toast.error(
        'Please fill in all fields.'
      );
      return;
    }

    try {
      setLoading(true);

      setRecommendation('');

      // ----------------------------------------------
      // Prepare ML model input
      // ----------------------------------------------
      const payload = {
        N: Number(formData.N),

        P: Number(formData.P),

        K: Number(formData.K),

        temperature:
          Number(formData.temperature),

        humidity:
          Number(formData.humidity),

        ph:
          Number(formData.ph),

        rainfall:
          Number(formData.rainfall),
      };

      console.log(
        'Crop recommendation payload:',
        payload
      );

      // ----------------------------------------------
      // Send data to Spring Boot backend
      // ----------------------------------------------
      const response =
        await api.post(
          '/crop-recommendation/recommend',
          payload
        );

      const result =
        response.data;

      // ----------------------------------------------
      // Read recommendation
      // ----------------------------------------------
      setRecommendation(
        typeof result === 'string'
          ? result
          : result.recommendation ||
              result.crop ||
              result.predictedCrop ||
              result.result ||
              JSON.stringify(result)
      );

      toast.success(
        'Crop recommendation generated!'
      );
    } catch (error) {
      console.error(
        'Crop recommendation error:',
        error
      );

      toast.error(
        error.response?.data?.message ||
          'Failed to get crop recommendation.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // RESET
  // ==================================================
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

    setCity('Hyderabad');

    setWeatherLoaded(false);

    setRecommendation('');
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* ============================================
          HEADER
      ============================================ */}
      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-green-100 rounded-xl">

            <RiLeafLine
              className="text-2xl text-green-600"
            />

          </div>

          <div>

            <h1 className="text-2xl font-extrabold text-text-dark">
              AI Crop Recommendation
            </h1>

            <p className="text-sm text-text-muted mt-1">
              Get an AI-based crop recommendation
              using soil and weather conditions.
            </p>

          </div>

        </div>

      </div>

      {/* ============================================
          MAIN CARD
      ============================================ */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-light p-6 sm:p-8">

        <form onSubmit={handleSubmit}>

          {/* ========================================
              SOIL PARAMETERS
          ======================================== */}
          <div className="mb-8">

            <h2 className="text-lg font-bold text-text-dark mb-1">
              Soil Parameters
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Enter the nutrient values available
              in your soil.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              {/* NITROGEN */}
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

              {/* PHOSPHORUS */}
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

              {/* POTASSIUM */}
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

          {/* ========================================
              WEATHER PARAMETERS
          ======================================== */}
          <div className="mb-8">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-text-dark mb-1">
                Weather Parameters
              </h2>

              <p className="text-sm text-text-muted">
                Get temperature, humidity, and
                rainfall automatically from the
                weather API.
              </p>

            </div>

            {/* LOCATION */}
            <div className="bg-bg-light border border-border-light rounded-2xl p-4 mb-5">

              <div className="flex items-center gap-2 mb-3">

                <RiMapPin2Line
                  className="text-lg text-primary"
                />

                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Farm Location
                </label>

              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                <div className="relative flex-1">

                  <RiSearchLine
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                  />

                  <input
                    type="text"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setWeatherLoaded(false);
                    }}
                    placeholder="Enter city (e.g. Pune)"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-border-light rounded-xl text-sm font-semibold text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />

                </div>

                <button
                  type="button"
                  onClick={() =>
                    loadWeather(city)
                  }
                  disabled={weatherLoading}
                  className="px-5 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >

                  {weatherLoading ? (
                    <>
                      <RiLoader4Line className="animate-spin text-lg" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <RiSearchLine className="text-lg" />
                      Get Weather
                    </>
                  )}

                </button>

              </div>

              {weatherLoaded && (
                <div className="flex items-center gap-2 mt-3 text-xs font-semibold text-green-700">

                  <span className="w-2 h-2 rounded-full bg-green-500"></span>

                  Weather data loaded for {city}

                </div>
              )}

            </div>

            {/* WEATHER VALUES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* TEMPERATURE */}
              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Temperature (°C)
                </label>

                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  readOnly
                  placeholder="Get weather data"
                  className="w-full px-4 py-3 bg-gray-100 border border-border-light rounded-xl text-sm text-text-dark cursor-not-allowed"
                />

                <p className="text-[10px] text-text-muted mt-1">
                  From Weather API
                </p>

              </div>

              {/* HUMIDITY */}
              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Humidity (%)
                </label>

                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  readOnly
                  placeholder="Get weather data"
                  className="w-full px-4 py-3 bg-gray-100 border border-border-light rounded-xl text-sm text-text-dark cursor-not-allowed"
                />

                <p className="text-[10px] text-text-muted mt-1">
                  From Weather API
                </p>

              </div>

              {/* PH */}
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

                <p className="text-[10px] text-text-muted mt-1">
                  Enter from soil test
                </p>

              </div>

              {/* RAINFALL */}
              <div>

                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Rainfall (mm)
                </label>

                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  readOnly
                  placeholder="Get weather data"
                  className="w-full px-4 py-3 bg-gray-100 border border-border-light rounded-xl text-sm text-text-dark cursor-not-allowed"
                />

                <p className="text-[10px] text-text-muted mt-1">
                  7-day forecast precipitation total
                </p>

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
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <RiPlantLine className="text-lg" />
                  <span>
                    Get Recommendation
                  </span>
                </>
              )}

            </button>

          </div>

        </form>

      </div>

      {/* ============================================
          RECOMMENDATION RESULT
      ============================================ */}
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
              Based on the soil and weather
              conditions for {city}.
            </p>

          </div>

        </div>
      )}

    </div>
  );
};

export default CropRecommendation;