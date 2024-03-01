import React, {useState} from "react";

const StateSort = ({ states, selectedStateParks, handleStateCheckboxChange }) => {
  const [dropdownStateOpen, setDropdownStateOpen] = useState(false);


  const toggleDropdownState = () => {
    setDropdownStateOpen(!dropdownStateOpen);
  };

  return (
    <div className="sort-by-state">
      <label>
        <div className={`dropdown ${dropdownStateOpen ? "open" : ""}`} onClick={toggleDropdownState}>
          <div className="dropdown-toggle-state">Sort by State:</div>
          <div className="dropdown-menu-state">
            {states.map((stateCode) => (
              <label key={stateCode} className="dropdown-item">
                <input
                  type="checkbox"
                  defaultChecked={selectedStateParks.some((park) => park.attributes.states === stateCode)}
                  onChange={() => handleStateCheckboxChange(stateCode)}
                  />
                {stateCode}
              </label>
            ))}
          </div>
        </div>
      </label>
    </div>
  );
};

export default StateSort;