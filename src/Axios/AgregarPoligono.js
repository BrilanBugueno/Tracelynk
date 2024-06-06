import React, { useState } from 'react';

function AgregarPoligono() {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('AgregarPoligono.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `nombre=${encodeURIComponent(nombre)}`,
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      setNombre('');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre del Polígono:</label>
      <input
        type="text"
        id="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <button type="submit">Agregar Polígono</button>
    </form>
  );
}

export default AgregarPoligono;