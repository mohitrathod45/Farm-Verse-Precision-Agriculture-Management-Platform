import { useState } from 'react';
import { 
  RiNotification3Line, 
  RiDeleteBinLine, 
  RiCheckDoubleLine 
} from 'react-icons/ri';
import { useNotifications } from '../../context/NotificationContext';

const categories = ['All', 'Farm', 'Crop', 'Irrigation', 'Fertilizer', 'Reports'];

const Notifications = () => {
  const { notifications, unreadCount, markAllAsRead, markAsRead, clearAll, loading } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All' 
    ? notifications 
    : notifications.filter(n => n.category === selectedCategory);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark">Notifications</h1>
          <p className="text-sm text-text-muted mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all disabled:opacity-50 cursor-pointer"
          >
            <RiCheckDoubleLine className="text-primary" />
            <span>Mark all read</span>
          </button>
          <button 
            onClick={clearAll}
            disabled={notifications.length === 0}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-border-light text-red-500 text-sm font-bold rounded-xl hover:bg-red-50 transition-all disabled:opacity-50 cursor-pointer"
          >
            <RiDeleteBinLine />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat 
                ? 'bg-primary text-white shadow-sm' 
                : 'bg-white border border-border-light text-text-muted hover:bg-bg-light hover:text-text-dark'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border-light">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-3"></div>
          <p className="text-text-muted text-sm font-semibold">Loading Notifications...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-border-light mb-8">
          <RiNotification3Line className="text-4xl text-text-muted mx-auto mb-3" />
          <h3 className="text-base font-bold text-text-dark mb-1">No Notifications</h3>
          <p className="text-xs text-text-muted">You are all caught up!</p>
        </div>
      ) : (
        /* Notification List */
        <div className="space-y-3">
          {filtered.map(n => {
            const Icon = n.icon;
            return (
              <div 
                key={n.id} 
                onClick={() => markAsRead(n.id)}
                className={`bg-white rounded-2xl p-5 shadow-sm border transition-all hover:shadow-md cursor-pointer ${
                  n.read ? 'border-border-light opacity-80' : 'border-primary/30 bg-primary/[0.02]'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-xl ${n.bg} ${n.color} flex items-center justify-center shrink-0`}>
                    <Icon className="text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-text-dark">{n.title}</p>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">{n.desc}</p>
                      </div>
                      {!n.read && <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1.5" />}
                    </div>
                    <div className="flex items-center space-x-3 mt-3">
                      <span className="text-xs font-semibold text-text-muted">{n.time}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${n.bg} ${n.color}`}>
                        {n.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Notifications;
