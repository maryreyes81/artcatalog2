const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET todos los items
router.get("/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener items" });
  }
});

// POST crear item
router.post("/items", async (req, res) => {
  try {
    const { nombre, categoria, marca, cantidad, imagen_url } = req.body;

    const result = await pool.query(
      "INSERT INTO items(nombre, categoria, marca, cantidad, imagen_url) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [nombre, categoria, marca, cantidad, imagen_url]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear item" });
  }
});

// PUT editar item
router.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, marca, cantidad, imagen_url } = req.body;

    const result = await pool.query(
      "UPDATE items SET nombre=$1, categoria=$2, marca=$3, cantidad=$4, imagen_url=$5 WHERE id=$6 RETURNING *",
      [nombre, categoria, marca, cantidad, imagen_url, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar item" });
  }
});

// DELETE eliminar item
router.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM items WHERE id=$1", [id]);

    res.json({ message: "Item eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar item" });
  }
});

module.exports = router;