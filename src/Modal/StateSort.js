import React, {useState} from "react";
import PropTypes from "prop-types";

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

StateSort.propTypes = {
  states: PropTypes.arrayOf(PropTypes.shape("")),
  selectedStateParks: PropTypes.array.isRequired,
  handleStateCheckboxChange: PropTypes.func.isRequired
}

export default StateSort;