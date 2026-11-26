import { Link } from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage.js";

export default function MyInquiries() {
  const [inquiries, setInquiries] = useLocalStorage("wanderly-inquiries", []);

  return (
    <section className="section narrow">
      <h2>My inquiries</h2>
      {inquiries.length === 0 ? (
        <p className="empty">You have not sent any inquiries yet. <Link to="/contact">Send your first inquiry</Link>.</p>
      ) : (
        <>
          <ul className="review-list">
            {inquiries.map((q) => (
              <li key={q.id}>
                <h3>{q.destinationName}</h3>
                <p className="muted">Sent {q.createdAt}</p>
                <p>{q.travelers} traveler(s) on {q.date}</p>
                <p>{q.message}</p>
                <button className="btn ghost small" onClick={() => setInquiries(inquiries.filter((x) => x.id !== q.id))}>Delete</button>
              </li>
            ))}
          </ul>
          <p><button className="btn ghost" onClick={() => setInquiries([])}>Clear all</button></p>
        </>
      )}
    </section>
  );
}