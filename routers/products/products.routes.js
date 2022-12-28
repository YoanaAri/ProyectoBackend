const express = require('express');
const { getProducts, getProductId, saveProduct, updateProduct, deleteProduct }  = require('../../api/products.api');

const router = express.Router();

//Lista todos los productos
router.get('/', getProducts);

//Mustra el poducto por su id
router.get('/:pid', getProductId);

//incorpora el producto 
router.post('/', saveProduct);


//Actualiza un producto por su id
router.put('/:pid', updateProduct);

//Borra un producto por su id
router.delete('/:pid', deleteProduct);

module.exports = router;