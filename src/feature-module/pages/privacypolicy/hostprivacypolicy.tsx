import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import useScrollToTop from "../../../hooks/useScrollToTop";

const HostPrivacyPolicy: React.FC = () => {
  useScrollToTop();
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <div className="main-wrapper">
      <div className="policy-section">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="terms-policy">
                <h1 className="text-black" style={{ fontSize: "32px", fontWeight: "700" }}>
                  Dealers Policy • Spintrip Rentals Pvt Ltd
                </h1>

                <h2 className="mt-5" data-aos="fade-down">TERMS OF USE</h2>
                <p data-aos="fade-down">
                  This document is a legally binding agreement effective upon your acceptance (directly or indirectly in electronic form or by means of an electronic record) and forms part of the Governing Policies for availing of the software services offered by Spintrip Rentals Pvt Ltd through its website and mobile application under the name and style of "Spintrip" ("Platform").
                </p>

                <h3 className="mt-5" data-aos="fade-down">Background</h3>
                <p data-aos="fade-down">
                  The Platform is owned and operated by Spintrip Rentals Pvt Ltd, a company incorporated under the Companies Act, 1956, having its corporate office at OYO RankaSpace, KR Puram, Bangalore, Karnataka-560037 (hereinafter referred to as “Spintrip” or “we” or “us” or “our,” which expression shall include its successors, liquidators, and assigns).
                </p>
                <p data-aos="fade-down">
                  Spintrip provides a software-based marketplace platform designed exclusively for automotive rental dealers to boost their sales and business.
                </p>
                <p data-aos="fade-down">
                  Through this Platform, Spintrip facilitates a seamless connection between automotive rental dealers (hereinafter referred to as “Dealer” or “you” or “your”) and potential customers. Spintrip acts solely as a software service provider and is not involved in selling, hiring, managing, or controlling vehicles. Compliance with all applicable laws and responsibilities concerning vehicles listed on the Platform lies entirely with the Dealer.
                </p>
                <p data-aos="fade-down">
                  All provisions in these Terms of Use, together with the Spintrip Dealers Services Terms & Conditions, Privacy Policy, and any other incorporated policies/agreements constitute the terms of the agreement between you and Spintrip for the use of the Platform and services offered by Spintrip (collectively referred to as the “Governing Policies”).
                </p>
                <p data-aos="fade-down">
                  By using the Platform, you agree to these terms. If you do not agree with the Terms of Use, please refrain from using the Platform or availing of the software services offered through it.
                </p>

                <h3 className="mt-5" data-aos="fade-down">Dealer Responsibilities</h3>

                <h4 data-aos="fade-down">Compliance and Legal Obligations</h4>
                <ul data-aos="fade-down">
                  <li>Dealers are solely responsible for ensuring that all vehicles listed on the Platform comply with applicable laws, including registration, insurance, permits, taxes, etc.</li>
                  <li>Spintrip does not assume liability for legal or regulatory non-compliance related to vehicles listed by Dealers.</li>
                </ul>

                <h4 data-aos="fade-down">User Verification</h4>
                <p data-aos="fade-down">
                  Dealers must verify the credentials and identities of users renting their vehicles. Spintrip provides the marketplace but does not undertake user verification.
                </p>

                <h4 data-aos="fade-down">Vehicle Condition and Safety</h4>
                <p data-aos="fade-down">
                  Vehicles must be roadworthy, safe, and well-maintained. Spintrip is not liable for damages, accidents, or losses during the rental.
                </p>

                <h4 data-aos="fade-down">Theft and Security</h4>
                <p data-aos="fade-down">
                  Dealers may use Spintrip’s optional GPS security devices to track vehicles in case of theft.
                </p>

                <h3 className="mt-5" data-aos="fade-down">Platform Usage</h3>

                <h4 data-aos="fade-down">Dealer Information</h4>
                <p data-aos="fade-down">
                  Dealers must provide accurate and updated information about vehicles, pricing, and availability. False or misleading information may result in suspension or termination of the account.
                </p>

                <h4 data-aos="fade-down">Prohibited Activities</h4>
                <ul data-aos="fade-down">
                  <li>Listing unauthorized vehicles</li>
                  <li>Fraudulent activities or misrepresentation</li>
                  <li>Violation of any applicable laws</li>
                </ul>

                <h3 className="mt-5" data-aos="fade-down">Fees and Payments</h3>

                <h4 data-aos="fade-down">Subscription Fees</h4>
                <p data-aos="fade-down">
                  Dealers must pay a subscription fee based on the plan and features availed.
                </p>

                <h4 data-aos="fade-down">Taxes</h4>
                <p data-aos="fade-down">
                  Dealers are responsible for all taxes applicable to their business activities through the Platform.
                </p>

                <h3 className="mt-5" data-aos="fade-down">Liability Disclaimer</h3>
                <ul data-aos="fade-down">
                  <li>Spintrip is only a software service provider.</li>
                  <li>It does not accept liability for disputes, losses, damages, or misconduct during rentals.</li>
                </ul>

                <h3 className="mt-5" data-aos="fade-down">Privacy</h3>
                <p data-aos="fade-down">
                  Information is handled per our <a href="https://www.spintrip.in/policy#privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. Use of the Platform implies your consent.
                </p>

                <h3 className="mt-5" data-aos="fade-down">Dispute Resolution</h3>
                <p data-aos="fade-down">
                  Spintrip is not responsible for mediating disputes between Dealers and customers. Dealers must resolve disputes independently.
                </p>

                <h3 className="mt-5" data-aos="fade-down">Policy Updates</h3>
                <p data-aos="fade-down">
                  Spintrip may revise these policies at any time. Updates are effective immediately upon publication. Dealers should check policies periodically.
                </p>

                <p className="mt-4" data-aos="fade-down">
                  By registering on the Platform and using Spintrip’s services, you agree to comply with these Dealer Policies and acknowledge that Spintrip acts only as a software service provider, providing you with tools and resources to enhance your rental business.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostPrivacyPolicy;
