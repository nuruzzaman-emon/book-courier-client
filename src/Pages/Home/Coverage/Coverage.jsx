import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
const Coverage = ({ mapData }) => {
      const mapRef = useRef(null);
    
  const position = [23.685, 90.3563];

  return (
    <div>
      <h2 className="text-4xl md:text-5xl text-center font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent my-12">
        Meet All Our Libraries
      </h2>
      <div className="w-11/12 h-[800]">
        <MapContainer ref={mapRef} center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
