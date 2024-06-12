import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgregarPunto = () => {
    const [longitud, setLongitud] = useState('');
    const [latitud, setLatitud] = useState('');
    const [idPoligono, setIdPoligono] = useState('');
    const [poligonos, setPoligonos] = useState([]);

    useEffect(() => {
        const fetchPoligonos = async () => {
            try {
                const response = await axios.get('http://localhost/Tracelink/poligonos/MostrarPoligonos.php');
                setPoligonos(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPoligonos();
    }, []);

    const agregarPunto = async () => {
        try {
            const formData = new FormData();
            formData.append('longitud', longitud);
            formData.append('latitud', latitud);
            formData.append('idPoligono', Number(idPoligono));

            const response = await axios.post('http://localhost/Tracelink/poligonos/AgregarPunto.php', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Longitud" onChange={e => setLongitud(e.target.value)} />
            <input type="text" placeholder="Latitud" onChange={e => setLatitud(e.target.value)} />
            <select onChange={e => setIdPoligono(e.target.value)}>
                {poligonos.map(poligono => (
                    <option key={poligono.idPoligono} value={poligono.idPoligono}>
                        {poligono.idPoligono}
                    </option>
                ))}
            </select>
            <button onClick={agregarPunto}>Agregar Punto</button>
        </div>
    );
};

export default AgregarPunto;
