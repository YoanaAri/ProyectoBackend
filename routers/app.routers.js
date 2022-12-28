const express = require('express');
const productsRoutes = require('./products/products.routes');
const carritosRoutes = require('./carritos/carritos.routes');
    
const router = express.Router();
router.use('/products', productsRoutes);
router.use('/carts', carritosRoutes);

module.exports = router;