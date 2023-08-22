const connection = require("../config/index");
// import connection
// import db from "../config/database.js";
// Get All Products
const getProducts = (result) => {
  connection.query("SELECT * FROM Products", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
// Get Single Product
const getProductById = (id, result) => {
  connection.query(
    "SELECT * FROM Products WHERE productID = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};
// Insert Product to Database
// const insertProduct = (data, result) => {
//     // const { productName, productPrice, productStock, productUrl, category, id } = data;
//     // db.query("INSERT INTO Products SET ?", [data], (err, results) => {
//         // db.query("INSERT INTO Products SET ?", [data], (err, results) => {
//         db.query("INSERT INTO Products (productName, productPrice, productStock, productUrl, category) VALUES (?, ?, ?, ?, ?)", [data], (err, results) => {
//             [data.productName, data.productPrice, data.productStock, data.productUrl, data.category]
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });
// }
const insertProduct = (data, result) => {
  const { productName, productPrice, productStock, productUrl, category } =
    data;
  const values = [
    productName,
    productPrice,
    productStock,
    productUrl,
    category,
  ];
  connection.query(
    "INSERT INTO Products (productName, productPrice, productStock, productUrl, category) VALUES (?, ?, ?, ?, ?)",
    values,
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
// Update Product to Database
const updateProductById = (data, id, result) => {
  //db.query("UPDATE Products SET product_name = ?, product_price = ? WHERE product_id = ?", [data.product_name, data.product_price, id], (err, results) => {
  connection.query(
    "UPDATE Products SET productName = ?, productPrice = ?, productStock = ?, productUrl = ?, category = ? WHERE productID = ?",
    [productName, productPrice, productStock, productUrl, category, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
// Delete Product to Database
const deleteProductById = (id, result) => {
  connection.query(
    "DELETE FROM Products WHERE productID = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
module.exports = {
  getProducts,
  getProductById,
  insertProduct,
  updateProductById,
  deleteProductById,
};
