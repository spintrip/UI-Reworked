import React from "react";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Link, useLocation } from "react-router-dom";
import NotificationBar from "../../common/notificationBar";

const DashboardMenu = () => {
  const routes = all_routes;
  const location = useLocation();
  const isLinkActive = (route: string) => {
    // Check if the current location matches the given route
    return location.pathname === route;
  };
  return (
    <div className="dashboard-section ">
      <NotificationBar />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-menu w-100">
              <ul className="d-flex flex-wrap align-items-center justify-content-center">
                <li>
                  <Link
                    to={routes.dashboard}
                    className={isLinkActive(routes.dashboard) ? "active" : ""}
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
                    to={routes.userbookings}
                    className={
                      isLinkActive(routes.userBookings) ||
                      isLinkActive(routes.userBookingInprogress) ||
                      isLinkActive(routes.userBookingUpcoming) ||
                      isLinkActive(routes.userBookingComplete) ||
                      isLinkActive(routes.userBookingCancelled)
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
                {/* <li>
                  <Link to={routes.reviews} className={isLinkActive(routes.reviews) ? "active" : ""}>
                    <ImageWithBasePath
                      src="assets/img/icons/review-icon.svg"
                      alt="Icon"
                    />
                    <span>Reviews</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to={routes.wishlist}
                    className={isLinkActive(routes.wishlist) ? "active" : ""}
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/wishlist-icon.svg"
                      alt="Icon"
                    />
                    <span>Wishlist</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to={routes.messages} className={isLinkActive(routes.messages) ? "active" : ""}>
                    <ImageWithBasePath
                      src="assets/img/icons/message-icon.svg"
                      alt="Icon"
                    />
                    <span>Messages</span>
                  </Link>
                </li> */}
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
                    to={routes.payment}
                    className={isLinkActive(routes.payment) ? "active" : ""}
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
                    to={routes.settings}
                    className={
                      isLinkActive(routes.settings) ||
                      isLinkActive(routes.security) ||
                      isLinkActive(routes.preference) ||
                      isLinkActive(routes.notification) ||
                      isLinkActive(routes.integration)
                        ? "active"
                        : ""
                    }
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/profile_User.svg"
                      alt="Icon"
                      className="small-width"
                    />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.userticket}
                    className={isLinkActive(routes.userticket) ? "active" : ""}
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
