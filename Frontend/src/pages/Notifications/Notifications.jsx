import { RiNotification3Line, RiPlantLine, RiDropLine, RiAlertLine, RiSettings3Line, RiDeleteBinLine, RiCheckDoubleLine } from 'react-icons/ri';

const notifications = [
  { id: 1, title: 'Rice crop growth at 70%', desc: 'Green Valley Farm — Rice is progressing well. Expected harvest in October.', time: '2 hours ago', category: 'Crop', icon: RiPlantLine, color: 'text-primary', bg: 'bg-primary/10', read: false },
  { id: 2, title: 'Irrigation scheduled for Tomato Farm', desc: 'Organic Field — Drip irrigation scheduled for tomorrow at 08:00 AM.', time: '5 hours ago', category: 'Irrigation', icon: RiDropLine, color: 'text-sky', bg: 'bg-sky/10', read: false },
  { id: 3, title: 'Fertilizer application due', desc: 'Sunny Farm — Potash application for Groundnut is due on 12 July.', time: 'Yesterday', category: 'Farm', icon: RiAlertLine, color: 'text-accent', bg: 'bg-accent/10', read: false },
  { id: 4, title: 'Maize harvest ready', desc: 'Riverside Farm — Maize crop has reached 90% maturity. Plan harvest soon.', time: '2 days ago', category: 'Crop', icon: RiPlantLine, color: 'text-orange-500', bg: 'bg-orange-100', read: true },
  { id: 5, title: 'System maintenance completed', desc: 'FarmVerse platform maintenance was completed successfully.', time: '3 days ago', category: 'System', icon: RiSettings3Line, color: 'text-text-muted', bg: 'bg-gray-100', read: true },
  { id: 6, title: 'New report generated', desc: 'Monthly yield report for June 2026 has been generated.', time: '5 days ago', category: 'System', icon: RiSettings3Line, color: 'text-text-muted', bg: 'bg-gray-100', read: true },
  { id: 7, title: 'Wheat harvested successfully', desc: 'Green Valley Farm — Wheat crop has been harvested. Total yield: 1,200 kg.', time: '1 week ago', category: 'Crop', icon: RiPlantLine, color: 'text-primary', bg: 'bg-primary/10', read: true },
];

const categories = ['All', 'Crop', 'Irrigation', 'Farm', 'System'];

const Notifications = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark">Notifications</h1>
          <p className="text-sm text-text-muted mt-1">You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all">
            <RiCheckDoubleLine className="text-primary" />
            <span>Mark all read</span>
          </button>
          <button className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-border-light text-red-500 text-sm font-bold rounded-xl hover:bg-red-50 transition-all">
            <RiDeleteBinLine />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-1">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${i === 0 ? 'bg-primary text-white' : 'bg-white border border-border-light text-text-muted hover:bg-bg-light hover:text-text-dark'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map(n => {
          const Icon = n.icon;
          return (
            <div key={n.id} className={`bg-white rounded-2xl p-5 shadow-sm border transition-all hover:shadow-md cursor-pointer ${n.read ? 'border-border-light' : 'border-primary/30 bg-primary/[0.02]'}`}>
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-xl ${n.bg} ${n.color} flex items-center justify-center shrink-0`}>
                  <Icon className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-sm font-bold ${n.read ? 'text-text-dark' : 'text-text-dark'}`}>{n.title}</p>
                      <p className="text-xs text-text-muted mt-1">{n.desc}</p>
                    </div>
                    {!n.read && <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="text-xs font-semibold text-text-muted">{n.time}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${n.bg} ${n.color}`}>{n.category}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notifications;
