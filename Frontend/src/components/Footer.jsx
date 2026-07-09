import { RiLeafLine, RiLinkedinBoxLine, RiGithubLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: RiLinkedinBoxLine, href: 'https://linkedin.com' },
    { name: 'GitHub', icon: RiGithubLine, href: 'https://github.com' },
  ];

  return (
    <footer className="bg-[#F4F8F2]/60 border-t border-border-light pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-border-light/80">
          
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
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
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
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-border-light text-text-muted hover:text-white hover:bg-primary hover:border-primary transition-all duration-200 shadow-xs"
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-text-muted hover:text-primary transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Project Info */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-text-muted font-semibold">
              <p>Email: <a href="mailto:support@farmverse.com" className="text-primary hover:underline">support@farmverse.com</a></p>
              <p>Location: India</p>
              <div className="h-px bg-border-light/80 my-3" />
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted/60">
                Technology Stack
              </p>
              <ul className="text-xs text-text-muted/85 font-medium space-y-1">
                <li>React + Spring Boot</li>
                <li>Tailwind CSS + MySQL</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-center sm:text-left">
          <p className="text-xs font-medium text-text-muted">
            &copy; 2026 FarmVerse. All Rights Reserved.
          </p>
          <p className="text-xs font-medium text-text-muted">
            Developed by Team FarmVerse
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
