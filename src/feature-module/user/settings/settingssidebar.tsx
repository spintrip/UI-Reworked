import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const SettingsSidebar = () => {
  const route = all_routes;
  const location = useLocation();
  const navigate = useNavigate();
  const isLinkActive = (route: string) => {
   
    return location.pathname === route;
  };
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (!token) {
      navigate(all_routes.signup);
    }
  })

  return (
    <div className="col-lg-3 theiaStickySidebar">
      <div className="stickybar">
        <div className="settings-widget">
          <div className="settings-menu">
            <ul>
              <li>
                <Link
                  to={route.settings}
                  className={isLinkActive(route.settings) ? "active" : "border"}
                >
                  <i className="feather-user" /> Profile
                </Link>
              </li>
              <li className="doc-button">
                  <Link to={route.security} className={isLinkActive(route.security) ? "active" : "border"}>
                  <i className="fas fa-file-alt" />
                  Documents
                  </Link>
             </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
