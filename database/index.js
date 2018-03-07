var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/blacksmith');

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  name: String,
  description: String,
  cost: Number,
  email: String,
  condition: String,
  blacksmith: String,
  material: String,
  image: String,
  class: String,
  subclass: String,
  active: Boolean
});




var item = module.exports = mongoose.model('item', itemSchema);

//create a item listing
var createItem = function (data) {
  console.log('create item func starting')
    new item({
      name: data.name || "greatHelm",
      description: data.description || "from the swamp of mordor",
      cost: data.cost || 999999,
      email: data.email || "gandalf@hotmail.com",
      condition: data.condition || "strong like bull",
      blacksmith: data.blacksmith || "hatori hanzo",
      material: data.material || "dragonsteel",
      image: data.image || "picture",
      class: data.class || "weapon or armor",
      active: true
    }).save().then(() => console.log("item created"));
  }

// find all weapons
var allItems = function(callback) {
  //weapon.find takes 200 years
  //database is releated to async, across network async
  item.find(function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);

    }
  }).limit(20)
};


var deleteItem = function(data,callback){
  item.remove({name: data.name}).then(() =>
  console.log(data.type+ ' has been deleted database'))
}

//search for item by type
var findItem = function(data,callback){

item.findOne({'name':data.name}).exec(callback);

}



module.exports.deleteItem = deleteItem;
module.exports.allItems = allItems;
module.exports.createItem = createItem;
module.exports.findItem = findItem;