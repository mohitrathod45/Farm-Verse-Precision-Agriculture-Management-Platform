import { useState, useEffect } from 'react';
import { 
  RiMapPin2Line, 
  RiEditLine, 
  RiCheckLine, 
  RiRefreshLine,
  RiDropLine,
  RiWindyLine,
} from 'react-icons/ri';
import { formatDate } from '../../../utils/dateUtils';
import { fetchWeatherData, getWeatherMeta } from '../../../services/weatherService';

const WeatherWidget = () => {
  const [city, setCity] = useState(() => localStorage.getItem('weather_city') || 'Hyderabad');
  const [editingCity, setEditingCity] = useState(false);
  const [inputCity, setInputCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const todayDate = formatDate(new Date().toISOString().split('T')[0]);

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
      setError(err.message || 'Unable to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(city);
  }, [city]);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      const newCity = inputCity.trim();
      setEditingCity(false);
      setInputCity('');
      loadWeather(newCity);
    }
  };

  const current = weatherData?.current;
  const weatherMeta = current ? getWeatherMeta(current.code) : null;
  const WeatherIcon = weatherMeta?.icon;

  return (
    <div className="bg-gradient-to-br from-sky-500 to-sky-700 rounded-[2rem] p-6 shadow-md text-white overflow-hidden relative">
      {/* Decorative background shapes */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none"></div>
      
      <div className="relative z-10">

        {/* Top bar: City & Date */}
        <div className="flex items-center justify-between mb-4">
          {editingCity ? (
            <form onSubmit={handleCitySubmit} className="flex items-center space-x-1">
              <input
                type="text"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder="Enter city..."
                className="px-2.5 py-1 text-xs text-text-dark bg-white rounded-lg focus:outline-none w-28 font-medium"
                autoFocus
              />
              <button
                type="submit"
                className="p-1 bg-white/30 hover:bg-white/40 rounded-lg text-xs cursor-pointer"
                title="Save city"
              >
                <RiCheckLine />
              </button>
            </form>
          ) : (
            <div 
              onClick={() => {
                setInputCity(city);
                setEditingCity(true);
              }}
              className="flex items-center space-x-1.5 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-sm cursor-pointer transition-colors"
              title="Click to change city"
            >
              <RiMapPin2Line className="text-sm" />
              <span className="text-xs font-bold tracking-wide">{weatherData?.cityName || city}</span>
              <RiEditLine className="text-[10px] opacity-70 ml-0.5" />
            </div>
          )}

          <span className="text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {todayDate}
          </span>
        </div>

        {/* Weather Main Content */}
        {loading ? (
          <div className="py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mb-2"></div>
            <p className="text-xs font-semibold text-blue-100">Fetching Weather...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-base font-bold text-white mb-1">Weather unavailable</p>
            <p className="text-xs text-blue-100 mb-3">{error}</p>
            <button
              onClick={() => loadWeather(city)}
              className="inline-flex items-center space-x-1 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
            >
              <RiRefreshLine /> <span>Retry</span>
            </button>
          </div>
        ) : current ? (
          <>
            <div className="flex items-center justify-between mt-4 mb-6">
              <div>
                <h2 className="text-5xl font-extrabold flex items-start">
                  {current.temp}<span className="text-2xl mt-1">°C</span>
                </h2>
                <p className="text-blue-100 text-sm font-semibold mt-1">{current.condition}</p>
              </div>
              {WeatherIcon && <WeatherIcon className={`text-7xl ${weatherMeta.color} drop-shadow-lg`} />}
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
              <div className="flex items-center space-x-2">
                <RiDropLine className="text-blue-200 text-xl shrink-0" />
                <div>
                  <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Humidity</p>
                  <p className="text-sm font-bold">{current.humidity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <RiWindyLine className="text-blue-200 text-xl shrink-0" />
                <div>
                  <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Wind</p>
                  <p className="text-sm font-bold">{current.wind}</p>
                </div>
              </div>
            </div>
          </>
        ) : null}

      </div>
    </div>
  );
};

export default WeatherWidget;
