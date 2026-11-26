import { useState } from "react";
import useLocalStorage from "../utils/useLocalStorage.js";

export default function Reviews({ destinationId }) {
  const [reviews, setReviews] = useLocalStorage(`wanderly-reviews-${destinationId}`, []);
  const [form, setForm] = useState({ name: "", rating: "5", comment: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || form.comment.trim().length < 5) {
      setError("Enter your name and a comment of at least 5 characters.");
      return;
    }
    setReviews([{ id: Date.now(), ...form, date: new Date().toLocaleDateString("en-IN") }, ...reviews]);
    setForm({ name: "", rating: "5", comment: "" });
    setError("");
  };

  return (
    <div className="reviews">
      <h3>Traveler reviews</h3>
      <form onSubmit={submit} noValidate>
        <div className="two">
          <label>Your name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label>Rating
            <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 && "s"}</option>)}
            </select>
          </label>
        </div>
        <label>Comment<textarea rows="3" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} /></label>
        {error && <span className="error" role="alert">{error}</span>}
        <button className="btn">Post review</button>
      </form>
      {reviews.length === 0 ? <p className="muted">No reviews yet. Be the first to share your experience.</p> : (
        <ul className="review-list">
          {reviews.map((r) => (
            <li key={r.id}><strong>{r.name}</strong> – {"★".repeat(Number(r.rating))} <span className="muted">{r.date}</span><br />{r.comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
}