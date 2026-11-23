import { useState } from "react";

const DESTINATIONS = [
  { id: 1, name: "Jaipur", location: "Rajasthan, India", region: "Asia", category: "Heritage", price: 18000 },
  { id: 2, name: "Goa Beaches", location: "Goa, India", region: "Asia", category: "Beach", price: 22000 },
  { id: 3, name: "Manali", location: "Himachal Pradesh, India", region: "Asia", category: "Adventure", price: 25000 },
  { id: 4, name: "Bali", location: "Indonesia", region: "Asia", category: "Beach", price: 55000 },
  { id: 5, name: "Paris", location: "France", region: "Europe", category: "City", price: 120000 },
  { id: 6, name: "Santorini", location: "Greece", region: "Europe", category: "Beach", price: 95000 },
  { id: 7, name: "Swiss Alps", location: "Switzerland", region: "Europe", category: "Adventure", price: 150000 },
  { id: 8, name: "Rome", location: "Italy", region: "Europe", category: "Heritage", price: 100000 },
  { id: 9, name: "New York", location: "USA", region: "North America", category: "City", price: 160000 },
  { id: 10, name: "Banff", location: "Canada", region: "North America", category: "Adventure", price: 140000 },
];

const REGIONS = ["All", ...new Set(DESTINATIONS.map((d) => d.region))];
const CATEGORIES = ["All", ...new Set(DESTINATIONS.map((d) => d.category))];
const MAX_BUDGET = 200000;

const inr = (n) => "₹" + n.toLocaleString("en-IN");

export default function DestinationExplorer() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState(MAX_BUDGET);

  const query = search.trim().toLowerCase();
  const results = DESTINATIONS.filter((d) => {
    const matchesSearch =
      query === "" ||
      d.name.toLowerCase().includes(query) ||
      d.location.toLowerCase().includes(query);
    const matchesRegion = region === "All" || d.region === region;
    const matchesCategory = category === "All" || d.category === category;
    const matchesBudget = d.price <= budget;
    return matchesSearch && matchesRegion && matchesCategory && matchesBudget;
  });

  const hasActiveFilters =
    search !== "" || region !== "All" || category !== "All" || budget !== MAX_BUDGET;

  const resetAll = () => {
    setSearch("");
    setRegion("All");
    setCategory("All");
    setBudget(MAX_BUDGET);
  };

  return (
    <div className="app">
      <h1 className="title">Find your destination</h1>
      <p className="subtitle">Search by name or location, then narrow down by region, category and budget.</p>

      <div className="filters">
        <label className="field">
          Search
          <input
            type="text"
            value={search}
            placeholder="e.g. Goa, France, Alps"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <label className="field">
          Region
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="field field-budget">
          Max budget: {inr(budget)}
          <input
            type="range"
            min={10000}
            max={MAX_BUDGET}
            step={5000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="result-bar">
        <span>
          {results.length} of {DESTINATIONS.length} destinations
        </span>
        {hasActiveFilters && (
          <button className="btn" onClick={resetAll}>
            Clear all filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <p className="empty-title">No destinations match your search.</p>
          <p className="empty-text">Try a different keyword, raise your budget, or clear a filter.</p>
          <button className="btn" onClick={resetAll}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid">
          {results.map((d) => (
            <article className="card" key={d.id}>
              <h3 className="card-name">{d.name}</h3>
              <p className="card-location">{d.location}</p>
              <div className="badges">
                <span className="badge">{d.category}</span>
                <span className="badge badge-region">{d.region}</span>
              </div>
              <p className="card-price">{inr(d.price)}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}