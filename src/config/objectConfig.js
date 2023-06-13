//Archivo donde se configura mongoose
const { connect } = require("mongoose");
const dotenv = require("dotenv");
const { commander } = require("../utils/commander");

//Destructuring de la option mode
const { mode } = commander.opts();
//Configuracion de dotenv
dotenv.config({
  path: mode == "development" ? "./.env.development" : "./.env.production",
});

//en la url, luego del ".net./" ponemos el nombre de la base de datos, sino crea por defecto "test"
let urlDB = "mongodb+srv://mguarna:pikachu1@cluster0.zbnzv1a.mongodb.net/DBpruebas?retryWrites=true&w=majority"; //process.env.MONGO_URL_TEST

module.exports = {
  jwt_secret_key: "palabraJwtSecreta", //process.env.JWT_SECRET_KEY
  connectDB: () => {
    connect(urlDB);
    console.log("Base de datos conectada");
  },
};
