import React, { useState } from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import MarkerPop from "./MarkerPop.js";
import Pin from "./pin.js";
import { css } from "styled-components";
import "./mapcss.css";

const MapBoxWrap = props => {
  const targetRef = React.useRef();
  const [viewport, setViewport] = useState({
    //2000 width is more than a full 1080p screen
    width: "100%",
    height: 300,
    latitude: 29.4087,
    longitude: -98.5011,
    zoom: 12
  });
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });

  const [markLoc, setMarkLoc] = useState({
    display: false,
    latitude: viewport.latitude,
    longitude: viewport.longitude
  });

  const geolocateStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10
  };

  const queryParams = {
    country: "us"
  };

  const mapAccess = {
    mapboxApiAccessToken:
      "pk.eyJ1Ijoia2hpbGFyaW8iLCJhIjoiY2s3dHZ4eHlqMDFiazNqcGE2aWJ1anBmMSJ9.AVB7C3U09RcuLw3Km_DZmA"
  };

  const onSelect = (viewport, item) => {
    setViewport(viewport);
    setMarkLoc({
      display: true,
      latitude: viewport.latitude,

      longitude: viewport.longitude
    });
  };

  return (
    <>
      {/* <Geocoder
        {...mapAccess}
        viewport={viewport}
        hideOnSelect={true}
        updateInputOnSelect={true}
        onSelected={onSelect}
        queryParams={queryParams}
        initialInputValue={" "}
      /> */}

      <div
        className="map_box_container"
        style={{
          borderRadius: "10px",
          overflow: "hidden"
          // width: "100%",
          // height: "100%",
          // position: "relative"
        }}
        // ref={targetRef}
      >
        <ReactMapGL
          mapboxApiAccessToken="pk.eyJ1Ijoia2hpbGFyaW8iLCJhIjoiY2s3dHZ4eHlqMDFiazNqcGE2aWJ1anBmMSJ9.AVB7C3U09RcuLw3Km_DZmA"
          {...viewport}
          // {...dimensions}
          // width={"100%"}
          // height="100%"
          onViewportChange={setViewport}
          dragRotate={false}
        >
          {/* <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={false}
          /> */}

          {markLoc.display && (
            <Marker
              latitude={markLoc.latitude}
              longitude={markLoc.longitude}
              offsetTop={-20}
              offsetLeft={-10}
              draggable={false}
              captureClick={true}
            >
              <div>
                <Pin />
              </div>
            </Marker>
          )}

          <MarkerPop
            lat={29.4087}
            lng={-98.5011}
            options={{
              price: 11,
              img: "wood1.jpg",
              store: "Good Wood Wood Goods"
            }}
          />
        </ReactMapGL>
      </div>
    </>
  );
};

export default MapBoxWrap;
