import { RiAddLine, RiFlaskLine, RiCalendarLine, RiCheckLine, RiTimeLine } from 'react-icons/ri';

const stats = [
  { title: 'Total Applied', value: '34', color: 'text-primary', desc: 'This season' },
  { title: 'Upcoming', value: '3', color: 'text-accent', desc: 'Next 7 days' },
  { title: 'Products Used', value: '6', color: 'text-sky', desc: 'Different types' },
];

const records = [
  { id: 1, name: 'Urea', farm: 'Green Valley Farm', crop: 'Rice', applied: '5 Jul 2026', qty: '25 kg', next: '20 Jul 2026', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
  { id: 2, name: 'DAP', farm: 'Organic Field', crop: 'Tomato', applied: '1 Jul 2026', qty: '15 kg', next: '15 Jul 2026', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
  { id: 3, name: 'Potash', farm: 'Sunny Farm', crop: 'Groundnut', applied: '28 Jun 2026', qty: '20 kg', next: '12 Jul 2026', status: 'Upcoming', statusColor: 'bg-yellow-100 text-yellow-700' },
  { id: 4, name: 'Organic Compost', farm: 'Hilltop Acres', crop: 'Cotton', applied: '25 Jun 2026', qty: '50 kg', next: '25 Jul 2026', status: 'Upcoming', statusColor: 'bg-yellow-100 text-yellow-700' },
  { id: 5, name: 'Neem Cake', farm: 'Riverside Farm', crop: 'Maize', applied: '20 Jun 2026', qty: '30 kg', next: '20 Jul 2026', status: 'Upcoming', statusColor: 'bg-yellow-100 text-yellow-700' },
  { id: 6, name: 'Zinc Sulphate', farm: 'Green Valley Farm', crop: 'Rice', applied: '15 Jun 2026', qty: '10 kg', next: '15 Aug 2026', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
];

const timeline = [
  { title: 'Urea applied to Rice', farm: 'Green Valley Farm', date: '5 Jul 2026', icon: RiCheckLine, color: 'bg-primary' },
  { title: 'DAP applied to Tomato', farm: 'Organic Field', date: '1 Jul 2026', icon: RiCheckLine, color: 'bg-primary' },
  { title: 'Potash scheduled', farm: 'Sunny Farm', date: '12 Jul 2026', icon: RiTimeLine, color: 'bg-accent' },
  { title: 'Organic Compost scheduled', farm: 'Hilltop Acres', date: '25 Jul 2026', icon: RiTimeLine, color: 'bg-accent' },
];

const Fertilizer = () => {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark">Fertilizer</h1>
          <p className="text-sm text-text-muted mt-1">Track fertilizer applications and upcoming schedules.</p>
        </div>
        <button className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-primary/90 transition-all">
          <RiAddLine className="text-lg" />
          <span>Add Fertilizer</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-border-light">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">{s.title}</p>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-text-muted mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Two-column */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        {/* Table */}
        <div className="xl:col-span-8 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
          <h3 className="text-lg font-bold text-text-dark mb-5">Fertilizer Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Fertilizer</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Farm</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Applied</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Qty</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3">Next</th>
                  <th className="pb-3 text-xs font-bold text-text-muted uppercase tracking-wider px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {records.map(r => (
                  <tr key={r.id} className="hover:bg-bg-light/60 transition-colors">
                    <td className="py-3 px-3">
                      <p className="text-sm font-bold text-text-dark">{r.name}</p>
                      <p className="text-xs text-text-muted">{r.crop}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-text-muted">{r.farm}</td>
                    <td className="py-3 px-3 text-sm text-text-muted">{r.applied}</td>
                    <td className="py-3 px-3 text-sm font-semibold text-text-dark">{r.qty}</td>
                    <td className="py-3 px-3 text-sm text-text-muted">{r.next}</td>
                    <td className="py-3 px-3 text-right"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.statusColor}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline */}
        <div className="xl:col-span-4 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
          <h3 className="text-lg font-bold text-text-dark mb-5">Application History</h3>
          <div className="relative pl-5 border-l-2 border-border-light space-y-6">
            {timeline.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={i} className="relative">
                  <div className={`absolute -left-[27px] top-0.5 w-5 h-5 rounded-full ${t.color} flex items-center justify-center ring-4 ring-white`}>
                    <Icon className="text-[10px] text-white" />
                  </div>
                  <p className="text-sm font-bold text-text-dark">{t.title}</p>
                  <p className="text-xs text-text-muted">{t.farm}</p>
                  <p className="text-xs font-semibold text-text-muted mt-1">{t.date}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Fertilizer;
