import React, { useCallback, useEffect, useState } from "react";
import Aos from "aos";
import Breadcrumbs from "../common/Breadcrumbs";
import DashboardMenu from "./dashboardmenu";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import { userBooking } from "../api/Booking";
import { all_routes } from "../router/all_routes";
import { cancelBooking, tripStart, bookingCompleted } from "../api/Booking";
import Dropdown from "react-bootstrap/Dropdown";
// import {
//   LocalizationProvider,
//   DatePicker,
//   TimePicker,
// } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import TextField from "@mui/material/TextField";
import { Modal, Button } from "react-bootstrap";
import dayjs from "dayjs";
import { setFetchChat, setPaymentData } from "../redux/action";
import UserRating from "../common/userRating";
import ImageWithBasePath1 from "../../core/data/img/ImageWithBasePath1";
import LocationDisplay from "../common/LocationDisplay";
import { Helmet } from "react-helmet";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
//import { select } from "@material-tailwind/react";
//import { payment } from "../api/Booking"

interface Booking {
  amount: number;
  bookingId: string;
  vehicleModel: string;
  startTripDate: string;
  startTripTime: string;
  endTripDate: string;
  endTripTime: string;
  status: number;
  transactionId: string | null;
  vehicleImage1: string | null;
  pickupDeliveryLocation1: string;
  dropoffLocation1: string;
  createdAt: string | number;
  id: string;
  hostId: string;
  latitude: number;
  longitude: number;
  cancelDate: string | null;
  cancelReason: string | null;
  transaction: Transaction | null;
}

interface Transaction {
  status: number;
}



