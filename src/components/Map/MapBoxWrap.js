import React, { useState } from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  Popup,
  FlyToInterpolator,
  WebMercatorViewport,
} from "react-map-gl";
import MarkerPop from "./MarkerPop.js";
import Pin from "./pin.js";
import styled from "styled-components";
import "./mapcss.css";
import { useDispatch, useSelector } from "react-redux";
import ProductMarker from "./ProductMarker";
const MapBoxWrap = ({ width = "100%", height = 300, x, y }) => {
  const { listings, loading, mapLocation, currentProductId } = useSelector(
    (s) => s.listings
  );

  const [viewport, setViewport] = useState({
    ...mapLocation,
    width: "100%",
    height: height,
    zoom: 12,
  });

  React.useEffect(() => {
    setTransitionEnd(false);
    const wmVp = new WebMercatorViewport({
      longitude: mapLocation.longitude,
      latitude: mapLocation.latitude,
      zoom: 12,
    });

    const [newLong, newLat] =
      x && y
        ? wmVp.getMapCenterByLngLatPosition({
            pos: [x / 2, y / 4],
            lngLat: [mapLocation.longitude, mapLocation.latitude],
          })
        : [mapLocation.longitude, mapLocation.latitude];
    const newViewport = {
      ...viewport,
      latitude: newLat,
      longitude: newLong,
      zoom: 12,
      minZoom: 10,
      // transitionDuration: 1000,
      transitionDuration: "auto",
      transitionInterpolator: new FlyToInterpolator(),
    };
    setViewport(newViewport);
  }, [mapLocation]);

  function onViewportChange(viewport) {
    const bounds = {
      minLongitude: -99.1292,
      maxLongitude: -97.8009,
      minLatitude: 28.9618,
      maxLatitude: 29.9756,
    };

    if (viewport.longitude < bounds.minLongitude) {
      viewport.longitude = bounds.minLongitude;
    } else if (viewport.longitude > bounds.maxLongitude) {
      viewport.longitude = bounds.maxLongitude;
    } else if (viewport.latitude < bounds.minLatitude) {
      viewport.latitude = bounds.minLatitude;
    } else if (viewport.latitude > bounds.maxLatitude) {
      viewport.latitude = bounds.maxLatitude;
    }

    setViewport(viewport);
    // westlimit=-99.1292; southlimit=28.9618; eastlimit=-97.8009; northlimit=29.9756
    // -99.1237160829, 28.9783559303, -97.7792641786, 29.9397083015
  }
  const [transitionEnd, setTransitionEnd] = React.useState(false);
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
          overflow: "hidden",
        }}
        // ref={targetRef}
      >
        <ReactMapGL
          mapboxApiAccessToken="pk.eyJ1Ijoia2hpbGFyaW8iLCJhIjoiY2s3dHZ4eHlqMDFiazNqcGE2aWJ1anBmMSJ9.AVB7C3U09RcuLw3Km_DZmA"
          {...viewport}
          // transitionDuration={500}
          // transitionInterpolator={new FlyToInterpolator()}
          onTransitionEnd={() => {
            setTransitionEnd(true);
          }}
          // mapStyle={"mapbox://styles/haxzie/cjxg35uth252i1cmu2r0gomx7"}
          onViewportChange={onViewportChange}
          dragRotate={false}
        >
          {/* <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={false}
          /> */}

          {listings.map((product) => {
            if (product?.address) {
              return (
                <ProductMarker
                  showPopup={currentProductId === product.id && transitionEnd}
                  {...product}
                />
              );
            } else {
              return <></>;
            }
          })}
        </ReactMapGL>
      </div>
    </>
  );
};

export default MapBoxWrap;
