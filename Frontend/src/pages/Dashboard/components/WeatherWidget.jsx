import { useState, useEffect } from 'react';
import { 
  RiSunCloudyLine, 
  RiSunLine, 
  RiCloudyLine, 
  RiRainyLine, 
  RiThunderstormsLine, 
  RiFoggyLine, 
  RiDropLine, 
  RiWindyLine, 
  RiMapPin2Line, 
  RiEditLine, 
  RiCheckLine, 
  RiRefreshLine 
} from 'react-icons/ri';
import { formatDate } from '../../../utils/dateUtils';

// WMO Weather Code mapping to human readable text and icon component
const getWeatherMeta = (code) => {
  if (code === 0) {
    return { condition: 'Clear Sky', icon: RiSunLine, color: 'text-yellow-300' };
  }
  if (code >= 1 && code <= 3) {
    return { condition: 'Partly Cloudy', icon: RiSunCloudyLine, color: 'text-yellow-200' };
  }
  if (code === 45 || code === 48) {
    return { condition: 'Foggy', icon: RiFoggyLine, color: 'text-gray-200' };
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return { condition: 'Rain Showers', icon: RiRainyLine, color: 'text-blue-100' };
  }
  if (code >= 71 && code <= 77) {
    return { condition: 'Snowfall', icon: RiCloudyLine, color: 'text-white' };
  }
  if (code >= 95) {
    return { condition: 'Thunderstorm', icon: RiThunderstormsLine, color: 'text-yellow-400' };
  }
  return { condition: 'Cloudy', icon: RiCloudyLine, color: 'text-gray-100' };
};

const WeatherWidget = () => {
  const [city, setCity] = useState(() => localStorage.getItem('weather_city') || 'Hyderabad');
  const [editingCity, setEditingCity] = useState(false);
  const [inputCity, setInputCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [weatherData, setWeatherData] = useState({
    temp: '--',
    condition: 'Loading...',
    humidity: '--',
    wind: '--',
    code: 1,
  });

  const todayDate = formatDate(new Date().toISOString().split('T')[0]);

  // Fetch weather data for target city
  const fetchWeather = async (targetCity) => {
    try {
      setLoading(true);
      setError(false);

      // Check optional env key
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      if (apiKey) {
        // Fetch via OpenWeatherMap if key is configured
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(targetCity)}&units=metric&appid=${apiKey}`
        );
        if (!res.ok) throw new Error('OpenWeather error');
        const data = await res.json();
        
        setWeatherData({
          temp: Math.round(data.main.temp),
          condition: data.weather[0]?.main || 'Clear',
          humidity: `${data.main.humidity}%`,
          wind: `${Math.round(data.wind.speed * 3.6)} km/h`,
          code: data.weather[0]?.id === 800 ? 0 : 2,
        });
        setLoading(false);
        return;
      }

      // Default Free Open-Meteo API (No Key Required)
      // 1. Geocoding lookup
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(targetCity)}&count=1&language=en&format=json`
      );
      if (!geoRes.ok) throw new Error('Geocoding failed');
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name } = geoData.results[0];

      // 2. Weather forecast lookup
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
      );
      if (!weatherRes.ok) throw new Error('Weather fetch failed');
      const data = await weatherRes.json();

      const current = data.current;
      const weatherMeta = getWeatherMeta(current.weather_code);

      setWeatherData({
        temp: Math.round(current.temperature_2m),
        condition: weatherMeta.condition,
        humidity: `${current.relative_humidity_2m}%`,
        wind: `${Math.round(current.wind_speed_10m)} km/h`,
        code: current.weather_code,
      });

      // Update stored city name if resolved
      if (name) {
        setCity(name);
        localStorage.setItem('weather_city', name);
      }
    } catch (err) {
      console.error('Weather error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      const newCity = inputCity.trim();
      setCity(newCity);
      localStorage.setItem('weather_city', newCity);
      setEditingCity(false);
      setInputCity('');
    }
  };

  const weatherMeta = getWeatherMeta(weatherData.code);
  const WeatherIcon = weatherMeta.icon;

  return (
    <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-[2rem] p-6 shadow-md text-white overflow-hidden relative">
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
                className="px-2.5 py-1 text-xs text-text-dark bg-white rounded-lg focus:outline-none w-28"
                autoFocus
              />
              <button
                type="submit"
                className="p-1 bg-white/30 hover:bg-white/40 rounded-lg text-xs"
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
              <span className="text-xs font-bold tracking-wide">{city}</span>
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
            <p className="text-xs text-blue-100 mb-3">Unable to connect to weather service</p>
            <button
              onClick={() => fetchWeather(city)}
              className="inline-flex items-center space-x-1 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
            >
              <RiRefreshLine /> <span>Retry</span>
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mt-6 mb-8">
              <div>
                <h2 className="text-5xl font-extrabold flex items-start">
                  {weatherData.temp}<span className="text-2xl mt-1">°C</span>
                </h2>
                <p className="text-blue-100 text-sm font-semibold mt-1">{weatherData.condition}</p>
              </div>
              <WeatherIcon className={`text-7xl ${weatherMeta.color} drop-shadow-lg`} />
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
              <div className="flex items-center space-x-2">
                <RiDropLine className="text-blue-200 text-xl" />
                <div>
                  <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Humidity</p>
                  <p className="text-sm font-bold">{weatherData.humidity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <RiWindyLine className="text-blue-200 text-xl" />
                <div>
                  <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Wind</p>
                  <p className="text-sm font-bold">{weatherData.wind}</p>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default WeatherWidget;
