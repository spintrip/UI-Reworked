import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/action";
import { Switch } from "@headlessui/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import CarRentalIcon from '@mui/icons-material/CarRental';
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
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
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

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus on the next input field
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const previousInput = document.getElementById(`otp-${index - 1}`);
      if (previousInput) {
        (previousInput as HTMLInputElement).focus();
      }
    }
  };

  const getOtpString = () => otp.join("");

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
    const finalOtp = getOtpString();
    console.log("otp here:", finalOtp);
    setIsLoading(true);
    validateUserOTP(finalNumber, finalOtp , otpCallBack);
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
                          <label className="create-account-text">Sign in to your <span className="logo-name">Spintrip</span> account or {" "}
                            <Link
                              to={route.signup}
                              className="authorization-link"
                            >
                              <span></span> Sign Up
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
                        <div className="signup-input-group">
                          <label>OTP</label>
                          <div className="d-flex justify-content-center gap-2">
                            {otp.map((digit, index) => (
                              <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                className="form-control text-center border border-gray font-semibold font-mono otp-input"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                maxLength={1}
                                required
                              />
                            ))}
                          </div>
                        </div>
                        {isOTP ? (
                          <button
                            className="signup-btn"
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
                            className="signup-btn"
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
              </div>
              <div className="signup-image"></div>
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
      </div>
    </div>
  );
};

export default Login;
