import React from 'react';
import '../stylesheets/navbar.css'; // Importa el archivo CSS de estilos

function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
         {/* Dropdown Cita */}
         <li className="dropdown">
        <a href="/AgendarCita" className="dropbtn">Agendar Cita</a>
        <div className="dropdown-content">
            <a href="/AgendarCita">Agregar</a>
            <a href="/AgendarMantencion">Mantencion</a>
          </div></li>
        <li><a href="/AgregarObjeto">Agregar Objeto</a></li>
        <li><a href="/Estados">Estado</a></li>
        {/* Dropdown Vehículo */}
        <li className="dropdown">
          <a href="/AgregarVehiculo" className="dropbtn">Vehículo</a>
            <div className="dropdown-content">
            <a href="/AgregarVehiculo">Agregar</a>
            <a href="/ModificarVehiculos">Modificar</a>
            
          </div>
        </li>
         {/* Dropdown Poligono */}
         <li className="dropdown">
          <a href="/AgregarPoligono" className="dropbtn">Poligogono</a>
            <div className="dropdown-content">
            <a href="/AgregarPoligono">Agregar</a>
            <a href="/EditarPoligono">Editar</a>
          </div>
        </li>
                {/* Dropdown Puntos */}
                <li className="dropdown">
          <a href="/AgregarPunto" className="dropbtn">Puntos</a>
          <div className="dropdown-content">
            <a href="/AgregarPunto">Agregar</a>
            <a href="/EditarPunto">Editar</a>
          </div>
          </li>
    {/* Dropdown Polipunto */}
    <li className="dropdown">
      <a href="/AgregarPolipunto" className="dropbtn">Polipunto</a>
      <div className="dropdown-content">
        <a href="/AgregarPoliPunto">Agregar Polígono</a>
        <a href="/AgregarPunto">Agregar Punto</a>
      </div>
    </li>
        
        
      </ul>
    </nav>
  );
}

export default Navbar;

