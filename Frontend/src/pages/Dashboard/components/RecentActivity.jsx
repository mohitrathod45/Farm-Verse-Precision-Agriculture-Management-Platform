import { RiCheckLine } from 'react-icons/ri';

const RecentActivity = ({ activities = [], loading = false }) => {
  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light">
      <h3 className="text-lg font-bold text-text-dark mb-6">Recent Activity</h3>
      
      {loading ? (
        <div className="text-center py-6">
          <p className="text-text-muted text-xs font-semibold">Loading Activity...</p>
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-text-muted text-xs font-semibold">No recent activities recorded</p>
        </div>
      ) : (
        <div className="relative pl-4 border-l-2 border-border-light space-y-6">
          {activities.slice(0, 6).map((activity, index) => (
            <div key={index} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-4 ring-white">
                <RiCheckLine className="text-[10px] text-white font-bold" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-dark">{activity.title}</p>
                <p className="text-xs font-semibold text-text-muted mt-0.5">{activity.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
