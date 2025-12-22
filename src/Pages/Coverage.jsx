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
    <div className="max-w-6xl mx-auto mt-8 my-5 px-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
        Our service centers are available in 64 districts
      </h2>

      <form onSubmit={handleSearch} className="mt-6 flex justify-center">
        <label className="input input-bordered flex items-center gap-2 w-full sm:w-96">
          <svg
            className="h-5 w-5 opacity-50"
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>
          <input
            type="search"
            name="location"
            required
            placeholder="Search"
            className="grow"
          />
        </label>
      </form>

      <div className="border rounded-lg h-[300px] sm:h-[400px] md:h-[500px] w-full mt-6 overflow-hidden">
        <MapContainer
          className="h-full w-full"
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
                <span className="font-bold">{serviceCenter.district}</span>
                <br />
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
