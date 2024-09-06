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
                <h1 className="text-black" style={{fontSize:'32px', fontWeight:'700'}}>
                  Host Policy • Spintrip Car Rentals Pvt Ltd
                </h1>
                <h2 className="mt-5" data-aos="fade-down">
                  TERMS OF USE
                </h2>
                <p data-aos="fade-down">
                  This document is a legally binding document effective upon
                  your acceptance (directly or indirectly in electronic form or
                  by means of an electronic record) and forms part of the
                  Governing Policies for availing services offered through the
                  website and mobile application under the name and style of
                  &ldquo;Spintrip&rdquo; (&ldquo;Platform&rdquo;).
                </p>
                <h3 className="mt-5 mb-3" data-aos="fade-down">
                  Background
                </h3>
                <p data-aos="fade-down">
                  The Platform is owned by Spintrip Car Rentals Pvt Ltd, a
                  company incorporated under the Companies Act, 1956, having its
                  corporate office at 001 Hemanth Govind Apartments, BEML
                  layout, ITPL main road, Bangalore, Karnataka-560037
                  (hereinafter referred to as &ldquo;Spintrip&rdquo; or
                  &ldquo;we&rdquo; or &ldquo;us&rdquo; or &ldquo;our&rdquo;,
                  which expression unless the context may otherwise require to
                  include its successors, liquidators, and assigns) and the
                  guest users or the registered users of the Platform, who are
                  natural or legal persons (hereinafter referred to as
                  &ldquo;User&rdquo; or &ldquo;you&rdquo; or &ldquo;your&rdquo;
                  or &ldquo;yourself&rdquo;).
                </p>
                <p data-aos="fade-down">
                  Through this Platform, Spintrip enables and facilitates the
                  Users to list and lease vehicles directly with one another as
                  per the terms and conditions of this document and other
                  policies on the Platform, to the extent applicable. Spintrip
                  does not sell, hire, manage, and/or control the vehicle.
                </p>
                <p data-aos="fade-down">
                  All provisions in these Terms of Use, together with Spintrip
                  Host Services Terms &amp; Conditions – Host &amp; Lessee,
                  Privacy Policy, and any other incorporated policies/agreements
                  constitute the terms of the agreement between you and Spintrip
                  for the use of the Platform and services offered by Spintrip
                  thereon (together, the &ldquo;Governing Policies&rdquo;).
                </p>
                <p data-aos="fade-down">
                  Please read these terms carefully before using or registering
                  on the Platform or accessing any material, information, or
                  availing services through the Platform. If you do not agree
                  with these Terms of Use, please do not use the Platform or
                  avail any bookings or services being offered through this
                  Platform. If you use or transact on the Platform, you shall be
                  subject to the policies that are applicable to the Platform
                  for such use or transaction. By accepting the Terms of Use for
                  use of the Platform, you shall be contracting with Spintrip
                  and these Terms of Use, as applicable, shall constitute your
                  binding obligations with Spintrip.
                </p>
                <p data-aos="fade-down">
                  We reserve the right, at our discretion, to change or modify
                  these Terms of Use. You agree that the updated terms and
                  conditions shall be effective from the date of publication of
                  the same on the Platform. It shall be your responsibility to
                  periodically check for any changes to the Terms of Use and
                  other policies on the Platform. We may require you to provide
                  your consent to the updated agreement in a specified manner
                  before any further use of the Platform and the Spintrip
                  services. If no such separate consent is sought, your
                  continued use of the Platform will constitute your acceptance
                  of such changes. You may decline such changes by discontinuing
                  your bookings or services, as the case may be, made on the
                  Platform. Subject to your acceptance and compliance with these
                  Terms of Use, Spintrip grants you a personal, non-exclusive,
                  non-transferable, limited privilege to access, enter, and use
                  the Platform. By accepting these Terms of Use, you also accept
                  and agree to be bound by the other terms and conditions and
                  applicable Governing Policies, as may be posted on the
                  Platform from time to time.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  Your Account and Registration Obligations
                </h2>
                <h3 data-aos="fade-down">Eligibility:</h3>
                <p data-aos="fade-down">
                  Only legal persons or natural individuals competent to
                  contract under the existing law of the land may use the
                  Platform and avail services as provided by Spintrip. Spintrip
                  reserves the right to terminate your registration and/or deny
                  access to the Platform if it is brought to Spintrip&rsquo;s
                  notice that you are not competent to contract as mentioned
                  herein.
                </p>
                <h3 data-aos="fade-down">User Information:</h3>
                <p data-aos="fade-down">
                  If you use the Platform as a registered user, you are
                  responsible for maintaining the confidentiality of your User
                  ID and Password. You are responsible for all activities that
                  occur under your User ID and Password. You agree, inter alia,
                  to provide true, accurate, current, and complete information
                  about yourself as prompted by the Platform registration form
                  or provided by you as a visitor or user of a third-party site
                  through which you access the Platform.
                </p>
                <p data-aos="fade-down">
                  If you provide any information that is untrue, inaccurate, not
                  current or incomplete, or Spintrip has reasonable grounds to
                  suspect that such information is untrue, inaccurate, not
                  current or incomplete, or you are trying to gain unlawful
                  access to the Platform, it has the right to indefinitely
                  suspend or terminate or block access of your registration with
                  the Platform and refuse to provide you with access to the
                  Platform.
                </p>
                <p data-aos="fade-down">
                  You understand and agree that a third-party shall not be
                  authorized to use your account. You understand and acknowledge
                  that allowing other individuals to use your credentials to
                  avail Spintrip services on the Platform will hold you solely
                  liable for any damages or liabilities arising out of such use
                  caused to yourselves, other Users, or Spintrip without
                  prejudice to their right to invoke legal action or proceedings
                  against you and the other User to the full extent permissible
                  under Indian law.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  Fees and Taxes
                </h2>
                <p data-aos="fade-down">
                  You are responsible for paying all fees (if any) associated
                  with the use of the Platform, and you agree to bear any and
                  all applicable taxes, charges, cesses, etc. levied thereon.
                </p>

                <h2 data-aos="fade-down">Use of the Platform</h2>
                <p data-aos="fade-down">
                  You agree, undertake and confirm that your use of the Platform
                  shall be strictly governed by the following:
                </p>
                <ul data-aos="fade-down">
                  <li>
                    You are solely responsible for your information, and the
                    Platform acts only as a passive conduit for distribution and
                    publication of your information. You shall not host,
                    display, upload, modify, publish, transmit, update, or
                    share/list(s) any information or item, including but not
                    limited to documents for identification or listing of the
                    vehicle that are false, inaccurate, and misleading or
                    impersonating a person or belong to another person over
                    which you have no right.
                  </li>
                  <li>
                    You are prohibited from assigning or transferring your
                    account to any other user, person, or entity.
                  </li>
                  <li>
                    You agree that you shall not violate any applicable law for
                    the time being in force in India.
                  </li>
                  <li>
                    You shall not use the app to post anything grossly harmful,
                    harassing, blasphemous, defamatory, obscene, pornographic,
                    paedophilic, libellous, invasive of another&apos;s privacy,
                    hateful, or racially, ethnically objectionable, disparaging,
                    relating or encouraging money laundering or gambling, or
                    otherwise unlawful in any manner whatever; or unlawfully
                    threatening or unlawfully harassing, including but not
                    limited to &ldquo;indecent representation of women&rdquo; or
                    harmful to minors.
                  </li>
                  <li>
                    You shall not attempt to use any intellectual property
                    rights of Spintrip or a third-party partner linked to our
                    Platform, including any patent, trademark, copyright or
                    other proprietary rights or trade secrets or rights of
                    publicity or privacy.
                  </li>
                  <li>
                    You shall not make use of any other computer code, software
                    viruses, files or programs designed to interrupt, destroy or
                    limit the functionality of any computer resource; or
                    contains any Trojan horses, worms, time bombs, cancelbots,
                    easter eggs or other computer programming routines that may
                    damage, detrimentally interfere with, diminish value of,
                    surreptitiously intercept or expropriate any system, data,
                    or personal information.
                  </li>
                  <li>
                    You shall not, directly or indirectly, offer, attempt to
                    offer, trade, or attempt to trade in any item, the dealing
                    of which is prohibited or restricted in any manner under the
                    provisions of any applicable law, rule, regulation, or
                    guideline for the time being in force.
                  </li>
                  <li>
                    You shall not create liability for Spintrip or cause
                    Spintrip to lose or disrupt (in whole or in part) the
                    services of our service providers or other suppliers.
                  </li>
                  <li>
                    You shall not link directly or indirectly to or include
                    descriptions of items, goods, or services that are
                    prohibited under the Governing Policies or any other
                    applicable law for the time being in force in India.
                  </li>
                </ul>

                <h2 data-aos="fade-down">Privacy</h2>
                <p data-aos="fade-down">
                  The Platform collects, stores, processes, and uses your
                  information in accordance with the{" "}
                  <a href="https://spintrip.in/policy#privacy">
                    Privacy Policy
                  </a>
                  . By using the Platform and/or by providing your information,
                  you consent to the collection and use of the information you
                  disclose on the Platform in accordance with the Privacy
                  Policy.
                </p>

                <h2 data-aos="fade-down">Payment Facility</h2>
                <p data-aos="fade-down">
                  Spintrip may, either by itself or through its business
                  partners, from time-to-time contract with third-party payment
                  service providers, including banks, to open nodal bank
                  accounts under applicable Indian laws, to facilitate the
                  payment between Users, i.e., owners and lessees, and for
                  collection of fees and other charges on the Platform. These
                  third-party payment service providers may include third-party
                  banking or credit card payment gateways, payment aggregators,
                  cash on delivery or demand draft/pay order on delivery service
                  providers, mobile payment service providers, or through any
                  facility as may be authorized by applicable law for
                  collection, refund, and remittance, as the case may be of
                  payment, or supporting the same in any manner.
                </p>

                <h2 data-aos="fade-down">Disclaimers</h2>
                <ul data-aos="fade-down">
                  <li>
                    The Platform may be under constant upgrades, and some
                    functions and features may not be fully operational.
                  </li>
                  <li>
                    Due to the vagaries that can occur in the electronic
                    distribution of information and due to the limitations
                    inherent in providing information obtained from multiple
                    sources, there may be delays, omissions, or inaccuracies in
                    the content provided on the Platform or delay or errors in
                    functionality of the Platform. As a result, we do not
                    represent that the information posted is correct in every
                    case.
                  </li>
                  <li>
                    We expressly disclaim all liabilities that may arise as a
                    consequence of any unauthorized use of credit, debit cards,
                    or any other payment option available on the Platform.
                  </li>
                  <li>
                    You acknowledge that third-party services are available on
                    the Platform. We may have formed partnerships or alliances
                    with some of these third parties from time to time in order
                    to facilitate the provision of certain services to you.
                    However, you acknowledge and agree that at no time are we
                    making any representation or warranty regarding any third
                    party&apos;s services, nor will we be liable to you or any
                    third party for any consequences or claims arising from or
                    in connection with such third party, including, but not
                    limited to, any liability or responsibility for death,
                    injury, or impairment.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostPrivacyPolicy;
