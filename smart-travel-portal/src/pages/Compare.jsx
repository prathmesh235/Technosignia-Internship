import { useState } from "react";
import destinations from "../data/destinations.json";
import { formatPrice } from "../utils/images.js";

const rows = [
  ["Location", (d) => d.location], ["Category", (d) => d.category], ["Region", (d) => d.region],
  ["Duration", (d) => `${d.days} days`], ["Price", (d) => formatPrice(d.price)],
  ["Rating", (d) => `★ ${d.rating}`], ["Best time", (d) => d.bestTime],
  ["Highlights", (d) => d.highlights.join(", ")],
];

export default function Compare() {
  const [ids, setIds] = useState(["1", "2", ""]);
  const picked = ids.map((i) => destinations.find((d) => d.id === Number(i))).filter(Boolean);
  const change = (index) => (e) => setIds(ids.map((v, i) => (i === index ? e.target.value : v)));

  return (
    <section className="section">
      <h2>Compare destinations</h2>
      <div className="filters">
        {ids.map((value, i) => (
          <label key={i}>Destination {i + 1}
            <select value={value} onChange={change(i)}>
              <option value="">None</option>
              {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </label>
        ))}
      </div>
      {picked.length < 2 ? <p className="empty">Select at least two destinations to compare.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th></th>{picked.map((d) => <th key={d.id}>{d.name}</th>)}</tr></thead>
            <tbody>
              {rows.map(([label, get]) => (
                <tr key={label}><th>{label}</th>{picked.map((d) => <td key={d.id}>{get(d)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}