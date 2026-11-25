import { Link } from "react-router-dom";
import destinations from "../data/destinations.json";
import { useFavorites } from "../context/FavoritesContext.jsx";
import DestinationList from "../components/DestinationList.jsx";

export default function Favorites() {
  const { favorites } = useFavorites();
  const saved = destinations.filter((d) => favorites.includes(d.id));

  return (
    <section className="section">
      <h2>Your favorites</h2>
      {saved.length === 0 ? (
        <p className="empty">You have not saved any places yet. <Link to="/destinations">Browse destinations</Link> and tap Save.</p>
      ) : (
        <DestinationList destinations={saved} />
      )}
    </section>
  );
}