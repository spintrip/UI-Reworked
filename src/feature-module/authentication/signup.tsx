import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { Switch } from "@headlessui/react";
import { setIsLoading } from "../redux/action";
import "react-phone-input-2/lib/style.css";
import { Helmet } from "react-helmet";
import serverApiUrl from "../api/server";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const route = all_routes;

const SignUp = () => {
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<"user" | "host">("user");
  const [phoneValidatorError, setPhoneValidatorError] = useState(false);

  const validateSignup = async (
    phone: string,
    password: string,
    selectedRole: "user" | "host",
    callback: (response: { status: number; json: any }) => void,
  ) => {
    try {
      let role: string, apiUrl: string;
      if (selectedRole === "host" ) {
        apiUrl = "host/signup";
        role = "host";
      } else {
        apiUrl = "users/signup";
        role = "user";
      }
      const phoneWithCountryCode = phone.startsWith("+91")
        ? phone
        : "+91" + phone;

      const response = await fetch(serverApiUrl + apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneWithCountryCode, password, role:selectedRole }),
      });

      const data = await response.json();
      callback({ status: response.status, json: data });
    } catch (error) {
      console.error("Error in validateSignup:", error);
      setError("Signup failed. Please try again.");
      setLoading(false);
    }
  };

  const signUpCallBack = async (response: {
    status: number;
    json: () => any;
  }) => {
    setIsLoading(false);

    if (response.status === 200 || response.status === 201) {
      navigate(route.login);
    } else if (response.status === 500) {
      setError(selectedRole === "host" ? "Host already present." : "User already present.");
    } else {
      setError("Signup failed. Please try again.");
      setLoading(false);
    }
  };

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const signUpClickHandler = async () => {
    setPhoneValidatorError(false);
    if (!validatePhoneNumber(phone)) {
      setPhoneValidatorError(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    validateSignup(phone, "1234", selectedRole , signUpCallBack);
  };
  const handleUserSelect = () => {
    setSelectedRole("user");
    setEnabled(false); // User mode
  };
  
  const handleHostSelect = () => {
    setSelectedRole("host");
    setEnabled(true); // Host mode
  };

  return (
    <div>
      <GoogleAnalyticsScript/>
      <Helmet>
        <title>Sign Up | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Join Spintrip Car Rentals today and start enjoying affordable self-drive car rentals in Bangalore. Sign up now to rent top-notch cars from local hosts at competitive prices."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals signup, join car rental service Bangalore, affordable self-drive car rentals, rent top-notch cars Bangalore, car rental registration, competitive car rental pricing"
        />
      </Helmet>
      <div className="main login-body">
        <header className="bg-white py-3 d-flex align-items-center justify-content-center">
          <Link to={route.home}>
            <ImageWithBasePath
              className="spintrip-logo"
              src="assets/img/Spintrip_logo.png"
              alt="Logo"
            />
          </Link>
        </header>
        <div className="login-wrapper">
          <div className="loginbox">
            <div className="login-auth">
              <div className="login-auth-wrap">
                <div className="sign-group">
                  <Link
                    to={route.home}
                    className="text-black font-semibold d-flex align-items-end justify-items-start"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="back-icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                      </svg>
                    </span>{" "}
                    <span className="ml-2 mt-2">Back To Home</span>
                    
                  </Link>
                </div>
                <h1 className="create-account-text">
                  Create your Spintrip account
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                  or{" "}
                  <Link
                    to={route.login}
                    className="authorization-link"
                  >
                    <span></span> Sign in
                  </Link>
                </p>
                <div className="authorization-check">
                <button
                  onClick={handleUserSelect}
                  className={classNames(
                    selectedRole === "user" ? "button-on" : "button-off",
                    "font-semibold mx-2"
                  )}
                >
                  User
                </button>
                <button
                  onClick={handleHostSelect}
                  className={classNames(
                    selectedRole === "host" ? "button-on" : "button-off",
                    "font-semibold mx-2"
                  )}
                >
                  Host
                </button>
                </div>
                <form>
                  <div className="input-block">
                    <label className="form-label">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex align-items-center justify-content-center">
                      <div
                        className="form-control p-1 h-[45px] d-flex align-items-center justify-content-center border rounded mr-1 bg-light"
                        style={{ maxWidth: `fit-content`, marginRight: "5px" }}
                      >
                        <p className="font-semibold mx-1">+ 91</p>
                        <ImageWithBasePath
                          src="assets/img/india-flag.png"
                          alt="Icon"
                          className="country-flag"
                        />
                      </div>
                      <input
                        type="tel"
                        className="form-control text-center border border-gray font-semibold font-mono "
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Phone"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-light w-100 btn-size mt-4"
                    onClick={signUpClickHandler}
                  >
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>

                  {/* <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">
                      Or, Create an account with your email
                    </span>
                  </div>
                  <div className="social-login">
                    <Link
                      to="#"
                      className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                    >
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/google.svg"
                          className="img-fluid"
                          alt="Google"
                        />
                      </span>
                      Log in with Google
                    </Link>
                  </div> */}
                  {/* <div className="social-login">
                    <Link
                      to="#"
                      className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                    >
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/facebook.svg"
                          className="img-fluid"
                          alt="Facebook"
                        />
                      </span>
                      Log in with Facebook
                    </Link>
                  </div> */}
                  {/* /Social Login */}
                </form>
              </div>
            </div>
          </div>
        </div>
        {phoneValidatorError && (
          <>
            <div
              className="p-2 location-alert homepage-error"
              role="alert"
            >
              <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Error
              </span>
              <span className="font-semibold mr-2 text-left flex-auto text-xs">
                Enter a valid phone number
              </span>
            </div>
          </>
        )}
        {error && (
          <div className="alert error-login-message mt-2" role="alert">
            <div
              className="p-2 location-alert homepage-error"
              role="alert"
            >
              <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Error
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                {error}
              </span>
            </div>
          </div>
        )}
        <footer className="log-footer">
          <div className="container-fluid">
            <div className="copyright">
              <div className="copyright-text">
                <p>© 2024 SpinTrip. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
