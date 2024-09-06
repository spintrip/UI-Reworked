import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";

const Maintenance = () => {
  const routes = all_routes;
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <ImageWithBasePath
          src="assets/img/maintenance.png"
          className="img-fluid"
          alt="Maintenance"
        />
        <h2 className="coming-soon">We&apos;re Down For Maintenance</h2>
        <p>
          Our website is currently undergoing scheduled maintenance, will be
          right back in a few minutes.
        </p>
        <h6>We&apos;ll Be Back Shortly</h6>
        <div className="footer-social-links">
          <ul className="nav">
            <li>
              <Link to="#" target="_blank">
                <i className="feather-instagram hi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#" target="_blank">
                <i className="feather-twitter hi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#" target="_blank">
                <i className="feather-youtube hi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#" target="_blank">
                <i className="feather-facebook hi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#" target="_blank">
                <i className="feather-linkedin hi-icon" />
              </Link>
            </li>
          </ul>
        </div>
        <Link to={routes.home} className="btn-maintance btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Maintenance;
