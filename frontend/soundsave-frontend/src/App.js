import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Footer from "./pages/fragments/Footer";
import Header from "./pages/fragments/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
