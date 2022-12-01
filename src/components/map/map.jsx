import React from 'react';
import { MapContainer, TileLayer , Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';

export default function GetMap({ coords, display_name }) {
  const { latitude, longitude } = coords;

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
    return null;
  }

  return (
    <div >
      <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            {display_name}
          </Popup>
        </Marker>
        <MapView />
      </MapContainer>
    </div>
  );
};