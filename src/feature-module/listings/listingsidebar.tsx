import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";

interface ListingSidebarProps {
  selectedFilters: { [key: string]: string[] };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] }>
  >;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
}

const ListingSidebar: React.FC<ListingSidebarProps> = ({
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
    "Car Category": ["SUV", "Sedan", "Hatchback", "Compact suv"],
    "Car Type": ["Petrol", "Diesel", "Electric"],
    Capacity: ["5 Seater", "6 Seater", "7 Seater"],
    "Price (INR)": ["< 200/Day", "200-400", "> 400/Day"],
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
            {Object.entries(filterData).map(([title, options]) => (
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
                          checked={(selectedFilters[title] || []).includes(
                            option,
                          )}
                          onChange={() => handleCheckboxChange(title, option)}
                        />
                        {title === "Car Category" ? (
                          <img
                            src={`/assets/carTypes/${option.toLowerCase()}.png`}
                            alt={option}
                            className={`car-category-image  p-2 rounded shadow-sm ${selectedFilters[title] && selectedFilters[title].includes(option) ? "car-option-selected" : ""}`}
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
            ))}
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
