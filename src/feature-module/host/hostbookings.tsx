import React, { useEffect, useState, useCallback } from "react";
import Aos from "aos";
import Breadcrumbs from "../common/Breadcrumbs";
import DashboardMenu from "./dashboardmenu";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux"; // Import hooks from react-redux
import { fetchHostBookings } from "./hostbookings_data";
import { all_routes } from "../router/all_routes";
import { bookingRequest } from "../api/Host-Booking.js";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal, Button, Alert } from "react-bootstrap";
import dayjs from "dayjs";
import { setHostFetchChat } from "../redux/action";
import { RootState } from "../redux/rootReducer";
import LocationDisplay from "../common/LocationDisplay";
import ImageWithBasePath1 from "../../core/data/img/ImageWithBasePath1";
import useScrollToTop from "../../hooks/useScrollToTop";
import { getHostProfile } from "../api/Profile";
import { Helmet } from "react-helmet";

const HostBookings = () => {
  useScrollToTop;
  const routes = all_routes;
  const hostBookings = useSelector(
    (state: RootState) => state.hostBookingInfo.bookings,
  );
  // const Listing = useSelector(
  //   (state: RootState) => state.listingInfo.listingInfo,
  // );
  const [searchInput, setSearchInput] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showCancelledModal, setShowCancelledModal] = useState(false);
  const [showStatus5Modal, setShowStatus5Modal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [cancelDate, setCancelDate] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("relevance");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [totalBookings, setTotalBookings] = useState(0);
  const [emailStatus, setEmailStatus] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const total = filteredBookings().length;
    setTotalBookings(total);
  
  }, [dispatch, hostBookings]);

  const fetchStatus = useCallback(async () => {
    const profile = await getHostProfile();
    if (profile && profile.profile) {

      setEmailStatus(profile.profile.email || null);
    }
  }, []);
  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(routes.signup);
      return;
    }
    dispatch<any>(fetchHostBookings());
  }, [dispatch]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // useEffect(() => {
  //   const total = filteredBookings().length;

  // }, [hostBookings, activeTab, sortOrder, searchInput]);

  type SortOrder = "relevance" | "priceLowToHigh" | "priceHighToLow";

  const handleSort = (order: SortOrder) => {
    setSortOrder(order);
  };

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const compareDates = (a: { createdAt: any }, b: { createdAt: any }) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // Sort in descending order (latest dates first)
  };

  const sortOrderNames: { [key in SortOrder]: string } = {
    relevance: "Sort By Relevance",
    priceLowToHigh: "Sort By Price (Low to High)",
    priceHighToLow: "Sort By Price (High to Low)",
  };

  const filteredBookings = () => {
    let bookingsCopy = [...hostBookings];

    if (activeTab !== "all") {
      bookingsCopy = bookingsCopy.filter((booking) => {
        if (activeTab === "upcoming") return booking.status === 1;
        if (activeTab === "inprogress") return booking.status === 2;
        if (activeTab === "completed") return booking.status === 3;
        if (activeTab === "cancelled") return booking.status === 4;
        if (activeTab === "requested") return booking.status === 5;
        return false;
      });
    }

    // Apply sorting based on the selected sort order
    if (sortOrder === "priceLowToHigh") {
      bookingsCopy.sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === "priceHighToLow") {
      bookingsCopy.sort((a, b) => b.amount - a.amount);
    } else {
      bookingsCopy.sort(compareDates);
    }

    // Apply search filter
    if (searchInput) {
      bookingsCopy = bookingsCopy.filter((booking) =>
        booking.carModel.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }
    return bookingsCopy;
  };

  //   const customPaginatorTemplate = {
  //     layout: 'PrevPageLink CurrentPageReport NextPageLink',
  //     'PrevPageLink': (options: { onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; disabled: boolean | undefined; }) => {
  //         return (
  //             <button type="button" onClick={options.onClick} disabled={options.disabled} className="p-button p-component">
  //                 <span className="p-paginator-icon pi pi-angle-left"></span>
  //             </button>
  //         );
  //     },
  //     'NextPageLink': (options: { onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; disabled: boolean | undefined; }) => {
  //         return (
  //             <button type="button" onClick={options.onClick} disabled={options.disabled} className="p-button p-component">
  //                 <span className="p-paginator-icon pi pi-angle-right"></span>
  //             </button>
  //         );
  //     },
  //     'CurrentPageReport': (options: { rows: number; page: number | null | undefined; }) => {
  //         const totalRecords = filteredBookings().length;
  //         const pageCount = Math.ceil(totalRecords / options.rows) ;
  //       const currentPage = options.page !== undefined && options.page !== null ? options.page + 1 : 1;
  //         return (
  //           <div className="custom-pagination-info">
  //               <span className="current-page">Page {currentPage}</span>
  //               <span className="separator"> of </span>
  //               <span className="total-pages">{pageCount}</span>
  //           </div>
  //       );
  //     }
  // };

  const fetchUpdatedBookings = async () => {
    try {
      await dispatch<any>(fetchHostBookings());
    } catch (error) {
      console.error("Error fetching updated bookings:", error);
    }
  };

  const carModel = (res: {
    carModel:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
    deliveryStatus:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
  }) => {
    return (
      <div className="table-avatar">
        {/* <Link to="" className="avatar avatar-lg flex-shrink-0">
          <ImageWithBasePath
            className="avatar-img"
            src={res.img}
            alt="Booking"
          />
        </Link> */}
        <div className="table-head-name flex-grow-1">
          <Link to="">{res.carModel}</Link>
          <p>{res.deliveryStatus}</p>
        </div>
      </div>
    );
  };

  const BookingId = (res: any) => {
    const handleBookingClick = () => {
      setSelectedBooking(res);
      const currentDate = new Date().toLocaleDateString(); // Get current date
      setCancelDate(currentDate);
      if (res.status === 1) {
        setShowUpcomingModal(true);
      } else if (res.status === 2) {
        setShowInProgressModal(true);
      } else if (res.status === 3) {
        setShowCompletedModal(true);
      } else if (res.status === 4) {
        setShowCancelledModal(true);
      } else if (res.status === 5) {
        setShowStatus5Modal(true);
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

  const pickup = (res: any) => {
    return (
      <p>
        {res.pickupDeliveryLocation1}
        <span className="d-block">
          {res.startTripDate} / {res.startTripTime}
        </span>
      </p>
    );
  };

  const dropoff = (res: any) => {
    return (
      <p>
        {res.dropoffLocation1}
        <span className="d-block">
          {res.endTripDate} / {res.endTripTime}
        </span>
      </p>
    );
  };
  const total = (res: any) => {
    return (
      <p>
        <span className="d-block font-mono font-semibold">
          ₹ {Math.round(res.amount)}
        </span>
      </p>
    );
  };

  const bookedOn = (res: any) => {
    const createdAt = dayjs(res.createdAt);
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

  const handleBooking = async (bookingId: any, status: any) => {
    if (!emailStatus) {
      setErrorMessage("Email not updated in profile. Please update your email in your profile settings.");
      return;
    }
    navigate(routes.hostdashboard);
    try {

      await bookingRequest(bookingId, status);
    } catch (error) {
      console.error("Error fetching updated bookings:", error);
    }
    setShowStatus5Modal(false);
  };

  const status = (res: { status: number }) => {
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

  const handleChat = (booking: any) => {
    dispatch(
      setHostFetchChat({
        bookingId: booking.bookingId,
        id: booking.id,
      }),
    );
    navigate(routes.hostmessages);
  };

  return (
    <div>
      <Helmet>
        <title>Host Bookings | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="View and manage your car rental bookings as a host on Spintrip Car Rentals. Easily access booking details, confirm reservations, and track rental history in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals host bookings, manage car rentals, view booking details, confirm reservations, rental history Bangalore"
        />
      </Helmet>

      <div className="main-wrapper">
        <>
          <Breadcrumbs
            maintitle="Host Bookings"
            title="Host Bookings"
            subtitle="Host Bookings"
          />
          <DashboardMenu />

          <div className="content">
            <div className="container">
              {/* Content Header */}
              <div className="content-header">
                <h4>My Bookings</h4>
              </div>
              {/* /Content Header */}
              {/* Sort By */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="sorting-info">
                    <div className="row d-flex align-items-center">
                      <div className="col-xl-7 col-lg-8 col-sm-12 col-12">
                        <div className="d-flex align-items-center justify-content-end">
                          <button
                            className="filter-button d-lg-none "
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
                              <li className="mt-2">
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
                              <li className="mt-2">
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
                              <li className="mt-2">
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
                              <li className="mt-2">
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
                              <li className="mt-2">
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
                              <li className="mt-2">
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
                      <div className="col-xl-5 col-lg-4 col-sm-12 col-12">
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
              {/* Sort By */}
              <div className="row">
                {/* All Bookings */}
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
                                  className="inputsearch"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive dashboard-table">
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
                            header="Car Name"
                            body={carModel}
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
                      </div>
                      {errorMessage && ( // Conditionally render the error message
                        <Alert variant="danger" className="mt-4">
                          {errorMessage}
                        </Alert>
                      )} 
                    </div>
                  </div>
                </div>
                {/* /All Bookings */}
              </div>
              {/* /Dashboard */}
            </div>
          </div>

          {/* Upcoming Modal */}
          <Modal
          className="mt-[10vh] pb-[10vh]"
            show={showUpcomingModal}
            onHide={() => {
              setShowUpcomingModal(false);
            }}
            centered
            size="lg"
            keyboard={false}
          >
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>Upcoming Booking Details</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      <ImageWithBasePath1
                        src={
                          selectedBooking.carImage1
                            ? selectedBooking.carImage1
                            : "assets/img/cars/car-05.jpg"
                        }
                        alt="img"
                      />
                    </div>
                    <div className="book-info">
                      <h6>{selectedBooking["carModel"]}</h6>
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
                    <h6 className="font-mono text-black" style={{fontWeight: '700'}}>
                      Rs. {selectedBooking["amount"]}{" "}
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
                            {selectedBooking["startTripDate"]},{" "}
                            {selectedBooking["startTripTime"]}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>End Date & Time</h6>
                          <p>
                            {selectedBooking["endTripDate"]},{" "}
                            {selectedBooking["endTripTime"]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            )}
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => handleChat(selectedBooking)}
              >
                Chat
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Upcoming Modal */}

          {/* Inprogress Modal */}

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
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>In-Progress Booking Details</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      <ImageWithBasePath1
                        src={
                          selectedBooking.carImage1
                            ? selectedBooking.carImage1
                            : "assets/img/cars/car-05.jpg"
                        }
                        alt="img"
                      />
                    </div>
                    <div className="book-info">
                      <h6>{selectedBooking["carModel"]}</h6>
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
                      Rs. {selectedBooking["amount"]}{" "}
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
                            {selectedBooking["startTripDate"]},{" "}
                            {selectedBooking["startTripTime"]}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>End Date & Time</h6>
                          <p>
                            {selectedBooking["endTripDate"]},{" "}
                            {selectedBooking["endTripTime"]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            )}
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => handleChat(selectedBooking)}
              >
                Chat
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Inprogress Modal */}

          {/* Completed Modal */}
          <Modal
            show={showCompletedModal}
            onHide={() => setShowCompletedModal(false)}
            centered
            size="lg"
            keyboard={false}
          >
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>Completed Booking Details</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      <ImageWithBasePath1
                        src={
                          selectedBooking.carImage1
                            ? selectedBooking.carImage1
                            : "assets/img/cars/car-05.jpg"
                        }
                        alt="img"
                      />
                    </div>
                    <div className="book-info">
                      <h6>{selectedBooking["carModel"]}</h6>
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
                    <h6 className="font-mono font-semibold text-black">
                      ₹{selectedBooking["amount"]}{" "}
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
                            {selectedBooking["startTripDate"]},{" "}
                            {selectedBooking["startTripTime"]}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>End Date & Time</h6>
                          <p>
                            {selectedBooking["endTripDate"]},{" "}
                            {selectedBooking["endTripTime"]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            )}
            <Modal.Footer className="p-2 d-flex align-items-center justify-content-between">
              <Button
                variant="secondary"
                className="bg-secondary text-white"
                onClick={() => {
                  setShowFeedbackModal(true);
                  setShowCompletedModal(false);
                }}
                
              >
                <span>Give feedback</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="smile-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  navigate(routes.hostdashboard);
                  setShowCompletedModal(false);
                }}
              >
                Go to Dashboard <i className="feather-arrow-right" />
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showFeedbackModal}
            onHide={() => setShowFeedbackModal(false)}
            centered
            size="lg"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Give Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="modal-form-group">
                  <label>
                    Rating <span className="text-danger">*</span>
                  </label>
                  <select className="form-control">
                    <option value="5">Excellent</option>
                    <option value="4">Very Good</option>
                    <option value="3">Good</option>
                    <option value="2">Fair</option>
                    <option value="1">Poor</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>
                    Feedback <span className="text-danger">*</span>
                  </label>
                  <textarea className="form-control" rows={4}></textarea>
                </div>
                <div className="modal-btn modal-btn-sm text-end">
                  <Button
                    variant="secondary"
                    onClick={() => setShowFeedbackModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit Feedback
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          {/* Completed Modal */}

          {/* Cancelled Modal */}
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
                          selectedBooking.carImage1
                            ? selectedBooking.carImage1
                            : "assets/img/cars/car-05.jpg"
                        }
                        alt="img"
                      />
                    </div>
                    <div className="book-info">
                      <h6>{selectedBooking["carModel"]}</h6>
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
                    <h6 className="font-mono text-black font-semibold">
                      ₹{selectedBooking["amount"]}{" "}
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
                            {selectedBooking["startTripDate"]},{" "}
                            {selectedBooking["startTripTime"]}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>End Date & Time</h6>
                          <p>
                            {selectedBooking["endTripDate"]},{" "}
                            {selectedBooking["endTripTime"]}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Cancel Date</h6>
                          
                          <h6>{cancelDate}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            )}
          </Modal>
          {/* Cancelled Modal */}

          {/* Requested Modal */}
          <Modal
            show={showStatus5Modal}
            onHide={() => {
              setSelectedBooking(null);
              setShowStatus5Modal(false);
              setErrorMessage("");
              fetchUpdatedBookings();
            }}
            centered
            size="lg"
            //dialogClassName="modal-dialog-centered modal-lg new-modal multi-step fade"
            //backdrop="static"
            keyboard={false}
          >
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>Booking Details</Modal.Title>
            </Modal.Header>
            {selectedBooking && (
              <Modal.Body className="modal-body">
               {errorMessage && (
                  <Alert variant="danger" className="mb-4">
                    {errorMessage}
                  </Alert>
                )}
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      <ImageWithBasePath1
                        src={
                          selectedBooking.carImage1
                            ? selectedBooking.carImage1
                            : "assets/img/cars/car-05.jpg"
                        }
                        alt="img"
                      />
                    </div>
                    <div className="book-info">
                      <h6>{selectedBooking["carModel"]}</h6>
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
                    <h6 className="font-mono text-2xl text-black" style={{fontWeight: '700'}}>
                    ₹{selectedBooking["amount"]}{" "}
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
                      {/* <div className="col-lg-4 col-md-6">
                      <div className="booking-view">
                        <h6>Pickup/Dropoff Location</h6>
                        <p>45, Avenue ,Mark Street, USA</p>
                        <p>{selectedBooking['startTripDate']}, {selectedBooking['startTripTime']}</p>
                      </div>
                    </div> */}
                      {/* <div className="col-lg-4 col-md-6">
                      <div className="booking-view">
                        <h6>Dropoff</h6>
                        <p> </p>
                        <p>{selectedBooking.endTripDate}, {selectedBooking.endTripTime}</p>
                      </div>
                    </div> */}
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
                            {selectedBooking["startTripDate"]},{" "}
                            {selectedBooking["startTripTime"]}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>End Date & Time</h6>
                          <p>
                            {selectedBooking["endTripDate"]},{" "}
                            {selectedBooking["endTripTime"]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            )}
            <Modal.Footer>
              <div className="w-100 d-flex  align-items-center justify-content-center">
              <input
                    type="checkbox"
                    id="termsCheckbox"
                    checked={isChecked}
                    className="mr-2"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <label htmlFor="termsCheckbox" className="mx-2 d-flex flex-wrap align-items-center justify-content-start">
                    I hereby have read the{' '}
                    <Link className="p-1 bg-light mx-1 text-danger rounded" to={routes.termsconditions}>terms and conditions</Link> for lending my ride
                  </label>
              </div>
              <div className="d-flex flex-wrap pl-5 pr-1 mb-3 w-full align-items-center justify-content-center justify-content-md-between">
                <div>
                  <Button
                    className="border m-2 text-xl bg-website-primary border-2 border-amber-600 mr-5 d-flex align-items-center justify-content-center mr-1"
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
                <div className="d-flex">
                  {selectedBooking && (
                    <Button
                      className="border m-2 border-2 border-danger mr-5 d-flex align-items-center justify-content-center mr-1"
                      variant="danger"
                      onClick={() =>
                        handleBooking(selectedBooking["bookingId"], 4)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span>Decline</span>
                    </Button>
                  )}
                  <Button
                    className="border m-2 border-2 border-success mr-5 d-flex align-items-center justify-content-center ml-1"
                    disabled={!isChecked}
                    variant="success"
                    onClick={() => handleBooking(selectedBooking.bookingId, 1)}
                  >
                    <span>Accept</span>
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
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
          {/* Requested Modal */}
        </>
      </div>
    </div>
  );
};

export default HostBookings;
