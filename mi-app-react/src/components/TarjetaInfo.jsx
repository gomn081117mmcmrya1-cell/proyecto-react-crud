function TarjetaInfo({ titulo, descripcion, imagen }) {
  const estilo = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    maxWidth: '300px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
    margin: '10px auto'
  };

  return (
    <div style={estilo}>
      {imagen && <img src={imagen} alt={titulo} style={{ width: '100%', borderRadius: '5px' }} />}
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
}

export default TarjetaInfo;