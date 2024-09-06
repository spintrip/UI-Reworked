import React, { useEffect, useState, useCallback  } from "react";
import { Link, useNavigate } from "react-router-dom";
//import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import SettingsSidebar from "./settingssidebar";
import Aos from "aos";
import DashboardMenu from "../dashboardmenu";
import { all_routes } from "../../router/all_routes";
import { getProfile, putUpdateProfile } from "../../api/Profile";
import ImageWithBasePath1 from "../../../core/data/img/ImageWithBasePath1";
import useScrollToTop from "../../../hooks/useScrollToTop";

const UserSettings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  if (!token) {
    navigate(all_routes.signup);
    return null;
  }
  useScrollToTop();
  const [profileData, setProfileData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dlNumber: "",
    aadharId: "",
    profilePic: "",
    verificationStatus: 0,
  });
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const route = all_routes;
  const defaultImage = "/assets/img/profiles/addprofilepic.jpg";


  const fetchProfile = useCallback(async () => {
    const profile = await getProfile();
    if (profile && profile.profile) {
      const names = profile.profile.fullName
        ? profile.profile.fullName.split(" ")
        : [];
      const firstName = names[0];
      const lastName = names.slice(1).join(" ");
      setProfileData({
        userId: profile.profile.id,
        firstName: firstName || "",
        lastName: lastName || "",
        email: profile.profile.email || "",
        phone: profile.phone || profile.user.phone || "",
        address: profile.profile.address || "",
        dlNumber: profile.profile.dlNumber || "",
        aadharId: profile.profile.aadharNumber || "",
        profilePic: profile.profile.profilePic.length > 0 ? profile.profile.profilePic[0] : "",
        verificationStatus: profile.profile.verificationStatus || 0,
      });
      checkProfileCompleteness(profile.profile);
    }
  }, []);
  

  useEffect(() => {
    fetchProfile();
    Aos.init({ duration: 1200, once: true });
  }, [fetchProfile]);
  

  useEffect(() => {
    checkProfileCompleteness(profileData);
  }, [profileData]);

  const checkProfileCompleteness = (profile: {
    userId?: string;
    firstName: any;
    lastName: any;
    email: any;
    phone: any;
    address: any;
    dlNumber: any;
    aadharId: any;
    profilePic: any;
    verificationStatus?: number;
  }) => {
    const isComplete =
      profile.firstName &&
      profile.lastName &&
      profile.email &&
      profile.phone &&
      profile.address &&
      profile.dlNumber &&
      profile.aadharId &&
      profile.profilePic;
    setIsProfileComplete(isComplete);
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    const fullName = `${profileData.firstName.trim()} ${profileData.lastName.trim()}`;
    const combinedAddress = `${profileData.address}`;
    const updateData = {
      ...profileData,
      fullName,
      address: combinedAddress,
    };

    try {
      const response = await putUpdateProfile(profileData.userId, updateData);
      if (response) {
        setProfileData({
          ...profileData,
          ...response,
        });
        checkProfileCompleteness(response);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpload = () => {
    if (profileData.profilePic === "") {
      navigate(route.security);
    }
  };
  return (
    <div className="main-wrapper">
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">User Profile</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={route.home}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadscrumb Section */}
      {/* Dashboard Menu */}
      <DashboardMenu />
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Content Header */}
          <div className="content-header content-settings-header">
            <h4>Settings</h4>
          </div>
          {/* /Content Header */}
          <div className="row">
            {/* Settings Menu */}
            <SettingsSidebar />
            {/* /Settings Menu */}
            {/* Settings Details */}
            <div className="col-lg-9">
              <div className="settings-info">
                <div className="settings-sub-heading">
                  <h4>Profile</h4>
                </div>
                {profileData.verificationStatus === 0 && (
                  <div className="alert alert-warning" role="alert">
                    Your profile is incomplete.
                  </div>
                )}
                {profileData.verificationStatus === 1 && (
                  <div className="alert alert-warning" role="alert">
                    Your profile verification is pending.
                  </div>
                )}
                {profileData.verificationStatus === 2 && (
                  <div className="alert alert-success" role="alert">
                    Your profile is verified.
                  </div>
                )}
                {!isProfileComplete && (
                  <div className="alert alert-warning" role="alert">
                    Please complete your profile to continue.
                  </div>
                )}
                <form onSubmit={handleProfileUpdate}>
                  {/* Basic Info */}
                  <div className="profile-info-grid">
                    <div className="profile-info-header">
                      <h5>Basic Information</h5>
                      <p>Information about user</p>
                    </div>
                    <div className="profile-inner">
                    {profileData.profilePic ? (
                      <div className="profile-info-pic">
                      <div className="profile-info-img">
                        
                          <ImageWithBasePath1
                            src={profileData.profilePic}
                            alt="Profile"
                            className="w-100 h-100 object-fit-cover"
                          />
                      </div>
                      </div>
                      ) : (
                      <Link to={route.security}>    
                        <div className="profile-info-pic">
                          <div className="profile-info-img">
                              <img
                                src={defaultImage}
                                alt="img"
                                onClick={handleProfileUpload} 
                                className="w-100 h-100 object-fit-cover"
                              />
                          </div>
                        </div>
                      </Link>
                      )}
                      <div className="row">
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              className="form-control border"
                              placeholder="First Name"
                              value={profileData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              className="form-control border"
                              placeholder="Last Name"
                              value={profileData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              Driving License Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="dlNumber"
                              className="form-control border font-mono"
                              placeholder="Enter DL Number"
                              value={profileData.dlNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              Phone Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="phone"
                              className="form-control border font-mono"
                              placeholder="+ 91 "
                              value={profileData.phone}
                              readOnly
                              required
                            />
                            <p className="mt-1">
                              Contact Support to change phone number
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="email"
                              className="form-control border"
                              placeholder="Enter email"
                              value={profileData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              Aadhaar Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="aadharId"
                              className="form-control border font-mono"
                              placeholder="Enter Adhaar Number"
                              value={profileData.aadharId}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Basic Info */}
                  {/* Address Info */}
                  <div className="profile-info-grid">
                    <div className="profile-info-header">
                      <h5>Address Information</h5>
                      <p>Information about address of user</p>
                    </div>
                    <div className="profile-inner">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="profile-form-group">
                            <label>
                              Address <span className="text-danger">*</span>
                            </label>
                            <textarea
                              className="form-control border"
                              name="address"
                              placeholder="Enter Address"
                              value={profileData.address}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Address Info */}
                  {/* Profile Submit */}
                  <div className="profile-submit-btn">
                    <button type="button" className="btn btn-secondary">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary border border-amber-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    {isSuccess && (
                      <p className="mt-2 text-success">
                        Profile updated successfully!
                      </p>
                    )}
                  </div>
                  {/* /Profile Submit */}
                </form>
              </div>
            </div>
            {/* /Settings Details */}
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default UserSettings;
