import { useState } from 'react';

import {
  RiPlantLine,
  RiLeafLine,
  RiLoader4Line,
  RiMapPin2Line,
  RiSearchLine,
  RiWaterFlashLine,
  RiTempHotLine,
  RiSeedlingLine,
  RiShieldCheckLine,
  RiMoneyRupeeCircleLine,
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
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  const [recommendation, setRecommendation] = useState('');
  const [topCrops, setTopCrops] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==================================================
  // PROFIT ESTIMATION
  // ==================================================

  const [profitData, setProfitData] = useState({
    landArea: '',
    sellingPrice: '',
    seedCost: '',
    fertilizerCost: '',
    laborCost: '',
    irrigationCost: '',
  });

  const [profitResult, setProfitResult] = useState(null);
  const [profitLoading, setProfitLoading] = useState(false);

  // ==================================================
  // CROP REASON
  // ==================================================

  const getCropReason = () => {
    const crop = recommendation.toLowerCase();

    if (crop.includes('papaya')) {
      return 'Papaya generally prefers warm temperatures, good humidity, suitable soil nutrients, and adequate water availability.';
    }

    if (crop.includes('rice')) {
      return 'Rice generally performs well with high humidity, sufficient rainfall, and suitable soil nutrient levels.';
    }

    if (crop.includes('maize')) {
      return 'Maize is suitable when the soil has balanced nutrients with warm temperature and moderate rainfall.';
    }

    if (crop.includes('mungbean')) {
      return 'Mungbean is commonly suitable for warm conditions with moderate soil moisture and suitable nutrient levels.';
    }

    if (crop.includes('mothbeans')) {
      return 'Mothbeans are well suited to warm and relatively dry conditions and can tolerate lower rainfall.';
    }

    if (crop.includes('muskmelon')) {
      return 'Muskmelon generally prefers warm temperatures, suitable soil pH, and relatively lower humidity.';
    }

    if (crop.includes('orange')) {
      return 'Orange can perform well under suitable temperature, humidity, rainfall, and soil conditions.';
    }

    if (crop.includes('cotton')) {
      return 'Cotton generally prefers warm conditions with suitable soil nutrients and moderate rainfall.';
    }

    if (crop.includes('chickpea')) {
      return 'Chickpea generally performs well under moderate temperatures and suitable soil moisture conditions.';
    }

    if (crop.includes('banana')) {
      return 'Banana generally prefers warm temperatures, higher humidity, and good water availability.';
    }

    if (crop.includes('watermelon')) {
      return 'Watermelon generally prefers warm temperatures and suitable soil moisture conditions.';
    }

    if (crop.includes('jute')) {
      return 'Jute generally performs well in warm, humid conditions with adequate moisture and suitable fertile soil.';
    }

    return 'This crop was selected by the AI model based on the soil and weather parameters you provided.';
  };

  // ==================================================
  // FARMING ADVICE
  // ==================================================

  const getFarmingAdvice = () => {
    const crop = recommendation.toLowerCase();

    if (crop.includes('papaya')) {
      return {
        soil: 'Use fertile, well-drained sandy loam or loamy soil. Avoid waterlogging.',
        temperature: 'Papaya grows well in warm conditions, generally around 22–35°C.',
        water: 'Provide regular irrigation and keep the soil moist, but avoid stagnant water.',
        fertilizer: 'Use organic manure and balanced nutrients based on soil-test recommendations.',
        care: 'Maintain good drainage, control weeds, and regularly monitor plants for pests and diseases.',
      };
    }

    if (crop.includes('rice')) {
      return {
        soil: 'Rice grows well in fertile soils that can retain adequate moisture.',
        temperature: 'Rice prefers warm growing conditions.',
        water: 'Maintain sufficient soil moisture according to the crop stage and local conditions.',
        fertilizer: 'Use balanced nutrients based on soil-test recommendations.',
        care: 'Monitor weeds, pests, diseases, and water availability regularly.',
      };
    }

    if (crop.includes('maize')) {
      return {
        soil: 'Use fertile, well-drained soil with good nutrient availability.',
        temperature: 'Maize performs well under warm growing conditions.',
        water: 'Provide adequate irrigation, especially during important growth stages.',
        fertilizer: 'Apply nutrients based on soil-test recommendations.',
        care: 'Monitor weeds, pests, and moisture stress throughout the crop cycle.',
      };
    }

    if (crop.includes('watermelon')) {
      return {
        soil: 'Use fertile, well-drained soil with good drainage.',
        temperature: 'Watermelon prefers warm temperatures and good sunlight.',
        water: 'Provide regular irrigation while avoiding excessive waterlogging.',
        fertilizer: 'Use balanced fertilizer based on soil-test recommendations.',
        care: 'Monitor vines, fruits, pests, diseases, and soil moisture regularly.',
      };
    }

    if (crop.includes('banana')) {
      return {
        soil: 'Use fertile, deep, well-drained soil with good organic matter.',
        temperature: 'Banana prefers warm and humid growing conditions.',
        water: 'Provide regular water because banana requires good moisture availability.',
        fertilizer: 'Use balanced nutrients according to soil-test recommendations.',
        care: 'Maintain drainage and monitor plants for pests and diseases.',
      };
    }

    if (crop.includes('cotton')) {
      return {
        soil: 'Cotton performs well in fertile, well-drained soil.',
        temperature: 'Cotton prefers warm growing conditions.',
        water: 'Provide sufficient moisture while avoiding excessive waterlogging.',
        fertilizer: 'Use nutrients according to soil-test recommendations.',
        care: 'Regularly monitor for insects, diseases, weeds, and moisture stress.',
      };
    }

    if (crop.includes('chickpea')) {
      return {
        soil: 'Chickpea generally prefers well-drained soil with suitable fertility.',
        temperature: 'Moderate temperatures are generally suitable for chickpea.',
        water: 'Avoid excessive irrigation and waterlogging.',
        fertilizer: 'Use balanced nutrients according to soil-test recommendations.',
        care: 'Monitor the crop for weeds, pests, and diseases.',
      };
    }

    if (crop.includes('jute')) {
      return {
        soil: 'Use fertile soil with good moisture availability and drainage.',
        temperature: 'Jute prefers warm and humid conditions.',
        water: 'Maintain adequate moisture during crop growth.',
        fertilizer: 'Apply nutrients according to soil-test recommendations.',
        care: 'Monitor weeds, pests, diseases, and moisture conditions regularly.',
      };
    }

    return {
      soil: 'Use fertile, well-drained soil suitable for the recommended crop.',
      temperature: 'Maintain temperature conditions suitable for the recommended crop.',
      water: 'Provide adequate water according to crop requirements and local weather.',
      fertilizer: 'Use balanced fertilizer based on soil-test recommendations.',
      care: 'Regularly monitor the crop for pests, diseases, weeds, and water stress.',
    };
  };

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

      const weather = await fetchWeatherData(targetCity);

      const currentTemperature =
        weather.current?.temp ?? '';

      const currentHumidity =
        weather.current?.humidityValue ?? '';

      const forecast = weather.forecast || [];

      const totalRainfall = forecast.reduce(
        (total, day) =>
          total + (Number(day.precipSum) || 0),
        0
      );

      setFormData((prev) => ({
        ...prev,
        temperature: currentTemperature,
        humidity: currentHumidity,
        rainfall: Number(totalRainfall.toFixed(2)),
      }));

      setCity(weather.rawCity || targetCity);
      setWeatherLoaded(true);

      toast.success(
        `Weather data loaded for ${
          weather.rawCity || targetCity
        }`
      );

      console.log('Weather data:', weather);

      console.log(
        'Total forecast rainfall:',
        totalRainfall,
        'mm'
      );
    } catch (error) {
      console.error('Weather error:', error);

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setRecommendation('');
    setTopCrops([]);
    setProfitResult(null);
  };

  // ==================================================
  // PROFIT INPUT CHANGE
  // ==================================================

  const handleProfitChange = (e) => {
    const { name, value } = e.target;

    setProfitData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setProfitResult(null);
  };

  // ==================================================
  // SUBMIT CROP RECOMMENDATION
  // ==================================================

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
      setRecommendation('');
      setTopCrops([]);
      setProfitResult(null);

      const payload = {
        N: Number(formData.N),
        P: Number(formData.P),
        K: Number(formData.K),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall),
      };

      console.log(
        'Crop recommendation payload:',
        payload
      );

      const response = await api.post(
        '/crop-recommendation/recommend',
        payload
      );

      const result = response.data;

      console.log(
        'Crop recommendation response:',
        result
      );

      if (typeof result === 'string') {
        setRecommendation(result);
      } else {
        setRecommendation(
          result.recommendation ||
            result.crop ||
            result.predictedCrop ||
            result.recommended_crop ||
            result.result ||
            ''
        );

        if (Array.isArray(result.top_3_crops)) {
          setTopCrops(result.top_3_crops);
        }
      }

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
  // CALCULATE PROFIT
  // ==================================================

  const handleProfitSubmit = async (e) => {
    e.preventDefault();

    const emptyField = Object.values(profitData).some(
      (value) => value === ''
    );

    if (emptyField) {
      toast.error(
        'Please enter all profit estimation values.'
      );
      return;
    }

    try {
      setProfitLoading(true);
      setProfitResult(null);

      const payload = {
        crop: recommendation,
        landArea: Number(profitData.landArea),
        sellingPrice: Number(profitData.sellingPrice),
        seedCost: Number(profitData.seedCost),
        fertilizerCost: Number(
          profitData.fertilizerCost
        ),
        laborCost: Number(profitData.laborCost),
        irrigationCost: Number(
          profitData.irrigationCost
        ),
      };

      console.log(
        'Profit estimation payload:',
        payload
      );

      const response = await api.post(
        '/profit-estimation/estimate',
        payload
      );

      console.log(
        'Profit estimation response:',
        response.data
      );

      setProfitResult(response.data);

      toast.success(
        'Profit estimation calculated!'
      );
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
      setProfitLoading(false);
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
    setTopCrops([]);

    setProfitData({
      landArea: '',
      sellingPrice: '',
      seedCost: '',
      fertilizerCost: '',
      laborCost: '',
      irrigationCost: '',
    });

    setProfitResult(null);
  };

  const farmingAdvice = recommendation
    ? getFarmingAdvice()
    : null;

  return (
    <div className="max-w-5xl mx-auto">

      {/* ============================================
          HEADER
      ============================================ */}

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
              Get an AI-based crop recommendation
              using soil and weather conditions.
            </p>

          </div>

        </div>

      </div>

      {/* ============================================
          MAIN FORM CARD
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

                <RiMapPin2Line className="text-lg text-primary" />

                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Farm Location
                </label>

              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                <div className="relative flex-1">

                  <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />

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
                  onClick={() => loadWeather(city)}
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
                  <span>Get Recommendation</span>
                </>
              )}

            </button>

          </div>

        </form>

      </div>

      {/* ============================================
          RESULT
      ============================================ */}

      {recommendation && (
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-green-200 overflow-hidden">

          <div className="p-6 sm:p-8">

            {/* ======================================
                MAIN CROP
            ====================================== */}

            <div className="text-center">

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
                Based on the soil and weather conditions for {city}.
              </p>

            </div>

            {/* ======================================
                WHY THIS CROP
            ====================================== */}

            <div className="mt-6 text-left bg-green-50 border border-green-100 rounded-2xl p-5">

              <div className="flex items-center gap-2 mb-2">

                <RiLeafLine className="text-xl text-green-600" />

                <h3 className="font-bold text-green-800">
                  Why this crop?
                </h3>

              </div>

              <p className="text-sm text-green-900 leading-relaxed">
                {getCropReason()}
              </p>

            </div>

            {/* ======================================
                TOP 3 CROPS
            ====================================== */}

            {topCrops.length > 0 && (
              <div className="mt-6 text-left">

                <h3 className="text-lg font-bold text-text-dark">
                  Top 3 Recommended Crops
                </h3>

                <p className="text-sm text-text-muted mt-1 mb-4">
                  Other crops that match the provided conditions.
                </p>

                <div className="space-y-3">

                  {topCrops.slice(0, 3).map((item, index) => {

                    const cropName =
                      item.crop ||
                      item.recommended_crop ||
                      item.name ||
                      'Unknown';

                    const score =
                      Number(item.score) || 0;

                    return (
                      <div
                        key={`${cropName}-${index}`}
                        className="bg-bg-light border border-border-light rounded-xl p-4"
                      >

                        <div className="flex items-center justify-between mb-2">

                          <div className="flex items-center gap-3">

                            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">

                              <span className="text-sm font-bold text-green-700">
                                {index + 1}
                              </span>

                            </div>

                            <span className="font-bold text-text-dark capitalize">
                              {cropName}
                            </span>

                          </div>

                          <span className="text-sm font-bold text-green-700">
                            {score}%
                          </span>

                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{
                              width: `${Math.min(score, 100)}%`,
                            }}
                          ></div>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>
            )}

            {/* ======================================
                FARMING ADVICE
            ====================================== */}

            {farmingAdvice && (
              <div className="mt-6">

                <div className="flex items-center gap-2 mb-4">

                  <div className="p-2 bg-green-100 rounded-lg">

                    <RiSeedlingLine className="text-xl text-green-600" />

                  </div>

                  <div>

                    <h3 className="text-lg font-bold text-text-dark">
                      Farming Advice
                    </h3>

                    <p className="text-sm text-text-muted">
                      Basic guidance for growing {recommendation}.
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* SOIL */}

                  <div className="bg-bg-light border border-border-light rounded-xl p-4">

                    <div className="flex items-center gap-2 mb-2">

                      <RiSeedlingLine className="text-lg text-green-600" />

                      <h4 className="font-bold text-text-dark">
                        Soil
                      </h4>

                    </div>

                    <p className="text-sm text-text-muted leading-relaxed">
                      {farmingAdvice.soil}
                    </p>

                  </div>

                  {/* TEMPERATURE */}

                  <div className="bg-bg-light border border-border-light rounded-xl p-4">

                    <div className="flex items-center gap-2 mb-2">

                      <RiTempHotLine className="text-lg text-orange-500" />

                      <h4 className="font-bold text-text-dark">
                        Temperature
                      </h4>

                    </div>

                    <p className="text-sm text-text-muted leading-relaxed">
                      {farmingAdvice.temperature}
                    </p>

                  </div>

                  {/* WATER */}

                  <div className="bg-bg-light border border-border-light rounded-xl p-4">

                    <div className="flex items-center gap-2 mb-2">

                      <RiWaterFlashLine className="text-lg text-blue-500" />

                      <h4 className="font-bold text-text-dark">
                        Water
                      </h4>

                    </div>

                    <p className="text-sm text-text-muted leading-relaxed">
                      {farmingAdvice.water}
                    </p>

                  </div>

                  {/* FERTILIZER */}

                  <div className="bg-bg-light border border-border-light rounded-xl p-4">

                    <div className="flex items-center gap-2 mb-2">

                      <RiLeafLine className="text-lg text-green-600" />

                      <h4 className="font-bold text-text-dark">
                        Fertilizer
                      </h4>

                    </div>

                    <p className="text-sm text-text-muted leading-relaxed">
                      {farmingAdvice.fertilizer}
                    </p>

                  </div>

                </div>

                {/* CARE */}

                <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <RiShieldCheckLine className="text-lg text-yellow-600" />

                    <h4 className="font-bold text-yellow-800">
                      Crop Care
                    </h4>

                  </div>

                  <p className="text-sm text-yellow-900 leading-relaxed">
                    {farmingAdvice.care}
                  </p>

                </div>

              </div>
            )}

            {/* ======================================
                PROFIT ESTIMATION
            ====================================== */}

            <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 sm:p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="p-3 bg-green-100 rounded-xl">

                  <RiMoneyRupeeCircleLine className="text-2xl text-green-600" />

                </div>

                <div>

                  <h3 className="text-lg font-bold text-green-900">
                    Estimate Your Profit
                  </h3>

                  <p className="text-sm text-green-700">
                    Estimate the expected profit for growing {recommendation}.
                  </p>

                </div>

              </div>

              <form onSubmit={handleProfitSubmit}>

                {/* CROP */}

                <div className="mb-5">

                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                    Recommended Crop
                  </label>

                  <input
                    type="text"
                    value={recommendation}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border border-border-light rounded-xl text-sm font-bold text-text-dark"
                  />

                </div>

                {/* LAND AREA + SELLING PRICE */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                      Land Area (Acres)
                    </label>

                    <input
                      type="number"
                      name="landArea"
                      value={profitData.landArea}
                      onChange={handleProfitChange}
                      placeholder="e.g. 2"
                      min="0.1"
                      step="any"
                      required
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                    />

                  </div>

                  <div>

                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                      Selling Price (₹ per acre)
                    </label>

                    <input
                      type="number"
                      name="sellingPrice"
                      value={profitData.sellingPrice}
                      onChange={handleProfitChange}
                      placeholder="e.g. 50000"
                      min="0"
                      step="any"
                      required
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                    />

                  </div>

                </div>

                {/* FARMING COSTS */}

                <div className="mt-6">

                  <h4 className="font-bold text-text-dark mb-1">
                    Farming Costs
                  </h4>

                  <p className="text-sm text-text-muted mb-4">
                    Enter your estimated expenses for the selected land area.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* SEED */}

                    <div>

                      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                        Seed Cost (₹)
                      </label>

                      <input
                        type="number"
                        name="seedCost"
                        value={profitData.seedCost}
                        onChange={handleProfitChange}
                        placeholder="e.g. 5000"
                        min="0"
                        step="any"
                        required
                        className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                      />

                    </div>

                    {/* FERTILIZER */}

                    <div>

                      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                        Fertilizer Cost (₹)
                      </label>

                      <input
                        type="number"
                        name="fertilizerCost"
                        value={profitData.fertilizerCost}
                        onChange={handleProfitChange}
                        placeholder="e.g. 8000"
                        min="0"
                        step="any"
                        required
                        className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                      />

                    </div>

                    {/* LABOR */}

                    <div>

                      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                        Labor Cost (₹)
                      </label>

                      <input
                        type="number"
                        name="laborCost"
                        value={profitData.laborCost}
                        onChange={handleProfitChange}
                        placeholder="e.g. 12000"
                        min="0"
                        step="any"
                        required
                        className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                      />

                    </div>

                    {/* IRRIGATION */}

                    <div>

                      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                        Irrigation Cost (₹)
                      </label>

                      <input
                        type="number"
                        name="irrigationCost"
                        value={profitData.irrigationCost}
                        onChange={handleProfitChange}
                        placeholder="e.g. 5000"
                        min="0"
                        step="any"
                        required
                        className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-dark"
                      />

                    </div>

                  </div>

                </div>

                {/* CALCULATE BUTTON */}

                <div className="flex justify-end mt-6">

                  <button
                    type="submit"
                    disabled={profitLoading}
                    className="px-6 py-3 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
                  >

                    {profitLoading ? (
                      <>
                        <RiLoader4Line className="animate-spin text-lg" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <RiMoneyRupeeCircleLine className="text-lg" />
                        Calculate Profit
                      </>
                    )}

                  </button>

                </div>

              </form>

              {/* ==================================
                  PROFIT RESULT
              ================================== */}

              {profitResult && (
                <div className="mt-6 bg-white border border-green-200 rounded-2xl overflow-hidden">

                  {/* PROFIT HEADER */}

                  <div className="bg-green-600 text-white p-5 text-center">

                    <p className="text-sm font-semibold uppercase tracking-wider opacity-90">
                      Estimated Farm Profit
                    </p>

                    <h2 className="text-3xl font-extrabold mt-1">
                      ₹
                      {Number(
                        profitResult.profit || 0
                      ).toLocaleString('en-IN')}
                    </h2>

                    <p className="text-sm mt-1 opacity-90">
                      {profitResult.crop || recommendation}
                    </p>

                  </div>

                  {/* FINANCIAL SUMMARY */}

                  <div className="p-5">

                    <h4 className="font-bold text-text-dark mb-4">
                      Financial Summary
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                      {/* REVENUE */}

                      <div className="bg-green-50 rounded-xl p-4">

                        <p className="text-xs text-text-muted">
                          Expected Revenue
                        </p>

                        <p className="text-lg font-extrabold text-green-700 mt-1">
                          ₹
                          {Number(
                            profitResult.revenue || 0
                          ).toLocaleString('en-IN')}
                        </p>

                      </div>

                      {/* COST */}

                      <div className="bg-orange-50 rounded-xl p-4">

                        <p className="text-xs text-text-muted">
                          Total Cost
                        </p>

                        <p className="text-lg font-extrabold text-orange-700 mt-1">
                          ₹
                          {Number(
                            profitResult.totalCost || 0
                          ).toLocaleString('en-IN')}
                        </p>

                      </div>

                      {/* PROFIT */}

                      <div className="bg-green-50 rounded-xl p-4">

                        <p className="text-xs text-text-muted">
                          Net Profit
                        </p>

                        <p className="text-lg font-extrabold text-green-700 mt-1">
                          ₹
                          {Number(
                            profitResult.profit || 0
                          ).toLocaleString('en-IN')}
                        </p>

                      </div>

                    </div>

                    {/* PROFIT MARGIN */}

                    <div className="mt-4 bg-bg-light rounded-xl p-4">

                      <div className="flex items-center justify-between mb-2">

                        <span className="text-sm font-semibold text-text-dark">
                          Profit Margin
                        </span>

                        <span className="text-sm font-bold text-green-700">
                          {Number(
                            profitResult.profitPercentage || 0
                          ).toFixed(2)}
                          %
                        </span>

                      </div>

                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${Math.min(
                              Math.max(
                                Number(
                                  profitResult.profitPercentage || 0
                                ),
                                0
                              ),
                              100
                            )}%`,
                          }}
                        ></div>

                      </div>

                    </div>

                    {/* CALCULATION INFO */}

                    <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">

                      <h4 className="font-bold text-blue-800 mb-2">
                        How it was calculated
                      </h4>

                      <div className="text-sm text-blue-900 space-y-1">

                        <p>
                          <strong>Revenue:</strong> Land Area × Selling Price
                        </p>

                        <p>
                          <strong>Total Cost:</strong> Seeds + Fertilizer + Labor + Irrigation
                        </p>

                        <p>
                          <strong>Profit:</strong> Revenue − Total Cost
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* ======================================
                CONDITIONS ANALYZED
            ====================================== */}

            <div className="mt-8 text-left">

              <h3 className="text-lg font-bold text-text-dark mb-3">
                Conditions analyzed
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                <div className="bg-bg-light rounded-xl p-3">

                  <p className="text-xs text-text-muted">
                    Nitrogen
                  </p>

                  <p className="font-bold text-text-dark">
                    {formData.N}
                  </p>

                </div>

                <div className="bg-bg-light rounded-xl p-3">

                  <p className="text-xs text-text-muted">
                    Phosphorus
                  </p>

                  <p className="font-bold text-text-dark">
                    {formData.P}
                  </p>

                </div>

                <div className="bg-bg-light rounded-xl p-3">

                  <p className="text-xs text-text-muted">
                    Potassium
                  </p>

                  <p className="font-bold text-text-dark">
                    {formData.K}
                  </p>

                </div>

                <div className="bg-bg-light rounded-xl p-3">

                  <p className="text-xs text-text-muted">
                    Soil pH
                  </p>

                  <p className="font-bold text-text-dark">
                    {formData.ph}
                  </p>

                </div>

                <div className="bg-bg-light rounded-xl p-3">

                  <p className="text-xs text-text-muted">
                    Temperature
                  </p>

                  <p className="font-bold text-text-dark">
                    {formData.temperature} °C
                  </p>

                </div>

                <div className="bg-bg-light rounded-xl p-3">

                  <p className="text-xs text-text-muted">
                    Humidity
                  </p>

                  <p className="font-bold text-text-dark">
                    {formData.humidity} %
                  </p>

                </div>

                <div className="bg-bg-light rounded-xl p-3">

                  <p className="text-xs text-text-muted">
                    Rainfall
                  </p>

                  <p className="font-bold text-text-dark">
                    {formData.rainfall} mm
                  </p>

                </div>

                <div className="bg-bg-light rounded-xl p-3">

                  <p className="text-xs text-text-muted">
                    Location
                  </p>

                  <p className="font-bold text-text-dark capitalize">
                    {city}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default CropRecommendation;