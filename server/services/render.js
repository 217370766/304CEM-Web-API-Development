const axios = require('axios');
const User = require('../model/model');
const pd = require('../model/pdmodel');

exports.homeRoutes = (req, res) => {
    User.findOne({email:req.session.userId},function(err,data){
		console.log("profile");
		console.log(data);
        if(!data){
			res.redirect('/login');
        }else{
		    if(data.name!="admin"){
			    return res.redirect('/login');
        }else{
    // Make a get request to /api/users
    axios.get('http://localhost:80/api/users')
        .then(function(response){
            res.render('admin', { users : response.data,"name":data.name });
        })
        .catch(err =>{
            res.send(err);
        })
    }}});
}


exports.add_user = (req, res) =>{
    res.render('add_user',{"email":"","name":""});
    
}

// exports.reg = (req, res) =>{
//     res.render('index',{"name":""});
// }
exports.reg = (req, res) =>{
    User.findOne({email:req.session.userId},function(err,data){
		console.log(data);
		if(!data){
			res.render('index',{"name":""});
        }else{
    axios.get('http://localhost:80/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("index", { user : userdata.data, "name":data.name})
        })
        .catch(err =>{
            res.send(err);
        })
    }});
}



exports.update_user = (req, res) =>{
    User.findOne({email:req.session.userId},function(err,data){
		console.log(data);
		if(!data){
			res.redirect('/');
        }else{
    axios.get('http://localhost:80/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data, "name":data.name})
        })
        .catch(err =>{
            res.send(err);
        })
    }});
}






//Product----
exports.add_pd = (req, res) =>{
    res.render('add_pd',{"email":"","name":""});
    
}


exports.update_pd = (req, res) =>{
    User.findOne({email:req.session.userId},function(err,data){
		if(!data){
			res.redirect('/');
        }else{
    axios.get('http://localhost:80/api/pd', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_pd", { pd : userdata.data, "name":data.name})
        })
        .catch(err =>{
            res.send(err);
        })
    }});
}

exports.pdRoutes = (req, res) => {
    User.findOne({email:req.session.userId},function(err,data){
		console.log("profile");
		console.log(data);
        if(!data){
			res.redirect('/login');
        }else{
		    if(data.name!="admin"){
			    return res.redirect('/login');
        }else{
    // Make a get request to /api/users
    axios.get('http://localhost:80/api/pd')
        .then(function(response){
            res.render('pdadmin', { pd : response.data,"name":data.name });
        })
        .catch(err =>{
            res.send(err);
        })
    }}});
}
