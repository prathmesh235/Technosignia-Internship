import { useMemo, useState } from "react";
import destinations from "../data/destinations.json";
import DestinationList from "../components/DestinationList.jsx";
import SearchFilters from "../components/SearchFilters.jsx";

const categories = [...new Set(destinations.map((d) => d.category))];
const regions = [...new Set(destinations.map((d) => d.region))];
const maxPrice = Math.ceil(Math.max(...destinations.map((d) => d.price)) / 5000) * 5000;
const initial = { search: "", category: "", region: "", budget: maxPrice, sort: "" };

const sorters = {
  priceLow: (a, b) => a.price - b.price,
  priceHigh: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  days: (a, b) => a.days - b.days,
};

export default function Destinations() {
  const [filters, setFilters] = useState(initial);

  const results = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const list = destinations.filter(
      (d) =>
        (!q || d.name.toLowerCase().includes(q) || d.location.toLowerCase().includes(q)) &&
        (!filters.category || d.category === filters.category) &&
        (!filters.region || d.region === filters.region) &&
        d.price <= Number(filters.budget)
    );
    return sorters[filters.sort] ? [...list].sort(sorters[filters.sort]) : list;
  }, [filters]);

  return (
    <section className="section">
      <h2>Destinations</h2>
      <SearchFilters filters={filters} setFilters={setFilters} categories={categories}
        regions={regions} maxPrice={maxPrice} onReset={() => setFilters(initial)} />
      <p className="muted">{results.length} of {destinations.length} destinations shown</p>
      <DestinationList destinations={results}
        emptyMessage="No destinations match your search. Try a different name, or reset the filters." />
    </section>
  );
}