import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { all_routes } from "../router/all_routes";
import DashboardMenu from "./dashboardmenu";
import AddNewCar from "../../core/data/modals/addNewVehicle";
// import AddNewCarAdditional from "../../../core/data/modals/addNewCarAdditional";
import dayjs from "dayjs";
import { setSelectedHostCarId, fetchHostProfile } from "../redux/action";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { getAllActiveSubscriptions, getAllSubscriptions } from "../api/Cars";
export interface Subscription {
  PlanType: string;
  vehicleType: number; // Assuming 1 for car, 2 for bike, etc.
  PlanName: string;
  expiry: number; // in months
  amount: number;
  Remarks: string | null;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}


interface Profile {
  subscription: Subscription[];
}

interface RootState {
  profile: {
    profile: Profile;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
  };
}
interface Brand {
  [x: string]: string;
  brand_name: string;
  logo_path: string;
}
const HostSubscriptions = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const status = useSelector((state: RootState) => state.profile.status);
  const error = useSelector((state: RootState) => state.profile.error);
  const [subscriptions, setSubscriptions] = useState<Brand[]>([]);
  const [activesubscriptions, setActiveSubscriptions] = useState<Brand[]>([]);
  const [selectedQRSubscriptionIndex, setSelectedQRSubscriptionIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrSubscriptionIndex, setQRSubscriptionIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedsubscriptions = await getAllSubscriptions();
      console.log("Fetched Subscriptions:", fetchedsubscriptions);
      setSubscriptions(fetchedsubscriptions);
    };
    const fetchActiveSubscription = async () => {
      const fetchedsubscriptions = await getAllActiveSubscriptions();
      setActiveSubscriptions(fetchedsubscriptions);
    };
    fetchBrands();
    fetchActiveSubscription();
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(all_routes.signup);
      return;
    }
    dispatch<any>(fetchHostProfile());
  }, [dispatch, navigate]);

  const handleCarClick = (carId: any, carModel: any, carDetails: Subscription) => {
    if (profile && profile.subscription && carId) {
      if (carId) {
        dispatch(setSelectedHostCarId(carId, carModel, carDetails));

        navigate(route.hostCarDetails, {
          state: { carId, carModel, carDetails },
        });
      } else {
        console.error("Car ID not found for carId:", carId);
      }
    } else {
      console.error("Profile or carId is missing:", profile, carId);
    }
  };

  const refreshPage = () => {
    dispatch<any>(fetchHostProfile());
  };

  const extractYear = (dateString: string): string => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };
  // const getBrandLogo = (brandName: string): string | undefined => {
  //   const brand = brands.find(
  //     (b) => b.brand_name?.toLowerCase() === brandName?.toLowerCase(),
  //   );
  //   return brand ? brand.logo_path : undefined;
  // };

  const renderStars = (rating: number | any) => {
    const stars: JSX.Element[] = [];
    const filledStars = rating !== null ? rating : 0;
    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={i} className={`fas fa-star ${i}`} />);
    }
    return stars;
  };

  return (
    <div className="main-wrapper">
      {status === "loading" ? (
        <div className="min-h-screen min-w-screen d-flex align-items-center justify-content-center">
          <ImageWithBasePath src="assets/img/logo-fit.png" alt="loading" />
        </div>
      ) : (
        <>
          {error ? (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          ) : (
            <div>
              <Helmet>
                <title>All Vehicles | Spintrip Car Rentals</title>
                <meta
                  name="description"
                  content="Manage all your car listings on Spintrip Car Rentals. View and update your car details, availability, and pricing to attract more renters in Bangalore."
                />
                <meta
                  name="keywords"
                  content="Spintrip Car Rentals all car listings, manage car details, update availability, car rental pricing, attract renters Bangalore"
                />
              </Helmet>
              {/* Breadcrumb Section */}
              <div className="breadcrumb-bar">
                <div className="container">
                  <div className="row align-items-center text-center">
                    <div className="col-md-12 col-12">
                      <h2 className="breadcrumb-title">Subscriptions</h2>
                      <nav aria-label="breadcrumb" className="page-breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <Link to={route.home}>Home</Link>
                          </li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            Subscriptions
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
              <div className="content dashboard-content">
                <div className="container">
                  {/* Content Header */}
                  <div className="content-header">
                    <h4>Subscriptions</h4>
                  </div>
                  {/* /Content Header */}
                  {/* <div className="row">
                    <div className="col d-flex flex-row-reverse mb-3">
                      <Link
                        to="#"
                        className="btn btn-dark add-car-button"
                        onClick={() => setShowModal(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="plus-svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <span className="mx-2">Add Vehicles</span>
                      </Link>
                    </div>
                  </div> */}
                  <div className="row">
                    {/* Profile Information */}
                    {/* Wishlist */}

                    <div className="col-md-12">
                      {showQRModal && qrSubscriptionIndex !== null && (
                        <>
                          {/* Modal Backdrop */}
                          <div
                            style={{
                              position: "fixed",
                              top: 0,
                              left: 0,
                              width: "100vw",
                              height: "100vh",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              zIndex: 1040,
                            }}
                          />

                          {/* Modal Container */}
                          <div
                            style={{
                              position: "fixed",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 1050,
                              maxHeight: "90vh",
                              overflowY: "auto",
                            }}
                            className="modal d-block"
                            tabIndex={-1}
                            role="dialog"
                          >
                            <div className="modal-dialog modal-dialog-centered" role="document">
                              <div
                                className="modal-content shadow-lg bg-white text-dark rounded"
                                style={{ maxWidth: "400px", width: "100%" }}
                              >
                                {/* Modal Header */}
                                <div
                                  className="modal-header border-bottom d-flex justify-content-between align-items-center px-4 py-3"
                                >
                                  <h5 className="modal-title m-0">Payment</h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowQRModal(false)}
                                    aria-label="Close"
                                    style={{
                                      background: "none",
                                      border: "none",
                                      fontSize: "1.5rem",
                                      lineHeight: "1",
                                    }}
                                  >
                                    &times;
                                  </button>
                                </div>

                                {/* Modal Body */}
                                <div className="modal-body text-center px-4 py-4">
                                  <img
                                    src="/assets/qrs/QR_code.jpg"
                                    alt="QR Code"
                                    className="img-fluid mb-4"
                                    style={{ maxWidth: "220px", margin: "0 auto", display: "block" }}
                                  />
                                  <p className="modal-body text-center px-4 py-4" style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
                                    Scan the QR code using any UPI app to make the payment.
                                    <br />
                                    Your subscription will be activated within <strong>24 hours</strong>.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}


                      <div className="wishlist-wrap">




                        {/* Map host cars on `listview-car` */}
                        {subscriptions?.length === 0 ? (
                          <h2>No Subscriptons</h2>
                        ) : (

                          subscriptions?.map((sub, index) => {

                            const isActive = activesubscriptions.find(
                              (active) => active.PlanType === sub.PlanType
                            );


                            return (
                              <div
                                className="listview-car cursor-pointer"
                                key={index}
                                onClick={() => {
                                  if (!isActive) {
                                    setQRSubscriptionIndex(index);
                                    setShowQRModal(true);
                                  }
                                }}

                              >

                                <div className="card host-car-listing-card">

                                  <div className="blog-widget d-flex">
                                    <div className="bloglist-content w-100">
                                      <div className="card-body">
                                        <div className="blog-list-head d-flex">
                                          <div className="blog-list-title">
                                            <h3 className="d-flex align-items-center justify-content-center">


                                              {/* <span className="p-1 bg-website-primary rounded mr-2 text-white">
                                              #{index + 1}
                                            </span> */}
                                              {/* <div className=" d-flex align-items-center justify-content-start">
                                              {getBrandLogo(car.brand) && (
                                                <img
                                                  className="car-brand-logo"
                                                  src={getBrandLogo(car.brand)}  
                                                  alt={`${car.brand} logo`}
                                                />
                                              )}


                                            </div> */}
                                              <h5 className="mx-3 text-gray" style={{ fontWeight: '700' }}>{sub.PlanName || "NA"}</h5>
                                              <span className="mx-3 font-mono font-bold bg-website-primary p-1 text-white rounded">
                                                {sub.vehicleType == "1" ? "Bike" : sub.vehicleType == "2" ? "Car" : "NA"}
                                              </span>
                                              <span className="mx-3 font-mono font-bold p-1 ">
                                                {sub.amount ? "Rs. " + sub.amount : "NA"}
                                              </span>

                                            </h3>
                                            <h6>
                                            </h6>
                                          </div>
                                          <div className="blog-list-rate d-flex flex-column ">
                                            {isActive && <span className="badge bg-success">Subscribed</span>}
                                          </div>
                                        </div>


                                        <div className="blog-list-head list-head-bottom d-flex">
                                          <div className="blog-list-title">
                                            <div className="d-flex align-items-center justify-content-around flex-wrap">
                                              <div className="address-info">
                                                <h6>
                                                  {isActive?.PlanEndDate && (
                                                    <div className="address-info">
                                                      <h6>
                                                        Expiry Date: {dayjs(isActive.PlanEndDate).format("DD/MM/YYYY")}
                                                      </h6>
                                                    </div>
                                                  )}

                                                </h6>
                                              </div>

                                            </div>

                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>
                      {/* /Wishlist */}
                    </div>
                  </div>
                </div>

              </div>
              {/* /Page Content */}
              {showModal && (
                <AddNewCar onActionComplete={refreshPage} setShowModal={setShowModal} showModal={showModal} />
              )}
              {/* <AddNewCarAdditional carId={selectedCarId} onActionComplete={refreshPage} /> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

HostSubscriptions.propTypes = {
  carId: PropTypes.string,
};

export default HostSubscriptions;
