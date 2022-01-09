import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
  edit: false,
  color: "grey",
  activeColor: "tomato",
  value: 2.5,
  size: window.innerWidth < 600 ? 20 : 25,
  isHalf: true,
};
const Product = ({ product }) => {
  return (
    <div >
      <Link className="productCard" to={"/" + product._id}>
        <img src={product.images[0].url} alt="product img" />{" "}
        <p>{product.name}</p>
        <div>
          <ReactStars {...options}></ReactStars>
          <span>256 Reviews</span>
        </div>
        <span>{product.price}</span>
      </Link>
    </div>
  );
};

export default Product;
