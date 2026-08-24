import { useEffect, useState, useMemo } from "react";
import { 
  RiRefreshLine, 
  RiSearchLine, 
  RiFilter3Line, 
  RiCloseLine, 
  RiStore2Line, 
  RiArrowUpLine, 
  RiArrowDownLine, 
  RiArrowRightLine,
  RiTimeLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMapPinLine,
  RiPriceTag3Line,
  RiAlertLine
} from "react-icons/ri";
import { getMandiPrices } from "../../services/api";
import PageHeader from "../../components/PageHeader";

const commodities = [
  "",
  "Wheat",
  "Rice",
  "Onion",
  "Potato",
  "Tomato",
  "Cotton",
  "Soyabean",
  "Maize",
];

const states = [
  "",
  "Maharashtra",
  "Madhya Pradesh",
  "Gujarat",
  "Rajasthan",
  "Punjab",
  "Haryana",
  "Uttar Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Andhra Pradesh",
  "Keralam",
  "Telangana"
];

const MandiPrices = () => {
  const [prices, setPrices] = useState([]);

  // Filter States
  const [commodity, setCommodity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");

  // Pagination & Loading States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadPrices = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMandiPrices({
        commodity,
        state,
        district,
        market,
        limit: 50,
      });

      const records = data?.records || [];
      setPrices(records);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentPage(1); // Reset to first page on search/refresh
    } catch (err) {
      console.error("Mandi price error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load mandi prices. Please check your network connection and try again."
      );

      setPrices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadPrices();
  };

  const handleClearFilters = () => {
    setCommodity("");
    setState("");
    setDistrict("");
    setMarket("");
  };

  const hasActiveFilters = Boolean(commodity || state || district || market);

  // Extract unique suggestions for District and Mandi / Market from current records
  const uniqueDistricts = useMemo(() => {
    const list = prices.map(p => p.district).filter(Boolean);
    return Array.from(new Set(list)).sort();
  }, [prices]);

  const uniqueMarkets = useMemo(() => {
    const list = prices.map(p => p.market).filter(Boolean);
    return Array.from(new Set(list)).sort();
  }, [prices]);

  const formatPrice = (value) => {
    if (!value) return "—";
    const number = Number(value);
    if (Number.isNaN(number)) return value;
    return `₹${number.toLocaleString("en-IN")}`;
  };

  // Calculate price trend based on min, max, and modal price
  const calculateTrend = (price) => {
    const min = Number(price.min_price);
    const max = Number(price.max_price);
    const modal = Number(price.modal_price);

    if (Number.isNaN(min) || Number.isNaN(max) || Number.isNaN(modal)) {
      return null;
    }

    if (min === max) {
      return { label: "Steady", icon: RiArrowRightLine, color: "text-gray-600 bg-gray-100 border-gray-200" };
    }

    const range = max - min;
    if (range > 0) {
      const position = (modal - min) / range;
      if (position > 0.6) {
        return { label: "High", icon: RiArrowUpLine, color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
      } else if (position < 0.4) {
        return { label: "Low", icon: RiArrowDownLine, color: "text-amber-700 bg-amber-50 border-amber-200" };
      }
    }

    return { label: "Moderate", icon: RiArrowRightLine, color: "text-blue-700 bg-blue-50 border-blue-200" };
  };

  // Pagination Math
  const totalPages = Math.ceil(prices.length / itemsPerPage);
  const paginatedPrices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return prices.slice(start, start + itemsPerPage);
  }, [prices, currentPage]);

  const startRecordIndex = prices.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endRecordIndex = Math.min(currentPage * itemsPerPage, prices.length);

  return (
    <div className="space-y-6 font-sans text-text-dark">

      {/* Header with PageHeader and Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Mandi Market Prices"
          description="Real-time agricultural market prices from mandis across India."
        />

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {lastUpdated && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-text-muted bg-white px-3 py-2 rounded-xl border border-border-light shadow-sm">
              <RiTimeLine className="text-primary text-sm" />
              <span>Updated: {lastUpdated}</span>
            </div>
          )}

          <button
            onClick={loadPrices}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all duration-200 disabled:opacity-60 shadow-sm cursor-pointer"
          >
            <RiRefreshLine className={loading ? "animate-spin text-lg" : "text-lg"} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search / Filter Section */}
      <form
        onSubmit={handleSearch}
        className="rounded-2xl border border-border-light bg-white p-5 sm:p-6 shadow-sm transition-all"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RiFilter3Line className="text-primary text-xl" />
            <h2 className="font-extrabold text-base text-text-dark">
              Search Market Prices
            </h2>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            >
              <RiCloseLine className="text-base" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Commodity Dropdown */}
          <div className="relative">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
              Commodity
            </label>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all cursor-pointer ${
                commodity 
                  ? "border-primary bg-primary/5 text-primary font-semibold ring-2 ring-primary/20" 
                  : "border-border-light bg-bg-light text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            >
              <option value="">All Commodities</option>
              {commodities
                .filter(Boolean)
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>

          {/* State Dropdown */}
          <div className="relative">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all cursor-pointer ${
                state 
                  ? "border-primary bg-primary/5 text-primary font-semibold ring-2 ring-primary/20" 
                  : "border-border-light bg-bg-light text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            >
              <option value="">All States</option>
              {states
                .filter(Boolean)
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>

          {/* District Input with Datalist Suggestions */}
          <div className="relative">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
              District
            </label>
            <input
              type="text"
              list="districts-list"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="e.g. Pune, Prakasam..."
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all ${
                district 
                  ? "border-primary bg-primary/5 text-primary font-semibold ring-2 ring-primary/20" 
                  : "border-border-light bg-bg-light text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            <datalist id="districts-list">
              {uniqueDistricts.map(d => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </div>

          {/* Market Input with Datalist Suggestions */}
          <div className="relative">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
              Mandi / Market
            </label>
            <input
              type="text"
              list="markets-list"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              placeholder="e.g. APMC Market..."
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all ${
                market 
                  ? "border-primary bg-primary/5 text-primary font-semibold ring-2 ring-primary/20" 
                  : "border-border-light bg-bg-light text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            <datalist id="markets-list">
              {uniqueMarkets.map(m => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </div>

        </div>

        {/* Action Button & Active Filter Badges */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-light pt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {hasActiveFilters ? (
              <>
                <span className="font-bold text-text-muted">Active Filters:</span>
                {commodity && <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-semibold">Commodity: {commodity}</span>}
                {state && <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-semibold">State: {state}</span>}
                {district && <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-semibold">District: {district}</span>}
                {market && <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-semibold">Market: {market}</span>}
              </>
            ) : (
              <span className="text-text-muted italic">No filters applied (showing all available markets).</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-extrabold text-white hover:bg-primary/90 transition-all duration-200 disabled:opacity-60 shadow-sm cursor-pointer"
          >
            <RiSearchLine className="text-lg" />
            <span>{loading ? "Searching..." : "Search Prices"}</span>
          </button>
        </div>
      </form>

      {/* Error Alert State */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 flex items-start gap-3 shadow-sm">
          <RiAlertLine className="text-xl text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Failed to load market data</p>
            <p className="mt-0.5 text-xs text-red-600">{error}</p>
          </div>
          <button
            onClick={loadPrices}
            className="text-xs font-bold underline hover:text-red-800 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Results Container */}
      <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm">

        {/* Results Header */}
        <div className="border-b border-border-light px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white">
          <div>
            <h2 className="font-bold text-text-dark text-base">
              Latest Mandi Prices
            </h2>
            <p className="mt-0.5 text-xs text-text-muted">
              Showing {startRecordIndex}–{endRecordIndex} of {prices.length} market records
            </p>
          </div>

          {lastUpdated && (
            <span className="sm:hidden text-xs text-text-muted">
              Updated: {lastUpdated}
            </span>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-3"></div>
            <p className="text-sm font-semibold text-text-muted">Fetching latest mandi prices...</p>
          </div>
        ) : prices.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <RiStore2Line className="text-3xl" />
            </div>
            <h3 className="text-base font-bold text-text-dark mb-1">
              No Mandi Prices Found
            </h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto mb-4">
              No market records matched your search criteria. Try selecting different commodities or clear filters.
            </p>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-bg-light border border-border-light rounded-xl text-xs font-bold text-text-dark hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-bg-light/80 border-b border-border-light text-xs font-extrabold uppercase tracking-wider text-text-muted">
                  <th className="px-5 py-3.5">Commodity</th>
                  <th className="px-5 py-3.5">Market</th>
                  <th className="px-5 py-3.5">District</th>
                  <th className="px-5 py-3.5">State</th>
                  <th className="px-5 py-3.5">Variety</th>
                  <th className="px-5 py-3.5 text-right">Min Price</th>
                  <th className="px-5 py-3.5 text-right">Max Price</th>
                  <th className="px-5 py-3.5 text-right">Modal Price</th>
                  <th className="px-5 py-3.5 text-center">Trend</th>
                  <th className="px-5 py-3.5 text-center">Arrival Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-light">
                {paginatedPrices.map((price, index) => {
                  const trend = calculateTrend(price);
                  const TrendIcon = trend?.icon;

                  return (
                    <tr
                      key={`${price.market}-${price.commodity}-${index}`}
                      className="hover:bg-primary/[0.02] transition-colors duration-150"
                    >
                      {/* Commodity */}
                      <td className="px-5 py-4 font-bold text-text-dark max-w-[150px] break-words">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span>{price.commodity || "—"}</span>
                        </div>
                      </td>

                      {/* Market */}
                      <td className="px-5 py-4 font-semibold text-text-dark/90 max-w-[140px] break-words">
                        {price.market || "—"}
                      </td>

                      {/* District */}
                      <td className="px-5 py-4 text-text-muted max-w-[130px] break-words">
                        {price.district || "—"}
                      </td>

                      {/* State */}
                      <td className="px-5 py-4 text-text-muted max-w-[130px] break-words">
                        {price.state || "—"}
                      </td>

                      {/* Variety */}
                      <td className="px-5 py-4 text-text-muted max-w-[120px] break-words">
                        <span className="inline-block px-2 py-0.5 rounded bg-bg-light text-xs font-medium text-text-dark">
                          {price.variety || "—"}
                        </span>
                      </td>

                      {/* Min Price */}
                      <td className="px-5 py-4 text-right font-medium text-text-muted whitespace-nowrap">
                        {price.min_price ? formatPrice(price.min_price) : "—"}
                      </td>

                      {/* Max Price */}
                      <td className="px-5 py-4 text-right font-medium text-text-muted whitespace-nowrap">
                        {price.max_price ? formatPrice(price.max_price) : "—"}
                      </td>

                      {/* Modal Price (Highlighted) */}
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        {price.modal_price ? (
                          <span className="inline-block px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-extrabold text-sm shadow-2xs">
                            {formatPrice(price.modal_price)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>

                      {/* Trend Badge */}
                      <td className="px-5 py-4 text-center whitespace-nowrap">
                        {trend ? (
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${trend.color}`}>
                            <TrendIcon className="text-sm" />
                            <span>{trend.label}</span>
                          </span>
                        ) : (
                          <span className="text-text-muted text-xs">—</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-center whitespace-nowrap text-xs font-semibold text-text-muted">
                        {price.arrival_date || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && prices.length > itemsPerPage && (
          <div className="border-t border-border-light px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bg-light/30">
            <span className="text-xs font-semibold text-text-muted text-center sm:text-left">
              Showing page {currentPage} of {totalPages} ({prices.length} total records)
            </span>

            <div className="flex items-center justify-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center p-2 rounded-xl border border-border-light bg-white text-text-dark hover:bg-bg-light disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                aria-label="Previous page"
              >
                <RiArrowLeftSLine className="text-lg" />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 3 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white border border-border-light text-text-dark hover:bg-bg-light"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center p-2 rounded-xl border border-border-light bg-white text-text-dark hover:bg-bg-light disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                aria-label="Next page"
              >
                <RiArrowRightSLine className="text-lg" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Attribution Footer */}
      <div className="flex items-center justify-between text-xs text-text-muted px-1">
        <p>
          Price data source: Government of India Open Government Data Platform / Agmarknet Mandi Dataset.
        </p>
      </div>

    </div>
  );
};

export default MandiPrices;