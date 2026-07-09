import { RiMenu3Line, RiNotification3Line } from 'react-icons/ri';

const Topbar = ({ setIsOpen }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-xs">
      
      {/* Left side - Mobile menu toggle */}
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 -ml-2 rounded-xl text-text-dark/70 hover:text-primary hover:bg-bg-light transition-colors"
          aria-label="Open sidebar"
        >
          <RiMenu3Line className="text-2xl" />
        </button>
      </div>

      {/* Right side - Profile & Actions */}
      <div className="flex items-center space-x-4 sm:space-x-6 ml-auto">
        
        {/* Notifications */}
        <button className="relative p-2 rounded-full text-text-dark/60 hover:text-primary hover:bg-primary/5 transition-all duration-200 focus:outline-none">
          <RiNotification3Line className="text-2xl" />
          <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

        {/* User Profile */}
        <button className="flex items-center space-x-3 focus:outline-none group">
          <div className="h-10 w-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
            <span className="text-primary font-bold text-sm">FA</span>
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-bold text-text-dark group-hover:text-primary transition-colors">Farmer Admin</span>
          </div>
        </button>
      </div>

    </header>
  );
};

export default Topbar;
