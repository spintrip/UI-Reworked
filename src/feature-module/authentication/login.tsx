import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/action";
import PersonIcon from '@mui/icons-material/Person';
import CarRentalIcon from '@mui/icons-material/CarRental';
import GroupsIcon from '@mui/icons-material/Groups';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { validateUserOTP, validateusersign } from "../api/Auth";
import { Helmet } from "react-helmet";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";
import AOS from 'aos';
import 'aos/dist/aos.css';

const route = all_routes;

const Login = () => {
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const [role, setRole] = useState<"user" | "host" | "superhost" | "driver">("user");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        if (countdown === null || countdown <= 0) return;
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        if (val.length <= 10) setPhone(val);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleRequestOTP = async () => {
        if (phone.length < 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }

        setIsLoading(true);
        setError(null);

        const isHost = role !== "user";
        const finalNumber = "+91" + phone;

        try {
            await validateusersign(finalNumber, "1234", isHost, (response: any) => {
                setIsLoading(false);
                if (response.status === 200) {
                    setStep("otp");
                    setCountdown(30);
                } else {
                    setError(response.message || "Failed to send OTP. Please try again.");
                }
            });
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        const fullOtp = otp.join("");
        if (fullOtp.length < 4) {
            setError("Please enter the 4-digit OTP");
            return;
        }

        setIsLoading(true);
        const finalNumber = "+91" + phone;

        validateUserOTP(finalNumber, fullOtp, (response: any) => {
            setIsLoading(false);
            if (response.status === 200) {
                const token = response.data.token;
                dispatch(setAuthToken(token));
                localStorage.setItem("authToken", token);
                localStorage.setItem("Host", role !== "user" ? "1" : "0");
                localStorage.setItem("UserRole", role);
                
                // Strictly rely on the backend's determination for onboarding
                const isNewUser = response.data.isNewUser;
                
                if (isNewUser) {
                    navigate(route.onboarding);
                } else if (role === "user") {
                    navigate(route.home);
                } else {
                    navigate(route.hostdashboard);
                }
            } else {
                setError("Invalid OTP. Please try again.");
            }
        });
    };

    return (
        <div className="auth-page-wrapper">
            <Helmet>
                <title>Login | Absolute Best Experience</title>
                <GoogleAnalyticsScript />
            </Helmet>

            <div className="amazing-auth-card" data-aos="zoom-in">
                <Link to={route.home} className="brand-logo-centric">
                    <ImageWithBasePath src="assets/img/Spintrip_logo.png" alt="Logo" />
                </Link>

                {step === "phone" ? (
                    <div data-aos="fade-up">
                        <h1>Welcome Back</h1>
                        <p className="auth-subtitle">Choose your role and continue with your phone</p>

                        <div className="role-selection-grid">
                            <div className={`role-card ${role === 'user' ? 'active' : ''}`} onClick={() => setRole('user')}>
                                <PersonIcon className="role-icon" />
                                <span>Guest</span>
                            </div>
                            <div className={`role-card ${role === 'host' ? 'active' : ''}`} onClick={() => setRole('host')}>
                                <CarRentalIcon className="role-icon" />
                                <span>Host</span>
                            </div>
                            <div className={`role-card ${role === 'driver' ? 'active' : ''}`} onClick={() => setRole('driver')}>
                                <DirectionsCarIcon className="role-icon" />
                                <span>Driver</span>
                            </div>
                        </div>

                        <div className="auth-form-group">
                            <label>Phone Number</label>
                            <div className="phone-input-wrapp">
                                <div className="country-code-pill">
                                    <ImageWithBasePath src="assets/img/india-flag.png" alt="IN" width={20} />
                                    <span>+91</span>
                                </div>
                                <input 
                                    type="tel" 
                                    placeholder="Enter mobile number"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && <div className="text-danger small mb-3 font-semibold">{error}</div>}

                        <button 
                            className="auth-primary-btn" 
                            disabled={isLoading || phone.length < 10}
                            onClick={handleRequestOTP}
                        >
                            {isLoading ? "Processing..." : "Continue"}
                        </button>

                        <div className="mt-4">
                            <Link to={route.home} className="text-muted small d-flex align-items-center justify-content-center gap-2 hover:text-primary transition-all">
                                <ArrowBackIcon style={{fontSize: '14px'}} />
                                Back to website
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div data-aos="fade-left">
                        <h1>Verify OTP</h1>
                        <p className="auth-subtitle">Sent to +91 {phone}</p>

                        <div className="otp-grid">
                            {otp.map((digit, idx) => (
                                <input 
                                    key={idx}
                                    id={`otp-${idx}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                    autoFocus={idx === 0}
                                />
                            ))}
                        </div>

                        {error && <div className="text-danger small mb-3 font-semibold">{error}</div>}

                        <button 
                            className="auth-primary-btn" 
                            disabled={isLoading || otp.join("").length < 4}
                            onClick={handleVerifyOTP}
                        >
                            {isLoading ? "Verifying..." : "Verify & Sign In"}
                        </button>

                        <div className="mt-4 text-center">
                            {countdown && countdown > 0 ? (
                                <span className="text-muted small">Resend OTP in {countdown}s</span>
                            ) : (
                                <button className="btn btn-link text-primary small p-0 fw-bold" onClick={handleRequestOTP}>
                                    Resend Code
                                </button>
                            )}
                            <button className="btn btn-link text-muted small d-block mx-auto mt-2" onClick={() => setStep("phone")}>
                                Change Phone Number
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
