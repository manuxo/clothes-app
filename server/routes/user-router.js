//Dependencies
const express = require('express');
const userRepo = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/auth');

//Exports router
let userRouter = express.Router();


userRouter.get('/', (req,res) => {
    if(req.query.email){
        userRepo.findByEmail(req.query.email, user => res.send(user));
    }else{
        userRepo.findAll(users => res.send(users));
    }
});

userRouter.post('/signup', (req,res) => {
    userRepo.findByEmail(req.body.email, rows => {
        if(rows.length >= 1)
            return res.status(409).send({message: 'Mail exists!'});
        else{
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                if(err)
                    return res.status(500).send({error: err});
                else{
                    const userData = {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        created: new Date(),
                        email: req.body.email,
                        password: hash
                    };
                    userRepo.save(userData, result => res.send(result));
                }
            });
        }
    })
});

userRouter.post('/login', (req,res) => {
    userRepo.findByEmail(req.body.email, rows => {
        if(rows.length < 1)
            return res.status(401).send({message: 'Auth failed'});
        
        bcrypt.compare(req.body.password, rows[0].password, (err,result) => {
            if(err)
                return res.status(401).send({message: 'Auth failed'});
            if(result){
                const payload = {
                    email: rows[0].email,
                    userId: rows[0].id
                };
                const token = jwt.sign(
                  payload,
                  'my_secret_key',
                  {
                    expiresIn: '0.5h'
                  }
                );
                return res.status(200).send({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).send({message: 'Auth failed'});
        });
    });
});

userRouter.get('/protected', checkAuth,(req,res)=>{
    res.status(200).send({message: 'Auth successful'});
});


userRouter.get('/:id', (req,res) => {
    userRepo.findById(req.params.id, user => res.send(user));
});

module.exports = userRouter;