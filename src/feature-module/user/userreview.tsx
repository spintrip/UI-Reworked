import React, { useEffect, useState } from "react";
import Aos from "aos";
import Breadcrumbs from "../common/Breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import DashboardMenu from "./dashboardmenu";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { userReviewData } from "../../core/data/json/user_review";
import { Helmet } from "react-helmet";

const UserReview = () => {
  const carName = (res: any) => {
    return (
      <div className="table-avatar">
        <Link to="#" className="avatar avatar-lg flex-shrink-0">
          <ImageWithBasePath
            className="avatar-img"
            src={res.img}
            alt="Booking"
          />
        </Link>
        <div className="table-head-name flex-grow-1">
          <Link to="#">{res.carName}</Link>
          <p>{res.deliveryStatus}</p>
        </div>
      </div>
    );
  };
  const checkbox = () => {
    return (
      <label className="custom_check w-100">
        <input type="checkbox" name="username" />
        <span className="checkmark" />
      </label>
    );
  };

  const action = () => {
    return (
      <div className="dropdown dropdown-action">
        <Link
          to="javascript:void(0);"
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-ellipsis-vertical"></i>
        </Link>
        <div className="dropdown-menu dropdown-menu-end">
          <Link className="dropdown-item" to="javascript:void(0);">
            <i className="feather-eye me-2"></i> View
          </Link>
          <Link
            className="dropdown-item"
            to="javascript:void(0);"
            data-bs-toggle="modal"
            data-bs-target="#delete_modal"
          >
            <i className="feather-trash-2 me-2"></i> Delete
          </Link>
        </div>
      </div>
    );
  };
  const rating = (res: {
    rating:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined;
  }) => {
    return (
      <div className="review-rating">
        <i className="fas fa-star filled"></i>
        <i className="fas fa-star filled"></i>
        <i className="fas fa-star filled"></i>
        <i className="fas fa-star filled"></i>
        {res?.rating == "(4.5)" ? (
          <i className="fas fa-star-half-stroke filled"></i>
        ) : (
          <i className="fas fa-star filled"></i>
        )}
        <span>{res.rating}</span>
      </div>
    );
  };
  const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    userReviewData.getReviewMedium().then((data: any) => setUserReview(data));
  }, []);
  return (
    <div>
      <Helmet>
        <title>User Reviews | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Leave reviews for your car rental experiences with Spintrip Car Rentals. Share your feedback on the rental process, car quality, and host interactions in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals reviews, leave feedback, car rental experiences, car quality reviews, host interactions Bangalore"
        />
      </Helmet>
      <Breadcrumbs
        maintitle="User Review"
        title="User Review"
        subtitle="User Review"
      />
      <DashboardMenu />
      <div className="content">
        <div className="container">
          {/* Sort By */}
          <div className="row">
            <div className="col-lg-12">
              <div className="sorting-info">
                <div className="row">
                  <div className="col-md-12">
                    <div className="filter-group">
                      <div className="sort-week sort">
                        <div className="dropdown dropdown-action">
                          <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            This Week <i className="fas fa-chevron-down" />
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to="#">
                              This Week
                            </Link>
                            <Link className="dropdown-item" to="#">
                              This Month
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Last 30 Days
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-target="#custom_date"
                            >
                              Custom
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="sort-relevance sort">
                        <div className="dropdown dropdown-action">
                          <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Sort By Relevance{" "}
                            <i className="fas fa-chevron-down" />
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to="#">
                              Sort By Relevance
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Sort By Ascending
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Sort By Descending
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Sort By Alphabet
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sort By */}
          <div className="row">
            {/* Reviews */}
            <div className="col-lg-12 d-flex">
              <div className="card book-card flex-fill mb-0">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <h4>
                        All Reviews <span>40</span>
                      </h4>
                    </div>
                    <div className="col-md-7 text-md-end">
                      <div className="table-search">
                        <input
                          type="text"
                          placeholder="Search"
                          id="tablefilter"
                          className="inputsearch"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive dashboard-table">
                    <DataTable
                      className="table datatable"
                      value={userReview}
                      paginator
                      rows={10}
                      rowsPerPageOptions={[10, 25, 50]}
                      currentPageReportTemplate="{first}"
                    >
                      <Column body={checkbox} header={checkbox}></Column>
                      <Column
                        field="carName"
                        header="Car Name"
                        body={carName}
                      ></Column>
                      <Column field="rentalType" header="Rental Type"></Column>
                      <Column field="review" header="Review"></Column>
                      <Column
                        field="rating"
                        header="Ratings"
                        body={rating}
                      ></Column>
                      <Column
                        field="action"
                        header="Action"
                        body={action}
                      ></Column>
                    </DataTable>
                  </div>
                </div>
              </div>
            </div>
            {/* /Reviews */}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        className="modal new-modal fade"
        id="delete_modal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="delete-action">
                <div className="delete-header">
                  <h4>Delete Reviews</h4>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn">
                  <div className="row">
                    <div className="col-6">
                      <Link
                        to="#"
                        data-bs-dismiss="modal"
                        className="btn btn-secondary w-100"
                      >
                        Delete
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to="#"
                        data-bs-dismiss="modal"
                        className="btn btn-primary w-100"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Modal */}
      {/* Custom Date Modal */}
      <div
        className="modal new-modal fade"
        id="custom_date"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Custom Date</h4>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="#">
                <div className="modal-form-group">
                  <label>
                    From Date <span className="text-danger">*</span>
                  </label>
                  <input type="date" className="form-control" />
                </div>
                <div className="modal-form-group">
                  <label>
                    To Date <span className="text-danger">*</span>
                  </label>
                  <input type="date" className="form-control" />
                </div>
                <div className="modal-btn modal-btn-item modal-btn-sm text-end">
                  <Link
                    to="#"
                    data-bs-dismiss="modal"
                    className="btn btn-secondary"
                  >
                    Cancel Booking
                  </Link>
                  <Link
                    to="#"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Start Ride
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Custom Date Modal */}
      {/* Add Payment Modal */}
      <div
        className="modal new-modal multi-step fade"
        id="add_review"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Review</h4>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="review-wrap">
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="booking-img-wrap">
                      <div className="book-img">
                        <ImageWithBasePath
                          src="assets/img/cars/car-05.jpg"
                          alt="img"
                        />
                      </div>
                      <div className="book-info">
                        <h6>Chevrolet Camaro</h6>
                        <p>Delivery</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="booking-view">
                          <h6>Rental Type</h6>
                          <p>Hourly</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="booking-view">
                          <h6>Total Amount</h6>
                          <p>$3000</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="booking-view">
                          <h6>Booked On</h6>
                          <p>15 Sep 2023, 09:30 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form action="#">
                <div className="rating-wrap">
                  <div className="modal-form-group">
                    <label>
                      Overall Ratings <span className="text-danger">*</span>
                    </label>
                    <div className="rating">
                      <Link to="#" className="fav-icon">
                        <i className="fas fa-star" />
                      </Link>
                      <Link to="#" className="fav-icon">
                        <i className="fas fa-star" />
                      </Link>
                      <Link to="#" className="fav-icon">
                        <i className="fas fa-star" />
                      </Link>
                      <Link to="#" className="fav-icon">
                        <i className="fas fa-star" />
                      </Link>
                      <Link to="#" className="fav-icon">
                        <i className="fas fa-star" />
                      </Link>
                    </div>
                  </div>
                  <div className="modal-form-group">
                    <label>
                      Enter Review <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Enter Comments"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="modal-btn modal-btn-sm text-end">
                  <Link
                    to="#"
                    data-bs-dismiss="modal"
                    className="btn btn-secondary"
                  >
                    Go Back
                  </Link>
                  <Link
                    to="#"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Submit
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Payment Modal */}
    </div>
  );
};

export default UserReview;
