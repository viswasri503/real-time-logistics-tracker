import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const drivers = useSelector((state: RootState) => state.drivers.list);
  const selectedDriverId = useSelector((state: RootState) => state.drivers.selectedDriverId);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.3832, 43.6532],
      zoom: 10,
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old markers
    document.querySelectorAll('.driver-marker').forEach((el) => el.remove());

    drivers.forEach((driver) => {
      const el = document.createElement('div');
      el.className = 'driver-marker';
      el.style.width = '16px';
      el.style.height = '16px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = driver.driverId === selectedDriverId ? 'blue' : 'red';

      new mapboxgl.Marker(el)
        .setLngLat([driver.longitude, driver.latitude])
        
        .setPopup(new mapboxgl.Popup().setText(driver.name))
        .addTo(mapRef.current!);
    });

    // Center on selected driver
    const selected = drivers.find((d) => d.driverId === selectedDriverId);
    if (selected) {
      mapRef.current.flyTo({
        center: [selected.longitude, selected.latitude],
        zoom: 10,
      });
    }
  }, [drivers, selectedDriverId]);

  return <div ref={mapContainer} className="mapViewContainer" />;
};

export default MapView;
