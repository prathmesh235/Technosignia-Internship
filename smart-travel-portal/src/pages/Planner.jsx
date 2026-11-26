import { useState } from "react";
import { Link } from "react-router-dom";
import destinations from "../data/destinations.json";
import { formatPrice } from "../utils/images.js";

const HOTELS = { budget: ["Budget stay", 0.85], standard: ["Standard stay", 1], luxury: ["Luxury stay", 1.6] };
const INSURANCE = 1200;
const GST = 0.05;

export default function Planner() {
  const [destId, setDestId] = useState(destinations[0].id);
  const [travelers, setTravelers] = useState(2);
  const [hotel, setHotel] = useState("standard");
  const [insurance, setInsurance] = useState(true);

  const d = destinations.find((x) => x.id === Number(destId));
  const count = Math.min(20, Math.max(1, Number(travelers) || 1));
  const base = Math.round(d.price * HOTELS[hotel][1] * count);
  const tax = Math.round(base * GST);
  const cover = insurance ? INSURANCE * count : 0;
  const total = base + tax + cover;

  return (
    <section className="section narrow">
      <h2>Trip cost planner</h2>
      <p className="muted">Prices are per-person package rates for {d.days} days.</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Destination
          <select value={destId} onChange={(e) => setDestId(e.target.value)}>
            {destinations.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </label>
        <div className="two">
          <label>Travelers<input type="number" min="1" max="20" value={travelers} onChange={(e) => setTravelers(e.target.value)} /></label>
          <label>Hotel type
            <select value={hotel} onChange={(e) => setHotel(e.target.value)}>
              {Object.entries(HOTELS).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
            </select>
          </label>
        </div>
        <label className="row"><input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} /> Add travel insurance ({formatPrice(INSURANCE)} per person)</label>
      </form>
      <div className="table-wrap">
        <table>
          <tbody>
            <tr><th>Package ({count} x {HOTELS[hotel][0]})</th><td>{formatPrice(base)}</td></tr>
            <tr><th>GST (5%)</th><td>{formatPrice(tax)}</td></tr>
            <tr><th>Insurance</th><td>{insurance ? formatPrice(cover) : "Not added"}</td></tr>
            <tr><th>Total</th><td className="total">{formatPrice(total)}</td></tr>
            <tr><th>Per person</th><td>{formatPrice(Math.round(total / count))}</td></tr>
          </tbody>
        </table>
      </div>
      <p><Link className="btn" to={`/contact?destination=${d.id}`}>Send inquiry for this trip</Link></p>
    </section>
  );
}