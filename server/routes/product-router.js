const express = require('express');
const productRepo = require('../models/products');

//Exports router
let productRouter = express.Router();

productRouter.get('/', (req,res) => {
    if(req.query.name){
        console.log(req.query.name);
        productRepo.findByNameLike(req.query.name, products => {
            res.send(products);
        });
    }else{
        productRepo.findAll(products => {
            res.send(products);
        });
    }
});

productRouter.get('/category/:id_category', (req,res) => {
    productRepo.findByCategoryId(req.params.id_category, products => {
        res.send(products);
    });
});

module.exports = productRouter;