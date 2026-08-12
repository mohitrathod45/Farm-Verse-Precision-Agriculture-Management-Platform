import {
  RiSunLine,
  RiSunCloudyLine,
  RiCloudyLine,
  RiRainyLine,
  RiThunderstormsLine,
  RiFoggyLine,
} from 'react-icons/ri';

/**
 * WMO Weather Code mapping to human readable text, icon, and colors
 */
export const getWeatherMeta = (code) => {
  if (code === 0) {
    return { condition: 'Clear Sky', icon: RiSunLine, color: 'text-amber-300', bgGradient: 'from-sky-400 via-sky-500 to-sky-600' };
  }
  if (code >= 1 && code <= 3) {
    return { condition: 'Partly Cloudy', icon: RiSunCloudyLine, color: 'text-amber-200', bgGradient: 'from-sky-400 via-sky-500 to-blue-600' };
  }
  if (code === 45 || code === 48) {
    return { condition: 'Foggy', icon: RiFoggyLine, color: 'text-slate-100', bgGradient: 'from-sky-400 via-blue-500 to-slate-600' };
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return { condition: 'Rain Showers', icon: RiRainyLine, color: 'text-blue-100', bgGradient: 'from-sky-400 via-blue-500 to-sky-700' };
  }
  if (code >= 71 && code <= 77) {
    return { condition: 'Snowfall', icon: RiCloudyLine, color: 'text-white', bgGradient: 'from-sky-300 via-blue-400 to-sky-600' };
  }
  if (code >= 95) {
    return { condition: 'Thunderstorm', icon: RiThunderstormsLine, color: 'text-amber-300', bgGradient: 'from-sky-500 via-blue-600 to-sky-800' };
  }
  return { condition: 'Cloudy', icon: RiCloudyLine, color: 'text-gray-100', bgGradient: 'from-sky-400 via-sky-500 to-blue-600' };
};

/**
 * Generate practical farming insights based strictly on empirical weather data
 */
export const generateFarmingInsights = (current, forecast = []) => {
  const insights = [];

  // 1. Rainfall observation
  const hasRainInForecast = forecast.some(d => (d.precipSum > 2 || d.precipProb >= 50));
  if (hasRainInForecast) {
    insights.push({
      type: 'irrigation',
      title: 'Rain Expected',
      desc: 'Rainfall is expected in the upcoming forecast. Consider pausing or reducing scheduled irrigation to conserve water.',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    });
  } else {
    insights.push({
      type: 'irrigation',
      title: 'Dry Conditions',
      desc: 'No significant rainfall is expected. Monitor soil moisture levels and ensure irrigation schedules are maintained.',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    });
  }

  // 2. High Temperature observation
  const maxTempInForecast = Math.max(current.temp || 0, ...forecast.map(d => d.tempMax || 0));
  if (maxTempInForecast >= 35) {
    insights.push({
      type: 'temperature',
      title: 'High Heat Warning',
      desc: `Temperatures reaching up to ${maxTempInForecast}°C. Monitor crops for heat stress and increase irrigation frequency if needed.`,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    });
  }

  // 3. High Humidity observation
  if (current.humidityValue >= 75) {
    insights.push({
      type: 'disease',
      title: 'Fungal Risk Alert',
      desc: `High relative humidity (${current.humidity}) detected. Monitor dense crop foliage for potential fungal diseases.`,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    });
  }

  // 4. Strong Wind observation
  if (current.windValue >= 25) {
    insights.push({
      type: 'spraying',
      title: 'Strong Winds',
      desc: `Wind speeds of ${current.wind}. Avoid spraying pesticides or liquid fertilizers today to prevent chemical drift.`,
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    });
  }

  return insights;
};

/**
 * Shared weather fetching service with geocoding and 7-day forecast
 */
export const fetchWeatherData = async (targetCity) => {
  if (!targetCity || !targetCity.trim()) {
    throw new Error('Please enter a valid city name.');
  }

  const queryCity = targetCity.trim();

  // Check optional OpenWeatherMap key
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (apiKey) {
    // OpenWeatherMap provider
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(queryCity)}&units=metric&appid=${apiKey}`
    );
    if (!res.ok) {
      if (res.status === 404) throw new Error(`City "${queryCity}" not found.`);
      throw new Error('Failed to fetch weather data.');
    }
    const data = await res.json();

    const currentObj = {
      temp: Math.round(data.main.temp),
      humidity: `${data.main.humidity}%`,
      humidityValue: data.main.humidity,
      wind: `${Math.round(data.wind.speed * 3.6)} km/h`,
      windValue: data.wind.speed * 3.6,
      code: data.weather[0]?.id === 800 ? 0 : 2,
      condition: data.weather[0]?.main || 'Clear',
    };

    return {
      cityName: `${data.name}${data.sys?.country ? `, ${data.sys.country}` : ''}`,
      rawCity: data.name,
      current: currentObj,
      forecast: [],
      farmingInsights: generateFarmingInsights(currentObj, []),
    };
  }

  // Default: Open-Meteo (No API Key Required)
  // 1. Geocoding lookup
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(queryCity)}&count=1&language=en&format=json`
  );

  if (!geoRes.ok) {
    throw new Error('Geocoding service unavailable.');
  }

  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`City "${queryCity}" not found. Please check spelling.`);
  }

  const { latitude, longitude, name, country } = geoData.results[0];
  const fullCityName = country ? `${name}, ${country}` : name;

  // 2. Open-Meteo Current + Daily Forecast API
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto`
  );

  if (!weatherRes.ok) {
    throw new Error('Failed to retrieve weather data from server.');
  }

  const weatherJson = await weatherRes.json();
  const current = weatherJson.current;
  const daily = weatherJson.daily || {};

  const currentMeta = getWeatherMeta(current.weather_code);

  const currentObj = {
    temp: Math.round(current.temperature_2m),
    humidity: `${current.relative_humidity_2m}%`,
    humidityValue: current.relative_humidity_2m,
    wind: `${Math.round(current.wind_speed_10m)} km/h`,
    windValue: current.wind_speed_10m,
    code: current.weather_code,
    condition: currentMeta.condition,
  };

  // Format 7-Day Forecast
  const forecastList = [];
  if (daily.time && Array.isArray(daily.time)) {
    for (let i = 0; i < daily.time.length; i++) {
      const dateStr = daily.time[i];
      const dObj = new Date(dateStr + 'T00:00:00');
      const dayName = i === 0 ? 'Today' : dObj.toLocaleDateString('en-US', { weekday: 'short' });
      const dateFormatted = dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const fCode = daily.weather_code ? daily.weather_code[i] : 0;
      const fMeta = getWeatherMeta(fCode);

      forecastList.push({
        date: dateStr,
        dayName,
        dateFormatted,
        tempMax: Math.round(daily.temperature_2m_max ? daily.temperature_2m_max[i] : 0),
        tempMin: Math.round(daily.temperature_2m_min ? daily.temperature_2m_min[i] : 0),
        precipSum: daily.precipitation_sum ? daily.precipitation_sum[i] : 0,
        precipProb: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 0,
        code: fCode,
        condition: fMeta.condition,
      });
    }
  }

  const farmingInsights = generateFarmingInsights(currentObj, forecastList);

  return {
    cityName: fullCityName,
    rawCity: name,
    latitude,
    longitude,
    current: currentObj,
    forecast: forecastList,
    farmingInsights,
  };
};
