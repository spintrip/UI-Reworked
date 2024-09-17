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
                <h1 className="text-black mb-5" style={{fontSize:'32px', fontWeight:'700'}}>
                  Spintrip Car Rentals Pvt Ltd Fee Policy
                </h1>

                <h2 className="mb-4" data-aos="fade-down">
                  Guest Fee Policy
                </h2>

                <h3 className="mb-3" data-aos="fade-down">
                  Driver's License Submission
                </h3>
                <p data-aos="fade-down">
                  For each booking made through the Spintrip Platform, the Guest shall be required to submit their driver’s license hardcopy to the Host before starting the trip. The driver’s license must be collected back by the Guest while returning the car.
                </p>

                <h3 className="mb-3" data-aos="fade-down">
                  Lease Rental Fee
                </h3>
                <p data-aos="fade-down">
                  For each booking made through the Spintrip Platform, the Guest shall have to pay Lease Rental in advance, which includes:
                </p>
                <ul data-aos="fade-down">
                  <li>Lease Rental calculated based on the start and end time of the trip. The Lease Rental fee per hour is dynamically driven and changes based on the demand, lead time to booking start, location of the booking, vehicle chosen, and the duration of the booking.</li>
                </ul>

                <h3 className="mb-3" data-aos="fade-down">
                  Refunds, Charges, and Payments
                </h3>
                <ul data-aos="fade-down">
                  <li>All refunds shall be initiated to the original payment account/mode. Refund initiation shall be processed immediately after the cancellation request is received. However, all such refunds may take 5-15 days to reflect in the Guest’s accounts.</li>
                  <li>Payments owed by Guests under this Fee Policy or other applicable policies must be paid electronically within 24 hours of the booking end time, as per Spintrip’s payment instructions.</li>
                  <li>Guests may be charged a processing fee for a declined credit or debit card payment.</li>
                  <li>In the event the Guest defaults on any payments, Spintrip is entitled to charge reminder fees and default interest in accordance with the provisions of the law. In addition, Spintrip may designate third parties to collect amounts owed by a Guest.</li>
                  <li>Spintrip reserves the right to prohibit a Guest from making a subsequent booking on the Platform until all outstanding fees in the Guest's account have been paid in full.</li>
                  <li>The Guest should not make any direct payments to the Host or to any Spintrip executive in any mode except for any settlements related to fuel or Fastag.</li>
                </ul>

                <h3 className="mb-3" data-aos="fade-down">
                  Fees and Penalties
                </h3>
                <p data-aos="fade-down">
                  Here is a comprehensive list of fees and penalties for certain scenarios after you have created your booking/reservation:
                </p>
                <ul data-aos="fade-down">
                  <li><strong>Cancellation by Guest:</strong> Details of the cancellation fees based on timing before the booking start time.</li>
                  <li><strong>Reschedule before booking start time:</strong> No modification allowed between 0 - 2 hours before booking start time.</li>
                  <li><strong>Extension:</strong> Extensions can be made before or after booking ends with normal tariff rates applying.</li>
                  <li><strong>Late Return:</strong> Late returns are charged up to 1.5-2x the hourly Lease Rental fee per hour.</li>
                  <li><strong>Minimum Duration:</strong> The minimum booking duration is 8 hours.</li>
                  <li><strong>Discounts:</strong> Discounts apply to trips of 8 hours or more and do not apply on blackout days.</li>
                  <li><strong>Fuel Policy:</strong> Guests are responsible for fuel discrepancies based on the actual cost per litre.</li>
                  <li><strong>Breakdown of Vehicle:</strong> Guest liable for breakdowns due to negligence.</li>
                  <li><strong>Returning the Vehicle to the Wrong Location:</strong> A flat fee of INR 10,000 applies for incorrect returns.</li>
                  <li><strong>No Show:</strong> Bookings will be canceled if no show within 4 hours of start time, with no refunds.</li>
                  <li><strong>Over Speeding:</strong> Fees and potential expulsion for exceeding speed limits.</li>
                  <li><strong>Smoking:</strong> Charges apply for smoking inside the vehicle.</li>
                  <li><strong>Wrong Fuelling:</strong> Guest liable for full repair costs.</li>
                  <li><strong>Loss of Keys and Documents:</strong> Charges apply for lost keys and documents.</li>
                  <li><strong>Vehicle Damage:</strong> Guest liable for damages as per selected Damage Protection Plan.</li>
                  <li><strong>Cleaning Required:</strong> Charges apply for returning the vehicle in a dirty condition.</li>
                  <li><strong>Fastags/Tolls:</strong> Guest responsible for all tolls incurred during booking.</li>
                </ul>

                <h3 className="mb-3" data-aos="fade-down">
                  Additional Conditions
                </h3>
                <ul data-aos="fade-down">
                  <li>All rates include GST where applicable.</li>
                  <li>Spintrip is not responsible for any property left in the vehicle after the booking ends.</li>
                  <li>KYC - Guest’s profile should be verified before the booking start.</li>
                </ul>

                <p data-aos="fade-down">
                  This policy will help you understand Spintrip's fee structure and conditions. For any questions, please contact us at <a href="mailto:support@spintrip.in">support@spintrip.in</a>.
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
