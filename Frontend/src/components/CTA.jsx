import { Link } from 'react-router-dom';
import { RiArrowRightLine, RiDashboardLine } from 'react-icons/ri';

const CTA = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card */}
        <div className="bg-gradient-to-br from-primary to-[#1B5E20] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between text-left gap-12">
          {/* Decorative shapes inside banner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none -translate-x-1/4 translate-y-1/4" />

          {/* Left Text Column */}
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-display">
              Ready to Modernize <br className="hidden sm:inline" />
              Your Farming?
            </h2>
            <p className="text-sm sm:text-base text-bg-light/80 leading-relaxed font-medium">
              Start managing your farms, crops, irrigation schedules, and reports from one intelligent platform. Empower your agricultural decisions with digital precision.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center space-x-2 text-sm font-bold text-primary bg-white hover:bg-bg-light transition-all duration-300 px-8 py-4 rounded-xl shadow-md hover:-translate-y-0.5 focus:outline-none"
              >
                <span>Register Now</span>
                <RiArrowRightLine className="text-lg" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center space-x-2 text-sm font-bold text-white bg-transparent border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 px-8 py-4 rounded-xl hover:-translate-y-0.5 focus:outline-none"
              >
                <RiDashboardLine className="text-lg" />
                <span>Explore Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Right SVG Graphic Column */}
          <div className="relative z-10 w-full max-w-sm lg:max-w-md shrink-0 hidden md:block">
            <svg
              viewBox="0 0 350 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-xl"
            >
              {/* Ground backdrop */}
              <ellipse cx="175" cy="200" rx="140" ry="25" fill="black" fillOpacity="0.1" />

              {/* Graphical Card Representing Dashboard Preview */}
              <g transform="translate(40, 20)">
                {/* Main Card */}
                <rect x="0" y="0" width="270" height="170" rx="20" fill="white" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                
                {/* Card Header Bar */}
                <rect x="15" y="15" width="80" height="12" rx="4" fill="#E8F5E9" />
                <rect x="25" y="19" width="40" height="4" rx="2" fill="#2E7D32" />
                
                {/* Visual Data lines */}
                <rect x="15" y="45" width="240" height="1" fill="#E6EFE5" />

                {/* Graph bars representing crop metrics */}
                <g transform="translate(25, 70)">
                  {/* Bar 1 */}
                  <rect x="0" y="50" width="16" height="30" rx="4" fill="#66BB6A" />
                  <rect x="0" y="35" width="16" height="15" rx="4" fill="#2E7D32" />
                  
                  {/* Bar 2 */}
                  <rect x="36" y="20" width="16" height="60" rx="4" fill="#66BB6A" />
                  <rect x="36" y="5" width="16" height="15" rx="4" fill="#2E7D32" />
                  
                  {/* Bar 3 */}
                  <rect x="72" y="40" width="16" height="40" rx="4" fill="#66BB6A" />
                  <rect x="72" y="25" width="16" height="15" rx="4" fill="#2E7D32" />

                  {/* Bar 4 */}
                  <rect x="108" y="10" width="16" height="70" rx="4" fill="#4FACFE" />

                  {/* Bar 5 */}
                  <rect x="144" y="30" width="16" height="50" rx="4" fill="#F9A826" />
                </g>

                {/* Growth node floating above */}
                <g transform="translate(195, 10)">
                  <rect x="0" y="0" width="60" height="45" rx="10" fill="#2E7D32" />
                  <circle cx="30" cy="22" r="12" fill="white" fillOpacity="0.2" />
                  {/* Sprout shape */}
                  <path d="M26 26C26 20 30 18 30 18C30 18 32 22 28 26" fill="white" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
