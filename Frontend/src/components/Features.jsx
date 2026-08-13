import {
  RiMap2Line,
  RiPlantLine,
  RiDropLine,
  RiFlaskLine,
  RiBarChart2Line,
  RiSunCloudyLine,
  RiSparklingLine,
} from 'react-icons/ri';

const Features = () => {
  const featuresList = [
    {
      id: 1,
      title: 'Farm Management',
      description: 'Manage your farms and keep important farm information organized in one place.',
      icon: RiMap2Line,
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      id: 2,
      title: 'Crop Management',
      description: 'Track and manage crops across your farms with an organized crop management system.',
      icon: RiPlantLine,
      color: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      id: 3,
      title: 'Irrigation Management',
      description: 'Schedule and manage irrigation activities to keep your farm operations organized.',
      icon: RiDropLine,
      color: 'text-sky-500 border-sky-500/20 bg-sky-500/5',
    },
    {
      id: 4,
      title: 'Fertilizer Management',
      description: 'Record and manage fertilizer usage and application information for your farms.',
      icon: RiFlaskLine,
      color: 'text-orange-500 border-orange-500/20 bg-orange-500/5',
    },
    {
      id: 5,
      title: 'Weather Intelligence',
      description: 'Monitor current weather conditions and forecasts to make better-informed farming decisions.',
      icon: RiSunCloudyLine,
      color: 'text-blue-500 border-blue-500/20 bg-blue-500/5',
    },
    {
      id: 6,
      title: 'AI Farming Assistant',
      description: 'Get conversational AI assistance for questions about crops, soil, irrigation, fertilizers, and farming.',
      icon: RiSparklingLine,
      color: 'text-emerald-600 border-emerald-600/20 bg-emerald-600/5',
    },
    {
      id: 7,
      title: 'Farm Reports',
      description: 'Create and manage farm reports and record important observations and activities.',
      icon: RiBarChart2Line,
      color: 'text-accent border-accent/20 bg-accent/5',
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#F4F8F2]/60 relative overflow-hidden">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            Core Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark font-display leading-tight">
            Precision Tools for Smarter Farming
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            Explore the specialized modules built to digitize your daily agricultural workflows.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative bg-white p-8 rounded-3xl border border-border-light hover:border-primary/20 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border ${feat.color} mb-6 transition-all duration-300 group-hover:scale-105`}>
                    <IconComponent className="text-2xl" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-text-dark mb-3 font-display group-hover:text-primary transition-colors duration-200">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {feat.description}
                  </p>
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
