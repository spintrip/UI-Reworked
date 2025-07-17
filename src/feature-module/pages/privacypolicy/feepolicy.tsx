import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useScrollToTop from "../../../hooks/useScrollToTop";

const FeePolicy = () => {
  useScrollToTop();
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);
  
  return (
    <div className="main-wrapper">
      <div className="privacy-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="terms-policy">
                <h1 className="text-black mb-5" style={{ fontSize: '32px', fontWeight: '700' }}>
                  Spintrip Dealer Services Fee Policy
                </h1>
  
                <h2 className="mb-4">Introduction</h2>
                <p>
                  Spintrip Dealer Services is a subscription-based software platform enabling automotive rental
                  dealers (“Dealers”) to manage their bookings and connect with customers (“Customers”). Spintrip
                  provides a robust marketplace for Dealers to boost their business while maintaining complete
                  financial independence over booking revenue. Spintrip does not charge a commission or retain any
                  share of the booking amount; 100% of the payment received for rentals is transferred directly to the
                  Dealer.
                </p>
                <p>This document outlines the subscription fees and policies applicable to Dealers for using Spintrip’s services.</p>
  
                <hr />
  
                <h2 className="mb-4">Dealer Subscription Fees</h2>
                <p>Spintrip offers a flexible and transparent subscription model for Dealers based on vehicle type. The subscription fees are as follows:</p>
                <ul>
                  <li><strong>Cars</strong>: ₹256 per vehicle per month.</li>
                  <li><strong>Bikes</strong>: ₹129 per vehicle per month.</li>
                  <li><strong>Heavy Vehicles</strong> (e.g., Tempo Travellers, 12-seater vehicles): ₹333 per vehicle per month.</li>
                </ul>
  
                <h3 className="mb-3">Optional Security Device Subscription</h3>
                <p>
                  Dealers can enhance vehicle security by opting for Spintrip’s security devices, which include features
                  like GPS tracking and driver behavior monitoring. The subscription fee for security devices is ₹188 per
                  device per month.
                </p>
  
                <hr />
  
                <h2 className="mb-4">Revenue Model</h2>
                <ul>
                  <li><strong>100% Dealer Earnings</strong>: Spintrip does not retain any share of the booking amount. All payments made by Customers for vehicle bookings will be directly transferred to the Dealer’s account.</li>
                  <li><strong>Payment Options for Customers</strong>:
                    <ul>
                      <li><strong>Online Payment</strong>: Customers can pay electronically through the Spintrip platform.</li>
                      <li><strong>Cash Payment</strong>: Dealers may allow Customers to pay in cash directly at the time of vehicle handover.</li>
                    </ul>
                  </li>
                </ul>
                <p>Spintrip solely provides the software infrastructure to facilitate these transactions and does not act as a payment intermediary.</p>
  
                <hr />
  
                <h2 className="mb-4">Subscription Payment Terms</h2>
                <ul>
                  <li><strong>Billing Cycle</strong>: Subscription fees will be charged monthly in advance.</li>
                  <li><strong>Payment Due Date</strong>: Payments for subscriptions must be made within the first five days of the billing cycle to avoid service disruption.</li>
                  <li><strong>Payment Modes</strong>: Dealers can pay subscription fees via bank transfer, UPI, credit/debit card, or any other mode specified on the Platform.</li>
                </ul>
  
                <hr />
  
                <h2 className="mb-4">Subscription Policies</h2>
                <h3 className="mb-3">Adding or Removing Vehicles</h3>
                <p>Dealers can add or remove vehicles from their subscription at any time. Fees will be adjusted on a prorated basis for the current billing cycle.</p>
  
                <h3 className="mb-3">Cancellation of Subscription</h3>
                <p>
                  Dealers can cancel their subscription by providing 7 days’ notice. No refunds will be issued for partially used billing cycles.
                  Upon cancellation, Dealers must return any security devices provided by Spintrip.
                </p>
  
                <hr />
  
                <h2 className="mb-4">Optional Security Device Policies</h2>
                <ul>
                  <li><strong>Installation and Maintenance</strong>:
                    <ul>
                      <li>Dealers opting for security devices must allow Spintrip representatives to install and maintain the devices.</li>
                      <li>Devices remain the property of Spintrip and must not be tampered with or removed.</li>
                    </ul>
                  </li>
                  <li><strong>Device Recovery</strong>: Upon subscription cancellation or vehicle removal from the platform, Dealers must return the devices. Failure to do so will result in a penalty equivalent to the device’s market value.</li>
                  <li><strong>Liability</strong>: Dealers are responsible for any damage or loss of devices during the subscription period.</li>
                </ul>
  
                <hr />
  
                <h2 className="mb-4">Customer Payment and Revenue Policies</h2>
                <ul>
                  <li><strong>Online Payments</strong>: Payments made by Customers through the Platform will be transferred directly to the Dealer’s account. Spintrip does not charge a transaction fee or retain any percentage of the booking revenue.</li>
                  <li><strong>Cash Payments</strong>: Dealers can allow Customers to pay in cash. Spintrip will not be responsible for collecting or managing cash payments.</li>
                  <li><strong>Refunds</strong>: All refund requests by Customers must be handled directly by the Dealer. Spintrip will not mediate or process refunds.</li>
                </ul>
  
                <hr />
  
                <h2 className="mb-4">Dealer Responsibilities</h2>
                <ul>
                  <li><strong>Compliance</strong>: Dealers must ensure their vehicles comply with all applicable legal and regulatory requirements, including registration, insurance, and maintenance.</li>
                  <li><strong>Payment Disputes</strong>: Any disputes related to payments, including refunds or cash settlements, must be resolved directly between the Dealer and the Customer.</li>
                </ul>
  
                <hr />
  
                <h2 className="mb-4">Additional Terms</h2>
                <ul>
                  <li><strong>Taxes</strong>: All subscription fees are inclusive of applicable GST.</li>
                  <li><strong>KYC Compliance</strong>: Dealers must complete a one-time KYC verification process to use the Spintrip platform.</li>
                  <li><strong>Account Suspension</strong>: Failure to pay subscription fees on time may result in temporary suspension of platform access until payment is received.</li>
                </ul>
  
                <p className="mt-4">
                  For any queries or support related to the Fee Policy, Dealers can contact Spintrip support at{' '}
                  <a href="mailto:support@spintrip.in">support@spintrip.in</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default FeePolicy;
