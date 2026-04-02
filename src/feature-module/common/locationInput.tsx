// src/components/LocationInput.tsx
import React, { useRef, useState, useEffect } from "react";
import "./locationInput.css"; // Import the styles
import { mapKey } from "../../environment";
interface LocationInputProps {
  setLocation: (location: {
    lat: number;
    lng: number;
    address: string;
    city?: string;
    isValidLocation: boolean;
  }) => void;
  setInputValue: (value: string) => void; // Add this prop
  setHasSuggestions: (hasSuggestions: boolean) => void;
  initialValue?: string; // Add initialValue as an optional prop
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement> | any;
}

// Declare the google object on the window
declare global {
  interface Window {
    google: any;
  }
}

const loadGoogleMapsScript = (apiKey: string, callback: () => void) => {
  const existingScript = document.getElementById("googleMaps");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=places`;
    script.id = "googleMaps";
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};

const LocationInput: React.FC<LocationInputProps> = ({
  setLocation,
  setInputValue,
  setHasSuggestions,
  initialValue = "",
  placeholder = "Enter City, Airport, or Address",
  inputRef,
}) => {
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValueLocal] = useState<string>(initialValue);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (initialValue) {
      setInputValueLocal(initialValue); // Set initial input value
      setHasSuggestions(true); // Set hasSuggestions to true if initialValue is provided
    }
  }, [initialValue]);

  useEffect(() => {
    if (!inputValue) {
      setLocation({
        lat: 0,
        lng: 0,
        address: "",
        city: "",
        isValidLocation: false,
      });
    }
  }, [inputValue, setLocation]);

  useEffect(() => {
    loadGoogleMapsScript(mapKey, () => {
      setScriptLoaded(true);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValueLocal(value);
    setInputValue(value); // Update the inputValue state in Home
    if (value && scriptLoaded && window.google) {
      setShowSuggestions(true);
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: value }, (predictions: any[]) => {
        if (predictions) {
          setSuggestions(predictions.map((p) => p.description));
          setHasSuggestions(predictions.length > 0);
        } else {
          setSuggestions([]);
        }
      });
    } else {
      setShowSuggestions(false);
      setHasSuggestions(false);
    }
  };

  const handleClearInput = () => {
    setInputValueLocal("");
    setInputValue(""); // Clear input value in Home
    setSuggestions([]);
    setShowSuggestions(false);
    setHasSuggestions(false);
    setLocation({
      lat: 0,
      lng: 0,
      address: "",
      city: "",
      isValidLocation: false,
    });
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValueLocal(suggestion);
    setShowSuggestions(false);
    setHasSuggestions(true);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: suggestion },
      (results: { geometry: { location: any }; address_components: any[] }[], status: any) => {
        if (
          status === window.google.maps.GeocoderStatus.OK &&
          results &&
          results[0]
        ) {
          const location = results[0].geometry.location;
          let extractedCity = "";
          if (results[0].address_components) {
              for (const comp of results[0].address_components) {
                  if (comp.types.includes("locality")) {
                      extractedCity = comp.long_name;
                      break;
                  }
              }
              if (!extractedCity) {
                  for (const comp of results[0].address_components) {
                      if (comp.types.includes("administrative_area_level_3") || comp.types.includes("administrative_area_level_2")) {
                          extractedCity = comp.long_name;
                          break;
                      }
                  }
              }
          }
          
          // Aggressive fallback to prevent 500 server error on empty city
          if (!extractedCity && suggestion) {
              const parts = suggestion.split(',').map(s => s.trim());
              if (parts.length >= 3) extractedCity = parts[parts.length - 3];
              else if (parts.length >= 2) extractedCity = parts[parts.length - 2];
              else extractedCity = parts[0] || "";
          }

          setLocation({
            lat: location.lat(),
            lng: location.lng(),
            address: suggestion,
            city: extractedCity,
            isValidLocation: true,
          });
        } else {
          setLocation({
            lat: 0,
            lng: 0,
            address: "",
            city: "",
            isValidLocation: false,
          });
        }
      },
    );
  };

  return (
    <div className="location-input-container">
      <input
        type="text"
        ref={inputRef || autocompleteRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="form-control bg-light border border-secondary py-4 text-black font-raleway"
        disabled={!scriptLoaded} // Disable the input until the script is loaded
        style={{ fontSize: "14px" }}
      />
      {inputValue && (
        <span className="clear-icon" onClick={handleClearInput}>
          &times;
        </span>
      )}
      {showSuggestions && (
        <ul className="suggestions-list d-flex flex-column">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
