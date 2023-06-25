//const { userModel } = require("../../models/user.model");
const { userService } = require("../../services");
const { createHash, isValidPassword } = require("../../utils/bcryptHash");
const { generateToken } = require("../../utils/jwt");

class SessionController {
  base = (req, res) => {
    res.render("login", {});
  };

  counter = (req, res) => {
    if (req.session.counter) {
      req.session.counter++;
      res.send(`Se ha visitado el sitio ${req.session.counter} veces.`);
    } else {
      req.session.counter = 1;
      res.send("Bienvenido");
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    const userDB = await userService.loginSession(email);
    console.log("userDB del /login: ", userDB);

    //Validar passwd hasheada
    if (isValidPassword(password, userDB) == false) {
      return res.status(401).send({ status: "Error", message: "Usuario o contraseña incorrecta" });
    }

    if (!userDB) {
      return res.send({ status: "error", message: "Logueo incorrecto" });
    }

    //Guarda los datos en la sesion
    req.session.user = {
      first_name: userDB.first_name,
      last_name: userDB.last_name,
      email: userDB.email,
      username: userDB.username,
      role: "usuario",
    };

    //Variable sin la password de userDB, para generar el access token
    let userDBsinpass = userDB;
    delete userDBsinpass.password;
    userDBsinpass.role = "usuario";

    const access_token = generateToken(userDBsinpass);
    // res.redirect(`http://localhost:${process.env.PORT}/api/productos/paginate`);
    res
      .cookie("appCookieToken", access_token, {
        maxAge: 60 * 60 * 100,
        httpOnly: true, //Solo puede ser accedida en consulta http. (Seguridad)
      })
      .send({ status: "success", message: "Login success" });
  };

  register = async (req, res) => {
    try {
      res.send({
        status: "success",
        message: "User registered",
      });
    } catch (error) {
      console.log("Register POST session error", error);
    }
  };

  logout = (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        return res.send({ status: "Error", error: error });
      } else {
        res.redirect(`http://localhost:${process.env.PORT}/views/login`);
      }
    });
  };

  faillogin = async (req, res) => {
    console.log("Falló la estrategia");
    res.send({ status: "error", error: "falló el login" });
  };

  failregister = async (req, res) => {
    console.log("Falló la estrategia");
    res.send({ status: "error", error: "falló la autenticación" });
  };
}

module.exports = { SessionController };
