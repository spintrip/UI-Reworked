import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import PersonIcon from '@mui/icons-material/Person';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from "react-helmet";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";
import AOS from 'aos';
import 'aos/dist/aos.css';

const route = all_routes;

const SignUp = () => {
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState<"user" | "host">("user");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleContinue = () => {
        // Unify with login since the backend handles sign-up/login combo effectively
        navigate(`${route.login}?phone=${phone}&role=${role}`);
    };

    return (
        <div className="auth-page-wrapper">
            <Helmet>
                <title>Join Us | Absolute Best Experience</title>
                <GoogleAnalyticsScript />
            </Helmet>

            <div className="amazing-auth-card" data-aos="zoom-in">
                <Link to={route.home} className="brand-logo-centric">
                    <ImageWithBasePath src="assets/img/Spintrip_logo.png" alt="Logo" />
                </Link>

                <div data-aos="fade-up">
                    <h1>Create Account</h1>
                    <p className="auth-subtitle">Join the Spintrip community as a Guest or Host</p>

                    <div className="role-selection-grid" style={{gridTemplateColumns: '1fr 1fr'}}>
                        <div className={`role-card ${role === 'user' ? 'active' : ''}`} onClick={() => setRole('user')}>
                            <PersonIcon className="role-icon" />
                            <span>I want a ride</span>
                        </div>
                        <div className={`role-card ${role === 'host' ? 'active' : ''}`} onClick={() => setRole('host')}>
                            <CarRentalIcon className="role-icon" />
                            <span>I want to host</span>
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
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                                maxLength={10}
                                autoFocus
                            />
                        </div>
                    </div>

                    <button 
                        className="auth-primary-btn" 
                        disabled={isLoading || phone.length < 10}
                        onClick={handleContinue}
                    >
                        {isLoading ? "Preparing..." : "Continue to Sign Up"}
                    </button>

                    <p className="mt-4 text-muted small">
                        Already have an account? <Link to={route.login} className="text-primary font-bold">Sign In</Link>
                    </p>

                    <div className="mt-3">
                        <Link to={route.home} className="text-muted small d-flex align-items-center justify-content-center gap-2 hover:text-primary transition-all">
                            <ArrowBackIcon style={{fontSize: '14px'}} />
                            Back to website
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
