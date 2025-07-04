import React from "react";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Link, useLocation } from "react-router-dom";

const DashboardMenu = () => {
  const routes = all_routes;
  const location = useLocation();
  const isLinkActive = (route: string) => {
    // Check if the current location matches the given route
    return location.pathname === route;
  };
  return (
    <div className="hostdashboard-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-menu">
              <ul className="d-flex align-items-center justify-content-center flex-wrap">
                <li>
                  <Link
                    to={routes.hostdashboard}
                    className={
                      isLinkActive(routes.hostdashboard) ? "active" : ""
                    }
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        src="assets/img/icons/dashboard-icon.svg"
                        alt="Icon"
                      />
                    </div>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.hostbookings}
                    className={
                      isLinkActive(routes.hostBookings) ||
                      isLinkActive(routes.hostBookingInprogress) ||
                      isLinkActive(routes.hostBookingUpcoming) ||
                      isLinkActive(routes.hostBookingComplete) ||
                      isLinkActive(routes.hostBookingCancelled)
                        ? "active"
                        : ""
                    }
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        src="assets/img/icons/booking-icon.svg"
                        alt="Icon"
                      />
                    </div>
                    <span>My Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.hostreviews}
                    className={isLinkActive(routes.hostreviews) ? "active" : ""}
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        src="assets/img/icons/review-icon.svg"
                        alt="Icon"
                      />
                    </div>
                    <span>Reviews</span>
                  </Link>
                </li>
                
                <li>
                  <Link
                    to={routes.hostListing}
                    className={isLinkActive(routes.hostListing) ? "active" : ""}
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        className="custom-car-dashboard-logo"
                        src="assets/img/icons/car-256.png"
                        alt="Icon"
                      />
                    </div>
                    <span>All Vehicles</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.hostSubscriptions}
                    className={isLinkActive(routes.hostSubscriptions) ? "active" : ""}
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        className="custom-car-dashboard-logo"
                        src="assets/img/icons/car-256.png"
                        alt="Icon"
                      />
                    </div>
                    <span>Subscriptions</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to={routes.hostpayment}
                    className={isLinkActive(routes.hostpayment) ? "active" : ""}
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        src="assets/img/icons/payment-icon.svg"
                        alt="Icon"
                      />
                    </div>
                    <span>Payments</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to={routes.hostsettings}
                    className={
                      isLinkActive(routes.settings) ||
                      isLinkActive(routes.security) ||
                      isLinkActive(routes.preference) ||
                      isLinkActive(routes.notification) ||
                      isLinkActive(routes.hostsettings)
                        ? "active"
                        : ""
                    }
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        src="assets/img/icons/settings-icon.svg"
                        alt="Icon"
                      />
                    </div>
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.hostTicket}
                    className={isLinkActive(routes.hostTicket) ? "active" : ""}
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        className="custom-car-dashboard-logo"
                        src="assets/img/icons/support-icon.png"
                        alt="Icon"
                      />
                    </div>
                    <span>Ticket</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
