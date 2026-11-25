import { Link } from "react-router-dom";

export default function NotFound({ message = "This page does not exist or has moved." }) {
  return (
    <section className="section narrow center">
      <h1 className="big">404</h1>
      <h2>Page not found</h2>
      <p>{message}</p>
      <Link className="btn" to="/">Back to home</Link>
    </section>
  );
}