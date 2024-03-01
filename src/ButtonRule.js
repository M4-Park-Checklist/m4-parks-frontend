import React from 'react';

const CustomButton = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className="text-white bg-gradient-to-r from-black to-gray-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-500 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;