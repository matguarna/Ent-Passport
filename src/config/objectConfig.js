//Archivo donde se configura mongoose
const { connect } = require("mongoose");
const dotenv = require("dotenv");
const { commander } = require("../utils/commander");
const { MongoSingleton } = require("../utils/singleton");
//Destructuring de la option mode
const { mode } = commander.opts();
//Configuracion de dotenv
dotenv.config({
  path: mode == "development" ? "./.env.development" : "./.env.production",
});

//const mongoSingleton = new MongoSingleton()

//en la url, luego del ".net./" ponemos el nombre de la base de datos, sino crea por defecto "test"
let urlDB = process.env.MONGO_URL_TEST; //"mongodb+srv://mguarna:pikachu1@cluster0.zbnzv1a.mongodb.net/DBpruebas?retryWrites=true&w=majority"; //

module.exports = {
  port: process.env.PORT,
  jwt_secret_key: process.env.JWT_SECRET_KEY, //"palabraJwtSecreta",
  // connectDB: () => {
  //   connect(urlDB);
  //   console.log("Base de datos conectada");
  // },
  connectDB: async () => {
    try {
      await MongoSingleton.getInstance();
    } catch (error) {
      console.log("connectDB Singleton ERROR", error);
    }
  },
};
