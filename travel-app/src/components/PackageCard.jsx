function PackageCard({ title, duration, includes, price }) {
  return (
    <article className="package">
      <h3 className="package__title">{title}</h3>
      <p className="package__duration">{duration}</p>
      <ul className="package__list">
        {includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="package__price">₹{price.toLocaleString("en-IN")} per person</p>
      <button className="package__btn" type="button">Book this tour</button>
    </article>
  );
}

export default PackageCard;