import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { all_routes } from "../../router/all_routes";
import "./mobileNavbar.css";

const MobileNavbar = ({
  header,
  handleLogout,
  pagesActiveClassArray,
  token,
}) => {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const location = useLocation(); // use router location instead of window.location
  const routes = all_routes;

  const toggleMenu = () => {
    const open = !burgerStatus;
    setBurgerStatus(open);

    // If you need those custom events for Joyride later:
    // document.dispatchEvent(new Event(open ? "menuOpen" : "menuClose"));
  };

  const closeMenu = () => setBurgerStatus(false);

  const toggleSubMenu = (index: number) =>
    setActiveSubMenu(activeSubMenu === index ? null : index);

  // Close the menu automatically on route change
  useEffect(() => {
    closeMenu();
    setActiveSubMenu(null);
  }, [location.pathname]);

  return (
    <div style={{ width: "100%", height: "100vh", zIndex: "" }}>
      <button
        className="burger-menu"
        onClick={toggleMenu}
        aria-expanded={burgerStatus}
        aria-label="Toggle navigation"
      >
        <span className={`burger-bar ${burgerStatus ? "clicked" : "unclicked"}`} />
        <span className={`burger-bar ${burgerStatus ? "clicked" : "unclicked"}`} />
        <span className={`burger-bar ${burgerStatus ? "clicked" : "unclicked"}`} />
      </button>

      <nav className={`menu ${burgerStatus ? "visible" : "hidden"}`}>
        <ul className="menu-items mobile-user-joyride-step text-black">
          {header.map((mainMenus: any, mainIndex: number) => (
            <React.Fragment key={mainIndex}>
              {mainMenus.separateRoute ? (
                <li
                  className={
                    location.pathname.includes(mainMenus.routes || "") ||
                    mainMenus?.links?.includes(location.pathname) ||
                    (mainMenus.tittle === "Pages" &&
                      pagesActiveClassArray?.some((name: string) =>
                        name.includes(location.pathname)
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
                  <button
                    type="button"
                    className="submenu-toggle"
                    onClick={() => toggleSubMenu(mainIndex)}
                    aria-expanded={activeSubMenu === mainIndex}
                  >
                    {mainMenus.tittle} <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul
                    className={`submenu ${
                      activeSubMenu === mainIndex ? "visible" : ""
                    }`}
                  >
                    {mainMenus.menu?.map((menu: any, menuIndex: number) => (
                      <li
                        key={menuIndex}
                        className={`${
                          menu.hasSubRoute ? "has-submenu" : ""
                        } ${
                          menu?.subMenus?.some(
                            (item: any) => item.routes === location.pathname
                          )
                            ? "active"
                            : ""
                        }`}
                      >
                        {menu.hasSubRoute ? (
                          <>
                            <span className="submenu-label">{menu.menuValue}</span>
                            <ul
                              className={`submenu ${
                                menu.showSubRoute ? "d-block" : ""
                              }`}
                            >
                              {menu.subMenus?.map(
                                (subMenu: any, subMenuIndex: number) => (
                                  <li key={subMenuIndex}>
                                    <Link to={subMenu.routes} onClick={closeMenu}>
                                      {subMenu.menuValue}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </>
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
                <i className="fa-regular fa-user text-white" />
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
                  <i className="fa-regular fa-user" />
                  <p className="mx-2">Sign In</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="bg-website-primary border d-flex align-items-end justify-content-center mx-3 mobile-signup"
                  to={routes.signup}
                  onClick={closeMenu}
                >
                  <i className="fa-solid fa-lock text-white" />
                  <p className="mx-2 text-white">Sign Up</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

MobileNavbar.propTypes = {
  header: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired,
  pagesActiveClassArray: PropTypes.array.isRequired,
  token: PropTypes.any,
};

export default MobileNavbar;
