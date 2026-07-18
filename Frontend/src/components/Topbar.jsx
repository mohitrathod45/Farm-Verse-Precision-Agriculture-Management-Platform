import { Link, useNavigate } from 'react-router-dom';
import { RiMenu3Line, RiNotification3Line, RiLogoutBoxRLine } from 'react-icons/ri';

const Topbar = ({ setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-border-light flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 -ml-1 rounded-xl text-text-muted hover:text-primary hover:bg-bg-light transition-colors"
        aria-label="Open sidebar"
      >
        <RiMenu3Line className="text-xl" />
      </button>

      <div className="flex-1" />

      {/* Right Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Notification Bell */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-xl text-text-muted hover:text-primary hover:bg-bg-light transition-all duration-200 focus:outline-none"
          aria-label="Notifications"
        >
          <RiNotification3Line className="text-xl" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>

        <div className="hidden sm:block h-5 w-px bg-border-light" />

        {/* User profile */}
        <Link to="/profile" className="flex items-center space-x-2.5 group focus:outline-none">
          <div className="h-9 w-9 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-xs">F</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-text-dark group-hover:text-primary transition-colors leading-none">Farmer</p>
          </div>
        </Link>

        <div className="hidden sm:block h-5 w-px bg-border-light" />

        {/* Logout */}
        <button
          onClick={() => navigate('/login')}
          className="hidden sm:flex items-center space-x-1.5 text-sm font-semibold text-text-muted hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
        >
          <RiLogoutBoxRLine className="text-base" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
