import React, { useState } from "react";
import Geocoder from 'react-mapbox-gl-geocoder'
import ReactMapGL, {GeolocateControl, Marker, Popup} from 'react-map-gl';
import MarkerPop from './MarkerPop.js'
import Pin from './pin.js'

const MapBoxWrap = (props) => {

    const [viewport, setViewport] = useState({
        //2000 width is more than a full 1080p screen
        width: 500,
        height: 500,
        latitude: 29.4087,
        longitude: -98.5011,
        zoom: 8
    });

    const[markLoc, setMarkLoc] = useState({
        display: false,
        latitude: viewport.latitude,
        longitude: viewport.longitude,
    })

    const geolocateStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 10
    }

    const queryParams = {
        country: 'us'
    }

    const mapAccess = {
        mapboxApiAccessToken: 'pk.eyJ1Ijoia2hpbGFyaW8iLCJhIjoiY2s3dHZ4eHlqMDFiazNqcGE2aWJ1anBmMSJ9.AVB7C3U09RcuLw3Km_DZmA'
    }
    
    const onSelected = (viewport, item) => {
        setViewport({viewport})
        setMarkLoc({
          display: true,
          latitude: viewport.Latitude,
          longitude: viewport.Longitude
        })
        console.log(viewport)
        console.log(item)
    }


    return (
      <div>
      
      <Geocoder
        {...mapAccess} 
        viewport={viewport} 
        hideOnSelect={true}
        updateInputOnSelect={true}
        onSelected={onSelected}
        queryParams={queryParams}
        initialInputValue={""}
        input={""}
      />

      <ReactMapGL
        mapboxApiAccessToken = "pk.eyJ1Ijoia2hpbGFyaW8iLCJhIjoiY2s3dHZ4eHlqMDFiazNqcGE2aWJ1anBmMSJ9.AVB7C3U09RcuLw3Km_DZmA"
        {...viewport}
        onViewportChange={setViewport}
        dragRotate={false}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={false}
        />

        {/* { markLoc.display && 
        <Marker 
          latitude={markLoc.latitude}
          longitude={markLoc.longitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable={false}
          captureClick={true}
        > 
          <div>
            <Pin/>
          </div>
        </Marker>
        } */}

        <MarkerPop
            lat={29.4087}
            lng={-98.5011}
            options={{
                price: 11,
                img: 'wood1.jpg',
                store: 'Good Wood Wood Goods'
            }}
        />
      </ReactMapGL>
      </div>
    );
  }


export default MapBoxWrap