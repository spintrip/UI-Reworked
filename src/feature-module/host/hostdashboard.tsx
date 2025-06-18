import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import Select from "react-select";
import Aos from "aos";
import DashboardMenu from "./dashboardmenu";
import { all_routes } from "../router/all_routes";
import { getListing , updateListing} from "../api/Listing";
import { fetchHostBookings } from "./hostbookings_data";
//import { performance } from "../api/performance";
import { useDispatch, useSelector } from "react-redux";
import { setListingInfo } from "../redux/action";
import { RootState } from "../redux/rootReducer"; // Adjust the import path
import { HostBooking } from "../redux/types";
import { SingleValue } from "react-select";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Helmet } from "react-helmet";
import { Button , Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FaPause, FaPlay } from 'react-icons/fa';


interface CarModelMapEntry {
  carModel: string;
  carType: string;
}

const HostDashboard = () => {
  useScrollToTop();
  const options = [
    { value: "this_week", label: "This Week" },
    { value: "this_month", label: "This Month" },
    { value: "this_year", label: "This Year" },
    { value: "all_bookings", label: "All Bookings" },
  ];
  const navigate = useNavigate();
  const route = all_routes;
  const [carListings, setCarListings] = useState<any[]>([]);
  const hostBookings = useSelector(
    (state: RootState) => state.hostBookingInfo.bookings,
  );
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [totalBookings, setTotalBookings] = useState(0);
  const [filteredBookings, setFilteredBookings] = useState<HostBooking[]>([]);
  const dispatch = useDispatch();
  const [totalTransactionAmount, setTotalTransactionAmount] = useState(0);
  const [pauseListing , setPauseListing] = useState<any>([]);
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [pauseStartDate, setPauseStartDate] = useState<any>(dayjs());
  const [pauseEndDate, setPauseEndDate] = useState<any>(dayjs().add(1,"day"));
  const [pauseStartTime, setPauseStartTime] = useState<any>(dayjs());
  const [pauseEndTime, setPauseEndTime] = useState<any>(dayjs());
  const [isErrorContainer , setIsErrorContainer] = useState<boolean>(false);
  const [isLoading , setIsLoading] = useState<boolean>(false);
  const [sendError , setSendError] = useState<any>('');
  //const [listingStatus , setListingStatus] = useState<any>('');

  //const [performace, setperformace] = useState([]);

  const fetchData = async () => {
    try {
      // Make HTTP request to your API endpoint
      const response = await getListing();
      if (!response) {
        throw new Error(`Error fetching data: ${response}`);
      }
      const responseData = await response;

      if (responseData) {
        const res1 = await responseData.hostListings;
        setCarListings(res1);

        // setTotalBookings(totalBookings);
        dispatch(setListingInfo(Array.isArray(res1) ? res1 : [res1]));
      } else {
        console.error("Invalid data structure in API response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(route.signup);
      return;
    }
    dispatch<any>(fetchHostBookings());
    fetchData();
  }, [dispatch]);

  const statusBadge: { [key: number]: string } = {
    1: "badge badge-light-secondary",
    2: "badge badge-light-warning",
    3: "badge badge-light-success",
    4: "badge badge-light-danger",
    5: "badge badge-light-purple",
  };

  const statusText: { [key: number]: string } = {
    1: "Upcoming",
    2: "In Progress",
    3: "Completed",
    4: "Cancelled",
    5: "Requested",
  };
  const compareDates = (a: { createdAt: any }, b: { createdAt: any }) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; 
  };

  const filterBookings = (bookings: any[], period: string) => {
    const now = new Date();

    return bookings
      .filter((booking) => {
        const bookingDate = new Date(
          `${booking.startTripDate}T${booking.startTripTime}`,
        );
        const diffInDays =
          (now.getTime() - bookingDate.getTime()) / (1000 * 3600 * 24);

        switch (period) {
          case "this_week":
            return diffInDays <= 7;
          case "this_month":
            return (
              bookingDate.getMonth() === now.getMonth() &&
              bookingDate.getFullYear() === now.getFullYear()
            );
          case "this_year":
            return bookingDate.getFullYear() === now.getFullYear();
          case "all_bookings":
          default:
            return true;
        }
      })
      .sort(compareDates);
  };

  useEffect(() => {
    const calculateTotals = () => {
      const filteredBookings = filterBookings(hostBookings, selectedOption);
      setFilteredBookings(filteredBookings);

      const completedBookings = hostBookings.filter(
        (booking) => booking.transactionId !== null,
      );
      const totalAmount = completedBookings.reduce(
        (sum, booking) => sum + booking.totalHostAmount,
        0,
      );
      setTotalTransactionAmount(totalAmount);

      const completedCount = hostBookings.filter(
        (booking) => booking.status === 3,
      ).length;
      setTotalBookings(completedCount);
    };

    calculateTotals();
  }, [hostBookings, selectedOption]);

  const handleOptionChange = (
    newValue: SingleValue<{ value: string; label: string }>,
  ) => {
    if (newValue) {
      setSelectedOption(newValue.value);
    }
  };

  const carIdToModelMap = useMemo(() => {
    const map: { [key: string]: CarModelMapEntry } = {};
    carListings.forEach((car) => {
      map[car.vehicleid] = {
        carModel: car.vehicleModel,
        carType: car.vehicletype,
      };
    });`
    +`
    return map;
  }, [carListings]);

  const validateDateTime = () => {
    if (
      !pauseStartDate ||
      !pauseEndDate ||
      !pauseStartTime ||
      !pauseEndTime
    ) {
      setSendError(
        "All fields must be filled out, including a valid location.",
      );
      setIsErrorContainer(true);
      setTimeout(() => {
        setIsErrorContainer(false);
      }, 5000);
      return false;
    }
    const currentDateTime = dayjs();
    const pickupDateTime = dayjs(`${pauseStartDate.format('YYYY-MM-DD')}T${pauseStartTime.format('HH:mm')}`);
    const returnDateTime = dayjs(`${pauseEndDate.format('YYYY-MM-DD')}T${pauseEndTime.format('HH:mm')}`);
  
    if (pickupDateTime.isBefore(currentDateTime)) {
      setSendError("Pause date or time cannot be before the current date/time.");
      setIsErrorContainer(true);
      setTimeout(() => {
        setIsErrorContainer(false);
      }, 5000);
      return false;
    }

    if (returnDateTime.isBefore(pickupDateTime)) {
      setSendError("Pause Start date or time must be before End date or time.");
      setIsErrorContainer(true);
      setTimeout(() => {
        setIsErrorContainer(false);
      }, 5000);
      return false;
    }
    if (pickupDateTime.isSame(returnDateTime)) {
      setSendError("Pause date or time cannot be the same as End date or time.");
      setIsErrorContainer(true);
      setTimeout(() => {
        setIsErrorContainer(false);
      }, 5000);
      return false;
    }
  
    if (!returnDateTime.isAfter(pickupDateTime.add(1, 'hour'))) {
      setSendError("Pause date or time must be at least one hour after the End date or time.");
      setIsErrorContainer(true);
      setTimeout(() => {
        setIsErrorContainer(false);
      }, 5000);
      return false;
    }
  
    setSendError("");
    setIsErrorContainer(false);
    return true;
  };
  

  const handleListing = (carListing: any) => {
    setPauseListing(carListing);
    setPauseModalOpen(true);
  }

  const handleSubmit = async() => {
    setIsLoading(true);

    if (!validateDateTime()){
      setIsLoading(false)
      return;
    } 
    const data = {
      listingId : pauseListing?.id,
      pauseTimeStartDate: pauseStartDate?.format('YYYY-MM-DD'),
      pauseTimeEndDate: pauseEndDate?.format('YYYY-MM-DD'),
      pauseTimeStartTime: pauseStartTime?.format('HH:mm:ss'),
      pauseTimeEndTime: pauseEndTime?.format('HH:mm:ss'),
    };
    try{
      const response = await updateListing(data);
      console.log(response);
    } catch(error){
      if (error) {
        setSendError(error);
        setIsErrorContainer(true);
        setTimeout(() => {
          setIsErrorContainer(false);
        }, 5000);
        return false;
      }

    }
    setIsLoading(false);
    fetchData();
    setPauseModalOpen(false);
    console.log(data); 
    
  };

  const handleResume = async() => {
    setIsLoading(true);
    const resumedata = {
      listingId : pauseListing?.id,
      pauseTimeStartDate: null,
      pauseTimeEndDate: null,
      pauseTimeStartTime: null,
      pauseTimeEndTime: null,
    };
    try{
      const response = await updateListing(resumedata);
      console.log(response);
    } catch(error){
      if (error) {
        setSendError(error);
        setIsErrorContainer(true);
        setTimeout(() => {
          setIsErrorContainer(false);
        }, 5000);
        return false;
      }

    }
    setIsLoading(false);
    fetchData();
    setPauseModalOpen(false);
    console.log(resumedata); 
    
  };

  const handleClose = () => {
    setPauseModalOpen(false);
    setPauseListing([]);
  }
  const getCarStatus = (carListing: { pauseTimeStartDate: any; pauseTimeEndDate: any; }): { status: string; color: string; icon: JSX.Element; text: string } => {
    if (carListing.pauseTimeStartDate && carListing.pauseTimeEndDate) {
      return {
        status: 'Paused',
        color: 'red',
        icon: <FaPause />,
        text: 'Listing Paused'
      };
    }
    return {
      status: 'No Paused',
      color: 'green',
      icon: <FaPlay />,
      text: 'Pause Listing?'
    };
  };

  const isPaused = (listing: { pauseTimeStartDate: null; pauseTimeEndDate: null; }): boolean => {
    return listing.pauseTimeStartDate !== null && listing.pauseTimeEndDate !== null;
  };

  return (
    <div>
      <Helmet>
        <title>Host Dashboard | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Access your host dashboard on Spintrip Car Rentals to manage your car listings, view bookings, update profile information, and track your earnings from self-drive car rentals in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals host dashboard, manage car listings, view bookings, update profile, track earnings, self-drive car rentals Bangalore"
        />
      </Helmet>

      <div className="main-wrapper">
        <>
          <Breadcrumbs
            title="Host Dashboard"
            subtitle="Host Dashboard"
            maintitle={undefined}
          />
          <DashboardMenu />

          <div className="content dashboard-content">
            <div className="container">
             
              {/* Content Header */}
              <div className="content-header">
                <h4>Dashboard</h4>
              </div>
              {/* /Content Header */}
              {/* Dashboard */}
              <div className="row">
                {/* Widget Item */}
                <div className="col-lg-6 col-md-6  d-flex">
                  <div className="widget-box border rounded flex-fill">
                    <div className="widget-header">
                      <div className="widget-content">
                        <h6>My Completed Bookings</h6>
                        <h3 className="font-mono font-bold">{totalBookings}</h3>
                      </div>
                      <div className="widget-icon">
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/book-icon.svg"
                            alt="icon"
                          />
                        </span>
                      </div>
                    </div>
                    <Link to={route.hostBookings} className="view-link">
                      View all Bookings <i className="feather-arrow-right" />
                    </Link>
                  </div>
                </div>
                {/* /Widget Item */}
                {/* Widget Item */}
                {/* <div className="col-lg-4 col-md-6 d-flex">
              <div className="widget-box flex-fill">
                <div className="widget-header">
                  <div className="widget-content">
                    <h6>Wallet Balance</h6>
                    <h3 className="font-mono">₹ 0</h3>
                  </div>
                  <div className="widget-icon">
                    <span className="bg-warning">
                      <ImageWithBasePath
                        src="assets/img/icons/balance-icon.svg"
                        alt="icon"
                      />
                    </span>
                  </div>
                </div>
                <Link to={route.wallet} className="view-link">
                  View Balance <i className="feather-arrow-right" />
                </Link>
              </div>
            </div> */}
                {/* /Widget Item */}
                {/* Widget Item */}
                <div className="col-lg-6 col-md-6  d-flex">
                  <div className="widget-box border rounded flex-fill">
                    <div className="widget-header">
                      <div className="widget-content">
                        <h6>My Earnings</h6>
                        <h3 className="font-mono font-bold">
                          ₹ {totalTransactionAmount.toFixed(2)}
                        </h3>
                      </div>
                      <div className="widget-icon">
                        <span className="bg-success">
                          <ImageWithBasePath
                            src="assets/img/icons/transaction-icon.svg"
                            alt="icon"
                          />
                        </span>
                      </div>
                    </div>
                    <Link to={route.hostpayment} className="view-link">
                      View all Transactions{" "}
                      <i className="feather-arrow-right" />
                    </Link>
                  </div>
                </div>
                {/* /Widget Item */}
                {/* Widget Item */}
                {/* <div className="col-lg-3 col-md-6 d-flex">
              <div className="widget-box flex-fill">
                <div className="widget-header">
                  <div className="widget-content">
                    <h6>Wishlist Cars</h6>
                    <h3>24</h3>
                  </div>
                  <div className="widget-icon">
                    <span className="bg-danger">
                      <ImageWithBasePath
                        src="assets/img/icons/cars-icon.svg"
                        alt="icon"
                      />
                    </span>
                  </div>
                </div>
                <Link to={route.wishlist} className="view-link">
                  Go to Wishlist <i className="feather-arrow-right" />
                </Link>
              </div>
            </div> */}
                {/* /Widget Item */}
              </div>
              <div className="row">
                {/* Last 5 Bookings */}
                <div className="col-lg-8 d-flex">
                  <div className="card user-card flex-fill">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col-sm-5">
                          <h5>Last Bookings</h5>
                        </div>
                        <div className="col-sm-7 text-sm-end ">
                          <div className="booking-select w-100 d-flex flex-row align-items-center justify-content-end">
                            <Link to={route.hostbookings} className="view-link">
                              View all Bookings
                            </Link>
                            <Select
                              className=" select mx-2 min-w-[100px]"
                              options={options}
                              defaultValue={options[0]}
                              onChange={handleOptionChange}
                              isSearchable={false} // Disable typing in the select input
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive dashboard-table dashboard-table-info">
                        {filteredBookings.length === 0 ? (
                          <div className="p-4 text-center">No Vehicles found</div>
                        ) : (
                          <table className="table">
                            <tbody>
                              {filteredBookings.map((booking, index: any) => (
                                <tr key={index}>
                                  <td>
                                    <div className="table-avatar">
                                      <Link
                                        to={route.hostBookings}
                                        className="avatar avatar-lg flex-shrink-0"
                                      >
                                        <ImageWithBasePath
                                          className="avatar-img"
                                          src="assets/img/icons/icon.png"
                                          alt="Booking"
                                        />
                                      </Link>
                                      <div className="table-head-name flex-grow-1">
                                        <Link to={route.hostBookings}>
                                          {carIdToModelMap[booking.vehicleid]
                                            ?.carModel || "Unknown Model"}
                                        </Link>
                                        <p>
                                          Rent Type :{" "}
                                          {
                                          carIdToModelMap[booking.vehicleid]
                                            ?.carType == "1" ? "Bike" : carIdToModelMap[booking.vehicleid]
                                            ?.carType  == "2" ? "Car" : "NA"
                                          }
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h6>Start date</h6>
                                    <p>
                                      {booking.startTripDate},{" "}
                                      {booking.startTripTime}
                                    </p>
                                  </td>
                                  <td>
                                    <h6>End Date</h6>
                                    <p>
                                      {booking.endTripDate},{" "}
                                      {booking.endTripTime}
                                    </p>
                                  </td>
                                  <td>
                                    <h6>Price</h6>
                                    <h5 className="text-black font-mono">
                                      ₹{Math.round(booking.amount)}
                                    </h5>
                                  </td>
                                  <td>
                                    <span
                                      className={statusBadge[booking.status]}
                                    >
                                      {statusText[booking.status]}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Last 5 Bookings */}
                {/* Recent Transaction */}
                <div className="col-lg-4 d-flex">
                  <div className="card user-card flex-fill">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col-sm-6 ">
                          <h5>Your Listing</h5>
                        </div>
                        {/* <div className="col-sm-6 text-sm-end">
                      <div className="booking-select">
                        <Select
                          className="select"
                          options={options}
                          placeholder={"Last 30 Days"}
                        />
                      </div>
                    </div> */}
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive dashboard-table dashboard-table-info">
                        {carListings.length === 0 ? (
                          <div className="p-4 text-center">No Vehicle found</div>
                        ) : (
                          <table className="table table-hover">
                            <tbody>
                              {carListings.map((carListing, index) => (
                                <tr key={index} className="cursor-pointer"  onClick={() => (handleListing(carListing))}>
                                  <td className="border-0">
                                    <div className="table-avatar">
                                      
                                      <div className="table-head-name flex-grow-1">
                                        <div>
                                          {carListing.vehicleModel}
                                        </div>
                                        <p>Type : { carListing.vehicletype == 1 ? "Bike" : carListing.vehicletype == 2 ? "Car" : "NA"}</p>
                                        <div className="d-flex align-items-center">
                                          {getCarStatus(carListing).icon}
                                          <p style={{ color: getCarStatus(carListing).color, marginLeft: '8px' }}>
                                            {getCarStatus(carListing).text}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Recent Transaction */}
              </div>
             
              {/* /Dashboard */}
            </div>
          </div>
        </>
      </div>
          {pauseListing && (
            <Modal
              show={pauseModalOpen}
              onHide={handleClose}
              centered
              size="lg"
              keyboard={false}
            >
              <Modal.Header className="bg-light border-bottom d-flex justify-content-between align-items-center" closeButton>
                <Modal.Title className="text-primary">Pause Listed Vehicle</Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-4">
              {isPaused(pauseListing) ? (
                <>
                  <h4 className="mb-4 text-center text-primary">Resume Your Vehicle for an Interval?</h4>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-8 col-md-10 col-sm-12 bg-white p-4 rounded border border-light shadow-sm">
                        <div className="mb-3">
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong className="text-dark">Vehicle Model:</strong>
                            <span className="text-secondary">{pauseListing.vehicleModel}</span> {/* Display Car Model */}
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong className="text-dark">RC Number:</strong>
                            <span className="text-secondary">{pauseListing.rcNumber}</span> {/* Display Car Type */}
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong className="text-dark">Pause Start Date:</strong>
                            <span className="text-secondary">{pauseListing.pauseTimeStartDate}</span> {/* Display Pause Start Date */}
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong className="text-dark">Pause End Date:</strong>
                            <span className="text-secondary">{pauseListing.pauseTimeEndDate}</span> {/* Display Pause End Date */}
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong className="text-dark">Pause Start Time:</strong>
                            <span className="text-secondary">{pauseListing.pauseTimeStartTime}</span> {/* Display Pause Start Time */}
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong className="text-dark">Pause End Time:</strong>
                            <span className="text-secondary">{pauseListing.pauseTimeEndTime}</span> {/* Display Pause End Time */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr/>
                </>
              ) : (
                <>
                  <h4 className="mb-4 text-center text-primary">Pause Your Vehicle for an Interval?</h4>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-8 col-md-10 col-sm-12 bg-white p-4 rounded border border-light shadow-sm">
                        <div className="mb-3">
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong className="text-dark">Vehicle Model:</strong>
                            <span className="text-secondary">{pauseListing.vehicleModel}</span>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong className="text-dark">Vehicle RC:</strong>
                            <span className="text-secondary">{pauseListing.rcNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-lg-6 col-md-12 mt-3 mb-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Pause Start Date"
                          value={pauseStartDate}
                          onChange={(newValue) => setPauseStartDate(newValue)}
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
                      </LocalizationProvider>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-3 mb-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Pause Start Time"
                          value={pauseStartTime}
                          onChange={(newValue) => setPauseStartTime(newValue)}
                          ampm={false}
                          views={['hours', 'minutes']}
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
                    <div className="col-lg-6 col-md-12 mt-3 mb-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Pause End Date"
                          value={pauseEndDate}
                          onChange={(newValue) => setPauseEndDate(newValue)}
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
                          minDate={dayjs()}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-3 mb-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Pause End Time"
                          value={pauseEndTime}
                          onChange={(newValue) => setPauseEndTime(newValue)}
                          ampm={false}
                          views={['hours', 'minutes']}
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
                  </div>
                  <hr/>
                </>
              )}
              </Modal.Body>
              
              <Modal.Footer className='d-flex align-items-center justify-content-between p-3'>
                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
                {isLoading ? (
                  <div> Loading...</div>
                ) : (
                  <>
                    {isPaused(pauseListing) ? (
                      <Button variant="success" onClick={handleResume}>
                        Resume Listing
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={handleSubmit}>
                        Pause Listing
                      </Button>
                    )}
                  </>
                )}
              </Modal.Footer>
            </Modal>
          )}
          <div className='error-container-time'>
                {isErrorContainer && (
                  <span className="error-message-time">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 mx-2"
                      style={{ maxWidth: '40px' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                    {sendError}
                  </span>
                )}
          </div>
    </div>
  );
};

export default HostDashboard;
