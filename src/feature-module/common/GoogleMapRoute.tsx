import React, { useEffect, useRef } from 'react';
import { mapKey } from '../../environment';

interface GoogleMapRouteProps {
  origin: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
}

const GoogleMapRoute: React.FC<GoogleMapRouteProps> = ({ origin, destination }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const directionsService = useRef<any>(null);
  const directionsRenderer = useRef<any>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: origin || { lat: 12.9716, lng: 77.5946 }, // Default Bangalore
      zoom: 12,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry",
          "stylers": [{ "visibility": "on" }]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{ "color": "#f5f7f9" }]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#ffffff" }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#ffe1c4" }]
        }
      ]
    });

    directionsService.current = new window.google.maps.DirectionsService();
    directionsRenderer.current = new window.google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#fb923c', // primary-spintrip
        strokeWeight: 6,
        strokeOpacity: 0.8
      }
    });

    if (origin && destination) {
      calculateRoute();
    }
  }, [window.google, origin, destination]);

  useEffect(() => {
    if (origin && destination && directionsService.current) {
      calculateRoute();
    }
  }, [origin, destination]);

  const calculateRoute = () => {
    if (!origin || !destination) return;

    directionsService.current.route(
      {
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result: any, status: string) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.current.setDirections(result);
        } else {
          console.error("Directions error:", status);
        }
      }
    );
  };

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '100%', borderRadius: '20px' }}
    />
  );
};

export default GoogleMapRoute;
