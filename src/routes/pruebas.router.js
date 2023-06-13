const { Router } = require("express");

const pruebasRouter = Router();

const nombres = ["fede", "juan", "pedro"];
//middleware con palabra
pruebasRouter.param("nombre", (req, res, next, nombre) => {
  if (!nombres.includes(nombre)) {
    req.nombre = null;
    res.send("No existe el parametro");
  } else {
    req.nombre = nombre;
  }
  next();
});

//minusculas y mayusculas = ([a-zA-Z]+)
//á = %C3%A1
//é = %C3%A9
//í = %C3%AD
//ó = %C3%B3
//ú = %C3%BA
//ü = %C3%BC
//0 a 9 = 0-9

//Se da por parametros las condiciones del string
pruebasRouter.get("/nombre/:palabra([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC0-9]+)", (req, res) => {
  const { nombre } = req.nombre;
  console.log(nombre);
  res.send({
    message: req.params.nombre,
  });
});

pruebasRouter.put("/params/:nombre([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC0-9]+)", (req, res) => {
  const { nombre } = req.nombre;
  console.log(nombre);
  res.send({
    message: req.params.nombre,
  });
});

pruebasRouter.delete("/nombre/:palabra([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC0-9]+)", (req, res) => {
  const { nombre } = req.nombre;
  console.log(nombre);
  res.send({
    message: req.params.nombre,
  });
});

//Ruta de escape para cualquier ruta que no exista
pruebasRouter.get("*", async (req, res) => {
  res.status(404).send("404 Not found");
});

module.exports = pruebasRouter;
