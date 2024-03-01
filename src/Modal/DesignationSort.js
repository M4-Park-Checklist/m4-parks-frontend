import React, {useState} from "react";
import PropTypes from "prop-types";

const DesignationSort = ({ getUniqueDesignations, selectedDesignations, handleDesignationCheckboxChange }) => {
  const [dropdownDesignationOpen, setDropdownDesignationOpen] = useState(false);
  const toggleDropdownDesignation = () => {
    setDropdownDesignationOpen(!dropdownDesignationOpen);
  };

  return (
    <div className="sort-by-designation">
      <label>
        <div className={`dropdown ${dropdownDesignationOpen ? "open" : ""}`} onClick={toggleDropdownDesignation}>
          <div className="dropdown-toggle-des">Sort by Designation:</div>
          <div className="dropdown-menu-des">
            {getUniqueDesignations().map((designation) => (
              <label key={designation} className="dropdown-item">
                <input
                  type="checkbox"
                  defaultChecked={selectedDesignations.includes(designation)}
                  onChange={() => handleDesignationCheckboxChange(designation)}
                />
                {designation}
              </label>
            ))}
          </div>
        </div>
      </label>
    </div>
  );
};

DesignationSort.propTypes = {
  getUniqueDesignations: PropTypes.func.isRequired,
  selectedDesignations: PropTypes.array.isRequired,
  handleDesignationCheckboxChange: PropTypes.func.isRequired,
}

export default DesignationSort;