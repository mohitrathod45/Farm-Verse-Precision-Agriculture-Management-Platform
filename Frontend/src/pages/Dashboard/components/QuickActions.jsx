import { RiAddLine, RiPlantLine, RiDropLine, RiFlaskLine, RiBarChart2Line } from 'react-icons/ri';

const QuickActions = () => {
  const actions = [
    { name: 'Add Farm', icon: RiAddLine, color: 'text-primary' },
    { name: 'Add Crop', icon: RiPlantLine, color: 'text-secondary' },
    { name: 'Schedule Irrigation', icon: RiDropLine, color: 'text-blue-500' },
    { name: 'Add Fertilizer', icon: RiFlaskLine, color: 'text-accent' },
    { name: 'View Reports', icon: RiBarChart2Line, color: 'text-orange-500' },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 mt-6">
      <h3 className="text-lg font-bold text-text-dark mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.name}
              className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-50 hover:border-border-light hover:shadow-md transition-all duration-300 group focus:outline-none bg-white"
            >
              <div className={`w-12 h-12 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:-translate-y-1 ${action.color}`}>
                <Icon className="text-3xl" />
              </div>
              <span className="text-xs font-bold text-text-muted group-hover:text-primary transition-colors text-center">
                {action.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
