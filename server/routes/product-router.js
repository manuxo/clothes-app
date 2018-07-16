const express = require('express');
const productRepo = require('../models/products');

//Exports router
let productRouter = express.Router();

productRouter.get('/', (req,res) => {
    productRepo.findAll(products => {
        res.send(products);
    })
});

module.exports = productRouter;