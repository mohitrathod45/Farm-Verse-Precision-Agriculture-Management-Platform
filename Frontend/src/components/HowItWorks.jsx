import { RiUserAddLine, RiMapPinAddLine, RiPlantLine, RiDropLine, RiBarChart2Line } from 'react-icons/ri';

const HowItWorks = () => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Register',
      description: 'Create your free account with your email and basic farming coordinates.',
      icon: RiUserAddLine,
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      step: 'Step 2',
      title: 'Add Your Farm',
      description: 'Define your farm areas, boundaries, and regional details on the platform.',
      icon: RiMapPinAddLine,
      color: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      step: 'Step 3',
      title: 'Manage Crops',
      description: 'Add crops to your farms, track sowing dates, and monitor development.',
      icon: RiPlantLine,
      color: 'text-sky-500 border-sky-500/20 bg-sky-500/5',
    },
    {
      step: 'Step 4',
      title: 'Schedule Irrigation',
      description: 'Plan hydration timelines and fertilizer events to keep crops healthy.',
      icon: RiDropLine,
      color: 'text-orange-500 border-orange-500/20 bg-orange-500/5',
    },
    {
      step: 'Step 5',
      title: 'Generate Reports',
      description: 'Review productivity dashboards and export monthly yield analytics.',
      icon: RiBarChart2Line,
      color: 'text-accent border-accent/20 bg-accent/5',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative backdrop graphics */}
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark font-display leading-tight">
            How FarmVerse Works
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            Get up and running with precision agriculture in five simple steps.
          </p>
        </div>

        {/* Process Steps Layout */}
        <div className="relative">
          {/* Connecting Line for Large Screens */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center group">
                  {/* Step Icon with Step Number Badge */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border-2 ${step.color} shadow-xs transition-transform duration-300 group-hover:scale-105 bg-white relative z-10`}>
                      <Icon className="text-3xl" />
                    </div>
                    {/* Step badge */}
                    <span className="absolute -top-2.5 -right-2.5 bg-text-dark text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-border-light shadow-xs z-20">
                      {step.step}
                    </span>
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="text-base font-bold text-text-dark mb-2 group-hover:text-primary transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-[200px] md:max-w-none">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
