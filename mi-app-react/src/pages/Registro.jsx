import { useState } from 'react';

function Registro({ productoAEditar, alGuardarExitoso }) {
  // Estados para los campos del formulario
  const [titulo, setTitulo] = useState(productoAEditar ? productoAEditar.title : '');
  const [contenido, setContenido] = useState(productoAEditar ? productoAEditar.body : '');

  // Estados de control de la petición
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorBackend, setErrorBackend] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setErrorBackend('');

    // Validar campos locales básicos
    if (!titulo.trim() || !contenido.trim()) {
      setErrorBackend('Todos los campos son obligatorios.');
      return;
    }

    setEnviando(true);

    // Determinar si es un registro nuevo (POST) o edición (PUT)
    const esEdicion = Boolean(productoAEditar);
    const url = esEdicion
      ? `https://jsonplaceholder.typicode.com/posts/${productoAEditar.id}`
      : 'https://jsonplaceholder.typicode.com/posts';
    
    const metodo = esEdicion ? 'PUT' : 'POST';

    try {
      // 2 y 6. Enviar datos mediante POST o PUT
      const respuesta = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titulo,
          body: contenido,
          userId: 1,
        }),
      });

      // 7. Validar errores procedentes del backend
      if (!respuesta.ok) {
        throw new Error(`Error del servidor (Status: ${respuesta.status})`);
      }

      const datosResultado = await respuesta.json();
      console.log(`✅ Resultado del ${metodo}:`, datosResultado);

      // 3. Mostrar confirmación de éxito
      setMensajeExito(
        esEdicion
          ? '¡Registro actualizado exitosamente en el backend!'
          : '¡Nuevo registro creado exitosamente en el backend!'
      );

      // Si es nuevo registro, limpiar formulario
      if (!esEdicion) {
        setTitulo('');
        setContenido('');
      }

      // 4. Notificar al componente padre para actualizar el listado
      if (alGuardarExitoso) {
        alGuardarExitoso(datosResultado, esEdicion);
      }

    } catch (err) {
      console.error('❌ Error al conectar con el backend:', err);
      // 7. Mostrar mensaje de error del backend
      setErrorBackend(err.message || 'Ocurrió un error al procesar la solicitud.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 my-4">
      <div className={`card-header text-white ${productoAEditar ? 'bg-warning text-dark' : 'bg-primary'}`}>
        <h4 className="mb-0 fw-bold">
          {productoAEditar ? '✏️ Modificar Registro (PUT)' : '➕ Nuevo Registro (POST)'}
        </h4>
      </div>
      <div className="card-body">

        {/* 3. Confirmación exitosa */}
        {mensajeExito && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <span>✅ {mensajeExito}</span>
            <button type="button" className="btn-close" onClick={() => setMensajeExito('')}></button>
          </div>
        )}

        {/* 7. Mensaje de error procedentes del backend */}
        {errorBackend && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <span>⚠️ <strong>Error del Backend:</strong> {errorBackend}</span>
            <button type="button" className="btn-close" onClick={() => setErrorBackend('')}></button>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Título del Registro:</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej. Nuevo Producto / Publicación"
              disabled={enviando}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Descripción / Contenido:</label>
            <textarea
              className="form-control"
              rows="3"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Escribe el contenido aquí..."
              disabled={enviando}
            ></textarea>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className={`btn ${productoAEditar ? 'btn-warning text-dark' : 'btn-success'} fw-bold flex-grow-1`}
              disabled={enviando}
            >
              {enviando
                ? 'Procesando...'
                : productoAEditar
                ? '💾 Guardar Cambios (PUT)'
                : '🚀 Enviar Registro (POST)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;