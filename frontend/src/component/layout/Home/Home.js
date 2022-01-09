import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../MetaData";

const product = {
  name: "Random Product",
  images: [{ url: "https://picsum.photos/500/700" }],
  price: "Rs. 5000",
  _id: "id",
};

const Home = () => {
  return (
    <>
      <MetaData title="Ecommerce Home" />
      <div className="banner">
        <h2>Welcome to Ecommerce</h2>
        <h1>Find Amazing Products Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
