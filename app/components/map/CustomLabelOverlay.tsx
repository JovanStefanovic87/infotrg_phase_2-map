import React from 'react';
import { OverlayView } from '@react-google-maps/api';
import styles from './Map.module.css';

interface CustomLabelOverlayProps {
  position: google.maps.LatLngLiteral;
  label: string;
}

const CustomLabelOverlay: React.FC<CustomLabelOverlayProps> = ({ position, label }) => {
  return (
    <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <div className={styles.customMarkerLabel}>{label}</div>
    </OverlayView>
  );
};

export default CustomLabelOverlay;
