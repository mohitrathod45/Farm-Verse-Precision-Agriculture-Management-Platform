import { RiSunCloudyLine, RiDropLine, RiWindyLine, RiMapPin2Line } from 'react-icons/ri';

const WeatherWidget = () => {
  return (
    <div className="bg-gradient-to-br from-sky-300 to-sky-500 rounded-[2rem] p-6 shadow-md text-white overflow-hidden relative">
      {/* Decorative background shapes */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1.5 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <RiMapPin2Line className="text-sm" />
            <span className="text-xs font-bold tracking-wide">Hyderabad</span>
          </div>
          <span className="text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">Today</span>
        </div>

        <div className="flex items-center justify-between mt-6 mb-8">
          <div>
            <h2 className="text-5xl font-extrabold flex items-start">
              32<span className="text-2xl mt-1">°C</span>
            </h2>
            <p className="text-blue-100 text-sm font-semibold mt-1">Partly Cloudy</p>
          </div>
          <RiSunCloudyLine className="text-7xl text-yellow-300 drop-shadow-lg" />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
          <div className="flex items-center space-x-2">
            <RiDropLine className="text-blue-200 text-xl" />
            <div>
              <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Humidity</p>
              <p className="text-sm font-bold">65%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RiWindyLine className="text-blue-200 text-xl" />
            <div>
              <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Wind</p>
              <p className="text-sm font-bold">12 km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
