
import React, { useState } from "react";
import {Marker, Popup} from 'react-map-gl';
import Pin from './pin.js'

const MarkerPop = (props) =>{

    const [showInfo, setInfo] = useState(false)
    const lat = props.lat
    const lng = props.lng
    const price = props.options.price
    const name = props.options.store
    const img = props.options.img
    //TODO:
    //Images from db or by reference
    //Child components
    const child = props.children
    return(
        <div>
        <Marker 
            latitude={lat}
            longitude={lng}
            offsetTop={-20}
            offsetLeft={-10}
            draggable={false}
            captureClick={true}
        >
            <div onClick={() => setInfo(!showInfo)}>
            ${price}
                <div>
                    <Pin/>
                </div>
            </div>
        </Marker>
        {showInfo && 
        <Popup
            latitude={lat}
            longitude={lng}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setInfo(false)}
            anchor="bottom" >
            <div>
                <img
                    src={require(`./${img}`)}
                    alt="woodSomething"
                    width="40"
                    height="40"
                    align="left"
                />
                <div>
                    <font color="black">
                        {name}
                    </font>
                </div>
                <font color="Green">
                    {`$${price}/plank`}
                </font>
            </div>
        </Popup>}
        </div>
    )

}

export default MarkerPop