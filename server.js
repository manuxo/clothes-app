//Dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');


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

//Routes
const productRouter = require('./server/routes/product-router');
const categoryRouter = require('./server/routes/category-router');

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRouter);


//Serve index.html
app.get('/', (req,res,next) => {
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
