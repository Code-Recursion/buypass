import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/layout/Home/Home.js";
import WebFont from "webfontloader";
import React, { useEffect } from "react";
import Loader from "./component/layout/Loader/Loader";

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "sans-serif"],
      },
    });
  }, []);

  return (
    <Router>
      <div className="font-loader">
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
