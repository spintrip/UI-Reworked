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
                    to={routes.wishlist}
                    className={isLinkActive(routes.wishlist) ? "active" : ""}
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        src="assets/img/icons/wishlist-icon.svg"
                        alt="Icon"
                      />
                     </div>
                    <span>Wishlist</span>
                   
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.payment}
                    className={isLinkActive(routes.payment) ? "active" : ""}
                  >
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        src="assets/img/icons/payment-icon.svg"
                        alt="Icon"
                      />
                    </div>
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
                    <div className=" d-flex flex-column align-items-start justify-content-start ">
                      <ImageWithBasePath
                        src="assets/img/icons/profile_User.svg"
                        alt="Icon"
                        className="small-width"
                      />
                    </div>
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.userticket}
                    className={isLinkActive(routes.userticket) ? "active" : ""}
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
