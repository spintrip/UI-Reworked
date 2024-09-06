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
                  C2C Terms and Conditions - Host &amp; Guest • Spintrip Car
                  Rentals Pvt Ltd{" "}
                </h1>
                <p data-aos="fade-down">
                  <strong>Privacy Policy</strong>
                </p>
                <p data-aos="fade-down">
                  Welcome to Spintrip Host Services (&ldquo;Spintrip Host
                  Services&rdquo;) located at{" "}
                  <a href="https://spintrip.in">www.Spintrip.in</a> (the
                  &ldquo;Site&rdquo;) and the mobile application (the
                  &ldquo;App&rdquo;). The Site and App (each the
                  &ldquo;Platform&rdquo;) are owned and operated by Spintrip Car
                  Rentals Pvt Ltd, a company incorporated under the Companies
                  Act 1956, having its corporate office at 001 Hemanth Govind
                  Apartments, BEML layout, ITPL main road, Bangalore,
                  Karnataka-560037 (also referred to as &ldquo;Spintrip&rdquo;,
                  &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). All
                  access and use of the Platform and the services thereon are
                  governed by our general Platform terms, (the &ldquo;General
                  Terms&rdquo;), privacy policy available at{" "}
                  <a href="https://spintrip.in/policy#privacy">
                    Privacy Policy
                  </a>{" "}
                  (the &ldquo;Privacy Policy&rdquo;), fee policy (&ldquo;Fee
                  Policy&rdquo;) and service-specific terms.
                </p>
                <p data-aos="fade-down">
                  These Terms of Service, including specific terms and
                  conditions applicable to the Hosts and Guests and Add-on
                  Services (this &ldquo;Agreement&rdquo;/ &ldquo;Host
                  T&amp;C&rdquo;) read together with the Privacy Policy, Fee
                  Policy and other applicable policies (&ldquo;Governing
                  Policies&rdquo;), collectively create the legally binding
                  terms and conditions on which Spintrip offers to you or the
                  entity you represent (&ldquo;you&rdquo;, &ldquo;User&rdquo; or
                  &ldquo;your&rdquo;) the Spintrip Host Services (defined
                  below), including your access and use of Spintrip Host
                  Services.
                </p>
                <p data-aos="fade-down">
                  Please read each of the Governing Policies carefully to ensure
                  that you understand each provision before using or registering
                  on the website or accessing any material, information, or
                  availing services through the Platform. If you do not agree to
                  any of its terms, please do not use the Platform or avail any
                  services through the Platform. The Governing Policies take
                  effect when you click an &ldquo;I Agree&rdquo; button or
                  checkbox presented with these terms or, if earlier, when you
                  use any of the services offered on the Platform (the
                  &ldquo;Effective Date&rdquo;). To serve you better, our
                  Platform is continuously evolving, and we may change or
                  discontinue all or any part of the Platform, at any time and
                  without notice, at our sole discretion.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  PRIVACY PRACTICES
                </h2>
                <p data-aos="fade-down">
                  We understand the importance of safeguarding your personal
                  information and we have formulated a{" "}
                  <a href="https://spintrip.in/policy#privacy">
                    Privacy Policy
                  </a>{" "}
                  to ensure that your personal information is sufficiently
                  protected. We encourage you to read it to better understand
                  how you can update and manage your information on the
                  Platform.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  AMENDMENTS / MODIFICATIONS
                </h2>
                <p data-aos="fade-down">
                  Spintrip reserves the right to change the particulars
                  contained in the Agreement from time to time and at any time.
                  If Spintrip decides to make changes to the Agreement, it will
                  post the new version on the website and update the date
                  specified above or communicate the same to you by other means.
                  Any change or modification to the Agreement will be effective
                  immediately from the date of upload of the Agreement on the
                  Platform. It is pertinent that you review the Agreement
                  whenever we modify them and keep yourself updated about the
                  latest terms of the Agreement because if you continue to use
                  the Spintrip Host Services after we have posted the modified
                  Agreement, you are indicating to us that you agree to be bound
                  by the modified Agreement. If you don&rsquo;t agree to be
                  bound by the modified terms of the Agreement, then you may not
                  use the Spintrip Host Services anymore.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  SPINTRIP HOST SERVICES
                </h2>
                <p data-aos="fade-down">
                  Spintrip Host Services is a marketplace feature of the
                  Platform more particularly described below. It helps owners of
                  vehicles (&ldquo;Hosts&rdquo;/ &ldquo;Lessors&rdquo;) connect
                  with users in temporary need of a vehicle on a leasehold basis
                  (&ldquo;Guests&rdquo;) for their personal use (&ldquo;Spintrip
                  Host Services&rdquo;). Spintrip does not itself lease or deal
                  with such vehicles in any manner whatsoever and only provides
                  a service connecting the Hosts to the Guests so they may enter
                  into a Lease Agreement (defined below). You understand and
                  agree that Spintrip is not a party to the Lease Agreement
                  entered into between you as the Host of the vehicle or you as
                  the Guest of the vehicle, nor is Spintrip a transportation
                  service, agent, or insurer. Spintrip has no control over the
                  conduct of the Users of the Spintrip Host Services and
                  disclaims all liability in this regard.
                </p>
                <p data-aos="fade-down">
                  Spintrip Host Services aims to establish and provide a robust
                  marketplace of reliable Hosts and Guests. Although Spintrip
                  Host Services provides support for the transaction between
                  Hosts and Guests, we do not guarantee the quality or safety of
                  the vehicles listed on the Platform, nor can we guarantee the
                  truth or accuracy of any listings, or whether Hosts and Guests
                  will consummate a transaction, including the completion of any
                  payment obligations.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  SERVICES INFORMATION
                </h2>
                <p data-aos="fade-down">
                  Spintrip Host Services comprises of (a) the marketplace
                  feature of the Platform that enables Hosts and Guests
                  satisfying the applicable eligibility criteria listed below to
                  connect with one another for leasing of vehicles for personal
                  use; (b) support/facilitation services for leasing including,
                  among others, assistance with execution of the lease
                  agreement, payment facilitation, vehicle
                  cleaning/sanitization, vehicle delivery, on-road assistance,
                  prospective Guest diligence and vehicle usage/location
                  tracking (&ldquo;Add-on Services&rdquo;); and (c) web widgets,
                  feeds, mobile device software applications, applications for
                  third-party web sites and services, and any other mobile or
                  online services and/or applications owned, controlled, or
                  offered by Spintrip. Spintrip attempts to be as accurate as
                  possible in the description of the Spintrip Host Services.
                  However, Spintrip does not warrant that the Spintrip Host
                  Services, information, or other content of the Platform is
                  accurate, complete, reliable, current, or error-free. The
                  Platform may contain typographical errors or inaccuracies and
                  may not be complete or current.
                </p>
                <p data-aos="fade-down">
                  Spintrip reserves the right to correct, change or update
                  information, errors, inaccuracies, subjective conclusions,
                  interpretations, views, opinions, or even human error, or
                  omissions at any time (including after an order has been
                  submitted) without prior notice. Please note that such errors,
                  inaccuracies, or omissions may also relate to availability and
                  Spintrip Host Services. The user of the Spintrip Host Services
                  shall not hold Spintrip liable for any loss or damage relating
                  to the same.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  USE OF SPINTRIP HOST SERVICES
                </h2>
                <p data-aos="fade-down">
                  While you may use some sections/features of the Platform
                  without registering with us, to access the Spintrip Host
                  Services you will be required to register and create an
                  account with us. Thereafter, only Hosts and Guests satisfying
                  the applicable eligibility criteria (listed below) will be
                  able to use the services subject to the terms and conditions
                  of this Agreement.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  ELIGIBILITY
                </h2>
                <p data-aos="fade-down">
                  The Spintrip Host Services are intended solely for users who
                  are 18 years or older and satisfy user-specific criteria
                  below. Any use of the Spintrip Host Services by anyone that
                  does not meet these requirements is expressly prohibited. Any
                  misrepresentation with regards to or circumvention of the
                  Eligibility Criteria shall render the Host liable to
                  termination from the Platform and further legal action as the
                  case may be.
                </p>

                <h3 className="mt-5 mb-3" data-aos="fade-down">
                  Host/Vehicle Eligibility Criteria
                </h3>
                <ul data-aos="fade-down">
                  <li>
                    The Host must have a valid passport, Aadhar number, and/or
                    other forms of government-issued identification documents.
                  </li>
                  <li>
                    The vehicle(s) proposed to be listed must be eligible
                    non-transport or private personal use vehicles registered
                    solely in your name. At the time of listing, the vehicle(s)
                    being listed should also not have any pending insurance
                    claims and/or other ongoing litigations, legal claims, or
                    any other claims that may arise in tort or law.
                  </li>
                  <li>
                    Your vehicle must have a valid registration certificate
                    issued by the relevant regional transport authority under
                    the Motor Vehicles Act, 1988 (MVA).
                  </li>
                  <li>
                    Your vehicle must be less than 7 years old and should meet
                    all legal requirements of the state of its registration and
                    usage.
                  </li>
                  <li>
                    Your vehicle must be clean, well-maintained, and have the
                    basic accessories, including safety devices as per our
                    maintenance, component, and safety standards/equipment
                    specifications.
                  </li>
                  <li>
                    You must abide by our exclusivity policy, which mandates
                    that the vehicle you list on the Platform must be
                    exclusively shared on the Platform and can&rsquo;t appear on
                    another car sharing/leasing platform.
                  </li>
                  <li>
                    Your vehicle must meet our minimum insurance requirements of
                    having Third Party Comprehensive Insurance as mandated under
                    the Motor Vehicle Act, 1988.
                  </li>
                  <li>
                    Your vehicle must have fewer than 70,000 kilometers and have
                    never been declared a total loss.
                  </li>
                  <li>
                    If you have opted for the fitment of In-Vehicle Devices, you
                    must have them installed and ready at the time of listing
                    the vehicle.
                  </li>
                </ul>

                <h3 className="mt-5 mb-3" data-aos="fade-down">
                  Guest Eligibility Criteria
                </h3>
                <ul data-aos="fade-down">
                  <li>
                    The Guest must have a valid driving license issued by the
                    appropriate authority under the Government of India.
                  </li>
                  <li>
                    The Guest must have a valid passport, Aadhar number, and/or
                    other forms of government-issued identification documents.
                  </li>
                  <li>
                    The Guest must be legally solvent with a minimum monthly
                    income of not less than INR 30,000 as substantiated by a
                    bank account statement of 6 months.
                  </li>
                  <li>
                    The Guest must have no recent vehicle accidents in the last
                    year, major traffic violations in the last year, more than 2
                    recent moving violations, and a history of non-payment or
                    failure to pay.
                  </li>
                  <li>
                    The Guest must have a clean criminal record, including but
                    not limited to no felonies, no violent crimes, thefts, or
                    offenses related to prohibited substances.
                  </li>
                </ul>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  REGISTERING AND CREATING YOUR ACCOUNT
                </h2>
                <p data-aos="fade-down">
                  To access and use the Spintrip Host Services, you shall have
                  to open an account on the Platform with a valid email address
                  by providing certain complete and accurate information and
                  documentation including but not limited to your name, date of
                  birth, email address, password, and other identifying
                  information as may be necessary to open the account on the
                  Platform. Each user may open and maintain only one account on
                  the Platform.
                </p>
                <p data-aos="fade-down">
                  Please see below an indicative list of documents that you will
                  be required to submit as part of the registration process on
                  the Platform. Spintrip may on a need basis request submission
                  of additional documents as well, as it may deem necessary for
                  the facilitation of Spintrip Host Services.
                </p>
                <h3 className="my-2" data-aos="fade-down">
                  For Hosts:
                </h3>
                <ul data-aos="fade-down">
                  <li>Registration Certificate.</li>
                  <li>Pollution Under Check Certificate.</li>
                  <li>Car Insurance.</li>
                  <li>
                    Current Address Proof (Rent Agreement/Company Allotment
                    Letter, etc.).
                  </li>
                  <li>
                    Valid Government ID Card (Aadhar, Voter&rsquo;s ID,
                    Passport, etc.).
                  </li>
                  <li>PAN Card.</li>
                </ul>
                <h3 className="my-2" data-aos="fade-down">
                  For Guests:
                </h3>
                <ul data-aos="fade-down">
                  <li>Valid Driver&rsquo;s License.</li>
                  <li>
                    Valid Government ID Card (Aadhar, Voter&rsquo;s ID,
                    Passport, etc.).
                  </li>
                  <li>Cancelled Cheque in the name of the Host.</li>
                  <li>
                    Current Address Proof (Rent Agreement/Company Allotment
                    Letter, etc.).
                  </li>
                </ul>
                <p data-aos="fade-down">
                  Once you have created an account with us, you are responsible
                  for maintaining the confidentiality of your username,
                  password, and other information used to register and sign into
                  our Platform, and you are fully responsible for all activities
                  that occur under this username and password. Please
                  immediately notify us of any unauthorized use of your account
                  or any other breach of security. If you interact with us or
                  with third-party service providers, you agree that all
                  information that you provide will be accurate, complete, and
                  current. You acknowledge that the information you provide, in
                  any manner whatsoever, is not confidential or proprietary and
                  does not infringe any rights of a third party.
                </p>
                <p data-aos="fade-down">
                  By registering on the Platform, each applicant, i.e., the Host
                  and the Guest, authorizes Spintrip and Spintrip reserves the
                  right, in its sole discretion, to verify the documents
                  submitted by such applicant through the Platform. Spintrip may
                  in its sole discretion use third-party services to verify the
                  information you provide to us and to obtain additional related
                  information and corrections where applicable, and you hereby
                  authorize Spintrip to request, receive, use, and store such
                  information in accordance with our Privacy Policy. Further,
                  Spintrip reserves the right, at its sole discretion, to
                  suspend or terminate the Spintrip Services to any of the
                  registered users while their account is still active for any
                  reason whatsoever. Spintrip may provide any information
                  necessary to the Hosts, insurance companies, or law
                  enforcement authorities to assist in the filing of a stolen
                  car claim, insurance claim, vehicle repossession, or legal
                  action.
                </p>
                <p data-aos="fade-down">
                  EACH HOST AND GUEST ACKNOWLEDGES AND AGREES THAT NEITHER
                  SPINTRIP NOR ANY OF ITS AFFILIATES WILL HAVE ANY LIABILITY
                  TOWARDS ANY: (1) USER FOR ANY UNAUTHORIZED TRANSACTION MADE
                  USING ANY USERNAME OR PASSWORD; (2) PERSONAL BELONGINGS WHICH
                  ARE CLAIMED BY GUEST TO BE LOST OR STOLEN ONCE THE BOOKING
                  PERIOD ENDS; AND (3) THE UNAUTHORIZED USE OF YOUR USERNAME AND
                  PASSWORD FOR YOUR PLATFORM ACCOUNT COULD CAUSE YOU TO INCUR
                  LIABILITY TO BOTH SPINTRIP AND OTHER USERS.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  ONBOARDING VEHICLE BY THE HOST &amp; SUBSEQUENT PROCESS
                </h2>
                <p data-aos="fade-down">
                  Once the user account is created, Hosts can onboard and list
                  their vehicle(s) on the Platform for leasing by following the
                  steps available on the Platform.
                </p>
                <p data-aos="fade-down">
                  Each booking shall have a defined start time and end time
                  (such period from the Start Time to the End Time being called
                  the &ldquo;Booking Period&rdquo;) and a choice of Designated
                  Location (as specified below).
                </p>
                <p data-aos="fade-down">
                  Booking can be created from the Platform at least 1 hour in
                  advance. Hosts shall ensure the availability of the vehicle at
                  the Designated Location for bookings during a booking. Each
                  Listing Period shall be for a minimum of 24 hours and a
                  maximum period of 6 months.
                </p>
                <h3 className="my-2" data-aos="fade-down">
                  Cancellation/Rescheduling of a Listing:
                </h3>
                <p data-aos="fade-down">
                  Hosts shall have the right to cancel or reschedule a booking
                  at any point in time. Charges, as stipulated in the Fee
                  Policy, shall be applicable on cancellation or rescheduling of
                  a booking under certain conditions. However, in cases where
                  there are multiple cancellations in Guest booking/s due to
                  Host/s misdemeanour or unwarranted cancellations by the Host,
                  Spintrip, at its sole discretion, shall have the right to
                  terminate the Host from its platform and delist any/all
                  vehicles listed on the Platform by such Host.
                </p>
                <h3 className="my-2" data-aos="fade-down">
                  Designated Location:
                </h3>
                <p data-aos="fade-down">
                  The vehicle shall be parked at the Host&rsquo;s own location.
                  Hosts shall ensure that the vehicle is parked in a clean,
                  safe, and clearly identifiable location (a &ldquo;Designated
                  Location&rdquo;). Hosts shall have the option of specifying up
                  to 2 (two) Designated Locations within the city limits. Hosts
                  shall provide Spintrip with detailed directions to the
                  Designated Location(s) to ensure that Guests are able to find
                  and access the vehicle. If a Designated Location has
                  restricted access, Hosts shall ensure that Guests are able to
                  access the location for a booking to make the pickup process
                  seamless.
                </p>
                <p data-aos="fade-down">
                  For listing the vehicle, you may opt for the installation of
                  In-Vehicle Devices or list vehicles without any devices. If
                  you opt for installation, you shall allow the
                  personnel/representatives of Spintrip to visit your premise
                  for assessment of your vehicle and installing the In-Vehicle
                  Device in your vehicle to ensure its complete safety. Upon
                  installation/fitment of the In-vehicle Device, the vehicle
                  will be returned to the location designated by you. You hereby
                  unconditionally agree not to tamper with or remove such
                  In-Vehicle Devices. You further agree and acknowledge that
                  such installed In-vehicle Devices may require minor
                  modification from time to time and you shall provide full
                  access to the vehicle to Spintrip or any other party appointed
                  by Spintrip for the purpose of modification of such devices.
                  In case you remove or otherwise tamper with the In-vehicle
                  Devices, you shall be liable to pay Spintrip the actual cost
                  of such In-vehicle Device. Spintrip further reserves the right
                  to deduct the foregoing amount from the amount to be paid by
                  Spintrip to you. Both Host and Guest acknowledge and accept
                  that Spintrip shall not be liable for any consequential
                  damages arising due to such unauthorized removal and/or
                  tampering of In-vehicle Devices by either of the parties. For
                  the purpose of this Agreement, In-Vehicle Devices means and
                  includes the various devices selected by Spintrip to be
                  installed in the vehicle for the security, safety, tracking,
                  and health monitoring of the vehicle.
                </p>
                <p data-aos="fade-down">
                  The Host hereby expressly consents to any consequential loss
                  and warranty loss such as OEM &ldquo;Original Equipment
                  Manufacture&rdquo; warranty that they may suffer as a result
                  of the fitment of the In-vehicle Device in the vehicle.
                  Spintrip will compensate the Host for any consequential losses
                  to the electrical wiring as may be included in the Electrical
                  Warranty provided by the OEM which occurs during the period
                  the vehicle is in use by the Guest on account of the same.
                  Notwithstanding the foregoing, Spintrip will not provide any
                  compensation upon termination of this Agreement or your
                  account for any other reason whatsoever. Upon termination of
                  this Agreement for any reason whatsoever, Spintrip will be
                  authorized to remove the In-Vehicle Device installed in the
                  vehicle and any failure to do so due to a reason attributable
                  to you will result in a penalty on you as per the Fee
                  Schedule.
                </p>
                <p data-aos="fade-down">
                  Further, you acknowledge and accept that Spintrip collects GPS
                  and driver behavior-related data through the In-Vehicle
                  Devices and that the same will be collected even when you are
                  using it for your personal use due to the fitment of
                  In-Vehicle Devices in your Vehicle. You hereby agree and
                  expressly consent that Spintrip shall be allowed to collect
                  such aforementioned data until the removal of the In-Vehicle
                  Device from the Vehicle.
                </p>
                <p data-aos="fade-down">
                  Once the vehicle onboarding process is complete, the Vehicle
                  will be listed on the Platform. Your Host listing page will
                  also include information such as your city and area details
                  where the vehicle is located, your listing description, your
                  public profile photo, your responsiveness in replying to
                  Guests&rsquo; queries, and any additional information you
                  share with other users via the Platform.
                </p>
                <h3 className="my-2" data-aos="fade-down">
                  Recovery of In-Vehicle Devices:
                </h3>
                <p data-aos="fade-down">
                  The Host acknowledges and agrees that the ownership of these
                  In-Vehicle Devices shall vest in Spintrip at all times and the
                  Host shall be entitled to use such devices on payment of the
                  &ldquo;Platform Fee&rdquo; or the &ldquo;Device Management
                  Fee&rdquo; (as the case may be) as long as the Vehicle is
                  listed on the Platform. Host acknowledges and agrees that
                  Spintrip shall at its discretion have the right to
                  terminate/delist the Host&apos;s Vehicle from the Platform.
                  Upon termination/delisting of his/her vehicle from the
                  Platform, the Host shall make the vehicle available for the
                  removal of the In-Vehicle Devices. In the event the Host fails
                  to adhere to the reminders/requests of Spintrip and evades
                  requests to present the car for recovery/removal of devices to
                  Spintrip, the Host hereby unequivocally authorizes and
                  consents to Spintrip and its representatives to remove such
                  devices with/without the Host&apos;s presence upon
                  termination/delisting of the vehicle. The Host understands and
                  agrees that Spintrip and/or its representatives may enter the
                  vehicle, without further consent, and take such steps as may
                  be necessary for the removal of these devices. The Host shall
                  not hold Spintrip liable or accountable for any damages
                  arising due to the removal of such devices.
                </p>
                <p data-aos="fade-down">
                  By listing a vehicle, Hosts are agreeing to (i) provide true
                  and accurate information and are representing that the
                  information that they are providing is accurate; (ii) that the
                  photos contained in the listing are actual photos of the
                  vehicle being advertised, and that they are not
                  misrepresenting their vehicle in any way; (iii) maintain only
                  one active listing, per vehicle, at a time; (iv) truthfully
                  represent any claims or allegations of damage; and (v) work in
                  good faith to resolve any disagreement with Spintrip and the
                  Guests.
                </p>

                <h2 className="mb-3 mt-5" data-aos="fade-down">
                  ONLINE BOOKING
                </h2>
                <p data-aos="fade-down">
                  Once your account is created on the Platform, the Guest will
                  receive confirmation of the successful creation of the Guest
                  account from Spintrip. Thereafter, the verified Guests can
                  view the vehicles listed on the Platform and send a booking
                  request for your vehicle via the Platform.
                </p>
                <p data-aos="fade-down">
                  The Guest will be able to (i) book the trip to start at any
                  time of the day subject to availability; and (ii) choose a
                  start time of the trip from the next hour from the time of the
                  booking.
                </p>
                <p data-aos="fade-down">
                  Upon receipt of a booking request in relation to a vehicle,
                  Spintrip shall confirm such booking and communicate details of
                  the final booking with the Host and the Guest through an
                  email, text message, or message via the Platform confirming
                  such booking.
                </p>
                <p data-aos="fade-down">
                  By accepting these terms relating to the online booking
                  process, the parties hereby acknowledge and agree that (i)
                  each of the Host and Guest accept the conditions for listing
                  the vehicle on the Spintrip Platform and use of Spintrip
                  Services, and (ii) Spintrip is merely a facilitator and any
                  arrangements entered into between Host and Guest through this
                  Platform or otherwise are solely at their own risk and
                  expense.
                </p>

                <h2 className="mb-3 mt-5" data-aos="fade-down">
                  VEHICLE OWNERSHIP
                </h2>
                <p data-aos="fade-down">
                  The parties, specifically the Guests, understand that this
                  Agreement only grants rental/usufructuary/limited rights of
                  use over the vehicle, and all along the absolute and
                  unencumbered ownership of the vehicle for all intents and
                  purposes, including for regulatory requirements under the
                  applicable laws in India, will remain with the Host. This
                  Agreement will cover all terms of listing and availing of
                  Spintrip Host Services and the Lease Agreement (as defined
                  under) shall cover the terms of the subsequent booking as
                  agreed between the Host and the Guest, including Damage
                  Protection Fee (defined below), liability for violations,
                  theft/accident, confiscation of vehicle, insurance, issues
                  related to the use of the vehicles, and so on. It is hereby
                  clarified, and the Host and the Guest acknowledge that
                  Spintrip is not the owner of the vehicles listed on its
                  Platform and is merely a facilitator as provided under this
                  Agreement.
                </p>

                <h2 className="mb-3 mt-5" data-aos="fade-down">
                  LEASE OF VEHICLE
                </h2>
                <p data-aos="fade-down">
                  Upon acceptance of the booking by the Host, the Host and Guest
                  will be required to duly enter into a standard lease agreement
                  (&ldquo;Lease Agreement&rdquo;) to formally execute the terms
                  and conditions and commercials for such booking to ensure
                  compliance with the requirements of applicable law. Spintrip
                  shall assist both the Host and the Guest with the electronic
                  execution and record keeping as a part of its Spintrip Host
                  Services. The Guest understands and accepts that the trip
                  cannot start unless the Lease Agreement is duly executed over
                  our Platform.
                </p>
                <p data-aos="fade-down">
                  The Host hereby acknowledges and agrees that by accepting the
                  terms of this Host T&amp;C, all Lease Agreements that are
                  executed over the Platform with any Guest for the Host&rsquo;s
                  vehicle bear the Host&rsquo;s express consent and such Lease
                  Agreement shall constitute a binding agreement between the
                  Host and the Guest. The Host also acknowledges and agrees that
                  they are cognizant of the terms of all such lease agreements
                  and the corresponding booking details that have been executed
                  over the Spintrip Platform for the particular trip. The Host
                  shall receive a copy of the executed Lease Agreement through
                  email along with the booking details soon after the same has
                  been executed by the Guest upon the Platform.
                </p>
                <p data-aos="fade-down">
                  The Lease Agreement will cover all terms of the lease as
                  agreed between the Host and the Guest (collectively the
                  &ldquo;parties&rdquo;) including Lease Rental, Damage
                  Protection Fee (defined below), liability for any traffic
                  and/or parking violations, theft/accident, confiscation of
                  vehicle, insurance, issues related to the use of the vehicles,
                  Guest&apos;s obligations, dispute resolution, and so on. Upon
                  execution of the Lease Agreement and delivery of the Vehicle
                  to the Guest, the Host shall constitute the demise of the
                  vehicle to the Guest (defined as &ldquo;Guest&rdquo;, on the
                  terms and conditions contained therein &ldquo;Lease
                  Agreement&rdquo;).
                </p>
                <p data-aos="fade-down">
                  By utilizing a separate Lease Agreement or otherwise
                  displaying terms relating to the lease as part of the online
                  booking process, the parties hereby acknowledge and agree that
                  (i) such separate Lease Agreement is directly between the
                  Guest and the Host; (ii) Spintrip is not a party to such
                  separate Lease Agreement; (iii) Lease Agreement executed is
                  solely at the parties&rsquo; own risk and expense; (iv)
                  nothing contained in the Lease Agreement, on the Platform, or
                  this Agreement is a substitute for the advice of legal
                  counsel; and (v) the parties have been hereby advised to
                  obtain local legal counsel to prepare, review and revise as
                  necessary the Lease Agreement to ensure compliance with
                  applicable laws. If there is any conflict between the terms of
                  a separate Lease Agreement and this Agreement, the terms of
                  this Agreement shall prevail.
                </p>

                <h2 className="mb-3 mt-5" data-aos="fade-down">
                  OFFLINE ARRANGEMENTS
                </h2>
                <p data-aos="fade-down">
                  Any instances where the Host and the Guest enter into a lease,
                  rental, or similar/analogous arrangement involving the
                  hiring/sharing/renting of the listed vehicle (by whatever name
                  called) with an intention to circumvent the Platform, while
                  using, attempting, or intending to wrongly benefit from
                  Spintrip Host Services or any other services on the Platform,
                  including without limitation, the additional insurance
                  coverage (herein any such arrangement to be referred to as
                  &ldquo;Offline Arrangements&rdquo;) shall be a contravention
                  of this Agreement. Please note that such Offline Arrangements
                  are not permitted for vehicle/s listed on the Platform. If any
                  such offer to lease a listed vehicle outside the Platform is
                  made to/by either Party (Host or Guest), the same should be
                  reported to Spintrip immediately. If you fail to follow these
                  requirements, you may be subject to a range of actions,
                  including limits on your access to Spintrip Host Services and
                  other services, restrictions on listings, suspension of your
                  account, application of Facilitation Fees, and recovery of our
                  expenses in policy monitoring and enforcement. Furthermore,
                  Offline Arrangements are explicitly excluded from any
                  Spintrip-offered insurance coverage or claims and Spintrip
                  shall in no case be held liable for any damages (direct or
                  indirect), consequential losses, loss of profit/business as
                  faced by Host or Guest entering into such an arrangement.
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
