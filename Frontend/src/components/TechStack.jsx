import { RiReactjsLine, RiLeafLine, RiDatabase2Line, RiCss3Line, RiGitBranchLine, RiGithubLine, RiSendPlane2Line, RiFlashlightLine } from 'react-icons/ri';

const TechStack = () => {
  const techs = [
    {
      name: 'React',
      description: 'Single-page web framework for component-driven UI views.',
      icon: RiReactjsLine,
      color: 'text-sky-500 border-sky-500/20 bg-sky-500/5',
    },
    {
      name: 'Spring Boot',
      description: 'Enterprise Java backend powering service layers and REST APIs.',
      icon: RiLeafLine,
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      name: 'MySQL',
      description: 'Relational data store for structured crop records and schedules.',
      icon: RiDatabase2Line,
      color: 'text-blue-600 border-blue-600/20 bg-blue-600/5',
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first styling utility for responsive UI components.',
      icon: RiCss3Line,
      color: 'text-teal-500 border-teal-500/20 bg-teal-500/5',
    },
    {
      name: 'Git',
      description: 'Distributed version control software for code repositories.',
      icon: RiGitBranchLine,
      color: 'text-orange-600 border-orange-600/20 bg-orange-600/5',
    },
    {
      name: 'GitHub',
      description: 'Online repository platform for collaboration and pipeline tools.',
      icon: RiGithubLine,
      color: 'text-text-dark border-text-dark/20 bg-text-dark/5',
    },
    {
      name: 'Postman',
      description: 'API development and documentation tester for endpoint testing.',
      icon: RiSendPlane2Line,
      color: 'text-orange-500 border-orange-500/20 bg-orange-500/5',
    },
    {
      name: 'Vite',
      description: 'Modern dev server and bundler offering instantaneous HMR.',
      icon: RiFlashlightLine,
      color: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5',
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
            Built With Modern Technologies
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            FarmVerse implements robust software standards across frontend, backend, and testing layers.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
