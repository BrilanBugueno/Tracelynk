import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Obtener los datos del backend
        fetch('../Axios/EditarPoligono.jsx') // Asegúrate de reemplazar 'tu_archivo.php' con la ruta correcta a tu archivo PHP
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div>
            <Navbar />
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
                                <button onClick={() => alert('Editar ' + row.idPoligono)}>Editar</button>
                                <button onClick={() => alert('Eliminar ' + row.idPoligono)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
