var express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');
var database = require('../database/index.js');
var config = require('./config.js')
const passport = require('passport');
const flash = require('connect-flash');
const sendMail = require('../config/mailconfig');

var app = express();

var stripe = require("stripe")(
  config.api
);
//to view data in body of api calls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/../client/dist'));

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000!');
});

app.use(session({
  secret: 'Is Will Smith a blacksmith?', //omfg lol
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./../config/passport.js')(passport);

// app.get('/signup', (req, res) => {
//   res.render('signup.ejs', {message: req.flash('signupMessage')});
// });

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}));

//request to view all items of type
app.get('/api/items', function (req, res) {
 database.allItems(function (err, data){
  if (err){
    res.sendStatus(500 +"cant find item");
  } else {
    res.json(data)
  }
 })
})

//request to add item to database
app.post('/api/itemForm', function (req, res){
    console.log(req.body +" this req body weapform");
  database.createItem(req.body);
    res.sendStatus(200);

})

//api call to delete a item not in use but works
app.post('/api/deleteItem', function (req, res){
  console.log(req.body.type +" req body delete")
  database.deleteItem(req.body);
  res.sendStatus(200);
});

app.post('/buy', function(req, res) {
  var thing = sendMail;
  res.end();
})
