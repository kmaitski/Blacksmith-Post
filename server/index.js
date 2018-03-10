var express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');
var database = require('../database/index.js');
var config = require('./config.js')
const passport = require('passport');
const flash = require('connect-flash');
const transporter = require('../config/mailconfig');
const cloudinary = require('cloudinary');
var nodemailer = require('nodemailer');


var app = express();

var stripe = require("stripe")(
  config.config
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

// cloudinary.config({
//   cloud_name: 'hdyuqy7w6',
//   api_key: '687366632423641',
//   api_secret: 'Dv87E7g1IsslPhHnmFwUKSu6fO0'
// });

// app.get('/signup', (req, res) => {
//   res.render('signup.ejs', {message: req.flash('signupMessage')});
// });

app.post('/charge', function(req, res) {
    stripe.charges.create({
      amount: req.body.cost * 100,
      currency: "usd",
      source: req.body.token.id,
      description: "Charge for anon user"
    }, function(err, charge) {
      if(err){
        console.error(err);
        res.end()
      } else {
        transporter.transporter.sendMail({
          from: 'blacksmithpostroanl@gmail.com',
          to: req.body.seller,
          subject: 'Your item sold on Blacksmith Post!',
          text: 'Great smithing! Your item ' + req.body.item + ' sold for $' + req.body.cost + ' on Blacksmith Post!'
        }, function(error, info){
          if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
})
        res.writeHead(200);
        res.end();
      }
    }
  )
});

app.get('/signupS', function(req, res) {
  res.send(req.flash('User'))
});

app.get('/signupF', function(req, res) {
  res.send({message: req.flash('signupMessage')})
});

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/signupS',
  failureRedirect: '/signupF',
  failureFlash: true,
  successFlash: true
}));

app.get('/loginS', function(req, res) {
  res.send(req.flash('User'))
});

app.get('/loginF', function(req, res) {
  res.send({message: req.flash('loginMessage')})
});

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/loginS',
  failureRedirect: '/loginF',
  failureFlash: true,
  successFlash: true
}));

app.get('/logout', function(req, res) {
  console.log('logout hit');
  req.logout();
  res.redirect('/');
});

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
  // console.log('in server');
  // let newItem = req.body;
  // let filename = req.body.image.split('\\')[2];
  // // console.log(filename);
  // cloudinary.uploader.upload(filename, result => {
  //   console.log(result);
  // })
  // console.log(req.body);
  database.createItem(req.body);
    res.sendStatus(200);

})

//api call to delete a item not in use but works
app.post('/api/deleteItem', function (req, res){
  console.log(req.body.type +" req body delete")
  database.deleteItem(req.body);
  res.sendStatus(200);
});