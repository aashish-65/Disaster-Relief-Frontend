import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import incidentService from '../../services/incidentService';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to set view based on props
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// Custom component to handle marker clusters
const MarkerCluster = ({ markers, onMarkerClick, showPopups }) => {
  const map = useMap();
  const clusterGroupRef = useRef(null);
  
  useEffect(() => {
    // Create a new marker cluster group
    if (!clusterGroupRef.current) {
      clusterGroupRef.current = L.markerClusterGroup();
      map.addLayer(clusterGroupRef.current);
    }
    
    // Clear existing markers
    clusterGroupRef.current.clearLayers();
    
    // Add markers to the cluster group
    markers.forEach((marker, index) => {
      const leafletMarker = L.marker([marker.lat, marker.lng])
        .on('click', () => onMarkerClick(marker));
      
      if (showPopups && marker.popup) {
        leafletMarker.bindPopup(marker.popup);
      }
      
      clusterGroupRef.current.addLayer(leafletMarker);
    });
    
    // Cleanup function
    return () => {
      if (map && clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
      }
    };
  }, [map, markers, onMarkerClick, showPopups]);
  
  return null;
};

const InteractiveMap = ({ 
  center = [20.5937, 78.9629], // Default to center of India
  zoom = 5,
  markers = [],
  height = '500px',
  onMarkerClick = () => {},
  showPopups = true,
  autoFetch = false,
  filters = {}
}) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (autoFetch) {
      fetchIncidents();
    }
  }, [autoFetch, filters]);
  
  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const response = await incidentService.getIncidents(filters);
      
      // Transform incident data to marker format
      const incidentMarkers = response.data.map(incident => ({
        id: incident._id,
        lat: incident.location.coordinates[1],
        lng: incident.location.coordinates[0],
        title: incident.title,
        type: incident.type,
        severity: incident.severity,
        popup: `
          <strong>${incident.title}</strong><br/>
          Type: ${incident.type}<br/>
          Severity: ${incident.severity}<br/>
          <a href="/incidents/${incident._id}">View Details</a>
        `
      }));
      
      setIncidents(incidentMarkers);
    } catch (err) {
      setError('Failed to load incidents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Combine provided markers with fetched incidents
  const allMarkers = [...markers, ...incidents];
  
  return (
    <div className="relative">
      {loading && (
        <div className="absolute top-2 right-2 z-[1000] bg-white p-2 rounded shadow">
          Loading incidents...
        </div>
      )}
      {error && (
        <div className="absolute top-2 right-2 z-[1000] bg-red-100 text-red-800 p-2 rounded shadow">
          {error}
        </div>
      )}
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height, width: '100%' }}
        scrollWheelZoom={true}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MarkerCluster 
          markers={allMarkers} 
          onMarkerClick={onMarkerClick} 
          showPopups={showPopups} 
        />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;