import React from "react";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { all_routes } from "../../router/all_routes";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Error404 = () => {
  const routes = all_routes;
  return (
    <div className="main-wrapper">
      <Helmet>
          <title>404 Not Found</title>
      </Helmet>
      <div className="error-box d-flex flex-column align-items-center justify-content-center">
        <ImageWithBasePath
          src="assets/img/logo-lg.png"
          className="img-fluid"
          alt="Page not found"
        />
        <h3 className="fw-bold">Oops! Page not found!</h3>
        <p>The page you requested was not found.</p>
        <div className="back-button">
          <Link to={routes.home}>
            <button className="p-3 rounded bg-website-primary text-white border">
            Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
