const express = require("express");
const sequelize = require("./app");
const Empleado = require("./models/Empleado");

const app = express();
app.use(express.json());

sequelize.sync()
  .then(() => console.log("Base de datos conectada"))
  .catch(err => console.log(err));

app.get("/empleados", async (req, res) => {
  const empleados = await Empleado.findAll();
  res.json(empleados);
});

app.get("/empleados/:id", async (req, res) => {
  const empleado = await Empleado.findByPk(req.params.id);
  if (!empleado) return res.status(404).json({ mensaje: "No encontrado" });
  res.json(empleado);
});

app.post("/empleados", async (req, res) => {
  const { nombre, puesto, salario } = req.body;

  if (salario <= 0) {
    return res.status(400).json({ mensaje: "El salario debe ser mayor que 0" });
  }

  const nuevoEmpleado = await Empleado.create({
    nombre,
    puesto,
    salario
  });

  res.status(201).json(nuevoEmpleado);
});

app.put("/empleados/:id", async (req, res) => {
  const empleado = await Empleado.findByPk(req.params.id);
  if (!empleado) return res.status(404).json({ mensaje: "No encontrado" });

  await empleado.update(req.body);
  res.json(empleado);
});

app.delete("/empleados/:id", async (req, res) => {
  const empleado = await Empleado.findByPk(req.params.id);
  if (!empleado) return res.status(404).json({ mensaje: "No encontrado" });

  await empleado.update({ activo: false });
  res.json({ mensaje: "Empleado desactivado" });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
