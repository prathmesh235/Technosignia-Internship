import { Link } from "react-router-dom";
import destinations from "../data/destinations.json";
import packages from "../data/packages.json";
import DestinationList from "../components/DestinationList.jsx";
import PackageCard from "../components/PackageCard.jsx";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Find your next trip and send an inquiry in minutes.</h1>
        <p>Browse destinations, compare tour packages and save the places you like.</p>
        <Link className="btn" to="/destinations">Explore destinations</Link>
      </section>
      <section className="section">
        <h2>Popular destinations</h2>
        <DestinationList destinations={destinations.slice(0, 3)} />
      </section>
      <section className="section alt">
        <h2>Tour packages</h2>
        <div className="grid">
          {packages.map((p) => <PackageCard key={p.id} pack={p} />)}
        </div>
      </section>
    </>
  );
}