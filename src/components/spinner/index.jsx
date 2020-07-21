import React from "react";

import Loader from "react-loader-spinner";

const Spinner = ({ type, color, height, width }) => {
  return (
    <Loader
      type={type || "TailSpin"}
      color={color || "white"}
      height={height || 100}
      width={width || 100}
    />
  );
};

export default Spinner;
