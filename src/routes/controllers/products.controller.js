//const { productModel } = require("../../models/product.model");
const { productService } = require("../../services/index");

class ProductController {
  getProducts = async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.status(200).send({ status: "success", payload: products });
    } catch (error) {
      console.log(error);
    }
  };

  getStages = async (req, res) => {
    try {
      const products = await productService.stagesProduct();
      res.status(200).send({ status: "success", payload: products });
    } catch (error) {
      console.log(error);
    }
  };

  productPaginate = async (req, res) => {
    try {
      //Limit
      let { limit } = req.query;
      let limite;
      if (!limit) {
        limite = 10;
      } else {
        limite = limit;
      }

      //Page
      let { pagina } = req.query;
      let pag;
      if (!pagina) {
        pag = 1;
      } else {
        pag = pagina;
      }

      //Query
      let { query } = req.query;
      let filtro;
      if (!query) {
        filtro = {};
      } else {
        if (query) {
          filtro = { category: query };
        }
      }

      console.log("LOGS PAGINATE");
      const userLogueado = req.session.user;
      console.log(userLogueado);

      //Varible con los productos
      let productosPaginate = await productService.paginateProduct(filtro, limite, pag);

      let { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, page } = productosPaginate;

      //Sort
      let { sort } = req.query;
      //PROBLEMA: primero limita los prod de la db y luego hace el sort
      if (sort) {
        //deberia: traer todo sin limite, ordenarlos, limitarlos, mostrarlos
        //let todosProd = await productManagerMongo.getProducts();
        // console.log(todosProd);
        if (sort == "asc") {
          docs = docs.sort((a, b) => {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            }
            return 0;
          });
        } else if (sort == "desc") {
          docs = docs.sort((a, b) => {
            if (a.price < b.price) {
              return 1;
            }
            if (a.price > b.price) {
              return -1;
            }
            return 0;
          });
        }
      }

      //PROBLEMA CON LA URL: Cada peticion hace una nueva lista desordenada, las querys no se aplican al cambiar de pagina

      //console.log(req.url);
      //console.log(productosPaginate);

      res.render("products.handlebars", {
        status: "success",
        payload: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        totalPages,
        userLogueado,
      });
    } catch (error) {
      console.log("get Paginate ERROR", error);
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productService.getProductById(pid);
      res.status(200).send({ status: "success", payload: product });
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (req, res) => {
    try {
      const newProduct = req.body;
      let result = await productService.addProduct(newProduct);
      res.status(200).send({ status: "success", payload: result });
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const products = await productService.updateProduct(pid, updateProduct);
      res.status(200).send({ status: "success", payload: products });
    } catch (error) {
      console.log("productRouterMongo Update Error", error);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const products = await productService.deleteProduct(pid);
      res.status(200).send({ status: "success", payload: products });
    } catch (error) {
      console.log("productRouterMongo Delete Error", error);
    }
  };
}

module.exports = { ProductController };
