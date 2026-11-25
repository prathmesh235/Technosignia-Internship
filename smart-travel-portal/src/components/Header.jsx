import { NavLink, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

const links = [
  ["/", "Home"], ["/destinations", "Destinations"], ["/packages", "Packages"],
  ["/favorites", "Favorites"], ["/about", "About"], ["/contact", "Contact"],
];

export default function Header() {
  const { favorites } = useFavorites();
  return (
    <header className="nav">
      <Link to="/" className="logo">Wanderly</Link>
      <nav aria-label="Main">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => (isActive ? "active" : "")}>
            {label}
            {label === "Favorites" && favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}