import React, { useEffect, useState } from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import AOS from "aos";
import "aos/dist/aos.css";
//import { useSelector } from "react-redux";
import { ContactUs } from "../../core/data/interface/interface";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
// import axios from "axios";
import NotificationBar from "../common/notificationBar";
import data from "../../core/data/json/contactus_data";
import emailjs from "@emailjs/browser";
// import { Error, Spinner } from "@material-tailwind/react";
import {
  contact_us_email_service_id,
  contact_us_email_template_id,
  contact_us_email_user_id,
} from "../../environment";
import { Helmet } from "react-helmet";
const Contact = () => {
  const token = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comments: "",
  });
  // const [openSuccess, setOpenSuccess] = React.useState(false);
  const [loading, setLoading] = useState(false);
  // const [openError, setOpenError] = React.useState(false);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setLoading(true);
    // Your EmailJS service ID, template ID, and user ID
    emailjs
      .send(
        contact_us_email_service_id,
        contact_us_email_template_id,
        formData,
        contact_us_email_user_id,
      )
      .then(() => {
        setLoading(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          comments: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setLoading(false);
      });
  };
  // function classNames(...classes) {
  //     return classes.filter(Boolean).join(' ')
  //   }

  return (
    <div>
      <Helmet>
        <title>Contact Us | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Contact Spintrip Car Rentals for affordable self-drive car rentals in Bangalore. Our support team is here to assist you with bookings, listings, and any inquiries you may have."
        />
        <meta
          name="keywords"
          content="contact Spintrip Car Rentals, self-drive car rentals Bangalore, car rental support Bangalore, car rental inquiries, car rental bookings, car listing assistance"
        />
      </Helmet>

      <div className="main-wrapper">
        <NotificationBar />
        <Breadcrumbs
          maintitle="Contact us"
          title="Contact us"
          subtitle="Pages"
        />
        <section className="contact-section">
          <div className="container">
            <div className="contact-info-area ">
              <div className="row ">
                {data.map((info: ContactUs, index: number) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-12 d-flex"
                    data-aos="fade-down"
                    data-aos-duration={1200}
                    data-aos-delay="0.1"
                  >
                    <div className="single-contact-info flex-fill border">
                      <span>
                        <i className={info.icon} />
                      </span>
                      <h3>{info.title}</h3>
                      {info.type === "phone" ? (
                        <Link to={info.link} className="font-mono">
                          {info.text}
                        </Link>
                      ) : (
                        <p>
                          <Link to={info.link}>{info.text}</Link>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="form-info-area border"
              data-aos="fade-down"
              data-aos-duration={500}
              data-aos-delay="0.5"
            >
              <div className="row  bg-white d-flex d-flex align-items-center justify-content-center">
                <div className="col-lg-6 d-flex d-flex align-items-center justify-content-center rounded">
                  <ImageWithBasePath
                    src="assets/img/contact-main.png"
                    className="contact-image"
                    alt="Contact"
                  />
                </div>
                <div className="col-lg-6 rounded p-2">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <h2 className="font-semibold mb-5">Get in touch!</h2>
                      <div className="col-md-12">
                        <div className="input-block">
                          <label>
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control border border-2"
                            placeholder="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input-block">
                          <label>
                            Email Address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control border border-2 font-mono"
                            placeholder="your_email@gmail.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={!token}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input-block">
                          <label>
                            Phone number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control border border-2 font-mono"
                            placeholder="+91"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input-block">
                          <label>
                            Comments <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control border border-2"
                            rows={4}
                            placeholder="Please tell us your query.."
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                      <button
                        type="submit"
                        disabled={!token}
                        className="contact-button"
                      >
                        {loading ? (
                          <> Processing</>
                        ) : (
                          // eslint-disable-next-line react/no-unescaped-entities
                          <>Let's talk</>
                        )}
                      </button>
                    </div>

                    {/* <div className="flex  max-w-screen items-center justify-center w-content flex-col fixed bottom-5 right-0 md:right-5 z-999">

            <Alert open={openError} onClose={() => setOpenError(false)} className="bg-amber-500 hover:opacity-90">
              <div className='w-full flex items-center justify-center mb-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              </div>
              <div>We encountered an error while sending your email.</div>
               
            </Alert>
            <Alert color="green" open={openSuccess} onClose={() => setOpenSuccess(false)} className='bg-green-500'>
              <div>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

              </div>
              <div>
              </div>Email sent! We will reach back to you soon.</Alert>
            </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
          {!token && (
            <div className="alert error-login-message mt-2" role="alert">
              <div
                className="p-2 location-alert shadow bg-amber-800 items-center text-amber-100 leading-none rounded-full flex lg:inline-flex"
                role="alert"
              >
                <span className="flex rounded-full bg-amber-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                  Info
                </span>
                <span className="font-semibold mr-2 text-left flex-auto">
                  Login to continue
                </span>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Contact;
