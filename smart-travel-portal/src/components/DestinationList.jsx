import DestinationCard from "./DestinationCard.jsx";

export default function DestinationList({ destinations, emptyMessage = "No destinations found." }) {
  if (destinations.length === 0) return <p className="empty">{emptyMessage}</p>;
  return (
    <div className="grid">
      {destinations.map((d) => <DestinationCard key={d.id} destination={d} />)}
    </div>
  );
}