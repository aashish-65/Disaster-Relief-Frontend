import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icon in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LocationMarker = ({ position, setPosition, setAddress }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      fetchAddress(e.latlng);
    },
  });

  const fetchAddress = async (latlng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position ? <Marker position={position} /> : null;
};

const LocationPicker = ({ onChange, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition || null);
  const [address, setAddress] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    // Try to get user's current location
    if (!initialPosition && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setPosition(newPosition);
          fetchAddress(newPosition);
          
          if (mapRef.current) {
            mapRef.current.flyTo(newPosition, 13);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to a central location if geolocation fails
          setPosition({ lat: 20.5937, lng: 78.9629 }); // Center of India
        }
      );
    }
  }, [initialPosition]);

  const fetchAddress = async (latlng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
        onChange && onChange(latlng, data.display_name);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
    onChange && onChange(newPosition, address);
  };

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
    onChange && onChange(position, newAddress);
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={position || { lat: 20.5937, lng: 78.9629 }} // Default to center of India
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          position={position} 
          setPosition={handlePositionChange} 
          setAddress={handleAddressChange} 
        />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;