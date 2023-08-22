// import express
import express from "express";
  
// import function from controller
import { showProducts, showProductById, createProduct, updateProduct, deleteProduct } from "../controllers/Product.js";
  
// init express router
const router = express.Router();
  
// Get All Product
router.get('/Products', showProducts);
  
// Get Single Product
router.get('/Products/:id', showProductById);
  
// Create New Product
router.post('/Products', createProduct);
  
// Update Product
router.put('/Products/:id', updateProduct);
  
// Delete Product
router.delete('/Products/:id', deleteProduct);
  
// export default router
export default router;