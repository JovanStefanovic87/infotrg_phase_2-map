import { useEffect, useState } from 'react';

const useGoogleMaps = (apiKey: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error('Error loading Google Maps script');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return loaded;
};

export default useGoogleMaps;
