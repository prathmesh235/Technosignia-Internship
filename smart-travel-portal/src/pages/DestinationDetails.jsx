import { useParams, Link, useNavigate } from "react-router-dom";
import destinations from "../data/destinations.json";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { getImage, formatPrice } from "../utils/images.js";
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
  const d = destinations.find((x) => x.id === Number(id));

  if (!d) return <NotFound message={`No destination with id "${id}" exists.`} />;

  return (
    <section className="section details">
      <button className="btn ghost" onClick={() => navigate(-1)}>← Back</button>
      <img className="detail-img" src={getImage(d.image)} alt={d.name} />
      <h2>{d.name}</h2>
      <p className="muted">{d.location} · {d.category} · ★ {d.rating} · {d.days} days · from {formatPrice(d.price)}</p>
      <p>{d.description}</p>
      <p><strong>Best time to visit:</strong> {d.bestTime}</p>
      <h3>Highlights</h3>
      <ul>{d.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
      <h3>Sample itinerary</h3>
      <ol>{buildItinerary(d).map((step, i) => <li key={i}><strong>Day {i + 1}:</strong> {step}</li>)}</ol>
      <div className="row">
        <Link className="btn" to={`/contact?destination=${d.id}`}>Send inquiry</Link>
        <button className="btn ghost" onClick={() => toggleFavorite(d.id)}>
          {favorites.includes(d.id) ? "♥ Saved" : "♡ Save"}
        </button>
      </div>
    </section>
  );
}