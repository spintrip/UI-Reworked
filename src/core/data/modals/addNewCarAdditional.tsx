import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ImageWithBasePath from "../img/ImageWithBasePath";
import { postAdditionCarInfo } from "../../../feature-module/api/host";
import { getCarAdditionalInfo } from "../../../feature-module/api/postcar";
import { getAllFeatures } from "../../../feature-module/api/Features";
import {
  initializeFeature,
  updateFeaturePrice,
  deleteFeature
} from "../../../feature-module/api/Features";

interface AddNewCarAdditionalProps {
  carId: string;
  onActionComplete: () => void;
  setEditState: (state: boolean) => void;
}

interface Features {
  autoWindow: string;
  ac: string;
  musicSystem: string;
  sunroof: string;
  reverseCamera: string;
  sevenSeater: string;
  airBags: string;
}

interface ExtraFeatures {
  touchScreen: string;
  petFriendly: string;
  powerSteering: string;
  abs: string;
  tractionControl: string;
  fullBootSpace: string;
  keylessEntry: string;
  airPurifier: string;
  cruiseControl: string;
  voiceControl: string;
  usbCharger: string;
  bluetooth: string;
  airFreshner: string;
  ventelatedFrontSeat: string;
}

interface Addon {
  id: string;
  featureName: string;
  createdAt: string;
  updatedAt: string;
  carid?: string;
  price?: string;
}

interface CarAdditional {
  updatedFeatures: Addon[];
  carImages: string[];
  horsePower?: number;
  autoWindow?: boolean;
  ac?: boolean;
  musicSystem?: boolean;
  sunroof?: boolean;
  reverseCamera?: boolean;
  sevenSeater?: boolean;
  transmission?: boolean;
  fuelType?: boolean;
  airBags?: boolean;
  touchScreen?: boolean;
  petFriendly?: boolean;
  powerSteering?: boolean;
  abs?: boolean;
  tractionControl?: boolean;
  fullBootSpace?: boolean;
  keylessEntry?: boolean;
  airPurifier?: boolean;
  cruiseControl?: boolean;
  voiceControl?: boolean;
  usbCharger?: boolean;
  bluetooth?: boolean;
  airFreshner?: boolean;
  ventelatedFrontSeat?: boolean;
}

