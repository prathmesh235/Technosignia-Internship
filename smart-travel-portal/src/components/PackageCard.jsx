import { Link } from "react-router-dom";
import { formatPrice } from "../utils/images.js";

export default function PackageCard({ pack }) {
  return (
    <article className="card card-body">
      <h3>{pack.name}</h3>
      <p className="muted">{pack.tagline}</p>
      <p className="price">{formatPrice(pack.price)} <span className="muted">/ {pack.days} days</span></p>
      <ul>{pack.includes.map((item) => <li key={item}>{item}</li>)}</ul>
      <Link className="btn solid" to="/contact">Enquire about this package</Link>
    </article>
  );
}