import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { getImage, formatPrice } from "../utils/images.js";

export default function DestinationCard({ destination: d }) {
  const { favorites, toggleFavorite } = useFavorites();
  const saved = favorites.includes(d.id);

  return (
    <article className="card">
      <img className="thumb" src={getImage(d.image)} alt={d.name} loading="lazy" />
      <div className="card-body">
        <h3>{d.name}</h3>
        <p className="muted">{d.location} · ★ {d.rating}</p>
        <p>{d.shortDescription}</p>
        <p className="price">From {formatPrice(d.price)} <span className="muted">/ {d.days} days</span></p>
        <div className="row">
          <Link className="btn solid" to={`/destinations/${d.id}`}>View details</Link>
          <button className="btn ghost" aria-pressed={saved} onClick={() => toggleFavorite(d.id)}>
            {saved ? "♥ Saved" : "♡ Save"}
          </button>
        </div>
      </div>
    </article>
  );
}