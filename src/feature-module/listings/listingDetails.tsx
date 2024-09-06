import React, { useCallback } from "react";
import { useEffect, useState } from "react";
// import Breadcrumbs from "../common/Breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
//import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import { all_routes } from "../router/all_routes";
import {
  postOneCar,
  getCarAdditionalInfo,
  postWishlist,
  postCancelWishlist,
  getAllCarBrands,
  viewBreakup,
} from "../api/Cars";
import { postfeedback } from "../api/feedback";
import { CiHeart } from "react-icons/ci";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  updateBookingDates,
  setBookingId,
  setWishlistData,
} from "../redux/action";
import { createBooking } from "../api/Booking";
import { Button, Modal } from "react-bootstrap";
import useScrollToTop from "../../hooks/useScrollToTop";
import NotificationBar from "../common/notificationBar";
import LocationDisplay from "../common/LocationDisplay";
import CarouselDisplay from "../common/CarouselDisplay";
import { Helmet } from "react-helmet";
import { getProfile } from "../api/Profile";
interface DateTimeState {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

interface WishlistState {
  wishlist: any[]; // Adjust the type as per your actual data structure
}

interface SelectedCarState {
  carId: string;
  carLocation: any;
}

interface BookingState {
  bookingId: string;
}

interface RootState {
  dateTime: DateTimeState;
  wishlist: WishlistState;
  selectedCarId: SelectedCarState;
  bookingId: BookingState;
}

interface Brand {
  brand_name: string;
  logo_path: string;
}

//getCarAdditionalInfo
const listingDetails = () => {
  useScrollToTop();
  const dateTime = useSelector((state: RootState) => state.dateTime);
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const carId = useSelector((state: RootState) => state.selectedCarId.carId);
  const carLocation = useSelector(
    (state: RootState) => state.selectedCarId.carLocation,
  );
  const bookingId = useSelector((state: RootState) => state.bookingId);
  const [carResponse, setCarResponse] = useState<any>(null);
  const [breakupValue, setbreakupValue] = useState<any>(null);
  const [feedback, setFeedback] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState<any>(null);
  const [Features, setFeatures] = useState<any>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [pickupDate, setPickupDate] = useState(dateTime.startDate);
  const [returnDate, setReturnDate] = useState(dateTime.endDate);
  const [pickupTime, setPickupTime] = useState(dateTime.startTime);
  const [returnTime, setReturnTime] = useState(dateTime.endTime);
  const token = localStorage.getItem("authToken");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckAvailabilityDisabled, setIsCheckAvailabilityDisabled] =
    useState(true);
  const [checkAvailabilityPickupDate, setCheckAvailabilityPickupDate] =
    useState<any>(dateTime.startDate);
  const [checkAvailabilityReturnDate, setCheckAvailabilityReturnDate] =
    useState(dateTime.endDate);
  const [checkAvailabilityPickupTime, setCheckAvailabilityPickupTime] =
    useState(dateTime.startTime);
  const [checkAvailabilityReturnTime, setCheckAvailabilityReturnTime] =
    useState(dateTime.endTime);
  const [showCheckAvailabilityModal, setShowCheckAvailabilityModal] =
    useState(false);
  const [carImages, setCarImages] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [notificationMessage,setNotificationMessage] = useState("")
  const [isNotification, setIsNotification] = useState(false)


  useEffect(() => {
    setPickupDate(dateTime.startDate);
    setReturnDate(dateTime.endDate);
    setPickupTime(dateTime.startTime);
    setReturnTime(dateTime.endTime);
  }, [dateTime]);

