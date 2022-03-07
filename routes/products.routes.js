const express = require('express');
const router = express.Router();

const ProductsControllers = require('../controllers/products.controllers.js');


router.get('/products', ProductsControllers.getAll);

router.get('/products/random', ProductsControllers.getRandom);

router.get('/products/:id', ProductsControllers.getById);

router.post('/products', ProductsControllers.postNewRecord);

router.put('/products/:id', ProductsControllers.putById);

router.delete('/products/:id', ProductsControllers.deleteById);

module.exports = router;
