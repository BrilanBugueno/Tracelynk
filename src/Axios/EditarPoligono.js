import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTable = () => {
    const [data, setData] = useState([]);

    // Función para obtener los datos de los polígonos
    const getPoligonos = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/poligonos/MostrarPoligonos.php');
            setData(response.data);
        } catch (error) {
            console.error("Error al obtener los polígonos: ", error);
        }
    };

    // Llamar a getPoligonos cuando el componente se monta
    useEffect(() => {
        getPoligonos();
    }, []);

    const handleEdit = async (id) => {
        const nombre = prompt("Ingresa el nuevo nombre del polígono:");
        if (nombre) {
            try {
                const response = await axios.post(`http://localhost/Tracelink/poligonos/EditarPoligono.php?id=${id}&nombre=${encodeURIComponent(nombre)}`);
                if (response.data.message) {
                    alert(response.data.message);
                }
                setData(data.map(item => item.idPoligono === id ? {...item, nombre} : item));
            } catch (error) {
                console.error("Error al editar el polígono: ", error);
            }
        }
    };

    const handleDelete = async (id) => {
      if (window.confirm("¿Estás seguro de que quieres eliminar este polígono?")) {
          try {
              const response = await axios.post(`http://localhost/Tracelink/poligonos/EliminarPoligono.php`, { id: id });
              if (response.data.message) {
                  alert(response.data.message);
              }
              getPoligonos();   // Volver a obtener los datos de los polígonos
          } catch (error) {
              console.error("Error al eliminar el polígono: ", error);
          }
      }
  };

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => (
                    <tr key={row.idPoligono}>
                        <td>{row.idPoligono}</td>
                        <td>{row.nombre}</td>
                        <td>
                            <button onClick={() => handleEdit(row.idPoligono)}>Editar</button>
                            <button onClick={() => handleDelete(row.idPoligono)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
