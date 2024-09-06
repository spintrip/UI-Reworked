import React from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
function LocationAlert() {
  return (
    <div className="location-alert bg-red-100 border border-danger rounded shadow-xl my-2 d-flex align-items-center justify-content-start p-2">
      <div className="row">
        <ImageWithBasePath
          className="alert-icon"
          src="assets/img/icons/danger-icon.png"
          alt="alert-pic"
        />
      </div>
      <div className="col">
        <span className="text-base text-danger font-semibold">
          Enter address
        </span>
      </div>
    </div>
  );
}

export default LocationAlert;
