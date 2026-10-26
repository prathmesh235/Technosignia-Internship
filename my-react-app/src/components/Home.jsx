function Home({ name, course }) {
  return (
    <main className="home">
      <h2>Welcome, {name}!</h2>
      <p>You are learning: {course}</p>
    </main>
  );
}

export default Home;