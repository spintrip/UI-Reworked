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
                    <ImageWithBasePath
                      src="assets/img/icons/dashboard-icon.svg"
                      alt="Icon"
                    />
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
                    <ImageWithBasePath
                      src="assets/img/icons/booking-icon.svg"
                      alt="Icon"
                    />
                    <span>My Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.hostreviews}
                    className={isLinkActive(routes.hostreviews) ? "active" : ""}
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/review-icon.svg"
                      alt="Icon"
                    />
                    <span>Reviews</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to={routes.wishlist} className={isLinkActive(routes.wishlist) ? "active" : ""}>
                    <ImageWithBasePath
                      src="assets/img/icons/car-logo2.png"
                      alt="Icon"
                    />
                    <span>All Cars</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to={routes.hostmessages} className={isLinkActive(routes.hostmessages) ? "active" : ""}>
                    <ImageWithBasePath
                      src="assets/img/icons/message-icon.svg"
                      alt="Icon"
                    />
                    <span>Messages</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to={routes.hostListing}
                    className={isLinkActive(routes.hostListing) ? "active" : ""}
                  >
                    <ImageWithBasePath
                      className="custom-car-dashboard-logo"
                      src="assets/img/icons/car-256.png"
                      alt="Icon"
                    />
                    <span>All Cars</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to={routes.wallet} className={isLinkActive(routes.wallet) ? "active" : ""}>
                    <ImageWithBasePath
                      src="assets/img/icons/wallet-icon.svg"
                      alt="Icon"
                    />
                    <span>My Wallet</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to={routes.hostpayment}
                    className={isLinkActive(routes.hostpayment) ? "active" : ""}
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/payment-icon.svg"
                      alt="Icon"
                    />
                    <span>Payments</span>
                  </Link>
                </li>
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
                    <ImageWithBasePath
                      src="assets/img/icons/settings-icon.svg"
                      alt="Icon"
                    />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.hostTicket}
                    className={isLinkActive(routes.hostTicket) ? "active" : ""}
                  >
                    <ImageWithBasePath
                      className="custom-car-dashboard-logo"
                      src="assets/img/icons/support-icon.png"
                      alt="Icon"
                    />
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
