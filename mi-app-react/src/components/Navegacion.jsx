import { NavLink } from 'react-router-dom';

function Navegacion() {
  // Estilo dinámico para la pestaña activa
  const estiloLink = ({ isActive }) => ({
    padding: '10px 15px',
    textDecoration: 'none',
    color: isActive ? '#ffffff' : '#333333',
    backgroundColor: isActive ? '#007bff' : '#e9ecef',
    borderRadius: '5px',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: '0.2s'
  });

  return (
    <nav style={{ display: 'flex', gap: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderBottom: '2px solid #ccc' }}>
      <NavLink to="/" style={estiloLink}>Inicio</NavLink>
      <NavLink to="/listado" style={estiloLink}>Listado</NavLink>
      <NavLink to="/registro" style={estiloLink}>Registro</NavLink>
      <NavLink to="/acerca" style={estiloLink}>Acerca de</NavLink>
    </nav>
  );
}

export default Navegacion;