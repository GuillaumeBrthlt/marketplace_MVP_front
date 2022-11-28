import React from 'react';
import { MapContainer, TileLayer , Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

export default function GetMap({ coords, display_name }) {
  const { latitude, longitude } = coords;

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
     //Sets geographical center and zoom for the view of the map
    return null;
  }

  return (
    <div style={{ maxHeight: "600px", maxWidth: "800px" }}>
      <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} style={{ minHeight: "600px", minWidth: "800px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            A pretty CSS3 popup.
          </Popup>
        </Marker>
        <MapView />
      </MapContainer>
    </div>
  );
};