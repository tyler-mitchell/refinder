import React, { useState } from "react";
import {
    GoogleMapProvider,
    InfoWindow,
    MapBox,
    Circle,
    Marker,
} from '@googlemap-react/core'

const NestedMarker = (props) => {

    const lat = props.lat
    const long = props.long
    const id = props.id
    const price = props.price
    const storeName = props.storeName
    //TODO: GETTING IMAGE FROM DB
    const imgName = props.imgName
    const [showInfo, setInfo] = useState(false)

    return (
        <div>
            <Marker
                id={id}
                onClick={() => setInfo(true)}
                opts={{
                    draggable: false,
                    label: `$${price}`,
                    position: { lat: lat, lng: long },
                }}
            />
            <InfoWindow
                anchorId={id}
                onCloseClick={() => setInfo(false)}
                visible={showInfo}
            >

                <div>
                    <img
                        src={require(`./${imgName}`)}
                        alt="woodSomething"
                        width="40"
                        height="40"
                        align="left"
                    />
                    <div>
                        <font color="black">
                            {storeName + " located in SA!"}
                        </font>
                    </div>
                    <font color="Green">
                        {`$${price}/plank`}
                    </font>
                </div>

            </InfoWindow>
        </div>

    )
}


const MaterialMap = props => {
    return (
        <>

            <GoogleMapProvider>
                <MapBox
                    apiKey="AIzaSyBUlrG6cCzYoP6SYOqbdmkjeZ2ApnyDCTk"
                    opts={{
                        center: { lat: 29.411711, lng: -98.500605 },
                        zoom: 16,
                        /*The lower the zoom the more zoom'ed out*/
                    }}
                    style={{
                        height: '50vh',
                        width: '100%',
                    }}
                    useDrawing={false}
                    useGeometry={true}
                    usePlaces={true}
                    LoadingComponent={true}
                    useVisualization
                    onCenterChanged={() => {
                        console.log('The center of the map has changed.')
                    }}
                />
                <NestedMarker
                    lat={29.410869}
                    long={-98.500328}
                    id="10xx"
                    price={15}
                    storeName="Salvation DIY"
                    imgName="wood1.jpg"
                />
                <NestedMarker
                    lat={29.414109}
                    long={-98.499849}
                    id="11xx"
                    price={11}
                    storeName="Almost Steel Wood"
                    imgName="wood2.jpg"
                />
                <NestedMarker
                    lat={29.409526}
                    long={-98.501975}
                    id="12xx"
                    price={13}
                    storeName="Office Planks for your Bank"
                    imgName="wood3.jpg"
                />
                <NestedMarker
                    lat={29.412499}
                    long={-98.503225}
                    id="13xx"
                    price={8}
                    storeName="Wood for Storage "
                    imgName="wood4.jpg"
                />
                <NestedMarker
                    lat={29.409588}
                    long={-98.497346}
                    id="14xx"
                    price={6}
                    storeName="SAY PLANKS!"
                    imgName="wood5.jpg"
                />
                <NestedMarker
                    lat={29.408755}
                    long={-98.501185}
                    id="15xx"
                    price={6}
                    storeName="Architects approved wood"
                    imgName="wood6.jpg"
                />


                <Circle
                    id="userLocation"
                    opts={{
                        draggable: false,
                        center: { lat: 29.411612, lng: -98.500585 },
                        radius: 20,
                        fillColor: "#0324fc",
                        strokeColor: "#03dffc",
                        strokeWidth: 10,
                        strokeOpacity: .5
                    }}
                />

            </GoogleMapProvider>
        </>
    )
}


export default MaterialMap