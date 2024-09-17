import React, { useState } from "react";
import { Link } from "react-router-dom";
//import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import { Mail, PhoneCall } from "react-feather";

const Footer = () => {
  const [host] = useState(localStorage.getItem("Host"));
  const token = localStorage.getItem("authToken");
  const route = all_routes;
  return (
    <>
      {/* Footer */}
      <div className="footer">
        {/* Footer Top */}
        <div className="footer-top aos" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    {/* Footer Widget */}
                    <div className="footer-widget footer-menu">
                      <h5 className="footer-title">About Company</h5>
                      <ul>
                        <li>
                          <Link to={route.aboutus}>Our Company</Link>
                        </li>
                        <li>
                          <Link to="https://spintrip.in" target="_blank">
                            Spintrip India
                          </Link>
                        </li>
                        {/* <li>
                          <Link to="#">
                            FAQ
                          </Link>
                        </li> */}
                        <li>
                          <Link to={route.privacypolicy}>Privacy Policy</Link>
                        </li>
                        
                        <li>
                          
                          {host !='0' ? (
                           <Link to={route.hostprivacypolicy}>
                              Host Privacy Policy
                            </Link>
                          ) : (
                            <></>
                          )}
                        </li>
                        <li>
                          <Link to={route.feepolicy}>Fee Policy</Link>
                        </li>
                        <li>
                          <Link to={route.termsconditions}>
                            Terms and Conditions
                          </Link>
                        </li>
                        {/* <li>
                          <Link to="#">
                            Cookie Policy
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                    {/* /Footer Widget */}
                  </div>
                  <div className="col-lg-4 col-md-6">
                    {/* Footer Widget */}
                    <div className="footer-widget footer-menu">
                      <h5 className="footer-title">Quick links</h5>
                      <ul>
                        <li>
                            <Link
                              to= {route.bloglist}
                            >
                             Our Blogs
                            </Link>
                          
                        </li>
                        {/* <li>
                          <Link to="#">Champaigns</Link>
                        </li>
                        
                        <li>
                          <Link to="#">
                            Spintrip Insurance
                          </Link>
                        </li>
                        <li>
                          <Link to="#">Spintrip Care</Link>
                        </li>
                        <li>
                          <Link to="#">Blog</Link>
                        </li>
                        <li>
                          <Link to="#">Careers</Link>
                        </li> */}
                      </ul>
                    </div>
                    {/* /Footer Widget */}
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="footer-contact footer-widget">
                  <h5 className="footer-title">Contact Info</h5>

                  <div className="footer-contact-info">
                    <div className="footer-address">
                      <span>
                        <PhoneCall />
                      </span>
                      <div className="addr-info">
                        <Link className="font-mono" to="tel:+91 9071003156">
                          +91 9071003156
                        </Link>
                      </div>
                    </div>
                    <div className="footer-address">
                      <span>
                        <Mail />
                      </span>
                      <div className="addr-info">
                        <Link to="mailto:Info@spintrip.in">
                          Info@spintrip.in
                        </Link>
                      </div>
                    </div>

                    {/* <div className="update-form">
                      
                      <form action="#">
                        <span>
                          <Mail/>
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter You Email Here"
                        />
                        <button type="submit" className="btn btn-subscribe">
                          <span>
                            <Send />
                          </span>
                        </button>
                      </form>
                      
                    </div> */}
                    {/* <p className="text-white mt-1">Subscribe to our Newsletter</p> */}
                  </div>
                  <div className="footer-social-widget">
                    <h6>Connect with us</h6>
                    <ul className="nav-social">
                      <li>
                        <a
                          href="https://www.facebook.com/people/SpinTrip-Community/61559827201988/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-facebook-f fa-facebook fi-icon"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/spintrip.community/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-instagram fi-icon" />
                        </a>
                      </li>
                      {/* <li>
          <a href="" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-x-twitter fi-icon"></i>
          </a>
        </li> */}
                      <li>
                        <a
                          href="https://www.linkedin.com/company/spintrip/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-linkedin fi-icon" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Footer Top */}
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            {/* Copyright */}
            <div className="copyright">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="copyright-text">
                    <p>© 2024 Spintrip Car Rentals. All Rights Reserved.</p>
                    <p>Made with ❤️ in India.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Copyright Menu */}
                  <div className="copyright-menu"></div>
                  {/* /Copyright Menu */}
                </div>
              </div>
            </div>
            {/* /Copyright */}
          </div>
        </div>
        {/* /Footer Bottom */}
      </div>
      {/* /Footer */}
    </>
  );
};

export default Footer;
