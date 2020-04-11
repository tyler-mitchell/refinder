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
const MapBoxWrap = ({ width = "100%", height = 300, x, y }) => {
  // console.log(`⭐: MapBoxWrap -> y`, y);
  // console.log(`⭐: MapBoxWrap -> x`, x);
  const { listings, loading, mapLocation } = useSelector((s) => s.listings);

  const [viewport, setViewport] = useState({
    //2000 width is more than a full 1080p screen
    ...mapLocation,
    width: "100%",
    height: height,
    zoom: 12,
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

  // const mapAccess = {
  //   mapboxApiAccessToken:
  //     "pk.eyJ1Ijoia2hpbGFyaW8iLCJhIjoiY2s3dHZ4eHlqMDFiazNqcGE2aWJ1anBmMSJ9.AVB7C3U09RcuLw3Km_DZmA",
  // };

  const onSelect = (viewport, item) => {
    setViewport(viewport);
    setMarkLoc({
      display: true,
      latitude: viewport.latitude,

      longitude: viewport.longitude,
    });
  };

  // function goToAddress(vp){
  //   const newViewPort = {

  //   }
  //   setViewport({...viewport, ...mapLocation,...vp})
  // }

  React.useEffect(() => {
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

    console.log(`⭐: MapBoxWrap -> mapLocation`, mapLocation);
    console.log(`⭐: MapBoxWrap -> newLong`, newLong);
    console.log(`⭐: MapBoxWrap -> newLat`, newLat);
    const newViewport = {
      ...viewport,
      latitude: newLat,
      longitude: newLong,
      zoom: 12,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    };
    setViewport(newViewport);
  }, [mapLocation]);
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
          mapStyle={"mapbox://styles/haxzie/cjxg35uth252i1cmu2r0gomx7"}
          onViewportChange={setViewport}
          dragRotate={false}
        >
          {/* <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={false}
          /> */}

          {/* {markLoc.display && ( */}

          {listings.map((product) => {
            if (product?.address) {
              return (
                <Marker
                  latitude={product.address.latitude || 29.4087}
                  longitude={product.address.longitude || -98.5011}
                  // offsetTop={-20}
                  // offsetLeft={-10}
                  markerColor={"red"}
                  draggable={false}
                  captureClick={true}
                >
                  <Pin />
                </Marker>
              );
            } else {
              return <></>;
            }
          })}
          {/* 
          <MarkerPop
            lat={29.4087}
            lng={-98.5011}
            options={{
              price: 11,
              img: "wood1.jpg",
              store: "Good Wood Wood Goods",
            }}
          /> */}
        </ReactMapGL>
      </div>
    </>
  );
};

export default MapBoxWrap;
