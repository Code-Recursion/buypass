import React from "react";
// import playStore from "../../../images/google-play.svg";
// import appStore from "../../../images/app-store.svg";
import play from "../../../images/play.svg";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="leftFooter">
        <h2>Download Our App</h2>
        <p>Download App for Android and IOS Platforms</p>
        <img src={play} alt="app store" />
      </div>
      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>Genuine Quality Products Only</p>
        <p>Copyright 2022 &copy; Ajay Singh</p>
      </div>
      <div className="rightFooter">
        <h2>Follow Us</h2>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">Webiste</a>
      </div>
    </footer>
  );
}

export default Footer;
