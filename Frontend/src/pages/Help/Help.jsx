import { useState } from 'react';
import { RiQuestionLine, RiMailLine, RiPhoneLine, RiArrowDownSLine, RiArrowUpSLine, RiSendPlaneLine, RiBookOpenLine, RiLightbulbLine, RiRocketLine } from 'react-icons/ri';

const faqs = [
  { q: 'How do I add a new farm?', a: 'Navigate to "My Farms" from the sidebar and click the "Add Farm" button. Fill in the required details like farm name, location, area, and soil type, then save.' },
  { q: 'How do I schedule irrigation?', a: 'Go to the "Irrigation" page and click "Schedule Irrigation". Select the farm, crop, irrigation type, date, and time to create a new schedule.' },
  { q: 'Can I track multiple crops on one farm?', a: 'Yes. Each farm can have multiple crops. Go to "Crop Management" and add crops by selecting the respective farm from the dropdown.' },
  { q: 'How do I generate reports?', a: 'Visit the "Reports" page to view farm analytics. You can also export reports as PDF or Excel using the export buttons.' },
  { q: 'Is my data secure?', a: 'Yes. FarmVerse uses industry-standard security practices. All data is encrypted and access is protected with authentication.' },
  { q: 'How do I update my profile?', a: 'Go to the "Profile" page and click "Edit Profile" to update your personal information including name, email, phone, and village.' },
];

const guides = [
  { title: 'Getting Started', desc: 'Learn the basics of setting up your first farm and adding crops.', icon: RiRocketLine, color: 'text-primary', bg: 'bg-primary/10' },
  { title: 'Managing Irrigation', desc: 'Best practices for scheduling and tracking irrigation activities.', icon: RiLightbulbLine, color: 'text-sky', bg: 'bg-sky/10' },
  { title: 'Understanding Reports', desc: 'How to read analytics, charts, and generate export files.', icon: RiBookOpenLine, color: 'text-accent', bg: 'bg-accent/10' },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-text-dark">Help & Support</h1>
        <p className="text-sm text-text-muted mt-1">Find answers, guidance, and contact information.</p>
      </div>

      {/* User Guidance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {guides.map((g, i) => {
          const Icon = g.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-border-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl ${g.bg} ${g.color} flex items-center justify-center mb-4`}>
                <Icon className="text-xl" />
              </div>
              <h3 className="text-base font-bold text-text-dark mb-1">{g.title}</h3>
              <p className="text-xs text-text-muted">{g.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* FAQs */}
        <div className="xl:col-span-7">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
            <div className="flex items-center space-x-2 mb-6">
              <RiQuestionLine className="text-xl text-primary" />
              <h3 className="text-lg font-bold text-text-dark">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-border-light rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-bg-light transition-colors"
                  >
                    <span className="text-sm font-bold text-text-dark pr-4">{faq.q}</span>
                    {openIndex === i ? <RiArrowUpSLine className="text-primary text-xl shrink-0" /> : <RiArrowDownSLine className="text-text-muted text-xl shrink-0" />}
                  </button>
                  {openIndex === i && (
                    <div className="px-4 pb-4 text-sm text-text-muted leading-relaxed border-t border-border-light pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact + Submit Query */}
        <div className="xl:col-span-5 space-y-6">
          {/* Contact Cards */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
            <h3 className="text-lg font-bold text-text-dark mb-5">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-bg-light border border-border-light">
                <RiMailLine className="text-xl text-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Email</p>
                  <p className="text-sm font-semibold text-text-dark">support@farmverse.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-bg-light border border-border-light">
                <RiPhoneLine className="text-xl text-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-semibold text-text-dark">+91 1800 123 4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Query */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
            <h3 className="text-lg font-bold text-text-dark mb-5">Submit a Query</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">Subject</label>
                <input type="text" placeholder="Brief description" className="w-full px-4 py-2.5 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">Message</label>
                <textarea rows={4} placeholder="Describe your issue..." className="w-full px-4 py-2.5 bg-bg-light border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" />
              </div>
              <button className="w-full inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all">
                <RiSendPlaneLine />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
