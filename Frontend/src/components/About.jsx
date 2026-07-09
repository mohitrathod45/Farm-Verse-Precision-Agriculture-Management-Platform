import { RiLayoutMasonryLine, RiShieldKeyholeLine, RiCpuLine, RiUserSmileLine } from 'react-icons/ri';

const About = () => {
  const highlights = [
    {
      title: 'Modern UI',
      description: 'Clean, elegant, and interactive interfaces built for modern web devices.',
      icon: RiLayoutMasonryLine,
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      title: 'Secure Data',
      description: 'Robust authentication layer securing critical farm records.',
      icon: RiShieldKeyholeLine,
      color: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      title: 'Scalable Architecture',
      description: 'Engineered with full stack modular patterns ready for cloud deployment.',
      icon: RiCpuLine,
      color: 'text-sky-500 border-sky-500/20 bg-sky-500/5',
    },
    {
      title: 'Easy to Use',
      description: 'Simplified dashboards optimized for quick daily agricultural logs.',
      icon: RiUserSmileLine,
      color: 'text-orange-500 border-orange-500/20 bg-orange-500/5',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#F4F8F2]/60 border-y border-border-light relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-5 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium SVG illustration of a digital monitoring dashboard */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              {/* Glow backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-secondary/15 rounded-3xl blur-xl opacity-75" />
              
              <svg
                viewBox="0 0 500 450"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 w-full h-auto drop-shadow-lg"
              >
                {/* Ground platform (Isometric-like flat shape) */}
                <path d="M50 350C150 320 350 320 450 350L380 410H120L50 350Z" fill="#C8E6C9" />
                <path d="M120 410L380 410C350 425 150 425 120 410Z" fill="#81C784" fillOpacity="0.4" />

                {/* Growth Crops (Behind Tablet) */}
                <g transform="translate(100, 200)">
                  <path d="M10 100C10 50 30 20 30 20C30 20 40 60 20 100" fill="#2E7D32" />
                  <path d="M25 100C25 60 15 30 15 30C15 30 5 60 10 100" fill="#4CAF50" />
                  <path d="M30 100C40 70 50 50 50 50C50 50 45 80 30 100" fill="#81C784" />
                </g>

                <g transform="translate(320, 220)">
                  <path d="M15 80C15 40 30 15 30 15C30 15 35 45 20 80" fill="#2E7D32" />
                  <path d="M20 80C20 50 10 20 10 20C10 20 5 50 15 80" fill="#66BB6A" />
                </g>

                {/* Dashboard Tablet Monitor */}
                <g transform="translate(130, 160)">
                  {/* Tablet Shadow */}
                  <rect x="15" y="175" width="210" height="15" rx="7.5" fill="#37474F" fillOpacity="0.2" />
                  {/* Stand */}
                  <path d="M100 150L90 180H150L140 150H100Z" fill="#90A4AE" />
                  <rect x="80" y="175" width="80" height="7" rx="3" fill="#78909C" />
                  
                  {/* Tablet Body */}
                  <rect x="10" y="10" width="220" height="145" rx="16" fill="#37474F" stroke="#B0BEC5" strokeWidth="4" />
                  {/* Screen */}
                  <rect x="20" y="20" width="200" height="125" rx="8" fill="#FFFFFF" />
                  
                  {/* Header in tablet */}
                  <rect x="30" y="30" width="80" height="10" rx="3" fill="#2E7D32" />
                  <circle cx="205" cy="35" r="4" fill="#E53935" />
                  <circle cx="193" cy="35" r="4" fill="#FFB300" />
                  <circle cx="181" cy="35" r="4" fill="#4CAF50" />

                  {/* UI Charts / Dashboard components */}
                  {/* Graph Grid */}
                  <rect x="30" y="50" width="130" height="50" rx="4" fill="#FAFFF5" stroke="#E0E0E0" strokeWidth="1" />
                  {/* Analytics waves */}
                  <path d="M35 90C50 80 60 70 80 85C100 100 120 60 135 75C140 80 150 65 155 70" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M35 90C50 80 60 70 80 85C100 100 120 60 135 75C140 80 150 65 155 70V100H35V90Z" fill="#2E7D32" fillOpacity="0.08" />
                  
                  {/* Side widgets */}
                  <rect x="170" y="50" width="40" height="22" rx="4" fill="#ECEFF1" />
                  <circle cx="180" cy="61" r="5" fill="#66BB6A" />
                  <rect x="190" y="59" width="15" height="4" rx="2" fill="#78909C" />

                  {/* Lower Widgets */}
                  <rect x="170" y="78" width="40" height="22" rx="4" fill="#ECEFF1" />
                  <rect x="176" y="87" width="28" height="4" rx="2" fill="#2E7D32" />

                  {/* Table List rows */}
                  <rect x="30" y="110" width="180" height="6" rx="3" fill="#EEEEEE" />
                  <rect x="30" y="122" width="130" height="6" rx="3" fill="#EEEEEE" />
                  <rect x="170" y="122" width="40" height="6" rx="3" fill="#66BB6A" />
                </g>

                {/* Telemetry wave rings from crop to tablet */}
                <circle cx="150" cy="270" r="10" stroke="#66BB6A" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="150" cy="270" r="22" stroke="#66BB6A" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M150 270L230 200" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
                
                {/* Sprout rising from Tablet bottom */}
                <g transform="translate(320, 290)">
                  <path d="M0 0C-5 -15 -25 -25 -25 -25C-25 -25 -15 -5 0 0" fill="#66BB6A" />
                  <circle cx="-15" cy="-18" r="2" fill="#2E7D32" />
                </g>
              </svg>
            </div>
          </div>

          {/* Right Column: Text Info Block */}
          <div className="lg:col-span-6 space-y-8 text-left order-1 lg:order-2">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                About the Platform
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark font-display leading-tight">
                About FarmVerse
              </h2>
            </div>
            
            <p className="text-base sm:text-lg text-text-dark font-medium leading-relaxed">
              FarmVerse is a modern Precision Agriculture Management System built using Java Full Stack technologies.
            </p>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              It helps farmers digitally manage farms, crops, irrigation schedules, fertilizer applications, and reports through one centralized platform.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {highlights.map((h, index) => {
                const Icon = h.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-2xl border border-border-light shadow-xs">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${h.color}`}>
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-dark">{h.title}</h4>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{h.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
