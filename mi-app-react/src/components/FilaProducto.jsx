import React from 'react';

// Separación de componente para mejorar legibilidad y rendimiento
function FilaProducto({ item, enEdicion, alEditar, alEliminar }) {
  return (
    <tr className={enEdicion ? 'table-warning' : ''}>
      <td className="fw-bold">#{item.id}</td>
      <td className="fw-semibold text-capitalize">{item.title}</td>
      <td className="text-muted small">{item.body}</td>
      <td className="text-center">
        <div className="btn-group btn-group-sm" role="group">
          {/* Opción de Editar (PUT) */}
          <button
            className="btn btn-outline-warning text-dark fw-bold"
            onClick={() => alEditar(item)}
          >
            ✏️ Editar
          </button>

          {/* 1. Botón para eliminar */}
          <button
            className="btn btn-outline-danger fw-bold"
            onClick={() => alEliminar(item.id, item.title)}
          >
            🗑️ Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

// React.memo evita renderizados innecesarios si las props no cambian (Punto 5)
export default React.memo(FilaProducto);