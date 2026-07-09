const CropProgress = () => {
  const crops = [
    { name: 'Rice', progress: 70, color: 'bg-primary' },
    { name: 'Tomato', progress: 45, color: 'bg-red-500' },
    { name: 'Maize', progress: 90, color: 'bg-yellow-500' },
    { name: 'Groundnut', progress: 60, color: 'bg-amber-700' },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light">
      <h3 className="text-lg font-bold text-text-dark mb-6">Crop Progress</h3>
      
      <div className="space-y-6">
        {crops.map((crop) => (
          <div key={crop.name}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-text-dark">{crop.name}</span>
              <span className="text-xs font-bold text-text-dark/60">{crop.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className={`${crop.color} h-2 rounded-full transition-all duration-1000 ease-out`} 
                style={{ width: `${crop.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropProgress;
