import destinations from "./data/destinations.json";
import packages from "./data/packages.json";
import DestinationList from "./components/DestinationList";
import PackageCard from "./components/PackageCard";
import "./App.css";

function App() {
  const handleSelect = (name) => alert(`You selected ${name}`);
  return (
    <main className="page">
      <header className="hero">
        <h1>Find your next trip</h1>
        <p>Pick a destination, then choose a tour package that fits.</p>
      </header>

      <section>
        <h2>Popular destinations</h2>
        <DestinationList destinations={destinations} onSelect={handleSelect} />
      </section>

      <section>
        <h2>Tour packages</h2>
        <div className="grid">
          {packages.map((p) => (
            <PackageCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;