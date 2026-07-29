import { RiTimeLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const dotColors = ['bg-blue-500', 'bg-orange-500', 'bg-green-600', 'bg-purple-500', 'bg-sky-500'];
const cardBgs = ['bg-blue-50/60 border-blue-200', 'bg-orange-50/60 border-orange-200', 'bg-green-50/60 border-green-200', 'bg-purple-50/60 border-purple-200', 'bg-sky-50/60 border-sky-200'];

const UpcomingTasks = ({ tasks = [], loading = false }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-dark">Upcoming Tasks</h3>
        <button 
          onClick={() => navigate('/crops')}
          className="text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-lg cursor-pointer"
        >
          View All
        </button>
      </div>

      {loading ? (
        <div className="text-center py-6">
          <p className="text-text-muted text-xs font-semibold">Loading Tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-text-muted text-xs font-semibold">No upcoming tasks scheduled</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task, index) => {
            const colorIdx = index % dotColors.length;
            return (
              <div key={index} className={`group flex items-start space-x-3 p-3.5 rounded-2xl border ${cardBgs[colorIdx]} hover:shadow-sm transition-all`}>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${dotColors[colorIdx]}`}></div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-text-dark truncate">{task.title}</h4>
                  <div className="flex items-center text-xs font-semibold text-text-muted mt-1">
                    <RiTimeLine className="mr-1 shrink-0" />
                    <span className="truncate">{task.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingTasks;
