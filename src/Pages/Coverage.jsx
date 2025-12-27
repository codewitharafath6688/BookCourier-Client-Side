import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import L from "leaflet";

// ✅ FIX: Leaflet marker icon paths
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Coverage = () => {
  const position = [23.685, 90.3563]; // Bangladesh center
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district && mapRef.current) {
      mapRef.current.flyTo(
        [district.latitude, district.longitude],
        12
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 my-5 px-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
        Our service centers are available in 64 districts
      </h2>

      <form onSubmit={handleSearch} className="mt-6 flex justify-center">
        <label className="input input-bordered flex items-center gap-2 w-full sm:w-96">
          <input
            type="search"
            name="location"
            required
            placeholder="Search district"
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
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((serviceCenter, index) => (
            <Marker
              key={index}
              position={[
                serviceCenter.latitude,
                serviceCenter.longitude,
              ]}
            >
              <Popup>
                <strong>{serviceCenter.district}</strong>
                <br />
                Service Areas:{" "}
                {serviceCenter.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
