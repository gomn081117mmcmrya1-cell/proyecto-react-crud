function BotonPersonalizado({ texto, color, onClick }) {
  const estilo = {
    backgroundColor: color || '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '5px'
  };

  return (
    <button style={estilo} onClick={onClick}>
      {texto}
    </button>
  );
}

export default BotonPersonalizado;