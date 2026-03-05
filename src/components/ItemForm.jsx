
import { useEffect, useState } from "react";

const empty = { nombre: "", categoria: "", marca: "", cantidad: "", imagen_url: "" };

export default function ItemForm({ onSave, editingItem, onCancel }) {
  const [form, setForm] = useState(empty);

  // ✅ cuando das click en "Editar", precarga el formulario
  useEffect(() => {
    if (editingItem) {
      setForm({
        nombre: editingItem.nombre ?? "",
        categoria: editingItem.categoria ?? "",
        marca: editingItem.marca ?? "",
        cantidad: String(editingItem.cantidad ?? ""),
        imagen_url: editingItem.imagen_url ?? ""
      });
    } else {
      setForm(empty);
    }
  }, [editingItem]);

  const change = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...form, cantidad: Number(form.cantidad || 0) });

    // si estabas editando, el App ya pone editingItem en null
    // aquí solo limpiamos el form
    setForm(empty);
  };

  return (
    <form onSubmit={submit}>
      {/* HEADERS arriba de los inputs */}
      <div className="formHeader">
        <span>Nombre</span>
        <span>Categoria</span>
        <span>Marca</span>
        <span>Cantidad</span>
        <span></span>
      </div>

      {/* FILA de inputs alineada */}
      <div className="formRow">
        <input
          className="input"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={change}
        />
        <input
          className="input"
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={change}
        />
        <input
          className="input"
          name="marca"
          placeholder="Marca"
          value={form.marca}
          onChange={change}
        />
        <input
          className="input"
          name="cantidad"
          type="number"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={change}
        />
        <input
          className="input"
          name="imagen_url"
          placeholder="https://imagen..."
          value={form.imagen_url}
          onChange={change}
        />
              
        <button className="btn" type="submit">
          {editingItem ? "Guardar cambios" : "Guardar"}
        </button>

        {editingItem ? (
          <button className="btnDanger" type="button" onClick={onCancel}>
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}