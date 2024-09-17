import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addNewCar } from "../../../feature-module/api/host";
import PropTypes from "prop-types";
import LocationInput from "../../../feature-module/common/locationInput";
import { getAllCarBrands } from "../../../feature-module/api/Cars";
interface PickupLocation {
  lat: number;
  lng: number;
  address: string;
  isValidLocation: boolean;
}

interface AddNewCarProps {
  onActionComplete: () => void;
}
interface CarBrand {
  brand_name: string;
  logo_path: string;
}

const AddNewCar: React.FC<AddNewCarProps> = ({ onActionComplete }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [carModel, setCarModel] = useState<string>("");
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
  const [brands, setBrands] = useState<CarBrand[]>([]);

  // get all brands useEffect
  useEffect(() => {
    const fetchBrands = async () => {
      const brandsData = await getAllCarBrands();
      
      setBrands(brandsData);
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (pickupLocation) {
      setLatitude(pickupLocation.lat);
      setLongitude(pickupLocation.lng);
    }
  }, [pickupLocation]);

  const requestData = {
    carId,
    carModel,
    type,
    color,
    brand,
    chassisNo,
    rcNumber,
    engineNumber,
    registrationYear,
    bodyType,
    mileage,
    latitude,
    longitude,
  };
  const handleAddCarResponse = (responseData: {
    postedCar: { carId: React.SetStateAction<number | null> };
  }) => {
    setBtnLoading(false);
    setCarID(responseData.postedCar.carId);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
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
    addNewCar(requestData)
      .then((response) => {
        handleAddCarResponse(response);
      })
      .catch((error) => {
        console.error("Error adding car:", error);
        setBtnLoading(false);
      });
  };

  const handleCancel = () => {
    if (onActionComplete) {
      onActionComplete();
    }
  };

  return (
    <div>
      <div
        className="modal new-modal fade my-[50px] pb-[100x]"
        id="add_new_car"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg mb-5">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Your Car Details</h4>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <label>
                        Car Brand <span className="text-danger">*</span>
                      </label>
                      <div>
                        <select
                          onChange={(e) => setBrand(e.target.value)}
                          required
                          className="font-mono w-100 border py-2 px-1 text-lg rounded-md text-black "
                          id="car-manufacturers"
                          name="car-manufacturers"
                        >
                          <option value="">Select Brand</option>
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
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <label>Car Model with Variant</label>
                      <div className="w-100">
                        <input
                          onChange={(e) => setCarModel(e.target.value)}
                          required
                          className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                          placeholder="Enter Car Model with Variant"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <label className="font-bold">Car Colour</label>
                      <div className="w-100">
                        <input
                          onChange={(e) => setColor(e.target.value)}
                          required
                          className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                          placeholder="Enter Car Colour"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <label>Car Chasis Number</label>
                      <div className="w-100">
                        <input
                          onChange={(e) => setChassisNo(e.target.value)}
                          className="font-mono  border text-black rounded-md text-lg w-100 px-1 py-2"
                          placeholder="Enter Car Chasis Number"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <label>Car Type</label>
                      <select
                        onChange={(e) => setType(e.target.value)}
                        required
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
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <label>RC Number</label>
                      <div className="w-100">
                        <input
                          onChange={(e) => setRcNumber(e.target.value)}
                          required
                          className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                          placeholder="Enter Car RC Number"
                          type="text"
                          style={{ textTransform: "uppercase" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <label>Engine Number</label>
                      <div className="w-100">
                        <input
                          onChange={(e) => setEngineNumber(e.target.value)}
                          className="font-mono  border text-black text-lg rounded-md w-100 px-1 py-2"
                          placeholder="Enter Car Engine Number"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="modal-form-group">
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
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <label>Car Chasis Build</label>
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
                  <div className="col-md-12">
                    <div className="modal-form-group">
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
                  </div>
                  <div className="row py-2 border mx-1 rounded">
                    <div className="col-12 col-md-12">
                      <div className="modal-form-group">
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
                      <div className="modal-form-group">
                        <label>Latitute</label>
                        <div className="w-100">
                          <input
                            disabled
                            required
                            className="font-mono border text-black text-lg rounded-md w-100 px-1 py-2"
                            placeholder="Latitute"
                            value={latitude}
                            type="text"
                            style={{ textTransform: "uppercase" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="modal-form-group">
                        <label>Longitute</label>
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
                            src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`}
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
              <div className="modal-btn d-flex align-items-center justify-content-between">
                <button
                  id="addCarModalCloseBtn"
                  className="btn btn-secondary"
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
                        !hasSuggestions
                      }
                    >
                      Add Car
                    </button>
                  )}
                </Link>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddNewCar.propTypes = {
  onActionComplete: PropTypes.func.isRequired,
};

export default AddNewCar;
