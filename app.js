const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var db = mongoose.connect("mongodb://localhost:27017/demo");
var user = require('./Models/userModel');
const collection_name = 'userInfo';
var helper = require('./helpers/helper');


var app = express();
var port = 4200; 

app.use(express.urlencoded({ extended: true }))

app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"/src/views"));

app.get('/createOrder', (req,res)=>{
 res.render('createOrder',{ title: "Create Order"});
});

app.get('/success', (req,res)=>{
    res.render('success');
});

app.post('/createOrder', (req,res)=>{
    user.create(req.body).then(function(posts) {
        res.redirect('/success');
    })
    .catch(function(error){
        console.log('Error getting the posts');
    });
});

app.get('/orderHistory',(req, res)=>{
    user.find().then((result)=>{
        res.render('orderHistory', {data:result, helper:helper});
    }).catch(function(error){
        console.log('Error getting the data');
    }); 
})

app.listen(port, (err,result)=>{
    if(err) throw err;
    console.log("Server running on port :"+port);
});
