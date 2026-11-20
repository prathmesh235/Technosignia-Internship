import { NavLink } from 'react-router-dom';
import '../styles/header.css';

const links = [
  ['/', 'Home'],
  ['/destinations', 'Destinations'],
  ['/packages', 'Packages'],
  ['/favorites', 'Favorites'],
  ['/inquiry', 'Inquiry'],
];

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="logo">TravelPortal</NavLink>
        <nav className="nav">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
