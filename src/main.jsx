import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage";
import Homepage from "./homepage";
import MarketPlace from "./marketPlace";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CurrentUserProvider } from "./components/contexts/currentUserContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentUserProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/MarketPlace" element={<MarketPlace />} />
        </Routes>
      </Router>
    </CurrentUserProvider>
  </React.StrictMode>
);
