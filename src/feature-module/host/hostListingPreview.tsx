import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import { all_routes } from "../router/all_routes";
import useScrollToTop from "../../hooks/useScrollToTop";
import { getCarAdditionalInfo } from "../api/postcar";
import AddNewCarAdditional from "../../core/data/modals/addNewCarAdditional";
import LocationDisplay from "../common/LocationDisplay";
import CarouselDisplay from "../common/CarouselDisplay";
import { getAllCarBrands } from "../api/Cars";
import { Helmet } from "react-helmet";

interface Brand {
  brand_name: string;
  logo_path: string;
}

const hostListingPreview = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const { carId, carModel } = location.state || {};
  const [editState, setEditState] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState<any>();
  const [carImages, setCarImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  // const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await getAllCarBrands();
      setBrands(fetchedBrands);
    };
    fetchBrands();
  }, []);
  const getBrandLogo = (brandName: string): string | undefined => {
    const brand = brands.find(
      (b) => b.brand_name.toLowerCase() === brandName?.toLowerCase(),
    );
    return brand ? brand.logo_path : undefined;
  };
  useEffect(() => {
    if (!token) {
      navigate(all_routes.signup);
      return;
    }
    Aos.init({ duration: 1200, once: true });
  }, []);

  useEffect(() => {
    if (!token) {
      navigate(all_routes.signup);
      return;
    }
    if (carId) {
      fetchAdditionalInfo();
    }
  }, [carId]);

  useEffect(() => {
    fetchAdditionalInfo();
  }, [editState]);

  const fetchAdditionalInfo = async () => {
    setLoading(true); // Start loading
    try {
      const data = await getCarAdditionalInfo(carId);
      if (data && data.carAdditionals) {
        setAdditionalInfo(data.carAdditionals);
        setCarImages(data.carImages || []); // Ensure carImages is an array
        if (
          data.carImages &&
          data.carImages.length > 0 &&
          data.carImages[0] !== null
        ) {
          setImageLoaded(true);
        }
      } else {
        throw new Error("No additional information found");
      }
    } catch (err) {
      console.error("Failed to fetch additional car info:", err);
      setError("Failed to load additional car data");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleActionComplete = () => {
    setEditState(false);
    fetchAdditionalInfo(); // Refresh the car details
  };
  const extractYear = (dateString: string): string => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  const handleEditClick = () => {
    setEditState(true);
  };

  const lat = additionalInfo?.latitude ?? 0.0;
  const long = additionalInfo?.longitude ?? 0.0;

  return (
    <div className="main-wrapper">
      {loading ? (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="w-[20vw] bg-slate-200 p-3 mx-2">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      ) : (
        <div>
          {/* Breadcrumb Section */}
          <div className="breadcrumb-bar">
            <div className="container">
              <div className="row align-items-center text-center">
                <div className="col-md-12 col-12">
                  <h2 className="breadcrumb-title">Listing Preview</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={all_routes.hostdashboard}>
                          Host dashboard
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* /Breadcrumb Section */}
          <div>
            <Helmet>
              <title>Preview Listing | Spintrip Car Rentals</title>
              <meta
                name="description"
                content={`Preview your car listing on Spintrip Car Rentals. Ensure your car details, photos, availability, and pricing are accurate to attract renters in Bangalore.`}
              />
              <meta
                name="keywords"
                content={`Spintrip Car Rentals car listing preview, details, car photos, car availability, car rental pricing, attract renters Bangalore`}
              />
            </Helmet>
          </div>
          <section className="product-detail-head">
            <div className="container">
              {additionalInfo && (
                <div className="detail-page-head">
                  <div className="detail-headings">
                    <div className="star-rated d-flex align-items-start justify-content-start">
                      <div className="camaro-info mb-2">
                        <div className=" d-flex align-items-center justify-content-start">
                          {getBrandLogo(additionalInfo.brand) && (
                            <img
                              className="car-brand-logo"
                              src={getBrandLogo(additionalInfo.brand)}
                              alt={`${additionalInfo.brand} logo`}
                            />
                          )}
                          <h4 className="font-raleway mx-2 fw-bold text-dark">
                            {carModel}
                          </h4>
                          <span className=" font-mono font-bold bg-website-primary p-1 text-white rounded">
                            {extractYear(additionalInfo.registrationYear)}
                          </span>
                        </div>
                        <div className="camaro-location mt-3">
                          <div className="camaro-location-inner">
                            <span className="me-2">
                              <b>
                                <LocationDisplay
                                  latitude={lat}
                                  longitude={long}
                                />
                              </b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-content">
                    {editState ? (
                      <div
                        className="edit-button hover:bg-slate-100  rounded  d-flex align-items-center justify-content-end "
                        onClick={() => setEditState(false)}
                      >
                        <p className="font-semibold">Finish Editing</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="black"
                          className="edit-icon"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div
                        className="edit-button  cursor-pointer rounded d-flex align-items-center justify-content-end"
                        onClick={handleEditClick}
                      >
                        <p className="font-semibold">Edit Car Details</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="black"
                          className="edit-icon"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
          <section className="section product-details">
            <div className="row d-flex"></div>
            {editState ? (
              <AddNewCarAdditional
                carId={carId}
                setEditState={setEditState}
                onActionComplete={handleActionComplete}
              /> // Pass carId as a prop
            ) : (
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="detail-product">
                      {imageLoaded ? (
                        <CarouselDisplay images={carImages} />
                      ) : (
                        <div className="bg-light custom-border text-white w-100 p-2 rounded h-[30vh] d-flex align-items-center justify-content-center">
                          <div className="upload-photo-center-div">
                            <button
                              className="text-white hover:bg-slate-300 text-2xl bg-black p-2 border border-2 rounded border-black"
                              onClick={() => setEditState(true)}
                            >
                              Upload
                            </button>
                            <span className="text-center m-2 text-black">
                              Upload up to 5 photos
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="review-sec specification-card">
                      <div className="review-header">
                        <h4>Specifications</h4>
                      </div>
                      {additionalInfo ? (
                        <div className="card-body">
                          <div className="lisiting-featues">
                            <div className="row">
                              {additionalInfo["type"] && (
                                <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                  <div className="feature-img">
                                    <ImageWithBasePath
                                      src="assets/img/specification/specification-icon-1.svg"
                                      alt="type"
                                    />
                                  </div>
                                  <div className="featues-info">
                                    <span>Body </span>
                                    <h6>{additionalInfo["type"]}</h6>
                                  </div>
                                </div>
                              )}
                              {additionalInfo["brand"] && (
                                <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                  <div className="feature-img">
                                    <ImageWithBasePath
                                      src="assets/img/specification/specification-icon-2.svg"
                                      alt="brand"
                                    />
                                  </div>
                                  <div className="featues-info">
                                    <span>Make </span>
                                    <h6>{additionalInfo["brand"]}</h6>
                                  </div>
                                </div>
                              )}
                                <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                  <div className="feature-img">
                                    <ImageWithBasePath
                                      src="assets/img/specification/specification-icon-3.svg"
                                      alt="Transmission"
                                    />
                                  </div>
                                  <div className="featues-info">
                                    <span>Transmission </span>
                                    <h6>{additionalInfo["transmission"] == 1 ? 'Auto' : 'Manual'}</h6>
                                  </div>
                                </div>
                              <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                <div className="feature-img">
                                  <ImageWithBasePath
                                    src="assets/img/specification/specification-icon-4.svg"
                                    alt="fuel"
                                  />
                                </div>
                                <div className="featues-info">
                                  <span>Fuel Type </span>
                                  <h6>
                                    {additionalInfo["fuelType"] == 1
                                      ? "Diesel"
                                      : "Petrol"}
                                  </h6>
                                </div>
                              </div>
                              <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                <div className="feature-img">
                                  <ImageWithBasePath
                                    src="assets/img/specification/specification-icon-5.svg"
                                    alt="mileage"
                                  />
                                </div>
                                <div className="featues-info">
                                  <span>Mileage </span>
                                  <h6>{additionalInfo["mileage"]}</h6>
                                </div>
                              </div>
                              {additionalInfo["sunroof"] && (
                                <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                  <div className="feature-img">
                                    <ImageWithBasePath
                                      src="assets/img/specification/specification-icon-6.svg"
                                      alt="sunroof"
                                    />
                                  </div>
                                  <div className="featues-info">
                                    <span> Sunroof </span>
                                    <h6>{additionalInfo["sunroof"]}</h6>
                                  </div>
                                </div>
                              )}
                              <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                <div className="feature-img">
                                  <ImageWithBasePath
                                    src="assets/img/specification/specification-icon-7.svg"
                                    alt="Reg. Year"
                                  />
                                </div>
                                <div className="featues-info">
                                  <span>Year</span>
                                  <h6>{additionalInfo["registrationYear"]}</h6>
                                </div>
                              </div>
                              {additionalInfo["ac"] && (
                                <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                  <div className="feature-img">
                                    <ImageWithBasePath
                                      src="assets/img/specification/specification-icon-8.svg"
                                      alt="ac"
                                    />
                                  </div>
                                  <div className="featues-info">
                                    <span>AC </span>
                                    <h6>{additionalInfo["ac"]}</h6>
                                  </div>
                                </div>
                              )}
                              {additionalInfo["powerWindow"] && (
                                <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                  <div className="feature-img">
                                    <ImageWithBasePath
                                      src="assets/img/specification/specification-icon-9.svg"
                                      alt="Power Window"
                                    />
                                  </div>
                                  <div className="featues-info">
                                    <span>Power Window </span>
                                    <h6>{additionalInfo["powerWindow"]}</h6>
                                  </div>
                                </div>
                              )}
                              {additionalInfo["musicSystem"] && (
                                <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                  <div className="feature-img">
                                    <ImageWithBasePath
                                      src="assets/img/specification/specification-icon-10.svg"
                                      alt="Music System"
                                    />
                                  </div>
                                  <div className="featues-info">
                                    <span>Music System </span>
                                    <h6>{additionalInfo["musicSystem"]}</h6>
                                  </div>
                                </div>
                              )}
                              {additionalInfo["sevenSeater"] && (
                                <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                  <div className="feature-img">
                                    <ImageWithBasePath
                                      src="assets/img/specification/specification-icon-11.svg"
                                      alt="7 Seater"
                                    />
                                  </div>
                                  <div className="featues-info">
                                    <span>7 Seater </span>
                                    <h6>{additionalInfo["sevenSeater"]}</h6>
                                  </div>
                                </div>
                              )}
                              {additionalInfo["transmission"] && (
                                <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                  <div className="feature-img">
                                    <ImageWithBasePath
                                      src="assets/img/specification/specification-icon-9.svg"
                                      alt="Power Window"
                                    />
                                  </div>
                                  <div className="featues-info">
                                    <span>Power Window </span>
                                    <h6>{additionalInfo["transmission"]}</h6>
                                  </div>
                                </div>
                              )}
                              <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                <div className="feature-img">
                                  <ImageWithBasePath
                                    src="assets/img/specification/specification-icon-12.svg"
                                    alt="Engine"
                                  />
                                </div>
                                <div className="featues-info">
                                  <span>Engine (Hp) </span>
                                  <h6 className="font-mono">
                                    {additionalInfo["horsePower"]}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span>Loading car model and make info...</span>
                      )}
                    </div>
                    <div className="review-sec listing-feature">
                      <div className="review-header">
                        <h4>Car Features</h4>
                      </div>
                      {additionalInfo ? (
                        <div className="listing-description">
                          <div className="features-grid">
                            {[
                              { key: "abs", label: "ABS" },
                              { key: "airBags", label: "AirBags" },
                              { key: "airFreshner", label: "Air Freshner" },
                              { key: "airPurifier", label: "Air Purifier" },
                              { key: "usbCharger", label: "USB Charger" },
                              { key: "cruiseControl", label: "Cruise Control" },
                              { key: "bluetooth", label: "Bluetooth" },
                              { key: "autoWindow", label: "Auto Window" },
                              {
                                key: "fullBootSpace",
                                label: "Full Boot Space",
                              },
                              {
                                key: "ventelatedFrontSeat",
                                label: "Ventelated Front Seat",
                              },
                              { key: "keylessEntry", label: "Keyless Entry" },
                              { key: "petFriendly", label: "Pet Friendly" },
                              { key: "powerSteering", label: "Power Steering" },
                              {
                                key: "tractionControl",
                                label: "Traction Control",
                              },

                              { key: "voiceControl", label: "Voice Control" },
                              { key: "touchScreen", label: "Touch Screen" },
                              { key: "reverseCamera", label: "Reverse Camera" },
                            ].map(
                              (feature) =>
                                additionalInfo[feature.key] && (
                                  <div
                                    className="feature-item"
                                    key={feature.key}
                                  >
                                    <span>
                                      <i className="fa-solid fa-check-double" />
                                    </span>
                                    {feature.label}
                                  </div>
                                ),
                            )}
                          </div>
                        </div>
                      ) : (
                        <span>Loading additional car features...</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 theiaStickySidebar">
                    <div className="stickysidebar">
                      <div className="review-sec share-car mt-0 mb-0">
                        <div className="review-header">
                          <h4>View Location</h4>
                        </div>
                        <iframe
                          src={`https://www.google.com/maps?q=${lat},${long}&hl=es;z=14&loading=async&output=embed`}
                          className="iframe-video"
                          style={{
                            width: "100%",
                            height: "300px",
                            border: "0",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
          {/* move to a component along with */}
        </div>
      )}
    </div>
  );
};

export default hostListingPreview;
