import {
  RiMap2Line,
  RiPlantLine,
  RiDropLine,
  RiFlaskLine,
  RiBarChart2Line,
  RiDashboard3Line,
} from 'react-icons/ri';

const Features = () => {
  const featuresList = [
    {
      id: 1,
      title: 'Farm Management',
      description: 'Manage multiple farms digitally with ease. Keep track of coordinates, layout bounds, and soil types.',
      icon: RiMap2Line,
      iconBg: 'bg-green-50 text-primary',
      iconBorder: 'border-green-100',
    },
    {
      id: 2,
      title: 'Crop Management',
      description: 'Track crop lifecycle and farming activities. Stay updated on sowing times, growth stages, and harvesting.',
      icon: RiPlantLine,
      iconBg: 'bg-emerald-50 text-emerald-600',
      iconBorder: 'border-emerald-100',
    },
    {
      id: 3,
      title: 'Irrigation Planning',
      description: 'Monitor irrigation schedules efficiently. Minimize water wastage using smart scheduling and automated controls.',
      icon: RiDropLine,
      iconBg: 'bg-blue-50 text-blue-600',
      iconBorder: 'border-blue-100',
    },
    {
      id: 4,
      title: 'Fertilizer Tracking',
      description: 'Maintain fertilizer usage records. Track compound percentages and soil enrichment schedules over time.',
      icon: RiFlaskLine,
      iconBg: 'bg-amber-50 text-amber-600',
      iconBorder: 'border-amber-100',
    },
    {
      id: 5,
      title: 'Reports & Analytics',
      description: 'Visualize agricultural data and productivity. Generate modern interactive charts and export custom reports.',
      icon: RiBarChart2Line,
      iconBg: 'bg-purple-50 text-purple-600',
      iconBorder: 'border-purple-100',
    },
    {
      id: 6,
      title: 'Farmer Dashboard',
      description: 'Access all farm information from one place. A simplified unified view of your entire agricultural ecosystem.',
      icon: RiDashboard3Line,
      iconBg: 'bg-teal-50 text-teal-600',
      iconBorder: 'border-teal-100',
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative">
      {/* Decorative background gradients */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            Core Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark font-display">
            Precision Agtech At Your Fingertips
          </h2>
          <p className="text-base text-text-dark/70">
            FarmVerse delivers a robust suite of tools built on modern full stack architecture to optimize crops, conserve resources, and boost crop productivity.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative bg-bg-light/40 hover:bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/20 shadow-xs hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-350 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feat.iconBg} border ${feat.iconBorder} mb-6 transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent className="text-2xl" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-text-dark mb-3 font-display group-hover:text-primary transition-colors duration-200">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-text-dark/70 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Micro Action link */}
                <div className="mt-8 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>Explore module &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
