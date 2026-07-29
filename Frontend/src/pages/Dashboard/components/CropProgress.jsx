const statusColorMap = {
  Growing:       'bg-green-500',
  Flowering:     'bg-yellow-500',
  'Harvest Ready': 'bg-orange-500',
  Seedling:      'bg-blue-500',
  Harvested:     'bg-gray-400',
};

const CropProgress = ({ crops = [], loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light">
        <h3 className="text-lg font-bold text-text-dark mb-6">Crop Progress</h3>
        <p className="text-text-muted text-xs font-semibold text-center py-4">Loading Crop Progress...</p>
      </div>
    );
  }

  if (crops.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light">
        <h3 className="text-lg font-bold text-text-dark mb-6">Crop Progress</h3>
        <p className="text-text-muted text-xs font-semibold text-center py-4">No registered crops to display progress</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light">
      <h3 className="text-lg font-bold text-text-dark mb-6">Crop Progress</h3>
      
      <div className="space-y-6">
        {crops.slice(0, 5).map((crop) => {
          const status = crop.status || 'Growing';
          const progress = status === 'Harvested' ? 100 : status === 'Harvest Ready' ? 90 : status === 'Flowering' ? 60 : status === 'Growing' ? 45 : 20;
          const barColor = statusColorMap[status] || 'bg-primary';

          return (
            <div key={crop.cropId}>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="text-sm font-bold text-text-dark">{crop.cropName}</span>
                  <span className="text-xs text-text-muted ml-2">({crop.season || 'Kharif'})</span>
                </div>
                <span className="text-xs font-bold text-text-dark/80">{status} · {progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className={`${barColor} h-2 rounded-full transition-all duration-700 ease-out`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CropProgress;
