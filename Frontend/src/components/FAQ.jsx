import { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine, RiQuestionLine } from 'react-icons/ri';

const FAQ = () => {
  const faqs = [
    {
      q: 'What is FarmVerse?',
      a: 'FarmVerse is a Precision Agriculture Management Platform designed to help farmers digitize their daily operations. Built as a Java Full Stack project, it provides tools for mapping farms, tracking crops, scheduling watering intervals, logging fertilizers, and reviewing detailed summaries.',
    },
    {
      q: 'Who can use FarmVerse?',
      a: 'FarmVerse is built for agriculturalists, farm owners, and students researching agritech systems who wish to transition from manual record-keeping to a clean, centralized digital platform.',
    },
    {
      q: 'Can multiple farms be managed?',
      a: 'Yes. The system supports registering and tracking multiple farms under a single user profile. You can view metrics separately for each plot or review aggregated data on the reports page.',
    },
    {
      q: 'How does irrigation scheduling work?',
      a: 'You can create scheduled irrigation slots by defining the farm, crop, water delivery method (e.g. drip, sprinkler, flood), date, and duration. The platform lists upcoming events on your dashboard and tracks water usage.',
    },
    {
      q: 'Is my farm data secure?',
      a: 'Absolutely. FarmVerse implements robust data segregation and user validation components, ensuring your personal farm logs, coordinates, and crop records are accessible only by your verified profile.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-[#F4F8F2]/60 border-y border-border-light relative overflow-hidden">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 translate-y-[-50%] translate-x-[-50%]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark font-display leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            Find answers to common questions about setting up and using the FarmVerse platform.
          </p>
        </div>

        {/* Expandable Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-border-light overflow-hidden transition-all duration-300 shadow-xs hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <RiQuestionLine className={`text-xl ${isOpen ? 'text-primary' : 'text-text-muted'} shrink-0`} />
                    <span className="text-sm sm:text-base font-bold text-text-dark group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  {isOpen ? (
                    <RiArrowUpSLine className="text-primary text-2xl shrink-0" />
                  ) : (
                    <RiArrowDownSLine className="text-text-muted text-2xl shrink-0" />
                  )}
                </button>

                {/* Animated expand panel */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-60 border-t border-border-light' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-sm text-text-muted leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
