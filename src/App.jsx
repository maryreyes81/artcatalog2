// src/App.jsx
import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm.jsx";
import ItemsTable from "./components/ItemsTable.jsx";
import { getItems, createItem, updateItem, deleteItem } from "./lib/api";

export default function App() {

  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const [sort, setSort] = useState({
    key: "nombre",
    dir: "asc"
  });

  const load = async () => {
    const data = await getItems();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (form) => {

    if (editingItem) {
      await updateItem(editingItem.id, form);
      setEditingItem(null);
    } else {
      await createItem(form);
    }

    load();
  };

  const remove = async (id) => {
    await deleteItem(id);

    if (editingItem?.id === id) {
      setEditingItem(null);
    }

    load();
  };

  const filteredItems = items.filter((it) =>
    `${it.nombre} ${it.categoria} ${it.marca || ""}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {

    const av = (a[sort.key] ?? "").toString().toLowerCase();
    const bv = (b[sort.key] ?? "").toString().toLowerCase();

    if (av < bv) return sort.dir === "asc" ? -1 : 1;
    if (av > bv) return sort.dir === "asc" ? 1 : -1;

    return 0;
  });

  const toggleSort = (key) => {

    setSort((prev) => ({
      key,
      dir:
        prev.key === key && prev.dir === "asc"
          ? "desc"
          : "asc"
    }));
  };

  return (
    <div className="container">

      <h1 className="title">Inventario Arte</h1>

      <div className="card">
        <ItemForm
          onSave={save}
          editingItem={editingItem}
          onCancel={() => setEditingItem(null)}
        />
      </div>

      <div className="card">

        <input
          className="input search"
          placeholder="Buscar material..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="sortBar">

          <button
            className="btn"
            onClick={() => toggleSort("nombre")}
          >
            Ordenar Nombre ({sort.key === "nombre" ? sort.dir : "asc"})
          </button>

          <button
            className="btn"
            onClick={() => toggleSort("categoria")}
          >
            Ordenar Categoría ({sort.key === "categoria" ? sort.dir : "asc"})
          </button>

          <button
            className="btn"
            onClick={() => toggleSort("cantidad")}
          >
            Ordenar Cantidad ({sort.key === "cantidad" ? sort.dir : "asc"})
          </button>

        </div>

        <div className="tableWrap">
          <ItemsTable
            items={sortedItems}
            onDelete={remove}
            onEdit={(it) => setEditingItem(it)}
          />

        </div>

      </div>

    </div>
  );
}