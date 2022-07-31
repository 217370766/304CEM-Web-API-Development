const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

const User = require('../model/model');

// User----
route.get('/', services.reg);
route.get('/admin', services.homeRoutes)
route.get('/add-user', services.add_user)
route.get('/update-user', services.update_user)


route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


//Product----
route.get('/add-pd', services.add_pd)
route.get('/update-pd', services.update_pd)
route.get('/pdadmin', services.pdRoutes)

route.post('/api/pd', controller.pdcreate);
route.put('/api/pd/:id', controller.pdupdate);
route.delete('/api/pd/:id', controller.pddelete);
route.get('/api/pd', controller.pdfind);

//car----
const shopController = require('../controller/shop');

route.get('/shop', shopController.getAllProducts);
route.post('/shop/add-to-cart', shopController.addToCart);
route.get('/cart', shopController.getCart);
route.post('/delete-cart', shopController.deleteInCart);



//Login session
route.get('/login', function (req, res, next) {
	User.findOne({email:req.session.userId},function(err,data){
		if(!data){
			return res.render('login.ejs', {"name":''});
		}else{
			return res.render('login.ejs', {"email":data.email,"name":data.name});
		}
	});
});


route.post('/login', function (req, res, next) {
	console.log(req.body);
	User.findOne({email:req.body.email},(err, data) => {
        if (data) {
			
			if(data.password==req.body.password){
				req.session.userId = data.email;
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

route.get('/profile', function (req, res, next) {
	req.user
	console.log("profile");
	User.findOne({email:req.session.userId},function(err,data){
		console.log("profile");
		console.log(data);
		if(!data){
			
			res.redirect('/login');
		}else{
			return res.render('profile.ejs', {"email":data.email,"name":data.name, cart: data.cart});
		}
	});
});

route.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

module.exports = route