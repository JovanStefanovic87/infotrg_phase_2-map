'use client';
import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import styles from './Map.module.css';

interface MarkerData {
  id: string;
  position: { lat: number; lng: number };
  title: string;
}

interface MapProps {
  markers: MarkerData[];
}

const containerStyle = {
  width: '33%',
  height: '400px',
};

const center = {
  lat: 46.088720165191255,
  lng: 19.64666604102002,
};

const generateGoogleMapsUrl = (lat: number, lng: number) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

const Map: React.FC<MapProps> = ({ markers }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={19} mapTypeId='satellite'>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          label={{
            text: marker.title,
            className: styles.customMarkerLabel,
          }}
          onClick={() => {
            const url = generateGoogleMapsUrl(marker.position.lat, marker.position.lng);
            window.open(url, '_blank');
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
