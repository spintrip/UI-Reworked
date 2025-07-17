import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addNewVehicle } from "../../../feature-module/api/host";
import PropTypes from "prop-types";
import LocationInput from "../../../feature-module/common/locationInput";
import { getAllCarBrands } from "../../../feature-module/api/Cars";
import { Modal, Button } from "react-bootstrap";
interface PickupLocation {
  lat: number;
  lng: number;
  address: string;
  isValidLocation: boolean;
}

interface AddNewCarProps {
  onActionComplete: () => void;
  setShowModal: (state: boolean) => void;
  showModal: boolean;
}
interface CarBrand {
  brand_name: string;
  logo_path: string;
}

const AddNewCar: React.FC<AddNewCarProps> = ({ onActionComplete, setShowModal, showModal }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [vehicleModel, setvehicleModel] = useState<string>("");
  const [vehicletype, setvehicletype] = useState<string>("");
  const [variant, setvariant] = useState<string>("");
  const [address, setaddress] = useState<string>("");
  const [city, setcity] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [chassisNo, setChassisNo] = useState<string>("");
  const [rcNumber, setRcNumber] = useState<string>("");
  const [engineNumber, setEngineNumber] = useState<string>("");
  const [registrationYear, setRegistrationYear] = useState<string>("");
  const [bodyType, setBodyType] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [carId, setCarID] = useState<number | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [pickupLocation, setPickupLocation] = useState<PickupLocation | null>(
    null,
  );
  const [hasSuggestions, setHasSuggestions] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  // const [brands, setBrands] = useState<CarBrand[]>([]);

  // // get all brands useEffect
  // useEffect(() => {
  //   const fetchBrands = async () => {
  //     const brandsData = await getAllCarBrands();

  //     setBrands(brandsData);
  //   };
  //   fetchBrands();
  // }, []);

  useEffect(() => {
    if (pickupLocation) {
      setLatitude(pickupLocation.lat);
      setLongitude(pickupLocation.lng);
    }
  }, [pickupLocation]);

  const requestData = {
    vehicleModel,
    vehicletype,  
    rcNumber,
    type,         
    brand,
    chassisNo,
    engineNumber,
    registrationYear,
    bodyType,
    variant,
    color,
    // mileage,
    address,
    latitude,
    longitude,
    city,
  };
  const handleAddCarResponse = (responseData: {
    vehicle: { vehicleid: React.SetStateAction<number | null> };
  }) => {
    setBtnLoading(false);
    setCarID(responseData.vehicle.vehicleid);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      if (onActionComplete) {
        onActionComplete();
      }
      setShowModal(false);
    }, 3000);
    const closeModalBtn = document.getElementById("addCarModalCloseBtn");
    closeModalBtn?.click();
    if (onActionComplete) {
      onActionComplete();
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setBtnLoading(true);
    addNewVehicle(requestData)
      .then((response) => {
        handleAddCarResponse(response);
      })
      .catch((error) => {
        console.error("Error adding Vehicle:", error);
        setBtnLoading(false);
      });
  };

  const handleCancel = () => {
    if (onActionComplete) {
      onActionComplete();
    }
    setShowModal(false);
  };

  const isFormValid = () => {
  
    return (
      vehicleModel &&
      color &&
      type &&
      brand &&
      chassisNo &&
      rcNumber &&
      registrationYear &&
      bodyType &&
      // mileage &&
      pickupLocation &&
      pickupLocation.isValidLocation
    );
  };

  return (
    <div className="main-wrapper">
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        centered
        size="lg"
        scrollable
        className="modal-add-car"
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title><h4 className="modal-title">Add Your Vehicle Details</h4></Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body-add-car">
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-md-12">
                  <div className="modal-form-group mt-2">
                    <label>Vehicle Type <span className="text-danger">*</span></label>
                    <select
                      onChange={(e) => setvehicletype(e.target.value)}
                      required
                      className="font-mono w-100 text-lg border py-2 px-1 rounded-md text-black"
                      id="vehicle-type-picker"
                      name="vehicle-type-picker"
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="1">Bike/Scooter</option>
                      <option value="2">Car</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="modal-form-group">
                    <label>
                      Vehicle Brand <span className="text-danger">*</span>
                    </label>
                    <div>
                      <input
                        onChange={(e) => setBrand(e.target.value)}
                        required
                        className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                        placeholder="Enter Brand Name"
                        value={brand}
                        type="text"
                      >
                        {/* <option value="">Select Brand</option>
                        {brands.map((brand) => (
                          <option
                            key={brand.brand_name}
                            value={brand.brand_name}
                            className="d-flex align-items-center justify-content-center  my-2"
                          >
                            <span className="font-mono">
                              {brand.brand_name}{" "}
                            </span>
                            <img
                              src={brand.logo_path}
                              alt={brand.brand_name}
                              className="w-10"
                            />
                          </option>
                        ))} */}
                      </input>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="modal-form-group mt-2">
                    <label>Vehicle Model with Variant</label>
                    <div className="w-100">
                      <input
                        onChange={(e) => setvehicleModel(e.target.value)}
                        required
                        className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                        placeholder="Enter Model with Variant"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="modal-form-group mt-2">
                    <label className="font-bold">Colour</label>
                    <div className="w-100">
                      <input
                        onChange={(e) => setColor(e.target.value)}
                        required
                        className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                        placeholder="Enter Colour"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="modal-form-group mt-2">
                    <label>Chasis Number</label>
                    <div className="w-100">
                      <input
                        onChange={(e) => setChassisNo(e.target.value)}
                        className="font-mono  border text-black rounded-md text-lg w-100 px-1 py-2"
                        placeholder="Enter Chasis Number"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                {vehicletype === "2" && (
                  <>
                    {/* Car Type */}
                    <div className="col-md-12">
                      <div className="modal-form-group mt-2">
                        <label>Car Type</label>
                        <select
                          onChange={(e) => setType(e.target.value)}
                          required={vehicletype === "2"}
                          className="font-mono  w-100 text-lg border py-2 px-1 rounded-md text-black"
                          id="car-type-picker"
                          name="car-type-picker"
                        >
                          <option value="null">Select Car Type</option>
                          <option value="Sedan">Sedan</option>
                          <option value="Hatchback">Hatchback</option>
                          <option value="Compact suv">Compact SUV</option>
                          <option value="SUV">SUV</option>
                        </select>
                      </div>
                    </div>

                    {/* Body Type */}
                    <div className="col-md-12">
                      <div className="modal-form-group mt-2">
                        <label>Body Type</label>
                        <input
                          onChange={(e) => setBodyType(e.target.value)}
                          required={vehicletype === "2"}
                          className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                          placeholder="Enter Car Body Type"
                          type="text"
                        />
                      </div>
                    </div>

                  </>
                )}
                {vehicletype === "1" && (
                  <>
                    {/* Car Type */}
                    <div className="col-md-12">
                      <div className="modal-form-group mt-2">
                        <label>Type</label>
                        <select
                          onChange={(e) => setType(e.target.value)}
                          required={vehicletype === "1"}
                          className="font-mono  w-100 text-lg border py-2 px-1 rounded-md text-black"
                          id="bike-type-picker"
                          name="bike-type-picker"
                        >
                          <option value="null">Select Type</option>
                          <option value="Commuter">Commuter</option>
                          <option value="Sports Bike">Sports Bike</option>
                          <option value="Cruiser">Cruiser</option>
                          <option value="Scooter">Scooter</option>
                          {/* <option value="Electric">Electric</option> */}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-md-12">
                  <div className="modal-form-group mt-2">
                    <label>RC Number</label>
                    <div className="w-100">
                      <input
                        onChange={(e) => setRcNumber(e.target.value)}
                        required
                        className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                        placeholder="Enter RC Number"
                        type="text"
                        style={{ textTransform: "uppercase" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="modal-form-group mt-2">
                    <label>Registration Year</label>
                    <select
                      onChange={(e) => setRegistrationYear(e.target.value)}
                      required
                      className="font-mono  w-100 border py-2 text-lg px-1 rounded-md text-black"
                      id="year-picker"
                      name="year-picker"
                    >
                      <option value="null">Select Year</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                      <option value="2014">2014</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="modal-form-group mt-2">
                    <label>Chasis Build</label>
                    <div className="w-100">
                      <input
                        onChange={(e) => setBodyType(e.target.value)}
                        required
                        className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                        placeholder="IRON/ FIBER"
                        type="text"
                        style={{ textTransform: "uppercase" }}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-12">
                  <div className="modal-form-group mt-2">
                    <label>Current Mileage</label>
                    <div className="w-100">
                      <input
                        onChange={(e) => setMileage(e.target.value)}
                        required
                        className="font-mono border text-black text-lg rounded-md w-100 px-1 py-2"
                        placeholder="km/l"
                        type="text"
                        style={{ textTransform: "uppercase" }}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="row py-2 border mx-1 rounded">
                  <div className="col-12 col-md-12">
                    <div className="modal-form-group mt-2">
                      <label>Address</label>
                      <div className="w-100">
                        {/* Location Input */}
                        <LocationInput
                          setLocation={setPickupLocation}
                          setInputValue={setInputValue}
                          setHasSuggestions={setHasSuggestions}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="modal-form-group mt-2" >
                      <label>Latitude</label>
                      <div className="w-100">
                        <input
                          disabled
                          required
                          className="font-mono border text-black text-lg rounded-md w-100 px-1 py-2"
                          placeholder="Latitude"
                          value={latitude}
                          type="text"
                          style={{ textTransform: "uppercase" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="modal-form-group mt-2">
                      <label>Longitude</label>
                      <div className="w-100">
                        <input
                          disabled
                          required
                          className="font-mono border text-black text-lg rounded-md w-100 px-1 py-2"
                          placeholder="Longitute"
                          value={longitude}
                          type="text"
                          style={{ textTransform: "uppercase" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`row host-car-location-display p-2 ${inputValue.length > 2 ? "bg-slate=-100" : ""}`}
                  >
                    <p>Location preview</p>
                    {/* put map here */}
                    {latitude == null || longitude == null ? (
                      <>
                        <iframe
                          src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`}
                          className="iframe-video"
                          loading={"lazy"}
                        />
                      </>
                    ) : (
                      <>
                        <iframe
                          src={`https://www.google.com/maps?q=${latitude},${longitude}&loading=async&hl=es;z=14&output=embed`}
                          className="iframe-video"
                          loading={"lazy"}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              You can edit these details anytime
            </form>

          </div>
        </Modal.Body>
        <Modal.Footer className="modal-btn d-flex align-items-center justify-content-between mb-5">

          <button
            id="addCarModalCloseBtn"
            className="btn btn-secondary m-2"
            type="button"
            data-bs-dismiss="modal"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <Link to="#" className="btn">
            {btnLoading ? (
              <div
                className="mx-3 spinner-border spinner-border-sm"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={
                  !pickupLocation ||
                  !pickupLocation.isValidLocation ||
                  !hasSuggestions ||
                  !isFormValid()
                }
              >
                Add Vehicle
              </button>
            )}
          </Link>

          {success ? (
            <div
              className="alert alert-success fixed-bottom w-60 mx-5 d-flex align-items-center justify-content-between"
              role="alert"
            >
              <p className="mr-2 fs-large">Saved Changes</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          ) : (
            <>
              {/* // <div className="alert alert-warning fixed-bottom w-60 mx-5 d-flex align-items-center justify-content-between" role="alert">
                //   <p className="mr-2 fs-large">Autosave</p>
                //   <div className="spinner-border spinner-border-sm" role="status">
                //     <span className="sr-only">Loading...</span>
                //   </div>
                // </div> */}
            </>
          )}
        </Modal.Footer>

      </Modal>
    </div>
  );
};

AddNewCar.propTypes = {
  onActionComplete: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default AddNewCar;
