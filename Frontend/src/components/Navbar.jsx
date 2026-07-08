import { useState, useEffect } from 'react';
import { RiLeafLine, RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled
          ? 'py-3 shadow-md border-b border-gray-100'
          : 'py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <a
            href="#home"
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              <RiLeafLine className="text-2xl transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <span className="text-xl font-bold tracking-tight text-text-dark font-display">
              Farm<span className="text-primary font-extrabold">Verse</span>
            </span>
          </a>

          {/* Desktop Navigation Links (Center) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-semibold text-text-dark/80 hover:text-primary transition-colors duration-200 py-2 group focus:outline-none"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons (Right) */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-sm font-semibold text-text-dark hover:text-primary transition-colors duration-200 px-4 py-2 hover:bg-bg-light rounded-xl">
              Login
            </button>
            <button className="text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-all duration-200 px-5 py-2.5 rounded-xl shadow-sm hover:shadow hover:-translate-y-0.5">
              Register
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center p-2 rounded-xl hover:bg-bg-light text-text-dark/80 hover:text-primary focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <RiCloseLine className="text-2xl" />
              ) : (
                <RiMenu3Line className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-[73px] right-0 bottom-0 z-40 w-72 bg-white border-l border-gray-100 shadow-xl transition-transform duration-300 ease-in-out transform md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between p-6">
          {/* Navigation Links */}
          <div className="space-y-6">
            <p className="text-xs font-semibold text-text-dark/40 uppercase tracking-wider">
              Navigation
            </p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-text-dark/80 hover:text-primary transition-colors duration-200 py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Auth Actions */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <button
              className="w-full text-center text-sm font-semibold text-text-dark hover:text-primary transition-colors duration-200 py-3 hover:bg-bg-light rounded-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </button>
            <button
              className="w-full text-center text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-all duration-200 py-3 rounded-xl shadow-sm hover:shadow"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
