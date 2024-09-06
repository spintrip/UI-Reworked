import React, { useState, useEffect } from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";

import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import LocationDisplay from "../common/LocationDisplay";
import { payment, phonePePayment } from "../api/Booking";
import { Button } from "react-bootstrap";
import useScrollToTop from "../../hooks/useScrollToTop";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";
import { Helmet } from "react-helmet";
//import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";

const BookingCheckout = () => {
  useScrollToTop();
  const routes = all_routes;
  const paymentData = useSelector(
    (state: RootState) => state.Checkout.paymentData,
  );

  const navigate = useNavigate();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [scrollToTopTrigger, setScrollToTopTrigger] = useState(false);

  useEffect(() => {
    if (scrollToTopTrigger) {
      window.scrollTo(0, 0);
      setScrollToTopTrigger(false); // Reset the trigger after scrolling
    }
  }, [scrollToTopTrigger]);

  const handlePaymentNavigation = () => {
    setScrollToTopTrigger(true);
    const currentTabPane = document.querySelector("#pills-booking");
    const nextTabPane = document.querySelector("#pills-payment");

    const currentTabLink = document.querySelector("#pills-booking-tab");
    const nextTabLink = document.querySelector("#pills-payment-tab");

    if (currentTabPane && nextTabPane && currentTabLink && nextTabLink) {
      currentTabPane.classList.remove("show", "active");
      currentTabLink.classList.remove("active");

      nextTabPane.classList.add("show", "active");
      nextTabLink.classList.add("active");
    }
  };

  // const handlePayment = async () => {
  //   if (!payment) {
  //     console.error("No booking for payment found");
  //     return;
  //   }
  //   try {
  //     setLoadingPayment(true);
  //     const response = await payment(paymentData.bookingId);
  //     const paymentUrl = response.paymentUrl;
  //     if (paymentUrl) {
  //       const popup = window.open(
  //         paymentUrl,
  //         "Payment",
  //         "width=600,height=600",
  //       );
  //       if (popup) {
  //         // document.body.style.backgroundColor = 'grey';
  //         const checkPopupClosed = setInterval(() => {
  //           if (popup.closed) {
  //             clearInterval(checkPopupClosed);
  //             // document.body.style.backgroundColor = '';
  //             setLoadingPayment(false);
  //             navigate("/user/user-dashboard"); // Redirect to user-dashboard page
  //           }
  //         }, 1000);
  //       } else {
  //         throw new Error("Failed to open payment popup");
  //       }
  //     } else {
  //       throw new Error("Payment URL not found in response");
  //     }
  //   } catch (error) {
  //     console.error("Error during payment:", error);
  //     setLoadingPayment(false);
  //   }
  // };
  const handlePhonePePayment = async () => {
    if (!payment) {
      console.error("No booking for payment found");
      return;
    }
    try {
      setLoadingPayment(true);
      const response = await phonePePayment(paymentData.bookingId);
      const paymentUrl = response.paymentUrl;
      if (paymentUrl) {
        const popup = window.open(
          paymentUrl,
          "Payment",
          "width=600,height=600",
        );
        if (popup) {
          // document.body.style.backgroundColor = 'grey';
          const checkPopupClosed = setInterval(() => {
            if (popup.closed) {
              clearInterval(checkPopupClosed);
              // document.body.style.backgroundColor = '';
              setLoadingPayment(false);
              navigate("/user/user-dashboard"); // Redirect to user-dashboard page
            }
          }, 1000);
        } else {
          throw new Error("Failed to open payment popup");
        }
      } else {
        throw new Error("Payment URL not found in response");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setLoadingPayment(false);
    }
  };
  return (
    <div className="main-wrapper">
      <Helmet>
              <GoogleAnalyticsScript/>
                <title>Payment - Spintrip Car Rentals </title>
                <meta
                  name="description"
                  content="Spintrip Car Rentals - Affordable self-drive car rentals in Bangalore. Rent top-notch cars from local hosts and enjoy competitive pricing. Hosts earn exciting commissions by listing their cars with us."
                />
                <meta
                  name="keywords"
                  content="Spintrip Car Rentals, affordable car rentals Bangalore, self-drive car rentals Bangalore, rent cars Bangalore, top-notch cars Bangalore, local car hosts Bangalore, competitive car rental pricing, car rental commissions, list your car Bangalore, Bangalore car hire, best car rentals Bangalore, car rental deals Bangalore, self-drive cars Bangalore, car rental service Bangalore, rent a car Bangalore, car rental company Bangalore, self-drive rental services, weekend car rentals Bangalore, hourly car rentals Bangalore, economic car rentals Bangalore"
                ></meta>
      </Helmet>
      <Breadcrumbs title="Booking" maintitle="Booking" subtitle="Pages" />
      <section className="booking-section">
        <div className="container">
          <ul
            className="nav nav-pills booking-tab"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item">
              <Link
                className="nav-link border border-2 active"
                id="pills-booking-tab"
                data-bs-toggle="pill"
                to="#pills-booking"
                role="tab"
                aria-controls="pills-booking"
                aria-selected="true"
              >
                <span>Step 1</span>
                <h5>Booking Details</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link border border-2"
                id="pills-payment-tab"
                data-bs-toggle="pill"
                to="#pills-payment"
                role="tab"
                aria-controls="pills-payment"
                aria-selected="false"
              >
                <span>Step 2</span>
                <h5>Payments Details</h5>
              </Link>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-booking"
              role="tabpanel"
              aria-labelledby="pills-booking-tab"
            >
              <div className="booking-details border">
                <div className="booking-title">
                  <h3>Booking Details</h3>
                </div>
                <div className="row booking-info">
                  <div className="col-12 col-md-6 pickup-address">
                    <h5 style={{fontWeight: '700'}}>Pickup</h5>
                    <span>
                      Location :{" "}
                      <LocationDisplay
                        latitude={paymentData.latitude}
                        longitude={paymentData.longitude}
                      />
                    </span>
                    {/* <button className="btn mt-5 d-flex py-2 px-3 bg-dark text-white rounded align-items-center justify-content-center">
                  <span className="text-white "> Maps </span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </button> */}
                  </div>

                  <div className="col-12 col-md-6 booking-amount d-flex flex-column align-items-end justify-content-between">
                    <h3>Amount to be paid</h3>
                    <h6>
                      <div className="d-flex flex-column align-items-end justify-content-end">
                        <span
                          className="font-mono text-black font-semibold"
                          style={{ fontSize: "2rem" }}
                        >
                          ₹ {paymentData.totalUserAmount}{" "}
                        </span>
                        <p className="text-warning">inc taxes</p>
                      </div>
                    </h6>
                  </div>
                </div>
                <div className="booking-form mt-5">
                  <div className="booking-title">
                    <h5>Booking Summary</h5>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-block">
                        <label>Booking ID</label>
                        <p className="font-mono ">{paymentData.bookingId}</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-block">
                        <label>Car Model</label>
                        <p>{paymentData.carModel}</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-block">
                        <label>Start Trip Date</label>
                        <p>{paymentData.startTripDate}</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-block">
                        <label>Start Trip Time</label>
                        <p>{paymentData.startTripTime}</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-block">
                        <label>End Trip Date</label>
                        <p>{paymentData.endTripDate}</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-block">
                        <label>End Trip Time</label>
                        <p>{paymentData.endTripTime}</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-block">
                        <label>Status</label>
                        <p>
                          {paymentData.status === 1 ? "Confirmed" : "Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-block">
                        <label>Created At</label>
                        <p>
                          {new Date(paymentData.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="payment-btn">
                    <button
                      className="btn btn-primary submit-review"
                      type="button"
                      onClick={handlePaymentNavigation}
                    >
                      Step 2<i className="fa-solid fa-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="back-detail-page">
                <Link to={routes.userBookings}>
                  <i className="fa-solid fa-arrow-left me-2"></i> Back to
                  booking page
                </Link>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-payment"
              role="tabpanel"
              aria-labelledby="pills-payment-tab"
            >
              <div className="booking-details payment-details">
                <div className="booking-title">
                  <h3>Payment Details</h3>
                </div>
                <div className="booking-info">
                  <div className="booking-amount">
                    <div className="col-12 booking-amount d-flex flex-column align-items-start justify-content-between">
                      <h3>Amount to be paid</h3>
                      <h6>
                        <div className="d-flex flex-column align-items-start justify-content-end">
                          <span
                            className="font-mono text-black font-semibold"
                            style={{ fontSize: "2rem" }}
                          >
                            ₹ {paymentData.totalUserAmount}{" "}
                          </span>
                          <p className="text-warning">inc taxes</p>
                        </div>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="payment-method">
                  <h4>Choose your Payment Method</h4>
                  <ul className="row d-flex align-items-start justify-content-center" id="pills-tab" role="tablist">
                    {/* <div className="col">
                      <button className="mx-2 opacity-60" >
                        <Link
                        
                          className="w-100 h-full border p-2 border-warning d-flex flex-column align-items-center justify-content-between"
                          id=""
                          data-bs-toggle="pill"
                          to="#"
                          role="tab"
                          aria-controls=""
                          aria-selected="true"
                        >
                          <img
                            src="https://cashfreelogo.cashfree.com/website/NavFooter/Cashfree-Dark.svg"
                            alt="cashfree payments"
                            className="w-100"
                            style={{height:'10vh'}}
                          />

                          
                        </Link>
                      </button>
                    </div> */}
                    <div className="col">
                      <button className="mx-2">
                        <Link
                          className="active rounded  border p-2 border-warning d-flex flex-column align-items-center justify-content-between"
                          id=""
                          data-bs-toggle="pill"
                          to="#"
                          role="tab"
                          aria-controls=""
                          aria-selected="true"
                        >
                          <img
                            src="https://www.logo.wine/a/logo/PhonePe/PhonePe-Logo.wine.svg"
                            alt="PhonePe Payments"
                            className="w-100"
                            style={{height:'10vh'}}
                          />

                          
                        </Link>
                      </button>
                    </div>
                    {/* <li className="nav-item">
                        <Link
                          className="nav-link border border-2"
                          id=""
                          data-bs-toggle="pill"
                          to="#"
                          role="tab"
                          aria-controls=""
                          aria-selected="false"
                        >
                          <span>Step 2</span>
                          
                        </Link>
                      </li> */}
                  </ul>
                  <div className="booking-form mt-5">
                    <div className="booking-title">
                      <h5>Proceed to Pay</h5>
                    </div>
                    <form className="#">
                      <div className="row">
                        {/* <div className="col-lg-12">
                          <div className="input-block">
                            <label>
                              Card Number <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="45612212255455"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-block">
                            <label>
                              Expiration date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="12/25"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-block">
                            <label>
                              Security number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="input-block payment-checkbox m-0">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                            Save this account for future transaction
                          </label>
                        </div> */}
                      </div>
                      {loadingPayment ? (
                        <>
                          <div
                            className="spinner-border text-warning"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="payment-btn">
                            <Button
                              variant="dark"
                              className="d-flex align-items-center justify-content-center"
                              onClick={async () => {
                                document.body.style.backgroundColor = "grey";
                                await handlePhonePePayment();
                                document.body.style.backgroundColor = "";
                              }}
                            >
                              <span>Pay Now</span>
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
                                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                                />
                              </svg>
                            </Button>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <div className="back-detail-page">
                <Link to={routes.userbookings}>
                  <i className="fa-solid fa-arrow-left me-2"></i> Back to
                  Booking page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal custom-modal fade check-availability-modal payment-success-modal"
        id="pages_edit"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-body">
              <div className="payment-success">
                <span className="check">
                  <i className="fa-solid fa-check-double"></i>
                </span>
                <h5>Payment Successful</h5>
                <p>
                  You Payment has been successfully done. Trasaction id :
                  <span> #5064164454</span>
                </p>
                <div className="order-confirm">
                  <Link to={routes.booking}>
                    Go to Order Confirmation
                    <i className="fa-solid fa-arrow-right ms-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckout;
