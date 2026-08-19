import {
  RiReactjsLine,
  RiLeafLine,
  RiDatabase2Line,
  RiCss3Line,
  RiSparklingLine,
  RiSunCloudyLine,
} from 'react-icons/ri';

const TechStack = () => {
  const techs = [
    {
      name: 'React',
      description: 'Component-based frontend framework powering the FarmVerse user interface.',
      icon: RiReactjsLine,
      color: 'text-sky-500 border-sky-500/20 bg-sky-500/5',
    },
    {
      name: 'Spring Boot',
      description: 'Java backend framework powering REST APIs and business logic.',
      icon: RiLeafLine,
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      name: 'MySQL',
      description: 'Relational database storing farm, crop, irrigation, fertilizer, and report data.',
      icon: RiDatabase2Line,
      color: 'text-blue-600 border-blue-600/20 bg-blue-600/5',
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework used to build the responsive FarmVerse interface.',
      icon: RiCss3Line,
      color: 'text-teal-500 border-teal-500/20 bg-teal-500/5',
    },
    {
      name: 'Gemini AI',
      description: 'AI technology powering the FarmVerse agricultural assistant and farming guidance.',
      icon: RiSparklingLine,
      color: 'text-emerald-600 border-emerald-600/20 bg-emerald-600/5',
    },
    {
      name: 'Weather API',
      description: 'Real-time weather data used to provide current conditions and weather-based farming insights.',
      icon: RiSunCloudyLine,
      color: 'text-amber-500 border-amber-500/20 bg-amber-500/5',
    },
  ];

  return (
    <section id="tech-stack" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-[30%]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark font-display leading-tight">
            Powered by Modern Technology
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            FarmVerse combines modern web technologies, AI, and real-time weather data to deliver a smarter agricultural management experience.
          </p>
        </div>

        {/* Technology Grid (Balanced 3 + 3 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techs.map((t, index) => {
            const Icon = t.icon;
            return (
              <div
                key={index}
                className="group relative bg-white p-6 rounded-2xl border border-border-light hover:border-primary/20 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${t.color} transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="text-sm font-bold text-text-dark group-hover:text-primary transition-colors duration-200">
                    {t.name}
                  </h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {t.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
