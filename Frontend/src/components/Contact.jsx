import { RiMailLine, RiPhoneLine, RiMapPin2Line, RiExternalLinkLine } from 'react-icons/ri';

const Contact = () => {
  const contactInfo = [
    {
      id: 1,
      title: 'Email Address',
      value: 'support@farmverse.com',
      description: 'Send us an email anytime. We typically respond within 24 business hours.',
      icon: RiMailLine,
      iconBg: 'bg-green-50 text-primary',
      actionText: 'Send Email',
      actionHref: 'mailto:support@farmverse.com',
    },
    {
      id: 2,
      title: 'Phone Number',
      value: '+1 (800) 555-FARM',
      description: 'Speak directly with our agronomy and platform support specialists.',
      icon: RiPhoneLine,
      iconBg: 'bg-emerald-50 text-emerald-600',
      actionText: 'Call Support',
      actionHref: 'tel:+18005553276',
    },
    {
      id: 3,
      title: 'Office Location',
      value: 'Silicon Valley, CA, USA',
      description: 'FarmVerse HQ. Visited by partners, engineers, and digital innovators.',
      icon: RiMapPin2Line,
      iconBg: 'bg-amber-50 text-amber-600',
      actionText: 'Get Directions',
      actionHref: 'https://maps.google.com',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white relative">
      {/* Decorative ambient designs */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark font-display">
            We are Here to Help
          </h2>
          <p className="text-base text-text-dark/70">
            Have questions about integrating FarmVerse on your agricultural lands? Connect with our team of technical advisors.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group bg-bg-light/40 hover:bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/20 shadow-xs hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${item.iconBg} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="text-xl" />
                  </div>

                  {/* Title & Detail */}
                  <h3 className="text-lg font-bold text-text-dark font-display mb-2">
                    {item.title}
                  </h3>
                  <p className="text-md font-extrabold text-primary font-display mb-3">
                    {item.value}
                  </p>
                  <p className="text-sm text-text-dark/70 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Direct Action Link */}
                <a
                  href={item.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-primary group-hover:text-primary/80 transition-colors duration-200"
                >
                  <span>{item.actionText}</span>
                  <RiExternalLinkLine className="text-sm" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Contact;
