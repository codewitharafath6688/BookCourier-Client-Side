import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  console.log(serviceCenters);
  const mapRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coordinates = [district.latitude, district.longitude];
      console.log(district, coordinates);
      mapRef.current.flyTo(coordinates, 12);
    }
  };
  return (
    <div className="w-250 mx-auto mt-8">
      <h2 className="text-2xl font-bold">
        Our service centers are available in 64 districts
      </h2>
      <form onSubmit={handleSearch} className="mt-4">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" name="location" required placeholder="Search" />
        </label>
      </form>
      <div className="border h-105 w-full mt-4">
        <MapContainer
          className="h-full"
          center={position}
          zoom={8}
          ref={mapRef}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((serviceCenter, index) => (
            <Marker
              key={index}
              position={[serviceCenter.latitude, serviceCenter.longitude]}
            >
              <Popup>
                <span className="font-bold">{serviceCenter.district}</span>{" "}
                <br />{" "}
                <span>
                  Service Areas: {serviceCenter.covered_area.join(", ")}
                </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
