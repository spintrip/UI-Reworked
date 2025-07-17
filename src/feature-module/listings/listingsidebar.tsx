import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useSelector } from "react-redux";
import { RootState } from "../redux/types";

interface ListingSidebarProps {
  vehicleType: string;
  selectedFilters: { [key: string]: string[] };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] }>
  >;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
}

const ListingSidebar: React.FC<ListingSidebarProps> = ({
  vehicleType,
  selectedFilters,
  setSelectedFilters,
  handleSearchChange,
  resetFilters,
}) => {

  const handleCheckboxChange = (title: string, value: string) => {
    setSelectedFilters((prevState) => {
      const currentFilters = prevState[title] || [];
      const updatedFilters = currentFilters.includes(value)
        ? currentFilters.filter((item) => item !== value)
        : [...currentFilters, value];
      return { ...prevState, [title]: updatedFilters };
    });
  };

  const filterData = {
    "Category":
      vehicleType === "1"
        ? ["Scooter", "Cruiser", "Sports Bike", "Commuter"]
        : ["SUV", "Sedan", "Hatchback", "Compact suv"],
    "Type": ["Petrol", "Diesel"],
    Capacity: ["5 Seater", "7 Seater"],
    "Price (INR/Hr)": ["< 200", "200-400", "> 400"],
    Ratings: ["1 ⭐", "2 ⭐", "3 ⭐", "4 ⭐", "5 ⭐"],
  };

  return (
    <div className="container">
      <form
        action="#"
        autoComplete="off"
        className="sidebar-form border shadow text-black"
      >
        <div className="sidebar-heading">
          <h3>What Are You Looking For</h3>
        </div>
        <div className="product-search">
          <div className="form-custom">
            <input
              type="text"
              className="form-control border border font-raleway"
              id="member_search1"
              onChange={handleSearchChange}
            />
            <span>
              <ImageWithBasePath src="assets/img/icons/search.svg" alt="img" />
            </span>
          </div>
        </div>
        <div className="sidebar">
          <div className="sidebar-section">
            <h4 className="mb-3">Filters</h4>
            {Object.entries(filterData).map(([title, options]) => {
              // Skip "Capacity" when vehicleType is "1"
              if (title === "Capacity" && vehicleType === "1") return null;

              return (
                <div key={title} className="filter-group">
                  <h5 className="sidebar-grid-title">{title}</h5>
                  <div className="scrollable-checkboxes px-2 mt-2 mb-3 w-100 justify-content-between flex-wrap">
                    {options.map((option) => (
                      
                      <label
                        key={option}
                        className="custom_check font-mono d-flex overflow-hidden w-content"

                      >
                        <div className="">
                          
                          <input
                            type="checkbox"
                            value={option}
                            className="bg-black"
                            checked={(selectedFilters[title] || []).includes(option)}
                            onChange={() => handleCheckboxChange(title, option)}
                          />
                          {title === "Category" ? (
                            <img
                              src={`/assets/carTypes/${option.toLowerCase()}.png`}
                              alt={option}
                              className={`car-category-image p-2 rounded shadow-sm ${selectedFilters[title]?.includes(option)
                                ? "car-option-selected"
                                : ""
                                }`}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "contain",
                                  borderRadius: "10px",
                                  background: "#fff",
                                }}
                            />
                          ) : (
                            <span className="checkmark" />
                          )}
                          <span className="font-bold text-black">{option}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}

          </div>
          <hr />
        </div>
        <Link
          to="#"
          className="reset-filter bg-danger p-2 text-white font-semibold rounded"
          onClick={resetFilters}
        >
          Reset Filter
        </Link>
      </form>
    </div>
  );
};

export default ListingSidebar;
