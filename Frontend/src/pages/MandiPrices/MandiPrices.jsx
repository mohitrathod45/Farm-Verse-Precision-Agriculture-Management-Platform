import { useEffect, useState } from "react";
import { RiRefreshLine, RiSearchLine } from "react-icons/ri";
import { getMandiPrices } from "../../services/api";

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
];

const MandiPrices = () => {
  const [prices, setPrices] = useState([]);

  const [commodity, setCommodity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      setPrices(data?.records || []);
    } catch (err) {
      console.error("Mandi price error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load mandi prices. Please try again."
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

  const formatPrice = (value) => {
    if (!value) return "—";

    const number = Number(value);

    if (Number.isNaN(number)) {
      return value;
    }

    return `₹${number.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">
            Mandi Prices
          </h1>

          <p className="mt-1 text-sm text-text-muted">
            Current agricultural market prices from Indian mandis
          </p>
        </div>

        <button
          onClick={loadPrices}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          <RiRefreshLine className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="rounded-2xl border border-border-light bg-white p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center gap-2">
          <RiSearchLine className="text-primary" />

          <h2 className="font-semibold text-text-dark">
            Search Market Prices
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

          <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="rounded-xl border border-border-light bg-bg-light px-4 py-3 text-sm outline-none focus:border-primary"
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

          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="rounded-xl border border-border-light bg-bg-light px-4 py-3 text-sm outline-none focus:border-primary"
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

          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District"
            className="rounded-xl border border-border-light bg-bg-light px-4 py-3 text-sm outline-none focus:border-primary"
          />

          <input
            type="text"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="Mandi / Market"
            className="rounded-xl border border-border-light bg-bg-light px-4 py-3 text-sm outline-none focus:border-primary"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search Prices"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Results */}
      <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm">

        <div className="border-b border-border-light px-5 py-4">
          <h2 className="font-semibold text-text-dark">
            Latest Mandi Prices
          </h2>

          <p className="mt-1 text-xs text-text-muted">
            Showing {prices.length} market records
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-text-muted">
            Loading mandi prices...
          </div>
        ) : prices.length === 0 ? (
          <div className="p-10 text-center text-sm text-text-muted">
            No mandi prices found for your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">

              <thead className="bg-bg-light">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                  <th className="px-5 py-4">Commodity</th>
                  <th className="px-5 py-4">Market</th>
                  <th className="px-5 py-4">District</th>
                  <th className="px-5 py-4">State</th>
                  <th className="px-5 py-4">Variety</th>
                  <th className="px-5 py-4">Min Price</th>
                  <th className="px-5 py-4">Max Price</th>
                  <th className="px-5 py-4">Modal Price</th>
                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-light">

                {prices.map((price, index) => (
                  <tr
                    key={`${price.market}-${price.commodity}-${index}`}
                    className="hover:bg-bg-light"
                  >
                    <td className="px-5 py-4 font-semibold text-text-dark">
                      {price.commodity || "—"}
                    </td>

                    <td className="px-5 py-4">
                      {price.market || "—"}
                    </td>

                    <td className="px-5 py-4">
                      {price.district || "—"}
                    </td>

                    <td className="px-5 py-4">
                      {price.state || "—"}
                    </td>

                    <td className="px-5 py-4">
                      {price.variety || "—"}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {formatPrice(price.minPrice)}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {formatPrice(price.maxPrice)}
                    </td>

                    <td className="px-5 py-4 font-bold text-primary">
                      {formatPrice(price.modalPrice)}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {price.arrivalDate || "—"}
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-text-muted">
        Price data source: Government of India Open Government Data
        Platform / agricultural market dataset.
      </p>

    </div>
  );
};

export default MandiPrices;