import React, { useEffect, useState } from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import DashboardMenu from "./dashboardmenu";
import { useSelector } from "react-redux";
import { reviews } from "../api/performance";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath1 from "../../core/data/img/ImageWithBasePath1";
//import LocationDisplay from "../common/LocationDisplay";
import { RootState } from "../redux/rootReducer";
import { Helmet } from "react-helmet";
interface ListingInfo {
  carId: string;
  carImage: string;
  carModel: string;
  rcNumber: string;
  carImage1: string;
  latitude: number;
  longitude: number;
}

interface ReviewMessage {
  comment: string;
  rating: number;
}

const HostReview: React.FC = () => {
  const navigate = useNavigate();
  const route = all_routes;
  const [carReviews, setCarReviews] = useState<any[]>([]);
  const Listings = useSelector(
    (state: RootState) => state.listingInfo.listingInfo as ListingInfo[],
  );

  useEffect(() => {
    const fetchReviews = async () => {
      const listingsWithReviews = await Promise.all(
        Listings.map(async (lstg: ListingInfo) => {
          const reviewsObject = await reviews(lstg.carId);

          if (reviewsObject && Array.isArray(reviewsObject.message)) {
            const combinedReviews = reviewsObject.message.map(
              (message: ReviewMessage) => ({
                ...lstg,
                message,
              }),
            );
            return combinedReviews;
          } else {
            console.error(
              "reviewsObject.message is not an array:",
              reviewsObject,
            );
            return [];
          }
        }),
      );

      const flattenedListingsWithReviews = listingsWithReviews.flat();
      setCarReviews(flattenedListingsWithReviews);
    };

    if (Listings.length > 0) {
      fetchReviews();
    }
  }, [Listings]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(route.signup);
      return;
    }
  }, [navigate, route.signup]);

  return (
    <div>
      <Helmet>
        <title>Host Reviews | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Read and manage reviews for your car rental listings on Spintrip Car Rentals. Respond to feedback from renters and improve your rental service in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals host reviews, manage reviews, respond to feedback, improve rental service, car rental reviews Bangalore"
        />
      </Helmet>

      <div className="main-wrapper">
        <>
          <Breadcrumbs
            title="Host Review"
            subtitle="Host Review"
            maintitle={undefined}
          />
          <DashboardMenu />
          <div className="content">
            <div className="container">
              <div className="content-header">
                <h4>All Reviews</h4>
              </div>
              <div className="wishlist-wrap">
                {Array.isArray(carReviews) && carReviews.length > 0 ? (
                  carReviews.map((review, index) => (
                    <div className="listview-car" key={index}>
                      <div className="card">
                        <div className="blog-widget d-flex">
                          <div className="blog-img">
                            <div className="listing-item">
                              <div className="listing-img">
                                <Link to="#">
                                  <ImageWithBasePath1
                                    src={
                                      review.carImage1
                                        ? review.carImage1
                                        : "/assets/img/cars/no_img_found.jpg"
                                    }
                                    className="img-fluid"
                                    alt={review.carModel}
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="bloglist-content w-100">
                            <div className="card-body">
                              <div className="blog-list-head d-flex">
                                <div className="blog-list-title">
                                  <h3>
                                    <Link to="#">{review.carModel}</Link>
                                  </h3>
                                  <h6>
                                    RC Number: <span>{review.rcNumber}</span>
                                  </h6>
                                </div>
                              </div>
                              <div className="review-comment">
                                <p>{review.message.comment}</p>
                              </div>
                              <div className="list-rating">
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`fas fa-star ${i < review.message.rating ? "filled" : "unfilled"} me-1`}
                                  />
                                ))}
                                <span>({review.message.rating || "5.0"})</span>
                              </div>
                              {/* <div className="review-comment">
                              <LocationDisplay latitude={review.latitude} longitude={review.longitude} />
                            </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="w-full text-center">No reviews found.</p>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default HostReview;
