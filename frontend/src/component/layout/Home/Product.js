import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "grey",
    activeColor: "tomato",
    value: product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <div>
      <Link className="productCard" to={"/" + product._id}>
        <img src={product.images[0].url} alt="product img" />{" "}
        <p>{product.name}</p>
        <div>
          <ReactStars {...options}></ReactStars>
          <span>{product.numOfReviews} Reviews</span>
        </div>
        <span>Rs. {product.price}</span>
      </Link>
    </div>
  );
};

export default Product;
