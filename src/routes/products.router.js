const { Router } = require("express");
// const { ProductDaoMongo } = require("../Daos/mongo/product.mongo");
//const { productModel } = require("../models/product.model");
// const passport = require("passport");

// const productDaoMongo = new ProductDaoMongo();
const productRouterMongo = Router();

// const { productService } = require("../services/index");
const { ProductController } = require("./controllers/products.controller");

const productController = new ProductController();

//getProducts - passport jwt
productRouterMongo.get(
  "/",
  //passport.authenticate("jwt", { session: false }),
  productController.getProducts
);

//stages
productRouterMongo.get("/stages", productController.getStages);

//mongoosePaginate
productRouterMongo.get("/paginate", productController.productPaginate);

//getProductById
productRouterMongo.get("/:pid", productController.getProductById);

//addProduct
productRouterMongo.post("/", productController.addProduct);

//updateProduct
productRouterMongo.put("/:pid", productController.updateProduct);

//deleteProduct
productRouterMongo.delete("/:pid", productController.deleteProduct);

module.exports = productRouterMongo;
