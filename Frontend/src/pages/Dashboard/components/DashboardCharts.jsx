import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// ─── Shared palette ───────────────────────────────────────────────────────────
const COLORS = [
  '#3A7D44', '#52B788', '#74C69D', '#95D5B2',
  '#1A6B8A', '#2196A6', '#48CAE4', '#90E0EF',
  '#F4A261', '#E76F51', '#E9C46A', '#A8DADC',
];

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-40 text-center">
    <p className="text-2xl mb-2">📊</p>
    <p className="text-sm font-bold text-text-dark">No data available</p>
    <p className="text-xs text-text-muted mt-1">Add records to see analytics</p>
  </div>
);

// ─── Shared doughnut options ──────────────────────────────────────────────────
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { size: 11, family: 'Inter, sans-serif', weight: '600' },
        color: '#374151',
        padding: 12,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.parsed}`,
      },
    },
  },
};

// ─── Shared bar options ───────────────────────────────────────────────────────
const barOptions = (horizontal = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: horizontal ? 'y' : 'x',
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.parsed[horizontal ? 'x' : 'y']}`,
      },
    },
  },
  scales: {
    x: {
      grid: { color: '#F3F4F6' },
      ticks: {
        font: { size: 10, family: 'Inter, sans-serif', weight: '600' },
        color: '#6B7280',
      },
    },
    y: {
      grid: { color: '#F3F4F6' },
      ticks: {
        font: { size: 10, family: 'Inter, sans-serif', weight: '600' },
        color: '#6B7280',
      },
      beginAtZero: true,
    },
  },
});

// ══════════════════════════════════════════════════════════════════════════════
// 1. Crop Distribution — Doughnut
// ══════════════════════════════════════════════════════════════════════════════
export const CropDistributionChart = ({ crops }) => {
  if (!crops || crops.length === 0) return <EmptyState />;

  const countMap = {};
  crops.forEach(c => {
    const name = c.cropName || 'Unknown';
    countMap[name] = (countMap[name] || 0) + 1;
  });

  const labels = Object.keys(countMap);
  const data = {
    labels,
    datasets: [{
      data: Object.values(countMap),
      backgroundColor: COLORS.slice(0, labels.length),
      borderColor: '#ffffff',
      borderWidth: 3,
      hoverOffset: 6,
    }],
  };

  return (
    <div style={{ height: '220px' }}>
      <Doughnut data={data} options={doughnutOptions} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. Irrigation Type Distribution — Doughnut
// ══════════════════════════════════════════════════════════════════════════════
export const IrrigationDistributionChart = ({ irrigations }) => {
  if (!irrigations || irrigations.length === 0) return <EmptyState />;

  const countMap = {};
  irrigations.forEach(i => {
    const type = i.irrigationType || 'Unknown';
    countMap[type] = (countMap[type] || 0) + 1;
  });

  const labels = Object.keys(countMap);
  const palette = ['#2196A6', '#48CAE4', '#90E0EF', '#1A6B8A', '#ADE8F4'];
  const data = {
    labels,
    datasets: [{
      data: Object.values(countMap),
      backgroundColor: palette.slice(0, labels.length),
      borderColor: '#ffffff',
      borderWidth: 3,
      hoverOffset: 6,
    }],
  };

  return (
    <div style={{ height: '220px' }}>
      <Doughnut data={data} options={doughnutOptions} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. Fertilizer Usage — Vertical Bar (by quantity)
// ══════════════════════════════════════════════════════════════════════════════
export const FertilizerUsageChart = ({ fertilizers }) => {
  if (!fertilizers || fertilizers.length === 0) return <EmptyState />;

  const qtyMap = {};
  fertilizers.forEach(f => {
    const name = f.fertilizerName || 'Unknown';
    qtyMap[name] = (qtyMap[name] || 0) + parseFloat(f.quantity || 0);
  });

  const labels = Object.keys(qtyMap);
  const values = Object.values(qtyMap);

  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length] + 'CC'),
      borderColor: labels.map((_, i) => COLORS[i % COLORS.length]),
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  const opts = {
    ...barOptions(false),
    plugins: {
      ...barOptions(false).plugins,
      tooltip: {
        callbacks: { label: (ctx) => ` ${ctx.parsed.y} kg` },
      },
    },
    scales: {
      ...barOptions(false).scales,
      y: { ...barOptions(false).scales.y, title: { display: true, text: 'Quantity (kg)', font: { size: 10 }, color: '#6B7280' } },
    },
  };

  return (
    <div style={{ height: '220px' }}>
      <Bar data={data} options={opts} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// 4. Reports by Type — Vertical Bar
// ══════════════════════════════════════════════════════════════════════════════
export const ReportsTypeChart = ({ reports }) => {
  if (!reports || reports.length === 0) return <EmptyState />;

  const countMap = {};
  reports.forEach(r => {
    const type = r.reportType || 'General';
    countMap[type] = (countMap[type] || 0) + 1;
  });

  const labels = Object.keys(countMap);
  const palette = ['#F4A261', '#E76F51', '#E9C46A', '#A8DADC', '#457B9D', '#1D3557'];

  const data = {
    labels,
    datasets: [{
      data: Object.values(countMap),
      backgroundColor: labels.map((_, i) => palette[i % palette.length] + 'CC'),
      borderColor: labels.map((_, i) => palette[i % palette.length]),
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  const opts = {
    ...barOptions(false),
    plugins: {
      ...barOptions(false).plugins,
      tooltip: {
        callbacks: { label: (ctx) => ` ${ctx.parsed.y} report(s)` },
      },
    },
    scales: {
      ...barOptions(false).scales,
      y: { ...barOptions(false).scales.y, ticks: { ...barOptions(false).scales.y.ticks, stepSize: 1 } },
    },
  };

  return (
    <div style={{ height: '220px' }}>
      <Bar data={data} options={opts} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// 5. Farm Area Distribution — Horizontal Bar
// ══════════════════════════════════════════════════════════════════════════════
export const FarmAreaChart = ({ farms }) => {
  if (!farms || farms.length === 0) return <EmptyState />;

  const sorted = [...farms].sort((a, b) => parseFloat(b.area || 0) - parseFloat(a.area || 0));
  const labels = sorted.map(f => f.farmName || `Farm #${f.farmId}`);
  const values = sorted.map(f => parseFloat(f.area || 0));

  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length] + 'CC'),
      borderColor: labels.map((_, i) => COLORS[i % COLORS.length]),
      borderWidth: 2,
      borderRadius: 4,
      borderSkipped: false,
    }],
  };

  const dynamicHeight = Math.max(180, labels.length * 40);

  const opts = {
    ...barOptions(true),
    plugins: {
      ...barOptions(true).plugins,
      tooltip: {
        callbacks: { label: (ctx) => ` ${ctx.parsed.x} Acres` },
      },
    },
    scales: {
      ...barOptions(true).scales,
      x: { ...barOptions(true).scales.x, title: { display: true, text: 'Area (Acres)', font: { size: 10 }, color: '#6B7280' }, beginAtZero: true },
    },
  };

  return (
    <div style={{ height: `${dynamicHeight}px` }}>
      <Bar data={data} options={opts} />
    </div>
  );
};
