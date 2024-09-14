import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import MobileNavbar from "./mobile_menu/mobileNavbar";
import { useJoyride } from "./JoyrideContext";

const Header = () => {
  const routes = all_routes;
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<any>(localStorage.getItem("token"));
  const [host, setHost] = useState(localStorage.getItem("Host"));
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const { setSteps, startTour, stopTour } = useJoyride();
 

  const toggleSubMenu = (index: number | React.SetStateAction<any>) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    setHost(localStorage.getItem("Host"));
  }, [token, host]);

  useEffect(() => {
    const steps = [
      {
        target: '.navbar-logo-custom',
        content: 'Welcome to Spintrip',
      },
      {
        target: '.signup-button',
        content: 'Click on the button to signup',
      },
    ];
    
    if (steps.length === 0) {
      localStorage.setItem('joyride-steps', JSON.stringify(steps));
      setSteps(steps); // Trigger state update only if necessary
      startTour(); // Start the tour once steps are set
    }
    startTour();
  }, [setSteps,startTour]);

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
              {/* <Link id="mobile_btn" to="#" onClick={toggleMenu}>
                  <span className="bar-icon">
                      <span />
                      <span />
                      <span />
                  </span>
              </Link> */}
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
              {/* <Link to={routes.home} className="navbar-brand logo-small">
                <ImageWithBasePath
                  src="assets/img/logo-small.png"
                  className="img-fluid"
                  alt="Logo"
                  

                />
                
              </Link> */}
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link
                  to={host === "1" ? routes.hostdashboard : routes.home}
                  className="menu-logo"
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
                <Link id="menu_close" className="menu-close" to="#">
                  {" "}
                  <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav ">
                {header.map((mainMenus: any, mainIndex) => {
                  // const link_array:any = [];
                  // mainMenus?.menu?.map((link) => {
                  //   link_array?.push(link?.routes);
                  //   if (link?.subMenus) {
                  //     link?.subMenus?.map((item) => {
                  //       link_array?.push(item?.routes);
                  //     });
                  //   }
                  //   return link_array;
                  // });
                  // mainMenus.links = link_array;
                  return (
                    <React.Fragment key={mainIndex}>
                      {mainMenus.separateRoute ? (
                        <li
                          key={mainIndex}
                          className={
                            location.pathname.includes(
                              mainMenus.routes || "",
                            ) ||
                            mainMenus?.links?.includes(location.pathname) ||
                            (mainMenus.tittle == "Pages" &&
                              pagesActiveClassArray?.map((name) =>
                                name.includes(location.pathname),
                              ))
                              ? "active"
                              : ""
                          }
                        >
                          {/* {checkActiceClass(mainMenus)} */}
                          <Link to={mainMenus.routes}>{mainMenus.tittle}</Link>
                        </li>
                      ) : (
                        // <li className={`has-submenu ${mainMenus?.menu?.map((item)=> item?.routes).includes(location.pathname)  ? "active":""}`}>
                        <li
                          className={` has-submenu ${mainMenus?.menu?.map((item: any) => item?.routes).includes(location.pathname) ? "active" : ""}`}
                        >
                          <Link to="#" onClick={() => toggleSubMenu(mainIndex)}>
                            {mainMenus.tittle}{" "}
                            <i className="fas fa-chevron-down"></i>
                          </Link>
                          <ul
                            className={`submenu ${mainMenus.showAsTab ? "d-block" : ""}`}
                          >
                            {mainMenus.menu?.map(
                              (menu: any, menuIndex: any) => (
                                <li
                                  key={menuIndex}
                                  className={`${menu.hasSubRoute ? "has-submenu" : ""} ${menu?.subMenus?.map((item: any) => item?.routes).includes(location.pathname) ? "active" : ""}`}
                                >
                                  {menu.hasSubRoute ? (
                                    <React.Fragment>
                                      <Link to="#">{menu.menuValue}</Link>
                                      <ul
                                        className={`submenu ${menu.showSubRoute ? "d-block" : ""}`}
                                      >
                                        {menu.subMenus?.map(
                                          (subMenu: any, subMenuIndex: any) => (
                                            <li key={subMenuIndex}>
                                              <Link to={subMenu.routes}>
                                                {subMenu.menuValue}
                                              </Link>
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    </React.Fragment>
                                  ) : (
                                    <div
                                      className={
                                        location.pathname.includes(
                                          menu.routes || "",
                                        )
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      <Link to={menu.routes}>
                                        {menu.menuValue}
                                      </Link>
                                    </div>
                                  )}
                                </li>
                              ),
                            )}
                          </ul>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
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
                    <li className="nav-item">
                      <Link className="nav-link header-login" to={routes.login}>
                        <span>
                          <i className="fa-regular fa-user" />
                        </span>
                        Sign In
                      </Link>
                    </li>
                    <li className="nav-item signup-button">
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
