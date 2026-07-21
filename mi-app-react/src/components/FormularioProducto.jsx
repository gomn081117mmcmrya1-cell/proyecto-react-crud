import { useState } from 'react';

function FormularioProducto() {
  // 3. Almacenar los valores del formulario mediante estado
  const [formData, setFormData] = useState({
    nombre: '',
    correoContacto: '',
    precio: '',
    categoria: '',
    fechaIngreso: '',
    descripcion: ''
  });

  // Estado para los mensajes de error (Punto 5)
  const [errores, setErrores] = useState({});

  // Estado para mensaje de éxito tras el envío
  const [mensajeExito, setMensajeExito] = useState('');

  // Manejador del cambio en los inputs (onChange centralizado)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Limpiar el error del campo que el usuario está editando
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ''
      });
    }
  };

  // 4. Función de Validación
  const validarFormulario = () => {
    let erroresEncontrados = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación: Campo de texto (Nombre) - Obligatorio y longitud mínima
    if (!formData.nombre.trim()) {
      erroresEncontrados.nombre = 'El nombre del producto es obligatorio.';
    } else if (formData.nombre.trim().length < 3) {
      erroresEncontrados.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    // Validación: Correo - Formato correcto
    if (!formData.correoContacto.trim()) {
      erroresEncontrados.correoContacto = 'El correo de contacto es obligatorio.';
    } else if (!regexEmail.test(formData.correoContacto)) {
      erroresEncontrados.correoContacto = 'Ingresa un correo electrónico válido (ejemplo@dominio.com).';
    }

    // Validación: Campo numérico (Precio) - Obligatorio y mayor a 0
    if (!formData.precio) {
      erroresEncontrados.precio = 'El precio es obligatorio.';
    } else if (parseFloat(formData.precio) <= 0) {
      erroresEncontrados.precio = 'El precio debe ser un número positivo mayor a $0.';
    }

    // Validación: Lista desplegable (Categoría) - Obligatorio
    if (!formData.categoria) {
      erroresEncontrados.categoria = 'Debes seleccionar una categoría.';
    }

    // Validación: Fecha - Obligatorio
    if (!formData.fechaIngreso) {
      erroresEncontrados.fechaIngreso = 'La fecha de ingreso es obligatoria.';
    }

    // Validación: Área de texto (Descripción) - Obligatorio y longitud mínima
    if (!formData.descripcion.trim()) {
      erroresEncontrados.descripcion = 'La descripción es obligatoria.';
    } else if (formData.descripcion.trim().length < 10) {
      erroresEncontrados.descripcion = 'La descripción debe tener al menos 10 caracteres.';
    }

    return erroresEncontrados;
  };

  // Manejador del envío del formulario (onSubmit)
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeExito('');

    const erroresValidacion = validarFormulario();

    if (Object.keys(erroresValidacion).length > 0) {
      // 5. Mostrar mensajes específicos de error
      setErrores(erroresValidacion);
    } else {
      // 6. Formulario válido: Limpiar y mostrar éxito
      setErrores({});
      setMensajeExito('✅ ¡Producto registrado exitosamente en el sistema!');

      // Limpiar el formulario
      setFormData({
        nombre: '',
        correoContacto: '',
        precio: '',
        categoria: '',
        fechaIngreso: '',
        descripcion: ''
      });
    }
  };

  // Estilos rápidos reutilizables
  const estiloCampo = { marginBottom: '15px' };
  const estiloInput = { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
  const estiloError = { color: '#dc3545', fontSize: '13px', marginTop: '4px', fontWeight: 'bold' };

  return (
    <div style={{ maxWidth: '550px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Registro de Producto 📦</h2>

      {mensajeExito && (
        <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>
          {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* 2. Campo de texto + Email */}
        <div style={estiloCampo}>
          <label style={{ fontWeight: 'bold' }}>Nombre del Producto (*):</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Teclado Mecánico"
            style={estiloInput}
          />
          {errores.nombre && <p style={estiloError}>{errores.nombre}</p>}
        </div>

        <div style={estiloCampo}>
          <label style={{ fontWeight: 'bold' }}>Correo del Proveedor (*):</label>
          <input
            type="email"
            name="correoContacto"
            value={formData.correoContacto}
            onChange={handleChange}
            placeholder="ejemplo@tienda.com"
            style={estiloInput}
          />
          {errores.correoContacto && <p style={estiloError}>{errores.correoContacto}</p>}
        </div>

        {/* 2. Campo numérico */}
        <div style={estiloCampo}>
          <label style={{ fontWeight: 'bold' }}>Precio ($) (*):</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Ej. 49.99"
            style={estiloInput}
          />
          {errores.precio && <p style={estiloError}>{errores.precio}</p>}
        </div>

        {/* 2. Lista desplegable */}
        <div style={estiloCampo}>
          <label style={{ fontWeight: 'bold' }}>Categoría (*):</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            style={estiloInput}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="Electronica">Electrónica</option>
            <option value="Ropa">Ropa y Accesorios</option>
            <option value="Hogar">Hogar y Oficina</option>
          </select>
          {errores.categoria && <p style={estiloError}>{errores.categoria}</p>}
        </div>

        {/* 2. Fecha */}
        <div style={estiloCampo}>
          <label style={{ fontWeight: 'bold' }}>Fecha de Ingreso (*):</label>
          <input
            type="date"
            name="fechaIngreso"
            value={formData.fechaIngreso}
            onChange={handleChange}
            style={estiloInput}
          />
          {errores.fechaIngreso && <p style={estiloError}>{errores.fechaIngreso}</p>}
        </div>

        {/* 2. Área de texto */}
        <div style={estiloCampo}>
          <label style={{ fontWeight: 'bold' }}>Descripción del Producto (*):</label>
          <textarea
            name="descripcion"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe las características principales..."
            style={estiloInput}
          />
          {errores.descripcion && <p style={estiloError}>{errores.descripcion}</p>}
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default FormularioProducto;