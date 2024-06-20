// Importamos las librerías necesarias
import React, { useState } from 'react'; // Importamos React y el hook useState de la librería React
import axios from 'axios'; // Importamos axios, una librería para hacer solicitudes HTTP

// Definimos nuestro componente PolygonComponent
const PolygonComponent = () => {
  // Usamos el hook useState para manejar el estado de nuestro componente
  const [name, setName] = useState(''); // Este estado guarda el nombre del polígono
  const [coordinates, setCoordinates] = useState([{ lat: 0, lng: 0 }]); // Este estado guarda las coordenadas del polígono

  // Función para agregar un nuevo punto
  const handleAddPoint = () => {
    setCoordinates(prevState => [...prevState, { lat: 0, lng: 0 }]); // Agrega un nuevo punto con latitud y longitud 0 al estado coordinates
  };

  // Función para eliminar un punto
  const handleRemovePoint = (index) => {
    setCoordinates(prevState => prevState.filter((_, i) => i !== index)); // Elimina el punto en el índice especificado del estado coordinates
  };

  // Función para cambiar la latitud de un punto
  const handleLatChange = (index, newLat) => {
    setCoordinates(prevState => prevState.map((coord, i) => i === index ? { ...coord, lat: newLat } : coord)); // Cambia la latitud del punto en el índice especificado al nuevo valor
  };

  // Función para cambiar la longitud de un punto
  const handleLngChange = (index, newLng) => {
    setCoordinates(prevState => prevState.map((coord, i) => i === index ? { ...coord, lng: newLng } : coord)); // Cambia la longitud del punto en el índice especificado al nuevo valor
  };

  // Función para agregar un polígono
  const handleAddPolygon = () => {
    axios.post('http://localhost/Tracelink/poligonos/EditarPoligono.php', { nombre: name }) // Hace una solicitud HTTP POST a tu script PHP para agregar un polígono
      .then(response => {
        if (response.data.success) {
          alert('Polígono agregado exitosamente'); // Muestra un mensaje de éxito si la solicitud fue exitosa
        } else {
          alert('Error al agregar el polígono: ' + response.data.error); // Muestra un mensaje de error si hubo un error
        }
      })
      .catch(error => {
        alert('Error al hacer la solicitud: ' + error); // Muestra un mensaje de error si hubo un error al hacer la solicitud
      });
  };

  // Función para agregar un punto a un polígono
  const handleAddPointToPolygon = (index) => {
    axios.post('http://localhost/tu-script-php-agregar-punto.php', { longitud: coordinates[index].lng, latitud: coordinates[index].lat, idPoligono: 1 }) // Hace una solicitud HTTP POST a tu script PHP para agregar un punto a un polígono
      .then(response => {
        if (response.data.success) {
          alert('Punto agregado exitosamente'); // Muestra un mensaje de éxito si la solicitud fue exitosa
        } else {
          alert('Error al agregar el punto: ' + response.data.error); // Muestra un mensaje de error si hubo un error
        }
      })
      .catch(error => {
        alert('Error al hacer la solicitud: ' + error); // Muestra un mensaje de error si hubo un error al hacer la solicitud
      });
  };

  // Renderizamos nuestro componente
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del polígono"
      /> {/* Campo de entrada para el nombre del polígono */}
      <button style={{ fontSize: '20px', padding: '10px' }} onClick={handleAddPolygon}>Agregar</button> {/* Botón para agregar un polígono */}
      {coordinates.map((coord, index) => ( // Mapeamos cada coordenada a un conjunto de elementos de React
        <div key={index}>
          <input
            type="number"
            value={coord.lat}
            onChange={(e) => handleLatChange(index, Number(e.target.value))}
            placeholder="Latitud"
          /> {/* Campo de entrada para la latitud del punto */}
          <input
            type="number"
            value={coord.lng}
            onChange={(e) => handleLngChange(index, Number(e.target.value))}
            placeholder="Longitud"
          /> {/* Campo de entrada para la longitud del punto */}
          <button onClick={() => handleRemovePoint(index)}>-</button> {/* Botón para eliminar un punto */}
          <button style={{ fontSize: '20px', padding: '10px', marginTop: '10px' }} onClick={() => handleAddPointToPolygon(index)}>Agregar</button> {/* Botón para agregar un punto a un polígono */}
        </div>
      ))}
      <button onClick={handleAddPoint}>+</button> {/* Botón para agregar un nuevo punto */}
    </div>
  );
};

export default PolygonComponent; // Exportamos nuestro componente para que pueda ser usado en otros archivos
