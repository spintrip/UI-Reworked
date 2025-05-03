import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import MobileNavbar from "./mobile_menu/mobileNavbar";
import { useDropdown } from './DropdownContext';


const Header = () => {
  const routes = all_routes;
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<any>(localStorage.getItem("token"));
  const [host, setHost] = useState(localStorage.getItem("Host"));
  const { activeSubMenu, setActiveSubMenu } = useDropdown();

  // useEffect(() => {
  //   if (!run) {
  //     startTour();
  //   }
  // }, [run, startTour]);



  const toggleSubMenu = (menu: string) => {
    setActiveSubMenu(activeSubMenu === menu ? "" : menu);
  };
  
  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    setHost(localStorage.getItem("Host"));
  }, [token, host]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("Host");
    setToken(null);
    setHost(null);
    navigate(routes.home); 
    window.location.reload();
  };
  //host header
  const header1 = [
    {
      tittle: "Dashboard",
      showAsTab: false,
      separateRoute: true,
      routes: routes.hostdashboard,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: "Host",
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: "My bookings",
          routes: routes.hostbookings,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "All Cars",
          routes: routes.hostListing,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Reviews",
          routes: routes.hostreviews,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
       {
          menuValue: "Payment",
          routes: routes.hostpayment,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Profile",
          routes: routes.hostsettings,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
      ],
    },
    {
      tittle: "Blog",
      showAsTab: false,
      separateRoute: true,
      routes: routes.bloglist,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: "Contact",
      showAsTab: false,
      separateRoute: true,
      routes: routes.contact,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: "About Us",
      showAsTab: false,
      separateRoute: true,
      routes: routes.aboutus,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: "About Company",
      showAsTab: false,
      separateRoute: true,
      routes: routes.aboutcompany,
      hasSubRoute: false,
      showSubRoute: false,
    },
  ];

  // user header
  const header2 = [
    {
      tittle: "Home",
      showAsTab: false,
      separateRoute: true,
      routes: routes.home,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: "User",
      className: "user-button",
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: "Dashboard",
          routes: routes.dashboard,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "My bookings",
          routes: routes.userbookings,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
          additionlinks: [
            {
              links: "/user-booking-upcoming",
            },
            {
              links: "/user-booking-inprogress",
            },
            {
              links: "/user-booking-complete",
            },
            {
              links: "/user-booking-upcoming",
            },
            {
              links: "/user-booking-cancelled",
            },
          ],
        },
        {
          menuValue: "Wishlist",
          routes: routes.wishlist,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Payment",
          routes: routes.payment,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Profile",
          clasName: "Profile-upload",
          routes: routes.settings,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: []
        },
      ],
    },
    {
      tittle: "Blog",
      showAsTab: false,
      separateRoute: true,
      routes: routes.bloglist,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: "Contact",
      showAsTab: false,
      separateRoute: true,
      routes: routes.contact,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: "About Us",
      showAsTab: false,
      separateRoute: true,
      routes: routes.aboutus,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: "About Company",
      showAsTab: false,
      separateRoute: true,
      routes: routes.aboutcompany,
      hasSubRoute: false,
      showSubRoute: false,
    },
  ];

  let header: any[];
  if (host == "1") {
    header = header1;
  } else {
    header = header2;
  }
  const pagesActiveClassArray = [
    "/pages/aboutus",
    "/authentication/register",
    "/authentication/login",
    "/authentication/forgot-password",
    "/authentication/reset-password",
    "/pages/booking-payment",
    "/pages/booking-payment",
    "/pages/invoice-details",
    "/pages/error-404",
    "/pages/error-500",
    "/pages/pricing",
    "/pages/faq",
    "/pages/gallery",
    "/pages/our-team",
    "/pages/testimonial",
    "/pages/terms-condition",
    "/pages/privacy-policy",
    "/pages/maintenance",
    "/pages/coming-soon",
  ];
  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg header-nav bg-transparent">
            <div className="navbar-header">
              <Link
                to={host === "1" ? routes.hostdashboard : routes.home}
                className=""
              >
                <ImageWithBasePath
                  src={
                    host === "1"
                      ? "assets/img/Spintrip_logo-host.png"
                      : "assets/img/Spintrip_logo.png"
                  }
                  className="navbar-logo-custom"
                  alt="Logo"
                />
              </Link>
              <div className="mobile-navbar">
                <MobileNavbar
                  header={header}
                  handleLogout={handleLogout}
                  pagesActiveClassArray={pagesActiveClassArray}
                  token={token}
                />
              </div>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to={host === "1" ? routes.hostdashboard : routes.home} className="menu-logo">
                  <ImageWithBasePath
                    src={host === "1" ? "assets/img/Spintrip_logo-host.png" : "assets/img/Spintrip_logo.png"}
                    className="navbar-logo-custom"
                    alt="Logo"
                  />
                </Link>
                <Link id="menu_close" className="menu-close" to="#">
                  <i className="fas fa-times" />
                </Link>
              </div>

              <ul className="main-nav">
                {host === "1" ? (
                  // Host Navigation
                  <>
                    <li className={location.pathname.includes(routes.hostdashboard) ? "active" : ""}>
                      <Link to={routes.hostdashboard}>Dashboard</Link>
                    </li>
                    <li className={`has-submenu ${activeSubMenu === "host" ? "active" : ""}`}>
                      <Link to="#" onClick={() => toggleSubMenu("host")}>
                        Host <i className="fas fa-chevron-down"></i>
                      </Link>
                      <ul className={`submenu ${activeSubMenu === "host" ? "d-block" : ""}`}>
                        <li className={location.pathname.includes(routes.hostbookings) ? "active" : ""}>
                          <Link to={routes.hostbookings}>My Bookings</Link>
                        </li>
                        <li className={location.pathname.includes(routes.hostListing) ? "active" : ""}>
                          <Link to={routes.hostListing}>All Cars</Link>
                        </li>
                        <li className={location.pathname.includes(routes.hostreviews) ? "active" : ""}>
                          <Link to={routes.hostreviews}>Reviews</Link>
                        </li>
                        <li className={location.pathname.includes(routes.hostpayment) ? "active" : ""}>
                          <Link to={routes.hostpayment}>Payment</Link>
                        </li>
                        <li className={location.pathname.includes(routes.hostsettings) ? "active" : ""}>
                          <Link to={routes.hostsettings}>Profile</Link>
                        </li>
                      </ul>
                    </li>
                    <li className={location.pathname.includes(routes.bloglist) ? "active" : ""}>
                      <Link to={routes.bloglist}>Blog</Link>
                    </li>
                    <li className={location.pathname.includes(routes.contact) ? "active" : ""}>
                      <Link to={routes.contact}>Contact</Link>
                    </li>
                    <li className={location.pathname.includes(routes.aboutus) ? "active" : ""}>
                      <Link to={routes.aboutus}>About Us</Link>
                    </li>
                    <li className={location.pathname.includes(routes.aboutcompany) ? "active" : ""}>
                      <Link to={routes.aboutcompany}>About Company</Link>
                    </li>
                  </>
                ) : (
                  // User Navigation
                  <>
                    <li className={location.pathname.includes(routes.home) ? "active" : ""}>
                      <Link to={routes.home}>Home</Link>
                    </li>
                    <li className={`has-submenu ${activeSubMenu === "user" ? "active" : ""} `}>
                      <Link to="#" onClick={() => toggleSubMenu("user")}>
                        User <i className="fas fa-chevron-down"></i>
                      </Link>
                      <ul className={`submenu ${activeSubMenu === "user" ? "d-block" : ""}`}>
                        <li className={location.pathname.includes(routes.dashboard) ? "active" : ""}>
                          <Link to={routes.dashboard}>Dashboard</Link>
                        </li>
                        <li className={location.pathname.includes(routes.userbookings) ? "active" : ""}>
                          <Link to={routes.userbookings}>My Bookings</Link>
                        </li>
                        <li className={location.pathname.includes(routes.wishlist) ? "active" : ""}>
                          <Link to={routes.wishlist}>Wishlist</Link>
                        </li>
                        <li className={location.pathname.includes(routes.payment) ? "active" : ""}>
                          <Link to={routes.payment}>Payment</Link>
                        </li>
                        <li className={location.pathname.includes(routes.settings) ? "active" : ""}>
                          <Link to={routes.settings}>Profile</Link>
                        </li>
                      </ul>
                    </li>
                    <li className={location.pathname.includes(routes.bloglist) ? "active" : ""}>
                      <Link to={routes.bloglist}>Blog</Link>
                    </li>
                    <li className={location.pathname.includes(routes.contact) ? "active" : ""}>
                      <Link to={routes.contact}>Contact</Link>
                    </li>
                    <li className={location.pathname.includes(routes.aboutus) ? "active" : ""}>
                      <Link to={routes.aboutus}>About Us</Link>
                    </li>
                    <li className={location.pathname.includes(routes.aboutcompany) ? "active" : ""}>
                      <Link to={routes.aboutcompany}>About Company</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="navbar-btn-right">
              <ul className="nav header-navbar-rht">
                {token ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link header-login"
                        to={routes.home}
                        onClick={handleLogout}
                      >
                        <span>
                          <i className="fa-regular fa-user" />
                        </span>
                        Logout
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                  <Link className="nav-link header-reg" to={routes.signup}>
                    <span>
                      <i className="fa-solid fa-lock" />
                    </span>
                    Sign Up
                  </Link>
                </li> */}
                  </>
                ) : (
                  <>
                    <li className="nav-item" onClick={() => {}}>
                      <Link className="nav-link header-login" to={routes.login}>
                        <span>
                          <i className="fa-regular fa-user" />
                        </span>
                        Sign In
                      </Link>
                    </li>
                    <li className="nav-item signup-button" onClick={() => {}}>
                      <Link className="nav-link header-reg" to={routes.signup}>
                        <span>
                          <i className="fa-solid fa-lock" />
                        </span>
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
