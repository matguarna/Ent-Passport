const { Router } = require("express");
const auth = require("../middlewares/autenticacion.middleware");
const { UserController } = require("./controllers/user.controller");

const userController = new UserController();
const userRouter = Router();

//GET
//userRouter.get("/users", auth, userController.getUsers);

//mongoosePaginate
userRouter.get("/paginate", userController.getPaginate);

//POST
userRouter.post("/", userController.createUser);

//PUT  http://localhost:8080/usuarios/1
userRouter.put("/:uid", userController.updateUser);

//DELETE
userRouter.delete("/:uid", userController.deleteUser);

//{"first_name":"matho","last_name":"barracchia","email":"matho@gmail.com"}

module.exports = userRouter;
