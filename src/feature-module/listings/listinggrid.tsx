import React, { useEffect, useState, useRef } from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { all_routes } from "../router/all_routes";
import ListingSidebar from "./listingsidebar";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import ImageWithBasePath1 from "../../core/data/img/ImageWithBasePath1";
import { useDispatch, useSelector } from "react-redux";
import {
  setFindCarsData,
  setSelectedCarId,
  setDateTime,
  setCarImages,
  setCarLocation,
  setWishlistData,
} from "../redux/action";
import { findCars, postCancelWishlist, postWishlist } from "../api/Cars";
//import Aos from "aos";
import NotificationBar from "../common/notificationBar";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import useScrollToTop from "../../hooks/useScrollToTop";
import dayjs, { Dayjs } from "dayjs";
import LocationInput from "../common/locationInput";
import LocationDisplay from "../common/LocationDisplay"; // Adjust the import path as necessary

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

interface Location {
  lat: number;
  lng: number;
  address: string;
  isValidLocation: boolean;
}
interface OptionType {
  value: number;
  label: string;
}

const ListingGrid: React.FC = () => {
  const pickupLocationRef = useRef<HTMLDivElement>(null);
  useScrollToTop();
  const dateTime = useSelector((state: RootState) => state.dateTime);
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const initialPickupLocation = dateTime.location;
  const [locationAlert, setLocationAlert] = useState(false);
  const [dateTimeError, setDateTimeError] = useState(false);
  const [pickupLocation, setPickupLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
    isValidLocation: boolean;
  } | null>(initialPickupLocation || null);
  const [inputValue, setInputValue] = useState<string>(
    initialPickupLocation.address || "",
  );
  const [hasSuggestions, setHasSuggestions] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 5 items per page
  const [sortOrder, setSortOrder] = useState("Low to High"); // Default sort order
  const [currentPage, setCurrentPage] = useState(1);

  const [date1, setDate1] = useState<any>(() =>
    dayjs(dateTime.startDate || new Date()),
  );
  const [date2, setDate2] = useState<any>(() =>
    dayjs(dateTime.endDate ||  new Date()),
  );

  const [startTime, setStartTime] = useState<any>(() =>
    dayjs(dateTime.startTime, "HH:mm").isValid()
      ? dayjs(dateTime.startTime, "HH:mm")
      : dayjs().add(1,'seconds'),
  );
  const [endTime, setEndTime] = useState<any>(() =>
    dayjs(dateTime.endTime, "HH:mm").isValid()
      ? dayjs(dateTime.endTime, "HH:mm")
      : dayjs().add(4, "hour"),
  );
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (dayjs(dateTime.startDate).isValid()) {
      setDate1(dayjs(dateTime.startDate));
    } else {
      setDate1(dayjs());
    }

    if (dayjs(dateTime.endDate).isValid()) {
      setDate2(dayjs(dateTime.endDate));
    } else {
      setDate2(dayjs());
    }

    if (dayjs(dateTime.startTime, "HH:mm").isValid()) {
      setStartTime(dayjs(dateTime.startTime, "HH:mm"));
    } else {
      setStartTime(dayjs());
    }

    if (dayjs(dateTime.endTime, "HH:mm").isValid()) {
      setEndTime(dayjs(dateTime.endTime, "HH:mm"));
    } else {
      setEndTime(dayjs().add(4, "hour"));
    }
  }, [dateTime]);

  const fetchData = async () => {
    setLoading(true);
    if (!token) {
      navigate(all_routes.signup);
      return;
    }

    try {
      const startDate = date1.format("YYYY-MM-DD");
      const endDate = date2.format("YYYY-MM-DD");
      const startTimeStr = startTime.format("HH:mm");
      const endTimeStr = endTime.format("HH:mm");
      const cars = await findCars(
        startDate,
        endDate,
        startTimeStr,
        endTimeStr,
        latitude,
        longitude,
      );
      setResponse(Array.isArray(cars) ? cars : [cars]);
      dispatch(setFindCarsData(Array.isArray(cars) ? cars : [cars]));
    } catch (err) {
      console.error("Failed to fetch car data:", err);
      setError("Failed to load car data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      dateTime.startDate &&
      dateTime.endDate &&
      dateTime.startTime &&
      dateTime.endTime &&
      latitude !== 0 &&
      longitude !== 0
    ) {
      fetchData();
    }
  }, [location, token, navigate, dateTime, latitude, longitude]);

  const handleDateChange = (newValue: Dayjs, type: "start" | "end") => {
    if (type === "start") {
      setDate1(newValue);
      setDate2(newValue.add(1, "day"));
    } else {
      setDate2(newValue);
    }
  };

  const handleTimeChange = (newValue: Dayjs, type: "start" | "end") => {
    if (type === "start") {
      setStartTime(newValue);
      setEndTime(newValue.add(12, "hour"));
    } else {
      setEndTime(newValue);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleItemsPerPageChange = (newValue: SingleValue<OptionType>) => {
    if (newValue) {
      setItemsPerPage(newValue.value);
      setCurrentPage(1); 
    }
  };

  const handleSortOrderChange = (newValue: SingleValue<OptionType>) => {
    if (newValue) {
      setSortOrder(newValue.label);
    }
  };

  const totalPages = response ? Math.ceil(response.length / itemsPerPage) : 0;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (response && currentPage < Math.ceil(response.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const resetFilters = () => {
    setSelectedFilters({});
    window.scrollTo({
      top: 0,
    });
  };

  const filterCars = () => {
    if (!response) return [];

    let filteredCars = response;

    // Apply search filter
    const searchQuery = searchValue.toLowerCase();
    if (searchQuery) {
      filteredCars = filteredCars.filter(
        (car: { carModel: string; brand: string }) =>
          car.carModel?.toLowerCase().includes(searchQuery) ||
          car.brand?.toLowerCase().includes(searchQuery),
      );
    }

    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        filteredCars = filteredCars.filter(
          (car: {
            type: string;
            fuelType: any;
            sevenSeater: any;
            pricing: { costPerHr: number };
            rating: any;
          }) => {
            switch (key) {
              case "Car Category":
                return values.includes(car.type);
              case "Car Type": {
                const carFuelType = car.fuelType ? "Diesel" : "Petrol";
                return values.includes(carFuelType);
              }
              case "Capacity":
                return values.includes(
                  car.sevenSeater ? "7 Seater" : "5 Seater",
                );
              case "Price (INR)":
                if (values.includes("< 200/Day") && car.pricing.costPerHr < 200)
                  return true;
                if (
                  values.includes("200-400") &&
                  car.pricing.costPerHr >= 200 &&
                  car.pricing.costPerHr <= 400
                )
                  return true;
                if (values.includes("> 400/Day") && car.pricing.costPerHr > 400)
                  return true;
                return false;
              case "Ratings":
                return values.includes(`${car.rating} ⭐`);
              default:
                return true;
            }
          },
        );
      }
    });

    // Sort cars
    filteredCars.sort(
      (
        a: { pricing: { costPerHr: number } },
        b: { pricing: { costPerHr: number } },
      ) => {
        if (sortOrder === "Low to High") {
          return a.pricing.costPerHr - b.pricing.costPerHr;
        } else {
          return b.pricing.costPerHr - a.pricing.costPerHr;
        }
      },
    );

    // Paginate cars
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCars.slice(startIndex, endIndex);
  };

  const filteredCars = filterCars();

  const handleFindCarsSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const today = dayjs().startOf('day');
    const currentTime = dayjs();
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
    
      if (
        date1.isSame(today, 'day') && startTime.isBefore(currentTime, 'minute') ||
        date2.isSame(today, 'day') && endTime.isBefore(currentTime, 'minute')
      ) {
        setDateTimeError(true);
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return;
      }

      if (
        date1.isSame(date2, 'day') && (
          endTime.isBefore(startTime) ||
          endTime.isSame(startTime) ||
          endTime.diff(startTime, 'hours') < 1
        )
      ) {
        setDateTimeError(true);
        setTimeout(() => {
          setDateTimeError(false);
        }, 5000);
        return;
      }
    // Check the conditions previously used for disabling the button
    if (
      !pickupLocation ||
      !pickupLocation.isValidLocation ||
      !inputValue ||
      inputValue.length <= 2 ||
      !hasSuggestions
    ) {
      setLocationAlert(true);
      setTimeout(() => {
        setLocationAlert(false);
      }, 5000); 
      return;
    }

    if (!pickupLocation || !pickupLocation.isValidLocation) {
      setLocationAlert(true);
      setTimeout(() => {
        setLocationAlert(false);
      }, 5000); 
      return;
    }

    try {
      const startDate = date1.format("YYYY-MM-DD");
      const endDate = date2.format("YYYY-MM-DD");
      const startTimeStr = startTime.format("HH:mm");
      const endTimeStr = endTime.format("HH:mm");

      setLoading(true);
      const response = await findCars(
        startDate,
        endDate,
        startTimeStr,
        endTimeStr,
      );
      dispatch(
        setDateTime(
          startDate,
          startTimeStr,
          endDate,
          endTimeStr,
          pickupLocation,
        ),
      );
      setResponse(response);
      setLoading(false);
    } catch (error) {
      console.error("Error found", error);
      setLoading(false);
    }
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

  const handleWishlistClick = (car: { carId: any }) => {
    const isWishlisted = wishlist.some(
      (wishlistCar: { carId: any }) => wishlistCar.carId === car.carId,
    );
    if (isWishlisted) {
      handleCancelWishlistUpdate(car.carId);
    } else {
      handleWishlistUpdate(car.carId);
    }
  };
      const startDate = date1.format("YYYY-MM-DD");
      const endDate = date2.format("YYYY-MM-DD");
      const startTimeStr = startTime.format("HH:mm");
      const endTimeStr = endTime.format("HH:mm");

  const handleRentNowClick = (selectedCar: any) => {
    if (!pickupLocation || !pickupLocation.isValidLocation) {
      setLocationAlert(true); // Show the location alert
      setTimeout(() => {
        setLocationAlert(false);
      }, 5000)
      if (pickupLocationRef.current) {
        pickupLocationRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return; // Prevent navigation to listing details
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
        setCarLocation({
          carLatitude: selectedCar.latitude,
          carLongitude: selectedCar.longitude,
        }),
      );
      dispatch(
        setCarImages({
          carImage1:
            selectedCar.carImage1 || "/assets/img/cars/no_img_found.jpg",
          carImage2:
            selectedCar.carImage2 || "/assets/img/cars/no_img_found.jpg",
          carImage3:
            selectedCar.carImage3 || "/assets/img/cars/no_img_found.jpg",
          carImage4:
            selectedCar.carImage4 || "/assets/img/cars/no_img_found.jpg",
          carImage5:
            selectedCar.carImage5 || "/assets/img/cars/no_img_found.jpg",
        }),
      );
      navigate(all_routes.listingdetails);
    } else {
      alert("Car information is not available.");
    }
  };

  return (
    <div className="main-wrapper" ref={pickupLocationRef}>
      <Breadcrumbs
        title="Car Listings"
        subtitle="Listings"
        maintitle={undefined}
      />
      <NotificationBar />

      <section className="section car-listing">
        <div className="section-search ">
          <div className="container">
            <div className="search-box-banner bg-light">
              <form onSubmit={handleFindCarsSubmit}>
                <ul className="d-flex justify-content-center align-items-center px-5">
                  <li className="column-group-main ">
                    <div className="input-block">
                      <label>Pickup Location</label>
                      <LocationInput
                        setLocation={setPickupLocation}
                        setInputValue={setInputValue}
                        setHasSuggestions={setHasSuggestions}
                        initialValue={initialPickupLocation.address || ""}
                      />
                    </div>
                  </li>
                  <li className="column-group-main ">
                    <div className="input-block">
                      <label>Pickup Date</label>
                    </div>
                    <div className="input-block-wrapp ">
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
                                InputProps={{
                                  ...params.InputProps,
                                  readOnly: true,
                                  className: "clock-format",
                                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                                  onClick:
                                    params.InputProps?.onClick || (() => { console.log("none") }),
                                }}
                              />
                            ),
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  </li>
                  <li className="column-group-main ">
                    <div className="input-block">
                      <label>Return Date</label>
                    </div>
                    <div className="input-block-wrapp">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Return Date"
                          value={date2}
                          onChange={(newValue) =>
                            handleDateChange(newValue, "end")
                          }
                          minDate={date1.add(0, "day")}
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
                        />
                        <TimePicker
                          label="Return Time"
                          value={endTime}
                          onChange={(newValue) =>
                            handleTimeChange(newValue, "end")
                          }
                          ampm={false} // Use 24-hour format
                          views={["hours", "minutes"]}
                          openTo="hours"
                          
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
                                    params.InputProps?.onClick || (() => { console.log("None") }), // Ensure onClick exists
                                }}
                              />
                            ),
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  </li>
                  <div className="row mt-4 w-[70%] px-3 d-flex justify-content-center align-items-center">
                    <div className="input-block">
                      <div className="search-btn">
                        <button className="btn search-button" type="submit">
                          <i className="fa fa-search" aria-hidden="true" />
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </ul>
              </form>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <p>
            Showing{" "}
            <span className="font-bold text-xl">
              {response
                ? Math.max(0, Math.min(itemsPerPage, filteredCars.length))
                : 0}
            </span>{" "}
            Results
          </p>

          <div className="d-flex align-items-center justify-content-end">
            <button
              className="filter-button d-lg-none "
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            >
              Filters
              {/* up */}
              {isSidebarVisible ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="arrow-button-down"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="arrow-button-down"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
          <div className="col-xl-12 col-lg-12 col-sm-12 col-12 my-2 ">
            <div className="product-filter-group d-flex algin-items-center justify-content-end">
              <div className="d-flex align-items-center justify-content-center">
                <div className="mx-1">
                  <div className="sorting-select select-one">
                    <Select
                      className="select w-100 custom-select-width custom-zindex"
                      options={[
                        { value: 10, label: "10" },
                        { value: 15, label: "15" },
                        { value: 20, label: "20" },
                      ]}
                      placeholder="10"
                      isSearchable={false}
                      onChange={(newValue) =>
                        handleItemsPerPageChange(newValue)
                      }
                    />
                  </div>
                </div>

                <div className="mx-1">
                  <Select
                    className="select w-100 custom-select-width custom-zindex "
                    options={[
                      { value: 1, label: "Low to High" },
                      { value: 2, label: "High to Low" },
                    ]}
                    placeholder="Low to High"
                    isSearchable={false}
                    onChange={(newValue) => handleSortOrderChange(newValue)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className={`col-lg-2 col-12 listing-sidebar ${isSidebarVisible ? "" : "d-none d-lg-block"}`}
            >
              <div className="">
                <ListingSidebar
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  handleSearchChange={handleSearchChange}
                  resetFilters={resetFilters}
                />
              </div>
            </div>
            <div className="col-lg-10">
              {loading ? (
                <div className="flex justify-center items-center w-58 h-78">
                  <div role="status" className="max-w-md animate-pulse">
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <div className="row ">
                  {filteredCars.length === 0 ? (
                    <div className="w-full">
                      <div
                        className="p-2 location-alert listing-error shadow bg-amber-700 items-center text-amber-100 leading-none rounded-full flex lg:inline-flex"
                        role="alert"
                      >
                        <span className="info-text">
                          Info
                        </span>
                        <span className="font-semibold mr-2 text-left flex-auto text-white">
                          Refine your filters, no cars available
                        </span>
                      </div>
                    </div>
                  ) : (
                    filteredCars.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="col-xl-3 col-lg-6 col-md-6 col-12"
                      >
                        <div className="listing-item border shadow cursor-pointer">
                          <div className="listing-img">
                            <div onClick={() => handleRentNowClick(item)}>
                              <ImageWithBasePath1
                                src={
                                  item?.carImage1
                                    ? item.carImage1
                                    : "/assets/img/cars/no_img_found.jpg"
                                }
                                className="img-fluid"
                                alt={item?.carModel}
                              />
                            </div>
                            <div className="fav-item">
                              <span className="featured-text text-black font-mono">
                                {item?.brand}
                              </span>
                              <Link
                                to="#"
                                className={`fav-icon ${wishlist.some((wishlistCar: { carId: any }) => wishlistCar?.carId === item?.carId) ? "selected" : ""}`}
                                onClick={() => handleWishlistClick(item)}
                              >
                                <i className="feather icon-heart"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="listing-features d-flex align-items-start justify-content-between">
                              <div>
                                <h3 className="listing-title">
                                  <div
                                    className="car-model "
                                    onClick={() => handleRentNowClick(item)}
                                  >
                                    {item?.carModel || 'N/A'}
                                  </div>
                                </h3>
                                <div className="list-rating">
                                  {Array.from(
                                    { length: Math.floor(item?.rating || 0) },
                                    (_, index) => (
                                      <i
                                        key={index}
                                        className="fas fa-star filled"
                                      />
                                    ),
                                  )}

                                  <span>
                                    (
                                    {item?.rating
                                      ? item?.rating.toFixed(1)
                                      : "Not rated Yet"}
                                    )
                                  </span>
                                </div>
                              </div>
                              <div>
                                {item?.distance ? (
                                  <span className="distance-mark">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="distance-icon"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                      />
                                    </svg>
                                    <span className="font-mono fw-bold">
                                      {item?.distance.toFixed(2)} km
                                    </span>
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="listing-details-group">
                              <div className="row">
                                <div className="col-md-4 col-sm-6 d-flex align-items-center mb-3">
                                  <span className="me-2">
                                    <ImageWithBasePath
                                      src="assets/img/icons/car-parts-02.svg"
                                      alt={item?.mileage}
                                    />
                                  </span>
                                  <p className="mb-0">{item?.mileage || "NA"} kmpl</p>
                                </div>
                                <div className="col-md-4 col-sm-6 d-flex align-items-center mb-3">
                                  <span className="me-2">
                                    <ImageWithBasePath
                                      src="assets/img/icons/calendar-icon.svg"
                                      alt={item?.year}
                                    />
                                  </span>
                                  <p className="mb-0">{item?.registrationYear.split("-")[0]}</p>
                                </div>
                                <div className="col-md-4 col-sm-6 d-flex align-items-center mb-3">
                                  <span className="me-2">
                                    <ImageWithBasePath
                                      src="assets/img/icons/car-parts-06.svg"
                                      alt="Persons"
                                    />
                                  </span>
                                  <p className="mb-0">{item?.sevenSeater === true ? "7 seater" : "5 seater"}</p>
                                </div>
                              </div>
                            </div>

                            <div className="listing-location-details">
                              <div className="listing-price listing-grid-address-custom-size">
                                <LocationDisplay
                                  latitude={item?.latitude}
                                  longitude={item?.longitude}
                                />
                                {/* {item.location} */}
                              </div>
                              <div className="listing-price">
                                <h6 className="font-mono text-black">
                                  ₹{item?.pricing.costPerHr}
                                  <span>/Hr </span>{" "}
                                </h6>
                              </div>
                            </div>
                            <div className="listing-button">
                              <button
                                className="py-2 bg-black hover:opacity-80 text-white rounded w-100 w-full"
                                onClick={() => handleRentNowClick(item)}
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
                    ))
                  )}
                </div>
              )}
              {/* Pagination */}
              {loading || locationAlert || error ? (
                <></>
              ) : (
                <>
                  <div className="blog-pagination">
                    <nav>
                      <ul className="pagination page-item justify-content-center">
                        <li
                          className={`previtem ${currentPage === 1 ? "disabled" : ""}`}
                        >
                          <Link
                            className="page-link"
                            to="#"
                            onClick={handlePrevPage}
                          >
                            <i className="fa-solid fa-arrow-left"></i>
                            Prev
                          </Link>
                        </li>
                        <li className="justify-content-center pagination-center">
                          <div className="page-group">
                            <ul>
                              {response &&
                                Array.from({ length: totalPages }).map(
                                  (_, index) => (
                                    <li
                                      key={index}
                                      className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                    >
                                      <Link
                                        className="page-link"
                                        to="#"
                                        onClick={() =>
                                          handlePageChange(index + 1)
                                        }
                                      >
                                        {index + 1}
                                      </Link>
                                    </li>
                                  ),
                                )}
                            </ul>
                          </div>
                        </li>
                        <li
                          className={`nextlink ${currentPage === totalPages ? "disabled" : ""}`}
                        >
                          <Link
                            className="page-link"
                            to="#"
                            onClick={handleNextPage}
                          >
                            Next{" "}
                            <i className="fas fa-regular fa-arrow-right ms-2"></i>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {locationAlert && (
          <div className="alert  mt-2" role="alert">
            <div
              className="p-2 location-alert homepage-error"
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
          <div className="alert mt-2" role="alert">
            <div
              className="p-2 location-alert homepage-error"
              role="alert"
            >
              <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Error
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                Enter correct date or time
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ListingGrid;