  // get all brands api call
  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await getAllCarBrands();
      setBrands(fetchedBrands);
    };
    fetchBrands();
  }, []);

  const fetchStatus = useCallback(async () => {
    const profile = await getProfile();
    if (profile && profile.profile) {
      setVerificationStatus(profile.profile.verificationStatus || null);
      setEmailStatus(profile.profile.email || null);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);



  // retuern the logo specific to the car brand
  const getBrandLogo = (brandName: string): string | undefined => {
    const brand = brands.find(
      (b) => b.brand_name.toLowerCase() === brandName.toLowerCase(),
    );
    return brand ? brand.logo_path : undefined;
  };

  const validateDateTime = () => {
    if (
      !checkAvailabilityPickupDate ||
      !checkAvailabilityReturnDate ||
      !checkAvailabilityPickupTime ||
      !checkAvailabilityReturnTime
    ) {
      setErrorMessage(
        "All fields must be filled out, including a valid location.",
      );
      setIsCheckAvailabilityDisabled(true);
      return false;
    }

    const pickupDateTime = dayjs(
      `${checkAvailabilityPickupDate}T${checkAvailabilityPickupTime}`,
    );
    const returnDateTime = dayjs(
      `${checkAvailabilityReturnDate}T${checkAvailabilityReturnTime}`,
    );

    if (pickupDateTime >= returnDateTime) {
      setErrorMessage("Pickup date/time must be before return date/time.");
      setIsCheckAvailabilityDisabled(true);
      return false;
    }
    if (returnDateTime <= pickupDateTime.add(1, 'hour')) {
      setErrorMessage("Return date/time must be at least one hour after the pickup date/time.");
      setIsCheckAvailabilityDisabled(true);
      return false;
    }
    setErrorMessage("");
    setIsCheckAvailabilityDisabled(false);
    return true;
  };
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]); // Store selected feature IDs
  useEffect(() => {
    console.log(selectedFeatures)
  }, [selectedFeatures])
  //For OneCar
  useEffect(() => {
    const fetchData = async () => {
      if (carId) {
        try {
          if (!token) {
            setError("You are not logged in. Redirecting to sign-in page...");
            setTimeout(() => {
              navigate(all_routes.login);
            }, 2000);
            return;
          }
          if (!validateDateTime()) return;
          const cars = await postOneCar(
            carId,
            pickupDate,
            returnDate,
            pickupTime,
            returnTime,
          );
          setCarResponse(cars);
          setError(""); // Clear error if the request is successful
        } catch (err) {
          const error = err as Error;
          setError(error.message || "Failed to load car data.");
        }
      }
    };
    fetchData();
  }, [carId, pickupDate, returnDate, pickupTime, returnTime, token, navigate]);

  //For getCarAdditionalInfo
  useEffect(() => {
    if (!token) return;
    if (carId) {
      const fetchAdditionalInfo = async () => {
        try {
          const data = await getCarAdditionalInfo({ carId: carId });
          if (data && data.carAdditionals) {
            setAdditionalInfo(data.carAdditionals);
            setFeatures(data.updatedFeatures);

            setCarImages(data.carImages || []);
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
        }
      };
      fetchAdditionalInfo();
    }
  }, [carId, token]);

  // for feedback
  useEffect(() => {
    const fetchData = async () => {
      if (carId) {
        try {
          if (!token) {
            setError("You are not logged in. Redirecting to sign-in page...");
            setTimeout(() => {
              navigate(all_routes.login);
            }, 2000);
            return;
          }
          const feedback = await postfeedback(carId);
          setFeedback(feedback.message);
          setError("");
        } catch (err) {
          const error = err as Error;
          setError(error.message || "Failed to load feedback data.");
        }
      }
    };
    fetchData();
  }, [carId, token]);

  const numberOfReviews = feedback.length;
  const averageRating =
    feedback.reduce((acc: any, curr: any) => acc + curr.rating, 0) /
    numberOfReviews || 0;

  const handleCheckAvailabilityPickupDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setCheckAvailabilityPickupDate(newValue.format("YYYY-MM-DD"));
    } else {
      // Handle the null case if necessary
      setCheckAvailabilityPickupDate("");
    }
    validateDateTime();
  };

  const handleCheckAvailabilityReturnDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setCheckAvailabilityReturnDate(newValue.format("YYYY-MM-DD"));
    } else {
      // Handle the null case if necessary
      setCheckAvailabilityReturnDate("");
    }
    validateDateTime();
  };

  const handleCheckAvailabilityPickupTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setCheckAvailabilityPickupTime(newValue.format("HH:mm:ss"));
    } else {
      // Handle the null case if necessary
      setCheckAvailabilityPickupTime("");
    }
    validateDateTime();
  };

  const handleCheckAvailabilityReturnTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setCheckAvailabilityReturnTime(newValue.format("HH:mm:ss"));
    } else {
      // Handle the null case if necessary
      setCheckAvailabilityReturnTime("");
    }
    validateDateTime();
  };



  useEffect(() => {
    validateDateTime();
  }, [
    checkAvailabilityPickupDate,
    checkAvailabilityReturnDate,
    checkAvailabilityPickupTime,
    checkAvailabilityReturnTime,
  ]);

  const checkAvailability = async () => {
    if (!validateDateTime()) return;

    try {
      if (!token) {
        setError("You are not logged in. Redirecting to sign-in page...");
        setTimeout(() => {
          navigate(all_routes.login);
        }, 2000);
        return;
      }

      const cars = await viewBreakup(
        carId,
        checkAvailabilityPickupDate,   // Corrected startDate
        checkAvailabilityReturnDate,   // Corrected endDate
        checkAvailabilityPickupTime,   // Corrected startTime
        checkAvailabilityReturnTime,   // Corrected endTime
        selectedFeatures
      );


      setbreakupValue(cars);

      dispatch(
        updateBookingDates({
          carId: carId,
          startDate: checkAvailabilityPickupDate,
          endDate: checkAvailabilityReturnDate,
          startTime: checkAvailabilityPickupTime,
          endTime: checkAvailabilityReturnTime,
        })
      );
      setAvailabilityMessage(`Car is available.`);
      setShowCheckAvailabilityModal(true); // Show the availability modal
      setError(""); // Clear error if the request is successful
    } catch (err) {
      const error = err as Error;
      if (error.message) {
        setAvailabilityMessage(error.message);
      } else {
        setAvailabilityMessage(
          "Failed to check availability. Please try again."
        );
      }
      setErrorMessage("Failed to check availability. Please try again.");
    }
  };


  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (emailStatus === null) {
        
        setNotificationMessage(
          "Update Email in your profile"
        );
        setIsNotification(true)
        setTimeout(() => {
          setIsNotification(false);
        }, 5000);
        return;
      }
      if (verificationStatus === null) {
        setNotificationMessage(
          "Upload DL and Aadhar "
        );
        setIsNotification(true)
        setTimeout(() => {
          setIsNotification(false);
        }, 5000);
        return;
      } else if (verificationStatus === 1) {
        setNotificationMessage(
          "Verification Pending "
        );
        setIsNotification(true)
        setTimeout(() => {
          setIsNotification(false);
        }, 5000);
        
        return;
      } else if (verificationStatus === 2) {
        // Constructing the correct payload
        const bookingPayload = {
          carId: carId,  // Ensure carId is a string, not an object
          startDate: checkAvailabilityPickupDate,
          endDate: checkAvailabilityReturnDate,
          startTime: checkAvailabilityPickupTime,
          endTime: checkAvailabilityReturnTime,
          features: selectedFeatures, // Include selected features here
        };

        const booking = await createBooking(bookingPayload);

        setBookingConfirmed(true);
        dispatch(setBookingId(booking.bookings.bookingId));
        setShowCheckAvailabilityModal(false);
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error("Error in createBooking:", err);
      if (err instanceof Error) {
        if ((err as any).status === 400) {
          setError(
            "Your DL and Aadhaar is not verified or the selected car is not available for specified dates."
          );
        } else {
          setError(err.message || "Failed to place the order.");
        }
      } else {
        setError("An unknown error occurred.");
      }
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };





  useEffect(() => {
    if (bookingConfirmed && !error) {
      setShowCheckAvailabilityModal(false);
      setShowSuccessModal(true);
    }
  }, [bookingConfirmed, error]);

  const handleWishlistUpdate = async (carId: any) => {
    try {
      await postWishlist(carId);
      const updatedWishlist = [...wishlist, { carId }];
      dispatch(setWishlistData(updatedWishlist));
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleCancelWishlistUpdate = async (carId: any) => {
    try {
      await postCancelWishlist(carId);
      const updatedWishlist = wishlist.filter((item) => item.carId !== carId);
      dispatch(setWishlistData(updatedWishlist));
    } catch (error) {
      console.error("Error updating cancel wishlist:", error);
    }
  };

  const handleWishlistClick = (car: { carId: any }) => {
    const isWishlisted = wishlist.some(
      (wishlistCar) => wishlistCar.carId === car.carId,
    );
    if (isWishlisted) {
      handleCancelWishlistUpdate(car.carId);
    } else {
      handleWishlistUpdate(car.carId);
    }
  };

  const extractYear = (dateString: string): string => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  const routes = all_routes;

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(routes.signup);
      return;
    }
  }, []);

  return (
    <div>
      <div className="main-wrapper">
        <NotificationBar />
        {error ? (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        ) : carResponse && carResponse.cars.carModel ? (
          <div>
            <Helmet>
              <title>
                Rent {carResponse.cars.carModel} in Bangalore | Spintrip Car
                Rentals
              </title>
              <meta
                name="description"
                content={`Rent ${carResponse.cars.carModel} in Bangalore from local hosts. Spintrip Car Rentals offers competitive pricing and well-maintained cars for your self-drive rental needs. Book your ride today.`}
              />
              <meta
                name="keywords"
                content={`rent ${carResponse.cars.carModel} Bangalore, Spintrip Car Rentals, self-drive car rentals Bangalore, local car hosts, competitive car rental pricing, book car Bangalore, well-maintained cars, car rental Bangalore`}
              />
            </Helmet>

            <section className="product-detail-head">
              <div className="container">
                {carResponse && (
                  <div className="detail-page-head">
                    <div className="detail-headings">
                      <div className="star-rated">
                        <div className="camaro-info">
                          <div className="d-flex mb-2 align-items-center justify-content-start ">
                            {/* add brand logo here */}
                            <div className="px-2">
                              {getBrandLogo(carResponse.cars.brand) && (
                                <img
                                  className="car-brand-logo"
                                  src={getBrandLogo(carResponse.cars.brand)}
                                  alt={`${carResponse.cars.brand} logo`}
                                />
                              )}
                            </div>

                            <span className="car-name">
                              {carResponse.cars.carModel}
                            </span>
                            {additionalInfo ? (
                              <span className=" font-mono font-bold bg-website-primary px-2 text-white rounded">
                                {extractYear(additionalInfo.registrationYear)}
                              </span>) : <></>}
                          </div>
                          <div className="camaro-location">
                            <div className="camaro-location-inner mt-2">
                              <span className="me-2">
                                <b>
                                  Location:{" "}
                                  <LocationDisplay
                                    latitude={carLocation["latitude"]}
                                    longitude={carLocation["longitude"]}
                                  />
                                </b>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="details-btn">
                      {/* <Link to="#">
                {" "}
                <ImageWithBasePath
                  src="assets/img/git-compare.svg"
                  alt="img"
                />{" "}
                Compare
              </Link> */}
                      <Link
                        to="#"
                        className={`border border-danger ${wishlist.some((wishlistCar) => wishlistCar.carId === carResponse.cars.carId) ? "selected" : ""}`}
                        onClick={() => handleWishlistClick(carResponse.cars)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="black"
                          className={`${wishlist.some((wishlistCar) => wishlistCar.carId === carResponse.cars.carId) ? "icon-red" : "icon-grey"}`}
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </section>
            <section className="section product-details">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="detail-product bg-light">
                      {imageLoaded ? (
                        <CarouselDisplay images={carImages} />
                      ) : (
                        <img
                          className="w-100 h-100"
                          src="/assets/img/cars/no_img_found.jpg"
                          alt="no image"
                        />
                      )}
                    </div>

                    <div className="review-sec specification-card border">
                      <div className="review-header">
                        <h4>Specifications</h4>
                      </div>
                      {additionalInfo ? (
                        <div className="card-body">
                          {carResponse ? (
                            <div className="lisiting-featues">
                              <div className="row">
                                {carResponse.cars && carResponse.cars.type && (
                                  <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                    <div className="feature-img">
                                      <ImageWithBasePath
                                        src="assets/img/specification/specification-icon-1.svg"
                                        alt="type"
                                      />
                                    </div>
                                    <div className="featues-info">
                                      <span>Body </span>
                                      <h6> {carResponse.cars.type}</h6>
                                    </div>
                                  </div>
                                )}
                                {carResponse.cars && carResponse.cars.brand && (
                                  <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                    <div className="feature-img">
                                      <ImageWithBasePath
                                        src="assets/img/specification/specification-icon-2.svg"
                                        alt="brand"
                                      />
                                    </div>
                                    <div className="featues-info">
                                      <span>Make </span>
                                      <h6 className="text-uppercase"> {carResponse.cars.brand}</h6>
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
                                      <h6> {additionalInfo.transmission? <>Automatic</> : <>Manual</>}</h6>
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
                                      {" "}
                                      {additionalInfo.fuelType === 1
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
                                    <h6>
                                      {carResponse.cars.mileage == null
                                        ? "NA"
                                        : carResponse.cars.mileage} kmpl
                                    </h6>
                                  </div>
                                </div>
                                {additionalInfo.sunroof && (
                                  <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                    <div className="feature-img">
                                      <ImageWithBasePath
                                        src="assets/img/specification/specification-icon-6.svg"
                                        alt="sunroof"
                                      />
                                    </div>
                                    <div className="featues-info">
                                      <span> Sunroof </span>
                                      <h6>{additionalInfo.sunroof}</h6>
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
                                    <h6> {additionalInfo.registrationYear}</h6>
                                  </div>
                                </div>
                                {additionalInfo.ac && (
                                  <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                    <div className="feature-img">
                                      <ImageWithBasePath
                                        src="assets/img/specification/specification-icon-8.svg"
                                        alt="ac"
                                      />
                                    </div>
                                    <div className="featues-info">
                                      <span>AC </span>
                                      <h6> {additionalInfo.ac}</h6>
                                    </div>
                                  </div>
                                )}
                                {additionalInfo.transmission && (
                                  <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                    <div className="feature-img">
                                      <ImageWithBasePath
                                        src="assets/img/specification/specification-icon-9.svg"
                                        alt="Power Window"
                                      />
                                    </div>
                                    <div className="featues-info">
                                      <span>Power Window </span>
                                      <h6> {additionalInfo.powerWindow}</h6>
                                    </div>
                                  </div>
                                )}
                                {additionalInfo.musicSystem && (
                                  <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                    <div className="feature-img">
                                      <ImageWithBasePath
                                        src="assets/img/specification/specification-icon-10.svg"
                                        alt="Music System"
                                      />
                                    </div>
                                    <div className="featues-info">
                                      <span>Music System </span>
                                      <h6> {additionalInfo.musicSystem}</h6>
                                    </div>
                                  </div>
                                )}
                                {additionalInfo.sevenSeater && (
                                  <div className="featureslist d-flex align-items-center col-lg-3 col-md-4">
                                    <div className="feature-img">
                                      <ImageWithBasePath
                                        src="assets/img/specification/specification-icon-11.svg"
                                        alt="7 Seater"
                                      />
                                    </div>
                                    <div className="featues-info">
                                      <span>7 Seater </span>
                                      <h6> {additionalInfo.sevenSeater}</h6>
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
                                    <h6>{additionalInfo.horsePower}</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span>Loading car model and make info...</span>
                          )}
                        </div>
                      ) : (
                        <span>Loading additional car info...</span>
                      )}
                    </div>
                    <div className="review-sec listing-feature border">
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
                              { key: "usbCharger", label: "Usb Charger" },
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
                    {/*/Listing Features Section*/}
                    {/* <div className="review-sec extra-service mb-0">
                <div className="review-header">
                  <h4>Description of Listing</h4>
                </div>
                {carResponse ? (
                <div className="description-list">
                  {carResponse.cars.type && (
                  <p>
                  Explore the {carResponse.cars.carModel}, a spacious and stylish {carResponse.cars.type} perfect for your next adventure.
                  This car boasts a sleek design with ample interior room for passengers and cargo. 
                  Equipped with advanced features and safety technology, the {carResponse.cars.carModel} ensures a 
                  comfortable and secure ride. Its powerful engine and smooth handling make it ideal
                  for long drives or city commutes. Rent the {carResponse.cars.carModel} today for an unforgettable 
                  driving experience!
                  </p>
                  )}
                </div>
                ):(
                  <span>Loading  Description of Listing...</span>
                )}
              </div> */}
                    {/* <div className="review-sec extra-service mb-0">
                <div className="review-header">
                  <h4>Video</h4>
                </div>
                <div className="short-video">
                  <iframe
                    src="https://www.youtube.com/embed/ExJZAegsOis"
                    width={100}
                    height={350}
                  />
                </div>
              </div> */}
                    <div className="review-sec listing-review border">
                      <div className="review-header">
                        <h4>
                          Reviews{" "}
                          <span className="me-2">({numberOfReviews})</span>
                        </h4>
                        <div className="reviewbox-list-rating">
                          {numberOfReviews > 0 ? (
                            <p>
                              {[...Array(Math.round(averageRating))].map(
                                (star, index) => (
                                  <i
                                    key={index}
                                    className="fas fa-star filled me-1"
                                  ></i>
                                ),
                              )}
                              {[...Array(5 - Math.round(averageRating))].map(
                                (star, index) => (
                                  <i
                                    key={index}
                                    className="fas fa-star me-1"
                                  ></i>
                                ),
                              )}
                              <span>({averageRating.toFixed(1)} out of 5)</span>
                            </p>
                          ) : (
                            <p>No rating available yet</p>
                          )}
                        </div>
                      </div>
                      <div className="review-card">
                        <div className="feedback-section">
                          {numberOfReviews > 0 ? (
                            feedback.map((item) => (
                              <div
                                key={item["feedbackId"]}
                                className="review-item"
                              >
                                <div className="review-header-group">
                                  <div className="review-widget-header">
                                    <span className="review-widget-img">
                                      <ImageWithBasePath
                                        src="assets/img/profiles/avatar-02.jpg"
                                        className="img-fluid"
                                        alt="img"
                                      />
                                    </span>
                                    <div className="review-design">
                                      <div className="d-flex">
                                        <h6 className="text-primary mr-2">
                                          {item["userName"] == null
                                            ? "Spintripper"
                                            : item["userName"]}
                                        </h6>
                                        <ImageWithBasePath
                                          className="image-verify"
                                          src="assets/img/verify.png"
                                          alt="verified"
                                        />
                                      </div>
                                      <p>
                                        {new Date(
                                          item["createdAt"],
                                        ).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="reviewbox-list-rating">
                                    <p>
                                      {[...Array(item["rating"])].map(
                                        (star, index) => (
                                          <i
                                            key={index}
                                            className="fas fa-star filled me-1"
                                          ></i>
                                        ),
                                      )}
                                      <span> ({item["rating"]}.0) </span>
                                    </p>
                                  </div>
                                </div>
                                <p className="review-comment">
                                  {item["comment"]}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p>No reviews available yet</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 theiaStickySidebar ">
                    <div className="stickysidebar">
                      <div className="review-sec mt-0 border border-3">
                        <div className="review-header">
                          <h4>Add Ons</h4>
                        </div>

                        {Features ? (
                          <div className="listing-description">
                            <div className="features-grid">
                              {Features.map((feature) => {
                                const isChecked = selectedFeatures.includes(feature.featureid);

                                return (
                                  <div key={feature.id}>
                                  <div className="feature-item my-1 d-flex align-items-center justify-content-start">
                                    <input
                                      type="checkbox"
                                      id={`feature-${feature.id}`}
                                      checked={isChecked}
                                      className="mx-2"
                                      onChange={(e) => {
                                        const isSelected = e.target.checked;
                                        setSelectedFeatures((prev) => {
                                          if (isSelected) {
                                            return [...prev, feature.featureid];
                                          } else {
                                            return prev.filter((id) => id !== feature.featureid);
                                          }
                                        });
                                      }}
                                    />
                                    <label className="d-flex w-100 align-items-center justify-content-between" htmlFor={`feature-${feature.id}`}>
                                      <span className="font-semibold">{feature.featureName}</span> 
                                      <span className="font-mono bg-dark text-light p-1 rounded">₹ {feature.price}</span> 
                                    </label>
                                    
                                  </div>
                                  <hr/>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <span>No add ons at the moment</span>
                        )}

                      </div>

                      <div className="review-sec mt-0 border">
                        <div className="review-header">
                          <h4>Check Availability</h4>
                        </div>
                        <div>
                          <form>
                            <ul>
                              <li className="column-group-main">
                                <div className="input-block">
                                  <label>Pickup Location</label>
                                  <br />
                                  <LocationDisplay
                                    latitude={carLocation.latitude}
                                    longitude={carLocation.longitude}
                                  />
                                </div>
                              </li>
                              <li className="column-group-main">
                                <div className="input-block">
                                  <label>Pickup Date</label>
                                </div>
                                <div className="input-block-wrapp sidebar-form">
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      className="w-full my-2 mx-1"
                                      label="Pickup Date"
                                      value={dayjs(checkAvailabilityPickupDate)}
                                      onChange={
                                        handleCheckAvailabilityPickupDateChange
                                      }
                                      slotProps={{
                                        textField: (params) => (
                                          <TextField
                                            {...params}
                                            InputProps={{
                                              ...params.InputProps,
                                              readOnly: true,
                                            }}
                                          />
                                        ),
                                      }}
                                      minDate={dayjs()}
                                    />
                                    <TimePicker
                                      className="w-full my-2 mx-1"
                                      label="Pickup Time"
                                      value={dayjs(
                                        checkAvailabilityPickupTime,
                                        "HH:mm",
                                      )}
                                      onChange={
                                        handleCheckAvailabilityPickupTimeChange
                                      }
                                      minTime={dayjs()}
                                      slotProps={{
                                        textField: (params) => (
                                          <TextField
                                            {...params}
                                            InputProps={{
                                              ...params.InputProps,
                                              readOnly: true,
                                            }}
                                          />
                                        ),
                                      }}
                                      ampm={false} // Use 24-hour format
                                      views={["hours", "minutes"]}
                                      openTo="hours"
                                    />
                                  </LocalizationProvider>
                                </div>
                              </li>
                              <li className="column-group-main">
                                <div className="input-block m-0">
                                  <label>Return Date</label>
                                </div>
                                <div className="input-block-wrapp sidebar-form">
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      className="w-full my-2 mx-1"
                                      label="Return Date"
                                      value={dayjs(checkAvailabilityReturnDate)}
                                      onChange={
                                        handleCheckAvailabilityReturnDateChange
                                      }
                                      minDate={dayjs()}
                                      slotProps={{
                                        textField: (params) => (
                                          <TextField
                                            {...params}
                                            InputProps={{
                                              ...params.InputProps,
                                              readOnly: true,
                                              className: "clock-format",
                                              // eslint-disable-next-line @typescript-eslint/no-empty-function
                                              onClick:
                                                params.InputProps?.onClick ||
                                                (() => { console.log("Nothing") }),
                                            }}
                                          />
                                        ),
                                      }}
                                    />
                                    <TimePicker
                                      className="w-full my-2 mx-1"
                                      label="Return Time"
                                      value={dayjs(
                                        checkAvailabilityReturnTime,
                                        "HH:mm",
                                      )}
                                      onChange={
                                        handleCheckAvailabilityReturnTimeChange
                                      }
                                      slotProps={{
                                        textField: (params) => (
                                          <TextField
                                            {...params}
                                            InputProps={{
                                              ...params.InputProps,
                                              readOnly: true,
                                            }}
                                          />
                                        ),
                                      }}
                                      ampm={false} // Use 24-hour format
                                      views={["hours", "minutes"]}
                                      openTo="hours"
                                    />
                                  </LocalizationProvider>
                                </div>
                              </li>
                              <li className="column-group-last">
                                <div className="input-block mb-0">
                                  <div className="search-btn">
                                    <button
                                      className="btn btn-primary check-available w-100 border border-2"
                                      type="button"
                                      onClick={checkAvailability}
                                      disabled={isCheckAvailabilityDisabled}
                                    >
                                      {" "}
                                      Check Availability
                                    </button>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </form>
                          {errorMessage && (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                          )}
                        </div>
                      </div>
                      <div className="review-sec share-car mt-0 mb-0 border">
                        <div className="review-header">
                          <h4>View Location</h4>
                        </div>
                        {carLocation.latitude && carLocation.longitude ? (
                          <iframe
                            src={`https://www.google.com/maps?q=${carLocation.latitude},${carLocation.longitude}&hl=es;z=14&output=embed`}
                            className="iframe-video border rounded"
                            loading={"lazy"}
                            style={{
                              width: "100%",
                              height: "300px",
                              border: "0",
                            }}
                          />
                        ) : (
                          <p>Location data is not available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Modal
              show={showCheckAvailabilityModal}
              onHide={() => setShowCheckAvailabilityModal(false)}
              centered
              className="custom-modal my-[10vh] pb-[10vh]"
            >
              <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title className="custom-modal-title">
                  Availability Details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="custom-modal-body">
                {carResponse.pricing.amount && (
                  <div>
                    <div
                      className={`available-for-ride font-semibold text-md ${availabilityMessage.includes("available") ? "success" : "error"}`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <i
                          className={`fa  ${availabilityMessage.includes("available") ? "fa-check-circle" : "fa-times-circle"}`}
                        />
                        <div className="mx-1">{availabilityMessage}</div>
                      </div>
                    </div>
                    <div className="booking-info">
                      <h5>Pickup Location</h5>
                      <p>
                        <LocationDisplay
                          latitude={carLocation.latitude}
                          longitude={carLocation.longitude}
                        />
                      </p>
                      <iframe
                        src={`https://www.google.com/maps?q=${carLocation.latitude},${carLocation.longitude}&hl=es;z=14&output=embed`}
                        className="iframe-video border rounded"
                        loading={"eager"}
                        style={{ width: "100%", height: "150px", border: "0" }}
                      />
                    </div>
                    <div className="booking-info">
                      <h5>Pickup Date & Time </h5>
                      <p>
                        Date &amp; time:{" "}
                        <span className="font-mono">
                          {" "}
                          {checkAvailabilityPickupDate} &{" "}
                          {checkAvailabilityPickupTime}
                        </span>
                      </p>
                      <span></span>
                      <h5>Return Date & Time</h5>
                      <p>
                        Date &amp; time:{" "}
                        <span className="font-mono">
                          {checkAvailabilityReturnDate} &{" "}
                          {checkAvailabilityReturnTime}
                        </span>{" "}
                      </p>
                      <span></span>
                    </div>

                    <div className="booking-details">
                      <h5 className="mb-3">Booking Details</h5>
                      <div className="detail">
                        <span>Total Hours:</span>{" "}
                        <span className="font-mono font-semibold">
                          {breakupValue?.totalHours.toFixed(2)} hrs
                        </span>
                      </div>
                      <div className="detail">
                        <span>Cost per Hour:</span>{" "}
                        <span className="font-mono font-semibold">
                          ₹{breakupValue?.costPerHr}
                        </span>
                      </div>
                      <div className="detail">
                        <span>Booking Amount:</span>{" "}
                        <span className="font-mono font-semibold">
                          ₹{breakupValue?.baseAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="detail">
                        <span>Repair and Maintainance charges </span>{" "}
                        <span className="font-mono font-semibold">
                          ₹{breakupValue?.insurance.toFixed(2)}
                        </span>
                      </div>
                      <div className="detail">
                        <span>GST Amount:</span>{" "}
                        <span className="font-mono font-semibold">
                          ₹{breakupValue?.gstAmount.toFixed(2)}
                        </span>
                      </div>


                      <div className="detail">
                        <span>Total Amount:</span>{" "}
                        <span className="font-mono text-2xl" style={{ fontWeight: '700' }}>
                          ₹{breakupValue?.grossAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                  </div>
                )}
              </Modal.Body>
              <Modal.Footer className="custom-modal-footer d-flex flex-column align-items-center justify-content-center">
                
                <div className="d-flex align-items-center justify-content-start">
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    checked={isChecked}
                    className="checkbox"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <label htmlFor="termsCheckbox" className="d-flex align-items-center justify-content-start flex-wrap">
                    I hereby have read the{' '}
                    <Link className="p-1 bg-light mx-1 text-warning rounded" to={routes.termsconditions}>terms and conditions</Link> for reserving a ride
                  </label>
                </div>

                <div className="d-flex w-100 align-items-end justify-content-between">
                  <span className="outline-warning mr-2">
                    Send a booking request to host
                  </span>
                  <div className="d-flex flex-column align-items-center">
                    <Button
                      onClick={handlePlaceOrder}
                      className="custom-modal-button"
                      disabled={isLoading || !isChecked} // Disable the button if loading or checkbox is unchecked
                    >
                      {isLoading ? (
                        <span className="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <>
                          <span className="mr-2">Request Booking</span>
                          <i className="fa-solid fa-arrow-right" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

              </Modal.Footer>
            </Modal>
          </div>
        ) : (
          <div className="min-h-screen min-w-screen d-flex align-items-center justify-content-center">
            <ImageWithBasePath src="assets/img/logo-fit.png" alt="loading" />
          </div>
        )}
        ;
        <Modal
          className="modal-success"
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Booking Sucessful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="payment-success d-flex align-items-center justify-content-center">
              <div>
                <span className="check">
                  <i className="fa-solid fa-check-double"></i>
                </span>
                <h5>Booking Request Sent</h5>
                {bookingId && (
                  <p>
                    Your booking request has been sent to the user. Booking id:{" "}
                    <span className="p-1 rounded bg-slate-100">
                      #{String(bookingId)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="modal-footer p-3">
              <Link to={routes.userbookings} className="btn btn-back">
                Go to User Bookings
                <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showErrorModal}
          onHide={() => setShowErrorModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
        </Modal>
      </div>


      {isNotification && (
          <div className="container-fluid alert error-login-message mt-2" role="alert" style={{zIndex:'1200'}}>
            <div
              className="p-2 location-alert shadow bg-amber-800 items-center text-amber-100 leading-none rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-amber-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Info
              </span>
              <span className="font-semibold mr-2 text-left flex-auto d-flex align-items-center justify-content-center text-sm flex-wrap">
                <div>{notificationMessage}</div>
                <Link to={routes.settings}>
                <div className="d-flex align-items-center justify-content-center text-sm flex-wrap text-sm text-white text-decoration-underline mx-2">
                  <span>Go to Settings</span> 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
              </div>
              </Link>
              </span> 
            </div>
          </div>
        )}
    </div>
  );
};

export default listingDetails;
