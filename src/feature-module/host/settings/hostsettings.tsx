import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HostSettingsSidebar from "./hostsettingssidebar";
import Aos from "aos";
import DashboardMenu from "../dashboardmenu";
import { all_routes } from "../../router/all_routes";
import { getHostProfile, putHostUpdateProfile } from "../../api/Profile";
import { useDispatch } from "react-redux";
import { setHostCars, sethostProfile } from "../../redux/action";
import dayjs from "dayjs";
//import ImageWithBasePath1 from "../../../core/data/img/ImageWithBasePath1";
import { Helmet } from "react-helmet";

const HostSettings: React.FC = () => {
  const [profileData, setProfileData] = useState({
    profilePic: "",
    fullName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    aadharNumber: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const [success, setSuccess] = useState(false); // Add success state
  const [profileUpdatedAt, setProfileUpdatedAt] = useState<any>(); // Add profile updated state

  const dispatch = useDispatch();
  const route = all_routes;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(route.signup);
      return;
    }
    fetchHostProfile();
    Aos.init({ duration: 1200, once: true });
  }, []);

  const fetchHostProfile = async () => {
    try {
      const response = await getHostProfile(); // Ensure the response is properly parsed
      if (response && response.profile) {
        const { profile, hostDetails, cars } = response; // Destructure the necessary fields
        dispatch(setHostCars(cars));
        dispatch(sethostProfile(profile));
        const nameParts = profile.fullName
          ? profile.fullName.split(" ")
          : ["", ""]; // Split fullName
        setProfileData({
          profilePic: profile.profilePic || "assets/img/profiles/avatar-02.jpg",
          fullName: nameParts[0] || "",
          lastName: nameParts[1] || "",
          email: profile.email || "",
          phone: profile.phone || "",
          address: profile.address || "",
          aadharNumber: profile.aadharNumber || "",
        });
        setProfileUpdatedAt(hostDetails); // Set profile updated data
      } else {
        console.error("Invalid profile data:", response);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const updateData = {
        fullName: `${profileData.fullName} ${profileData.lastName}`,
        aadharId: profileData.aadharNumber,
        email: profileData.email,
        address: profileData.address,
      };
      const response = await putHostUpdateProfile(updateData);
      if (response) {
        setSuccess(true); // Show success message
        setLoading(false); // Stop loading
        fetchHostProfile(); // Fetch updated profile data
        setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div>
      <Helmet>
        <title>Host Settings| Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Communicate with renters and Spintrip Car Rentals support through our messaging system. Send and receive messages regarding your car rental listings and inquiries in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals host settings page, DL Verification, photo verification, car rental listings inquiries, car rental messages Bangalore"
        />
      </Helmet>
    
    <div className="main-wrapper">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Host Settings</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={route.hostdashboard}>Host Dashboard</Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb Section */}
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
            <HostSettingsSidebar />
            {/* /Settings Menu */}
            {/* Settings Details */}
            <div className="col-lg-9">
              <div className="settings-info">
                <div className="settings-sub-heading">
                  <h4>Profile</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* Basic Info */}
                  <div className="profile-info-grid">
                    <div className="profile-info-header">
                      <h5>Basic Information</h5>
                      <p>Information about user</p>
                    </div>
                    <div className="profile-inner">
                      <div className="profile-info-pic">
                        {/* <div className="profile-info-img">
                                          <ImageWithBasePath1
                                            src={profileData.profilePic || "assets/img/profiles/avatar-02.jpg"}
                                            alt="Profile"
                                          />
                                          <ImageWithBasePath1
                                            src={"assets/img/profiles/avatar-02.jpg"}
                                            alt="Profile image"
                                          />
                                          </div> */}
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="profile-form-group">
                            <label>
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control border"
                              name="fullName"
                              placeholder="Enter First Name"
                              value={profileData.fullName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="profile-form-group">
                            <label>
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control border"
                              name="lastName"
                              placeholder="Enter Last Name"
                              value={profileData.lastName}
                              onChange={handleChange}
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
                              className="form-control border font-mono"
                              name="phone"
                              placeholder="+ 91 "
                              value={profileData.phone}
                              onChange={handleChange}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control border"
                              name="email"
                              placeholder="Enter Email"
                              value={profileData.email}
                              onChange={handleChange}
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
                              className="form-control border font-mono"
                              name="aadharNumber"
                              placeholder="Enter Aadhaar Number"
                              value={profileData.aadharNumber}
                              onChange={handleChange}
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
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Address Info */}
                  {/* Profile Submit */}
                  <div className="profile-submit-btn">
                    <Link to="#" className="btn btn-secondary">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                  {/* /Profile Submit */}
                  {success && (
                    <div className="alert alert-success mt-3">
                      Profile updated successfully!
                    </div>
                  )}
                </form>
              </div>
              {/* Profile Updated At Section */}
              {profileUpdatedAt && (
                <div className="col-md-12 mb-4 mt-5">
                  {" "}
                  {/* Added mt-5 for margin top */}
                  <div className="rounded border">
                    <div
                      className="card-header rounded-top p-3"
                      style={{ backgroundColor: "#FE8D3D", color: "white" }}
                    >
                      {" "}
                      {/* Inline style */}
                      <h3 className="card-title">
                        Host Profile Updated Information
                      </h3>
                    </div>
                    <div className="card-body p-3">
                      <p className="mb-2 font-mono">
                        <strong>ID:</strong> {profileUpdatedAt["id"]}
                      </p>
                      <p className="mb-2 font-mono">
                        <strong>Created At:</strong>{" "}
                        {dayjs(profileUpdatedAt["createdAt"]).format(
                          "DD/MM/YYYY",
                        )}
                      </p>
                      <p className="mb-2 font-mono">
                        <strong>Updated At:</strong>{" "}
                        {dayjs(profileUpdatedAt["updatedAt"]).format(
                          "DD/MM/YYYY",
                        )}
                      </p>
                      {/* <p className="mb-2"><strong>Name:</strong> {profileUpdatedAt['fullName'] || 'N/A'}</p>
                              <p className="mb-2"><strong>Email:</strong> {profileUpdatedAt['email'] || 'N/A'}</p> */}
                      <p className="mb-2">
                        <strong>Verification Status:</strong>{" "}
                        {profileUpdatedAt["verificationStatus"] ||
                          "Not Verified"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* /Settings Details */}
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
    </div>
  );
};

export default HostSettings;
