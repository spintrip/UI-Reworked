import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useScrollToTop from "../../../hooks/useScrollToTop";

const TermsCondition: React.FC = () => {
  useScrollToTop();
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <div className="main-wrapper">
      <div className="policy-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="terms-policy mt-5">
              ```
            <h1 className="text-black mt-2 mb-5" style={{fontSize:'32px', fontWeight:'700'}} data-aos="fade-down">
              Spintrip Car Rentals Pvt Ltd Policies for Dealers and Customers
            </h1>
            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Privacy Policy
            </h2>
            <p data-aos="fade-down">
              Welcome to Spintrip Dealer Services (&ldquo;Spintrip Dealer Services&rdquo;) located at <a href="https://www.spintrip.in">www.Spintrip.in</a> (the &ldquo;Site&rdquo;) and the mobile application (the &ldquo;App&rdquo;). The Site and App (each the &ldquo;Platform&rdquo;) are owned and operated by Spintrip Car Rentals Pvt Ltd, a company incorporated under the Companies Act 1956, having its corporate office at 001 Hemanth Govind Apartments, BEML Layout, ITPL Main Road, Bangalore, Karnataka-560037 (also referred to as &ldquo;Spintrip&rdquo;, &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). All access and use of the Platform and the services thereon are governed by our general Platform terms (the &ldquo;General Terms&rdquo;), privacy policy available at <a href="https://www.spintrip.in/policy#privacy">Privacy Policy</a> (the &ldquo;Privacy Policy&rdquo;), fee policy (&ldquo;Fee Policy&rdquo;), and service-specific terms.
            </p>
            <p data-aos="fade-down">
              These Terms of Service, including specific terms and conditions applicable to the Dealers and Customers and Add-on Services (this &ldquo;Agreement&rdquo;/&ldquo;Dealer Policy&rdquo;) read together with the Privacy Policy, Fee Policy, and other applicable policies (&ldquo;Governing Policies&rdquo;), collectively create the legally binding terms and conditions on which Spintrip offers to you or the entity you represent (&ldquo;you,&rdquo; &ldquo;User&rdquo; or &ldquo;your&rdquo;) the Spintrip Dealer Services, including your access and use of Spintrip Dealer Services.
            </p>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Spintrip&rsquo;s Role
            </h2>
            <p data-aos="fade-down">
              Spintrip Dealer Services is a software marketplace platform that facilitates automotive rental dealers (&ldquo;Dealers&rdquo;) in connecting with customers (&ldquo;Customers&rdquo;) to lease vehicles. Spintrip operates as a software-as-a-service (SaaS) company and does not own, manage, lease, or control any vehicles. We solely provide a platform to enhance your business and connect you with potential customers.
            </p>
            <p data-aos="fade-down">
              All legal, regulatory, and compliance obligations concerning vehicles listed on the Platform, including but not limited to ownership, insurance, registration, maintenance, and operational standards, are the sole responsibility of the Dealers. Spintrip disclaims all liability for any damages, theft, or misuse of vehicles during customer rentals. Dealers may opt for Spintrip&rsquo;s security devices to assist in tracking stolen vehicles.
            </p>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Key Terms
            </h2>
            <h3 className="my-2" data-aos="fade-down">
              Privacy Practices
            </h3>
            <p data-aos="fade-down">
              We understand the importance of safeguarding your personal information and have formulated a <a href="https://www.spintrip.in/policy#privacy">Privacy Policy</a> to ensure that your personal information is sufficiently protected. We encourage you to read it to understand how you can update and manage your information on the Platform.
            </p>

            <h3 className="my-2" data-aos="fade-down">
              Amendments/Modifications
            </h3>
            <p data-aos="fade-down">
              Spintrip reserves the right to amend or modify this Agreement at its discretion. Updated terms will be posted on the Platform and take effect immediately upon publication. By continuing to use Spintrip Dealer Services after such changes, you indicate acceptance of the updated Agreement. If you disagree, you may discontinue use of the services.
            </p>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Spintrip Dealer Services
            </h2>
            <p data-aos="fade-down">
              Spintrip Dealer Services provides Dealers access to tools to list vehicles, manage bookings, and connect with Customers. These services include:
            </p>
            <ul data-aos="fade-down">
              <li>A marketplace platform enabling Dealers to list vehicles for rent to Customers.</li>
              <li>Add-on services such as customer verification, vehicle tracking, payment facilitation, and operational analytics.</li>
              <li>Installation of optional security devices for enhanced vehicle safety.</li>
            </ul>
            <p data-aos="fade-down">
              Spintrip makes reasonable efforts to provide accurate descriptions of its services but does not guarantee error-free or uninterrupted functionality of the Platform.
            </p>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Dealer Responsibilities
            </h2>
            <h3 className="my-2" data-aos="fade-down">Compliance and Legal Obligations</h3>
            <ul data-aos="fade-down">
              <li>Dealers are fully responsible for ensuring that their listed vehicles comply with all applicable laws, including registration, insurance, taxation, and operational safety standards.</li>
              <li>Spintrip does not assume liability for any legal, regulatory, or compliance-related issues.</li>
            </ul>
            <h3 className="my-2" data-aos="fade-down">Vehicle Condition and Maintenance</h3>
            <ul data-aos="fade-down">
              <li>Dealers must ensure vehicles are in roadworthy condition, clean, and regularly maintained. Any damage, operational issues, or maintenance requirements remain the responsibility of the Dealer.</li>
            </ul>
            <h3 className="my-2" data-aos="fade-down">Theft and Security</h3>
            <ul data-aos="fade-down">
              <li>In case of theft, Dealers may use Spintrip&rsquo;s optional security devices to track and locate their vehicles. Spintrip disclaims any liability for vehicle theft or damage.</li>
            </ul>
            <h3 className="my-2" data-aos="fade-down">User Verification</h3>
            <ul data-aos="fade-down">
              <li>Dealers are advised to verify customer credentials, including driving licenses, identity proof, and payment capability. While Spintrip provides tools for customer verification, the final responsibility lies with the Dealer.</li>
            </ul>
            <h3 className="my-2" data-aos="fade-down">Prohibited Activities</h3>
            <ul data-aos="fade-down">
              <li>Dealers must not list vehicles without proper ownership or authorization.</li>
              <li>Dealers must not provide false or misleading information in vehicle listings.</li>
              <li>Dealers must not engage in fraudulent activities or circumvent the Platform for offline bookings.</li>
            </ul>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Eligibility
            </h2>
            <h3 className="my-2" data-aos="fade-down">Dealer Eligibility</h3>
            <ul data-aos="fade-down">
              <li>Dealers must be registered business entities or individuals with appropriate legal documentation.</li>
              <li>Vehicles must comply with all legal requirements, including valid registration certificates and comprehensive insurance.</li>
              <li>Dealers must ensure vehicles are less than 7 years old and meet the state&rsquo;s operational standards.</li>
              <li>Dealers must maintain exclusive listings for their vehicles on the Spintrip Platform.</li>
            </ul>
            <h3 className="my-2" data-aos="fade-down">Customer Eligibility</h3>
            <ul data-aos="fade-down">
              <li>Customers must have a valid driving license issued by the appropriate authority.</li>
              <li>Customers must provide government-issued identification and proof of financial capability.</li>
              <li>Customers must meet the Dealer&rsquo;s criteria for booking approval, including a clean criminal and traffic record.</li>
            </ul>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Vehicle Listings
            </h2>
            <p data-aos="fade-down">
              Dealers can onboard vehicles by creating an account on the Platform and providing the necessary details and documents, including:
            </p>
            <ul data-aos="fade-down">
              <li>Vehicle registration certificates.</li>
              <li>Insurance documentation.</li>
              <li>Proof of ownership and address.</li>
            </ul>
            <p data-aos="fade-down">
              Vehicles listed on the Platform must meet Spintrip&rsquo;s minimum safety and maintenance standards. Dealers may opt for the installation of security devices provided by Spintrip.
            </p>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Booking and Payments
            </h2>
            <h3 className="my-2" data-aos="fade-down">Online Booking</h3>
            <p data-aos="fade-down">
              Once a vehicle is listed, Customers can view and book vehicles via the Platform. Booking details, including start time, end time, and pickup location, will be communicated to both parties upon confirmation.
            </p>
            <h3 className="my-2" data-aos="fade-down">Lease Agreement</h3>
            <p data-aos="fade-down">
              Each booking requires the Dealer and Customer to enter into a Lease Agreement facilitated through the Platform. This agreement will cover terms such as rental duration, fees, liability for damages, and traffic violations. Spintrip will provide an electronic execution service for such agreements.
            </p>
            <h3 className="my-2" data-aos="fade-down">Payment Terms</h3>
            <ul data-aos="fade-down">
              <li>Spintrip facilitates payment collection and remittance through third-party payment gateways.</li>
              <li>Dealers are responsible for ensuring timely remittance of applicable taxes and fees.</li>
            </ul>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Security Devices
            </h2>
            <p data-aos="fade-down">
              Spintrip offers optional in-vehicle security devices for Dealers. These devices assist in tracking vehicles in case of theft and monitoring driver behavior. Dealers opting for these devices must:
            </p>
            <ul data-aos="fade-down">
              <li>Allow Spintrip representatives to install, maintain, and recover the devices as needed.</li>
              <li>Refrain from tampering with or removing the devices.</li>
            </ul>
            <p data-aos="fade-down">
              Ownership of security devices remains with Spintrip, and Dealers are liable for the cost of damaged or tampered devices.
            </p>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Liability and Disclaimer
            </h2>
            <ul data-aos="fade-down">
              <li>Spintrip is not responsible for any damages, theft, or misuse of vehicles during rentals.</li>
              <li>Spintrip disclaims liability for unauthorized transactions, customer misconduct, or regulatory non-compliance.</li>
              <li>Dealers and Customers must independently resolve disputes arising from bookings.</li>
            </ul>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              Prohibited Offline Arrangements
            </h2>
            <p data-aos="fade-down">
              Spintrip strictly prohibits Dealers and Customers from entering into rental agreements outside the Platform. Any such arrangements will result in account suspension and exclusion from Spintrip&rsquo;s services.
            </p>
```
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
