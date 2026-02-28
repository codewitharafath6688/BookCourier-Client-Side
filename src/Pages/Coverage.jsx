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
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

    {/* Section Header */}
    <div className="text-center space-y-3">
      <h2 className="text-2xl sm:text-3xl  md:text-4xl font-bold text-base-content">
        Nationwide Coverage
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
        BookCourier service centers are available across all 64 districts of Bangladesh.
        Fast, secure and reliable delivery everywhere.
      </p>
    </div>

    {/* Search Box */}
    <form
      onSubmit={handleSearch}
      className="mt-8 flex justify-center"
    >
      <div className="
        flex items-center gap-2
        w-full sm:w-[420px]
        bg-white dark:bg-[#1d232a]/70
        border border-gray-300 dark:border-white/10
        rounded-full px-4 py-2
        shadow-sm
        focus-within:ring-2 focus-within:ring-primary
        transition-all
      ">
        <input
          type="search"
          name="location"
          required
          placeholder="Search your district..."
          className="
            bg-transparent flex-1 outline-none
            text-gray-800 dark:text-white
            placeholder-gray-400
          "
        />
        <button
          type="submit"
          className="text-sm font-medium text-primary hover:opacity-80 transition"
        >
          Search
        </button>
      </div>
    </form>

    {/* Map Container */}
    <div className="
      mt-10
      rounded-3xl overflow-hidden
      shadow-lg
      bg-white dark:bg-[#110a0b]
      relative z-0
    ">
      <div className="h-[320px] sm:h-[450px] md:h-[550px] w-full">
        <MapContainer
          className="h-full w-full"
          center={position}
          zoom={8}
          ref={mapRef}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
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
                <div className="text-sm">
                  <strong className="text-gray-900">
                    {serviceCenter.district}
                  </strong>
                  <p className="text-gray-600 mt-1">
                    {serviceCenter.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  </div>
);
};

export default Coverage;
