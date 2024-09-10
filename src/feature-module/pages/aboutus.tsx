import React, { Suspense, useEffect, useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumbs from "../common/Breadcrumbs";
import Aos from "aos";
import faqData from "../../core/data/json/faq";
import useScrollToTop from "../../hooks/useScrollToTop";

import NotificationBar from "../common/notificationBar";
/* eslint-disable react/no-unescaped-entities */
import { getTopReviews } from "../api/Listing";
import TestimonySlider from "../common/TestimonySlider";

interface Testimonial {
  carId: string;
  userName: string;
  rating: number;
  comment: string;
}

const AboutUs = () => {
  useScrollToTop();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number | null) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  // };

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const testimonialsData = await getTopReviews();

      setTestimonials(
        testimonialsData.feedback ? testimonialsData.feedback : [],
      );
      setTestimonialsLoading(false);
    };
    fetchReviews();
  }, []);

  return (
    <div className="main-wrapper">
      <>
        {/* Breadscrumb Section */}
        <Breadcrumbs title="About Us" maintitle={undefined} subtitle={""} />
        <NotificationBar />
        {/* /Breadscrumb Section */}
        {/* About */}
        <section className="section about-sec">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6" data-aos="fade-down">
                <div className="about-img">
                  
                  <div className="abt-img">
                    <ImageWithBasePath
                      src="assets/img/pic1.png"
                      className="img-fluid"
                      alt="About us"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6" data-aos="fade-down">
                <div className="about-content">
                  <h6>ABOUT OUR COMPANY</h6>
                  <h3 className="font-bold mb-3">
                    Spintrip Car Rentals: Best Solution For Your Travel Needs
                  </h3>
                  <p>
                    At Spintrip Car Rentals, we pride ourselves on providing
                    top-notch car rental services that cater to all your travel
                    needs. Our extensive fleet of vehicles ensures that you have the
                    perfect car for any occasion, whether it's a business trip,
                    family vacation, or a special event.
                  </p>
                  <p>
                    Our mission is to make your rental experience smooth and
                    hassle-free. We offer competitive rates, flexible rental
                    periods, and convenient pick-up and drop-off locations. Our
                    dedicated team is always ready to assist you with any
                    questions or special requests to ensure your journey is as
                    comfortable and enjoyable as possible.
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li>Wide range of vehicles to choose</li>
                        <li>Easy and fast booking process</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li>24/7 customer support</li>
                        <li>Flexible rental options</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /About */}
        <div className="row my-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <ImageWithBasePath
            src="assets/img/android-phone-mockup.png"
            className="phone-prototype-image"
            alt="Download app"
          />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column px-5 align-items-center justify-content-center">
          <h2 className="coming-soon text-center">
            Get the Spintrip Android App!
          </h2>
          <p className="text-center mt-3">
            Experience the convenience of booking and managing your car rentals
            with just a few taps.
          </p>
          <p className="text-center mt-1">
            Stay ahead with real-time updates, notifications, and more – all in
            one place.
          </p>
          <div className="my-4 d-flex">
          <a
            href="/spintrip-app.apk"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="max-w-[200px] object-fit-cover cursor-pointer"
            >
            <ImageWithBasePath
                src="assets/img/download-apk.svg"
                className="img-fluid"
                alt="Download app"
            />
            </a>

          </div>
        </div>

       
      </div>
        {/* services */}
        <section className="section services bg-light-primary">
          <div className="service-right">
            <ImageWithBasePath
              src="assets/img/bg/service-right.svg"
              className="img-fluid"
              alt="services right"
            />
          </div>
          <div className="container">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2>How It Works</h2>
              <p>
                At Spintrip Car Rentals, renting a car is as easy as 1-2-3.
                Here’s how it works:
              </p>
            </div>
            {/* /Heading title */}
            <div className="services-work">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-12" data-aos="fade-down">
                  <div className="services-group">
                    <div className="services-icon border-secondary">
                      <ImageWithBasePath
                        className="icon-img bg-secondary"
                        src="assets/img/icons/services-icon-01.svg"
                        alt="Choose Locations"
                      />
                    </div>
                    <div className="services-content">
                      <h3>1. Choose Locations</h3>
                      <p>
                        Select the location where you want to pick up your
                        rental car. We offer numerous pick-up points for your
                        convenience.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12" data-aos="fade-down">
                  <div className="services-group">
                    <div className="services-icon border-warning">
                      <ImageWithBasePath
                        className="icon-img bg-warning"
                        src="assets/img/icons/services-icon-01.svg"
                        alt="Choose Locations"
                      />
                    </div>
                    <div className="services-content">
                      <h3>2. Pick-Up Locations</h3>
                      <p>
                        Once you’ve chosen your location, pick up your car at
                        the designated spot. Our team will ensure a smooth
                        handover.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12" data-aos="fade-down">
                  <div className="services-group">
                    <div className="services-icon border-dark">
                      <ImageWithBasePath
                        className="icon-img bg-dark"
                        src="assets/img/icons/services-icon-01.svg"
                        alt="Choose Locations"
                      />
                    </div>
                    <div className="services-content">
                      <h3>3. Book your Car</h3>
                      <p>
                        Book your preferred car online or through our app. Enjoy
                        your drive with the assurance of Spintrip's quality and
                        reliability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /services */}

        {/* Why Choose Us */}
        <section className="section why-choose">
          <div className="choose-left">
            <ImageWithBasePath
              src="assets/img/bg/choose-left.png"
              className="img-fluid"
              alt="Why Choose Us"
            />
          </div>
          <div className="container">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2>Why Choose Us</h2>
              <p>
                Discover the unique benefits of choosing Spintrip Car Rentals
                for your next journey.
              </p>
            </div>
            {/* /Heading title */}
            <div className="why-choose-group">
              <div className="row">
                <div
                  className="col-lg-4 col-md-6 col-12 d-flex"
                  data-aos="fade-down"
                >
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="choose-img choose-black">
                        <ImageWithBasePath
                          src="assets/img/icons/bx-user-check.svg"
                          alt=""
                        />
                      </div>
                      <div className="choose-content">
                        <h4>Personalized Service</h4>
                        <p>
                          We provide personalized service to ensure your rental
                          experience is seamless and tailored to your needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6 col-12 d-flex"
                  data-aos="fade-down"
                >
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="choose-img choose-secondary">
                        <ImageWithBasePath
                          src="assets/img/icons/bx-user-check.svg"
                          alt=""
                        />
                      </div>
                      <div className="choose-content">
                        <h4>Convenient Locations</h4>
                        <p>
                          Our pick-up and drop-off locations are strategically
                          placed for your convenience, making your travel
                          hassle-free.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6 col-12 d-flex"
                  data-aos="fade-down"
                >
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="choose-img choose-primary">
                        <ImageWithBasePath
                          src="assets/img/icons/bx-user-check.svg"
                          alt=""
                        />
                      </div>
                      <div className="choose-content">
                        <h4>Exceptional Value</h4>
                        <p>
                          Enjoy competitive rates and exceptional value with
                          Spintrip Car Rentals, ensuring you get the best deal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Why Choose Us */}
        {/* About us Testimonials */}
        <section className="section about-testimonial testimonials-section">
          <div className="container">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2 className="title text-white">What People say about us? </h2>
              <p className="description text-white">
                Our customers love us! Here are some of the things they have to
                say about their experiences with Spintrip Car Rentals.
              </p>
            </div>
            {/* /Heading title */}
            <div className="row owl-theme">
            {testimonialsLoading ? (
              <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                <p>Loading...</p>
              </div>
            ) : !testimonials || testimonials.length === 0 ? (
              <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                <div>
                  <h3>No Reviews available</h3>
                </div>
              </div>
            ) : (
              <Suspense fallback={<div>Loading testimonials...</div>}>
                <TestimonySlider testimonials={testimonials} />
            </Suspense>
            )}
          </div>
          </div>
        </section>
        {/* About us Testimonials */}
        <>
          {/* FAQ  */}
          <section className="section faq-section bg-light-primary">
            <div className="container">
              <div className="section-heading" data-aos="fade-down">
                <h2>Frequently Asked Questions</h2>
                <p>
                  Have questions? We have answers to the most frequently asked
                  questions about our car rental services.
                </p>
              </div>
              <div className="faq-info">
                {faqData.map((faq, index) => (
                  <div className="faq-card bg-white" key={index}>
                    <h4 className="faq-title">
                      <button
                        className="btn btn-link"
                        onClick={() => toggleFAQ(index)}
                      >
                        {faq.question}
                      </button>
                    </h4>
                    <div
                      className={`faq-answer ${activeIndex === index ? "show" : ""}`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* /FAQ */}
        </>
      </>
    </div>
  );
};

export default AboutUs;
