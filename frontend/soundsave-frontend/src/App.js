import "./App.css";
import LandingPage from "./pages/LandingPage";
import Footer from "./pages/fragments/Footer";
import Header from "./pages/fragments/Header";
import { Outlet } from "react-router-dom";

function App({ children }) {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
