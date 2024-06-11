import React, { useState } from 'react';
import axios from 'axios';

function AgregarPoligono() {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del polígono
    const poligono = { nombre };

    // Enviar los datos al servidor
    axios.post('http://localhost/Tracelink/poligonos/AgregarPoligono.php', poligono)
    .then(response => {
      alert(response.data.message);
      setNombre('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Polígono:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>
      <button type="submit">Agregar Polígono</button>
    </form>
  );
};

export default AgregarPoligono;
