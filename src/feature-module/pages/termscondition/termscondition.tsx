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
            <h1 className="text-black mt-2 mb-5" style={{fontSize:'32px', fontWeight:'700'}} data-aos="fade-down">
              Spintrip: A Marketing & Discovery Platform Policies
            </h1>
            <h2 className="mt-5 mb-3" data-aos="fade-down">
              1. Platform Discovery Streams
            </h2>
            <h3 className="my-2" data-aos="fade-down">
              1.1 Cab Discovery Service (Chauffeur-Driven)
            </h3>
            <p data-aos="fade-down">
              Spintrip acts as a <strong>Marketing Discovery Platform</strong> for independent professional transport vendors. We connect you with certified vendors who provide driver-accompanied commercial vehicles (Yellow Plates). Spintrip does not employ drivers or manage fleet operations.
            </p>
            <h3 className="my-2" data-aos="fade-down">
              1.2 Self-Drive Discovery Service (Rental/Marketplace)
            </h3>
            <p data-aos="fade-down">
              Spintrip provides a <strong>Software-as-a-Service (SaaS) Marketplace</strong> specifically for automotive rental dealers and Peer-to-Peer hosts. In this stream, Spintrip is strictly an introduction tool. All operational liability for vehicle roadworthiness and RTO registration (White/Yellow Plates) lies with the Host.
            </p>
            <p data-aos="fade-down" style={{fontWeight: 'bold'}}>
              IMPORTANT LEGAL STATUS: Spintrip is an "Information Technology Intermediary" as defined under Section 2(1)(w) of the IT Act, 2000. We are NOT a transport provider, common carrier, or rental agency.
            </p>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              2. Fee Policy & Payments
            </h2>
            <h3 className="my-2" data-aos="fade-down">
              Platform Discovery Fee (Confirmation Fee)
            </h3>
            <p data-aos="fade-down">
              Spintrip charges a "Platform Discovery Fee" (also referred to as a "Confirmation Fee") for facilitating the discovery and connection between a Customer and a Dealer. This fee is for the use of the Platform and the software services provided by Spintrip.
            </p>
            <ul data-aos="fade-down">
              <li><strong>Confirmation Fee:</strong> Paid upfront to Spintrip via the Platform.</li>
              <li><strong>Trip Fare:</strong> The remaining balance of the trip or rental fare must be paid directly by the Customer to the Dealer/Driver. Spintrip does not collect, manage, or take responsibility for this portion of the payment.</li>
            </ul>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              3. Cancellation & Refund Policy
            </h2>
            <p data-aos="fade-down">
              We maintain a strict <strong>1-Hour Cancellation Window</strong> for all bookings:
            </p>
            <ul data-aos="fade-down">
              <li><strong>Before 1 Hour:</strong> If a booking is cancelled at least 1 hour prior to the scheduled start time, the Confirmation Fee is refundable to the original source or Spintrip wallet.</li>
              <li><strong>Within 1 Hour:</strong> If a booking is cancelled within 1 hour of the scheduled start time, or after the start time, the <strong>Confirmation Fee is strictly non-refundable</strong>.</li>
            </ul>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              4. Liability & Disclaimer
            </h2>
            <p data-aos="fade-down">
              As an IT Intermediary, Spintrip provides "Safe Harbor" protection under the law.
            </p>
            <ul data-aos="fade-down">
              <li><strong>No Liability for Service:</strong> Spintrip is NOT liable for any accidents, delays, physical injury, loss of life, or property damage occurring during a trip. The Dealer/Host assumes 100% liability for the vehicle condition and driver behavior.</li>
              <li><strong>Insurance:</strong> It is the sole responsibility of the Dealer/Host to provide commercial insurance for their vehicles. Spintrip provides no insurance coverage.</li>
              <li><strong>Verification:</strong> While Spintrip provides tools for verification, the final responsibility to verify physical documents (License, RC, ID) lies with the Dealer and Customer at the time of vehicle handover.</li>
              <li><strong>Limitation:</strong> In no event shall Spintrip's total liability exceed the Platform Discovery Fee paid by the user for the specific booking in question.</li>
            </ul>

            <h2 className="mt-5 mb-3" data-aos="fade-down">
              5. Dispute Resolution & Jurisdiction
            </h2>
            <p data-aos="fade-down">
              Disputes related to the quality of the ride, vehicle condition, or driver conduct must be settled directly between the Customer and the Dealer. Any legal disputes arising out of the use of the Spintrip Platform shall be subject to the exclusive jurisdiction of the courts in <strong>Bangalore, Karnataka</strong>.
            </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
