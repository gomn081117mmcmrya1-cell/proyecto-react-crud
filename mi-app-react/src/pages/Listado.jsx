import { useState, useEffect, useCallback } from 'react';
import Registro from './Registro';
import FilaProducto from '../components/FilaProducto';

function Listado() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mensajeOperacion, setMensajeOperacion] = useState('');

  const [elementoEnEdicion, setElementoEnEdicion] = useState(null);

  const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

  // Cargar lista inicial
  const obtenerDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const respuesta = await fetch(API_URL);

      if (!respuesta.ok) throw new Error('No se pudo cargar el listado.');

      const resultado = await respuesta.json();
      setDatos(resultado);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  // Actualizar automáticamente tras POST o PUT (Punto 4)
  const manejarGuardadoExitoso = (itemGuardado, esEdicion) => {
    if (esEdicion) {
      setDatos((prev) =>
        prev.map((item) => (item.id === itemGuardado.id ? itemGuardado : item))
      );
      setElementoEnEdicion(null);
      setMensajeOperacion('✅ Registro modificado correctamente.');
    } else {
      setDatos((prev) => [itemGuardado, ...prev]);
      setMensajeOperacion('✅ Nuevo registro agregado al listado.');
    }
  };

  // 2 y 3. Función para solicitar confirmación y enviar DELETE
  const manejarEliminar = useCallback(async (id, titulo) => {
    // 2. Solicitar confirmación antes de ejecutar la operación
    const confirmado = window.confirm(
      `¿Estás seguro de que deseas eliminar el registro #${id}?\n"${titulo}"`
    );

    if (!confirmado) return;

    try {
      // 3. Enviar la solicitud DELETE al backend
      const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: No se pudo eliminar el registro.`);
      }

      console.log(`🗑️ Registro #${id} eliminado en el backend.`);

      // 4. Actualizar el listado eliminando el elemento del estado
      setDatos((prevDatos) => prevDatos.filter((item) => item.id !== id));

      setMensajeOperacion(`🗑️ Registro #${id} eliminado con éxito.`);
    } catch (err) {
      console.error('❌ Error al eliminar:', err);
      alert(`⚠️ Error del Backend: ${err.message}`);
    }
  }, []);

  // Callback para seleccionar ítem a editar
  const manejarSeleccionarEdicion = useCallback((item) => {
    setElementoEnEdicion(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-primary text-center mb-4">⚡ CRUD Completo en React (GET, POST, PUT, DELETE)</h2>

      {/* Alerta de operaciones de éxito */}
      {mensajeOperacion && (
        <div className="alert alert-info alert-dismissible fade show text-center fw-bold" role="alert">
          {mensajeOperacion}
          <button type="button" className="btn-close" onClick={() => setMensajeOperacion('')}></button>
        </div>
      )}

      {/* Formulario de Alta y Modificación */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <Registro
            key={elementoEnEdicion ? `edit-${elementoEnEdicion.id}` : 'nuevo'}
            productoAEditar={elementoEnEdicion}
            alGuardarExitoso={manejarGuardadoExitoso}
          />
          {elementoEnEdicion && (
            <div className="text-end mb-3">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setElementoEnEdicion(null)}
              >
                ✖️ Cancelar Edición
              </button>
            </div>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Carga y Errores */}
      {cargando && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted fw-bold">Cargando registros...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center shadow-sm">
          ⚠️ <strong>Error:</strong> {error}
        </div>
      )}

      {/* Tabla con la lista de registros */}
      {!cargando && !error && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Contenido</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item) => (
                // 7. Verificar que cada elemento tenga una clave (key) única
                <FilaProducto
                  key={item.id}
                  item={item}
                  enEdicion={elementoEnEdicion?.id === item.id}
                  alEditar={manejarSeleccionarEdicion}
                  alEliminar={manejarEliminar}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Listado;