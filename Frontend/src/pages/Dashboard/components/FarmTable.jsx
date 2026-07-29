import { useNavigate } from 'react-router-dom';

const FarmTable = ({ farms = [], loading = false }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-dark">Farm Overview</h3>
        <button 
          onClick={() => navigate('/farms')}
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-text-muted text-sm font-semibold">Loading Farms...</p>
        </div>
      ) : farms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-muted text-sm font-semibold">No Farms Registered Yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light">Farm Name</th>
                <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light">Location</th>
                <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light">Area</th>
                <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light">Soil Type</th>
                <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {farms.slice(0, 5).map((farm) => (
                <tr key={farm.farmId} className="hover:bg-bg-light/60 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-bold text-sm text-text-dark">{farm.farmName}</span>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-text-muted">{farm.location || '—'}</td>
                  <td className="py-4 px-4 text-sm font-medium text-text-muted">{farm.area} Acres</td>
                  <td className="py-4 px-4 text-sm font-medium text-text-muted">{farm.soilType || 'Loamy Soil'}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FarmTable;
