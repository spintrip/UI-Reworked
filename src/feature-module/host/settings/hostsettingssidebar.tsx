import React from "react";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const HostSettingsSidebar = () => {
  const route = all_routes;
  const location = useLocation();
  const isLinkActive = (route: string) => {
    // Check if the current location matches the given route
    return location.pathname === route;
  };

  return (
    <div className="col-lg-3 theiaStickySidebar">
      <div className="stickybar">
        <div className="settings-widget">
          <div className="settings-menu">
            <ul>
              <li>
                <Link
                  to={route.hostsettings}
                  className={isLinkActive(route.hostsettings) ? "active" : ""}
                >
                  <i className="feather-user" /> Profile
                </Link>
              </li>
              {/* <li>
                                <Link to={route.hostsecurity} className={isLinkActive(route.security) ? "active" : ""}>
                                    <i className="feather-shield" /> Security
                                </Link>
                            </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostSettingsSidebar;
