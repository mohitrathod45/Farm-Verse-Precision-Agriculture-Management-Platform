import { RiInformationLine } from 'react-icons/ri';

const FarmSummary = ({ farms = [], crops = [], loading = false }) => {
  const totalFarms = farms.length;
  const totalArea = farms.reduce((sum, f) => sum + (parseFloat(f.area) || 0), 0).toFixed(1);
  const mainFarmName = farms.length > 0 ? farms[0].farmName : 'No Farm Registered';
  const soilType = farms.length > 0 && farms[0].soilType ? farms[0].soilType : 'Loamy Soil';
  const activeCropsCount = crops.length;

  const summaryDetails = [
    { label: 'Primary Farm', value: mainFarmName },
    { label: 'Total Farm Area', value: `${totalArea} Acres` },
    { label: 'Registered Farms', value: `${totalFarms} Properties` },
    { label: 'Primary Soil Type', value: soilType },
    { label: 'Total Active Crops', value: `${activeCropsCount} Crops`, highlight: true },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border-light overflow-hidden relative">
      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-[2rem]"></div>
      <div className="ml-3">
        <div className="flex items-center space-x-2 mb-6">
          <RiInformationLine className="text-xl text-primary" />
          <h3 className="text-lg font-bold text-text-dark">Farm Summary</h3>
        </div>
        
        {loading ? (
          <div className="text-center py-6">
            <p className="text-text-muted text-xs font-semibold">Loading Summary...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {summaryDetails.map((detail, index) => (
              <div key={index} className="flex justify-between items-center border-b border-border-light pb-3 last:border-0 last:pb-0">
                <span className="text-sm font-semibold text-text-muted">{detail.label}</span>
                <span className={`text-sm font-bold truncate max-w-[160px] text-right ${detail.highlight ? 'text-primary' : 'text-text-dark'}`}>
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmSummary;
