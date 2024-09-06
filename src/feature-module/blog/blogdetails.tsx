import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

//import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
// import { all_routes } from "../router/all_routes";
import { getBlogById } from "../api/Blogs";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Helmet } from "react-helmet";

type Blog = {
  blogId: string;
  blogImage1: string;
  blogImage2: string;
  keywords: string;
  blogName: string;
  blogAuthor: string;
  createdAt: string;
  description: string;
};

// const route = all_routes
const BlogDetails = () => {
  useScrollToTop();
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(id); // Fetch the blog details
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [id]);



  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <Helmet>
        <title>{blog.blogName} | Spintrip Car Rentals Blog</title>
        <meta
          name="description"
          content={`${blog.blogName}. Read more on Spintrip Car Rentals' blog for insights and tips on car rentals and travel experiences in Bangalore.`}
        />
        <meta
          name="keywords"
          content={`Spintrip Car Rentals blog, ${blog.blogName}, car rental tips, travel experiences Bangalore, car rental insights, travel inspiration Bangalore`}
        />
      </Helmet>

      {/* Breadscrumb Section */}
      <div
        className="blogbanner"
        style={{
          backgroundImage: `url(${blog.blogImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "80px",
        }}
      >
        <div className="blogbanner-content">
          {blog.keywords.split(",").map((keyword, index) => (
            <span key={index} className="blog-hint mx-2">
              {" "}
              {keyword}
            </span>
          ))}
          <h1>{blog.blogName}</h1>
          <ul className="entry-meta meta-item justify-content-center">
            <li>
              <div className="post-author">
                <div className="post-author-img  d-flex align-items-center justify-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <Link to="#">
                  <span> {blog.blogAuthor} </span>
                </Link>
              </div>
            </li>
            <li className="date-icon">
              <i className="fa-solid fa-calendar-days" />{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </li>
          </ul>
        </div>
      </div>
      {/* /Breadscrumb Section */}
      {/* Blog Grid*/}
      <div className="blog-section">
        <div className="container">
           <div
            className="blog-description"
            dangerouslySetInnerHTML={{
              __html: blog.description,
            }}
          />

          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="bloginner-img">
                <img
                  src={blog.blogImage1}
                  alt={blog.blogName}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="bloginner-img">
                <img
                  src={blog.blogImage2}
                  alt={blog.blogName}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          {/* <div className="share-postsection">
            <div className="row">
              <div className="col-lg-4">
                <div className="sharelink d-flex align-items-center">
                  <Link to="#" className="share-img">
                    <i className="feather icon-share-2" />
                  </Link>
                  <Link to="#" className="share-text">
                    Share
                  </Link>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="tag-list">
                  <ul className="tags">
                    <li>Rims </li>
                    <li>Speed </li>
                    <li>Make </li>
                    <li>Transmission </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="review-sec mb-0">
            <div className="review-header">
              <h4>
                Reviews<span>(2)</span>
              </h4>
              <div className="reviewbox-list-rating">
                <p>
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <span> (5 out of 5)</span>
                </p>
              </div>
            </div>
            <div className="review-card">
              <div className="review-header-group">
                <div className="review-widget-header">
                  <span className="review-widget-img">
                    <ImageWithBasePath
                      src="assets/img/profiles/avatar-01.jpg"
                      className="img-fluid"
                      alt="Blog"
                    />
                  </span>
                  <div className="review-design">
                    <h6>Johnson</h6>
                    <p>02 Jan 2023</p>
                  </div>
                </div>
                <div className="reviewbox-list-rating">
                  <p>
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <span> (5 out of 5)</span>
                  </p>
                </div>
              </div>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.It was popularised in the 1960s{" "}
              </p>
            </div>
            <div className="review-card">
              <div className="review-header-group">
                <div className="review-widget-header">
                  <span className="review-widget-img">
                    <ImageWithBasePath
                      src="assets/img/profiles/avatar-02.jpg"
                      className="img-fluid"
                      alt="Blog"
                    />
                  </span>
                  <div className="review-design">
                    <h6>Casandra</h6>
                    <p>02 Jan 2023</p>
                  </div>
                </div>
                <div className="reviewbox-list-rating">
                  <p>
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <span> (5 out of 5)</span>
                  </p>
                </div>
              </div>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.It was popularised in the 1960s{" "}
              </p>
            </div>
          </div>
          <div className="review-sec mb-0">
            <div className="review-header">
              <h4>Leave a Reply</h4>
            </div>
            <div className="card-body">
              <div className="review-list">
                <ul>
                  <li className="review-box feedbackbox mb-0">
                    <div className="review-details">
                      <form className="#">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="input-block">
                              <label>
                                Full Name <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-block">
                              <label>
                                Email Address{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input type="email" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="input-block">
                              <label>Comments </label>
                              <textarea
                                rows={4}
                                className="form-control"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="submit-section">
                          <button
                            className="btn btn-primary submit-review mt-3"
                            type="submit"
                          >
                            {" "}
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* /Blog Grid*/}
    </div>
  );
};

export default BlogDetails;
