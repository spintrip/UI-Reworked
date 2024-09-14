import React, { useState, useEffect } from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import { getBlogs } from "../api/Blogs";
import { Helmet } from "react-helmet";
import useScrollToTop from "../../hooks/useScrollToTop";

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

const route = all_routes;

const getUniqueKeywords = (blogs: any[]) => {
  const keywordsSet = new Set();
  blogs.forEach((blog) => {
    blog.keywords.split(",").forEach((keyword: string) => {
      keywordsSet.add(keyword.trim());
    });
  });
  return Array.from(keywordsSet);
};

const BlogList = () => {
  useScrollToTop();
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleKeywordCount, setVisibleKeywordCount] = useState(7);
  const allKeywords = getUniqueKeywords(blogs);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const truncateHTML = (html: string, wordLimit: number ) => {
    const div = document.createElement('div');
    div.innerHTML = html;
  
    const text = div.textContent || div.innerText || "";
    const words = text.split(/\s+/);
  
    if (words.length > wordLimit) {
      const truncatedText = words.slice(0, wordLimit).join(' ') + '...';
  
      // Find the first occurrence of the truncated text within the original HTML.
      const index = text.indexOf(truncatedText);
      const truncatedHTML = html.slice(0, index + truncatedText.length) + '...';
  
      return truncatedHTML;
    }
  
    return html;
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase().replace(/\s+/g, ""));
  };
  

  const filteredBlogs = blogs
  .filter((blog) =>
    blog.keywords.toLowerCase().replace(/\s+/g, "").includes(searchTerm)
  )
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleTagClick = (keyword) => {
    setSearchTerm(keyword.toLowerCase().replace(/\s+/g, ""));
  };

  const showMoreKeywords = () => {
    setVisibleKeywordCount(visibleKeywordCount + 10);
  };

  
  

  return (
    <div className="main-wrapper">
      <Helmet>
    <title>Blog | Spintrip Car Rentals</title>
    <meta
      name="description"
      content="Explore the latest insights, tips, and stories related to self-drive car rentals, road trips, and vehicle maintenance on the Spintrip Car Rentals blog. Stay informed with expert advice and updates from the car rental industry."
    />
    <meta
      name="keywords"
      content="Spintrip Car Rentals, car rental blog, self-drive tips, road trip advice, vehicle maintenance, car rental industry updates, Spintrip insights, car rental tips, Spintrip stories, car hire blog"
    />
  </Helmet>
      <Breadcrumbs maintitle="Blog List" title="Blog List" subtitle="Blogs" />
      <div className="blog-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {loading ? (
                  <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                    <p>Loading...</p>
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                    <div>
                      {/* Place your image inside this div */}
                      <h3>No blogs available</h3>
                    </div>
                  </div>
                ) : (
                  filteredBlogs.map((blog) => (
                    <div
                      className="col-lg-12 col-md-12 d-lg-flex"
                      key={blog.blogId}
                    >
                      <div className="blog grid-blog">
                        <div className="blog-image-list">
                          <Link to={`${route.blogdetails}${blog.blogId}`}>
                            <img
                              className="img-fluid blogList-image w-full h-[200px] object-fit-cover"
                              src={blog.blogImage1}
                              alt={blog.blogName}
                            />
                          </Link>
                        </div>
                        <div className="blog-content">
                          <div className="blog-list-date d-flex flex-column align-item-start justify-contents-start">
                            <div>
                            <ul className="meta-item-list">
                              <li>
                                <div className="post-author">
                                  <div className="post-author-img">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                      />
                                    </svg>
                                  </div>
                                  <Link to="#">
                                    <span className="font-semibold">
                                      {blog.blogAuthor}
                                    </span>
                                  </Link>
                                </div>
                              </li>
                              <li className="date-icon ms-3">
                                <i className="fa-solid fa-calendar-days" />
                                <span>
                                  {new Date(
                                    blog.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                              </li>
                            </ul>
                            </div>
                            <div>
                            <p className="blog-category mt-3">
                              {blog.keywords
                                .split(",")
                                .map((keyword, index) => (
                                  <Link to="" key={index} className="me-1 ">
                                    <span>{keyword.trim()}</span>
                                  </Link>
                                ))}
                            </p>
                            </div>
                          </div>
                          <h3 className="blog-title">
                            <Link to={`${route.blogdetails}${blog.blogId}`}>
                              {blog.blogName}
                            </Link>
                          </h3>
                          {/* Render HTML safely */}
                          <div
                            className="blog-description"
                            dangerouslySetInnerHTML={{
                              __html: truncateHTML(blog.description, 100),
                            }}
                          />
                          <Link
                            to={`${route.blogdetails}${blog.blogId}`}
                            className="viewlink btn btn-primary justify-content-center"
                          >
                            Read More{" "}
                            <i className="feather icon-arrow-right ms-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
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
                      Search Keywords
                    </h4>
                    <div className="filter-content looking-input input-block mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by keywords"
                      value={searchTerm}
                      onChange={handleSearch}
                    />

                    </div>
                  </div>
                  {/* <div className="card">
                    <h4>
                      <ImageWithBasePath
                        src="assets/img/icons/category-icon.svg"
                        alt="details-icon"
                      />{" "}
                      Categories
                    </h4>
                    <ul className="blogcategories-list">
                      <li>
                        <Link to={route.listinggrid}>SUV Cars</Link>
                      </li>
                      <li>
                        <Link to={route.listinggrid}>Sedan Cars</Link>
                      </li>
                      <li>
                        <Link to={route.listinggrid}>MUV Cars</Link>
                      </li>
                      <li>
                        <Link to={route.listinggrid}>Hatchback Cars</Link>
                      </li>
                    </ul>
                  </div> */}
                  <div className="card tags-widget">
      <h4>
        <i className="feather icon-tag" /> Tags
      </h4>
      <ul className="tags">
        {allKeywords.slice(0, visibleKeywordCount).map((keyword : any, index) => (
          <li key={index} onClick={() => handleTagClick(keyword)}>
            {keyword}
          </li>
        ))}
      </ul>
      {visibleKeywordCount < allKeywords.length && (
        <button onClick={showMoreKeywords} className="show-tag btn btn-link">
          Show More
        </button>
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

export default BlogList;
