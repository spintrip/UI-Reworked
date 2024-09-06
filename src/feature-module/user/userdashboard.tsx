import { useCallback, useEffect, useState } from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import Aos from "aos";
import DashboardMenu from "./dashboardmenu";
import { all_routes } from "../router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { userBooking } from "../api/Booking";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import React from "react";
import { Helmet } from "react-helmet";

interface Booking {
  bookingId: string;
  carModel: string;
  startTripDate: string;
  startTripTime: string;
  endTripDate: string;
  endTripTime: string;
  totalUserAmount: number;
  status: number;
  carImage1: string | null;
  pickupDeliveryLocation1: string;
  dropoffLocation1: string;
  createdAt: string | number | Date;
  id: string;
  hostId: string;
  latitude: number;
  longitude: number;
  cancelDate: string | null;
  cancelReason: string | null;
}

interface Option {
  value: string;
  label: string;
}

// Function with proper types

const handleOptionChange = (newValue: SingleValue<Option>) => {
  setSelectedOption(newValue);
};

interface RootState {
 
  wishlist: {
    wishlist: string[];
  };
}

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookings , setUserBooking] = useState<any>([]);
  const [error , setError] = useState<any>('');
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);

  const options: any[] = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
  ];
  const [totalWishlistCars, setTotalWishlistCars] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const route = all_routes;
  const [selectedOption] = useState<string>(options[0]);

  const fetchUpdatedBookings = useCallback(async () => {
    try {
      const response = await userBooking();
      if (response && Array.isArray(response) && response?.length > 0) {
        setUserBooking(response);
        console.log("UserBookings found: ", response);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error("Error fetching updated bookings:", errorMessage);
      setError(errorMessage);
    }
  },[setUserBooking]);

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(route.signup);
      return;
    }
    fetchUpdatedBookings();
    setTotalWishlistCars(wishlist.length);
  }, [dispatch, wishlist, navigate, route.signup]);

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
  const compareDates = (
    a: { startTripDate: any; startTripTime: any },
    b: { startTripDate: any; startTripTime: any },
  ) => {
    const dateA = new Date(`${a.startTripDate}T${a.startTripTime}`);
    const dateB = new Date(`${b.startTripDate}T${b.startTripTime}`);
    return dateB.getTime() - dateA.getTime(); // Sort in descending order (latest dates first)
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
        return period === "last_7_days" ? diffInDays <= 7 : diffInDays <= 15;
      })
      .sort(compareDates);
  };

  useEffect(() => {
    const calculateTotals = () => {
      const filteredBookings = filterBookings(bookings, selectedOption).sort(
        compareDates,
      );
      const totalBookingCount = filteredBookings.length;
      const totalTransactionAmount = filteredBookings
        .filter(
          (booking: { transactionId: string | null }) =>
            booking.transactionId !== null,
        ) 
        .reduce(
          (sum: number, booking: { totalUserAmount: number }) =>
            sum + booking.totalUserAmount,
          0,
        ); 

      setTotalBookings(totalBookingCount);
      setTotalTransactions(totalTransactionAmount);
      setFilteredBookings(filteredBookings);
    };

    calculateTotals();
  }, [bookings, selectedOption]);

  return (
    <div>
      <Helmet>
        <title>User Dashboard | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Access your Spintrip Car Rentals dashboard to manage your bookings, view rental history, update profile information, and access exclusive deals on self-drive car rentals in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals dashboard, manage bookings, view rental history, update profile, exclusive car rental deals, self-drive car rentals Bangalore"
        />
      </Helmet>
      <div className="main-wrapper">
        <Breadcrumbs
          maintitle="User Dashboard"
          title="User Dashboard"
          subtitle="User Dashboard"
        />
        <DashboardMenu />

        <div className=" content dashboard-content">
          <div className="container">
            <div className="content-header">
              <h4>Dashboard</h4>
            </div>
            {/* /Content Header */}
            {/* Dashboard */}
            <div className="row">
              {/* Widget Item */}
              <div className="col-lg-4 col-md-6 d-flex">
                <div className="widget-box border rounded  flex-fill">
                  <div className="widget-header">
                    <div className="widget-content">
                      <h6>My Bookings</h6>
                      <h3 className="font-semibold">{totalBookings}</h3>
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
                  <Link to={route.userbookings} className="view-link">
                    View all Bookings <i className="feather-arrow-right" />
                  </Link>
                </div>
              </div>
              {/* /Widget Item */}
              {/* Widget Item */}
              <div className="col-lg-4 col-md-6 d-flex">
                <div className="widget-box border rounded  flex-fill">
                  <div className="widget-header">
                    <div className="widget-content">
                      <h6>Total Transactions</h6>
                      <h3 className="font-mono font-semibold">
                        ₹ {totalTransactions.toFixed(2)}
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
                  <Link to={route.payment} className="view-link">
                    View all Transactions <i className="feather-arrow-right" />
                  </Link>
                </div>
              </div>
              {/* /Widget Item */}
              {/* Widget Item */}
              <div className="col-lg-4 col-md-6 d-flex">
                <div className="widget-box border rounded flex-fill">
                  <div className="widget-header">
                    <div className="widget-content">
                      <h6>Wishlist Cars</h6>
                      <h3 className="font-semibold">{totalWishlistCars}</h3>
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
              </div>
              {/* /Widget Item */}
            </div>
            <div className="row">
              {/* Last 5 Bookings */}
              <div className=" d-flex">
                <div className="card user-card flex-fill">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                        <h4 className="my-bookings">
                          My Bookings
                        </h4>
                        </div>
                        <div className="booking-select d-flex flex-row-reverse align-items-end">
                          <Select
                            className="select stylewidth"
                            options={options}
                            defaultValue={options[0]}
                            placeholder="Last 7 days"
                            onChange={handleOptionChange}
                            isSearchable={false} // Disable typing in the select input
                          />
                          <Link
                            to={route.userbookings}
                            className="view-link mx-4"
                          >
                            View all Bookings
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-1 pt-4 pb-4">
                  {error ? (
                          <div className="error-booking-message">
                             {error} 
                          </div>
                        ) : (
                          <div className="table-responsive dashboard-table dashboard-table-info">
                      <table className="table">
                        <tbody>
                          {filteredBookings.map((booking, index) => (
                            <tr
                              key={index}
                              className="hover:cursor-pointer hover:bg-slate-200"
                            >
                              <td>
                                <div className="table-avatar">
                                  <Link
                                    to={route.userbookings}
                                    className="avatar avatar-lg flex-shrink-0"
                                  >
                                    <ImageWithBasePath
                                      className="avatar-img "
                                      src="assets/img/icons/icon.png"
                                      alt={String(booking.carModel)}
                                    />
                                  </Link>
                                  <div className="table-head-name flex-grow-1">
                                    <Link
                                      to={route.userbookings}
                                      className="text-base font-semibold text-primary "
                                    >
                                      {booking.carModel}
                                    </Link>
                                    <p>Rent Type : Pickup</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <h6 className="font-semibold">Start date</h6>
                                <p>
                                  {booking.startTripDate},{" "}
                                  {booking.startTripTime}
                                </p>
                              </td>
                              <td>
                                <h6 className="font-semibold">End Date</h6>
                                <p>
                                  {booking.endTripDate}, {booking.endTripTime}
                                </p>
                              </td>
                              <td>
                                <h6>Price</h6>
                                <h5 className="text-black font-mono">
                                  ₹ {booking.totalUserAmount.toFixed(2)}
                                </h5>
                              </td>
                              <td>
                                <span className={statusBadge[booking.status]}>
                                  {statusText[booking.status]}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                        )}
                  </div>
                </div>
              </div>
              {/* /Last 5 Bookings */}
            </div>
            {/* /Dashboard */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

function setSelectedOption(option: SingleValue<Option>): void {
  if (option) {
    console.log(`Selected option: ${option.value}`);
  } else {
    console.log("No option selected");
  }
}
