//Dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const expressSession = require('express-session');

//Init App
const PORT = process.env.PORT || 3000;
const IP = process.env.IP || 'localhost';
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'dist'))); // img, data
app.use(express.static(path.join(__dirname,'dist','clothes-app'))); // index.html

app.use(morgan('dev'));
app.use(expressSession({
    secret: 'my_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
})); // req.session

app.use((req,res,next) => {
    if(!req.session.visitCount)
        req.session.visitCount = 1;
    else
        req.session.visitCount += 1;
    next();
});

//Routes
const productRouter = require('./server/routes/product-router');
const categoryRouter = require('./server/routes/category-router');
const userRouter = require('./server/routes/user-router');
const shoppingCartRouter = require('./server/routes/shopping-cart-router');

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/users', userRouter);

app.use('/api/shoppingCart', shoppingCartRouter);

//Serve index.html
app.get('*', (req,res,next) => {
    res.sendFile(path.join(__dirname,'dist','clothes-app/index.html'));
});


//Error handling
app.use((err,req,res,next) => {
    if(err.status)
        res.status(err.status).send(err.message);
    else
        res.status(500).send();
});

app.listen(PORT,IP, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});
