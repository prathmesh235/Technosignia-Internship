import { useState } from "react";
import "./TravelInquiryForm.css";

const INITIAL_VALUES = {
  name: "",
  email: "",
  destination: "",
  travelDate: "",
  travelers: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Returns an error string for one field, or "" if the value is valid.
function validateField(name, value) {
  const text = String(value).trim();

  switch (name) {
    case "name":
      if (!text) return "Enter your full name.";
      if (text.length < 2) return "Name must be at least 2 characters.";
      return "";

    case "email":
      if (!text) return "Enter your email address.";
      if (!EMAIL_PATTERN.test(text))
        return "Enter a valid email, like name@example.com.";
      return "";

    case "destination":
      if (!text) return "Tell us where you want to go.";
      return "";

    case "travelDate": {
      if (!value) return "Choose your travel date.";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // Parse as local date to avoid timezone shifts
      const [y, m, d] = value.split("-").map(Number);
      if (new Date(y, m - 1, d) < today)
        return "Travel date can't be in the past.";
      return "";
    }

    case "travelers": {
      if (value === "") return "Enter the number of travelers.";
      const n = Number(value);
      if (!Number.isInteger(n) || n < 1) return "Enter at least 1 traveler.";
      if (n > 20) return "For groups over 20, mention it in your message.";
      return "";
    }

    case "message":
      if (!text) return "Add a short message about your trip.";
      if (text.length < 10) return "Message must be at least 10 characters.";
      return "";

    default:
      return "";
  }
}

function validateAll(values) {
  const errors = {};
  Object.keys(values).forEach((key) => {
    const error = validateField(key, values[key]);
    if (error) errors[key] = error;
  });
  return errors;
}

export default function TravelInquiryForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const todayISO = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Re-validate live once the field has been touched
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateAll(values);
    setErrors(validationErrors);
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(validationErrors).length > 0) return;

    // Frontend-only: no backend call. Log the data and show success.
    console.log("Inquiry submitted:", values);
    setSubmitted(true);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="inquiry">
        <div className="inquiry-success" role="status">
          <h2>Inquiry sent</h2>
          <p>
            Thanks, {values.name.trim()}. We&rsquo;ve noted your interest in{" "}
            <strong>{values.destination.trim()}</strong> for{" "}
            {values.travelers} {Number(values.travelers) === 1 ? "traveler" : "travelers"}{" "}
            on {values.travelDate}. We&rsquo;ll reply to {values.email.trim()}{" "}
            soon.
          </p>
          <button type="button" className="inquiry-btn" onClick={handleReset}>
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  // Small helper so each field's markup stays short
  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: errors[name] ? "has-error" : "",
  });

  const ErrorText = ({ name }) =>
    errors[name] ? (
      <span id={`${name}-error`} className="inquiry-error" role="alert">
        {errors[name]}
      </span>
    ) : null;

  return (
    <div className="inquiry">
      <h1>Plan your trip</h1>
      <p className="inquiry-lead">
        Tell us where and when. We&rsquo;ll get back with options.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="inquiry-field">
          <label htmlFor="name">Full name</label>
          <input type="text" autoComplete="name" {...fieldProps("name")} />
          <ErrorText name="name" />
        </div>

        <div className="inquiry-field">
          <label htmlFor="email">Email</label>
          <input type="email" autoComplete="email" {...fieldProps("email")} />
          <ErrorText name="email" />
        </div>

        <div className="inquiry-field">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            placeholder="e.g. Kyoto, Japan"
            {...fieldProps("destination")}
          />
          <ErrorText name="destination" />
        </div>

        <div className="inquiry-row">
          <div className="inquiry-field">
            <label htmlFor="travelDate">Travel date</label>
            <input type="date" min={todayISO} {...fieldProps("travelDate")} />
            <ErrorText name="travelDate" />
          </div>

          <div className="inquiry-field">
            <label htmlFor="travelers">Travelers</label>
            <input
              type="number"
              min="1"
              max="20"
              inputMode="numeric"
              {...fieldProps("travelers")}
            />
            <ErrorText name="travelers" />
          </div>
        </div>

        <div className="inquiry-field">
          <label htmlFor="message">Message</label>
          <textarea
            rows="4"
            placeholder="Budget, interests, special requests..."
            {...fieldProps("message")}
          />
          <ErrorText name="message" />
        </div>

        <button type="submit" className="inquiry-btn">
          Send inquiry
        </button>
      </form>
    </div>
  );
}