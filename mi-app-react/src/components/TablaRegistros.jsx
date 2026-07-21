function TablaRegistros({ datos }) {
  const estiloTabla = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
    marginBottom: '20px'
  };

  const estiloCelda = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left'
  };

  return (
    <table style={estiloTabla}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={estiloCelda}>ID</th>
          <th style={estiloCelda}>Nombre</th>
          <th style={estiloCelda}>Categoría</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item) => (
          <tr key={item.id}>
            <td style={estiloCelda}>{item.id}</td>
            <td style={estiloCelda}>{item.nombre}</td>
            <td style={estiloCelda}>{item.categoria}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaRegistros;