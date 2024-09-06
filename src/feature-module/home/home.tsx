/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useRef, useTransition, Suspense, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import dayjs, { Dayjs } from "dayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import useScrollToTop from "../../hooks/useScrollToTop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { all_routes } from "../router/all_routes";
import {
  setDateTime,
  setSelectedCarId,
  setCarImages,
  setWishlistData,
  setCarLocation,
} from "../redux/action";
import faqData from "../../core/data/json/faq";
import { findCars, getCars } from "../api/Cars";
//import { fetchUserBookings } from "../user/userbookings_data";
const LocationInput = React.lazy(() => import('../common/locationInput'));
const LocationDisplay = React.lazy(() => import('../common/LocationDisplay'));
import { postWishlist, postCancelWishlist } from "../api/Cars";
import { Car, Location } from '../redux/types';
import {getAllCarBrands } from "../api/Cars";
import {getTopReviews} from "../api/Listing"
import { debounce } from "lodash";
import { Helmet } from "react-helmet";
import TestimonySlider from "../common/TestimonySlider";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";
//import Joyride, { CallBackProps, STATUS } from 'react-joyride';

interface Brand {
  brand_name: string;
  logo_path: string;
}

interface Testimonial {
  carId: string;
  userName: string;
  rating: number;
  comment: string;
}
interface DateTimeState {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: Location;
}
interface WishlistState {
  wishlist: { carId: number }[];
}

interface RootState {
  dateTime: DateTimeState;
  wishlist: WishlistState;

}


