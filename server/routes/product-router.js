const express = require('express');
const productRepo = require('../models/products');

//Exports router
let productRouter = express.Router();

productRouter.get('/', (req,res) => {
    productRepo.findAll(products => {
        res.send(products);
    });
});

productRouter.get('/category/:id_category', (req,res) => {
    productRepo.findByCategoryId(req.params.id_category, products => {
        res.send(products);
    });
});

module.exports = productRouter;