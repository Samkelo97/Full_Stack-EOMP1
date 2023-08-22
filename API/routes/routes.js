const express = require("express");
const productController = require("../controller/product");
//User Imports
const bodyParser = require('body-parser')
//Import all model's objects

// init express router
const router = express.Router();
const {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = productController;
// Get All Product
router.get("/products", showProducts);
// Get Single Product
router.get("/products/:id", showProductById);
// Create New Product
router.post("/productsAdd", createProduct);
// Update Product
router.put("/products/:id", updateProduct);
// Delete Product
router.delete("/products/:id", deleteProduct);







