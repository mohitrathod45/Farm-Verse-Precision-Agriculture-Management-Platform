import { useState, useEffect } from 'react';
import {
  RiMapPin2Line,
  RiSearchLine,
  RiRefreshLine,
  RiDropLine,
  RiWindyLine,
  RiSunLine,
  RiTempHotLine,
  RiCloudWindyLine,
  RiPlantLine,
  RiAlertLine,
  RiCheckLine,
  RiRainyLine,
  RiErrorWarningLine,
} from 'react-icons/ri';
import PageHeader from '../../components/PageHeader';
import { fetchWeatherData, getWeatherMeta } from '../../services/weatherService';

const Weather = () => {
  const [city, setCity] = useState(() => localStorage.getItem('weather_city') || 'Hyderabad');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const loadWeather = async (targetCity) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchWeatherData(targetCity);
      setWeatherData(res);
      if (res.rawCity) {
        setCity(res.rawCity);
        localStorage.setItem('weather_city', res.rawCity);
      }
    } catch (err) {
      console.error('Weather error:', err);
      setError(err.message || 'Unable to fetch weather data for this location.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(city);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const target = searchInput.trim();
      loadWeather(target);
      setSearchInput('');
    }
  };

  const current = weatherData?.current;
  const forecast = weatherData?.forecast || [];
  const insights = weatherData?.farmingInsights || [];
  const currentMeta = current ? getWeatherMeta(current.code) : null;
  const WeatherIcon = currentMeta?.icon;

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Weather"
        description="Monitor current weather conditions and upcoming forecasts for your farm location."
      />

      {/* Location Bar & City Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-border-light mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-text-dark w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <RiMapPin2Line className="text-xl" />
          </div>
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Current Location</p>
            <h2 className="text-base font-extrabold text-text-dark">
              {weatherData?.cityName || city}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search city (e.g. Pune, London)..."
              className="w-full pl-10 pr-4 py-2.5 bg-bg-light border border-border-light rounded-xl text-sm font-semibold text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all cursor-pointer shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex items-start space-x-3 text-red-800">
          <RiErrorWarningLine className="text-xl shrink-0 mt-0.5 text-red-600" />
          <div className="flex-1">
            <h4 className="text-sm font-bold">Weather Lookup Failed</h4>
            <p className="text-xs text-red-700 mt-0.5">{error}</p>
          </div>
          <button
            onClick={() => loadWeather(city)}
            className="px-3 py-1 bg-white border border-red-300 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors cursor-pointer shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border-light mb-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-3"></div>
          <p className="text-text-muted text-sm font-semibold">Loading Weather Data...</p>
        </div>
      ) : weatherData && current ? (
        <>
          {/* Main Grid: Current Weather & Farming Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">
            
            {/* Current Weather Card (Left 5 Cols - Content-Height / Auto-Height) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden h-auto">
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white tracking-wide">
                    Live Conditions
                  </span>
                  <button
                    onClick={() => loadWeather(city)}
                    className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors cursor-pointer text-white"
                    title="Refresh weather"
                  >
                    <RiRefreshLine className="text-base" />
                  </button>
                </div>

                <div className="flex items-center justify-between my-3">
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display">
                      {current.temp}°C
                    </h2>
                    <p className="text-sm font-bold text-white/90 mt-0.5">{current.condition}</p>
                  </div>
                  {WeatherIcon && (
                    <WeatherIcon className={`text-5xl sm:text-6xl ${currentMeta.color} drop-shadow-md shrink-0`} />
                  )}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 border-t border-white/20 pt-4 mt-4">
                <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm p-2.5 rounded-2xl border border-white/15">
                  <RiDropLine className="text-xl text-blue-200 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/80 tracking-wider">Humidity</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white">{current.humidity}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm p-2.5 rounded-2xl border border-white/15">
                  <RiWindyLine className="text-xl text-sky-200 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/80 tracking-wider">Wind Speed</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white">{current.wind}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agricultural Farming Insights (Right 7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-border-light flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-border-light">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base">
                    <RiPlantLine />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-dark font-display">Farming Insights</h3>
                    <p className="text-xs text-text-muted">Observational guidance based on live weather metrics</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {insights.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-bg-light/80 border border-border-light flex items-start space-x-3.5">
                      <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border shrink-0 mt-0.5 ${item.badgeColor}`}>
                        {item.title}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-text-dark leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border-light flex items-center justify-between text-xs text-text-muted">
                <span>Updated continuously from meteorological satellite data.</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Precision Weather
                </span>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-border-light mb-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-border-light">
              <div>
                <h3 className="text-lg font-bold text-text-dark font-display">7-Day Agricultural Forecast</h3>
                <p className="text-xs text-text-muted">Expected temperature ranges and precipitation trends</p>
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                7 Days Ahead
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
              {forecast.map((day, idx) => {
                const dayMeta = getWeatherMeta(day.code);
                const FIcon = dayMeta.icon;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col justify-between ${
                      idx === 0
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                        : 'bg-bg-light/60 border-border-light hover:border-emerald-200 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-text-dark">{day.dayName}</p>
                      <p className="text-[10px] text-text-muted font-medium mb-3">{day.dateFormatted}</p>

                      <div className="my-2 flex justify-center">
                        <FIcon className={`text-3xl ${dayMeta.color} drop-shadow-xs`} />
                      </div>

                      <p className="text-xs font-bold text-text-dark mt-2">{day.condition}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border-light/80 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-emerald-700">{day.tempMax}°</span>
                        <span className="text-text-muted">{day.tempMin}°</span>
                      </div>
                      {day.precipProb > 0 && (
                        <div className="flex items-center justify-center space-x-1 text-[10px] text-blue-600 font-semibold mt-1">
                          <RiRainyLine className="text-xs" />
                          <span>{day.precipProb}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Weather;
