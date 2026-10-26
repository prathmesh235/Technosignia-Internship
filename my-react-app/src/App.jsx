import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header title="My React App" />
      <Home name="Rahul" course="React.js" />
      <Footer text={`© ${new Date().getFullYear()} My React App`} />
    </>
  );
}

export default App;