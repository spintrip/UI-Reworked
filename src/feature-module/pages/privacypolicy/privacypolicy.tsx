import React, { useEffect } from "react";
import Breadcrumbs from "../../common/Breadcrumbs";
import AOS from "aos";
import "aos/dist/aos.css";
import useScrollToTop from "../../../hooks/useScrollToTop";

const PrivacyPolicy = () => {
  useScrollToTop();
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);
  return (
    <div className="main-wrapper">
      <Breadcrumbs
        maintitle="Privacy Policy"
        title="Privacy Policy"
        subtitle="Pages"
      />
      <div className="privacy-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="terms-policy">
              <h1 className="text-black mb-5" style={{ fontSize: '32px', fontWeight: '700' }}>
  Spintrip Car Rentals Pvt Ltd Privacy Policy
</h1>

<p data-aos="fade-down">
  <strong>
    THIS PRIVACY POLICY IS AN ELECTRONIC RECORD IN THE FORM OF AN ELECTRONIC CONTRACT FORMED UNDER THE INFORMATION TECHNOLOGY ACT, 2000 AND THE RULES MADE THEREUNDER AND THE AMENDED PROVISIONS PERTAINING TO ELECTRONIC DOCUMENTS/RECORDS IN VARIOUS STATUTES AS AMENDED BY THE INFORMATION TECHNOLOGY ACT, 2000. THIS PRIVACY POLICY DOES NOT REQUIRE ANY PHYSICAL, ELECTRONIC, OR DIGITAL SIGNATURE.
  </strong>
</p>
<p data-aos="fade-down">
  <strong>
    THE TERMS "WE/US/OUR/SPINTRIP" INDIVIDUALLY AND COLLECTIVELY REFER TO SPINTRIP RENTALS PVT LTD AND THE TERMS "YOU/YOUR/YOURSELF" REFER TO THE USERS/MEMBERS UNDER THE MEMBERSHIP AGREEMENT.
  </strong>
</p>
<p data-aos="fade-down">
  <strong>
    THIS PRIVACY POLICY IS A LEGALLY BINDING DOCUMENT BETWEEN YOU AND SPINTRIP (BOTH TERMS DEFINED ABOVE).
  </strong>
</p>
<p data-aos="fade-down">
  <strong>
    THIS DOCUMENT IS PUBLISHED AND SHALL BE CONSTRUED IN ACCORDANCE WITH THE PROVISIONS OF THE INFORMATION TECHNOLOGY (REASONABLE SECURITY PRACTICES AND PROCEDURES AND SENSITIVE PERSONAL DATA OR INFORMATION) RULES, 2011 UNDER INFORMATION TECHNOLOGY ACT, 2000; THAT REQUIRE PUBLISHING OF THE PRIVACY POLICY FOR COLLECTION, USE, STORAGE AND TRANSFER OF SENSITIVE PERSONAL DATA OR INFORMATION.
  </strong>
</p>
<p data-aos="fade-down">
  <strong>
    PLEASE READ THIS PRIVACY POLICY CAREFULLY. BY USING THE WEBSITE, YOU INDICATE THAT YOU UNDERSTAND, AGREE AND CONSENT TO THIS PRIVACY POLICY. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT USE THIS WEBSITE. YOU HEREBY PROVIDE YOUR UNCONDITIONAL & IRREVOCABLE CONSENT TO SPINTRIP FOR THE PURPOSES PRESCRIBED UNDER INCLUDING BUT NOT LIMITED TO PROVISIONS OF SECTIONS 43A, 72 AND SECTION 72A OF INFORMATION TECHNOLOGY ACT, 2000.
  </strong>
</p>

<p data-aos="fade-down">
  This Privacy Policy (the “Policy”) sets out how Spintrip collects, uses, protects, and shares any information that you give to us when you use this website i.e. <a href="https://www.spintrip.in">www.spintrip.in</a> including its mobile application (the “Website”). Spintrip is committed to ensuring that your privacy is protected to all possible, reasonable, and commercial extents, as your privacy on the Internet is of the utmost importance to us.
</p>

<p data-aos="fade-down">
  By providing us your Information or by making use of the facilities provided by the Website, You hereby consent to the collection, storage, processing, and transfer of any or all of Your Personal Information and Non-Personal Information by Spintrip, as specified under this Policy.
</p>

<p data-aos="fade-down">
  This Policy is a legally binding contract between You and Spintrip, whose Website You use or access or You otherwise deal with. This Policy shall be read together with the other terms and conditions of the Website viz, Membership Agreement, and Fees Policy being displayed on the website <a href="https://www.spintrip.in">www.spintrip.in</a>.
</p>

<h2 className="mt-5 mb-3" data-aos="fade-down">Collection, Storage, and Use of Personal Information</h2>
<p data-aos="fade-down">When You apply for or maintain an account with Spintrip, We collect certain personally identifiable information (“Personal Information”), such as:</p>
<ul data-aos="fade-down">
  <li>Your name, age, gender, photograph, contact preferences, telephone number, addresses, email, financial info, IP address, transaction history, driving license, and more as outlined in our Membership Agreement.</li>
  <li><strong>Vehicle Use Data:</strong> Our vehicles have hardware to transmit driving data for safety and service enhancement.</li>
  <li><strong>Location Tracking:</strong> We track your vehicle's location for safety, emergency, legal, and insurance purposes. This data may be shared with authorities if needed.</li>
  <li><strong>Driver and Vehicle Information:</strong> By using our platform, you allow us to access your driving history, vehicle data, and authorize third parties to share such info with us.</li>
</ul>

<p data-aos="fade-down">
  You can request Spintrip to stop using your personal data anytime by closing your account (after clearing dues/bookings). Some data may be stored anonymized for compliance.
</p>

<p data-aos="fade-down">
  We may share limited data with third-party services for fraud prevention, PayLater checks, customer service, etc., as per their privacy terms.
</p>

<h2 className="mt-5 mb-3" data-aos="fade-down">Collection and Use of Non-Personal Information</h2>
<p data-aos="fade-down">
  We collect non-personal data (e.g., browser, usage metrics) to improve our services. If combined with personal info, it will be treated as personal.
</p>
<p data-aos="fade-down">
  <strong>Aggregate Information:</strong> We may share anonymous, aggregated usage stats with third parties (like ad networks) to understand trends.
</p>

<h2 className="mt-5 mb-3" data-aos="fade-down">Cookies</h2>
<p data-aos="fade-down">
  We use cookies and similar technologies to improve your experience. Disabling cookies may impact some features. We may also use web beacons for analytics.
</p>

<h2 className="mt-5 mb-3" data-aos="fade-down">Information Sharing</h2>
<ol data-aos="fade-down">
  <li><strong>To processors and service providers:</strong> Only on our instructions, with proper confidentiality agreements in place.</li>
</ol>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
