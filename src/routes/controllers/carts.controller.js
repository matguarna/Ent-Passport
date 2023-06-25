const { cartService } = require("../../services/index");

class CartController {
  createCart = async (req, res) => {
    try {
      //const newProduct = req.body;
      let result = await cartService.addCart();
      res.status(200).send({ status: "success", payload: result });
    } catch (error) {
      console.log("cartRouterMongo get: Error", error);
    }
  };

  verProdCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartById(cid);
      let { products } = cart;
      res.render("cart.handlebars", {
        status: "success",
        payload: products,
      });
    } catch (error) {
      console.log(error);
    }
  };

  addToCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const cart = await cartService.addProductToCart(cid, pid);
      res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
      console.log(error);
    }
  };

  updateCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      await cartService.updateProduct(cid, pid, quantity);

      res.status(200).send({ status: "success", payload: `Cart ${cid} actualizado` });
    } catch (error) {
      console.log("updateCart error", error);
    }
  };

  deleteCartProd = async (req, res) => {
    try {
      const { cid, pid } = req.params;

      let realizado = await cartService.deleteProduct(cid, pid);
      if (realizado) {
        res.status(200).send({ status: "success", payload: `Producto ${pid} eliminado del Cart ${cid}` });
      }
    } catch (error) {
      console.log("updateCart error", error);
    }
  };

  vaciarCart = async (req, res) => {
    try {
      const { cid } = req.params;
      let realizado = await cartService.deleteAllProducts(cid);
      if (realizado) {
        res.status(200).send({ status: "success", payload: `Cart ${cid} vaciado` });
      }
    } catch (error) {
      console.log("updateCart error", error);
    }
  };
}

module.exports = {
  CartController,
};
