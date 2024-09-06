import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Helmet } from "react-helmet";
import { androidAppLink, iosAppLink } from "../../../environment";
const DownloadApp = () => {
  const [, setOS] = useState<string>('');

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    
    const detectOS = () => {
      if (/android/i.test(userAgent)) {
        return 'Android';
      } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        return 'iOS';
      } else if (/windows/i.test(userAgent)) {
        return 'Windows';
      } else if (/mac/i.test(userAgent)) {
        return 'MacOS';
      } else if (/linux/i.test(userAgent)) {
        return 'Linux';
      } else {
        return 'Unknown';
      }
    };

    const osName = detectOS();
    setOS(osName);

    if (osName === 'Android') {
      window.location.href = androidAppLink;
    } else if (osName === 'iOS') {
      window.location.href = iosAppLink;
    }
  }, []); 

  return (
    <div className="main-wrapper">
      <Helmet>
        <title>Spintrip Car Rentals - Download Our Android App Now!</title>
        <meta
          name="description"
          content="Download the Spintrip Car Rentals app to easily book and manage your car rentals. Access exclusive deals, track your trips, and enjoy seamless car rental services in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals app, download car rental app, book cars, manage car rentals, car rental deals, Bangalore car rentals"
        />
      </Helmet>
      <div className="row my-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <ImageWithBasePath
            src="assets/img/android-phone-mockup.png"
            className="phone-prototype-image"
            alt="Download app"
          />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column px-5 align-items-center justify-content-center">
          <h2 className="coming-soon text-center">
            Get the Spintrip App!
          </h2>
          <p className="text-center mt-3">
            Experience the convenience of booking and managing your car rentals
            with just a few taps.
          </p>
          <p className="text-center mt-1">
            Stay ahead with real-time updates, notifications, and more – all in
            one place.
          </p>
          <div className="row my-4">
            <Link to={androidAppLink}>
          <div
            className="col-12 my-2 d-flex align-items-center justify-content-center object-fit-cover "
            >
            <ImageWithBasePath
                src="assets/img/download-apk.svg"
                className="img-fluid"
                alt="Download app"
            />
            </div>
            </Link>
            <Link to={iosAppLink}>
            <div
            className="col-12  my-2 d-flex align-items-center justify-content-center object-fit-cover "
            >
            <ImageWithBasePath
                src="assets/img/app-ios.svg"
                className="img-fluid"
                alt="Download app"
            />
            </div>
            </Link>

          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center mt-5">
          <Link to={'/'} className="btn-maintance btn btn-primary border border-warning">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