const UserBookings = () => {
  const routes = all_routes;
  const [userBookings , setUserBooking] = useState<any>([]);
  const [error , setError] = useState<any>('');
  // const [extendError , setExtendError] = useState<any>('');
  const [searchInput, setSearchInput] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelDate, setCancelDate] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("relevance");
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showCancelledModal, setShowCancelledModal] = useState(false);
  const [showStatus5Modal, setShowStatus5Modal] = useState(false);
  const [showRideStartedModal, setShowRideStartedModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [totalBookings, setTotalBookings] = useState(0);
  // const [extendModal, setExtendModal] = useState(false);
  // const [extendSuccess, setExtendSuccess] = useState(false);
  // const [confirmModal, setConfirmModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  // const [isLoading , setIsLoading] = useState<boolean>(false);
  // const [dateTimeError, setDateTimeError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState<any>('');
  // const [extendEndDate , setExtendEndDate ] = useState<any>(selectedBooking?.endTripDate);
  // const [extendEndTime , setExtendEndTime ] = useState<any>(selectedBooking?.endTripTime);
  // const [newEndDate, setNewEndDate] = useState<string>(selectedBooking?.endTripDate ? dayjs(selectedBooking.endTripDate).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
  // const [newEndTime, setNewEndTime] = useState<string>(selectedBooking?.endTripDate ? dayjs(selectedBooking.endTripDate).format("HH:mm:ss") : dayjs().format("HH:mm:ss"));


  const handlePayment = async (payment: Booking | null) => {
    if (!payment) {
      console.error("No booking for payment found");
      return;
    }
    try {
      setLoadingPayment(true);

      dispatch(
        setPaymentData({
          bookingId: payment.bookingId,
          vehicleModel: payment.vehicleModel,
          startTripDate: payment.startTripDate,
          startTripTime: payment.startTripTime,
          endTripDate: payment.endTripDate,
          endTripTime: payment.endTripTime,
          status: payment.status,
          pickupDeliveryLocation1: payment.pickupDeliveryLocation1,
          dropoffLocation1: payment.dropoffLocation1,
          createdAt: payment.createdAt,
          id: payment.id,
          latitude: payment.latitude,
          longitude: payment.longitude,
        }),
      );

      navigate(routes.bookingcheckout);
    } catch (error) {
      console.error("Error during payment:", error);
      setLoadingPayment(false);
    }
  };

  const fetchUpdatedBookings = useCallback(async () => {
    try {
      const response = await userBooking();
      if (response && Array.isArray(response) && response?.length > 0) {
        setUserBooking(response);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error("Error fetching updated bookings:", errorMessage);
      setError(errorMessage);
    }
  },[setUserBooking]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(routes.signup);
      return;
    }
    Aos.init({ duration: 1200, once: true });
    fetchUpdatedBookings();
  }, [ navigate, routes]);



  type SortOrder = "relevance" | "priceLowToHigh" | "priceHighToLow";

  const handleSort = (order: SortOrder) => {
    setSortOrder(order);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleShowFeedback = () => {
    setShowFeedbackModal(true);
  };

  const handleHideFeedback = () => {
    setShowFeedbackModal(false);
  };

  const filteredBookings = () => {
    let bookingsCopy = [...userBookings];



    // Filter based on active tab
    if (activeTab !== "all") {
      bookingsCopy = bookingsCopy.filter((booking) => {
        switch (activeTab) {
          case "upcoming":
            return booking.status === 1;
          case "inprogress":
            return booking.status === 2;
          case "completed":
            return booking.status === 3;
          case "cancelled":
            return booking.status === 4;
          case "requested":
            return booking.status === 5;
          default:
            return false;
        }
      });
    }

    // Filter based on search input
    if (searchInput) {
      bookingsCopy = bookingsCopy.filter((booking) =>
        booking.vehicleModel.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }
    if (sortOrder === "priceLowToHigh") {
      bookingsCopy.sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === "priceHighToLow") {
      bookingsCopy.sort((a, b) => b.amount - a.amount);
    } else {
      bookingsCopy.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Sort by latest bookedOn date
      });
    }

    return bookingsCopy;
  };

  useEffect(() => {
    const total = filteredBookings().length;
    setTotalBookings(total);
  }, [userBookings, activeTab, sortOrder, searchInput]);

  const handleStartRide = async () => {
    if (!selectedBooking) {
      console.error("No booking selected");
      return;
    }
    try {
      await tripStart(selectedBooking.bookingId);
      await fetchUpdatedBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error starting trip:", error);
    }
  };

  const handleCancelRide = async (reason: string) => {
    if (!selectedBooking) {
      console.error("No booking selected");
      return;
    }
    try {
      await cancelBooking(selectedBooking.bookingId);
      fetchUpdatedBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error cancelling trip:", error);
    }
    setCancelReason(reason);
    const currentDate = new Date().toLocaleDateString();
    setCancelDate(currentDate);
  };

  // const handleExtendModal = (selectedBooking: Booking | React.SetStateAction<any>) =>{
  //   if (selectedBooking) {
  //     setExtendEndDate(selectedBooking.endTripDate);
  //     setExtendEndTime(selectedBooking.endTripTime);
  //   }
  //   setExtendModal(true);
  //   setShowInProgressModal(false);
    
   
  // }

  // const validateDateTime = () => {
  //   // Check if any required fields are missing
  //   if (
  //     !extendEndDate ||
  //     !extendEndTime ||
  //     !newEndDate ||
  //     !newEndTime ||
  //     !selectedBooking?.bookingId
  //   ) {
  //     setErrorMessage("Fill the fields Correctly.");
  //     setDateTimeError(true);
  //     setTimeout(() => {
  //       setDateTimeError(false);
  //     }, 5000);
  //     return false;
  //   }
    
  //   console.log("EndDate:" ,newEndDate , "EndTime", newEndTime);
  //   console.log("Old EndDate:" ,extendEndDate , "oldEndTime", extendEndTime);
  
  //   // Parse date and time values into dayjs objects
  //   const pickupDateTime = dayjs(`${extendEndDate}T${extendEndTime}`);
  //   const returnDateTime = dayjs(`${newEndDate}T${newEndTime}`);
  //   const currentDateTime = dayjs();
  
  //   if (pickupDateTime.isBefore(currentDateTime)) {
  //     setErrorMessage(" You ride has already Ended.");
  //     setDateTimeError(true);
  //     setTimeout(() => {
  //       setDateTimeError(false);
  //     }, 5000);
  //     return false;
  //   }

  //   if (returnDateTime.isBefore(pickupDateTime)) {
  //     setErrorMessage("New End Date-Time must be before Previous End date-time.");
  //     setDateTimeError(true);
  //     setTimeout(() => {
  //       setDateTimeError(false);
  //     }, 5000);
  //     return false;
  //   }
  //   if (pickupDateTime.isSame(returnDateTime)) {
  //     setErrorMessage("New End Date-Time cannot be the same as Previous End Date-Time.");
  //     setDateTimeError(true);
  //     setTimeout(() => {
  //       setDateTimeError(false);
  //     }, 5000);
  //     return false;
  //   }
  
  //   if (!returnDateTime.isAfter(pickupDateTime.add(30, 'minute'))) {
  //     setErrorMessage("New End Date-Time must be at least 30 Minute after the Previous End Date-Time.");
  //     setDateTimeError(true);
  //     setTimeout(() => {
  //       setDateTimeError(false);
  //     }, 5000);
  //     return false;
  //   }
  
  //   setErrorMessage("");
  //   setDateTimeError(false);
  //   return true;
  // };
  

  // const handleConfirmModal = () => {
  //   if (!validateDateTime()) {
  //     return;
  //   }
  //   setExtendModal(false);
  //   setConfirmModal(true);
  // }
  // const handleExtendBooking = useCallback(async () => {
  //   setIsLoading(true);
  //   setExtendError(''); // Clear previous errors
  //   setExtendSuccess(false); // Reset success state
  
  //   if (!selectedBooking) {
  //     console.error("No booking selected");
  //     setIsLoading(false);
  //     return;
  //   }
  
  //   if (!validateDateTime()) {
  //     setIsLoading(false);
  //     return;
  //   }
  
  //   const payload = {
  //     bookingId: selectedBooking.bookingId,
  //     newEndDate: newEndDate,
  //     newEndTime: newEndTime,
  //   };
  
  //   try {
  //     const response = await extendBooking(payload);
  //     console.log(response);
  //     setExtendSuccess(true); // Indicate success
  //     setConfirmModal(false); // Close modal
  //     fetchUpdatedBookings(); // Refresh bookings
  //   } catch (error) {
  //     console.log(error);
  //     setExtendError('An error occurred while extending the booking. Please try again later.');
  //   } finally {
  //     setIsLoading(false); // Stop loading indicator
  //   }
  // }, [selectedBooking, newEndDate, newEndTime, setIsLoading, fetchUpdatedBookings]);
  

 
  

  const handleCompletedRide = async () => {
    if (!selectedBooking) {
      console.error("No booking selected");
      return;
    }
    try {
      await bookingCompleted(selectedBooking.bookingId);
      handleShowFeedback();
      setShowInProgressModal(false);
      await fetchUpdatedBookings();
    } catch (error) {
      console.error("Error completing trip:", error);
    }
  };

  

  const vehicleModel = (res: Booking) => {
    return (
      <div className="table-avatar">
        <div className="table-head-name flex-grow-1">
          <Link to="">{res.vehicleModel}</Link>
          <p>{res.pickupDeliveryLocation1}</p>
        </div>
      </div>
    );
  };

  const BookingId = (res: Booking) => {
    const handleBookingClick = () => {
      setSelectedBooking(res);
      switch (res.status) {
        case 1:
          setShowUpcomingModal(true);
          break;
        case 2:
          setShowInProgressModal(true);
          break;
        case 3:
          setShowCompletedModal(true);
          break;
        case 4:
          setShowCancelledModal(true);
          break;
        case 5:
          setShowStatus5Modal(true);
          break;
      }
    };
    return (
      <Link
        to=""
        onClick={handleBookingClick}
        className="bookbyid text-primary font-semibold text-uppercase font-mono"
      >
        {res.bookingId.substring(0, 12)}
      </Link>
    );
  };

  const pickup = (res: Booking) => {
    return (
      <p>
        {res.pickupDeliveryLocation1}
        <span className="d-block">
          {res.startTripDate} / {res.startTripTime}
        </span>
      </p>
    );
  };

  const dropoff = (res: Booking) => {
    return (
      <p>
        {res.dropoffLocation1}
        <span className="d-block">
          {res.endTripDate} / {res.endTripTime}
        </span>
      </p>
    );
  };

  const bookedOn = (res: Booking) => {
    const createdAt = dayjs(res["createdAt"]);
    const formattedDate = createdAt.format("YYYY-MM-DD");
    const formattedTime = createdAt.format("HH:mm");
    return (
      <p>
        <span className="d-block">
          {formattedDate} / {formattedTime}
        </span>
      </p>
    );
  };

  const total = (res: Booking) => {
    return (
      <p>
        <span className="d-block font-mono font-semibold">
          ₹ {res.amount.toFixed(2)}
        </span>
      </p>
    );
  };

  const status = (res: Booking) => {
    let statusText = "";
    switch (res.status) {
      case 1:
        statusText = "Upcoming";
        break;
      case 2:
        statusText = "In Progress";
        break;
      case 3:
        statusText = "Completed";
        break;
      case 4:
        statusText = "Cancelled";
        break;
      case 5:
        statusText = "Requested";
        break;
      default:
        statusText = "Unknown";
        break;
    }
    return (
      <span
        className={`${
          res.status == 1
            ? "badge badge-light-secondary"
            : res.status == 2
              ? "badge badge-light-warning"
              : res.status == 3
                ? "badge badge-light-success"
                : res.status == 4
                  ? "badge badge-light-danger"
                  : res.status == 5
                    ? "badge badge-light-purple"
                    : ""
        }`}
      >
        {statusText}
      </span>
    );
  };

  const sortOrderNames: { [key in SortOrder]: string } = {
    relevance: "Sort By Relevance",
    priceLowToHigh: "Sort By Price (Low to High)",
    priceHighToLow: "Sort By Price (High to Low)",
  };

  const handleChat = (booking: Booking | null) => {
    if (!booking) {
      console.error("No booking selected");
      return;
    }
    dispatch(
      setFetchChat({
        bookingId: booking.bookingId,
        id: booking.id,
        hostId: booking.hostId,
      }),
    );
    navigate(routes.messages);
  };
  // const handleCloseConfirm = () => {
  //   setConfirmModal(false);
  //   fetchUpdatedBookings();
  //   setExtendError('');
  // }

  return (
    <div>
      <Helmet>
        <title>User Bookings | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="View and manage your car rental bookings with Spintrip Car Rentals. Easily access your booking details, modify reservations, and track your rental history in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals bookings, manage car rentals, view booking details, modify reservations, rental history Bangalore"
        />
      </Helmet>

      <div className="main-wrapper">
        <>
          <Breadcrumbs
            title="User Bookings"
            subtitle="User Bookings"
            maintitle={undefined}
          />
          <DashboardMenu />
          <div className="content">
            <div className="container">
              <div className="content-header">
                <h4>My Bookings</h4>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="sorting-info">
                    <div className="row d-flex align-items-center">
                      <div className="col-xl-8 col-lg-10 col-sm-12 col-12">
                        <div className="d-flex align-items-center justify-content-end">
                          <button
                            className="filter-button d-lg-none"
                            onClick={() =>
                              setIsSidebarVisible(!isSidebarVisible)
                            }
                          >
                            Booking Status
                            {isSidebarVisible ? (
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
                            ) : (
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
                            )}
                          </button>
                        </div>
                        {(isSidebarVisible || window.innerWidth >= 992) && (
                          <div className="booking-lists">
                            <ul className="nav">
                              <li>
                                <Link
                                  className={
                                    activeTab === "all" ? "active" : ""
                                  }
                                  to="#"
                                  onClick={() => handleTabClick("all")}
                                >
                                  All Bookings
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    activeTab === "requested" ? "active" : ""
                                  }
                                  to="#"
                                  onClick={() => handleTabClick("requested")}
                                >
                                  Requested
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    activeTab === "upcoming" ? "active" : ""
                                  }
                                  to="#"
                                  onClick={() => handleTabClick("upcoming")}
                                >
                                  Upcoming
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    activeTab === "inprogress" ? "active" : ""
                                  }
                                  to="#"
                                  onClick={() => handleTabClick("inprogress")}
                                >
                                  Inprogress
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    activeTab === "completed" ? "active" : ""
                                  }
                                  to="#"
                                  onClick={() => handleTabClick("completed")}
                                >
                                  Completed
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    activeTab === "cancelled" ? "active" : ""
                                  }
                                  to="#"
                                  onClick={() => handleTabClick("cancelled")}
                                >
                                  Cancelled
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="col-xl-4 col-lg-3 col-sm-12 col-12">
                        <div className="filter-group">
                          <div className="sort-week sort">
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                {sortOrderNames[sortOrder] || "Sort"}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => handleSort("relevance")}
                                >
                                  Sort By Relevance
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => handleSort("priceLowToHigh")}
                                >
                                  Sort By Price (Low to High)
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => handleSort("priceHighToLow")}
                                >
                                  Sort By Price (High to Low)
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 d-flex">
                  <div className="card book-card flex-fill mb-0">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col-md-5">
                          <h4>
                            All Bookings <span>{totalBookings}</span>
                          </h4>
                        </div>
                        <div className="col-md-7 text-md-end">
                          <div className="table-search">
                            <div id="tablefilter">
                              <label>
                                <input
                                  type="text"
                                  value={searchInput}
                                  onChange={(e) =>
                                    setSearchInput(e.target.value)
                                  }
                                  placeholder="Search"
                                  className="inputsearch border"
                                />
                              </label>
                            </div>
                            <Link
                              to={routes.listinggrid}
                              className="btn btn-add"
                            >
                              <i className="feather-plus-circle" />
                              Add Booking
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive dashboard-table">
                        {error ? (
                          <div className="error-booking-message">
                             {error} 
                          </div>
                        ) : (
                          <DataTable
                          className="table datatable"
                          value={filteredBookings()}
                        >
                          <Column
                            field="status"
                            header="Status"
                            body={status}
                          ></Column>
                          <Column
                            field="bookingId"
                            header="Booking ID"
                            body={BookingId}
                          ></Column>
                          <Column
                            field="carName"
                            header="Vehicle"
                            body={vehicleModel}
                          ></Column>
                          <Column
                            field="deliveryStatus"
                            header="Pickup Date/Time"
                            body={pickup}
                          ></Column>
                          <Column
                            field="location"
                            header="Dropoff Date/Time"
                            body={dropoff}
                          ></Column>
                          <Column
                            field="bookedOn"
                            header="Booked On"
                            body={bookedOn}
                          ></Column>
                          <Column
                            field="total"
                            header="Total"
                            body={total}
                          ></Column>
                        </DataTable>
                        )}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modals */}
          {/* Upcoming Modal */}
          <Modal
            className="mt-2 pb-[10vh]"
            show={showUpcomingModal}
            onHide={() => setShowUpcomingModal(false)}
            centered
            size="lg"
            keyboard={false}
            scrollable
          >
            <Modal.Header className="modal-header" closeButton>
              <Helmet>
                <GoogleAnalyticsScript/>
              </Helmet>
              <Modal.Title>Upcoming Booking Details</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
                {loadingPayment ? (
                  <>
                    <div className="spinner-border text-warning" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="booking-header">
                      <div className="booking-img-wrap">
                        <div className="book-img">
                          {selectedBooking.vehicleImage1 ? (
                            <ImageWithBasePath1
                              className="border rounded"
                              src={selectedBooking.vehicleImage1}
                              alt="img"
                            />
                          ) : (
                           
                            <></>
                          )}
                        </div>
                        <div className="book-info">
                          <h4 className="text-uppercase text-2xl">
                            {selectedBooking.vehicleModel}
                          </h4>
                          <p>
                            Location :
                            <LocationDisplay
                              latitude={selectedBooking.latitude}
                              longitude={selectedBooking.longitude}
                            />
                          </p>
                          <a 
                              href={`https://www.google.com/maps?q=${selectedBooking.latitude},${selectedBooking.longitude}&hl=es`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ marginLeft: '8px' }}
                            >
                          <button className="btn d-flex py-2 px-3 bg-dark text-white rounded align-items-center justify-content-center">
                            <span>Maps</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 ml-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                              />
                            </svg>
                          </button>
                          </a>
                        </div>
                      </div>
                      <div className="book-amount">
                        <p>Total Amount</p>
                        <h6 className="font-mono text-2xl text-black">
                          ₹{selectedBooking.amount.toFixed(2)}{" "}
                          <Link to="">
                            <i className="feather-alert-circle" />
                          </Link>
                          
                        </h6>

                      </div>
                    </div>
                    <div className="booking-group">
                      <div className="booking-wrapper">
                        <div className="booking-title">
                          <h6>Booking Details</h6>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-6">
                            <div className="booking-view">
                              <h6>Booking Type</h6>
                              <p>Pickup</p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="booking-view">
                              <h6>Status</h6>
                              {status(selectedBooking)}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="booking-view">
                              <h6>Booked On</h6>
                              <p>{bookedOn(selectedBooking)}</p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="booking-view">
                              <h6>Start Date & Time</h6>
                              <p>
                                {selectedBooking.startTripDate},{" "}
                                {selectedBooking.startTripTime}
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="booking-view">
                              <h6>End Date & Time</h6>
                              <p>
                                {selectedBooking.endTripDate},{" "}
                                {selectedBooking.endTripTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="p-2 mx-5 my-5 rounded ">
                      {selectedBooking?.transactionId != null  && selectedBooking?.transaction != null 
                  && selectedBooking?.transaction?.status == 2 ? (
                        <>
                          <div style={{fontSize:'1.5rem', fontWeight: '700'}} className="text-success payment-done">
                            <span>Payment processed</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="processed-icon"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div> */}
                  </>
                )}
              </Modal.Body>
            )}
            <Modal.Footer>
              <div className="d-flex align-items-center justify-content-between flex-wrap w-full px-4 mb-3">
                <div className="">
                  <Button
                    className="border d-flex align-items-center justify-content-center"
                    variant="primary"
                    onClick={() => handleChat(selectedBooking)}
                  >
                    <span>Chat</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                  </Button>
                </div>
                <div className="modal-btn modal-btn-sm text-end">
                  {/* <Button
                    variant="dark"
                    onClick={() => setShowCancelModal(false)}
                  >
                    Close
                  </Button> */}
                  <Button
                    variant="danger"
                    onClick={async () => {
                      await handleCancelRide(cancelReason);
                      setShowCancelModal(false);
                    }}
                    className="btn btn-danger mx-2"
                  >
                    Cancel Booking
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showRideStartedModal}
            onHide={() => {
              setShowRideStartedModal(false);
              fetchUpdatedBookings();
            }}
            centered
            size="lg"
            keyboard={false}
          >
            <Modal.Body className="modal-body">
            <Helmet>
                <GoogleAnalyticsScript/>
              </Helmet>
              <div className="order-success-info">
                <span className="order-success-icon">
                  <i
                    className="fas fa-check-circle"
                    style={{ color: "#28a745", fontSize: "50px" }}
                  ></i>
                </span>
                <h4>Successful</h4>
                <p>
                  Your ride has been successfully started. Booking ID:{" "}
                  <span>{selectedBooking && selectedBooking.bookingId}</span>
                </p>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            show={showCancelModal}
            onHide={() => setShowCancelModal(false)}
            centered
            size="lg"
            keyboard={false}
            className="custom-cancel-modal"
          >
            <Modal.Header closeButton className="custom-modal-header">
              <Helmet>
                <GoogleAnalyticsScript/>
              </Helmet>
              <Modal.Title>Cancel Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal-body">
              <form>
                <div className="modal-form-group">
                  <label>
                    Reason for Cancellation{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control custom-select"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  >
                    <option value="" disabled>
                      Select reason
                    </option>
                    <option value="Change of plans">Change of plans</option>
                    <option value="Found a better deal">
                      Found a better deal
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="modal-btn modal-btn-sm text-end">
                  <Button
                    variant="dark"
                    onClick={() => setShowCancelModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="danger"
                    onClick={async () => {
                      await handleCancelRide(cancelReason);
                      setShowCancelModal(false);
                    }}
                    className="btn btn-danger mx-2"
                  >
                    Cancel Booking
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>

          <Modal
            show={showInProgressModal}
            onHide={() => {
              setShowInProgressModal(false);
              fetchUpdatedBookings();
            }}
            centered
            size="lg"
            keyboard={false}
          >
            {selectedBooking && (
            <><Modal.Header className="modal-header" closeButton>
                <Modal.Title>In-Progress Booking Details</Modal.Title>
              </Modal.Header><Modal.Body className="modal-body">
                  <div className="booking-header">
                    <div className="booking-img-wrap">
                      <div className="book-img">
                        {selectedBooking.vehicleImage1 ? (
                          <ImageWithBasePath1
                            className="border rounded"
                            src={selectedBooking.vehicleImage1}
                            alt="img" />
                        ) : (
                          // <ImageWithBasePath1 src="https://cdn-icons-png.flaticon.com/512/12689/12689302.png" alt="not found" />
                          <></>
                        )}
                      </div>
                      <div className="book-info">
                        <h4 className="text-uppercase text-2xl">
                          {selectedBooking.vehicleModel}
                        </h4>
                        <p>
                          Location :
                          <LocationDisplay
                            latitude={selectedBooking.latitude}
                            longitude={selectedBooking.longitude} />
                        </p>
                        <a
                          href={`https://www.google.com/maps?q=${selectedBooking.latitude},${selectedBooking.longitude}&hl=es`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: '8px' }}
                        >
                          <button className="btn d-flex py-2 px-3 bg-dark text-white rounded align-items-center justify-content-center">
                            <span> Maps </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 ml-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                          </button>
                        </a>
                      </div>

                    </div>
                    <div className="book-amount">
                      <p>Total Amount</p>
                      <h6 className="font-mono text-2xl text-black">
                        ₹{selectedBooking.amount.toFixed(2)}{" "}
                        <Link to="">
                          <i className="feather-alert-circle" />
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="booking-group">
                    <div className="booking-wrapper">
                      <div className="booking-title">
                        <h6>Booking Details</h6>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="booking-view">
                            <h6>Booking Type</h6>
                            <p>Pickup</p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="booking-view">
                            <h6>Status</h6>
                            {status(selectedBooking)}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="booking-view">
                            <h6>Booked On</h6>
                            <p>{bookedOn(selectedBooking)}</p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="booking-view">
                            <h6>Start Date & Time</h6>
                            <p>
                              {selectedBooking.startTripDate},{" "}
                              {selectedBooking.startTripTime}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="booking-view">
                            <h6>End Date & Time</h6>
                            <p>
                              {selectedBooking.endTripDate},{" "}
                              {selectedBooking.endTripTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="p-3 d-flex align-items-center justify-content-between">
                  <Button
                    variant="primary"
                    className="text-black bg-white border rounded "
                    onClick={() => handleChat(selectedBooking)}
                  >
                    Chat
                  </Button>
                  {/* <Button
                    variant="primary"
                    onClick={async () => {
                      await handleCompletedRide();
                      setShowInProgressModal(false);
                      } }
                  >
                    Complete Booking
                  </Button> */}
                </Modal.Footer></>
            )}
          </Modal>

          {/* <Modal
            show={extendModal}
            onHide={() => {
              setExtendModal(false);
              fetchUpdatedBookings();
            }}
            centered
            size="lg"
            keyboard={false}
          >
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>Extend Booking</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      {selectedBooking.vehicleImage1 ? (
                        <ImageWithBasePath1
                          className="border rounded"
                          src={selectedBooking.vehicleImage1}
                          alt="img"
                        />
                      ) : (
                        // <ImageWithBasePath1 src="https://cdn-icons-png.flaticon.com/512/12689/12689302.png" alt="not found" />
                        <></>
                      )}
                    </div>
                    <div className="book-info">
                      <h4 className="text-uppercase text-2xl">
                        {selectedBooking.vehicleModel}
                      </h4>
                      <p>
                        Location :
                        <LocationDisplay
                          latitude={selectedBooking.latitude}
                          longitude={selectedBooking.longitude}
                        />
                      </p>
                      <a 
                              href={`https://www.google.com/maps?q=${selectedBooking.latitude},${selectedBooking.longitude}&hl=es`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ marginLeft: '8px' }}
                            >
                      <button className="btn d-flex py-2 px-3 bg-dark text-white rounded align-items-center justify-content-center">
                        <span> Maps </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 ml-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </button>
                      </a>
                    </div>
                  </div>
                </div>
                <ul>
                <li className="column-group-main ">
                    <div className="input-block">
                      <label>Pickup Date</label>
                    </div>
                    <div className="input-block-wrapp ">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="New End Date"
                        value={dayjs(newEndDate)}  
                        onChange={(newValue: Dayjs | null) => {
                          if (newValue) {
                            setNewEndDate(newValue.format("YYYY-MM-DD")); 
                          }
                        }}
                        minDate={dayjs()} 
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
                        label="New End Time"
                        value={dayjs(newEndTime, "HH:mm:ss")}  
                        onChange={(newValue: Dayjs | null) => {
                          if (newValue) {
                            setNewEndTime(newValue.format("HH:mm:ss"));  
                          }
                        }}
                        ampm={false}  // Use 24-hour format
                        views={['hours', 'minutes']}
                        format="HH:mm:ss"
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
                    </LocalizationProvider>

                    </div>
                  </li>
                </ul>
              </Modal.Body>
            )}
            <div className="modal-footer-custom d-flex align-items-center justify-content-between">
                <Button
                  variant="secondary"
                  onClick={() => setExtendModal(false)}
                  className="btn-close-custom"
                >
                  Close
                </Button>
                {isLoading ? (
                  <div className="d-flex align-items-center justify-content-center text-center spinner-border text-warning"  role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleConfirmModal}
                    className="btn-extend-custom"
                  >
                    Extend Booking
                  </Button>
                )}
              </div>

          </Modal>

          <Modal
            show={confirmModal}
            onHide={handleCloseConfirm}
            centered
            size="lg"
            keyboard={false}
          >
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>Confirm Extend Booking</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
                {isLoading ? (
                  <div className=" align-items-center text-center spinner-border text-warning"  role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : extendSuccess ? (
                  <div className="text-center text-success">
                    <strong>Booking extended successfully!</strong>
                  </div>
                ) : extendError ? (
                  <div className="m-4 text-center text-danger">
                    <strong>{extendError}</strong>
                  </div>
                ) : (
                  <>
                    <div className="text-center mt-3 mb-3">
                      <strong>Are you sure you want to extend the current booking?</strong>
                    </div>
                    <div className="border p-3 rounded bg-light">
                      <div className="mb-2">
                        <span className="font-weight-bold">Extend End Date:</span>
                        <span className="text-primary ml-2">{newEndDate}</span>
                      </div>
                      <div>
                        <span className="font-weight-bold">Extend End Time:</span>
                        <span className="text-success ml-2">{newEndTime}</span>
                      </div>
                    </div>
                  </>
                )}
              </Modal.Body>
            )}
            <div className="modal-footer-custom d-flex align-items-center justify-content-between">
              <Button
                variant="secondary"
                onClick={handleCloseConfirm}
                className="btn-close-custom bg-danger"
              >
                Cancel
              </Button>
              {!isLoading && !extendSuccess && (
                <Button
                  variant="primary"
                  onClick={handleExtendBooking}
                  className="btn-extend-custom bg-success"
                >
                  Confirm Booking
                </Button>
              )}
            </div>
          </Modal> */}




          <Modal
            show={showCompletedModal}
            onHide={() => setShowCompletedModal(false)}
            centered
            size="lg"
            keyboard={false}
          >
            <Modal.Header className="modal-header" closeButton>
            <Helmet>
                <GoogleAnalyticsScript/>
              </Helmet>
              <Modal.Title>Completed Booking Details</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      <ImageWithBasePath1
                        src={
                          selectedBooking.vehicleImage1
                            ? selectedBooking.vehicleImage1
                            : "/assests/img/noimgfound.webp"
                        }
                        alt="img"
                      />
                    </div>
                    <div className="book-info">
                      <h6>{selectedBooking.vehicleModel}</h6>
                      <p>
                        Location :{" "}
                        <LocationDisplay
                          latitude={selectedBooking.latitude}
                          longitude={selectedBooking.longitude}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="book-amount">
                    <p>Total Amount</p>
                    <h6>
                      Rs.{selectedBooking.amount.toFixed(2)}{" "}
                      <Link to="">
                        <i className="feather-alert-circle" />
                      </Link>
                    </h6>
                  </div>
                </div>
                <div className="booking-group">
                  <div className="booking-wrapper">
                    <div className="booking-title">
                      <h6>Booking Details</h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Booking Type</h6>
                          <p>Pickup</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Status</h6>
                          {status(selectedBooking)}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Booked On</h6>
                          <p>{bookedOn(selectedBooking)}</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Start Date & Time</h6>
                          <p>
                            {selectedBooking.startTripDate},{" "}
                            {selectedBooking.startTripTime}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>End Date & Time</h6>
                          <p>
                            {selectedBooking.endTripDate},{" "}
                            {selectedBooking.endTripTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            )}
            <Modal.Footer className="p-3 d-flex align-items-center justify-content-between">
              <Button
                variant="secondary"
                className="bg-black text-white"
                onClick={() => {
                  handleShowFeedback();
                  setShowCompletedModal(false);
                }}
              >
                Give feedback
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  navigate(routes.dashboard);
                  setShowCompletedModal(false);
                }}
              >
                Go to Dashboard <i className="feather-arrow-right" />
              </Button>
            </Modal.Footer>
          </Modal>

          {selectedBooking && (
            <UserRating
              show={showFeedbackModal}
              onHide={handleHideFeedback}
              bookingId={selectedBooking.bookingId}
            />
          )}

          <Modal
            show={showCancelledModal}
            onHide={() => setShowCancelledModal(false)}
            centered
            size="lg"
            keyboard={false}
          >
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>Cancelled Booking Details</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      <ImageWithBasePath1
                        src={
                          selectedBooking.vehicleImage1
                            ? selectedBooking.vehicleImage1
                            : "/assests/img/noimgfound.webp"
                        }
                        alt="img"
                      />
                    </div>
                    <div className="book-info">
                      <h6>{selectedBooking.vehicleModel}</h6>
                      <p>
                        Location :
                        <LocationDisplay
                          latitude={selectedBooking.latitude}
                          longitude={selectedBooking.longitude}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="book-amount">
                    <p>Total Amount</p>
                    <h6>
                      Rs. {selectedBooking.amount.toFixed(2)}{" "}
                      <Link to="">
                        <i className="feather-alert-circle" />
                      </Link>
                    </h6>
                  </div>
                </div>
                <div className="booking-group">
                  <div className="booking-wrapper">
                    <div className="booking-title">
                      <h6>Booking Details</h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Booking Type</h6>
                          <p>Pickup</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Status</h6>
                          {status(selectedBooking)}
                          <h6>{cancelDate}</h6>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Booked On</h6>
                          <p>{bookedOn(selectedBooking)}</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Start Date & Time</h6>
                          <p>
                            {selectedBooking.startTripDate},{" "}
                            {selectedBooking.startTripTime}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>End Date & Time</h6>
                          <p>
                            {selectedBooking.endTripDate},{" "}
                            {selectedBooking.endTripTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            )}
          </Modal>

          <Modal
            show={showStatus5Modal}
            onHide={() => {
              setSelectedBooking(null);
              setShowStatus5Modal(false);
              fetchUpdatedBookings();
            }}
            centered
            size="lg"
            keyboard={false}
            scrollable
          >
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>Booking Details</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      {selectedBooking.vehicleImage1 ? (
                        <ImageWithBasePath1
                          src={selectedBooking.vehicleImage1}
                          alt="img"
                        />
                      ) : (
                        // <ImageWithBasePath1 src="https://cdn-icons-png.flaticon.com/512/12689/12689302.png" alt="not found" />
                        <></>
                      )}
                    </div>
                    <div className="book-info">
                      <h4 className="text-uppercase text-2xl">
                        {selectedBooking.vehicleModel}
                      </h4>
                      <p>
                        Location :
                        <LocationDisplay
                          latitude={selectedBooking.latitude}
                          longitude={selectedBooking.longitude}
                        />
                      </p>
                      <a 
                              href={`https://www.google.com/maps?q=${selectedBooking.latitude},${selectedBooking.longitude}&hl=es`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ marginLeft: '8px' }}
                            >
                      <button className="btn d-flex py-2 px-3 bg-dark text-white rounded align-items-center justify-content-center">
                        <span>Maps</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="close-icon"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </button>
                      </a>
                    </div>
                  </div>
                  <div className="book-amount">
                    <p>Total Amount</p>
                    <h6 className="font-mono text-2xl text-black">
                      Rs.{selectedBooking.amount.toFixed(2)}{" "}
                      <Link to="">
                        <i className="feather-alert-circle" />
                      </Link>
                    </h6>
                  </div>
                </div>
                <div className="booking-group">
                  <div className="booking-wrapper">
                    <div className="booking-title">
                      <h6>Booking Details</h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Booking Type</h6>
                          <p>Pickup</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Status</h6>
                          {status(selectedBooking)}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Booked On</h6>
                          <p>{bookedOn(selectedBooking)}</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Start Date & Time</h6>
                          <p>
                            {selectedBooking.startTripDate},{" "}
                            {selectedBooking.startTripTime}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>End Date & Time</h6>
                          <p>
                            {selectedBooking.endTripDate},{" "}
                            {selectedBooking.endTripTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            )}
            <Modal.Footer>
              <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-center w-full px-4 mb-3">
                <div>
                  <Button
                    className="border m-2 d-flex align-items-center justify-content-center"
                    variant="primary"
                    onClick={() => handleChat(selectedBooking)}
                  >
                    <span>Chat</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                  </Button>
                </div>
                <div className="d-flex m-2 align-items-center justify-content-center">
                  <Button
                    className="border m-2 d-flex align-items-center justify-content-center Cancel-booking-button"
                    variant="danger"
                    onClick={() => {
                      setShowUpcomingModal(false);
                      setShowStatus5Modal(false);
                      setShowCancelModal(true);
                    }}
                  >
                    <span>Cancel Booking</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="cross-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </>
        {/* {dateTimeError && (
          <div className="alert error-login-message mt-2" role="alert" style={{ zIndex : '2000'}}>
            <div
              className="p-2 location-alert shadow bg-red-800 items-center text-red-100 leading-none rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Error
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
              {errorMessage}
              </span>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UserBookings;
