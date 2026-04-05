import React, { Suspense, useEffect, useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { androidAppLink } from "../../environment";

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
        <section className="section bg-white-reset about-sec overflow-hidden">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6" data-aos="fade-down">
                <div className="about-img">
                  
                  <div className="abt-img relative">
                    <ImageWithBasePath
                      src="assets/img/pic1.png"
                      className="img-fluid rounded-4xl shadow-2xl"
                      alt="About us"
                      style={{ borderRadius: '32px' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6" data-aos="fade-left">
                <div className="about-content">
                  <div className="spintrip-premium-heading text-left" style={{ textAlign: 'left', marginBottom: '32px' }}>
                    <h6 className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-4">ABOUT OUR COMPANY</h6>
                    <h2 style={{ textAlign: 'left', fontSize: '2.5rem' }}>
                      Best Solution For Your Travel Needs
                    </h2>
                  </div>
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
        
        {/* App Download Section: Production Hardening */}
        <section className="section bg-slate-reset overflow-hidden border-y border-slate-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center" data-aos="fade-right">
                <ImageWithBasePath
                  src="assets/img/android-phone-mockup.png"
                  className="phone-prototype-image hover:scale-105 transition-transform duration-700"
                  alt="Download app"
                />
              </div>
              <div className="col-lg-6 col-md-12 px-lg-5" data-aos="fade-left">
                <div className="spintrip-premium-heading text-left" style={{ textAlign: 'left' }}>
                  <h2 style={{ textAlign: 'left' }}>Get the Spintrip Android App</h2>
                  <p style={{ marginLeft: '0', maxWidth: '100%' }}>
                    Experience the convenience of booking and managing your car rentals
                    with just a few taps. Stay ahead with real-time updates and notifications.
                  </p>
                </div>
                <div className="my-8 flex flex-wrap justify-start gap-4">
                  <a href={androidAppLink} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                    <ImageWithBasePath
                        src="assets/img/download-apk.svg"
                        className="img-fluid shadow-lg rounded-xl"
                        alt="Download app"
                        style={{ maxWidth: '220px' }}
                    />
                  </a>
                  <div className="opacity-40 grayscale cursor-not-allowed hidden md:block">
                    <ImageWithBasePath
                        src="assets/img/app-ios.svg"
                        className="img-fluid shadow-sm"
                        alt="App Store Coming Soon"
                        style={{ maxWidth: '220px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* services */}
        <section className="section bg-white-reset services">
          <div className="container">
            {/* Heading title*/}
            <div className="spintrip-premium-heading" data-aos="fade-down">
              <h2>How It Works</h2>
              <p>
                At Spintrip Car Rentals, renting a car is as easy as 1-2-3.
                Here’s the simple process:
              </p>
            </div>
            {/* /Heading title */}
            <div className="services-work">
              <div className="row g-8">
                {[
                  { id: "1", title: "Choose Location", desc: "Select the location where you want to pick up your rental car. We offer numerous pick-up points." },
                  { id: "2", title: "Pick-Up Spot", desc: "Once you’ve chosen your location, pick up your car at the designated spot. Smooth handover." },
                  { id: "3", title: "Book your Car", desc: "Book your preferred car online or through our app. Enjoy your drive with total reliability." }
                ].map((item, index) => (
                  <div className="col-lg-4 col-md-4 col-12" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="glass-panel p-10 text-center hover:translate-y-[-8px] transition-all duration-300">
                      <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-black">
                        {item.id}
                      </div>
                      <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* /services */}

        {/* Why Choose Us */}
        <section className="section bg-slate-reset why-choose">
          <div className="container">
            {/* Heading title*/}
            <div className="spintrip-premium-heading" data-aos="fade-down">
              <h2>Why Choose Us</h2>
              <p>Discover the unique benefits of choosing Spintrip Car Rentals for your next journey.</p>
            </div>
            {/* /Heading title */}
            <div className="why-choose-group">
              <div className="row g-8">
                {[
                  { title: "Personalized Service", desc: "Tailored rental experiences designed to meet your specific travel needs.", icon: "assets/img/icons/bx-user-check.svg" },
                  { title: "Convenient Locations", desc: "Strategically placed pick-up points across the city for total accessibility.", icon: "assets/img/icons/bx-user-check.svg" },
                  { title: "Exceptional Value", desc: "Competitive rates and transparent pricing ensuring the best deal every time.", icon: "assets/img/icons/bx-user-check.svg" }
                ].map((item, index) => (
                  <div className="col-lg-4 col-md-6 col-12 d-flex" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="glass-panel p-10 flex-fill hover:scale-105 transition-all duration-300 bg-white">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-8">
                        <ImageWithBasePath src={item.icon} alt={item.title} style={{ width: '32px' }} />
                      </div>
                      <h4 className="text-xl font-black mb-4">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* /Why Choose Us */}
        {/* About us Testimonials */}
        <section className="section about-testimonial testimonials-section">
          <div className="container">
            {/* Heading title*/}
            <div className="spintrip-premium-heading dark-section p-10 rounded-4xl" data-aos="fade-down">
              <h2 className="text-white-important">What People Say</h2>
              <p className="text-slate-300">
                Discover why thousands of travelers choose Spintrip for their luxury journeys and daily commutes.
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
              <div className="spintrip-premium-heading" data-aos="fade-down">
                <h2>Frequently Asked Questions</h2>
                <p>Have questions? We have answers to help you get started with your next journey.</p>
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
