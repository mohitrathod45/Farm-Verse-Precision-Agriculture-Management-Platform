import { RiCheckLine } from 'react-icons/ri';

const RecentActivity = () => {
  const activities = [
    { text: 'Wheat crop added', time: '2 hours ago' },
    { text: 'Irrigation scheduled', time: 'Yesterday' },
    { text: 'Fertilizer applied', time: '3 days ago' },
    { text: 'Harvest updated', time: '1 week ago' },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light">
      <h3 className="text-lg font-bold text-text-dark mb-6">Recent Activity</h3>
      
      <div className="relative pl-4 border-l-2 border-border-light space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-4 ring-white">
              <RiCheckLine className="text-[10px] text-white font-bold" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-dark">{activity.text}</p>
              <p className="text-xs font-semibold text-text-muted mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
