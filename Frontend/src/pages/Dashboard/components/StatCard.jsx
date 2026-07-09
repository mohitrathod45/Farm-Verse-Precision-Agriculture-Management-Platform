const StatCard = ({ title, value, subtitle, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-border-light hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-center justify-between group">
      <div>
        <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold text-text-dark">{value}</h3>
        {subtitle && <p className="text-xs font-semibold text-text-muted mt-1">{subtitle}</p>}
      </div>
      <div className={`w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
        <Icon className="text-[2rem]" />
      </div>
    </div>
  );
};

export default StatCard;
