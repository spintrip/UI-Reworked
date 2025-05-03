import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { all_routes } from "../../router/all_routes";
import "./mobileNavbar.css";;


const MobileNavbar = ({
  header,
  handleLogout,
  pagesActiveClassArray,
  token,
}) => {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const routes = all_routes;

  // const toggleMenu = () => {
  //   const isMenuOpening = !burgerStatus; 
  //   setBurgerStatus(isMenuOpening);
   
  //   const event = new Event(isMenuOpening ? 'menuOpen' : 'menuClose');
  //   document.dispatchEvent(event);
  
  //   // Logic to handle starting/stopping Joyride based on menu status
  //   const status = localStorage.getItem("tourCompleted");
  //   if (isMenuOpening && status !== "true") {
  //     startTour();
  //     setStepIndex(1); // Go to the second step (index 1)
  //   } else {
  //     stopTour();
  //   }
  // };
  


  const closeMenu = () => {
    setBurgerStatus(false);
    // setRun(false);
  };

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  return (
    <div style={{ width: "100%", height: "100vh", zIndex: "" }}>
      <div className="burger-menu" onClick={()=> {}}>
        <div
          className={`burger-bar ${burgerStatus ? "clicked" : "unclicked"}`}
        ></div>
        <div
          className={`burger-bar ${burgerStatus ? "clicked" : "unclicked"}`}
        ></div>
        <div
          className={`burger-bar ${burgerStatus ? "clicked" : "unclicked"}`}
        ></div>
      </div>

      <div className={`menu ${burgerStatus ? "visible" : "hidden"} `}>
        <ul className="menu-items mobile-user-joyride-step text-black">
          {header.map((mainMenus: any, mainIndex: any) => (
            <React.Fragment key={mainIndex}>
              {mainMenus.separateRoute ? (
                <li
                  key={mainIndex}
                  className={
                    location.pathname.includes(mainMenus.routes || "") ||
                    mainMenus?.links?.includes(location.pathname) ||
                    (mainMenus.tittle === "Pages" &&
                      pagesActiveClassArray?.some((name: string | string[]) =>
                        name.includes(location.pathname),
                      ))
                      ? "active"
                      : ""
                  }
                >
                  <Link to={mainMenus.routes} onClick={closeMenu}>
                    {mainMenus.tittle}
                  </Link>
                </li>
              ) : (
                <li
                  className={`has-submenu ${
                    activeSubMenu === mainIndex ? "active" : ""
                  }`}
                >
                  <Link
                    to="#"
                    onClick={() => toggleSubMenu(mainIndex)}
                  >
                    {mainMenus.tittle} <i className="fas fa-chevron-down"></i>
                  </Link>
                  <ul
                    className={`submenu ${
                      activeSubMenu === mainIndex ? "visible" : ""
                    }`}
                  >
                    {mainMenus.menu?.map((menu: any, menuIndex: any) => (
                      <li
                        key={menuIndex}
                        className={`${
                          menu.hasSubRoute ? "has-submenu" : ""
                        } ${
                          menu?.subMenus?.some(
                            (item) => item.routes === location.pathname
                          )
                            ? "active"
                            : ""
                        }`}
                      >
                        {menu.hasSubRoute ? (
                          <React.Fragment>
                            <Link to="#" onClick={closeMenu}>
                              {menu.menuValue}
                            </Link>
                            <ul
                              className={`submenu ${
                                menu.showSubRoute ? "d-block" : ""
                              } `}
                            >
                              {menu.subMenus?.map(
                                (subMenu: any, subMenuIndex: any) => (
                                  <li key={subMenuIndex}>
                                    <Link
                                      to={subMenu.routes}
                                      onClick={closeMenu}
                                    >
                                      {subMenu.menuValue}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </React.Fragment>
                        ) : (
                          <Link
                            to={menu.routes}
                            onClick={closeMenu}
                            className={
                              location.pathname.includes(menu.routes || "")
                                ? "active"
                                : ""
                            }
                          >
                            {menu.menuValue}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </React.Fragment>
          ))}
          {token ? (
            <li>
              <Link
                className="bg-black d-flex align-items-end justify-content-center mx-3"
                to={routes.home}
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                <span>
                  <i className="fa-regular fa-user text-white " />
                </span>
                <p className="mx-2 text-white font-semibold">Logout</p>
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  className="bg-light border d-flex align-items-end justify-content-center mx-3 mobile-login"
                  to={routes.login}
                  onClick={closeMenu}
                >
                  <span>
                    <i className="fa-regular fa-user" />
                  </span>
                  <p className="mx-2">Sign In</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="bg-website-primary border d-flex align-items-end justify-content-center mx-3 mobile-signup"
                  to={routes.signup}
                  onClick={closeMenu}
                >
                  <span>
                    <i className="fa-solid fa-lock text-white" />
                  </span>
                  <p className="mx-2 text-white">Sign Up</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

MobileNavbar.propTypes = {
  header: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired,
  pagesActiveClassArray: PropTypes.array.isRequired,
  token: PropTypes.string, // Add token prop type
};

export default MobileNavbar;
