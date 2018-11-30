const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const path = require('path');


const DIR = './public/dist/shopTest/assets/upload/';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      cb(null, file.originalname);

    }
});
let upload = multer({storage: storage});
router.post('/upload',upload.single('image_product'), function (req, res) {    
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
});

router.get('/product', (req, res)=>{
    Product.find({}, (error, product)=>{
        res.json(product);
    });
});

router.post('/product', (req, res)=>{
    delete req.body._id;
    Product.create(req.body,(err, product)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(product);
        }
    });
});

router.post('/product/:id', (req, res)=>{
    console.log(req.body);
    Product.findOne({_id: req.params.id},(err, product)=>{
        
            res.json(product);
        
    });
});

router.put('/product/:id', (req, res)=>{
    console.log(req.body);
    delete req.body._id;
    Product.update({ _id: req.params.id}, req.body, (err, product)=>{        
        if(err){
            res.json(err);
        }else{
            res.status(200).json(product);
        }
    });
});

router.delete('/product/:id', (req, res)=>{
    Product.deleteOne({ _id: req.params.id}, (err, product)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(product);
        }
    });
});



module.exports = router;