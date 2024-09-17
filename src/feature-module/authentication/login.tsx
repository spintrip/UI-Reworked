import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/action";
import { Switch } from "@headlessui/react";
import { validateUserOTP, validateusersign } from "../api/Auth";
import "react-phone-input-2/lib/style.css";
import { Helmet } from "react-helmet";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const route = all_routes;
const Login = () => {
  const [isOTP, setIsOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"user" | "host">("user");
  //const [otpContainer, setOtpContainer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [phoneValidatorError, setPhoneValidatorError] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [resendDisabled, setResendDisabled] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setResendDisabled(false);
      return;
    }

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown]);

  async function signInClickHandler() {
    setPhoneValidatorError(false);
    if (!validatePhoneNumber(phone)) {
      setPhoneValidatorError(true);
      return;
    }

    const finalNumber = "+91" + phone;
    // setPhone(finalNumber);
    try {
      setIsLoading(true);
      setError(null); // Reset error message
      await validateusersign(finalNumber, "1234", enabled, (response: any) => {
        if (response.status === 200) {
          setIsOTP(true); // Set isOTP to true to switch to OTP verification mode
          //const otp1 = response.data.otp;
          // setOtpContainer(otp1);
          setCountdown(30);
          setResendDisabled(true);
        } else if (response.status === 404 || response.status === 401) {
          setError(enabled ? "Host not found." : "User not found.");
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error in signInClickHandler:", error);
      setError("Sign-in failed. Please try again.");
      setIsLoading(false);
    }
  }

  const otpCallBack = async (response: { status: any; data: any }) => {
    setIsLoading(false);
    if (response.status === 200) {
      dispatch(setAuthToken(response.data.token));
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("Host", enabled ? "1" : "0");
      navigate(enabled ? route.hostdashboard : route.home);
    } else if (response.status === 401) {
      setError("Invalid OTP");
    }
  };

  async function otpSignInHandler() {
    const finalNumber = "+91" + phone;
    setIsLoading(true);
    validateUserOTP(finalNumber, otp, otpCallBack);
  }
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
      <Helmet>
        <GoogleAnalyticsScript/>
        <title>Login | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Login to your Spintrip Car Rentals account to manage your bookings, view rental history, and access exclusive deals on self-drive car rentals in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals login, manage bookings Bangalore, car rental account access, view rental history, exclusive car rental deals, self-drive car rentals Bangalore"
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
              <div className="login-auth-wrap p-2">
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
                    Back To Home
                  </Link>
                </div>
                <h2 className="create-account-text">
                  Sign in to your Spintrip account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or{" "}
                  <Link
                    to={route.signup}
                    className="authorization-link"
                  >
                    <span></span> create an account here
                  </Link>
                </p>
                <div className="authorization-check">
                  <div className="flex items-center justify-center full mt-10">
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
                </div>
                <div className="input-block">
                  <label className="form-label">
                    Phone No <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="p-1 form-control h-[45px] d-flex align-items-center justify-content-center border rounded mr-1 bg-light"
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
                      className="form-control font-mono text-center border border-gray font-semibold"
                      onChange={handlePhoneChange}
                      placeholder="Enter Phone"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="input-block">
                  {!isOTP ? (
                    <div>
                      <label className="form-label">
                        OTP <span className="text-danger">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          className="form-control text-center border border-gray custom-otp-style"
                          onChange={(event) => setOtp(event.target.value)}
                          placeholder="Enter OTP"
                          maxLength={4}
                          disabled
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="form-label">
                        OTP <span className="text-danger">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          className="form-control text-center border border-gray font-semibold custom-otp-style"
                          onChange={(event) => setOtp(event.target.value)}
                          maxLength={4}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="input-block">
                  

                  {isOTP ? (
                    <button
                      className="btn btn-outline-light w-100 btn-size mt-1"
                      onClick={otpSignInHandler}
                    >
                      {isLoading ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-light w-100 btn-size mt-1"
                      onClick={signInClickHandler}
                    >
                      {isLoading ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Request OTP"
                      )}
                    </button>
                  )}
                </div>
                {isOTP && countdown !== null && (
                  <div className="mt-2 text-center">
                    {countdown > 0 ? (
                      <p>Resend OTP in {countdown}s</p>
                    ) : (
                      <button
                        className="btn btn-outline-primary btn-size"
                        style={{ fontSize: "14px" }}
                        onClick={signInClickHandler}
                        disabled={resendDisabled}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                )}
                {/* /Social Login */}
              </div>
            </div>
          </div>
        </div>
        {error && (
          <>
            <div
              className="p-2 location-alert homepage-error"
              role="alert"
            >
              <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Error
              </span>
              <span className="font-semibold mr-2 text-left flex-auto text-xs">
                {error}
              </span>
            </div>
          </>
        )}
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

export default Login;
