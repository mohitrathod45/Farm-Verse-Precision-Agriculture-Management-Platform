import {
  RiSunLine,
  RiCloudyLine,
  RiCloudLine,
  RiRainyLine,
  RiThunderstormsLine,
  RiSnowyLine,
  RiMistLine,
} from 'react-icons/ri';

const OPEN_METEO_GEOCODING_URL =
  'https://geocoding-api.open-meteo.com/v1/search';

const OPEN_METEO_FORECAST_URL =
  'https://api.open-meteo.com/v1/forecast';

/**
 * Convert Open-Meteo weather code into readable information.
 */
export const getWeatherMeta = (weatherCode) => {
  const code = Number(weatherCode);

  if (code === 0) {
    return {
      condition: 'Clear sky',
      icon: RiSunLine,
      color: 'text-yellow-400',
    };
  }

  if ([1, 2].includes(code)) {
    return {
      condition: 'Partly cloudy',
      icon: RiCloudyLine,
      color: 'text-yellow-200',
    };
  }

  if (code === 3) {
    return {
      condition: 'Overcast',
      icon: RiCloudLine,
      color: 'text-gray-200',
    };
  }

  if ([45, 48].includes(code)) {
    return {
      condition: 'Foggy',
      icon: RiMistLine,
      color: 'text-gray-200',
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      condition: 'Drizzle',
      icon: RiRainyLine,
      color: 'text-blue-200',
    };
  }

  if ([61, 63, 65, 66, 67].includes(code)) {
    return {
      condition: 'Rain',
      icon: RiRainyLine,
      color: 'text-blue-200',
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      condition: 'Snow',
      icon: RiSnowyLine,
      color: 'text-blue-100',
    };
  }

  if ([80, 81, 82].includes(code)) {
    return {
      condition: 'Rain showers',
      icon: RiRainyLine,
      color: 'text-blue-200',
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      condition: 'Thunderstorm',
      icon: RiThunderstormsLine,
      color: 'text-purple-200',
    };
  }

  return {
    condition: 'Unknown',
    icon: RiCloudyLine,
    color: 'text-gray-200',
  };
};

/**
 * Get latitude and longitude from city name.
 */
const getCoordinates = async (city) => {
  const response = await fetch(
    `${OPEN_METEO_GEOCODING_URL}?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`
  );

  if (!response.ok) {
    throw new Error('Unable to find the location.');
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`Location "${city}" not found.`);
  }

  return data.results[0];
};

/**
 * Generate farming insights.
 */
const generateFarmingInsights = (current) => {
  const insights = [];

  if (current.relative_humidity_2m >= 80) {
    insights.push({
      title: 'High Humidity',
      desc: 'High humidity may increase the risk of fungal diseases. Monitor crops and avoid unnecessary irrigation.',
      badgeColor:
        'bg-yellow-50 text-yellow-700 border-yellow-200',
    });
  } else {
    insights.push({
      title: 'Humidity',
      desc: 'Current humidity conditions are suitable for normal crop monitoring.',
      badgeColor:
        'bg-green-50 text-green-700 border-green-200',
    });
  }

  if (current.precipitation > 0) {
    insights.push({
      title: 'Rainfall',
      desc: 'Rain is currently recorded. Consider reducing irrigation based on soil moisture conditions.',
      badgeColor:
        'bg-blue-50 text-blue-700 border-blue-200',
    });
  } else {
    insights.push({
      title: 'Rainfall',
      desc: 'No significant rainfall is currently recorded. Monitor soil moisture before irrigation.',
      badgeColor:
        'bg-orange-50 text-orange-700 border-orange-200',
    });
  }

  if (current.temperature_2m >= 35) {
    insights.push({
      title: 'High Temperature',
      desc: 'High temperature may cause crop stress. Ensure crops have sufficient water and protection.',
      badgeColor:
        'bg-red-50 text-red-700 border-red-200',
    });
  } else {
    insights.push({
      title: 'Temperature',
      desc: 'Current temperature is within a generally suitable range for regular farm activities.',
      badgeColor:
        'bg-green-50 text-green-700 border-green-200',
    });
  }

  return insights;
};

/**
 * Fetch weather data.
 */
export const fetchWeatherData = async (city) => {
  if (!city || !city.trim()) {
    throw new Error('Please enter a city name.');
  }

  const location = await getCoordinates(city.trim());

  const latitude = location.latitude;
  const longitude = location.longitude;

  const url =
    `${OPEN_METEO_FORECAST_URL}?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max` +
    `&forecast_days=7` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to fetch weather data.');
  }

  const data = await response.json();

  const current = data.current || {};
  const daily = data.daily || {};

  const currentMeta = getWeatherMeta(current.weather_code);

  return {
    rawCity: location.name,
    cityName: location.name,

    latitude,
    longitude,

    current: {
      temp: current.temperature_2m ?? '',
      humidity: `${current.relative_humidity_2m ?? 0}%`,
      humidityValue: current.relative_humidity_2m ?? '',
      wind: `${current.wind_speed_10m ?? 0} km/h`,
      precipitation: current.precipitation ?? 0,
      code: current.weather_code ?? 0,
      weatherCode: current.weather_code ?? 0,
      condition: currentMeta.condition,
    },

    forecast: (daily.time || []).map((date, index) => {
      const weatherCode = daily.weather_code?.[index] ?? 0;
      const meta = getWeatherMeta(weatherCode);

      return {
        date,
        dayName: new Date(`${date}T12:00:00`).toLocaleDateString(
          'en-US',
          {
            weekday: 'short',
          }
        ),
        dateFormatted: new Date(
          `${date}T12:00:00`
        ).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),

        code: weatherCode,
        condition: meta.condition,
        tempMax: Math.round(
          daily.temperature_2m_max?.[index] ?? 0
        ),
        tempMin: Math.round(
          daily.temperature_2m_min?.[index] ?? 0
        ),
        precipSum:
          daily.precipitation_sum?.[index] ?? 0,
        precipProb:
          daily.precipitation_probability_max?.[index] ?? 0,
      };
    }),

    farmingInsights: generateFarmingInsights(current),

    raw: data,
  };
};