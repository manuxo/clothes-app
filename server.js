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

app.use(express.static(path.join(__dirname,'dist','clothes-app')));

app.use(morgan('dev'));

//Routes

app.get('*', (req,res,next) => {
    res.sendFile(path.join(__dirname,'dist','clothes-app'));
});

app.listen(PORT,IP, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});
