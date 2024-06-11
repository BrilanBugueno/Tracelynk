import React, { useState } from 'react';
import axios from 'axios';

const AddPoint = ({ poligonos }) => {
    const [longitud, setLongitud] = useState('');
    const [latitud, setLatitud] = useState('');
    const [poligonoId, setPoligonoId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost/Tracelink/poligonos/AgregarPunto.php', { longitud, latitud, poligonoId });
            if (response.data.message) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error al agregar el punto: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Longitud:
                <input type="text" value={longitud} onChange={e => setLongitud(e.target.value)} />
            </label>
            <label>
                Latitud:
                <input type="text" value={latitud} onChange={e => setLatitud(e.target.value)} />
            </label>
            <label>
                Polígono:
                <select value={poligonoId} onChange={e => setPoligonoId(e.target.value)}>
                    {poligonos.map(poligono => (
                        <option key={poligono.idPoligono} value={poligono.idPoligono}>
                            {poligono.nombre}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Agregar Punto</button>
        </form>
    );
};

export default AddPoint;
