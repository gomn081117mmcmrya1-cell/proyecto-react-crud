function NavMenu({ enlaces }) {
  const estiloNav = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    listStyle: 'none',
    padding: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    marginBottom: '20px'
  };

  const estiloLink = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold'
  };

  return (
    <nav>
      <ul style={estiloNav}>
        {enlaces.map((enlace, index) => (
          <li key={index}>
            <a href={enlace.url} style={estiloLink}>{enlace.texto}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavMenu;