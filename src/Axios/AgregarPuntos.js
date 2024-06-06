import React, { useState } from 'react';
import axios from 'axios';

const PolygonForm = () => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('ruta_del_api_para_guardar_poligono', { nombre });
      console.log(response.data);
      // Actualizar la vista o manejar la respuesta como sea necesario
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Polígono:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <button type="submit">Guardar Polígono</button>
    </form>
  );
};

export default PolygonForm;
