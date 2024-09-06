import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import { Helmet } from "react-helmet";

const route = all_routes;
const BlogGrid = () => {
  return (
    <div>
      <Helmet>
        <title>Blog | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Stay updated with the latest news, tips, and stories about car rentals, travel experiences, and more from Spintrip Car Rentals. Explore our blog for insights and inspiration."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals blog, car rental news, travel tips Bangalore, car rental stories, car rental insights, travel inspiration Bangalore"
        />
      </Helmet>
      <div className="main-wrapper">
        <Breadcrumbs maintitle="Blog Grid" title="Blog Grid" subtitle="Blogs" />
      </div>
      <div>
        {/* Blog Grid*/}
        <div className="blog-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-6 col-md-6 d-lg-flex">
                    <div className="blog grid-blog">
                      <div className="blog-image">
                        <Link to={route.blogdetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/blog-1.jpg"
                            alt="Post Image"
                          />
                        </Link>
                      </div>
                      <div className="blog-content">
                        <p className="blog-category">
                          <Link to="#">
                            <span>Car Showcase</span>
                          </Link>
                        </p>
                        <h3 className="blog-title">
                          <Link to={route.blogdetails}>
                            Tesla Model S: Top Secret Car Collectors Garage
                          </Link>
                        </h3>
                        <p className="blog-description">
                          Everyone has the right to freedom of thought,
                          conscience and religion; this right includes freedom
                          to change his religion or belief, and freedom, either
                          alone...
                        </p>
                        <ul className="meta-item">
                          <li>
                            <div className="post-author">
                              <div className="post-author-img">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-13.jpg"
                                  alt="author"
                                />
                              </div>
                              <Link to="#">
                                {" "}
                                <span> Alphonsa Daniel </span>
                              </Link>
                            </div>
                          </li>
                          <li className="date-icon">
                            <i className="fa-solid fa-calendar-days" />{" "}
                            <span>Jan 6, 2023</span>
                          </li>
                        </ul>
                        <Link
                          to={route.blogdetails}
                          className="viewlink btn btn-primary"
                        >
                          Read More{" "}
                          <i className="feather icon-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 d-lg-flex">
                    <div className="blog grid-blog">
                      <div className="blog-image">
                        <Link to={route.blogdetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/blog-2.jpg"
                            alt="Post Image"
                          />
                        </Link>
                      </div>
                      <div className="blog-content">
                        <p className="blog-category">
                          <Link to="#">
                            <span>Car Showcase</span>
                          </Link>
                        </p>
                        <h3 className="blog-title">
                          <Link to={route.blogdetails}>
                            The 2023 Ford F-150 Raptor – A First Look
                          </Link>
                        </h3>
                        <p className="blog-description">
                          Everyone has the right to freedom of thought,
                          conscience and religion; this right includes freedom
                          to change his religion or belief, and freedom, either
                          alone...
                        </p>
                        <ul className="meta-item">
                          <li>
                            <div className="post-author">
                              <div className="post-author-img">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-04.jpg"
                                  alt="author"
                                />
                              </div>
                              <Link to="#">
                                {" "}
                                <span> Hellan </span>
                              </Link>
                            </div>
                          </li>
                          <li className="date-icon">
                            <i className="fa-solid fa-calendar-days" />{" "}
                            <span>Feb 6, 2023</span>
                          </li>
                        </ul>
                        <Link
                          to={route.blogdetails}
                          className="viewlink btn btn-primary"
                        >
                          Read More{" "}
                          <i className="feather icon-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 d-lg-flex">
                    <div className="blog grid-blog">
                      <div className="blog-image">
                        <Link to={route.blogdetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/blog-3.jpg"
                            alt="Post Image"
                          />
                        </Link>
                      </div>
                      <div className="blog-content">
                        <p className="blog-category">
                          <Link to="#">
                            <span>Car Showcase</span>
                          </Link>
                        </p>
                        <h3 className="blog-title">
                          <Link to={route.blogdetails}>
                            Tesla Model S: Top Secret Car Collector’s Garage
                          </Link>
                        </h3>
                        <p className="blog-description">
                          Everyone has the right to freedom of thought,
                          conscience and religion; this right includes freedom
                          to change his religion or belief, and freedom, either
                          alone...
                        </p>
                        <ul className="meta-item">
                          <li>
                            <div className="post-author">
                              <div className="post-author-img">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-13.jpg"
                                  alt="author"
                                />
                              </div>
                              <Link to="#">
                                {" "}
                                <span> Alphonsa Daniel </span>
                              </Link>
                            </div>
                          </li>
                          <li className="date-icon">
                            <i className="fa-solid fa-calendar-days" />{" "}
                            <span>March 6, 2023</span>
                          </li>
                        </ul>
                        <Link
                          to={route.blogdetails}
                          className="viewlink btn btn-primary"
                        >
                          Read More{" "}
                          <i className="feather icon-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 d-lg-flex">
                    <div className="blog grid-blog">
                      <div className="blog-image">
                        <Link to={route.blogdetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/blog-4.jpg"
                            alt="Post Image"
                          />
                        </Link>
                      </div>
                      <div className="blog-content">
                        <p className="blog-category">
                          <Link to="#">
                            <span>Car Showcase</span>
                          </Link>
                        </p>
                        <h3 className="blog-title">
                          <Link to={route.blogdetails}>
                            The 2023 Ford F-150 Raptor – A First Look
                          </Link>
                        </h3>
                        <p className="blog-description">
                          Everyone has the right to freedom of thought,
                          conscience and religion; this right includes freedom
                          to change his religion or belief, and freedom, either
                          alone...
                        </p>
                        <ul className="meta-item">
                          <li>
                            <div className="post-author">
                              <div className="post-author-img">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-04.jpg"
                                  alt="author"
                                />
                              </div>
                              <Link to="#">
                                {" "}
                                <span> Hellan </span>
                              </Link>
                            </div>
                          </li>
                          <li className="date-icon">
                            <i className="fa-solid fa-calendar-days" />{" "}
                            <span>March 28, 2022</span>
                          </li>
                        </ul>
                        <Link
                          to={route.blogdetails}
                          className="viewlink btn btn-primary"
                        >
                          Read More{" "}
                          <i className="feather icon-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 d-lg-flex">
                    <div className="blog grid-blog">
                      <div className="blog-image">
                        <Link to={route.blogdetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/blog-5.jpg"
                            alt="Post Image"
                          />
                        </Link>
                      </div>
                      <div className="blog-content">
                        <p className="blog-category">
                          <Link to="#">
                            <span>Car Showcase</span>
                          </Link>
                        </p>
                        <h3 className="blog-title">
                          <Link to={route.blogdetails}>
                            Tesla Model S: Top Secret Car Collector’s Garage
                          </Link>
                        </h3>
                        <p className="blog-description">
                          Everyone has the right to freedom of thought,
                          conscience and religion; this right includes freedom
                          to change his religion or belief, and freedom, either
                          alone...
                        </p>
                        <ul className="meta-item">
                          <li>
                            <div className="post-author">
                              <div className="post-author-img">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-04.jpg"
                                  alt="author"
                                />
                              </div>
                              <Link to="#">
                                {" "}
                                <span> Hellan </span>
                              </Link>
                            </div>
                          </li>
                          <li className="date-icon">
                            <i className="fa-solid fa-calendar-days" />{" "}
                            <span>March 30, 2023</span>
                          </li>
                        </ul>
                        <Link
                          to={route.blogdetails}
                          className="viewlink btn btn-primary"
                        >
                          Read More{" "}
                          <i className="feather icon-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 d-lg-flex">
                    <div className="blog grid-blog">
                      <div className="blog-image">
                        <Link to={route.blogdetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/blog-6.jpg"
                            alt="Post Image"
                          />
                        </Link>
                      </div>
                      <div className="blog-content">
                        <p className="blog-category">
                          <Link to="#">
                            <span>Car Showcase</span>
                          </Link>
                        </p>
                        <h3 className="blog-title">
                          <Link to={route.blogdetails}>
                            The 2023 Ford F-150 Raptor – A First Look
                          </Link>
                        </h3>
                        <p className="blog-description">
                          Everyone has the right to freedom of thought,
                          conscience and religion; this right includes freedom
                          to change his religion or belief, and freedom, either
                          alone...
                        </p>
                        <ul className="meta-item">
                          <li>
                            <div className="post-author">
                              <div className="post-author-img">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-04.jpg"
                                  alt="author"
                                />
                              </div>
                              <Link to="#">
                                {" "}
                                <span> Hellan </span>
                              </Link>
                            </div>
                          </li>
                          <li className="date-icon">
                            <i className="fa-solid fa-calendar-days" />{" "}
                            <span>March 31, 2023</span>
                          </li>
                        </ul>
                        <Link
                          to={route.blogdetails}
                          className="viewlink btn btn-primary"
                        >
                          Read More{" "}
                          <i className="feather icon-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Pagination*/}
                <div className="pagination">
                  <nav>
                    <ul className="pagination">
                      <li className="previtem">
                        <Link className="page-link" to="#">
                          <i className="fas fa-regular fa-arrow-left me-2" />{" "}
                          Prev
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
                                <span className="visually-hidden">
                                  (current)
                                </span>
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
                {/*/Pagination*/}
              </div>
              <div className="col-lg-4 theiaStickySidebar">
                <div className="stickybar">
                  <div className="rightsidebar">
                    <div className="card">
                      <h4>
                        <ImageWithBasePath
                          src="assets/img/icons/details-icon.svg"
                          alt="details-icon"
                        />{" "}
                        Filter
                      </h4>
                      <div className="filter-content looking-input input-block mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="To Search type and hit enter"
                        />
                      </div>
                    </div>
                    <div className="card">
                      <h4>
                        <ImageWithBasePath
                          src="assets/img/icons/category-icon.svg"
                          alt="details-icon"
                        />{" "}
                        Categories
                      </h4>
                      <ul className="blogcategories-list">
                        <li>
                          <Link to="#">Accept Credit Cards</Link>
                        </li>
                        <li>
                          <Link to="#">Smoking Allowed</Link>
                        </li>
                        <li>
                          <Link to="#">Bike Parking</Link>
                        </li>
                        <li>
                          <Link to="#">Street Parking</Link>
                        </li>
                        <li>
                          <Link to="#">Wireless Internet</Link>
                        </li>
                        <li>
                          <Link to="#">Pet Friendly</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="card tags-widget">
                      <h4>
                        <i className="feather icon-tag" /> Tags
                      </h4>
                      <ul className="tags">
                        <li>Air </li>
                        <li>Engine </li>
                        <li>Item </li>
                        <li>On Road </li>
                        <li>Rims </li>
                        <li>Speed </li>
                        <li>Make </li>
                        <li>Transmission </li>
                      </ul>
                    </div>
                    <div className="card">
                      <h4>
                        <i className="feather icon-tag" />
                        Top Article
                      </h4>
                      <div className="article">
                        <div className="article-blog">
                          <Link to={route.blogdetails}>
                            <ImageWithBasePath
                              className="img-fluid"
                              src="assets/img/blog/blog-3.jpg"
                              alt="Blog"
                            />
                          </Link>
                        </div>
                        <div className="article-content">
                          <h5>
                            <Link to={route.blogdetails}>
                              Great Business Tips in 2023
                            </Link>
                          </h5>
                          <div className="article-date">
                            <i className="fa-solid fa-calendar-days" />
                            <span>Jan 6, 2023</span>
                          </div>
                        </div>
                      </div>
                      <div className="article">
                        <div className="article-blog">
                          <Link to={route.blogdetails}>
                            <ImageWithBasePath
                              className="img-fluid"
                              src="assets/img/blog/blog-4.jpg"
                              alt="Blog"
                            />
                          </Link>
                        </div>
                        <div className="article-content">
                          <h5>
                            <Link to={route.blogdetails}>
                              Excited News About Cars.
                            </Link>
                          </h5>
                          <div className="article-date">
                            <i className="fa-solid fa-calendar-days" />
                            <span>Feb 10, 2023</span>
                          </div>
                        </div>
                      </div>
                      <div className="article">
                        <div className="article-blog">
                          <Link to={route.blogdetails}>
                            <ImageWithBasePath
                              className="img-fluid"
                              src="assets/img/blog/blog-5.jpg"
                              alt="Blog"
                            />
                          </Link>
                        </div>
                        <div className="article-content">
                          <h5>
                            <Link to={route.blogdetails}>
                              8 Amazing Tricks About Business
                            </Link>
                          </h5>
                          <div className="article-date">
                            <i className="fa-solid fa-calendar-days" />
                            <span>March 18, 2023</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Blog Grid*/}
      </div>
    </div>
  );
};

export default BlogGrid;
