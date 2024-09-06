import React, { useEffect, useState } from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { all_routes } from "../router/all_routes";
import useScrollToTop from "../../hooks/useScrollToTop";
interface CarBookingDetailsState {
  carBookingDetails: any; // Replace `any` with the actual type if known
}
interface RootState {
  carBookingDetails: CarBookingDetailsState;
}
const Booking = () => {
  useScrollToTop();
  const carBookingDetails = useSelector(
    (state: RootState) => state.carBookingDetails.carBookingDetails,
  );
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (bookingConfirmed && !showErrorModal) {
      setShowSuccessModal(true);
    }
  }, [bookingConfirmed, showErrorModal, carBookingDetails]);

  const handlePlaceOrder = () => {
    setBookingConfirmed(true);
  };

  return (
    <div className="main-wrapper">
      <Breadcrumbs
        title="Order Confirmation"
        maintitle="Order Confirmation"
        subtitle="Pages"
      />
      {carBookingDetails ? (
        <section className="order-confirmation">
          <div className="container">
            <div className="confirm-order">
              <div className="section-title">
                <h3>Order Confirmation</h3>
                <h5>
                  Order Total : <span>Rs. {carBookingDetails?.amount}</span>
                </h5>
              </div>
              <div className="booking-details order-confirm-box">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="confirmation-title">
                      <h4>Car Details</h4>
                      <Link to="#">Edit</Link>
                    </div>
                    <div className="order-car">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/book-icon.svg"
                          alt="Car Image"
                        />
                      </span>
                      <div>
                        <h5>
                          <span style={{ color: "black" }}>
                            {carBookingDetails?.carModel}
                          </span>
                        </h5>
                        <h5>
                          <span>Rs. {carBookingDetails?.amount}</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="confirmation-title">
                      <h4>Extra Service</h4>
                      <Link to="#">Edit</Link>
                    </div>
                    {/* Add any extra services here */}
                  </div>
                  <div className="col-lg-6">
                    <div className="confirmation-title">
                      <h4>Payment details</h4>
                      <Link to="#">Edit</Link>
                    </div>
                    <div className="visa-card">
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/visa.svg"
                          alt="Visa Card"
                        />
                      </Link>
                      <h6>Visa card ending in 1245</h6>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="confirmation-title">
                      <h4>Pickup Location &amp; Date</h4>
                      {/* <Link to="#">Edit</Link> */}
                    </div>
                    <ul className="address-info">
                      <li>45, 4th Avenue Mark Street USA</li>
                      <li>
                        {carBookingDetails?.startTripDate} -{" "}
                        {carBookingDetails?.startTripTime}
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <div className="confirmation-title">
                      <h4>Your Information</h4>
                      <Link to="#">Edit</Link>
                    </div>
                    <ul className="address-info">
                      <li>Casandra</li>
                      <li>casandra@example.com</li>
                      <li>+1 73940 45355</li>
                      <li>45, 4th Avenue Mark Street USA</li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <div className="confirmation-title">
                      <h4>Drop Off Location</h4>
                      <Link to="#">Edit</Link>
                    </div>
                    <ul className="address-info mb-0">
                      <li>45, 4th Avenue Mark Street USA</li>
                      <li>
                        {carBookingDetails?.endTripDate} -{" "}
                        {carBookingDetails?.endTripTime}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="place-order-btn">
                <Button
                  className="btn btn-primary d-flex align-items-center w-full justify-content-center"
                  onClick={handlePlaceOrder}
                  disabled={bookingConfirmed}
                >
                  <span>Place Order</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mx-2 size-6"
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
          </div>
        </section>
      ) : (
        <div className="container">
          <p>No booking details available.</p>
        </div>
      )}

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{}</Modal.Body>
      </Modal>

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="payment-success">
            <span className="check">
              <i className="fa-solid fa-check-double"></i>
            </span>
            <h6>Order Confirmed</h6>
            {carBookingDetails?.bookingId && (
              <div>
                <p>Your payment has been successfully done.</p>
                <p>
                  Booking id :{" "}
                  <span className="bg-slate-100 p-1 rounded">
                    #{carBookingDetails?.bookingId}
                  </span>
                </p>
              </div>
            )}
            <Link
              to={all_routes.userbookings}
              className="btn btn-primary mt-3 w-full"
            >
              Go to User Bookings
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Booking;
