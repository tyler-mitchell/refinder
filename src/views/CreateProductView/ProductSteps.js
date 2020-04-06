import React from "react";
import AddDetails from "./AddDetails";
import AddPhotos from "./AddPhotos";
import ChooseLocation from "./ChooseLocation";

const ProductSteps = ({ activeStep }) => {
  switch (activeStep) {
    case 1:
      return <AddDetails />;
    case 2:
      return <AddPhotos />;

    case 3:
      return (
        <div
          style={{
            overflow: "hidden",
            borderRadius: "6px",
            width: "100%",
            height: "100%",
          }}
        >
          <ChooseLocation />
        </div>
      );
    case 4:
      return <AddDetails />;

    default:
      return;
  }
};

export default ProductSteps;
