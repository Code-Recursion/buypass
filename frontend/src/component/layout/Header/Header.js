import React, { useState } from "react";
import "../Header/Header.css";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import { FiSearch } from "react-icons/fi";
import { AiFillShopping } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navStyle = {
    height: open ? "100%" : "0%",
    width: "100%",
    overflowY: "hidden",
  };

  return (
    <div>
      <span
        className="hamburger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <IconContext.Provider
          value={{
            size: "2.2rem",
          }}
        >
          <GiHamburgerMenu />
        </IconContext.Provider>
      </span>
      <div id="myNav" className="overlay" style={navStyle}>
        <span
          className="closebtn"
          onClick={() => {
            setOpen(false);
          }}
        >
          <IconContext.Provider
            value={{
              size: "2.5rem",
              className: "closeBtn",
            }}
          >
            <GrClose />
          </IconContext.Provider>
        </span>

        <div className="overlay-content">
          <Link
            to="/about"
            onClick={() => {
              setOpen(false);
            }}
          >
            About
          </Link>

          <Link
            to="/shop"
            onClick={() => {
              setOpen(false);
            }}
          >
            Shop
          </Link>
          <Link
            to="/service"
            onClick={() => {
              setOpen(false);
            }}
          >
            Service
          </Link>
          <Link
            to="/contact"
            onClick={() => {
              setOpen(false);
            }}
          >
            Contact
          </Link>
          <div className="nav-icons">
            <Link to="/search">
              <FiSearch />
            </Link>
            <Link to="/shop">
              <AiFillShopping />
            </Link>
            <Link to="/profile">
              <FaUserAlt />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
