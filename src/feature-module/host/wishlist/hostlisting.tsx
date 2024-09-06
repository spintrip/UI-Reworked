import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { all_routes } from "../../router/all_routes";
import DashboardMenu from "../dashboardmenu";
import AddNewCar from "../../../core/data/modals/addNewCar";
// import AddNewCarAdditional from "../../../core/data/modals/addNewCarAdditional";
import dayjs from "dayjs";
import { setSelectedHostCarId, fetchHostProfile } from "../../redux/action";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { getAllCarBrands } from "../../api/Cars";
interface Car {
  carid: string;
  carmodel: string;
  type: string;
  rating: number | null;
  brand: string;
  transmission: string;
  mileage: number | null;
  fuelType: string;
  bodyType: string;
  Registrationyear: string;
  seats: number;
  updatedAt: string;
}

interface Profile {
  cars: Car[];
}

interface RootState {
  profile: {
    profile: Profile;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
  };
}
interface Brand {
  brand_name: string;
  logo_path: string;
}
const HostListing = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const status = useSelector((state: RootState) => state.profile.status);
  const error = useSelector((state: RootState) => state.profile.error);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await getAllCarBrands();
      setBrands(fetchedBrands);
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(all_routes.signup);
      return;
    }
    dispatch<any>(fetchHostProfile());
  }, [dispatch, navigate]);

  const handleCarClick = (carId: any, carModel: any, carDetails: Car) => {
    if (profile && profile.cars && carId) {
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
  const getBrandLogo = (brandName: string): string | undefined => {
    const brand = brands.find(
      (b) => b.brand_name?.toLowerCase() === brandName?.toLowerCase(),
    );
    return brand ? brand.logo_path : undefined;
  };

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
                <title>All Cars | Spintrip Car Rentals</title>
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
                      <h2 className="breadcrumb-title">All Cars</h2>
                      <nav aria-label="breadcrumb" className="page-breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <Link to={route.home}>Home</Link>
                          </li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            All Cars
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
                    <h4>All Cars</h4>
                  </div>
                  {/* /Content Header */}
                  <div className="row">
                    <div className="col d-flex flex-row-reverse mb-3">
                      <Link
                        to="#"
                        className="btn btn-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#add_new_car"
                      >
                        <button className="text-white fs-large rounded d-flex align-items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          <span className="mx-2">Add Car</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    {/* Profile Information */}
                    {/* Wishlist */}
                    <div className="col-md-12">
                      <div className="wishlist-wrap">
                        {/* Map host cars on `listview-car` */}
                        {profile?.cars?.length === 0 ? (
                          <>No cars</>
                        ) : (
                          profile?.cars?.map((car, index) => (
                            <div
                              className="listview-car cursor-pointer"
                              key={index}
                              onClick={() =>
                                handleCarClick(car.carid, car.carmodel, car)
                              }
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
                                            <div className=" d-flex align-items-center justify-content-start">
                                                {getBrandLogo(car.brand) && (
                                                  <img
                                                    className="car-brand-logo"
                                                    src={getBrandLogo(car.brand)}
                                                    alt={`${car.brand} logo`}
                                                  />
                                                )}
                                                
                                                
                                              </div>
                                            <h5 className="mx-3 text-gray" style={{fontWeight: '700'}}>{car.carmodel || "NA"}</h5> 
                                            <span className="mx-3 font-mono font-bold bg-website-primary p-1 text-white rounded">
                                                  {extractYear(car.Registrationyear)}
                                                </span>
                                          </h3>
                                          <h6>
                                            
                                            <span>{car.type || "NA"}</span>
                                          </h6>
                                        </div>
                                        <div className="blog-list-rate d-flex flex-column ">
                                          <div className="list-rating">
                                            {renderStars(car.rating)}
                                            <span>
                                              (
                                              {car.rating === null
                                                ? "Not Rated Yet"
                                                : car.rating.toFixed(2)}
                                              )
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="listing-details-group">
                                        <ul>
                                          <li>
                                            <span>
                                              <ImageWithBasePath
                                                src="assets/img/icons/car-parts-05.svg"
                                                alt="Transmission"
                                              />
                                            </span>
                                            <p>
                                              {car.transmission === "1"
                                                ? "Auto"
                                                : "Manual"}
                                            </p>
                                          </li>
                                          <li>
                                            <span>
                                              <ImageWithBasePath
                                                src="assets/img/icons/car-parts-02.svg"
                                                alt="KM Driven"
                                              />
                                            </span>
                                            <p>
                                              {car.mileage === null
                                                ? "NA"
                                                : car.mileage}{" "}
                                              Km
                                            </p>
                                          </li>
                                          <li>
                                            <span>
                                              <ImageWithBasePath
                                                src="assets/img/icons/car-parts-03.svg"
                                                alt="Fuel Type"
                                              />
                                            </span>
                                            <p>
                                              {car.fuelType === "1"
                                                ? "Petrol"
                                                : "Diesel"}
                                            </p>
                                          </li>
                                          <li>
                                            <span>
                                              <ImageWithBasePath
                                                src="assets/img/icons/car-parts-04.svg"
                                                alt="Engine Power"
                                              />
                                            </span>
                                            <p>{car.bodyType || "NA"}</p>
                                          </li>
                                          <li>
                                            <span>
                                              <ImageWithBasePath
                                                src="assets/img/icons/regyear.webp"
                                                alt="Year"
                                              />
                                            </span>
                                            <p>
                                              {car.Registrationyear || "NA"}
                                            </p>
                                          </li>
                                          <li>
                                            <span>
                                              <ImageWithBasePath
                                                src="assets/img/icons/car-parts-06.svg"
                                                alt="Seats"
                                              />
                                            </span>
                                            <p>{car.seats || "5"} Persons</p>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="blog-list-head list-head-bottom d-flex">
                                        <div className="blog-list-title">
                                          <div className="d-flex align-items-center justify-content-around flex-wrap">
                                            <div className="address-info">
                                              <h6>
                                                Updated At:{" "}
                                                {car.updatedAt
                                                  ? dayjs(car.updatedAt).format(
                                                      "DD/MM/YYYY",
                                                    )
                                                  : "N/A"}
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
                          ))
                        )}
                      </div>
                      {/* /Wishlist */}
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Content */}
              <AddNewCar onActionComplete={refreshPage} />
              {/* <AddNewCarAdditional carId={selectedCarId} onActionComplete={refreshPage} /> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

HostListing.propTypes = {
  carId: PropTypes.string,
};

export default HostListing;
