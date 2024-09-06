import React, { useCallback, useEffect, useState } from "react";
//import { fetchUserBookings } from "../user/userbookings_data";
import useScrollToTop from "../../hooks/useScrollToTop";
import "aos/dist/aos.css";
import { useDispatch } from "react-redux";
import { all_routes } from "../router/all_routes";
import { setCarBookingDetails } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import UserRating from "../common/userRating";
//import { RootState } from "../redux/rootReducer";
import { userBooking } from "../api/Booking";

interface Booking {
  bookingId: string;
  carModel: string;
  startTripDate: string;
  startTripTime: string;
  endTripDate: string;
  endTripTime: string;
  amount: number;
  status: number;
  carImage1: string | null;
  pickupDeliveryLocation1: string;
  dropoffLocation1: string;
  createdAt: string | number;
  id: string;
  hostId: string;
  latitude: number;
  longitude: number;
  cancelDate: string | null;
  cancelReason: string | null;
}

const NotificationBar = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const routes = all_routes;
  const dispatch = useDispatch();
  const [userBookings , setUserBooking] = useState<any>([]);
  // const [error , setError] = useState<any>('');
  const [hasToken, setHasToken] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [latestBookingStatus, setLatestBookingStatus] = useState<number | null>(
    null,
  );
  const [latestBooking, setLatestBooking] = useState<Booking | any>();
  const [showStickyMessage, setShowStickyMessage] = useState(true);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  useEffect(() => {
    const token = !!localStorage.getItem("authToken");
    setHasToken(token);
    fetchUpdatedBookings
  }, []);
  const fetchUpdatedBookings = useCallback(async () => {
    try {
      const response = await userBooking();
      if (response && Array.isArray(response) && response?.length > 0) {
        setUserBooking(response);
        console.log("UserBookings found: ", response);
      } else {
        console.log("No bookings found.");
        setUserBooking([]); 
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error("Error fetching updated bookings:", errorMessage);
    }
  },[setUserBooking]);

  // useEffect(() => {
  //   dispatch<any>(fetchUserBookings());
  // }, [dispatch]);

  const compareDates = (a: { createdAt: any }, b: { createdAt: any }) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // Sort in descending order (latest dates first)
  };

  useEffect(() => {
    if (Array.isArray(userBookings) && userBookings.length > 0) {
      const sortedBookings = [...userBookings].sort(compareDates);
      const latestBooking = sortedBookings[0];
      if (latestBooking) {
        setLatestBookingStatus(latestBooking.status);
        setLatestBooking(latestBooking);
        dispatch(setCarBookingDetails(latestBooking)); // Dispatch latest booking details
      }
    }
  }, [userBookings, dispatch]);

  const openFeedbackModal = (bookingId: string) => {
    if (bookingId) {
      setSelectedBookingId(bookingId);
      setIsFeedbackModalOpen(true);
    } else {
      console.error("Booking ID is null or undefined.");
    }
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  const statusMessages: {
    [key: number]: {
      badgeName: string;
      text: string;
      class: string;
      linkText?: string;
    };
  } = {
    1: {
      badgeName: "Upcoming",
      text: "Your booking has been accepted by the host",
      class: "badge badge-light-secondary",
      linkText: "Go to Payment",
    },
    2: {
      badgeName: "InProgress",
      text: "Your ride is in progress...",
      class: "badge badge-light-warning",
    },
    3: {
      badgeName: "Feedback",
      text: "Your previous ride is completed.",
      class: "badge badge-light-success",
    },
    4: {
      badgeName: "Cancelled",
      text: "Your ride has been cancelled",
      class: "badge badge-light-danger",
    },
    5: {
      badgeName: "Requested...",
      text: "Your booking request has been given to the host",
      class: "badge badge-light-purple",
    },
  };

  const getStatusClass = (status: number) => {
    return statusMessages[status]?.class || "";
  };

  const handleStickyClose = () => {
    if (latestBookingStatus === 5 || latestBookingStatus === 3) {
      setShowStickyMessage(false);
    }
  };

  const handleGoToPayment = (latestBooking: Booking) => {
    if (latestBooking) {
      dispatch(setCarBookingDetails(latestBooking));
      navigate(routes.booking); // Navigate to the booking page
    } else {
      console.error(
        "Selected car does not match the latest booking car or is not an object.",
      );
    }
  };

  return (
    <div>
      {hasToken &&
        latestBookingStatus !== null &&
        statusMessages[latestBookingStatus] &&
        showStickyMessage && (
          <div
            className={`sticky-message ${getStatusClass(latestBookingStatus)}`}
          >
            <div>{statusMessages[latestBookingStatus].badgeName}</div>
            <div className="status-text">
              {statusMessages[latestBookingStatus].text}
              {String(latestBookingStatus) === "1" && (
                <span>
                  {" "}
                  <Link
                    to={all_routes.booking}
                    style={{ color: "inherit", textDecoration: "underline" }}
                    onClick={() => handleGoToPayment(latestBooking)}
                  >
                    {statusMessages[1].linkText}
                  </Link>
                </span>
              )}
              {String(latestBookingStatus) === "3" && latestBooking && (
                <span>
                  {" "}
                  <a
                    href="#"
                    onClick={() => openFeedbackModal(latestBooking.bookingId)}
                    style={{ color: "inherit", textDecoration: "underline" }}
                  >
                    Leave Feedback
                  </a>
                </span>
              )}
            </div>
            <div className="action-section">
              {String(latestBookingStatus) !== "1" && (
                <span className="small-text">
                  <Link
                    to={all_routes.userbookings}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Go to User Bookings
                  </Link>
                </span>
              )}
              <span className="close-icon" onClick={handleStickyClose}>
                ×
              </span>
            </div>
          </div>
        )}
      {selectedBookingId && (
        <UserRating
          show={isFeedbackModalOpen}
          onHide={closeFeedbackModal}
          bookingId={selectedBookingId}
        />
      )}
    </div>
  );
};

export default NotificationBar;
