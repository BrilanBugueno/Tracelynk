import React, { useState } from 'react';

const PolygonComponent = () => {
  const [name, setName] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const handleIncrease = () => {
    setCoordinates(prevState => ({
      lat: prevState.lat + 1,
      lng: prevState.lng + 1,
    }));
  };

  const handleDecrease = () => {
    setCoordinates(prevState => ({
      lat: prevState.lat - 1,
      lng: prevState.lng - 1,
    }));
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del polígono"
      />
      <div>
        <button onClick={handleIncrease}>+</button>
        <button onClick={handleDecrease}>-</button>
      </div>
      <div>
        <p>Latitud: {coordinates.lat}</p>
        <p>Longitud: {coordinates.lng}</p>
      </div>
    </div>
  );
};

export default PolygonComponent;
