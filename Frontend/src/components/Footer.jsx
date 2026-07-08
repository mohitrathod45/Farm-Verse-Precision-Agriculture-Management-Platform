import { RiLeafLine, RiTwitterXLine, RiLinkedinBoxLine, RiGithubLine, RiSeedlingLine } from 'react-icons/ri';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: RiTwitterXLine, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: RiLinkedinBoxLine, href: 'https://linkedin.com' },
    { name: 'GitHub', icon: RiGithubLine, href: 'https://github.com' },
  ];

  return (
    <footer className="bg-bg-light border-t border-gray-100 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-gray-200/60">
          
          {/* Column 1: Branding & Description */}
          <div className="md:col-span-5 space-y-6 text-left">
            <a href="#home" className="flex items-center space-x-2 group focus:outline-none">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white transition-all duration-300">
                <RiLeafLine className="text-xl transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <span className="text-lg font-bold tracking-tight text-text-dark font-display">
                Farm<span className="text-primary font-extrabold">Verse</span>
              </span>
            </a>
            <p className="text-sm text-text-dark/75 leading-relaxed max-w-sm">
              FarmVerse is a modern web application that helps farmers digitally manage farms, crops, irrigation schedules, fertilizer records, and harvest information through a simple and user-friendly platform.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-gray-200 text-text-dark/70 hover:text-white hover:bg-primary hover:border-primary transition-all duration-200 shadow-xs"
                    aria-label={social.name}
                  >
                    <Icon className="text-base" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark/40">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-text-dark/80 hover:text-primary transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Project Information */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark/40">
              Project Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm font-semibold text-text-dark/80">
                <RiSeedlingLine className="text-primary text-base" />
                <span>Java Full Stack Project</span>
              </div>
              <ul className="text-xs text-text-dark/65 leading-relaxed space-y-1">
                <li><strong>Frontend:</strong> React + Tailwind CSS</li>
                <li><strong>Backend:</strong> Spring Boot</li>
                <li><strong>Database:</strong> MySQL</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-center sm:text-left">
          <p className="text-xs font-medium text-text-dark/60">
            &copy; {currentYear} FarmVerse. All Rights Reserved.
          </p>
          <p className="text-xs font-medium text-text-dark/60 flex items-center space-x-1">
            <span>Developed by Team FarmVerse</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
