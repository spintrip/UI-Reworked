import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import { CornerDownLeft } from "react-feather";
import { all_routes } from "../router/all_routes";

const route = all_routes;
const ResetPassword = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isToggle1, setIsToggle1] = useState(false);

  return (
    <div className="login-body">
      {/* Header */}
      <header className="log-header">
        <Link to={route.home}>
          <ImageWithBasePath
            className="img-fluid logo-dark"
            src="assets/img/logo.svg"
            alt="Logo"
          />
        </Link>
      </header>
      {/* /Header */}
      <div className="login-wrapper main-wrapper ">
        <div className="loginbox">
          <div className="login-auth">
            <div className="login-auth-wrap">
              <div className="sign-group">
                <Link to={route.home} className="btn sign-up">
                  <span>
                    <CornerDownLeft />
                  </span>
                  Back To Home
                </Link>
              </div>
              <h1>Reset Password</h1>
              <p className="account-subtitle">
                Your new password must be different from previous used
                passwords.
              </p>
              <form>
                <div className="input-block">
                  <label className="form-label">
                    New Password <span className="text-danger">*</span>
                  </label>
                  <div
                    className="pass-group"
                    onClick={() => setIsToggle(!isToggle)}
                  >
                    <input
                      type={isToggle ? "text" : "password"}
                      className="form-control pass-input"
                      placeholder=""
                    />
                    <span
                      className={`fas toggle-password ${
                        isToggle ? "fa-eye" : "fa-eye-slash"
                      }`}
                    />
                  </div>
                </div>
                <div className="input-block">
                  <label className="form-label">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div
                    className="pass-group"
                    onClick={() => setIsToggle1(!isToggle1)}
                  >
                    <input
                      type={isToggle1 ? "text" : "password"}
                      className="form-control pass-input"
                      placeholder=""
                    />
                    <span
                      className={`fas toggle-password ${
                        isToggle1 ? "fa-eye" : "fa-eye-slash"
                      }`}
                    />
                  </div>
                </div>
                <Link
                  to={route.home}
                  className="btn btn-outline-light w-100 btn-size"
                >
                  Save Changes
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="log-footer">
        <div className="container-fluid">
          {/* Copyright */}
          <div className="copyright">
            <div className="copyright-text">
              <p>© 2023 Dreams Rent. All Rights Reserved.</p>
            </div>
          </div>
          {/* /Copyright */}
        </div>
      </footer>
      {/* /Footer */}
    </div>
  );
};

export default ResetPassword;
