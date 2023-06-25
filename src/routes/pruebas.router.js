const { Router } = require("express");
const { fork } = require("child_process"); //Importamos fork de child process

const asd = require("../utils/operacioncompleja");

const pruebasRouter = Router();

//Pruebas de peticion bloqueante / no bloqueante
function operacionCompleja() {
  let result = 0;
  for (let i = 0; i < 9e9; i++) {
    result += i;
  }
  return result;
}

pruebasRouter.get("/sumablock", (req, res) => {
  //funcion en /utils
  const result = operacionCompleja();
  res.send(`El resultado de la op es: ${result}`);
});

//Ejecuta el resultado de la funcion operacionCompleja() sin bloquear las demas peticiones. Desde utils/operacioncompleja escucha al process.on("message")
pruebasRouter.get("/sumanoblock", (req, res) => {
  const child = fork("./src/utils/operacioncompleja"); //crea un Proceso hijo
  child.send("Inicia el proceso de calculo"); //Envia mensaje al process.on de operacioncompleja.js
  child.on("message", (result) => {
    res.send(`El resultado de la op es: ${result}`);
  }); //captura el resultado del proceso padre
});

//Pruebas de middleware con palabra
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
