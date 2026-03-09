require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const itemsRoutes = require("./routes/items.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.use("/api", itemsRoutes);

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto", process.env.PORT);
});