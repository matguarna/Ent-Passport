const commander = require("commander");

//Crea una instancia para poder manejar los argumentos
const program = new commander.Command();

//Parametros de option: ("flag de la consola", "descripcion", "Valor por defecto")
program
  .option("-d", "Variable para debug", false)
  .option("-p, --port <port>", "Puerto para el servidor", 8080) //Los <> son parametros donde se guarda el valor
  .option("--mode <mode>", "Modo de trabajo", "production")
  .requiredOption("-u <user>", "Usuario utilizando la app", "No se ha declarado un usuario")
  .option("-l, --letters [letters...]", "specify the letters")
  .parse(); //parsea para que lo podamos usar

console.log("options: ", program.opts()); //opts() funcion que muestra las options
console.log("Remaining Arguments: ", program.args);

//node commander.js -d -p 3000 --mode delevopment -u root --letters a b c
