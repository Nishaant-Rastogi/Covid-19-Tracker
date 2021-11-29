import React, { useState } from 'react'
import './Map.css'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { showDataOnMap } from './util'

const Map = ({ countries, casesTypes, center, zoom }) => {
    console.log(casesTypes);
    const [map, setMap] = useState(null);
    if (map) {
        map.flyTo(center);
    }
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }
    function ShowDataOnMap() {
        return showDataOnMap(countries, casesTypes);
    }
    return (
        <MapContainer
            className="map"
            center={center}
            zoom={zoom}
            whenCreated={setMap}
            scrollWheelZoom={false}
        >
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <ShowDataOnMap />
        </MapContainer>
    )
}

export default Map
