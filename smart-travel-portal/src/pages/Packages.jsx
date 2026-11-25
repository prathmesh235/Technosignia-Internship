import packages from "../data/packages.json";
import PackageCard from "../components/PackageCard.jsx";

export default function Packages() {
  return (
    <section className="section">
      <h2>Tour packages</h2>
      <div className="grid">
        {packages.map((p) => <PackageCard key={p.id} pack={p} />)}
      </div>
    </section>
  );
}