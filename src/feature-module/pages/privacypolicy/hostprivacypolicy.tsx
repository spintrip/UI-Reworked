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

                <h1 className="text-black mt-2 mb-5" style={{fontSize:'32px', fontWeight:'700'}} data-aos="fade-down">
                  Spintrip Dealer & Host Policy (Platform Intermediary Rules)
                </h1>
                <p data-aos="fade-down">
                  This policy governs the relationship between Spintrip (the &ldquo;Platform&rdquo;) and independent automotive rental dealers and fleet owners (&ldquo;Dealers/Hosts&rdquo;).
                </p>
                <p data-aos="fade-down" style={{fontWeight: 'bold'}}>
                  By listing your vehicles on Spintrip, you acknowledge that Spintrip is an IT Intermediary and you are an independent service provider. You are solely responsible for all legal and operational aspects of your rental or transport business.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  1. Customer Data Confidentiality
                </h2>
                <p data-aos="fade-down">
                  As a Dealer/Host, you will receive customer names, phone numbers, and booking details. You agree to:
                </p>
                <ul data-aos="fade-down">
                  <li><strong>Exclusive Use:</strong> Use customer data ONLY for the purpose of fulfilling the specific booking through Spintrip.</li>
                  <li><strong>No Data Misuse:</strong> You are strictly prohibited from contacting customers for marketing, promotional, or any other unauthorized purpose after the booking is completed.</li>
                  <li><strong>Confidentiality:</strong> Treat all customer information as strictly confidential. Any misuse of customer data will result in permanent account termination and potential legal action by Spintrip.</li>
                </ul>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  2. Role-Based Compliance & Licenses
                </h2>
                <h3 className="my-2" data-aos="fade-down">
                  2.1 Professional Cab Vendors (Yellow Plate)
                </h3>
                <ul data-aos="fade-down">
                  <li><strong>Permits:</strong> You MUST possess valid Commercial Permits, Badges, and Fitness Certificates as required by the RTO.</li>
                  <li><strong>Driver Checks:</strong> You are responsible for background verification of all drivers assigned to trips.</li>
                  <li><strong>Vehicle Type:</strong> Strictly no private (White Plate) vehicles allowed in the Cab Discovery stream.</li>
                </ul>
                <h3 className="my-2" data-aos="fade-down">
                  2.2 Self-Drive Hosts (P2P / Asset Sharing)
                </h3>
                <ul data-aos="fade-down">
                  <li><strong>Safety First:</strong> You are responsible for ensuring the vehicle is mechanically sound and safe for user-operation.</li>
                  <li><strong>Discovery Acknowledgment:</strong> You acknowledge that for Self-Drive, Spintrip is a <strong>Peer-to-Peer introducer</strong>. You assume 100% liability for operational misuse or registration disputes.</li>
                  <li><strong>Permits:</strong> You acknowledge the difference between "Rent-a-Cab" licenses and "Peer-to-Peer Sharing" and accept all associated regulatory risks.</li>
                </ul>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  3. Independent Financial Responsibility
                </h2>
                <ul data-aos="fade-down">
                  <li><strong>Trip Fare Collection:</strong> You are responsible for collecting the remaining Trip Fare directly from the Customer. Spintrip is not liable for any payment defaults by the Customer for the Trip Fare portion.</li>
                  <li><strong>Taxes:</strong> You are responsible for paying all applicable taxes (GST, etc.) on the Trip Fare you receive directly from the Customer.</li>
                </ul>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  4. Safe Harbor Indemnity
                </h2>
                <p data-aos="fade-down" style={{color: 'red', fontWeight: 'bold'}}>
                  You agree to indemnify and hold Spintrip, its directors, and employees harmless from any and all claims, damages, or legal costs arising from: (a) your vehicle condition, (b) driver behavior, (c) trip accidents, (d) misuse of customer data, or (e) regulatory non-compliance.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  5. Account Termination
                </h2>
                <p data-aos="fade-down">
                  Spintrip reserves the right to terminate any Dealer/Host account found to be in violation of these platform rules, especially regarding customer data misuse or unlicensed vehicle operation.
                </p>
                
                <h2 className="mt-5 mb-3" data-aos="fade-down" style={{color: '#primary'}}>
                  6. Special Provision for Private Vehicle (White Plate) Discovery
                </h2>
                <p data-aos="fade-down" style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                  Spintrip offers a "Shared Discovery Marketplace" mode specifically for private vehicle owners. By listing a private vehicle (White Plate) on the Platform, you agree to the following additional terms:
                </p>
                <ul data-aos="fade-down">
                  <li><strong>Marketplace Designation:</strong> You acknowledge that for private vehicles, Spintrip is strictly a <strong>Marketing & Discovery platform</strong> providing a "Peer-to-Peer Connection" service. Spintrip does NOT handle commercial rental bookings or payments for this segment.</li>
                  <li><strong>Regulatory Risk:</strong> You are 100% liable for compliance with the Motor Vehicles Act regarding the usage of private vehicles. Spintrip does NOT encourage or facilitate illegal commercial hiring.</li>
                  <li><strong>Fault Acknowledgment:</strong> In the event of vehicle impounding, seizure, or RTO fines, you assume full responsibility and indemnify Spintrip against all legal consequences. Spintrip's role is limited to the digital introduction of users.</li>
                  <li><strong>Discovery Only:</strong> You agree not to represent Spintrip as a transport provider or rental agency to authorities or third parties.</li>
                </ul>

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
