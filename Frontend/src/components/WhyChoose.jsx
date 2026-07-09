import { RiMap2Line, RiPlantLine, RiDropLine, RiFlaskLine, RiBarChart2Line, RiShieldKeyholeLine } from 'react-icons/ri';

const WhyChoose = () => {
  const points = [
    {
      title: 'Manage Multiple Farms',
      description: 'Digitize and oversee all your farm locations and boundaries from one unified account.',
      icon: RiMap2Line,
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      title: 'Crop Monitoring',
      description: 'Track seed cycles, crop growth progress, health conditions, and harvesting stages.',
      icon: RiPlantLine,
      color: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      title: 'Smart Irrigation',
      description: 'Schedule automated watering intervals and optimize field hydration levels.',
      icon: RiDropLine,
      color: 'text-sky-500 border-sky-500/20 bg-sky-500/5',
    },
    {
      title: 'Fertilizer Tracking',
      description: 'Log and monitor fertilizing patterns, soil properties, and composition history.',
      icon: RiFlaskLine,
      color: 'text-orange-500 border-orange-500/20 bg-orange-500/5',
    },
    {
      title: 'Reports & Analytics',
      description: 'Generate crop yields summaries, water consumption metrics, and visual performance charts.',
      icon: RiBarChart2Line,
      color: 'text-accent border-accent/20 bg-accent/5',
    },
    {
      title: 'Secure Platform',
      description: 'Protect farm records with advanced session handling and digital data encryption.',
      icon: RiShieldKeyholeLine,
      color: 'text-teal-600 border-teal-600/20 bg-teal-600/5',
    },
  ];

  return (
    <section id="why-choose" className="py-24 bg-white border-y border-border-light relative overflow-hidden">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10 translate-y-[-50%] translate-x-[-50%]" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 translate-x-[30%]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            Platform Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark font-display leading-tight">
            Why Choose FarmVerse?
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            Everything you need to manage your agricultural activities in one modern platform.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border border-border-light hover:border-primary/20 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Left vertical Accent */}
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-transparent group-hover:bg-primary transition-all rounded-r-full" />
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${point.color} transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold text-text-dark group-hover:text-primary transition-colors duration-200">
                    {point.title}
                  </h3>
                </div>
                
                <p className="text-sm text-text-muted leading-relaxed pl-16">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
