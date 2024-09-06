import React, { useEffect, useState } from "react";
import { mapKey } from "../../environment";
interface LocationDisplayProps {
  latitude: number | null;
  longitude: number | null;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({
  latitude,
  longitude,
}) => {
  const [address, setAddress] = useState("Fetching location...");

  useEffect(() => {
    const fetchAddress = async () => {
      if (latitude !== null && longitude !== null) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapKey}`,
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
          } else {
            setAddress("None");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          setAddress("Error fetching location");
        }
      } else {
        setAddress("No location to show");
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  return (
    <span className="location-display">
      <i className="feather icon-map-pin" />
      <span> {address.substring(0, 60)}.... </span>
    </span>
  );
};

export default LocationDisplay;
