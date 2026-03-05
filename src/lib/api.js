// src/lib/api.js
import { readItems, writeItems, makeId } from "./storage";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
export async function getItems() {
 await wait(200);
 return readItems();
}
export async function createItem(data) {
 await wait(200);
 const items = readItems();
 const newItem = {
 id: makeId(),
 nombre: data.nombre,
 categoria: data.categoria,
 marca: data.marca || "",
 cantidad: Number(data.cantidad || 0),
 unidad: data.unidad || "pza",
 ubicacion: data.ubicacion || "",
 notas: data.notas || "",
 imagen_url: data.imagen_url || "",
 };
 items.push(newItem);
 writeItems(items);
 return newItem;
}
export async function updateItem(id, data) {
 const items = readItems();
 const idx = items.findIndex((x) => x.id === id);
 items[idx] = { ...items[idx], ...data };
 writeItems(items);
 return items[idx];
}
export async function deleteItem(id) {
 const items = readItems().filter((x) => x.id !== id);
 writeItems(items);
}