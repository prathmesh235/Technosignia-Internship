import { useState } from "react";
import useLocalStorage from "../utils/useLocalStorage.js";
import destinations from "../data/destinations.json";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const today = () => new Date().toISOString().split("T")[0];

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name (at least 2 characters).";
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!emailRe.test(v.email)) e.email = "Enter a valid email, for example name@example.com.";
  if (!v.destination) e.destination = "Choose a destination.";
  if (!v.date) e.date = "Choose a travel date.";
  else if (v.date < today()) e.date = "Travel date cannot be in the past.";
  const n = Number(v.travelers);
  if (!v.travelers) e.travelers = "Enter the number of travelers.";
  else if (!Number.isInteger(n) || n < 1 || n > 20) e.travelers = "Travelers must be a whole number from 1 to 20.";
  if (v.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

export default function InquiryForm({ defaultDestination = "" }) {
  const empty = { name: "", email: "", destination: defaultDestination, date: "", travelers: "1", message: "" };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [, setInquiries] = useLocalStorage("wanderly-inquiries", []);

  const change = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: validate(next)[e.target.name] });
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      const dest = destinations.find((d) => d.id === Number(values.destination));
      setInquiries((list) => [
        { ...values, id: Date.now(), destinationName: dest.name, createdAt: new Date().toLocaleString("en-IN") },
        ...list,
      ]);
      setSuccess(values.name.trim());
      setValues(empty);
    } else {
      setSuccess(null);
    }
  };

  const field = (name) => ({ name, value: values[name], onChange: change, "aria-invalid": !!errors[name] });
  const err = (name) => errors[name] && <span className="error" role="alert">{errors[name]}</span>;

  return (
    <form onSubmit={submit} noValidate>
      {success && <p className="ok" role="status">Thank you, {success}! Your inquiry has been received. We will contact you soon.</p>}
      <label>Name<input {...field("name")} />{err("name")}</label>
      <label>Email<input type="email" {...field("email")} />{err("email")}</label>
      <label>Destination
        <select {...field("destination")}>
          <option value="">Select a destination</option>
          {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        {err("destination")}
      </label>
      <div className="two">
        <label>Travel date<input type="date" min={today()} {...field("date")} />{err("date")}</label>
        <label>Travelers<input type="number" min="1" max="20" {...field("travelers")} />{err("travelers")}</label>
      </div>
      <label>Message<textarea rows="4" {...field("message")} />{err("message")}</label>
      <button className="btn">Send inquiry</button>
    </form>
  );
}