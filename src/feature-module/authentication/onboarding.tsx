import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { motion, AnimatePresence } from "framer-motion";
import { putUpdateProfile, putHostUpdateProfile, putVerify, putHostVerify } from "../api/Profile";

const Onboarding = () => {
  const navigate = useNavigate();
  const route = all_routes;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: localStorage.getItem("UserRole") || "user", 
  });
  const [idFile, setIdFile] = useState<File | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [errorVisible, setErrorVisible] = useState("");

  const nextStep = () => {
    if (step === 1 && formData.role === "user") {
      setStep(3); // Skip to success for Guests
    } else {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (step === 3 && formData.role === "user") {
      setStep(1);
    } else {
      setStep((s) => s - 1);
    }
  };

  const handleComplete = async () => {
    if (!formData.fullName || !formData.email) {
      setErrorVisible("Please provide your name and email.");
      return;
    }
    
    setIsCompleting(true);
    setErrorVisible("");
    
    try {
      if (formData.role === "host") {
        await putHostUpdateProfile({
          fullName: formData.fullName,
          email: formData.email,
          businessName: "", // Placeholder or optional
        });
        
        if (idFile) {
          const verifyData = new FormData();
          verifyData.append("verification_id_front", idFile);
          await putHostVerify(verifyData);
        }
      } else {
        await putUpdateProfile(null, {
          fullName: formData.fullName,
          email: formData.email
        });
        
        if (idFile) {
          const verifyData = new FormData();
          verifyData.append("verification_id_front", idFile);
          await putVerify(verifyData, () => {});
        }
      }
      
      const redirectPath = formData.role === "host" ? route.hostdashboard : route.home;
      navigate(redirectPath);
    } catch (err) {
      console.error("Onboarding Persistence Error:", err);
      setErrorVisible("Failed to save profile. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="login-wrapper premium-auth-bg">
      <Helmet>
        <title>Onboarding | Spintrip</title>
      </Helmet>

      <div className="loginbox glass-card onboarding-card">
        <div className="login-auth">
          <div className="login-auth-wrap">
            <div className="sign-group text-center mb-4">
              <Link to={route.home}>
                <ImageWithBasePath src="assets/img/logo.svg" alt="Logo" className="img-fluid auth-logo" />
              </Link>
            </div>

            <div className="onboarding-stepper mb-4">
              <div className={`step-node ${step >= 1 ? 'active' : ''}`}>1</div>
              <div className="step-line" />
              {formData.role === "host" && (
                <>
                  <div className={`step-node ${step >= 2 ? 'active' : ''}`}>2</div>
                  <div className="step-line" />
                </>
              )}
              <div className={`step-node ${step >= 3 ? 'active' : ''}`}>
                {formData.role === "host" ? "3" : "2"}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="step-content"
                >
                  <h3 className="text-center font-bold mb-2">Let's get started!</h3>
                  <p className="text-center text-muted mb-4">Tell us a bit about yourself to personalize your experience.</p>
                  
                  <div className="form-group mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter your name" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  {errorVisible && step === 1 && <div className="text-danger small mb-3 text-center">{errorVisible}</div>}
                  <button className="btn btn-primary w-100 rounded-pill btn-lg shadow-sm" onClick={nextStep}>
                    Continue
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="step-content"
                >
                  <h3 className="text-center font-bold mb-2">Verify Identity</h3>
                  <p className="text-center text-muted mb-4">Security is our priority. Please upload a valid ID.</p>
                  
                  <div className="upload-zone p-4 text-center border-dashed rounded-4 mb-4">
                    <i className="feather-upload-cloud fs-1 text-primary mb-2" />
                    <p className="small mb-0">{idFile ? idFile.name : "Click to upload DL or Aadhar Card"}</p>
                    <input 
                      type="file" 
                      className="d-none" 
                      id="idUpload" 
                      onChange={(e) => e.target.files && setIdFile(e.target.files[0])}
                    />
                    <label htmlFor="idUpload" className="stretched-link cursor-pointer" />
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button className="btn btn-light w-50 rounded-pill" onClick={prevStep}>Back</button>
                    <button className="btn btn-primary w-50 rounded-pill" onClick={nextStep}>Next</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="step-content text-center"
                >
                  <div className="success-icon mb-4">
                    <i className="feather-check-circle text-success" style={{fontSize: '4rem'}} />
                  </div>
                  <h3 className="font-bold mb-2">All Set!</h3>
                  <p className="text-muted mb-4">Your profile is ready. You're now part of the Spintrip community.</p>
                  
                  {errorVisible && step === 3 && <div className="text-danger small mb-3 text-center">{errorVisible}</div>}
                  <button 
                    className="btn btn-primary w-100 rounded-pill btn-lg shadow-sm" 
                    onClick={handleComplete}
                    disabled={isCompleting}
                  >
                    {isCompleting ? "Saving..." : "Go to Dashboard"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      <div className="auth-footer text-center mt-4">
        <p className="text-muted small">© 2026 Spintrip. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Onboarding;
