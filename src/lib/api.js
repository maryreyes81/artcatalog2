const BASE_URL = "http://localhost:3000/api/items";

export async function getItems() {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Error al obtener items");
  }

  return res.json();
}

export async function createItem(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear item");
  }

  return res.json();
}

export async function updateItem(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar item");
  }

  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar item");
  }

  return res.json();
}