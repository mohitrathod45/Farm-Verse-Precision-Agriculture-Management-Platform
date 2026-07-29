import {
  CropDistributionChart,
  IrrigationDistributionChart,
  FertilizerUsageChart,
  ReportsTypeChart,
  FarmAreaChart,
} from './DashboardCharts';

// ─── Skeleton loader for a single chart card ─────────────────────────────────
const ChartSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded-full w-40 mb-5" />
    <div className="h-52 bg-gray-100 rounded-xl" />
  </div>
);

// ─── Reusable chart card ──────────────────────────────────────────────────────
const ChartCard = ({ title, subtitle, children, loading }) => (
  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
    <div className="mb-4">
      <h3 className="text-base font-bold text-text-dark">{title}</h3>
      {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
    </div>
    {loading ? <ChartSkeleton /> : children}
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// ChartsSection — renders all 5 analytics charts
// ══════════════════════════════════════════════════════════════════════════════
const ChartsSection = ({ farms, crops, irrigations, fertilizers, reports, loading }) => {
  return (
    <div className="space-y-6 mb-8">
      {/* Section header */}
      <div className="flex items-center space-x-3">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h2 className="text-lg font-extrabold text-text-dark">Analytics Overview</h2>
      </div>

      {/* Row 1 — Crop Distribution + Irrigation Types (2 doughnuts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Crop Distribution"
          subtitle="Breakdown of crops by name"
          loading={loading}
        >
          <CropDistributionChart crops={crops} />
        </ChartCard>

        <ChartCard
          title="Irrigation Type Distribution"
          subtitle="Sessions by irrigation method"
          loading={loading}
        >
          <IrrigationDistributionChart irrigations={irrigations} />
        </ChartCard>
      </div>

      {/* Row 2 — Fertilizer Usage + Reports (2 bar charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Fertilizer Usage"
          subtitle="Total quantity applied per product (kg)"
          loading={loading}
        >
          <FertilizerUsageChart fertilizers={fertilizers} />
        </ChartCard>

        <ChartCard
          title="Reports by Type"
          subtitle="Count of reports per category"
          loading={loading}
        >
          <ReportsTypeChart reports={reports} />
        </ChartCard>
      </div>

      {/* Row 3 — Farm Area (full width horizontal bar) */}
      <ChartCard
        title="Farm Area Distribution"
        subtitle="Registered farm sizes in acres"
        loading={loading}
      >
        <FarmAreaChart farms={farms} />
      </ChartCard>
    </div>
  );
};

export default ChartsSection;
