import { RiFileDownloadLine, RiFileExcel2Line, RiBarChart2Line, RiPlantLine, RiDropLine, RiLeafLine } from 'react-icons/ri';

const summaryStats = [
  { title: 'Total Yield', value: '4,200 kg', change: '+12%', color: 'text-primary', icon: RiLeafLine },
  { title: 'Water Usage', value: '8,450 L', change: '-5%', color: 'text-sky', icon: RiDropLine },
  { title: 'Farm Efficiency', value: '87%', change: '+3%', color: 'text-accent', icon: RiBarChart2Line },
  { title: 'Active Crops', value: '12', change: '+2', color: 'text-secondary', icon: RiPlantLine },
];

const monthlyYield = [
  { month: 'Jan', value: 320 },
  { month: 'Feb', value: 280 },
  { month: 'Mar', value: 420 },
  { month: 'Apr', value: 380 },
  { month: 'May', value: 510 },
  { month: 'Jun', value: 460 },
  { month: 'Jul', value: 600 },
];
const maxYield = Math.max(...monthlyYield.map(m => m.value));

const cropDistribution = [
  { name: 'Rice', pct: 35, color: 'bg-primary' },
  { name: 'Tomato', pct: 20, color: 'bg-red-400' },
  { name: 'Groundnut', pct: 18, color: 'bg-amber-500' },
  { name: 'Maize', pct: 15, color: 'bg-yellow-400' },
  { name: 'Cotton', pct: 12, color: 'bg-sky' },
];

const farmReports = [
  { farm: 'Green Valley Farm', crops: 4, yield: '1,800 kg', water: '3,200 L', efficiency: '92%' },
  { farm: 'Sunny Farm', crops: 2, yield: '850 kg', water: '1,400 L', efficiency: '85%' },
  { farm: 'Organic Field', crops: 3, yield: '1,100 kg', water: '2,100 L', efficiency: '88%' },
  { farm: 'Riverside Farm', crops: 2, yield: '450 kg', water: '1,200 L', efficiency: '78%' },
  { farm: 'Hilltop Acres', crops: 1, yield: '200 kg', water: '550 L', efficiency: '82%' },
];

const Reports = () => {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark">Reports</h1>
          <p className="text-sm text-text-muted mt-1">View farm analytics, yield summaries, and resource usage reports.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all">
            <RiFileDownloadLine className="text-red-500" />
            <span>Export PDF</span>
          </button>
          <button className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all">
            <RiFileExcel2Line className="text-green-600" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryStats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-border-light">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{s.title}</p>
                <Icon className={`text-xl ${s.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-text-dark">{s.value}</p>
              <p className={`text-xs font-bold mt-1 ${s.change.startsWith('+') ? 'text-primary' : 'text-sky'}`}>{s.change} from last month</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="xl:col-span-8 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
          <h3 className="text-lg font-bold text-text-dark mb-6">Monthly Yield (kg)</h3>
          <div className="flex items-end justify-between space-x-2 h-48">
            {monthlyYield.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <span className="text-[10px] font-bold text-text-muted mb-1">{m.value}</span>
                <div className="w-full max-w-[40px] rounded-t-lg bg-primary/80 hover:bg-primary transition-colors" style={{ height: `${(m.value / maxYield) * 160}px` }} />
                <span className="text-xs font-bold text-text-muted mt-2">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart (CSS) */}
        <div className="xl:col-span-4 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
          <h3 className="text-lg font-bold text-text-dark mb-6">Crop Distribution</h3>
          {/* Stacked bar as simplified pie */}
          <div className="w-full h-4 rounded-full overflow-hidden flex mb-6">
            {cropDistribution.map((c, i) => (
              <div key={i} className={`${c.color} h-full`} style={{ width: `${c.pct}%` }} title={c.name} />
            ))}
          </div>
          <div className="space-y-3">
            {cropDistribution.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${c.color}`} />
                  <span className="text-sm font-semibold text-text-dark">{c.name}</span>
                </div>
                <span className="text-sm font-bold text-text-muted">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farm-wise Report Table */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
        <h3 className="text-lg font-bold text-text-dark mb-5">Farm-wise Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light">
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Farm</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Crops</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Yield</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4">Water</th>
                <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-4 text-right">Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {farmReports.map((f, i) => (
                <tr key={i} className="hover:bg-bg-light/60 transition-colors">
                  <td className="py-3.5 px-4 text-sm font-bold text-text-dark">{f.farm}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{f.crops}</td>
                  <td className="py-3.5 px-4 text-sm font-semibold text-primary">{f.yield}</td>
                  <td className="py-3.5 px-4 text-sm text-text-muted">{f.water}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-sm font-bold text-text-dark">{f.efficiency}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reports;
