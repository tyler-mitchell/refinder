import React from "react";
import AddDetails from "./AddDetails";
import AddPhotos from "./AddPhotos";

const ProductSteps = ({ activeStep }) => {
  switch (activeStep) {
    case 1:
      return <AddDetails />;
    case 2:
      return <AddPhotos />;

    case 3:
      return <div>Test</div>;
    case 4:
      return <AddDetails />;

    default:
      return;
  }
};

export default ProductSteps;
