import React, { useEffect } from "react";
// import Breadcrumbs from "../../common/Breadcrumbs";
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
                  Fee Policy • Spintrip Car Rentals Pvt Ltd
                </h1>
                <p data-aos="fade-down">
                  <strong>
                    THIS PRIVACY POLICY IS AN ELECTRONIC RECORD IN THE FORM OF
                    AN ELECTRONIC CONTRACT FORMED UNDER THE INFORMATION
                    TECHNOLOGY ACT, 2000 AND THE RULES MADE THEREUNDER AND THE
                    AMENDED PROVISIONS PERTAINING TO ELECTRONIC
                    DOCUMENTS/RECORDS IN VARIOUS STATUTES AS AMENDED BY THE
                    INFORMATION TECHNOLOGY ACT, 2000. THIS PRIVACY POLICY DOES
                    NOT REQUIRE ANY PHYSICAL, ELECTRONIC, OR DIGITAL SIGNATURE.
                  </strong>
                </p>
                <p data-aos="fade-down">
                  <strong>
                    THE TERMS &quot;WE/US/OUR/SPINTRIP&quot; INDIVIDUALLY AND
                    COLLECTIVELY REFER TO SPINTRIP CAR RENTALS PVT LTD AND THE
                    TERMS &quot;YOU/YOUR/YOURSELF&quot; REFER TO THE
                    USERS/MEMBERS UNDER THE MEMBERSHIP AGREEMENT.
                  </strong>
                </p>
                <p data-aos="fade-down">
                  <strong>
                    THIS PRIVACY POLICY IS A LEGALLY BINDING DOCUMENT BETWEEN
                    YOU AND SPINTRIP (BOTH TERMS DEFINED ABOVE).
                  </strong>
                </p>
                <p data-aos="fade-down">
                  <strong>
                    THIS DOCUMENT IS PUBLISHED AND SHALL BE CONSTRUED IN
                    ACCORDANCE WITH THE PROVISIONS OF THE INFORMATION TECHNOLOGY
                    (REASONABLE SECURITY PRACTICES AND PROCEDURES AND SENSITIVE
                    PERSONAL DATA OR INFORMATION) RULES, 2011 UNDER INFORMATION
                    TECHNOLOGY ACT, 2000; THAT REQUIRE PUBLISHING OF THE PRIVACY
                    POLICY FOR COLLECTION, USE, STORAGE AND TRANSFER OF
                    SENSITIVE PERSONAL DATA OR INFORMATION.
                  </strong>
                </p>
                <p data-aos="fade-down">
                  <strong>
                    PLEASE READ THIS PRIVACY POLICY CAREFULLY. BY USING THE
                    WEBSITE, YOU INDICATE THAT YOU UNDERSTAND, AGREE AND CONSENT
                    TO THIS PRIVACY POLICY. IF YOU DO NOT AGREE WITH THE TERMS
                    OF THIS PRIVACY POLICY, PLEASE DO NOT USE THIS WEBSITE. YOU
                    HEREBY PROVIDE YOUR UNCONDITIONAL &amp; IRREVOCABLE CONSENT
                    TO SPINTRIP FOR THE PURPOSES PRESCRIBED UNDER INCLUDING BUT
                    NOT LIMITED TO PROVISIONS OF SECTIONS 43A, 72 AND SECTION
                    72A OF INFORMATION TECHNOLOGY ACT, 2000.
                  </strong>
                </p>
                <p data-aos="fade-down">
                  This Privacy Policy (the &ldquo;Policy&rdquo;) sets out how
                  Spintrip collects, uses, protects, and shares any information
                  that you give to us when you use this website i.e.{" "}
                  <a href="https://spintrip.in">www.spintrip.in</a>{" "}
                  including its mobile application (the &ldquo;Website&rdquo;).
                  Spintrip is committed to ensuring that your privacy is
                  protected to all possible, reasonable, and commercial extents,
                  as your privacy on the Internet is of the utmost importance to
                  us. Because we gather certain types of information about You
                  in order to provide, protect, maintain and improve our
                  services, We feel You should fully understand the Policy
                  surrounding the capture and use of that information and
                  solicit Your full attention towards it.
                </p>
                <p data-aos="fade-down">
                  By providing us your Information or by making use of the
                  facilities provided by the Website, You hereby consent to the
                  collection, storage, processing, and transfer of any or all of
                  Your Personal Information and Non-Personal Information by
                  Spintrip, as specified under this Policy. You further
                  represent and warrant that such collection, use, storage, and
                  transfer of Your Information shall not cause any loss or
                  wrongful gain to you or any other person.
                </p>
                <p data-aos="fade-down">
                  This Policy is a legally binding contract between You and
                  Spintrip, whose Website You use or access or You otherwise
                  deal with. This Policy shall be read together with the other
                  terms and conditions of the Website viz, Membership Agreement,
                  and Fees Policy being displayed on the website{" "}
                  <a href="https://spintrip.in">www.spintrip.in</a>.
                </p>

                <h2 className="mb-3 my-5" data-aos="fade-down">
                  Collection, Storage, and Use of Personal Information:
                </h2>
                <p data-aos="fade-down">
                  When You apply for or maintain an account with Spintrip, We
                  collect certain personally identifiable information
                  (&ldquo;Personal Information&rdquo;), such as:
                </p>
                <ul data-aos="fade-down">
                  <li>
                    Your name, age, gender, photograph, contact preferences,
                    telephone number, mailing address, including but not limited
                    to permanent and current residential addresses, e-mail
                    address, financial information, internet protocol address,
                    history of Your transactions (booking and payment history),
                    any other items of sensitive personal data or information,
                    as such term is defined under the Information Technology
                    (Reasonable Security Practices And Procedures And Sensitive
                    Personal Data Of Information) Rules, 2011 enacted under the
                    Information Technology Act, 2000, identification code of
                    Your communication device which You use to access the
                    Website, any other information that You provide during Your
                    registration, use of availing of services via Website and
                    other relevant documents viz; driving license and additional
                    address cum identity proofs, as prescribed under the
                    Membership Agreement of Spintrip. By providing information
                    to create a user account or complete Your user profile, You
                    expressly and voluntarily accept this Policy and You shall
                    be deemed to have voluntarily consented to authenticate
                    Yourself with a government-issued photo identity document
                    which also contains your address, other than driver&rsquo;s
                    license, (hereafter &ldquo;Government-issued ID&rdquo;) and
                    hereby give Your voluntary consent for seeding
                    identification details as provided in Government-issued ID
                    to all Membership requirements and to provide Your identity
                    information for authentication for the purpose of availing
                    of the Services and to enforce any breach committed by you
                    of the Membership Agreement through police,
                    government/enforcement authority or court of law.
                  </li>
                  <li>
                    Vehicle Use Data: Vehicles will contain hardware that
                    gathers and transmits information about vehicle use. This is
                    done as a security measure against accident or theft and
                    also to provide You with valuable services and information,
                    such as other drivers data.
                  </li>
                  <li>
                    Location Tracking: To prevent theft, and to allow us to
                    locate You in case of emergency, accident, lock-out, etc.,
                    We track the location of your vehicle. Your location
                    information will be confined to Spintrip&rsquo;s service,
                    and we endeavor not to make your location or movements
                    public unless it is required under personal, medical, and
                    legal (recovery and insurance) exigencies. As part of our
                    service, the location of your vehicle may be released to
                    insurance companies, the police, courts, tribunals, or
                    similar law enforcement agencies, in the course of an
                    investigation and/or accident claim, and to provide
                    assistance in emergencies. Information regarding the
                    location of each vehicle on Spintrip&rsquo;s Website is also
                    transmitted to Spintrip.
                  </li>
                  <li>
                    Driver and Vehicle Information: As a member of
                    Spintrip&rsquo;s Website, you authorize us to access Your
                    driver&rsquo;s record, vehicle travel history report
                    pertaining to Your ride/trip from all applicable entities
                    and authorities&rsquo;. Moreover, You authorize all DMVs,
                    RMVs, auto mechanics, and all other entities and interested
                    parties to release information to us regarding Your driving
                    record and vehicle travel history.
                  </li>
                </ul>
                <p data-aos="fade-down">
                  You have the right to request Spintrip to discontinue the use
                  of Your personal information. To withdraw Your consent to our
                  collection and processing of Your information in the future,
                  You may do so by closing your account. However, the registered
                  mobile number and transactional details shall be collected and
                  stored in an anonymized manner for accounting and security
                  purposes. Should you choose to sign up for your account using
                  the existing number in our database, first-time user
                  (&ldquo;FTU&rdquo;) discount benefits shall not be applicable
                  to YOU and/or on YOUR account. Please note that in case there
                  is an outstanding payable at your end or if there is an
                  ongoing/upcoming booking or listing on the Spintrip Platform
                  made by you, to withdraw your consent or seek deletion of data
                  collected or being processed by us you shall have to clear the
                  payables or complete/cancel the booking/listing (as the case
                  may be).
                </p>
                <p data-aos="fade-down">
                  As you access and use our services we collect information such
                  as, but not limited to - phone number, email address, device
                  make-details, and IP address. We may disclose to third-party
                  services certain information to ensure fraud prevention and
                  PayLater checkout experience. The information may also be
                  disclosed to third-party vendors like call centers and
                  customer care vendors for the purpose of carrying out services
                  as provided by Spintrip. Please refer to the third-party
                  privacy policy for more details.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  Collection and Use of Non-Personal Information
                </h2>
                <p data-aos="fade-down">
                  We also collect non-personal information &ndash; data in a
                  form that does not permit direct association with any specific
                  individual, including the browser You use, usage details, and
                  identifying technologies. We may use, transfer, collect and
                  disclose non-personal information for any purpose. If We do
                  combine non-personal information with personal information,
                  the combined information will be treated as personal
                  information for as long as it remains combined.
                </p>
                <h3 data-aos="fade-down">Aggregate Information:</h3>
                <p data-aos="fade-down">
                  We may share non-personally identifiable information (such as
                  referring/exit pages, anonymous usage data, and URLs, platform
                  types, number of clicks, etc.) with interested third parties
                  to help them understand the usage patterns for certain
                  Spintrip services.
                </p>
                <p data-aos="fade-down">
                  Third-party ad servers or ad networks may serve advertisements
                  on the Website. These third-party ad servers or ad networks
                  may automatically receive Your internet protocol address when
                  they serve ads to Your Internet browser. They may also use
                  other technologies (such as cookies, JavaScript, or web
                  beacons) to measure the effectiveness of their advertisements
                  and to personalize the advertising content. However, please
                  note that if an advertiser asks Spintrip to show an
                  advertisement to a certain audience and you respond to that
                  advertisement, the advertiser or ad-server may conclude that
                  You fit the description of the audience they are trying to
                  reach. Spintrip&rsquo;s Policy does not apply to, and we
                  cannot control the activities of, third-party advertisers.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  Cookies
                </h2>
                <p data-aos="fade-down">
                  We use various technologies, including &ldquo;cookies,&rdquo;
                  to collect non-identifiable information. A cookie is a piece
                  of data that any website can send to Your browser, which may
                  then be stored on Your computer as an anonymous tag that
                  identifies Your computer but not You. To enhance Our Service,
                  some Spintrip pages use cookies, sent by Spintrip or its
                  third-party vendors, or other technologies. You may control
                  the effect of cookies through Your browser settings, however,
                  some features of Spintrip&rsquo;s Service may not work
                  properly if Your use of cookies is disabled.
                </p>
                <p data-aos="fade-down">
                  We may also use Web beacons or other technologies, often in
                  conjunction with cookies, to enhance Our Service on a number
                  of pages of Spintrip&rsquo;s Website. A non-identifiable
                  notice of a visitor&rsquo;s visit to a page on
                  Spintrip&rsquo;s site is generated and recorded, which may be
                  processed by us or by Our suppliers. To disable some of these
                  features, You may disable cookies in Your web browser&rsquo;s
                  settings. Web beacons and other technologies will still detect
                  visits to these pages, but the notices they generate are
                  disregarded and cannot be associated with other
                  non-identifiable cookie information.
                </p>

                <h2 className="mt-5 mb-3" data-aos="fade-down">
                  Information Sharing
                </h2>
                <p data-aos="fade-down">
                  Spintrip only shares Personal Information with third parties
                  in the following limited circumstances:
                </p>
                <ol data-aos="fade-down">
                  <li>
                    <strong>
                      To provide other businesses or persons for the purpose of
                      processing personal information on our behalf.
                    </strong>{" "}
                    We require that these parties agree to process such
                    information based on Our instructions and in compliance with
                    this Policy and any other appropriate confidentiality and
                    security measures.
                  </li>
                  <li>
                    <strong>
                      We have a good faith belief that access, use,
                      preservation, or disclosure of such information is
                      reasonably necessary to:
                    </strong>{" "}
                    (a) satisfy any applicable law, regulation, legal process,
                    or enforceable governmental request, (b) enforce applicable
                    Terms of Service, including investigation of potential
                    violations thereof, (c) detect, prevent, or otherwise
                    address fraud, security, or technical issues, or (d) protect
                    against imminent harm to the rights, property, or safety of
                    Spintrip, its users, or the public as required or permitted
                    by law.
                  </li>
                </ol>

                <p data-aos="fade-down">
                  This privacy policy will help you understand how Spintrip uses
                  and protects the data you provide to us when you visit and use
                  the website.
                </p>
                <p data-aos="fade-down">
                  We reserve the right to update this privacy policy at any
                  time, so please check back periodically. By continuing to use
                  the website after any changes to this privacy policy, you
                  agree to accept those changes.
                </p>
                <p className="mb-0" data-aos="fade-down">
                  If you have any questions or concerns about our privacy policy
                  or data processing, please contact us at{" "}
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
