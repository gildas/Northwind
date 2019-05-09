var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server(process.env.MONGODB || 'localhost', 27017, {auto_reconnect: true});
db = new Db('Northwind', server);

db.open(function(err, db){
	if(!err){
		console.log('Connected to Northwind database');
		db.collection('customers', {strict: true}, function(err, collection){
			if(err){
				console.log('The customer collection does not exist');
			}
		});
  } else {
    console.warn("Failed to connecto to database: ", err)
  }
});

exports.findById = function(req, res){
	var id = req.params.id;
	console.log("Retrieving customer: " + id);
	db.collection('customers', function(err, collection){
		collection.findOne({'CustomerID':id}, function(err, item){
			res.send(item);
		});
	});
};

exports.findAll = function(req, res) {
	console.log("Retrieving customers");
	db.collection('customers', function(err, collection) {
    if (err) {
      console.warn("Failed to retrieve collection customers: ", err);
      res.send(404);
      return
    }
    console.log("Found collection customers");
		collection.find().toArray(function(err, items) {
      if (err) {
        console.warn("Failed to retrieve customers: ", err);
        res.send(404);
        return
      }
      console.log("Found customers");
			res.send(items);
		});
	});
};

exports.add = function(req, res) {
	var customer = req.body;
	console.log('Adding customer: ' + JSON.stringify(customer));
	db.collection('customers', function(err, collection) {
		collection.insert(customer, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}
 
exports.update = function(req, res) {
	var id = req.params.id;
	var customer = req.body;
	console.log('Updating Customer: ' + id);
	console.log(JSON.stringify(customer));
	db.collection('customers', function(err, collection) {
		collection.update({'_id':id}, customer, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating customer: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(wine);
			}
		});
	});
}
 
exports.delete = function(req, res) {
	var id = req.params.id;
	console.log('Deleting customer: ' + id);
	db.collection('customers', function(err, collection) {
		collection.remove({'_id':id}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
}
