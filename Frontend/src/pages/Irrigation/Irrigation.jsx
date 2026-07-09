import { RiDropLine, RiCalendarCheckLine, RiTimeLine, RiCheckLine, RiAlertLine } from 'react-icons/ri';

const stats = [
  { title: 'Scheduled', value: '5', color: 'text-sky', desc: 'This week' },
  { title: 'Completed', value: '23', color: 'text-primary', desc: 'This month' },
  { title: 'Pending', value: '2', color: 'text-accent', desc: 'Overdue' },
  { title: 'Water Used', value: '1,240L', color: 'text-secondary', desc: 'This month' },
];

const upcoming = [
  { farm: 'Green Valley Farm', crop: 'Rice', date: 'Today, 05:00 PM', type: 'Drip Irrigation', status: 'Scheduled', icon: RiTimeLine, color: 'text-sky', bg: 'bg-sky/10' },
  { farm: 'Organic Field', crop: 'Tomato', date: 'Tomorrow, 08:00 AM', type: 'Sprinkler', status: 'Scheduled', icon: RiTimeLine, color: 'text-accent', bg: 'bg-accent/10' },
  { farm: 'Riverside Farm', crop: 'Maize', date: 'In 2 days', type: 'Flood Irrigation', status: 'Scheduled', icon: RiTimeLine, color: 'text-primary', bg: 'bg-primary/10' },
];

const completed = [
  { farm: 'Sunny Farm', crop: 'Groundnut', date: '5 Jul 2026', type: 'Drip Irrigation', duration: '45 min', water: '180L' },
  { farm: 'Green Valley Farm', crop: 'Rice', date: '3 Jul 2026', type: 'Flood Irrigation', duration: '90 min', water: '320L' },
  { farm: 'Hilltop Acres', crop: 'Cotton', date: '1 Jul 2026', type: 'Sprinkler', duration: '60 min', water: '220L' },
  { farm: 'Organic Field', crop: 'Tomato', date: '28 Jun 2026', type: 'Drip Irrigation', duration: '30 min', water: '140L' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const schedule = [
  { day: 'Mon', slots: [{ time: '06:00 AM', farm: 'Green Valley', active: true }, { time: '05:00 PM', farm: 'Organic Field', active: false }] },
  { day: 'Tue', slots: [] },
  { day: 'Wed', slots: [{ time: '08:00 AM', farm: 'Riverside Farm', active: true }] },
  { day: 'Thu', slots: [{ time: '06:00 AM', farm: 'Sunny Farm', active: false }] },
  { day: 'Fri', slots: [] },
  { day: 'Sat', slots: [{ time: '07:00 AM', farm: 'Hilltop Acres', active: true }] },
  { day: 'Sun', slots: [] },
];

const Irrigation = () => {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark">Irrigation</h1>
          <p className="text-sm text-text-muted mt-1">Schedule and track irrigation activities across your farms.</p>
        </div>
        <button className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-primary/90 transition-all">
          <RiCalendarCheckLine className="text-lg" />
          <span>Schedule Irrigation</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-border-light">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">{s.title}</p>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-text-muted mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        {/* Upcoming */}
        <div className="xl:col-span-5 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
          <h3 className="text-lg font-bold text-text-dark mb-5">Upcoming Irrigation</h3>
          <div className="space-y-4">
            {upcoming.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`flex items-start space-x-4 p-4 rounded-xl border border-border-light hover:shadow-sm transition-all`}>
                  <div className={`w-10 h-10 rounded-lg ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                    <Icon className="text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-dark truncate">{item.farm}</p>
                    <p className="text-xs text-text-muted">{item.crop} · {item.type}</p>
                    <p className="text-xs font-semibold text-text-muted mt-1">{item.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="xl:col-span-7 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
          <h3 className="text-lg font-bold text-text-dark mb-5">Weekly Schedule</h3>
          <div className="grid grid-cols-7 gap-2">
            {schedule.map((day, i) => (
              <div key={i} className="text-center">
                <p className="text-xs font-bold text-text-muted mb-2">{day.day}</p>
                <div className={`min-h-[100px] rounded-xl border border-border-light p-2 space-y-2 ${day.slots.length > 0 ? 'bg-bg-light' : 'bg-white'}`}>
                  {day.slots.map((slot, j) => (
                    <div key={j} className={`text-[10px] font-bold p-1.5 rounded-lg ${slot.active ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-text-muted'}`}>
                      <p>{slot.time}</p>
                      <p className="truncate">{slot.farm}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completed Irrigation Table */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
        <h3 className="text-lg font-bold text-text-dark mb-5">Completed Irrigation</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light">
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Farm</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Crop</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Date</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Type</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Duration</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4 text-right">Water Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {completed.map((c, i) => (
                <tr key={i} className="hover:bg-bg-light/60 transition-colors">
                  <td className="py-3.5 px-4 text-sm font-bold text-text-dark">{c.farm}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{c.crop}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{c.date}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{c.type}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{c.duration}</td>
                  <td className="py-3.5 px-4 text-sm font-bold text-sky text-right">{c.water}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Irrigation;
