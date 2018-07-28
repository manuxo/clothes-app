//Dependencies
const express = require('express');
const productRepo = require('../models/products');


//Middleware
const checkCartItem = require('../middleware/check-cart-item'); //function
const checkAuth = require('../middleware/auth'); //function

const checkProductId = (req,res,next) => {
    const id = req.params.id;
    const aux = req.session.shoppingCart.findIndex(element =>{
        return element.id_product === id;
    });
    if(aux <= -1)
        return res.status(400).send('Product not found.');
    else{
        next();
    }
}

//Exports router
let shoppingCartRouter = express.Router();


shoppingCartRouter.get('/', (req,res) => {
    res.status(200).send(req.session.shoppingCart);
});


shoppingCartRouter.post('/add',checkAuth,checkCartItem,(req,res) => {
    const cartItem = {
        id_product : req.body.id_product,
        quantity : req.body.quantity,
        amount: req.body.amount
    };
    req.session.shoppingCart.push(cartItem);
    res.status(201).send(cartItem);
});

shoppingCartRouter.delete('/:id', checkAuth,checkProductId, (req,res) => {
    req.session.shoppingCart.splice(req.params.id,1);
    res.send(204).send();
});



module.exports = shoppingCartRouter;