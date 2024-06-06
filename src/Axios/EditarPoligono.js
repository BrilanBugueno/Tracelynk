import React, { useState, useEffect } from 'react';

const ListaPoligonos = () => {
  const [poligonos, setPoligonos] = useState([]);
  const [idEditar, setIdEditar] = useState('');
  const [nombreEditar, setNombreEditar] = useState('');

  // Función para cargar los polígonos desde la base de datos
  const cargarPoligonos = async () => {
    try {
      const response = await fetch('ruta-a-tu-archivo-php-para-obtener-poligonos');
      const data = await response.json();
      setPoligonos(data);
    } catch (error) {
      console.error('Error al cargar los polígonos:', error);
    }
  };

  // Función para actualizar el polígono
  const actualizarPoligono = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', idEditar);
      formData.append('nombre', nombreEditar);

      const response = await fetch('ruta-a-tu-archivo-php-para-actualizar-poligonos', {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();
      alert(result);
      cargarPoligonos(); // Recargar la lista después de la actualización
    } catch (error) {
      console.error('Error al actualizar el polígono:', error);
    }
  };

  // Cargar los polígonos al montar el componente
  useEffect(() => {
    cargarPoligonos();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {poligonos.map((poligono) => (
            <tr key={poligono.id}>
              <td>{poligono.id}</td>
              <td>{poligono.nombre}</td>
              <td>
                <button onClick={() => {
                  setIdEditar(poligono.id);
                  setNombreEditar(poligono.nombre);
                }}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={actualizarPoligono}>
        <input
          type="hidden"
          value={idEditar}
          onChange={(e) => setIdEditar(e.target.value)}
        />
        <label>
          Nombre del Polígono:
          <input
            type="text"
            value={nombreEditar}
            onChange={(e) => setNombreEditar(e.target.value)}
          />
        </label>
        <button type="submit">Actualizar Polígono</button>
      </form>
    </>
  );
};

export default ListaPoligonos;
