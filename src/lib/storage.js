const KEY = "inventario_items_v1";
export function readItems() {
 try {
 const raw = localStorage.getItem(KEY);
 return raw ? JSON.parse(raw) : [];
 } catch {
 return [];
 }
}
export function writeItems(items) {
 localStorage.setItem(KEY, JSON.stringify(items));
}
export function makeId() {
 return crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
}
