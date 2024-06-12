import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarPunto = () => {
    const [puntos, setPuntos] = useState([]);
    const [selectedPunto, setSelectedPunto] = useState(null);
    const [longitud, setLongitud] = useState('');
    const [latitud, setLatitud] = useState('');

    useEffect(() => {
        const fetchPuntos = async () => {
            try {
                const response = await axios.get('http://localhost/Tracelink/poligonos/MostrarPunto.php');
                setPuntos(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPuntos();
    }, []);

    const seleccionarPunto = (idPunto) => {
        const punto = puntos.find(punto => punto.idPuntos === idPunto);
        setSelectedPunto(punto.idPuntos);
        setLongitud(punto.Longitud);
        setLatitud(punto.Latitud);
    };

    const editarPunto = async () => {
        try {
            const formData = new FormData();
            formData.append('longitud', longitud);
            formData.append('latitud', latitud);

            const response = await axios.put(`http://localhost/Tracelink/poligonos/EditarPunto.php?id=${selectedPunto}`, formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <select onChange={e => seleccionarPunto(e.target.value)}>
                {puntos.map(punto => (
                    <option key={punto.idPuntos} value={punto.idPuntos}>
                        {punto.idPuntos}
                    </option>
                ))}
            </select>
            <input type="text" value={longitud} onChange={e => setLongitud(e.target.value)} />
            <input type="text" value={latitud} onChange={e => setLatitud(e.target.value)} />
            <button onClick={editarPunto}>Editar Punto</button>
        </div>
    );
};

export default EditarPunto;
