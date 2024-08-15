'use client';
import React from 'react';
import PageContainer from '../components/containers/PageContainer';
import MapContent from './MapContent';
import { APIProvider } from '@vis.gl/react-google-maps';

function MapProvider() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <PageContainer>
        <MapContent />
      </PageContainer>
    </APIProvider>
  );
}

export default MapProvider;
