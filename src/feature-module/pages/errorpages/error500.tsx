import React from "react";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const Error500 = () => {
  const routes = all_routes;

  return (
    <div className="main-wrapper">
      <div className="error-box">
        <ImageWithBasePath
          src="assets/img/500.png"
          className="img-fluid"
          alt="Unexpected error"
        />
        <h3 className="error-500">Unexpected error</h3>
        <div className="back-button">
          <Link to={routes.home} className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error500;
