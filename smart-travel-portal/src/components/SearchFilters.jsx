import { formatPrice } from "../utils/images.js";

export default function SearchFilters({ filters, setFilters, categories, regions, maxPrice, onReset }) {
  const set = (key) => (e) => setFilters({ ...filters, [key]: e.target.value });

  return (
    <div className="filters">
      <label>Search
        <input type="search" placeholder="Name or location" value={filters.search} onChange={set("search")} />
      </label>
      <label>Category
        <select value={filters.category} onChange={set("category")}>
          <option value="">All</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label>Region
        <select value={filters.region} onChange={set("region")}>
          <option value="">All</option>
          {regions.map((r) => <option key={r}>{r}</option>)}
        </select>
      </label>
      <label>Sort by
        <select value={filters.sort} onChange={set("sort")}>
          <option value="">Recommended</option>
          <option value="priceLow">Price: low to high</option>
          <option value="priceHigh">Price: high to low</option>
          <option value="rating">Top rated</option>
          <option value="days">Shortest trip</option>
        </select>
      </label>
      <label>Max budget: {formatPrice(Number(filters.budget))}
        <input type="range" min="10000" max={maxPrice} step="5000" value={filters.budget} onChange={set("budget")} />
      </label>
      <button type="button" className="btn ghost" onClick={onReset}>Reset</button>
    </div>
  );
}