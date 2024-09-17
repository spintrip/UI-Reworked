import React, { Suspense, useEffect, useState, useRef } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import useScrollToTop from "../../hooks/useScrollToTop";


const AboutCompany = () => {
  useScrollToTop();
  const SpintripEffect = useRef<HTMLDivElement>(null);
  const PhilosophyinPractice = useRef<HTMLDivElement>(null);
  const OurHistory = useRef<HTMLDivElement>(null);
  const ourleadership = useRef<HTMLDivElement>(null);
  const thespintripway = useRef<HTMLDivElement>(null);



  const scrollToSpintripEffect = () => {
    if (SpintripEffect.current) {
      SpintripEffect.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPhilosophyinPractice = () => {
    if (PhilosophyinPractice.current) {
      PhilosophyinPractice.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToOurHistory = () => {
    if (OurHistory.current) {
      OurHistory.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToOurleadership = () => {
    if (ourleadership.current) {
      ourleadership.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToSpintripWay = () => {
    if (thespintripway.current) {
      thespintripway.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [selectedTab, setSelectedTab] = useState('Seamless-Experience');

  const images: { [key: string]: string } = {
    'Seamless-Experience': '/assets/img/seamless-experience.jpg',
    'Advanced-Security': '/assets/img/car-security.jpg',
    'Dynamic-Pricing': '/assets/img/dynamic-pricing.jpg',
    'Verified-Quality': '/assets/img/verified.jpg',
    'Community-Driven': '/assets/img/community-driven.jpg',
  };


  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
  }, []);



  return (
    <div className="main-company">
      <>
        <section className="company-section">
            <div className="row align-items-center">
              <div className="col-lg-8" data-aos="fade-down">
                <div className="company-about-img">
                  <div className="abt-company-img">
                    <ImageWithBasePath
                      src="assets/img/zooo.jpg"
                      className="company-img"
                      alt="About us"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3" data-aos="fade-down">
                <div className="about-company-content">
                  <h6 className="font-weight-bold">Best Solution For Your Travel Needs</h6>
                  <p className="font-italic">
                  A top-tier car rental experience tailored to your needs—whether it's for business, a family getaway, or a special occasion.
                  </p>
                  <p>
                    Enjoy competitive rates, flexible options, and convenient services. Our dedicated team is ready to ensure a seamless, hassle-free journey every time.
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li>Wide vehicle selection</li>
                        <li>Quick & easy booking</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li>24/7 customer support</li>
                        <li>Flexible rentals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        </section>
        {/* /About */}
        <div className="row my-5">
          <div className="d-flex align-items-center justify-content-center">
          <h2 className="coming-soon text-center">
              Let's Go Places!
          </h2>
          </div>
          <div className=" d-flex flex-column px-5 mt-3 mb-5 align-items-center justify-content-center">
            <p className="text-center mb-2">
              Experience the convenience of booking and managing your car rentals
              with just a few taps.
            </p>
            <p className="text-center mt-1">
              Stay ahead with real-time updates, notifications, and more – all in
              one place.
            </p>
          </div>
          
          <div className="stickyNavFiller">
            <div id="spintrip-sticky-navbar">
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" onClick={scrollToSpintripEffect} title="Spintrip Effect">Spintrip Effect</a>
                <div className="vertical-line"></div>
              </div>
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" onClick={scrollToPhilosophyinPractice} title="Philosophy in Practice">Philosophy in Practice</a>
                <div className="vertical-line"></div>
              </div>
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" onClick={scrollToOurHistory} title="Our History">Our History</a>
                <div className="vertical-line"></div>
              </div>
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" onClick={scrollToOurleadership} title="Our Leadership">Our Leadership</a>
                <div className="vertical-line"></div>
              </div>
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" onClick={scrollToSpintripWay} title="The Spintrip Way">The Spintrip Way</a>
              </div>
            </div>
          </div>
        </div>
        {/* services */}
        <section ref={SpintripEffect} className="section company-services bg-light-secondary">
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
              <h2>The Spintrip Effect</h2>
            </div>
            {/* /Heading title */}
            <div className="services-work">
              <div className="row">
                <div className="col-lg-6 company-services-group"  data-aos="fade-right">
                      <ImageWithBasePath
                        className="icon-img"
                        src="assets/img/spintrip-effect.jpg"
                        alt="Choose Locations"
                      />
                </div>
                <div className="col-lg-5 d-flex align-items-center justify-content-between" data-aos="fade-left">
                  <div className="effect-group">
                    <div className="effect-content">
                      <h3 className="impact-heading">Our Impact in Action</h3>
                      <p className="impact-paragraph">
                      SpinTrip Car Rentals ensures a seamless, secure experience with AI-powered image tech, Indian-made GPS devices, and dynamic pricing. Our growing community and verified cars make it feel like driving your own vehicle, with personalized support included.                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr/>
        {/* /services */}
    

        {/* Why Choose Us */}
        <section ref={PhilosophyinPractice} className="section">
            <div className="section-heading" data-aos="fade-down">
              <h2>Philosophy in Practice</h2>
            </div>
            <div className="stickyNavFiller" data-aos="fade-up">
            <div id="spintrip-sticky-navbar">
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" href="#services-icon" title="Spintrip Effect"  onClick={()=> (setSelectedTab('Seamless-Experience'))}>Seamless Experience</a>
                <div className="vertical-line"></div>
              </div>
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" href="#philosophy-practice" title="Philosophy in Practice" onClick={()=> (setSelectedTab('Advanced-Security'))}>Advanced Security</a>
                <div className="vertical-line"></div>
              </div>
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" href="#our-history" title="Our History"  onClick={()=> (setSelectedTab('Dynamic-Pricing'))}>Dynamic Pricing</a>
                <div className="vertical-line"></div>
              </div>
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" href="#our-leadership" title="Our Leadership"  onClick={()=> (setSelectedTab('Verified-Quality'))}>Verified Quality</a>
                <div className="vertical-line"></div>
              </div>
              <div className="navItem-sticky">
                <a className="tmna-sticky-tabs-link" href="#spintrip-way" title="The Spintrip Way" onClick={()=> (setSelectedTab('Community-Driven'))}>Community-Driven</a>
              </div>
            </div>
            <div className="spintrip-image-container">
              <img className="philosophy-image" src={images[selectedTab]} alt={selectedTab} />
              <div className="philosophy-content">
                <h4> Our Purpose: </h4>
                <div className="purpose-para"> At SpinTrip Car Rentals provides a seamless, secure, and community-driven car rental experience. We aim to empower users with flexible, affordable options while ensuring safety through advanced technology and verified, reliable vehicles.</div>
              </div>
            </div>
          </div>
        </section>
        {/* /Why Choose Us */}
        {/* About us Testimonials */}
        <section ref={OurHistory} className="section company-services ">
          <div className="container ">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2>Our History</h2>
            </div>
            {/* /Heading title */}
            <div className="services-work">
              <div className="row">
                <div className="col-lg-6 d-flex align-items-center justify-content-between" data-aos="fade-right">
                  <div className="effect-group">
                    <div className="effect-content">
                      <h3 className="history-heading">Past Milestones and Future Horizons</h3>
                      <p className="history-paragraph">
                        SpinTrip Car Rentals began as a vision to revolutionize
                        car rentals by blending technology and convenience. We started with a few hosts and users, focusing on delivering a seamless experience with AI-driven security and dynamic pricing. Since then, we've evolved into a trusted platform with a vibrant community. Our Indian-made GPS devices, AI-based image technology, and thoroughly verified cars have built our reputation for safety and reliability. Looking ahead, we are committed to expanding our community, enhancing our technology, and making SpinTrip the premier car rental platform, with advanced features and continuous improvements to ensure it feels like driving your own car.           
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 company-services-group"  data-aos="fade-left">
                      <ImageWithBasePath
                        className="icon-img"
                        src="assets/img/spintrip-effect.jpg"
                        alt="Choose Locations"
                      />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About us Testimonials */}
        <section ref={ourleadership} className="leadership-section">
          <div className="section-heading" data-aos="fade-down">
            <h2>Our Leadership</h2>
          </div>
          <div className="leadership-row">
            {/* CEO */}
            <div className="leadership-profile">
              <h4>CEO</h4>
              <div className="leadership-img-profile" data-aos="fade-down">
              <ImageWithBasePath
                  className="leadership-img"
                  src="assets/img/ceo.jpg"
                  alt="Choose Locations"
                />
              </div>
              <div className="leadership-name">
                <h4>Pranjal Saxena</h4>
              </div>
              <div className="leadership-story">
                <p>Our CEO leads SpinTrip with a vision to revolutionize car rentals by blending cutting-edge technology and customer-centric services.</p>
              </div>
            </div>
            
            {/* CTO */}
            <div className="leadership-profile">
              <h4>CTO</h4>
              <div className="leadership-img-profile" data-aos="fade-down">
                <ImageWithBasePath
                  src="assets/img/cto.jpg"
                  className="leadership-img"
                  alt="CTO"
                />
              </div>
              <div className="leadership-name">
                <h4>Saswat Pandey</h4>
              </div>
              <div className="leadership-story">
                <p>Our CTO spearheads innovation at SpinTrip, ensuring that our platform remains technologically advanced and user-friendly.</p>
              </div>
            </div>

            {/* CSO */}
            <div className="leadership-profile">
              <h4>CSO</h4>
              <div className="leadership-img-profile" data-aos="fade-down">
              <ImageWithBasePath
                  className="leadership-img"
                  src="assets/img/cso.jpg"
                  alt="Choose Locations"
                />
              </div>
              <div className="leadership-name">
                <h4>Pratyay Mazumdar</h4>
              </div>
              <div className="leadership-story">
                <p>Our CSO focuses on strategic growth, building partnerships, and expanding SpinTrip's reach in the car rental industry.</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={thespintripway} className="section way-effect bg-light-secondary">
          <div className="container">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2>The Spintrip Way</h2>
            </div>
            {/* /Heading title */}
            <div className="way-effect-work">
              <div className="row">
                <div className="col-lg-6 d-flex align-items-center justify-content-between" data-aos="fade-left">
                  <div className="effect-group">
                    <div className="effect-content">
                      <h3 className="impact-heading">The Way we work</h3>
                      <p className="impact-paragraph">
                        The SpinTrip Way
                        We focus on creating a superior car rental experience by prioritizing both hosts and users.
                        Unlike others, we ensure a smooth, personalized process, offering top-notch support and flexibility.
                        Our goal is to make every rental feel effortless, ensuring satisfaction for hosts and drivers alike, while
                        building a trusted and growing community.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 company-services-group"  data-aos="fade-left">
                  <ImageWithBasePath
                    src="assets/img/teamwork.jpg"
                    className="icon-img"
                    alt="services right"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default AboutCompany;
