var express = require('express');
var bodyParser = require('body-parser');
var database = require('../database/index.js');

var app = express();

//to view data in body of api calls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/../client/dist'));
//app.use(history());


app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000!');
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

