export default function About() {
  return (
    <section className="section narrow">
      <h2>About Wanderly</h2>
      <p>Wanderly is a frontend travel and tourism portal. You can explore destinations, compare tour packages, search and filter by budget, save favorites and send a travel inquiry.</p>
      <p>All data comes from local JSON files and favorites are kept in your browser's localStorage. There is no backend or database.</p>
      <h3>Built with</h3>
      <ul><li>React and Vite</li><li>React Router</li><li>Local JSON data</li><li>Plain CSS</li></ul>
    </section>
  );
}