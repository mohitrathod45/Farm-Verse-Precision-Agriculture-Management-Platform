import { RiArrowRightLine, RiPlayLine } from 'react-icons/ri';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-b from-bg-light to-white overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Precision Agriculture Management
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-dark leading-tight tracking-tight font-display">
              Smart Farming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Starts Here
              </span>
            </h1>

            <p className="text-base sm:text-lg text-text-dark/75 max-w-xl leading-relaxed">
              Empowering farmers with a modern digital platform to efficiently
              manage farms, monitor agricultural activities, and improve
              productivity. Take control of your yield with real-time insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-12">
              <a
                href="#features"
                className="inline-flex items-center justify-center space-x-2 text-sm font-semibold text-white bg-primary hover:bg-primary/95 transition-all duration-300 px-8 py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 focus:outline-none"
              >
                <span>Get Started</span>
                <RiArrowRightLine className="text-lg" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center space-x-2 text-sm font-semibold text-text-dark bg-white hover:bg-bg-light transition-all duration-300 px-8 py-4 rounded-xl border border-gray-200 hover:border-primary/30 hover:-translate-y-0.5 focus:outline-none"
              >
                <RiPlayLine className="text-lg text-primary" />
                <span>Learn More</span>
              </a>
            </div>
          </div>

          {/* Right SVG Illustration Column */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Ambient shadow glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl filter blur-2xl opacity-60 -z-10" />
            
            <svg
              viewBox="0 0 600 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-xl h-auto drop-shadow-xl animate-float"
              style={{
                filter: 'drop-shadow(0 25px 25px rgba(46, 125, 50, 0.08))',
              }}
            >
              {/* Sky and Sun Background */}
              <circle cx="450" cy="120" r="70" fill="#FFB74D" fillOpacity="0.15" />
              <circle cx="450" cy="120" r="45" fill="#FFA726" fillOpacity="0.2" />
              <circle cx="450" cy="120" r="25" fill="#FF9800" fillOpacity="0.3" />

              {/* Cloud 1 */}
              <path
                d="M120 100C120 91.7157 126.716 85 135 85C141.737 85 147.433 89.4442 149.278 95.5398C150.916 93.308 153.541 91.875 156.5 91.875C161.47 91.875 165.5 95.9056 165.5 100.875C165.5 101.442 165.447 101.996 165.347 102.533C168.058 103.548 170 106.182 170 109.25C170 113.392 166.642 116.75 162.5 116.75H125C122.239 116.75 120 114.511 120 111.75V100Z"
                fill="#E8F5E9"
                fillOpacity="0.6"
              />

              {/* Cloud 2 */}
              <path
                d="M480 65C480 56.7157 486.716 50 495 50C501.737 50 507.433 54.4442 509.278 60.5398C510.916 58.308 513.541 56.875 516.5 56.875C521.47 56.875 525.5 60.9056 525.5 65.875C525.5 66.442 525.447 66.996 525.347 67.533C528.058 68.548 530 71.182 530 74.25C530 78.392 526.642 81.75 522.5 81.75H485C482.239 81.75 480 79.511 480 76.75V65Z"
                fill="#E8F5E9"
                fillOpacity="0.8"
              />

              {/* Layered Green Fields (Background and Foreground Hills) */}
              <path
                d="M50 450C250 420 380 470 550 430V480H50V450Z"
                fill="#C8E6C9"
              />
              <path
                d="M30 420C200 370 400 450 570 380V480H30V420Z"
                fill="#A5D6A7"
                fillOpacity="0.8"
              />
              <path
                d="M10 390C180 340 380 410 590 350V480H10V390Z"
                fill="#81C784"
                fillOpacity="0.6"
              />

              {/* Field Rows / Planting Lines */}
              <path d="M120 400L80 480" stroke="#66BB6A" strokeWidth="3" strokeDasharray="6 4" />
              <path d="M190 390L160 480" stroke="#66BB6A" strokeWidth="3" strokeDasharray="6 4" />
              <path d="M260 390L250 480" stroke="#66BB6A" strokeWidth="3" strokeDasharray="6 4" />
              <path d="M330 395L340 480" stroke="#66BB6A" strokeWidth="3" strokeDasharray="6 4" />
              <path d="M400 400L430 480" stroke="#66BB6A" strokeWidth="3" strokeDasharray="6 4" />

              {/* Crops Growing (Left Side) */}
              <g transform="translate(80, 360)">
                <path d="M10 40C10 20 20 10 20 10C20 10 25 25 15 40" fill="#2E7D32" />
                <path d="M20 40C20 20 10 10 10 10C10 10 5 25 15 40" fill="#4CAF50" />
                <rect x="13" y="35" width="4" height="15" rx="2" fill="#8D6E63" />
              </g>
              <g transform="translate(130, 370)">
                <path d="M10 40C10 20 20 10 20 10C20 10 25 25 15 40" fill="#2E7D32" />
                <path d="M20 40C20 20 10 10 10 10C10 10 5 25 15 40" fill="#4CAF50" />
                <rect x="13" y="35" width="4" height="15" rx="2" fill="#8D6E63" />
              </g>

              {/* Smart IoT Weather Station / Sensor (Left Center) */}
              <g transform="translate(180, 240)">
                {/* Pole */}
                <rect x="23" y="40" width="4" height="90" fill="#78909C" />
                <rect x="18" y="125" width="14" height="8" rx="2" fill="#455A64" />
                {/* Wind Sensor */}
                <line x1="25" y1="40" x2="25" y2="25" stroke="#78909C" strokeWidth="3" />
                <circle cx="15" cy="25" r="5" fill="#CFD8DC" />
                <circle cx="35" cy="25" r="5" fill="#CFD8DC" />
                <line x1="15" y1="25" x2="35" y2="25" stroke="#78909C" strokeWidth="2" />
                {/* Solar Panel */}
                <rect x="5" y="45" width="20" height="15" rx="2" transform="rotate(-15 5 45)" fill="#0D47A1" stroke="#ECEFF1" strokeWidth="1" />
                <line x1="8" y1="50" x2="22" y2="46" stroke="#1E88E5" strokeWidth="1" />
                {/* Smart Transmitter Box */}
                <rect x="17" y="65" width="16" height="22" rx="3" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="1" />
                <circle cx="25" cy="73" r="2" fill="#2E7D32" />
                <circle cx="25" cy="80" r="2" fill="#66BB6A" />
              </g>

              {/* Dotted Signal Lines representing wireless connection */}
              <path
                d="M205 260C225 240 270 230 300 240"
                stroke="#66BB6A"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />

              {/* Modern Smart Tractor (Center Right) */}
              <g transform="translate(280, 280)">
                {/* Tractor Shadow */}
                <ellipse cx="100" cy="115" rx="75" ry="12" fill="#2E7D32" fillOpacity="0.15" />
                
                {/* Back Wheel */}
                <circle cx="50" cy="90" r="30" fill="#37474F" stroke="#B0BEC5" strokeWidth="3" />
                <circle cx="50" cy="90" r="16" fill="#78909C" />
                <circle cx="50" cy="90" r="6" fill="#37474F" />
                
                {/* Front Wheel */}
                <circle cx="135" cy="100" r="20" fill="#37474F" stroke="#B0BEC5" strokeWidth="2" />
                <circle cx="135" cy="100" r="10" fill="#78909C" />
                <circle cx="135" cy="100" r="4" fill="#37474F" />

                {/* Tractor Chassis / Body */}
                <rect x="45" y="55" width="80" height="35" rx="5" fill="#2E7D32" />
                {/* Engine cover front */}
                <path d="M105 55H140V85H125V90H105V55Z" fill="#2E7D32" />
                <path d="M125 58H138V70H125V58Z" fill="#1B5E20" /> {/* Front grill accent */}
                <rect x="85" y="80" width="30" height="10" fill="#546E7A" />

                {/* Cabin / Roof */}
                <path d="M50 55L65 15H95L102 55H50Z" fill="#ECEFF1" fillOpacity="0.9" stroke="#78909C" strokeWidth="3" />
                <rect x="68" y="22" width="22" height="24" rx="2" fill="#90CAF9" fillOpacity="0.6" />
                <rect x="58" y="5" width="45" height="10" rx="3" fill="#2E7D32" />

                {/* Exhaust Pipe */}
                <rect x="120" y="30" width="4" height="25" fill="#37474F" />
                <path d="M120 30L124 25" stroke="#37474F" strokeWidth="3" />

                {/* Antenna with IoT sensor transmitter */}
                <line x1="80" y1="5" x2="80" y2="-12" stroke="#78909C" strokeWidth="2" />
                <circle cx="80" cy="-12" r="4" fill="#66BB6A" />
                <circle cx="80" cy="-12" r="8" stroke="#66BB6A" strokeWidth="1" fill="none" strokeDasharray="2 2" className="animate-ping" />
              </g>

              {/* Farmer Silhouette / Character standing next to crops (Right Center) */}
              <g transform="translate(480, 270)">
                {/* Shadow */}
                <ellipse cx="25" cy="115" rx="20" ry="6" fill="#2E7D32" fillOpacity="0.15" />
                
                {/* Body/Shirt */}
                <path d="M15 75C15 65 20 60 25 60C30 60 35 65 35 75V112H30V90H20V112H15V75Z" fill="#8D6E63" />
                {/* Overalls */}
                <path d="M18 78C18 72 20 70 25 70C30 70 32 72 32 78V92H18V78Z" fill="#2E7D32" fillOpacity="0.8" />
                {/* Head */}
                <circle cx="25" cy="46" r="10" fill="#FFCCBC" />
                {/* Straw Hat */}
                <ellipse cx="25" cy="38" rx="16" ry="4" fill="#FFE082" />
                <path d="M17 38C17 30 22 28 25 28C28 28 33 30 33 38H17Z" fill="#FFCA28" />
                {/* Arm / Tablet Device */}
                <path d="M15 75L5 85" stroke="#FFCCBC" strokeWidth="4" strokeLinecap="round" />
                <rect x="0" y="82" width="10" height="7" rx="1" fill="#37474F" stroke="#ECEFF1" strokeWidth="1" />
                <circle cx="5" cy="85" r="1" fill="#66BB6A" />
              </g>

              {/* Floating Cloud/Data Node connection representing Smart Platform */}
              <g transform="translate(380, 50)" className="animate-bounce">
                <rect x="0" y="0" width="90" height="35" rx="10" fill="white" stroke="#2E7D32" strokeWidth="1.5" />
                <path d="M15 17.5H25" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
                <path d="M15 11.5H35" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
                <path d="M15 23.5H30" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
                {/* Small graph icon in node */}
                <path d="M55 25V12L65 18L75 10" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="75" cy="10" r="2" fill="#2E7D32" />
              </g>

              {/* Dotted Signal Lines representing wireless connection to Farmer */}
              <path
                d="M425 85C425 150 490 180 485 260"
                stroke="#2E7D32"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Dynamic Keyframes injected locally */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
