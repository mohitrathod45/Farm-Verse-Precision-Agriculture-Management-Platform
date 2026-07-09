import {
  RiMap2Line,
  RiPlantLine,
  RiDropLine,
  RiFlaskLine,
  RiBarChart2Line,
  RiNotification3Line,
} from 'react-icons/ri';

const Features = () => {
  const featuresList = [
    {
      id: 1,
      title: 'Farm Management',
      description: 'Manage all farms from one dashboard. Track farm boundaries, area size, and soil details.',
      icon: RiMap2Line,
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      id: 2,
      title: 'Crop Management',
      description: 'Track crop growth and harvesting. Stay updated on crop progress and cultivation history.',
      icon: RiPlantLine,
      color: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      id: 3,
      title: 'Irrigation Scheduling',
      description: 'Plan watering schedules efficiently. Optimize water utilization and monitor upcoming slots.',
      icon: RiDropLine,
      color: 'text-sky-500 border-sky-500/20 bg-sky-500/5',
    },
    {
      id: 4,
      title: 'Fertilizer Tracking',
      description: 'Maintain fertilizer history. Record details of product applications, quantity, and dates.',
      icon: RiFlaskLine,
      color: 'text-orange-500 border-orange-500/20 bg-orange-500/5',
    },
    {
      id: 5,
      title: 'Reports',
      description: 'View farm insights and summaries. Access dynamic monthly summaries and resource usage data.',
      icon: RiBarChart2Line,
      color: 'text-accent border-accent/20 bg-accent/5',
    },
    {
      id: 6,
      title: 'Notifications',
      description: 'Receive important farming reminders. Get alerts about scheduled watering and fertilizer timelines.',
      icon: RiNotification3Line,
      color: 'text-teal-600 border-teal-600/20 bg-teal-600/5',
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
