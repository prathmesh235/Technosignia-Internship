function DestinationCard({ name, image, location, description, price, featured = false, onSelect }) {
  return (
    <article className="card">
      {featured && <span className="card__badge">Featured</span>}
      <img className="card__img" src={image} alt={name} loading="lazy" />
      <div className="card__body">
        <h3 className="card__title">{name}</h3>
        <p className="card__location">{location}</p>
        <p className="card__text">{description}</p>
        <p className="card__price">
          From <strong>₹{price.toLocaleString("en-IN")}</strong>
        </p>
        <button className="card__btn" type="button" onClick={() => onSelect(name)}>
          View details
        </button>
      </div>
    </article>
  );
}

export default DestinationCard;