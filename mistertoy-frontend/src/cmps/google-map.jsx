import React, { useState } from "react"
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '50%', margin: 'auto' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyCB0AieRfE8jFeAQWL8okf7J69APWc8VTI" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    lat={32.5}
                    lng={35}
                    text={<span style={{ color: 'red', fontWeight: '900' }} className="material-symbols-outlined">location_on</span>}
                />
                <AnyReactComponent
                    lat={31.5}
                    lng={34.6}
                    text={<span style={{ color: 'red', fontWeight: '900' }} className="material-symbols-outlined">location_on</span>}
                />
                <AnyReactComponent
                    lat={31.8}
                    lng={34.6}
                    text={<span style={{ color: 'red', fontWeight: '900' }} className="material-symbols-outlined">location_on</span>}
                />
            </GoogleMapReact>
            <button onClick={() => handleClick({lat: 31.8, lng:35})}>Jerusalem</button>
            <button onClick={() => handleClick({lat: 31.5, lng:34.6})}>Sderot</button>
            <button onClick={() => handleClick({lat: 32.5, lng:35})}>Pardes Hanna</button>
        </div>
    );
}