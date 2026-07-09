import { RiInformationLine } from 'react-icons/ri';

const FarmSummary = () => {
  const summaryDetails = [
    { label: 'Farm Name', value: 'Green Valley Farm' },
    { label: 'Total Area', value: '15 Acres' },
    { label: 'Primary Crop', value: 'Rice' },
    { label: 'Soil Type', value: 'Black Soil' },
    { label: 'Next Harvest', value: '20 August 2026', highlight: true },
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
        
        <div className="space-y-4">
          {summaryDetails.map((detail, index) => (
            <div key={index} className="flex justify-between items-center border-b border-border-light pb-3 last:border-0 last:pb-0">
              <span className="text-sm font-semibold text-text-muted">{detail.label}</span>
              <span className={`text-sm font-bold ${detail.highlight ? 'text-primary' : 'text-text-dark'}`}>
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmSummary;
