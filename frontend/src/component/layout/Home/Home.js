import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../MetaData";
import { getProducts } from "../../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../component/layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  const alert = useAlert();
  useEffect(() => {
    if (error) {
      console.log("hello");
      // alert.error("erro occured"as);
      return alert.error("Error occured while fetching products");
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
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
            {products && products.map((product, key) => (
              <Product key={key} product={product} />
            ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Home;
