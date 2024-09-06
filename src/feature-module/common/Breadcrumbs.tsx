import React from "react";
import { Link, useLocation } from "react-router-dom";
import { breadcrumbs } from "../../core/data/interface/interface";
import { all_routes } from "../router/all_routes";

const Breadcrumbs = (props: breadcrumbs) => {
  const routes = all_routes;
  const location = useLocation();

  // List of host routes
  const hostRoutes = [
    routes.hostdashboard,
    routes.hostbookings,
    routes.hostreviews,
    routes.hostmessages,
    routes.hostpayment,
    routes.hostsettings,
  ];

  // Determine if the current route is a host route
  const isHostRoute = hostRoutes.includes(location.pathname);

  let addButton: JSX.Element | null = null;

  if (
    location.pathname === routes.listinggrid ||
    location.pathname === routes.listinglist ||
    location.pathname === routes.bookingcheckout ||
    location.pathname === routes.booking ||
    location.pathname === routes.invoice ||
    location.pathname === routes.listingdetails ||
    location.pathname === routes.ourteam ||
    location.pathname === routes.testimonial ||
    location.pathname === routes.termsconditions ||
    location.pathname === routes.privacypolicy ||
    location.pathname === routes.aboutus ||
    location.pathname === routes.pricing ||
    location.pathname === routes.faq ||
    location.pathname === routes.gallery ||
    location.pathname === routes.bloglist ||
    location.pathname === routes.bloggrid ||
    location.pathname === routes.contact
  ) {
    addButton = (
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12 ">
              <h2 className="breadcrumb-title">{props.title}</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    {isHostRoute ? (
                      <Link to={routes.hostdashboard}>Host Dashboard</Link>
                    ) : (
                      <Link to={routes.home}>Home</Link>
                    )}
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {props.title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (
    location.pathname === routes.dashboard ||
    location.pathname === routes.hostdashboard ||
    location.pathname === routes.hostbookings ||
    location.pathname === routes.hostreviews ||
    location.pathname === routes.hostmessages ||
    location.pathname === routes.hostpayment ||
    location.pathname === routes.hostsettings ||
    location.pathname === routes.messages ||
    location.pathname === routes.payment ||
    location.pathname === routes.reviews ||
    location.pathname === routes.userbookings ||
    location.pathname === routes.userBookingUpcoming ||
    location.pathname === routes.userBookingCancelled ||
    location.pathname === routes.userBookingInprogress ||
    location.pathname === routes.userBookingComplete ||
    location.pathname === routes.wallet ||
    location.pathname === routes.integration
  ) {
    addButton = (
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">{props.title}</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    {isHostRoute ? (
                      <Link to={routes.hostdashboard}>Host Dashboard</Link>
                    ) : (
                      <Link to={routes.home}>Home</Link>
                    )}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    addButton = (
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">{props.maintitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              {isHostRoute ? (
                <Link to={routes.hostdashboard}>Host Dashboard</Link>
              ) : (
                <Link to={routes.home}>Home</Link>
              )}
            </li>
          </ul>
        </div>
        <div className="col-auto float-end ms-auto"></div>
      </div>
    );
  }

  return <>{addButton}</>;
};

export default Breadcrumbs;
