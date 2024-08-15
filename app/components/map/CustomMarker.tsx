import React, { useEffect } from 'react';

interface CustomMarkerProps {
  map: google.maps.Map;
  position: { lat: number; lng: number };
  label: string;
}

const getCustomIcon = () => {
  return {
    url:
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" fill="#FF0000" stroke="#FFFFFF" stroke-width="2"/>
      </svg>`),
    scaledSize: new google.maps.Size(24, 24),
    anchor: new google.maps.Point(12, 24),
  };
};

const CustomMarker: React.FC<CustomMarkerProps> = ({ map, position, label }) => {
  useEffect(() => {
    if (!map) return;

    // Create a marker with a custom icon
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      title: 'Uluru',
    });

    // Create a div element for the label
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.style.position = 'absolute';
    labelDiv.style.backgroundColor = 'white';
    labelDiv.style.border = '1px solid black';
    labelDiv.style.padding = '4px';
    labelDiv.style.borderRadius = '4px';
    labelDiv.style.fontSize = '12px';
    labelDiv.style.fontWeight = 'bold';
    labelDiv.style.color = 'black';
    labelDiv.style.textAlign = 'center';
    labelDiv.textContent = label;

    // Create an overlay to position the label
    const overlay = new google.maps.OverlayView();
    overlay.onAdd = () => {
      const panes = overlay.getPanes();
      if (panes) {
        panes.overlayLayer.appendChild(labelDiv);
      }
    };
    overlay.draw = () => {
      const projection = overlay.getProjection();
      const divPosition = projection.fromLatLngToDivPixel(position);
      if (divPosition) {
        labelDiv.style.left = divPosition.x + 'px';
        labelDiv.style.top = divPosition.y + 'px';
      }
    };
    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map, position, label]);

  return null;
};

export default CustomMarker;
