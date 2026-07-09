import { Link, useLocation } from 'react-router-dom';
import { 
  RiDashboardLine, 
  RiMap2Line, 
  RiPlantLine, 
  RiDropLine, 
  RiFlaskLine, 
  RiBarChart2Line, 
  RiUserLine, 
  RiLogoutBoxRLine,
  RiLeafLine,
  RiCloseLine
} from 'react-icons/ri';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: RiDashboardLine, path: '/dashboard' },
    { name: 'My Farms', icon: RiMap2Line, path: '#' },
    { name: 'Crops', icon: RiPlantLine, path: '#' },
    { name: 'Irrigation', icon: RiDropLine, path: '#' },
    { name: 'Fertilizer', icon: RiFlaskLine, path: '#' },
    { name: 'Reports', icon: RiBarChart2Line, path: '#' },
    { name: 'Profile', icon: RiUserLine, path: '#' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-xl md:shadow-none transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50">
            <Link to="/dashboard" className="flex items-center space-x-2 group focus:outline-none">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <RiLeafLine className="text-xl transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <span className="text-xl font-bold tracking-tight text-text-dark font-display">
                Farm<span className="text-primary font-extrabold">Verse</span>
              </span>
            </Link>
            <button 
              className="md:hidden text-text-dark/60 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <RiCloseLine className="text-2xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-white font-bold shadow-sm' 
                      : 'text-text-dark/70 hover:bg-gray-50 hover:text-text-dark font-semibold'
                  }`}
                >
                  <Icon className="text-xl" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-50">
            <Link
              to="/login"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-text-dark/70 hover:bg-red-50 hover:text-red-500 font-semibold transition-colors duration-200"
            >
              <RiLogoutBoxRLine className="text-xl" />
              <span className="text-sm">Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
