var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blacksmith');

var db = mongoose.connection;




db.collection('items').drop();



//creates new collection of items with data loated in data.json
var docs = fs.readFile('predata.json', 'utf8', function (err, data) {
  var items = db.collection('items');
  console.log(data)
  items.insert(JSON.parse(data), function (err, docs) {
    items.count(function (err, count) {
      console.log(count + "[" + data + "]");
      db.close();
    });
  });
});