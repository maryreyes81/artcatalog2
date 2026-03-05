// src/components/ItemsTable.jsx
export default function ItemsTable({ items, onDelete, onEdit }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Cantidad</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan="5">No hay materiales todavía</td>
          </tr>
        ) : (
          items.map((it) => (
            <tr key={it.id}>
              <td>{it.nombre}</td>
              <td>{it.categoria}</td>
              <td>{it.cantidad}</td>

              <td>
                {it.imagen_url ? (
                  <img
                    src={it.imagen_url}
                    width="40"
                    style={{ borderRadius: 6, display: "block", margin: "0 auto" }}
                    alt={it.nombre}
                  />
                ) : (
                  "-"
                )}
              </td>

              <td>
                <div className="actions">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => onEdit(it)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btnDanger"
                    onClick={() => onDelete(it.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}