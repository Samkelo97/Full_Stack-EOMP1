const {
    getProducts,
    getProductById,
    insertProduct,
    updateProductById,
    deleteProductById,
  } = require("../model/productModel");
  // Import function from Product Model
  //import { getProducts, getProductById, insertProduct, updateProductById, deleteProductById } from "../models/productModel.js";
  // Get All Products
  const showProducts = (req, res) => {
    getProducts((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  // Get Single Product
  const showProductById = (req, res) => {
    getProductById(req.params.id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  // Create New Product
  const createProduct = (req, res) => {
    const data = req.body;
    insertProduct(data, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  // Update Product
  const updateProduct = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    // updateProductById(data, id, (err, results) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.json(results);
    //   }
    // });

    const product = {
      prodName: req.body.prodName,
      quantity: req.body.quantity,
      amount: req.body.amount,
      Category: req.body.Category,
      prodUrl: req.body.prodUrl,
    };
    const query = `UPDATE products SET ? WHERE prodID = ${req.params.id}`;
    db.query(query, product, (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: 'The product record was updated.',
      });
    });
  };

  // updateProductById(req, res)
  //   const product = {
  //     prodName: req.body.prodName,
  //     quantity: req.body.quantity,
  //     amount: req.body.amount,
  //     Category: req.body.Category,
  //     prodUrl: req.body.prodUrl,
  //   };
  //   const query = `UPDATE products SET ? WHERE prodID = ${req.params.id}`;
  //   db.query(query, product, (err) => {
  //     if (err) throw err;
  //     res.json({
  //       status: res.statusCode,
  //       msg: 'The product record was updated.',
  //     });
  //   });
  





  // Delete Product
  const deleteProduct = (req, res) => {
    const id = req.params.id;
    deleteProductById(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  module.exports = {
    showProducts,
    showProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
  
  
  
  
  
  
  
  