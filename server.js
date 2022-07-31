const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const User = require('./server/model/model');
const connectDB = require('./server/database/connection');

const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  }));


app.use('/', (req, res, next) => {
  User.findOne({email:req.session.userId},function(err,data){
    req.user = data
    //console.log(req.user)
    next();
  });
});

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://test.localhost:${PORT}`)});