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
import dayjs from "dayjs";

interface Booking {
  bookingId: string;
  vehicleModel: string;
  startTripDate: string;
  startTripTime: string;
  endTripDate: string;
  endTripTime: string;
  amount: number;
  status: number;
  vehicleImage1: string | null;
  pickupDeliveryLocation1: string;
  dropoffLocation1: string;
  createdAt: string | number | Date;
  id: string;
  hostId: string;
  latitude: number;
  longitude: number;
  cancelDate: string | null;
  cancelReason: string | null;
  transactionId?: string | null;
}

interface Option {
  value: string;
  label: string;
}

interface RootState {
  wishlist: {
    wishlist: string[];
  };
}

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookings, setUserBooking] = useState<Booking[]>([]);
  const [error, setError] = useState<string>('');
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);

  const options: Option[] = [
    { value: "7days", label: "Last 7 days" },
    { value: "30_days", label: "Last 30 days" },
  ];
  const [totalWishlistCars, setTotalWishlistCars] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const route = all_routes;
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const handleOptionChange = (newValue: SingleValue<Option>) => {
    if (newValue) setSelectedOption(newValue);
  };

  const fetchUpdatedBookings = useCallback(async () => {
    try {
      const response = await userBooking();
      if (response && Array.isArray(response)) {
        setUserBooking(response);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
    }
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(route.signup);
      return;
    }
    fetchUpdatedBookings();
    setTotalWishlistCars(wishlist.length);
  }, [dispatch, wishlist, navigate, route.signup, fetchUpdatedBookings]);

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

  const filterBookings = (bookings: Booking[], period: string) => {
    const now = new Date();
    return bookings
      .filter((booking) => {
        const bookingDate = new Date(`${booking.startTripDate}T${booking.startTripTime}`);
        const diffInDays = (now.getTime() - bookingDate.getTime()) / (1000 * 3600 * 24);
        if (period === "7days") return diffInDays <= 7;
        if (period === "30_days") return diffInDays <= 30;
        return true; 
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.startTripDate}T${a.startTripTime}`);
        const dateB = new Date(`${b.startTripDate}T${b.startTripTime}`);
        return dateB.getTime() - dateA.getTime();
      });
  };

  useEffect(() => {
    const calculateTotals = () => {
      const filtered = filterBookings(bookings, selectedOption.value);
      const totalTransactionAmount = filtered
        .filter((booking) => booking.transactionId !== null && booking.transactionId !== undefined) 
        .reduce((sum, booking) => sum + (booking.amount || 0), 0); 

      setTotalBookings(filtered.length);
      setTotalTransactions(totalTransactionAmount);
      setFilteredBookings(filtered);
    };
    calculateTotals();
  }, [bookings, selectedOption]);

  return (
    <div className="absolute-best-dashboard">
      <Helmet>
        <title>User Dashboard | Spintrip Car Rentals</title>
      </Helmet>
      
      <div className="main-wrapper">
        <Breadcrumbs maintitle="User Dashboard" title="User Dashboard" subtitle="Account Overview" />
        <DashboardMenu />

        <div className="content dashboard-content">
          <div className="container">
            
            {/* 1. Header & Greeting */}
            <div className="dashboard-header-flex d-flex justify-content-between align-items-center mb-5" data-aos="fade-down">
              <div className="greeting-box">
                <h4 className="fw-black display-6 mb-1">Good {dayjs().hour() < 12 ? 'Morning' : dayjs().hour() < 17 ? 'Afternoon' : 'Evening'}!</h4>
                <p className="text-muted fw-medium">Welcome back to Spintrip. Ready for your next journey?</p>
              </div>
              <Link to={route.home} className="btn btn-primary rounded-pill px-5 py-3 shadow-spintrip fw-bold">
                <i className="feather-plus-circle me-2" /> Book a New Ride
              </Link>
            </div>

            {/* 2. Stats Grid */}
            <div className="stats-grid-modern row mb-5" data-aos="fade-up">
              <div className="col-md-4 mb-3">
                <div className="stat-widget-glass p-4 rounded-4 shadow-sm text-center bg-white h-100">
                  <div className="stat-icon mb-3 mx-auto shadow-sm d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', fontSize: '1.5rem'}}><i className="feather-briefcase" /></div>
                  <span className="badge-highlight-orange mb-2 d-inline-block">My Bookings</span>
                  <div className="stat-value display-6 fw-black">{totalBookings}</div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="stat-widget-glass p-4 rounded-4 shadow-sm text-center bg-white h-100">
                  <div className="stat-icon mb-3 mx-auto shadow-sm d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '1.5rem'}}><i className="feather-repeat" /></div>
                  <span className="badge-highlight-green mb-2 d-inline-block">Total Spent</span>
                  <div className="stat-value display-6 fw-black">₹ {totalTransactions.toLocaleString()}</div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="stat-widget-glass p-4 rounded-4 shadow-sm text-center bg-white h-100">
                  <div className="stat-icon mb-3 mx-auto shadow-sm d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '1.5rem'}}><i className="feather-heart" /></div>
                  <span className="badge-highlight-red mb-2 d-inline-block">Wishlist</span>
                  <div className="stat-value display-6 fw-black">{totalWishlistCars}</div>
                </div>
              </div>
            </div>

            {/* 3. Active Ride Highlight & Journey Progress */}
            {bookings.find((b: any) => b.status === 2 || b.status === 1 || b.status === 5) && (() => {
              const activeBooking = bookings.find((b: any) => b.status === 2 || b.status === 1 || b.status === 5);
              const progressPercentage = activeBooking!.status === 5 ? 10 : activeBooking!.status === 1 ? 50 : activeBooking!.status === 2 ? 80 : 0;
              
              return (
                <div className="active-trip-highlight glass-card p-5 rounded-5 border-0 shadow-lg mb-5 bg-white position-relative overflow-hidden" data-aos="zoom-in">
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                      <span className="badge bg-primary-light text-primary px-3 py-2 rounded-pill small fw-bold text-uppercase mb-2 d-inline-block">Live Journey</span>
                      <h3 className="fw-black mb-0 display-6">{activeBooking!.vehicleModel}</h3>
                    </div>
                    <div className="text-end">
                      <div className="text-muted small fw-bold text-uppercase mb-1">Booking ID</div>
                      <div className="fw-black text-primary">#{activeBooking!.bookingId?.slice(-8).toUpperCase()}</div>
                    </div>
                  </div>

                  <div className="journey-progress-container px-4 mt-5">
                    <div className="progress-line" style={{height: '4px', background: '#f1f5f9', position: 'relative'}}>
                      <div className="progress-fill" style={{ width: `${progressPercentage}%`, height: '100%', background: '#f97316', transition: 'width 1s ease', borderRadius: '4px' }}></div>
                    </div>
                    <div className="status-dots d-flex justify-content-between mt-3">
                      <div className={`dot-item d-flex flex-column align-items-center ${activeBooking!.status === 5 ? 'active text-primary' : 'text-muted opacity-50'}`}>
                        <div className="dot mb-2 shadow-sm" style={{width: '14px', height: '14px', borderRadius: '50%', background: activeBooking!.status === 5 ? '#f97316' : '#cbd5e1'}}></div>
                        <span className="small fw-bold">Requested</span>
                      </div>
                      <div className={`dot-item d-flex flex-column align-items-center ${activeBooking!.status === 1 ? 'active text-primary' : 'text-muted opacity-50'}`}>
                        <div className="dot mb-2 shadow-sm" style={{width: '14px', height: '14px', borderRadius: '50%', background: (activeBooking!.status === 1 || activeBooking!.status === 2) ? '#f97316' : '#cbd5e1'}}></div>
                        <span className="small fw-bold">Confirmed</span>
                      </div>
                      <div className={`dot-item d-flex flex-column align-items-center ${activeBooking!.status === 2 ? 'active text-primary' : 'text-muted opacity-50'}`}>
                        <div className="dot mb-2 shadow-sm" style={{width: '14px', height: '14px', borderRadius: '50%', background: activeBooking!.status === 2 ? '#f97316' : '#cbd5e1'}}></div>
                        <span className="small fw-bold">In Route</span>
                      </div>
                      <div className="dot-item d-flex flex-column align-items-center text-muted opacity-50">
                        <div className="dot mb-2 shadow-sm" style={{width: '14px', height: '14px', borderRadius: '50%', background: '#cbd5e1'}}></div>
                        <span className="small fw-bold">Completed</span>
                      </div>
                    </div>
                  </div>

                  <div className="trip-footer mt-5 pt-4 border-top d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-4">
                      <div className="meta-item-glass d-flex align-items-center">
                        <i className="feather-calendar me-2 text-primary" />
                        <span className="fw-bold">{activeBooking!.startTripDate}</span>
                      </div>
                      <div className="meta-item-glass d-flex align-items-center">
                        <i className="feather-clock me-2 text-primary" />
                        <span className="fw-bold">{activeBooking!.startTripTime}</span>
                      </div>
                    </div>
                    <Link to={route.userbookings} className="btn btn-dark rounded-pill px-5 py-3 shadow-sm fw-bold">
                      Track Live Status <i className="feather-arrow-right ms-2 text-primary" />
                    </Link>
                  </div>
                </div>
              );
            })()}

            {/* 4. Recent Bookings Table */}
            <div className="row">
              <div className="col-12">
                <div className="card user-card border-0 shadow-sm rounded-4" data-aos="fade-up">
                  <div className="card-header bg-transparent border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">Booking History</h5>
                    <div className="d-flex align-items-center gap-3">
                      <Select
                        className="min-w-[150px]"
                        options={options}
                        value={selectedOption}
                        onChange={handleOptionChange}
                        isSearchable={false}
                      />
                    </div>
                  </div>
                  <div className="card-body p-0">
                    {error ? (
                      <div className="p-5 text-center text-danger">{error}</div>
                    ) : (
                      <div className="table-responsive px-4 pb-4">
                        <table className="table table-borderless align-middle mb-0">
                          <thead>
                            <tr className="text-muted small text-uppercase">
                              <th className="ps-0">Vehicle</th>
                              <th>Ride Duration</th>
                              <th>Status</th>
                              <th className="text-end">Paid Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredBookings.slice(0, 5).map((booking, idx) => (
                              <tr key={idx} className="border-bottom-faint">
                                <td className="ps-0 py-3">
                                  <div className="d-flex align-items-center gap-3">
                                    <div className="avatar avatar-md bg-light p-1 rounded-3">
                                      <ImageWithBasePath src="assets/img/icons/icon.png" alt="car" />
                                    </div>
                                    <div>
                                      <h6 className="mb-0 fw-bold">{booking.vehicleModel}</h6>
                                      <span className="text-muted small">ID: #{booking.bookingId?.slice(-6).toUpperCase()}</span>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="small fw-semibold">{booking.startTripDate}</div>
                                  <div className="text-muted extra-small">
                                    {booking.pickupDeliveryLocation1 || 'Pickup'}
                                    <i className="feather-arrow-right mx-1" />
                                    {booking.dropoffLocation1 || 'Dropoff'}
                                  </div>
                                </td>
                                <td>
                                  <span className={`${statusBadge[booking.status]} px-3 py-1 rounded-pill small`}>
                                    {statusText[booking.status]}
                                  </span>
                                </td>
                                <td className="text-end">
                                  <div className="fw-bold">₹{booking.amount?.toLocaleString()}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredBookings.length === 0 && (
                          <div className="py-5 text-center text-muted">No recent bookings found.</div>
                        )}
                        <div className="text-center mt-4">
                          <Link to={route.userbookings} className="btn btn-light btn-sm rounded-pill px-4">
                            View All Bookings <i className="feather-chevron-right ms-1" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
