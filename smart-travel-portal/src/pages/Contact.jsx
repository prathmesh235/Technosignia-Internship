import { useSearchParams } from "react-router-dom";
import InquiryForm from "../components/InquiryForm.jsx";

export default function Contact() {
  const [params] = useSearchParams();
  const destination = params.get("destination") || "";

  return (
    <section className="section narrow">
      <h2>Travel inquiry</h2>
      <p className="muted">Tell us where you want to go. This form is frontend-only and nothing is sent to a server.</p>
      <InquiryForm key={destination || "none"} defaultDestination={destination} />
    </section>
  );
}