import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  RiMenu3Line, 
  RiNotification3Line, 
  RiLogoutBoxRLine, 
  RiCheckDoubleLine, 
  RiArrowRightSLine 
} from 'react-icons/ri';
import { useNotifications } from '../context/NotificationContext';

const Topbar = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const fullName = localStorage.getItem('fullName') || 'Farmer';
  const role = localStorage.getItem('role') || 'Farmer';

  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'F';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  const initials = getInitials(fullName);

  return (
    <header className="h-16 bg-white border-b border-border-light flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 -ml-1 rounded-xl text-text-muted hover:text-primary hover:bg-bg-light transition-colors cursor-pointer"
        aria-label="Open sidebar"
      >
        <RiMenu3Line className="text-xl" />
      </button>

      <div className="flex-1" />

      {/* Right Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">

        {/* Notification Bell Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
            className="relative p-2 rounded-xl text-text-muted hover:text-primary hover:bg-bg-light transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label="Notifications"
          >
            <RiNotification3Line className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-extrabold text-white bg-red-500 rounded-full ring-2 ring-white animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown Panel */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-border-light overflow-hidden z-50 animate-fade-in">
              {/* Header */}
              <div className="px-5 py-3.5 bg-white border-b border-border-light flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-extrabold text-text-dark">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <RiCheckDoubleLine />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-border-light">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-xs font-semibold text-text-muted">No notifications right now</p>
                  </div>
                ) : (
                  notifications.slice(0, 6).map((n) => {
                    const Icon = n.icon;
                    return (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3.5 flex items-start space-x-3 transition-colors cursor-pointer hover:bg-bg-light/60 ${
                          n.read ? 'opacity-70 bg-white' : 'bg-primary/[0.02]'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl ${n.bg} ${n.color} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className="text-base" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <p className={`text-xs font-bold truncate ${n.read ? 'text-text-dark' : 'text-text-dark font-extrabold'}`}>
                              {n.title}
                            </p>
                            {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />}
                          </div>
                          <p className="text-[11px] text-text-muted mt-0.5 line-clamp-2 leading-relaxed">
                            {n.desc}
                          </p>
                          <p className="text-[10px] font-semibold text-text-muted mt-1">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-bg-light/50 border-t border-border-light text-center">
                <Link
                  to="/notifications"
                  onClick={() => setShowDropdown(false)}
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center space-x-1"
                >
                  <span>View All Notifications</span>
                  <RiArrowRightSLine />
                </Link>
              </div>

            </div>
          )}
        </div>

        <div className="hidden sm:block h-5 w-px bg-border-light" />

        {/* User profile */}
        <Link to="/profile" className="flex items-center space-x-2.5 group focus:outline-none">
          <div className="h-9 w-9 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-xs">{initials}</span>
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-text-dark group-hover:text-primary transition-colors leading-none">
              {fullName}
            </p>
            <p className="text-xs text-text-muted mt-1 leading-none">
              {role}
            </p>
          </div>
        </Link>

        <div className="hidden sm:block h-5 w-px bg-border-light" />

        {/* Logout */}
        <button
          onClick={() => navigate('/login')}
          className="hidden sm:flex items-center space-x-1.5 text-sm font-semibold text-text-muted hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50 cursor-pointer"
        >
          <RiLogoutBoxRLine className="text-base" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
