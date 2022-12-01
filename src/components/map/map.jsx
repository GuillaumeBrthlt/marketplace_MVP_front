import React from 'react';
import L from 'leaflet'
import { MapContainer, TileLayer , Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
iconUrl: icon,
shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

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
          <img src='assets/images/marker-icon.png' alt='marker'>
          </img>
          <Popup>
            {display_name}
          </Popup>
        </Marker>
        <MapView />
      </MapContainer>
    </div>
  );
};