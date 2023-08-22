// productModel.js
const db = require("../model/index");

class ProductModel {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // You can add methods here as well
  getProductInfo() {
    return `Product Name: ${this.name}, Price: ${this.price}`;
  }

  static getProducts(result) {
    db.query("SELECT * FROM Products", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
  }

  static getProductById(id, result) {
    db.query("SELECT * FROM Products WHERE productID = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
  }

  static insertProduct(data, result) {
    db.query("INSERT INTO Products SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
  }

  static updateProductById(data, id, result) {
    db.query("UPDATE Products SET productName = ?, productPrice = ?, productStock = ?, productURL = ?, category = ? WHERE productID = ?", [data.productName, data.productPrice, data.productStock, data.productURL, data.category, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
  }

  static deleteProductById(id, result) {
    db.query("DELETE FROM Products WHERE productID = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
  }
}

module.exports = ProductModel;
