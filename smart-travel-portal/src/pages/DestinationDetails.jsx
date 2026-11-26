import { useParams, Link, useNavigate } from "react-router-dom";
import destinations from "../data/destinations.json";
import destinationInfo from "../data/destinationInfo.json";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { getImage, formatPrice } from "../utils/images.js";
import Reviews from "../components/Reviews.jsx";
import DestinationCard from "../components/DestinationCard.jsx";
import NotFound from "./NotFound.jsx";

function buildItinerary(d) {
  const middle = d.highlights.slice(0, Math.max(d.days - 2, 0)).map((h) => "Visit " + h);
  while (middle.length < d.days - 2) middle.push("Free day for local food and shopping");
  return ["Arrive, check in and relax", ...middle, "Breakfast and departure"];
}

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  // Invalid ids: "abc", "0", "-1", "1.5" and ids that do not exist all show the 404 view
  const numericId = /^\d+$/.test(id) ? Number(id) : null;
  const d = destinations.find((x) => x.id === numericId);

  if (!d) {
    return <NotFound message={`We could not find a destination with id "${id}".`} />;
  }

  const info = destinationInfo[d.id];
  const budget = info?.budget;
  const budgetTotal = budget ? Object.values(budget).reduce((sum, n) => sum + n, 0) : 0;
  const related = destinations.filter((x) => x.category === d.category && x.id !== d.id).slice(0, 3);
  const saved = favorites.includes(d.id);

  return (
    <section className="section details">
      <button className="btn ghost" onClick={() => navigate(-1)}>← Back</button>
      <img className="detail-img" src={getImage(d.image)} alt={d.name} />

      <h2>{d.name}</h2>
      <div className="chips">
        <span className="chip">{d.category}</span>
        <span className="chip">{d.region}</span>
        <span className="chip">★ {d.rating}</span>
        <span className="chip">{d.days} days</span>
        <span className="chip">from {formatPrice(d.price)}</span>
      </div>
      <p className="muted">{d.location}</p>

      <h3>About {d.name}</h3>
      <p>{d.description}</p>

      <div className="info-grid">
        <div className="info-box">
          <h3>Best time to visit</h3>
          <p className="big-text">{d.bestTime}</p>
          {info && <p className="muted">{info.travel.climate}</p>}
        </div>

        {budget ? (
          <div className="info-box">
            <h3>Estimated budget (per person)</h3>
            <table>
              <tbody>
                <tr><th>Stay</th><td>{formatPrice(budget.stay)}</td></tr>
                <tr><th>Food</th><td>{formatPrice(budget.food)}</td></tr>
                <tr><th>Local transport</th><td>{formatPrice(budget.transport)}</td></tr>
                <tr><th>Activities</th><td>{formatPrice(budget.activities)}</td></tr>
                <tr><th>Total</th><td className="total">{formatPrice(budgetTotal)}</td></tr>
              </tbody>
            </table>
            <p className="muted">About {formatPrice(Math.round(budgetTotal / d.days))} per day. Flights are not included.</p>
          </div>
        ) : (
          <div className="info-box"><h3>Estimated budget</h3><p className="muted">Budget details are coming soon.</p></div>
        )}
      </div>

      <h3>Top attractions</h3>
      {info?.attractions?.length ? (
        <ul className="attractions">
          {info.attractions.map((a) => <li key={a}>{a}</li>)}
        </ul>
      ) : (
        <ul>{d.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
      )}

      {info?.travel && (
        <>
          <h3>Travel information</h3>
          <div className="table-wrap">
            <table>
              <tbody>
                <tr><th>How to reach</th><td>{info.travel.reach}</td></tr>
                <tr><th>Nearest airport</th><td>{info.travel.airport}</td></tr>
                <tr><th>Climate</th><td>{info.travel.climate}</td></tr>
                <tr><th>Languages</th><td>{info.travel.language}</td></tr>
                <tr><th>Travel tip</th><td>{info.travel.tip}</td></tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      <h3>Sample itinerary</h3>
      <ol>{buildItinerary(d).map((step, i) => <li key={i}><strong>Day {i + 1}:</strong> {step}</li>)}</ol>

      <div className="row">
        <Link className="btn" to={`/contact?destination=${d.id}`}>Send inquiry</Link>
        <Link className="btn ghost" to="/planner">Estimate cost</Link>
        <button className="btn ghost" aria-pressed={saved} onClick={() => toggleFavorite(d.id)}>
          {saved ? "♥ Saved" : "♡ Save"}
        </button>
      </div>

      {related.length > 0 && (
        <>
          <h3>More {d.category.toLowerCase()} destinations</h3>
          <div className="grid">
            {related.map((r) => <DestinationCard key={r.id} destination={r} />)}
          </div>
        </>
      )}

      <Reviews key={d.id} destinationId={d.id} />
    </section>
  );
}