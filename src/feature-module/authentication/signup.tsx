import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { Switch } from "@headlessui/react";
import { setIsLoading } from "../redux/action";
import "react-phone-input-2/lib/style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import serverApiUrl from "../api/server";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import CarRentalIcon from '@mui/icons-material/CarRental';
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
      const phoneWithCountryCode = phone.startsWith("+91") ? phone : "+91" + phone;
      
      console.log(phone, selectedRole, password )

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
      setTimeout(() => {
        setError("");
      }, 5000);
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

      setTimeout(() => {
        setPhoneValidatorError(false);
      }, 5000);
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
      <HelmetProvider>
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
      </HelmetProvider>
      <div className="main-login-body">
        <header className="logo-header py-3 d-flex align-items-center justify-content-center">
          <Link to={route.home}>
            <ImageWithBasePath
              className="spintrip-logo"
              src="assets/img/Spintrip_logo.png"
              alt="Logo"
            />
          </Link>
        </header>
        <div className="">
          <div className="signup-cover">
            <div className="sign-up">
            
                <div className="signup-form-container">
                <span className="sign-group">
                  <Link
                    to={route.home}
                    className="text-black font-semibold "
                  >
                    <span>
                    <ArrowBackIcon style={{ marginRight: '8px', color: '#000' }} />
                    </span>{" "}
                    <span className="ml-2 mt-1 mb-2">Back To Home</span>
                    
                  </Link>
                </span>
                <div className="title-logo">
                    <ImageWithBasePath className="brand-logo" src="assets/img/logo-fit.png" alt="logo"/>
                </div>
                <div className="authorization-check">
                <button
                  onClick={handleUserSelect}
                  className={classNames(
                    selectedRole === "user" ? "button-on" : "button-off",
                    "flex items-center justify-center"
                  )}
                >
                  <PersonIcon
                    style={{
                      color: selectedRole === "user" ? "#FFFFFF" : "#e9660f",
                      fontSize: "1.5rem",
                    }}
                  />
                  <span className="role-type">User</span>
                </button>
                <button
                  onClick={handleHostSelect}
                  className={classNames(
                    selectedRole === "host" ? "button-on" : "button-off",
                    "flex items-center justify-center"
                  )}
                >
                  <CarRentalIcon
                    style={{
                      color: selectedRole === "host" ? "#FFFFFF" : "#e9660f", 
                      fontSize: "1.5rem", 
                  }}/>
                  <span className="role-type">Host</span>
                </button>
                </div>
                    <div className="signup-form-group">
                      <div className="signup-input-group">
                          <label className="create-account-text">Create your <span className="logo-name">Spintrip</span> account or {" "}
                            <Link
                              to={route.login}
                              className="authorization-link"
                            >
                              <span></span> Sign in
                            </Link>
                          </label>
                      </div>
                      <div className="signup-input-group">
                          <label>Phone</label>
                          <div className="d-flex align-items-center justify-content-center">
                            <span
                              className="country-flag-signup"
                            >
                              <span className=" mx-1 country-digit">+91</span>
                              <ImageWithBasePath
                                src="assets/img/india-flag.png"
                                alt="Icon"
                                className="country-flag"
                              />
                            </span>
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
                       onClick={signUpClickHandler}
                       className="signup-btn"
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
                    </div>
                    <footer className="log-footer">
                          <div className="copyright-text">
                            <p>© 2024 SpinTrip. All Rights Reserved.</p>
                          </div>
                    </footer>
                </div>
                <div className="signup-image"></div>
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
        
      </div>
    </div>
  );
};

export default SignUp;
