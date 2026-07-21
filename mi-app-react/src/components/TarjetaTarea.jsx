import { useState } from 'react';

// EXPLICACIÓN CON COMENTARIOS (Requisito 5 de tu tarea):
/*
  1. ¿QUÉ SON LAS PROPIEDADES (PROPS)?
     Son parámetros o datos que un componente padre le pasa a un componente hijo.
     Son de SOLO LECTURA (no se pueden modificar dentro del componente hijo).
     Ejemplo aquí: 'titulo', 'descripcion', 'categoria', 'estadoInicial'.

  2. ¿QUÉ ES EL ESTADO (STATE)?
     Es una variable interna administrada por el propio componente que PUEDE CAMBIAR con el tiempo
     (por ejemplo, cuando el usuario hace clic en un botón).
     Cuando el estado cambia, React vuelve a renderizar el componente para mostrar la información actualizada.
     Ejemplo aquí: 'completada' y 'contadorMeGusta'.

  3. ¿CUÁNDO UTILIZAR CADA UNO?
     - Usa PROPS cuando quieras pasar información estática o de configuración de un componente a otro.
     - Usa STATE cuando necesites memoria interactiva (botones, contadores, formularios, interruptores) 
       que cambie según las acciones del usuario.
*/

function TarjetaTarea({ titulo, descripcion, categoria, estadoInicial }) {
  // 3. Crear contador e interruptor mediante estado (useState)
  const [completada, setCompletada] = useState(estadoInicial);
  const [contadorMeGusta, setContadorMeGusta] = useState(0);

  // 4. Funciones que modifican el estado
  const alternarEstado = () => {
    setCompletada(!completada);
  };

  const incrementarLikes = () => {
    setContadorMeGusta(contadorMeGusta + 1);
  };

  // Estilos básicos
  const estiloTarjeta = {
    border: '2px solid',
    borderColor: completada ? '#28a745' : '#ffc107',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const estiloEtiqueta = {
    display: 'inline-block',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: completada ? '#28a745' : '#ffc107',
    marginBottom: '10px'
  };

  return (
    <div style={estiloTarjeta}>
      <span style={estiloEtiqueta}>{categoria}</span>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      
      <p><strong>Estado:</strong> {completada ? 'Completada ✅' : 'Pendiente ⏳'}</p>
      <p><strong>Me gusta:</strong> ❤️ {contadorMeGusta}</p>

      {/* Botones que modifican el estado */}
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={alternarEstado} 
          style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff' }}
        >
          {completada ? 'Marcar como Pendiente' : 'Marcar como Completada'}
        </button>

        <button 
          onClick={incrementarLikes} 
          style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#e83e8c', color: '#fff' }}
        >
          Dar Me Gusta 👍
        </button>
      </div>
    </div>
  );
}

export default TarjetaTarea;