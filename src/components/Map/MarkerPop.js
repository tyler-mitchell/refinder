import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import Pin from "./pin.js";
import { Typography } from "@material-ui/core";

const MarkerPop = ({ lat, lng, options, children }) => {
  const [showInfo, setInfo] = useState(false);

  const price = options.price;
  const name = options.store;
  const img = options.img;
  //TODO:
  //Images from db or by reference
  //Child components

  return (
    <div>
      <Marker
        latitude={lat}
        longitude={lng}
        offsetTop={-20}
        offsetLeft={-10}
        draggable={true}
        captureClick={true}
      >
        <div onClick={() => setInfo(!showInfo)}>
          {/* ${price} */}
          <div>
            <Pin />
          </div>
        </div>
      </Marker>
      {showInfo && (
        <Popup
          latitude={lat}
          longitude={lng}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setInfo(false)}
          anchor="bottom"
        >
          <div>
            <img
              src={require(`./${img}`)}
              alt="woodSomething"
              width="40"
              height="40"
              style={{ borderRadius: "6px" }}
              align="left"
            />
            <div>
              <font color="black">{name}</font>
            </div>
            <font color="Green">{`$${price}/plank`}</font>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default MarkerPop;
