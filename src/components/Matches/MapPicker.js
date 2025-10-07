import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const MapPicker = ({ onChange, initialPosition = { lat: 45.4642, lng: 9.19 } }) => {
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps JS API non caricata!');
      return;
    }

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialPosition,
      zoom: 13,
    });
    setMap(mapInstance);

    const markerInstance = new window.google.maps.Marker({
      position: initialPosition,
      map: mapInstance,
      draggable: true,
    });
    setMarker(markerInstance);

    // Aggiorna posizione al drag
    markerInstance.addListener('dragend', () => {
      const pos = markerInstance.getPosition();
      onChange({
        lat: pos.lat(),
        lng: pos.lng(),
        address: searchRef.current.value,
      });
    });

    // Autocomplete
    const autocomplete = new window.google.maps.places.Autocomplete(searchRef.current, {
      fields: ['geometry', 'formatted_address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      const loc = place.geometry.location;
      mapInstance.panTo(loc);
      markerInstance.setPosition(loc);
      onChange({
        lat: loc.lat(),
        lng: loc.lng(),
        address: place.formatted_address,
      });
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        ref={searchRef}
        placeholder="Cerca il campo..."
        className="form-control mb-2"
      />
      <div
        ref={mapRef}
        style={{ width: '100%', height: '300px', borderRadius: '8px', overflow: 'hidden' }}
      ></div>
    </div>
  );
};

MapPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialPosition: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};

export default MapPicker;
