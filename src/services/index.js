//traer una instancia de los DAOs (manager)
const { ProductDaoMongo } = require("../Daos/mongo/product.mongo");
const { UserDaoMongo } = require("../Daos/mongo/user.mongo");
const { CartDaoMongo } = require("../Daos/mongo/cart.mongo");

//traer repositories
const userService = new UserDaoMongo();
const productService = new ProductDaoMongo();
const cartService = new CartDaoMongo();

module.exports = {
  userService,
  productService,
  cartService,
};
