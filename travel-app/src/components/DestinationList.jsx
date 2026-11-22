import DestinationCard from "./DestinationCard";

function DestinationList({ destinations, onSelect }) {
  return (
    <div className="grid">
      {destinations.map((place) => (
        <DestinationCard key={place.id} {...place} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default DestinationList;