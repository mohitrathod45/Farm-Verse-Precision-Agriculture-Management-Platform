import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  RiCloseLine,
  RiQuestionLine,
} from 'react-icons/ri';

const navItems = [
  { name: 'Dashboard', icon: RiDashboardLine, path: '/dashboard' },
  { name: 'My Farms', icon: RiMap2Line, path: '/farms' },
  { name: 'Crop Management', icon: RiPlantLine, path: '/crops' },
  { name: 'Irrigation', icon: RiDropLine, path: '/irrigation' },
  { name: 'Fertilizer', icon: RiFlaskLine, path: '/fertilizer' },
  { name: 'Reports', icon: RiBarChart2Line, path: '/reports' },
  { name: 'Profile', icon: RiUserLine, path: '/profile' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border-light flex flex-col shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-border-light shrink-0">
          <Link to="/dashboard" className="flex items-center space-x-2.5 group focus:outline-none" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <RiLeafLine className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold tracking-tight text-text-dark font-display">
              Farm<span className="text-primary">Verse</span>
            </span>
          </Link>
          <button className="md:hidden text-text-muted hover:text-text-dark transition-colors" onClick={() => setIsOpen(false)}>
            <RiCloseLine className="text-2xl" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-3 mb-3">Main Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-muted hover:bg-bg-light hover:text-text-dark'
                }`}
              >
                <Icon className="text-lg shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-border-light p-3 space-y-1 shrink-0">
          <Link
            to="/help"
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive('/help') ? 'bg-primary text-white' : 'text-text-muted hover:bg-bg-light hover:text-text-dark'
            }`}
          >
            <RiQuestionLine className="text-lg shrink-0" />
            <span>Help & Support</span>
          </Link>
          <button
            onClick={() => { setIsOpen(false); navigate('/login'); }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-text-muted hover:bg-red-50 hover:text-red-500 transition-all duration-200"
          >
            <RiLogoutBoxRLine className="text-lg shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
