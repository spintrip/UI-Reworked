import React, { useEffect } from "react";
import Breadcrumbs from "../../common/Breadcrumbs";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import { Review } from "../../common/interface";

const Testimonials = () => {
  const data = useSelector((state: Review) => state.testimonialdata);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);
  return (
    <div className="main-wrapper">
      <Breadcrumbs
        maintitle="Testimonials"
        title="Testimonials"
        subtitle="Pages"
      />
      <div className="testimonials-section">
        <div className="container">
          <div className="testimonial-group">
            <div className="row">
              {data.map(
                (
                  review: {
                    image: string;
                    author:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    rating:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    reviewText:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  },
                  index: React.Key | null | undefined,
                ) => (
                  <div
                    key={index}
                    className="col-lg-6 col-12 d-flex"
                    data-aos="fade-down"
                    data-aos-duration={1200}
                    data-aos-delay={800}
                  >
                    <div className="card flex-fill">
                      <div className="card-body">
                        <div className="quotes-head" />
                        <div className="review-box">
                          <div className="review-profile">
                            <div className="review-img">
                              <ImageWithBasePath
                                src={review.image}
                                className="img-fluid"
                                alt={`${review.author}'s profile`}
                              />
                            </div>
                          </div>
                          <div className="review-details">
                            <h6>{review.author}</h6>
                            <div className="list-rating">
                              <div className="list-rating-star">
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <p>
                                  <span>({review.rating})</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p>{review.reviewText}</p>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
          {/* Pagination */}
          <div className="row">
            <div
              className="col-lg-12"
              data-aos="fade-down"
              data-aos-duration={1200}
              data-aos-delay={900}
            >
              <div className="pagination d-flex align-items-center justify-content-center">
                <nav>
                  <ul className="pagination">
                    <li className="previtem">
                      <Link className="page-link" to="#">
                        <i className="fas fa-regular fa-arrow-left me-2" /> Prev
                      </Link>
                    </li>
                    <li className="justify-content-center pagination-center">
                      <div className="page-group">
                        <ul>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="active page-link" to="#">
                              2{" "}
                              <span className="visually-hidden">(current)</span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              3
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              4
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              5
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nextlink">
                      <Link className="page-link" to="#">
                        Next{" "}
                        <i className="fas fa-regular fa-arrow-right ms-2" />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* /Pagination */}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
