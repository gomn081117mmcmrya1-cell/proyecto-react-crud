function PiePagina({ autor, anio }) {
  const estilo = {
    backgroundColor: '#282c34',
    color: 'white',
    textAlign: 'center',
    padding: '15px',
    marginTop: '30px',
    borderRadius: '5px'
  };

  return (
    <footer style={estilo}>
      <p>&copy; {anio} {autor}. Todos los derechos reservados.</p>
    </footer>
  );
}

export default PiePagina;