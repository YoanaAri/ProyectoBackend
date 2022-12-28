const express = require('express');
const { createCarrito, showProducts, addProduct }  = require('../../api/carritos.api');


const router = express.Router();

//crea un carrito
router.post('/', createCarrito);

//lista los productos guardados en el carrito 
router.get('/:cid', showProducts);


//incorpora productos al carrito por su id
router.post('/:cid/products/:pid', addProduct);

module.exports = router;