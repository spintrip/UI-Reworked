import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Aos from "aos";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import ImageWithBasePath1 from "../../../core/data/img/ImageWithBasePath1";
import DashboardMenu from "../dashboardmenu";
import { all_routes } from "../../router/all_routes";
import {
  setDateTime,
  setSelectedCarId,
  setWishlistData,
} from "../../redux/action";
import {
  getuserWishlist,
  postWishlist,
  postCancelWishlist,
} from "../../api/Cars";
import LocationDisplay from "../../common/LocationDisplay";

const UserWishList: React.FC = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const location = useSelector((state: any) => state.dateTime.location);
  const routes = all_routes;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  const startDate = moment().format("YYYY-MM-DD");
  const endDate = moment().add(1, "days").format("YYYY-MM-DD");
  const startTime = moment().format("HH:mm");
  const endTime = moment().format("HH:mm");

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await getuserWishlist();
        if (!response) {
          throw new Error(
            `Error fetching data: ${response ? response["statusText"] : "null"}`,
          );
        }
        const responseData = await response.json();
        if (Array.isArray(responseData.message)) {
          setWishlist(responseData.message); // Set the fetched data to the state if it's an array
          dispatch(setWishlistData(responseData.message));
        } else {
          console.error("Unexpected response format:", responseData);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [token, dispatch]);

  const handleWishlistClick = async (car: any) => {
    const isWishlisted = wishlist.some(
      (wishlistCar) => wishlistCar?.carId === car.carId,
    );
    if (isWishlisted) {
      try {
        await postCancelWishlist(car.carId);
        const updatedWishlist = wishlist.filter(
          (wishlistCar) => wishlistCar?.carId !== car.carId,
        );
        setWishlist(updatedWishlist);
        dispatch(setWishlistData(updatedWishlist)); // Dispatch the action to update the redux store
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    } else {
      try {
        await postWishlist(car.carId);
        const updatedWishlist = wishlist.filter(
          (wishlistCar) => wishlistCar.carId !== car.carId,
        );
        setWishlist(updatedWishlist);
        dispatch(setWishlistData(updatedWishlist)); // Dispatch the action to update the redux store
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }
  };

  const handleRentNowClick = (selectedCar: any) => {
    if (selectedCar) {
      dispatch(setSelectedCarId(selectedCar.carId));
      dispatch(setDateTime(startDate, startTime, endDate, endTime, location));
      navigate(routes.listingdetails);
    } else {
      alert("Car information is not available.");
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    if (!token) {
      navigate(routes.signup);
    }
  }, [navigate, token]);
  return (
    <div className="main-wrapper">
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">User Wishlist</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={routes.home}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Wishlist
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
      <div className="content dashboard-content">
        <div className="container">
          {/* Content Header */}
          <div className="content-header">
            <h4>Wishlist</h4>
          </div>
          {/* /Content Header */}
          <div className="row">
            {/* Wishlist */}
            <div className="col-md-12">
              <div className="wishlist-wrap">
                {Array.isArray(wishlist) && wishlist.length > 0 ? (
                  wishlist.map((car, index) => (
                    <div className="listview-car" key={index}>
                      <div className="card">
                        <div className="blog-widget d-flex">
                          <div className="blog-img">
                            <div className="listing-item">
                              <div className="listing-img">
                                <Link to={`${routes.listingdetails}`}>
                                  <ImageWithBasePath1
                                    src={
                                      car["carImage1"]
                                        ? car["carImage1"]
                                        : "/assets/img/cars/no_img_found.jpg"
                                    }
                                    className="img-fluid"
                                    alt={car["carModel"]}
                                  />
                                </Link>
                              </div>
                            </div>
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-id">
                                  Remove From Wishlist
                                </Tooltip>
                              }
                            >
                              <Link
                                to="#"
                                onClick={() => handleWishlistClick(car)}
                                className={`fav-icon ${wishlist.some((wishlistCar) => wishlistCar["carId"] === car["carId"]) ? "selected" : ""}`}
                              >
                                <i className="feather icon-heart" />
                              </Link>
                            </OverlayTrigger>
                          </div>
                          <div className="bloglist-content w-100">
                            <div className="card-body">
                              <div className="blog-list-head d-flex">
                                <div className="blog-list-title">
                                  <h3>
                                    <Link
                                      to={`${routes.listingdetails}`}
                                      onClick={() => handleRentNowClick(car)}
                                    >
                                      {car["carModel"]}
                                    </Link>
                                  </h3>
                                  <h6>
                                    Category : <span>{car["brand"]}</span>
                                  </h6>
                                </div>
                                <div className="blog-list-rate">
                                  <div className="list-rating">
                                    {[...Array(5)].map((_, i) => (
                                      <i
                                        key={i}
                                        className="fas fa-star filled me-1"
                                      />
                                    ))}
                                    <span>({car["rating"] || "5.0"})</span>
                                  </div>
                                  <h6 className="font-mono">
                                    ₹{car["costPerHr"]}{" "}
                                    <span className="font-mono">/ Hr</span>
                                  </h6>
                                </div>
                              </div>
                              <div className="listing-details-group">
                                <ul>
                                  <li>
                                    <span>
                                      <ImageWithBasePath
                                        src="assets/img/icons/car-parts-05.svg"
                                        alt={car["type"]}
                                      />
                                    </span>
                                    <p>{car["type"]}</p>
                                  </li>
                                  <li>
                                    <span>
                                      <ImageWithBasePath
                                        src="assets/img/icons/car-parts-02.svg"
                                        alt={car["mileage"]}
                                      />
                                    </span>
                                    <p>{car["mileage"] || "N/A"} KM</p>
                                  </li>
                                  <li>
                                    <span>
                                      <ImageWithBasePath
                                        src="assets/img/icons/car-parts-03.svg"
                                        alt="Fuel Type"
                                      />
                                    </span>
                                    <p>
                                      {car["fuelType"] ? "Petrol" : "Diesel"}
                                    </p>
                                  </li>
                                  <li>
                                    <p>{car["horsePower"] || "N/A"} bhp</p>
                                  </li>
                                  <li>
                                    <span>
                                      <ImageWithBasePath
                                        src="assets/img/icons/regyear.webp"
                                        alt="Registration Year"
                                      />
                                    </span>
                                    <p>
                                      {car ? car["registrationYear"] : "N/A"}
                                    </p>
                                  </li>
                                  <li>
                                    <span>
                                      <ImageWithBasePath
                                        src="assets/img/icons/car-parts-06.svg"
                                        alt="Capacity"
                                      />
                                    </span>
                                    <p>{car["capacity"] || "5 persons"}</p>
                                  </li>
                                </ul>
                              </div>
                              <div className="blog-list-head list-head-bottom d-flex">
                                <div className="blog-list-title">
                                  <div className="title-bottom">
                                    <div className="address-info">
                                      <h6 className="max-w-[20vw]">
                                        <LocationDisplay
                                          latitude={car["latitude"]}
                                          longitude={car["longitude"]}
                                        />
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="listing-button">
                                  <Link
                                    to={`${routes.listingdetails}`}
                                    className="btn btn-order d-flex align-items-center justify-content-center"
                                    onClick={() => handleRentNowClick(car)}
                                  >
                                    <span>
                                      <i className="feather-calendar me-2" />
                                    </span>
                                    <p>Rent Now</p>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items in the wishlist.</p>
                )}
              </div>
              {/* /Wishlist */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default UserWishList;
