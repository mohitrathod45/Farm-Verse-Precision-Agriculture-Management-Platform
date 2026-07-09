const FarmTable = () => {
  const farms = [
    { name: 'Green Valley Farm', location: 'Hyderabad', area: '5 Acres', crop: 'Rice', status: 'Active', statusColor: 'bg-green-100 text-green-700 border-green-200' },
    { name: 'Sunny Farm', location: 'Anantapur', area: '3 Acres', crop: 'Groundnut', status: 'Growing', statusColor: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Organic Field', location: 'Tirupati', area: '7 Acres', crop: 'Tomato', status: 'Harvest Ready', statusColor: 'bg-orange-100 text-orange-700 border-orange-200' },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-dark">Farm Overview</h3>
        <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light">Farm Name</th>
              <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light">Location</th>
              <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light">Area</th>
              <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light">Crop</th>
              <th className="pb-4 pt-2 px-4 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {farms.map((farm, index) => (
              <tr key={index} className="hover:bg-bg-light/60 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-bold text-sm text-text-dark">{farm.name}</span>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-text-muted">{farm.location}</td>
                <td className="py-4 px-4 text-sm font-medium text-text-muted">{farm.area}</td>
                <td className="py-4 px-4 text-sm font-medium text-text-muted">{farm.crop}</td>
                <td className="py-4 px-4 text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${farm.statusColor}`}>
                    {farm.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmTable;
