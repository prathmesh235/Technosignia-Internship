import { Link } from 'react-router-dom';
import '../styles/home.css';

const featured = [
  { id: 1, name: 'Bali, Indonesia', tag: 'Beaches' },
  { id: 2, name: 'Kyoto, Japan', tag: 'Culture' },
  { id: 3, name: 'Swiss Alps', tag: 'Adventure' },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Discover Your Next Adventure</h1>
        <p>Explore destinations, browse tour packages and plan your trip.</p>
        <Link to="/destinations" className="btn">Explore Destinations</Link>
      </section>

      <section className="section">
        <h2>Featured Destinations</h2>
        <div className="grid">
          {featured.map((d) => (
            <div key={d.id} className="card">
              <h3>{d.name}</h3>
              <span>{d.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ready to travel?</h2>
        <Link to="/inquiry" className="btn">Send an Inquiry</Link>
      </section>
    </>
  );
}
