const express = require('express');
const categoryRepo = require('../models/categories');
let categoryRouter = express.Router();

categoryRouter.get('/', (req,res) => {
    categoryRepo.findAll(data => {
        res.send(data);
    });
});

categoryRouter.get('/:category_id', (req,res) => {
    categoryRepo.findById(req.params.category_id, data => {
        if(data){
            res.send(data);
        }else{
            res.status(204).send();
        }
    });
});

categoryRouter.put('/:category_id', (req,res) => {

});

categoryRouter.delete('/:category_id', (req,res) => {

});

module.exports = categoryRouter;