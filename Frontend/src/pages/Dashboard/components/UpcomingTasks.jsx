import { RiTimeLine } from 'react-icons/ri';

const UpcomingTasks = () => {
  const tasks = [
    { title: 'Water Tomato Farm', date: 'Today, 05:00 PM', dotColor: 'bg-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { title: 'Apply Organic Fertilizer', date: 'Tomorrow, 08:00 AM', dotColor: 'bg-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
    { title: 'Harvest Rice Field', date: 'In 3 days', dotColor: 'bg-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    { title: 'Inspect Soil Moisture', date: 'In 5 days', dotColor: 'bg-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-dark">Upcoming Tasks</h3>
        <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-lg">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className={`group flex items-start space-x-4 p-4 rounded-2xl border ${task.border} ${task.bg} hover:shadow-sm transition-all cursor-pointer`}>
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${task.dotColor}`}></div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-text-dark group-hover:text-primary transition-colors">{task.title}</h4>
              <div className="flex items-center text-xs font-semibold text-text-muted mt-1.5">
                <RiTimeLine className="mr-1" />
                <span>{task.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;
