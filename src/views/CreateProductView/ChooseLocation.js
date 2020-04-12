import React, { useState } from "react";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  Popup,
  WebMercatorViewport,
} from "react-map-gl";
import MarkerPop from "components/Map/MarkerPop.js";
import { Typography, Tooltip } from "@material-ui/core";
import Pin from "components/Map/pin.js";
import { css } from "styled-components";
import MAP_STYLE from "components/Map/map-style-basic-v8.json";
import { FormContext } from "./FormContext";
import styled from "styled-components";

const StyledGeoContainer = styled.div`
  position: absolute;
  top: 6px;
  left: 50px;
  z-index: 10;
  border: 2px solid none;
`;

const parseAddress = (data) => {
  console.log(`⭐: parseAddress -> data`, data);
  let city, state, country, zipcode;
  if (data.context) {
    data.context.forEach((v, i) => {
      if (v.id.indexOf("place") >= 0) {
        city = v.text;
      }
      if (v.id.indexOf("postcode") >= 0) {
        zipcode = v.text;
      }
      if (v.id.indexOf("region") >= 0) {
        state = v.text;
      }
      if (v.id.indexOf("country") >= 0) {
        country = v.text;
      }
    });
  }
  const [longitude, latitude] = data.geometry.coordinates;
  const addressObj = {
    longitude,
    latitude,
    address: `${data.address} ${data.text}`,
    city,
    state,
    zipcode,
    country,
    complete: data.place_name,
  };
  console.log("PARSED ADDRESS", addressObj);
  return addressObj;
};

const MapBoxWrap = (props) => {
  const targetRef = React.useRef();
  const {
    register,
    unregister,
    setValue,
    getValues,
    errors,
  } = React.useContext(FormContext);
  const [viewport, setViewport] = useState({
    //2000 width is more than a full 1080p screen
    width: "100%",
    height: "100%",
    longitude: -98.4936,
    latitude: 29.4241,
    zoom: 8,
  });
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [markLoc, setMarkLoc] = useState({
    display: false,
    latitude: viewport.latitude,
    longitude: viewport.longitude,
  });

  const geolocateStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10,
  };

  const queryParams = {
    country: "us",
  };

  const mapAccess = {
    mapboxApiAccessToken:
      "pk.eyJ1Ijoia2hpbGFyaW8iLCJhIjoiY2s3dHZ4eHlqMDFiazNqcGE2aWJ1anBmMSJ9.AVB7C3U09RcuLw3Km_DZmA",
  };
  const onSelect = (viewport, item) => {
    console.log(`⭐: onSelect -> item`, item);
    setViewport(viewport);
    setMarkLoc({
      display: true,
      latitude: viewport.latitude,

      longitude: viewport.longitude,
    });
  };

  const handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    setMarkLoc({
      display: true,
      latitude: viewport.latitude,

      longitude: viewport.longitude,
    });

    return setViewport({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  const mapRef = React.useRef();

  const geocoderContainerRef = React.useRef();
  React.useEffect(() => {
    register({ name: "address" }, { required: true });

    return () => unregister("address"); // unregister input after component unmount
  }, [register]);
  const [errOpen, setErrOpen] = React.useState(false);

  React.useEffect(() => {
    let timer = false;
    if (errors?.address) {
      setErrOpen(true);
      timer = setTimeout(() => {
        setErrOpen(false);
      }, 3000);
    }

    return () => {
      if (timer) {
        return clearTimeout(timer);
      }
    };
  }, [errors]);
  //

  return (
    <>
      <div style={{ position: "absolute", top: 0, zIndex: 100 }}></div>

      {/* <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          // width: "100%",
          // height: "100%",
          // position: "relative"
        }}
        // ref={targetRef}
      > */}
      <Tooltip
        title="Please enter an address."
        placement="right"
        leaveDelay={1000}
        open={errOpen}
        arrow
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <StyledGeoContainer tabindex="0" ref={geocoderContainerRef} />
      </Tooltip>
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: 60,
          zIndex: 8,
          left: 10,

          // height: "30%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: "10px",
            maxWidth: "240px",
            marginBottom: "10px",
            boxShadow: "0 0 10px 2px rgba(0,0,0,.04)",
            padding: "10px 10px 20px 10px",
          }}
        >
          <Typography variant="h5" style={{ fontWeight: 560 }}>
            Address
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Choose an address where the material will be picked up
          </Typography>
        </div>
      </div>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoia2hpbGFyaW8iLCJhIjoiY2s3dHZ4eHlqMDFiazNqcGE2aWJ1anBmMSJ9.AVB7C3U09RcuLw3Km_DZmA"
        {...viewport}
        // mapStyle={"mapbox://styles/mapbox/outdoors-v11"}
        mapStyle={MAP_STYLE}
        style={{ zIndex: 1, borderRadius: "10px" }}
        ref={mapRef}
        // {...dimensions}
        // width={"100%"}
        // height="100%"
        onViewportChange={setViewport}
        dragRotate={false}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={false}
        />

        <Geocoder
          {...mapAccess}
          mapRef={mapRef}
          viewport={viewport}
          ref={register({ required: "Please enter an address" })}
          containerRef={geocoderContainerRef}
          // countries="us"
          bbox={[-99.1237160829, 28.9783559303, -97.7792641786, 29.9397083015]}
          updateInputOnSelect={true}
          onSelected={onSelect}
          initialInputValue={" "}
          position="top-left"
          onViewportChange={handleGeocoderViewportChange}
          onResult={(res) => {
            setValue("address", parseAddress(res?.result));
            console.log(
              `⭐: MapBoxWrap -> parseAddress(res?.result)`,
              parseAddress(res?.result)
            );
            console.log("RESULT: ", res);
            console.log("GETVALUES::: ", getValues());
          }}
          mapboxApiAccessToken="pk.eyJ1Ijoia2hpbGFyaW8iLCJhIjoiY2s3dHZ4eHlqMDFiazNqcGE2aWJ1anBmMSJ9.AVB7C3U09RcuLw3Km_DZmA"
        />

        {/* {markLoc.display && (
          <Marker
            latitude={markLoc.latitude}
            longitude={markLoc.longitude}
            offsetTop={-20}
            offsetLeft={-10}
            captureClick={true}
          >
            <div>
              <Pin />
            </div>
          </Marker>
        )} */}
      </ReactMapGL>
      {/* </div> */}
    </>
  );
};

export default MapBoxWrap;