const AddNewCarAdditional: React.FC<AddNewCarAdditionalProps> = ({ carId,  onActionComplete,  setEditState}) => {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [images, setImages] = useState<Array<File | string>>([]);
  const [success, setSuccess] = useState(false);
  const [horsePower, setHorsePower] = useState<number | undefined>();
  const [fuelType, setFuelType] = useState<string>('Petrol');
  const [transmission, setTransmission] = useState<string>('Manual');
  const [features, setFeatures] = useState<Features>({
    autoWindow: "0",
    ac: "0",
    musicSystem: "0",
    sunroof: "0",
    reverseCamera: "0",
    sevenSeater: "0",
    airBags: "0",
  });

  const [extraFeatures, setExtraFeatures] = useState<ExtraFeatures>({
    touchScreen: "0",
    petFriendly: "0",
    powerSteering: "0",
    abs: "0",
    tractionControl: "0",
    fullBootSpace: "0",
    keylessEntry: "0",
    airPurifier: "0",
    cruiseControl: "0",
    voiceControl: "0",
    usbCharger: "0",
    bluetooth: "0",
    airFreshner: "0",
    ventelatedFrontSeat: "0",
  });

  const [, setOriginalImages] = useState<string[]>([]);
  const [originalFeatures, setOriginalFeatures] = useState<Features>({
    ...features,
  });
  const [originalExtraFeatures, setOriginalExtraFeatures] =
    useState<ExtraFeatures>({ ...extraFeatures });
  const [, setCarAdditional] = useState<CarAdditional | null>(
    null,
  );
  const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: { checked: boolean; price: number } }>({});

  const handleFeatureChange = (key: keyof Features) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: prev[key] === "0" ? "1" : "0",
    }));
  };
  AddNewCarAdditional.propTypes = {
    carId: PropTypes.string.isRequired,
    onActionComplete: PropTypes.func.isRequired,
    setEditState: PropTypes.func.isRequired,
  };
  useEffect(() => {
    if (carId) {
      getCarAdditionalInfo(carId)
        .then((data) => {
          const newFeatures = {
            autoWindow: data.carAdditionals.autoWindow ? "1" : "0",
            ac: data.carAdditionals.ac ? "1" : "0",
            musicSystem: data.carAdditionals.musicSystem ? "1" : "0",
            sunroof: data.carAdditionals.sunroof ? "1" : "0",
            reverseCamera: data.carAdditionals.reverseCamera ? "1" : "0",
            sevenSeater: data.carAdditionals.sevenSeater ? "1" : "0",
            airBags: data.carAdditionals.airBags ? "1" : "0",
          };
  
          const newExtraFeatures = {
            touchScreen: data.carAdditionals.touchScreen ? "1" : "0",
            petFriendly: data.carAdditionals.petFriendly ? "1" : "0",
            powerSteering: data.carAdditionals.powerSteering ? "1" : "0",
            abs: data.carAdditionals.abs ? "1" : "0",
            tractionControl: data.carAdditionals.tractionControl ? "1" : "0",
            fullBootSpace: data.carAdditionals.fullBootSpace ? "1" : "0",
            keylessEntry: data.carAdditionals.keylessEntry ? "1" : "0",
            airPurifier: data.carAdditionals.airPurifier ? "1" : "0",
            cruiseControl: data.carAdditionals.cruiseControl ? "1" : "0",
            voiceControl: data.carAdditionals.voiceControl ? "1" : "0",
            usbCharger: data.carAdditionals.usbCharger ? "1" : "0",
            bluetooth: data.carAdditionals.bluetooth ? "1" : "0",
            airFreshner: data.carAdditionals.airFreshner ? "1" : "0",
            ventelatedFrontSeat: data.carAdditionals.ventelatedFrontSeat ? "1" : "0",
          };
  
          setFeatures(newFeatures);
          setExtraFeatures(newExtraFeatures);
          setOriginalFeatures(newFeatures);
          setOriginalExtraFeatures(newExtraFeatures);
  
          setImages(data.carImages || []);
          setOriginalImages(data.carImages || []);
          setHorsePower(data.carAdditionals?.horsePower || 0);
          setFuelType(data.carAdditionals?.fuelType == 0 ? 'Petrol' : 'Diesel');
          setCarAdditional(data.carAdditionals);
          setTransmission(data.carAdditionals?.transmission ? 'Auto' : 'Manual');
  
          // Initialize selectedFeatures with existing features
          const existingSelectedFeatures = {};
          data.updatedFeatures.forEach((feature) => {
            existingSelectedFeatures[feature.featureid] = {
              checked: true,
              price: feature.price,
            };
          });
          setSelectedFeatures((prev) => ({
            ...prev,
            ...existingSelectedFeatures
          }));
        })
        .catch((error) => {
          console.error("Error fetching car additional info:", error);
        });
    }
  }, [carId]);
  

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const allFeatures = await getAllFeatures();
        const formattedFeatures = allFeatures.map((feature) => ({
          id: feature.id,
          featureName: feature.featureName,
          createdAt: feature.createdAt,
          updatedAt: feature.updatedAt,
          carid: "",
          price: 0,
        }));
        setAddons(formattedFeatures);

        // Merge the existing selected features with the fetched addons
        setSelectedFeatures((prev) => {
          const updatedSelectedFeatures = { ...prev };
          formattedFeatures.forEach((addon) => {
            if (!updatedSelectedFeatures[addon.id]) {
              updatedSelectedFeatures[addon.id] = { checked: false, price: 0 };
            }
          });
          return updatedSelectedFeatures;
        });
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchAddons();
  }, []);
  useEffect(() => {
    setSelectedFeatures(prev => {
      const updatedSelectedFeatures = { ...prev };
      addons.forEach(addon => {
        if (!updatedSelectedFeatures[addon.id]) {
          updatedSelectedFeatures[addon.id] = { checked: false, price: 0 };
        }
      });
      return updatedSelectedFeatures;
    });
  }, [addons]);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter(
      (file: File) => file.type === "image/png" || file.type === "image/jpeg",
    );

    if (validFiles.length !== files.length) {
      alert("Only PNG and JPG formats are allowed.");
      return;
    }

    setImages((prevImages) => [
      ...prevImages.filter((img) => typeof img === "string"),
      ...validFiles.slice(0, 5 - prevImages.length),
    ]);
  };

  const handleAdditionCarPostResponse = (error: any) => {
    setBtnLoading(false);
    if (error) {
      alert("Error Saving! Try Again Later");
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (onActionComplete) {
          onActionComplete();
        }
        setEditState(false); // Close the edit state
      }, 500);
    }
  };

  const handleAdditionCarInfoSubmit = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("carId", carId || "null");

    if (horsePower !== undefined && horsePower !== 0) {
      formData.append("horsePower", horsePower.toString());
    }

    if (fuelType) {
      formData.append("fuelType", fuelType === 'Petrol' ? '0' : '1');
    }

    if (transmission) {
      formData.append("transmission", transmission === 'Manual' ? '0' : '1');
    }


    for (const [key, value] of Object.entries(features)) {
      if (value !== originalFeatures[key as keyof Features]) {
        formData.append(key, value === "1" ? "1" : "0");
      }
    }

    for (const [key, value] of Object.entries(extraFeatures)) {
      if (value !== originalExtraFeatures[key as keyof ExtraFeatures]) {
        formData.append(key, value === "1" ? "1" : "0");
      }
    }

    images.forEach((image, index) => {
      if (typeof image === "string") {
        formData.append(`existingCarImage_${index + 1}`, image);
      } else {
        formData.append(`carImage_${index + 1}`, image);
      }
    });
    handleSave()
    postAdditionCarInfo(carId, formData, postAdditionalCallback);
  };

  async function postAdditionalCallback(error: any) {
    handleAdditionCarPostResponse(error);
    if (!error && onActionComplete) {
      onActionComplete();
    }
  }

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    setBtnLoading(true); // Start the loading spinner
    try {
      // Iterate over each selected feature and send it individually
      await Promise.all(
        Object.entries(selectedFeatures).map(async ([featureId, { price }]) => {
          await updateFeaturePrice(featureId, carId, price); // Call with direct parameters
        })
      );

      const data = await getCarAdditionalInfo(carId); // Refresh the car's additional info
      setCarAdditional(data.carAdditionals);
      onActionComplete(); // Trigger the completion callback
    } catch (error) {
      console.error("Error saving features:", error);
    } finally {
      setBtnLoading(false); // Stop the loading spinner
    }
  };

  const handleAddonClick = async (featureId: string) => {
    try {
      await initializeFeature(featureId, carId);
      const data = await getCarAdditionalInfo(carId);
      setCarAdditional(data.carAdditionals);
    } catch (error) {
      console.error("Error initializing feature:", error);
    }
  };

  const handlePriceChange = async (featureId: string, price: number) => {
    try {
      await updateFeaturePrice(featureId, carId, price);
      const data = await getCarAdditionalInfo(carId);
      setCarAdditional(data.carAdditionals);
    } catch (error) {
      console.error("Error updating feature price:", error);
    }
  };

  const handleDeleteAddon = async (featureId: string) => {
    try {
      await deleteFeature(featureId, carId);
      // Refresh the car's additional info after deletion to update the UI
      const data = await getCarAdditionalInfo(carId);
      setCarAdditional(data.carAdditionals);

      // Update selectedFeatures to remove the deleted feature
      setSelectedFeatures((prev) => {
        const updatedSelectedFeatures = { ...prev };
        delete updatedSelectedFeatures[featureId];
        return updatedSelectedFeatures;
      });
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  return (
    <div className="container mt-[20px]">
      <div className="row">
        <div className="col-xl-8">
          <h4 className="modal-title mb-4">
            Edit Car Additional Details{" "}
            <span className="listing-preview-carid">
              CarId : {carId}
            </span>
          </h4>
  
          <div className="bg-light border rounded shadow-sm p-3">
            <div className="my-4 min-h-[30vh] p-3">
              <form onSubmit={handleAdditionCarInfoSubmit}>
                <div className="row">
                  <p className="mb-1 mt-3 font-semibold">Photos</p>
                  <div className="row">
                    <div className="my-2">
                      <div className=" d-flex align-items-center justify-content-start flex-wrap">
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          multiple
                          style={{ display: "none" }}
                          id="fileInput"
                          onChange={handleImageUpload}
                        />
                        <button
                          type="button"
                          className="car-image-upload"
                          onClick={() =>
                            document.getElementById("fileInput")?.click()
                          }
                        >
                          <ImageWithBasePath
                            className="carlisting-upload"
                            src="assets/img/icons/image-upload-icon.png"
                            alt="Icon"
                          />
                        </button>
                        <div className="image-preview-listing">
                          {images.map((image, index) => (
                            <img
                              key={index}
                              src={
                                typeof image === "string"
                                  ? image
                                  : URL.createObjectURL(image)
                              }
                              alt={`Preview ${index + 1}`}
                              className="image-preview-listing"
                              onClick={() => removeImage(index)}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm mt-2">Add up to 5 photos</p>
                    </div>
                  </div>
                </div>
  
                <div className="row">
                  <p className="mb-1 mt-3 font-semibold">Essentials</p>
                  {Object.keys(features).map((key) => (
                    <div className="col-md-4" key={key}>
                      <div className="integration-grid">
                        <div className="integration-calendar">
                          <div className="integration-content d-flex align-items-center justify-content-between">
                            <h5>
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </h5>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input border border-primary border-2"
                              type="checkbox"
                              role="switch"
                              id={`flexSwitchCheck${key}`}
                              checked={features[key as keyof Features] === "1"}
                              onChange={() =>
                                handleFeatureChange(key as keyof Features)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
  
                <div className="row">
                  <p className="mb-1 mt-3 font-semibold">Additional Features</p>
                  {Object.keys(extraFeatures).map((key) => (
                    <div className="col-md-4" key={key}>
                      <div className="integration-grid">
                        <div className="integration-calendar">
                          <div className="integration-content d-flex align-items-center justify-content-between">
                            <h5>
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </h5>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input border border-primary border-2"
                              type="checkbox"
                              role="switch"
                              id={`flexSwitchCheck${key}`}
                              checked={
                                extraFeatures[key as keyof ExtraFeatures] === "1"
                              }
                              onChange={() =>
                                setExtraFeatures((prev) => ({
                                  ...prev,
                                  [key]: prev[key] === "0" ? "1" : "0",
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
  
                <div className="row">
                  <div className="col-md-4">
                    <div className="integration-grid">
                      <div className="integration-calendar">
                        <div className="integration-content d-flex align-items-center justify-content-between">
                          <h5>Horse Power</h5>
                        </div>
                        <div className="">
                          <input
                            className="form-control font-mono"
                            type="number"
                            onChange={(e) =>
                              setHorsePower(Number(e.target.value))
                            }
                            value={horsePower || ""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="integration-grid">
                      <div className="integration-calendar">
                        <div className="integration-content d-flex align-items-center justify-content-between">
                          <h5>Fuel Type</h5>
                        </div>
                        <div className="">
                          <select
                            className="form-control font-mono"
                            value={fuelType}
                            onChange={(e) => setFuelType(e.target.value)}
                          >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="integration-grid">
                      <div className="integration-calendar">
                        <div className="integration-content d-flex align-items-center justify-content-between">
                          <h5>Transmission</h5>
                        </div>
                        <div className="">
                          <select
                            className="form-control font-mono"
                            value={transmission}
                            onChange={(e) => setTransmission(e.target.value)}
                          >
                            <option value="Manual">Manual</option>
                            <option value="Auto">Auto</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
  
              {success && (
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
              )}
            </div>
          </div>
        </div>
        {/* car add ons */}
        <div className="col-xl-4 mt-5">
          <h6 className="mb-2 font-semibold">Add Ons</h6>
          <div className="border bg-light rounded shadow-sm px-2 py-3">
            {addons.map((addon) => {
              const isAddonPresent = selectedFeatures[addon.id]?.checked || false;
              const addonPrice = isAddonPresent
                ? selectedFeatures[addon.id]?.price || 0
                : 0;
  
              return (
                <div
                  key={addon.id}
                  className={`d-flex align-items-center my-2 ${
                    isAddonPresent ? "bg-warning" : "bg-light"
                  } rounded p-2`}
                >
                  <button
                    className={`font-semibold w-full rounded p-2 me-2 ${
                      isAddonPresent ? "btn-success" : ""
                    }`}
                    onClick={() => {
                      setSelectedFeatures((prev) => ({
                        ...prev,
                        [addon.id]: {
                          ...prev[addon.id],
                          checked: !isAddonPresent,
                        },
                      }));
                      if (!isAddonPresent) {
                        handleAddonClick(addon.id);
                      }
                    }}
                  >
                    <span className="text-uppercase font-semibold">
                      {addon.featureName}
                      {isAddonPresent ? " - Present" : " - Not Present"}
                    </span>
                    {isAddonPresent && <span className="ms-2">&#10003;</span>}
                  </button>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      className="form-control me-2"
                      value={addonPrice}
                      disabled={!isAddonPresent}
                      onChange={(e) => {
                        const value = Math.max(
                          0,
                          Math.min(2000, Number(e.target.value))
                        );
                        setSelectedFeatures((prev) => ({
                          ...prev,
                          [addon.id]: { ...prev[addon.id], price: value },
                        }));
                        if (isAddonPresent) {
                          handlePriceChange(addon.id, value);
                        }
                      }}
                    />
                    {isAddonPresent && (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteAddon(addon.id)}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
  
            <p className="mt-3">Available add ons at the moment</p>
          </div>
          <div className="container px-5 mt-4">
            <button
              className="btn btn-primary border font-bold w-100 font-semibold"
              onClick={handleAdditionCarInfoSubmit}
              disabled={btnLoading} // Disable button during loading
            >
              {btnLoading ? (
                <div
                  className="mx-3 spinner-border spinner-border-sm"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  

}

export default AddNewCarAdditional;
