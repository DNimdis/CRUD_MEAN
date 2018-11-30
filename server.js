const apiRoustes = require('./routes/api_v1');
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
var server = require('http').Server(app);

mongoose.connect('mongodb://localhost/productosdb', { 
        //useMongoClient: true,
        useNewUrlParser: true
});

// middleware 
app.use(morgan('dev'));
app.use(bodyParser.json());


// archivos estaticos
app.use(express.urlencoded({ extended: false }));
app.use(express.static( path.join( __dirname, 'public_html/dist/shopTest/')));
app.use('/', express.static(path.join(__dirname, 'public_html/dist/shopTest/')));


// rutas API
app.use('/api', apiRoustes);
// 
app.get('*', function(req, res) {						
	res.sendfile('./public_html/dist/shopTest/index.html');				
});


server.listen(3000, ()=>{
    console.log(' Servido en el puesto : 3000');
});