const Home: React.FC = () => {
  useScrollToTop();
  const dateTime = useSelector((state: RootState) => state.dateTime);
  const initialPickupLocation = useSelector(
    (state: RootState) => state.dateTime.location,
  );
  //const [run, setRun] = useState<boolean>(false);
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const routes = all_routes;
  const [isPending, startTransition] = useTransition();
  const [pickupLocation, setPickupLocation] = useState<Location | null>((initialPickupLocation || null));
  const [locationAlert, setLocationAlert] = useState(false);
  const [carListings, setCarListings] = useState<Car[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // const [carCounts, setCarCounts] = useState<{ [key: string]: number }>({});
  const [date1, setDate1] = useState<any>(() =>
    dayjs(new Date()),
  );
  const [date2, setDate2] = useState<any>(() =>
    dayjs(new Date()),
  );
  const [startTime, setStartTime] = useState<any>(() =>
    dayjs(dateTime.startTime, "HH:mm").isValid()
      ? dayjs(dateTime.startTime, "HH:mm")
      : dayjs().add(5,'minute'),
  );
  const [endTime, setEndTime] = useState<any>(() =>
    dayjs(dateTime.endTime, "HH:mm").isValid()
      ? dayjs(dateTime.endTime, "HH:mm")
      : dayjs().add(4, "hour"),
  );
  const [dateTimeError, setDateTimeError] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [inputValue, setInputValue] = useState<string>(
    initialPickupLocation?.address || "",
  );
  const [hasSuggestions, setHasSuggestions] = useState<boolean>(
    !!initialPickupLocation?.address,
  );
  const pickupLocationRef = useRef<HTMLDivElement>(null);
  const [brandNames, setBrandNames] = useState<Brand[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [sendError , setSendError] = useState<any>('');
  const toggleFAQ = (index: number | null) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  useEffect(() => {
    if (dayjs().isValid()) {
      setDate1(dayjs(new Date()));
    }
    if (dayjs().isValid()) {
      setDate2(dayjs().add(1,'day'));
    } 

    if (dayjs().isValid()) {
      setStartTime(dayjs().add(5,'minute'));
    } 

    if (dayjs().isValid()) {
      setEndTime(dayjs().add(4, "hour"));
    }
  }, [dateTime]);

  const toCamelCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase(),
      )
      .replace(/\s+/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          // Fetch car listings without token
          const response = await getCars();
          const responseData = await response?.json();
          if (!response || !response.ok) {
            throw new Error(
              `Error fetching data: ${response?.statusText || "Unknown error"}`,
            );
          }
          if (responseData && responseData.cars) {
            setCarListings(responseData.cars);
            //countCarsByType(responseData.cars);
          } else {
            console.error("Invalid data structure in API response");
          }
        } else {
          // Fetch car listings with token and default date/time
          const startDate = date1.format("YYYY-MM-DD");
          const endDate = date2.format("YYYY-MM-DD");
          const startTimeStr = startTime.format("HH:mm");
          const endTimeStr = endTime.format("HH:mm");
          const response = await findCars(
            startDate,
            endDate,
            startTimeStr,
            endTimeStr,
            latitude,
            longitude,
          );
          if (response) {
            setCarListings(response);
            //countCarsByType(response);
          } else {
            console.error("Invalid data structure in API response");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, date1, date2, startTime, endTime]);

  // fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await getAllCarBrands();
      setBrandNames(fetchedBrands);
    };
    fetchBrands();
  }, []);

  //fetch top reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const testimonialsData = await getTopReviews();
    
        if (testimonialsData && testimonialsData.feedback) {
          setTestimonials(testimonialsData.feedback);
          setTestimonialsLoading(false);
        } else {
          setTestimonials(null);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setTestimonials([]);
        
      }
    };

    // Call the fetchReviews function
    fetchReviews();
  }, []);

  const getBrandLogo = (brandName: string): string | undefined => {
    const brand = brandNames.find(
      (b) => b.brand_name?.toLowerCase() === brandName?.toLowerCase(),
    );
    return brand ? brand.logo_path : undefined;
  };
  // useEffect(() => {
  //   dispatch<any>(fetchUserBookings());
  // }, [dispatch]);

  const handleDateChange = (newValue: Dayjs, type: "start" | "end") => {
    if (type === "start") {
      setDate1(newValue);
      setDate2(newValue.add(1, "day"));
    } else {
      setDate2(newValue);
    }
  };
  
  const handleTimeChange = (newValue: React.SetStateAction<any> , type: any) => {
    if (type === 'start') {
      setStartTime(newValue);
      setEndTime(newValue.add(12, "hour"));
    } else {
      setEndTime(newValue);
    }
  };

  async function fetchCarData() {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }
      
    } catch (error) {
      console.error("Error fetching car data", error);
    }
  }
  

    const startDate = date1.format('YYYY-MM-DD');
    const endDate = date2.format('YYYY-MM-DD');
    const startTimeStr = startTime.format('HH:mm');
    const endTimeStr = endTime.format('HH:mm');

    const validateDateTime = () => {
      if (
        !startDate ||
        !endDate ||
        !startTimeStr ||
        !endTimeStr
      ) {
        setSendError(
          "All fields must be filled out, including a valid location.",
        );
        setDateTimeError(true);
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return false;
      }
      const currentDateTime = dayjs();
      const pickupDateTime = dayjs(`${startDate}T${startTimeStr}`);
      const returnDateTime = dayjs(`${endDate}T${endTimeStr}`);
    
      if (pickupDateTime.isBefore(currentDateTime)) {
        setSendError("Start date or time cannot be before the current date/time.");
        setDateTimeError(true);
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return false;
      }
  
      if (returnDateTime.isBefore(pickupDateTime)) {
        setSendError("Start date or time must be before End date or time.");
        setDateTimeError(true);
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return false;
      }
      if (pickupDateTime.isSame(returnDateTime)) {
        setSendError("Start date or time cannot be the same as End date or time.");
        setDateTimeError(true);
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return false;
      }
    
      if (!returnDateTime.isAfter(pickupDateTime.add(1, 'hour'))) {
        setSendError("Start date or time must be at least one hour after the End date or time.");
        setDateTimeError(true);
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return false;
      }
    
      setSendError("");
      setDateTimeError(false);
      return true;
    };

    const handleFindCarsSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      if (!pickupLocation || !pickupLocation.isValidLocation || !inputValue || inputValue.length <= 2 || !hasSuggestions) {
        setLocationAlert(true);
        setTimeout(() => {
          setLocationAlert(false);
        }, 5000); 
        return;
      }
      if(!validateDateTime()){
        return;
      }

    
      startTransition(() => {
        dispatch(setDateTime(startDate, startTimeStr, endDate, endTimeStr, pickupLocation));
        fetchCarData()
          .then(() => navigate(routes.listinggrid))
          .catch((error) => console.error("Error found", error));
      });
    };
    

  const handleRentNowClick = (selectedCar: any) => {

    if(!token){
      navigate(routes.login);
    }

    if (!pickupLocation || !pickupLocation.isValidLocation) {
      setLocationAlert(true);
      setTimeout(() => {
        setLocationAlert(false);
      }, 5000); 
      if (pickupLocationRef.current) {
        pickupLocationRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return; 
    }
    const today = dayjs();
      if (date1.isBefore(today, 'day')) {
        
        setDateTimeError(true)
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return;
      }
    
      if (date2.isBefore(date1, 'day')) {
        setDateTimeError(true)
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return;
      }
    
      if (date1.isSame(date2, 'day') && endTime.isBefore(startTime) || date1.isSame(date2, 'day') &&  endTime.isSame(startTime) || date1.isSame(date2, 'day') && 
          endTime.isAfter(startTime) && 
          endTime.diff(startTime, 'hours') < 1) 
        {
        setDateTimeError(true)
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return;
      }   
      const endDateTime = date2.isSame(date1, 'day') ? date1.set('hour', endTime.hour()).set('minute', endTime.minute()) : date2.set('hour', endTime.hour()).set('minute', endTime.minute());
      const startDateTime = date1.set('hour', startTime.hour()).set('minute', startTime.minute());

      if (endDateTime.isBefore(startDateTime)) {
        setDateTimeError(true);
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return;
      }


    // If the pickup location is valid and a car is selected
    if (selectedCar) {
      dispatch(setSelectedCarId(selectedCar.carId));
      dispatch(
        setDateTime(
          startDate,
          startTimeStr,
          endDate,
          endTimeStr,
          pickupLocation,
        ),
      );
      dispatch(
        setCarImages({
          carImage1: selectedCar.carImage1,
          carImage2: selectedCar.carImage2,
          carImage3: selectedCar.carImage3,
          carImage4: selectedCar.carImage4,
          carImage5: selectedCar.carImage5,
        }),
      );
      dispatch(
        setCarLocation({
          carLatitude: selectedCar.latitude,
          carLongitude: selectedCar.longitude,
        }),
      );
      navigate(routes.listingdetails);
    } else {
      alert("Car information is not available.");
    }
  };

  const renderStars = useCallback((rating: any) => {
    return Array.from({ length: rating }, (_, index) => <i key={index} className="fas fa-star filled" />);
  }, []);
  

  const handleViewAllCars = () => {
    // Check if the pickup location is selected and valid
    if (!pickupLocation || !pickupLocation.isValidLocation) {
      setLocationAlert(true); 
      setTimeout(() => {
        setLocationAlert(false);
      }, 5000); 
      if (pickupLocationRef.current) {
        pickupLocationRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return; // Prevent navigation to listing details
    }
    
    // If the pickup location is valid and a car is selected
    navigate(routes.listinggrid);
  };
  useEffect(() => {
    if (pickupLocation) {
  
      setLatitude(pickupLocation.lat);
      setLongitude(pickupLocation.lng);
    }
  }, [pickupLocation]);

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
      const updatedWishlist = wishlist.filter(
        (item: { carId: any }) => item.carId !== carId,
      );
      dispatch(setWishlistData(updatedWishlist));
    } catch (error) {
      console.error("Error updating cancel wishlist:", error);
    }
  };
  
  const handleWishlistClick = useCallback((car: { [x: string]: any; }) => {
    const isWishlisted = wishlist.some((wishlistCar) => wishlistCar.carId === car['carId']);
    if (isWishlisted) {
      handleCancelWishlistUpdate(car['carId']);
    } else {
      handleWishlistUpdate(car['carId']);
    }
  }, [wishlist]);
  
  const displayedCars = carListings.length >= 6 ? carListings.slice(0, 6) : carListings.slice(0, 3);

  const debouncedSetInputValue = useCallback(
    debounce((value) => {
      setInputValue(value);
    }, 300),
    []
  );

  // const settings = {
  //   dots: true,
  //   nav: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  // };


  // const handleJoyrideCallback = (data: CallBackProps) => {
  //   const { status } = data;
  //   // Ensure that status is one of the expected values
  //   if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
  //     setRun(false);
  //   }
  // };

  // const steps = [
  //   {
  //     target: '.search-box-banner',
  //     content: 'This is the first step!',
  //   },
  //   {
  //     target: '.section-heading',
  //     content: 'This is the second step!',
  //   },
  // ];


  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <div>
      <Helmet>
        <GoogleAnalyticsScript/>
        {/* <button onClick={() => setRun(true)}>Start Tour</button>
      <Joyride
        run={run}
        steps={steps}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      /> */}
        <title>Home - Spintrip Car Rentals </title>
        <meta
          name="description"
          content="Spintrip Car Rentals - Affordable self-drive car rentals in Bangalore. Rent top-notch cars from local hosts and enjoy competitive pricing. Hosts earn exciting commissions by listing their cars with us."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals, affordable car rentals Bangalore, self-drive car rentals Bangalore, rent cars Bangalore, top-notch cars Bangalore, local car hosts Bangalore, competitive car rental pricing, car rental commissions, list your car Bangalore, Bangalore car hire, best car rentals Bangalore, car rental deals Bangalore, self-drive cars Bangalore, car rental service Bangalore, rent a car Bangalore, car rental company Bangalore, self-drive rental services, weekend car rentals Bangalore, hourly car rentals Bangalore, economic car rentals Bangalore"
        ></meta>
      </Helmet>
  
      {/* Banner */}
      <section className="banner-section banner-slider">
        <div className="container">
          <div className="home-banner">
            <div className="row align-items-center mt-5">
              <div
                className="col-lg-6 d-flex flex-column align-items-start justify-content-center md:justify-content-start"
                data-aos="fade-right"
              >
                <Link to="/app" className="border  border-2 transluencent-background d-flex align-items-end justify-content-start">
                <div className="explore-text bg-transparent text-white d-flex align-items-end justify-content-start ">
                  {" "}
                  <ImageWithBasePath className="android-icon" src="assets/img/android-icon.png" alt="android-icon"/>
                  <ImageWithBasePath className="android-icon" src="assets/img/apple-icon.png" alt="apple-icon"/>
                  <div className="">Download App</div>
                  
                </div>
                </Link>
                <h1
                  ref={pickupLocationRef}
                  style={{ fontWeight: '700' }}
                  className="hero-text-animation text-5xl rounded p-2"
                >
                  Find your dream car on
                  <br />
                  SpinTrip - The Best Car Rental Service
                  <span className="p-1 text-decoration-underline"></span>
                </h1>
                <div className="view-all mt-5 ">
                  <div
                    onClick={() => handleViewAllCars()}
                    className="btn btn-view d-inline-flex align-items-center"
                  >
                    View all Cars{" "}
                    <span>
                      <i className="feather icon-arrow-right ms-2" />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 min-h-content d-flex align-items-center justify-content-center"
                data-aos="fade-left"
              >
                <img
                  className="rounded-md shadow-lg hero-ad cursor-pointer my-3"
                  src=""
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Banner */}
  
      {/* Search */}
      <div className="section-search ">
        <div className="container">
          <div className="search-box-banner shadow-lg">
            <form>
              <ul className="row p-2">
                <li className="col-12 col-md-4 ">
                  <div className="h-100 input-block d-flex flex-column align-items-start justify-content-between">
                    <label>Pickup Location</label>
                    <Suspense fallback={<div>Loading location input...</div>}>
                      <LocationInput 
                        setLocation={setPickupLocation} 
                        setInputValue={debouncedSetInputValue } 
                        setHasSuggestions={setHasSuggestions} 
                        initialValue={initialPickupLocation?.address || ''} 
                      />
                    </Suspense>
                  </div>
                </li>
  
                <li className="col-12 col-md-4 mt-2">
                  <div className="input-block ">
                    <label>Pickup Date</label>
                  </div>
                  <div className="input-block-wrapp">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Pickup Date"
                        value={date1}
                        onChange={(newValue) =>
                          handleDateChange(newValue, "start")
                        }
                        slotProps={{
                          textField: (params) => (
                            <TextField
                              {...params}
                            />
                          ),
                        }}
                        minDate={dayjs()} 
                      />
                      <TimePicker
                        label="Pickup Time"
                        value={startTime}
                        onChange={(newValue) =>
                          handleTimeChange(newValue, "start")
                        }
                        ampm={false} // Use 24-hour format
                        views={["hours", "minutes"]}
                        openTo="hours"
                         
                        slotProps={{
                          textField: (params) => (
                            <TextField
                              {...params}
                            />
                          ),
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </li>
  
                <li className="col-12 col-md-4 mt-2">
                  <div className="input-block">
                    <label>Return Date</label>
                  </div>
                  <div className="input-block-wrapp m-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Return Date"
                        value={date2}
                        onChange={(newValue) =>
                            handleDateChange(newValue, "end")
                          }
                       
                        slotProps={{
                          textField: (params) => (
                            <TextField
                              {...params}
                            />
                          ),
                        }}
                        minDate={date1.add(0, "day")}
                      />
                      <TimePicker
                        label="Return Time"
                        value={endTime}
                        onChange={(newValue) => handleTimeChange(newValue , "end")}
                        slotProps={{
                          textField: (params) => (
                            <TextField
                              {...params}
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
                <div className="row mt-2 d-flex align-items-center justify-content-center">
                  <li className="col-12 col-md-6">
                    <div className="input-block w-100 d-flex flex-column align-items-center justify-content-center">
                      <div className="search-btn">
                        {isPending ? (
                          <div className="mx-3 spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <button 
                            className="btn search-button" 
                            onClick={handleFindCarsSubmit} 
                            type="submit"
                          >
                            <i className="fa fa-search" aria-hidden="true" />
                            Search
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </form>
          </div>
        </div>
      </div>
      {/* /Search */}
  
      {/* Services */}
      <section className="section services">
        <div className="service-right">
          <ImageWithBasePath
            src="assets/img/bg/service-right.svg"
            className="img-fluid"
            alt="services right"
            loading="lazy"
          />
        </div>
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>How It Works</h2>
            <p>Find your ideal car rental in just a few simple steps.</p>
          </div>
          {/* /Heading title */}
          <div className="services-work">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-12" data-aos="fade-down">
                <div className="services-group">
                  <div className="services-icon border-secondary">
                    <ImageWithBasePath
                      className="icon-img bg-secondary"
                      src="assets/img/icons/services-icon-01.svg"
                      alt="Choose Locations"
                      loading="lazy"
                    />
                  </div>
                  <div className="services-content">
                    <h3>1. Choose Locations</h3>
                    <p>
                      Select where you want to start and end your trip with ease
                      and flexibility.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12" data-aos="fade-down">
                <div className="services-group">
                  <div className="services-icon border-warning">
                    <ImageWithBasePath
                      className="icon-img bg-warning"
                      src="assets/img/icons/services-icon-02.svg"
                      alt="Choose Locations"
                      loading="lazy"
                    />
                  </div>
                  <div className="services-content">
                    <h3>2. Pick-Up Locations</h3>
                    <p>
                      Schedule your pickup at a convenient spot that suits your
                      travel plans perfectly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12" data-aos="fade-down">
                <div className="services-group">
                  <div className="services-icon border-dark">
                    <ImageWithBasePath
                      className="icon-img bg-dark"
                      src="assets/img/icons/services-icon-03.svg"
                      alt="Choose Locations"
                      loading="lazy"
                    />
                  </div>
                  <div className="services-content">
                    <h3>3. Book your Car</h3>
                    <p>
                      Reserve your vehicle effortlessly for a seamless and
                      enjoyable travel experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Services */}
  
      {/* Popular Brands */}
      <section className="section popular-services popular-explore">
        <div className="container  pt-5 rounded-xl">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Explore Most Popular Cars</h2>
            <p>
              Discover our most sought-after vehicles for your next adventure.
            </p>
          </div>
          {/* /Heading title */}
          
          <div className="tab-content">
            <div className="tab-pane active" id="Carmazda">
              <div className="row">
                {displayedCars.map((car: any, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={index}
                    data-aos="fade-down"
                  >
                    <div className="listing-item border border-2 border-gray">
                      <div className="listing-img">
                        <div onClick={() => handleRentNowClick(car)}>
                          <img
                            src={
                              car.carImage1
                                ? car.carImage1
                                : "/assets/img/cars/no_img_found.jpg"
                            }
                            className="img-fluid"
                            alt={car.carModel}
                            loading="lazy"
                          />
                        </div>
                        <div className="fav-item">
                          <span className="featured-text">
                            {getBrandLogo(car.brand) && (
                              <img
                                className="car-brand-logo"
                                src={getBrandLogo(car.brand)}
                                alt={`${car.brand} logo`}
                                style={{ objectFit: "contain" }}
                                loading="lazy"
                              />
                            )}
                          </span>
                          <Link
                            to="#"
                            className={`fav-icon ${
                              wishlist.some(
                                (wishlistCar: { carId: any }) =>
                                  wishlistCar.carId === car.carId
                              )
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => handleWishlistClick(car)}
                          >
                            <i className="feather icon-heart" />
                          </Link>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features">
                          <h3 className="listing-title">
                            <div onClick={() => handleRentNowClick(car)}>
                              {car.carModel}
                            </div>
                          </h3>
                          <div className="list-rating">
                            {renderStars(car["rating"])}
  
                            <span>
                              (
                              {car["rating"]
                                ? car["rating"].toFixed(1)
                                : "Not rated Yet"}
                              )
                            </span>
                          </div>
                        </div>
                        <div className="listing-details-group">
                        <div className="row">
                                <div className="col-md-4 col-sm-6 d-flex align-items-center mb-3">
                                  <span className="me-2">
                                    <ImageWithBasePath
                                      src="assets/img/icons/car-parts-02.svg"
                                      alt={car.mileage}
                                    />
                                  </span>
                                  <p className="mb-0">{car.mileage || "NA"} kmpl</p>
                                </div>
                                <div className="col-md-4 col-sm-6 d-flex align-items-center mb-3">
                                  <span className="me-2">
                                    <ImageWithBasePath
                                      src="assets/img/icons/calendar-icon.svg"
                                      alt={car.year}
                                    />
                                  </span>
                                  <p className="mb-0">{car.registrationYear.split("-")[0]}</p>
                                </div>
                                <div className="col-md-4 col-sm-6 d-flex align-items-center mb-3">
                                  <span className="me-2">
                                    <ImageWithBasePath
                                      src="assets/img/icons/car-parts-06.svg"
                                      alt="Persons"
                                    />
                                  </span>
                                  <p className="mb-0">{car.capacity || "5 seater"}</p>
                                </div>
                              </div>
                          
                        </div>
                        {token ? (
                          <div className="listing-location-details">
                            <Suspense fallback={<div>Loading...</div>}>
                              <div className="listing-price">
                                <LocationDisplay
                                  latitude={car.latitude}
                                  longitude={car.longitude}
                                />
                              </div>
                            </Suspense>
                            <div className="listing-price">
                              <div>
                                <h6 className="font-mono text-black">
                                  ₹{car.pricing?.costPerHr}
                                  <span>/Hr </span>{" "}
                                </h6>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="listing-location-details">
                            <div className="listing-price"></div>
                            <div className="listing-price">
                              <div>
                                <h6>
                                  ₹{car.costPerHr}
                                  <span>/Hr </span>{" "}
                                </h6>
                              </div>
                            </div>
                          </div>
                        )}
                        <div>
                          <button
                            className="py-2 bg-black hover:opacity-80 text-white rounded w-100 w-full"
                            onClick={() => handleRentNowClick(car)}
                          >
                            <span>
                              <i className="feather icon-calendar me-2" />
                            </span>
                            Rent Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Popular Services */}
  
      {/* Why Choose Us */}
      <section className="section why-choose popular-explore">
        <div className="choose-left">
          <img
            src="assets/img/bg/choose-left.png"
            className="img-fluid"
            alt="Why Choose Us"
            loading="lazy"
          />
        </div>
        <div className="container">
          <div className="section-heading" data-aos="fade-down">
            <h2>Why Choose Us</h2>
            <p>
              SpinTrip offers unparalleled car rental services, ensuring a
              seamless and enjoyable experience every time.
            </p>
          </div>
          <div className="why-choose-group">
            <div className="row d-flex align-items-center justify-content-center">
              <div
                className="col-lg-4 col-md-6 col-12 d-flex cursor-pointer"
                data-aos="fade-down"
              >
                <div className="card flex-fill border">
                  <div className="card-body">
                    <div className="choose-img choose-black">
                      <img
                        src="assets/img/icons/bx-selection.svg"
                        alt="Easy & Fast Booking"
                        loading="lazy"
                      />
                    </div>
                    <div className="choose-content">
                      <h4>Easy &amp; Fast Booking</h4>
                      <p>
                        Experience seamless and quick car booking with our
                        user-friendly platform. Enjoy a hassle-free reservation
                        process designed to save you time and effort.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 d-flex cursor-pointer"
                data-aos="fade-down"
              >
                <div className="card flex-fill border">
                  <div className="card-body">
                    <div className="choose-img choose-secondary">
                      <img
                        src="assets/img/icons/bx-crown.svg"
                        alt="Many Pickup Locations"
                        loading="lazy"
                      />
                    </div>
                    <div className="choose-content">
                      <h4>Many Pickup Locations</h4>
                      <p>
                        Benefit from a wide network of convenient pickup
                        locations across the city. Whether you're downtown or in
                        the suburbs, we have a spot nearby for you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 d-flex cursor-pointer"
                data-aos="fade-down"
              >
                <div className="card flex-fill border">
                  <div className="card-body">
                    <div className="choose-img choose-primary">
                      <img
                        src="assets/img/icons/bx-user-check.svg"
                        alt="Customer Satisfaction"
                        loading="lazy"
                      />
                    </div>
                    <div className="choose-content">
                      <h4>Customer Satisfaction</h4>
                      <p>
                        Our top priority is your satisfaction. We strive to
                        provide exceptional service and ensure a pleasant and
                        memorable experience for every customer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Why Choose Us */}
  
      {/* About us Testimonials */}
      <section className="section about-testimonial testimonials-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-down">
            <h2 className="title text-white">What People say about us? </h2>
            <p className="description text-white">
              SpinTrip offers unparalleled car rental services, ensuring a
              seamless and enjoyable experience every time.
            </p>
          </div>
          <div className="row owl-theme">
            {testimonialsLoading ? (
              <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                <p>Loading...</p>
              </div>
            ) : !testimonials || testimonials.length === 0 ? (
              <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                <div>
                  <h3>No Reviews available</h3>
                </div>
              </div>
            ) : (
              <Suspense fallback={<div>Loading testimonials...</div>}>
                
                <TestimonySlider testimonials={testimonials} />
              </Suspense>
            )}
          </div>
        </div>
      </section>
      {/* /About us Testimonials */}
  
      {/* FAQ */}
      <section className="section faq-section ">
        <div className="container">
          <div className="section-heading" data-aos="fade-down">
            <h2>Frequently Asked Questions</h2>
            <p>
              Have questions? We have answers to the most frequently asked
              questions about our car rental services.
            </p>
          </div>
          <div className="faq-info">
            {faqData.map((faq, index) => (
              <div
                className="faq-card bg-white border-warning shadow-sm"
                key={index}
              >
                <h4 className="faq-title font-semibold ">
                  <button
                    className="btn btn-link d-flex align-items-center justify-content-center "
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="faq-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                      />
                    </svg>
                  </button>
                </h4>
                <div
                  className={`faq-answer ${
                    activeIndex === index ? "show" : ""
                  }`}
                >
                  <p className="font-smibold text-center">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {locationAlert && (
          <div className="alert error-login-message mt-2" role="alert">
            <div
              className="p-2 location-alert shadow bg-red-800 items-center text-red-100 leading-none rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Error
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                Enter Pickup Location
              </span>
            </div>
          </div>
        )}
        {dateTimeError && (
          <div className="alert error-login-message mt-2" role="alert">
            <div
              className="p-2 location-alert shadow bg-red-800 items-center text-red-100 leading-none rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="font-semibold mr-2 text-left flex-auto">
                {sendError}
              </span>
            </div>
          </div>
        )}
      </section>
      {/* /FAQ */}

      <section className="section popular-services popular-explore">
        <div className="container  pt-5 rounded-xl">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Explore From Popular Car Brands</h2>
           
          </div>
          {/* /Heading title */}
          <div className="row justify-content-center">
            <div className="col-lg-12" data-aos="fade-down">
              <div className="listing-tabs-group">
                {brandNames.map((brand, index) => (
                  <ul
                    className="nav listing-buttons gap-3"
                    key={index}
                    data-bs-tabs="tabs"
                  >
                    <li>
                      <Link
                        className="active"
                        aria-current="true"
                        data-bs-toggle="tab"
                        to={`#${brand.brand_name.toLowerCase()}`}
                      >
                        <span>
                          <img
                            className="brand-icon"
                            src={brand.logo_path}
                            alt={brand.brand_name}
                            loading="lazy"
                          />
                        </span>
                        {toCamelCase(brand.brand_name)}
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>
    </div>
  );
  
};

export default Home;
