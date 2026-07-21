import { useState } from 'react';

function EventosReact() {
  // 1. Estado para onClick
  const [mensajeClick, setMensajeClick] = useState('Haz clic en el botón');
  const [clickeado, setClickeado] = useState(false);

  // 2. Estado para onChange
  const [textoInput, setTextoInput] = useState('');

  // 3. Estado para onSubmit
  const [nombreForm, setNombreForm] = useState('');
  const [mensajeSubmit, setMensajeSubmit] = useState('');

  // 4. Estado para onMouseEnter (y onMouseLeave)
  const [focoCaja, setFocoCaja] = useState(false);

  // Manejadores de eventos
  const ManejarClick = () => {
    setClickeado(!clickeado);
    setMensajeClick(clickeado ? 'Haz clic en el botón' : '¡Acción ejecutada con onClick! 🎉');
  };

  const ManejarChange = (e) => {
    setTextoInput(e.target.value);
  };

  const ManejarSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (nombreForm.trim() === '') {
      setMensajeSubmit('⚠️ Por favor escribe algo antes de enviar.');
    } else {
      setMensajeSubmit(`✅ ¡Formulario enviado con éxito! Bienvenido, ${nombreForm}.`);
      setNombreForm(''); // Limpia el campo
    }
  };

  // Estilos rápidos en objeto
  const estiloTarjeta = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#fff'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Práctica de Eventos en React ⚡</h2>

      {/* --- EJEMPLO 1: onClick --- */}
      <div style={estiloTarjeta}>
        <h3>1. Evento <code>onClick</code></h3>
        <p>{mensajeClick}</p>
        <button 
          onClick={ManejarClick}
          style={{
            padding: '10px 15px',
            backgroundColor: clickeado ? '#28a745' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {clickeado ? 'Restablecer' : 'Hacer Clic'}
        </button>
      </div>

      {/* --- EJEMPLO 2: onChange --- */}
      <div style={estiloTarjeta}>
        <h3>2. Evento <code>onChange</code></h3>
        <label style={{ display: 'block', marginBottom: '8px' }}>Escribe algo aquí:</label>
        <input 
          type="text" 
          onChange={ManejarChange}
          placeholder="Escribe en tiempo real..."
          style={{ padding: '8px', width: '90%', borderRadius: '4px', border: '1px solid #aaa' }}
        />
        <p style={{ marginTop: '10px', color: '#555' }}>
          <strong>Vista previa en tiempo real:</strong> {textoInput || '(Esperando respuesta...)'}
        </p>
      </div>

      {/* --- EJEMPLO 3: onSubmit --- */}
      <div style={estiloTarjeta}>
        <h3>3. Evento <code>onSubmit</code></h3>
        <form onSubmit={ManejarSubmit}>
          <input 
            type="text" 
            value={nombreForm}
            onChange={(e) => setNombreForm(e.target.value)}
            placeholder="Ingresa tu nombre..."
            style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #aaa' }}
          />
          <button 
            type="submit"
            style={{ padding: '8px 15px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Enviar
          </button>
        </form>
        {mensajeSubmit && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{mensajeSubmit}</p>}
      </div>

      {/* --- EJEMPLO 4: onMouseEnter --- */}
      <div style={estiloTarjeta}>
        <h3>4. Evento <code>onMouseEnter</code></h3>
        <div 
          onMouseEnter={() => setFocoCaja(true)}
          onMouseLeave={() => setFocoCaja(false)}
          style={{
            padding: '25px',
            textAlign: 'center',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            backgroundColor: focoCaja ? '#ffc107' : '#e9ecef',
            color: focoCaja ? '#000' : '#6c757d',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {focoCaja ? '🎯 ¡El cursor está encima!' : 'Pasa el cursor sobre este recuadro'}
        </div>
      </div>
    </div>
  );
}

export default EventosReact;