
//mongod --dbpath=/data --port 27017

// 10, 5, 20, 30, 50, 20, 40, 20, 350, 400, 300, 100


var productList = {
    'Box1' : {
		'name' : 'Box1',
		'price' : 10,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/Box1.png'
    },
    'Box2' : {
		'name' : 'Box2',
		'price' : 5,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/Box2.png'
    },
    'Clothes1' : {
		'name' : "Clothes1",
		'price' : 20,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/Clothes1.png'
    },
    'Clothes2' : {
		'name' : "Clothes2",
		'price' : 30,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/Clothes2.png'
    },
    'Jeans' : {
		'name' : "Jeans",
		'price' : 50,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/Jeans.png'
    },
	'Keyboard' : {
		'name' : "Keyboard",
		'price' : 20,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/Keyboard.png'
    },
	'KeyboardCombo' : {
		'name' : "KeyboardCombo",
		'price' : 40,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/KeyboardCombo.png'
    },
    'Mice' : {
		'name' : "Mice",
		'price' : 20,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/Mice.png'
    },
    'PC1' : {
		'name' : "PC1",
		'price' : 350,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/PC1.png'
    },
    'PC2' : {
		'name' : "PC2",
		'price' : 400,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/PC2.png'
    },
    'PC3' : {
		'name' : "PC3",
		'price' : 300,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/PC3.png'
    },
    'Tent' : {
		'name' : "Tent",
		'price' : 100,
		'quantity' : 5,
		'url' : 'https://cpen400a.herokuapp.com/images/Tent.png'
    } 
};


var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/Server';
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function queryDB() {
	MongoClient.connect(url, function(err, db) {
		if(!err) {
			//console.log("Retrieving Data From DB...");
			var cursor = db.collection('shop').find({"products.name" : "Box1"});
			
			cursor.each(function(err, doc) {
				if (doc != null) {
					var i = 0;
					console.log("Status From DB:");
					for(var item in productList){
						productList[item].name = doc.products[i].name;
						productList[item].quantity = doc.products[i].quantity;
						productList[item].price = doc.products[i].price;		
						console.log("- " + doc.products[i].name + ": " + doc.products[i].quantity);
						i++;
					}
				}
			});			
		}
	});
}


var updateProductDB = function(cart){
	var prev = 0;

	for(var elem in productList){
		console.log(productList[elem].name + " " + productList[elem].quantity + " " + cart[elem]);
		prev = productList[elem].quantity;
		productList[elem].quantity =  prev - cart[elem];
		
	}
	
	for(var item in productList){
		updateDB(productList[item].name, productList[item].quantity);
	}
}


var insertion = function(){
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected to MongoDB Server!");
		insertDoc(db, function(){
			db.close();
			"Documents Uploaded"
			retrieval();
		})
	});
}


var retrieval = function() {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Retrieving Data From Database...");

		getFromDB(db, function(){
			db.close();
			//destroy();
			
		})
  
	});
}



var destroy = function() {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.dropDatabase();
		db.close();
		console.log("Database Destroyed");
	});
}


var getFromDB = function(db, callback){
	
	var names = db.collection('shop').find({"products.name" : "Box1"});
	names.each(function(err, doc){
		assert.equal(err, null);
		if (doc != null) {
			var i = 0;
			console.log("Current DB Status:");
			for(var item in productList){
				console.log("- " + doc.products[i].name + ": " + doc.products[i].quantity);
				i++;
			}
			
		}else{
			callback();
		}
	});
}


var updateDB = function(pname, pquantity){
	console.log("Updating " + pname + "'s Quantity...");
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		loadDB(db, pname, pquantity, function(){
			db.close();
			retrieval();
		});

	});
}


var loadDB = function(db, pname, pquantity, callback){
	db.collection('shop').update(
		{"products.name" : pname},
		{
			$set: { "products.$.quantity" : pquantity}
		},
		function(err, results) {
			callback();
		});
 
}



app.get('/products', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  queryDB();
  //insertion();
  //destroy();
  //retrieval();
  response.send(productList);
});

app.post('/checkout', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// Currently, the post message cannot receive the request.body as an array of objects
	console.log("in here");
	//var cart = JSON.parse(request.body);
	cart = request.body;
	console.log("hey" + cart);
	for(var item in cart){
		console.log("hey" + cart[item]);
	}
	
	//updateProductDB(cart);
	
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// Insertion into Mongodb
var insertDoc = function(db, callback) {
	console.log("Initializing Database...");	
	
   db.collection('shop').insertMany( [
	{
	   products : [
		{
			"name" : "Box1",
			"price" : 5,
			"quantity": 10,
			"image" : "https://cpen400a.herokuapp.com/images/Box1.png"
		},
		{
			"name" : "Box2",
			"price" : 10,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/Box2.png"
		},
		{
			"name" : "Clothes1",
			"price" : 20,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/Clothes1.png"
		},
		{
			"name" : "Clothes2",
			"price" : 30,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/Clothes2.png"
		},
		{
			"name" : "Jeans",
			"price" : 50,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/Jeans.png"
		},
		{
			"name" : "Keyboard",
			"price" : 20,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/Keyboard.png"
		},
		{
			"name" : "KeyboardCombo",
			"price" : 40,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/KeyboardCombo.png"
		},
		{
			"name" : "Mice",
			"price" : 20,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/Mice.png"
		},
		{
			"name" : "PC1",
			"price" : 350,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/PC1.png"
		},
		{
			"name" : "PC2",
			"price" : 400,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/PC2.png"
		},
		{
			"name" : "PC3",
			"price" : 300,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/PC3.png"
		},
		{
			"name" : "Tent",
			"price" : 100,
			"quantity" : 10,
			"image" : "https://cpen400a.herokuapp.com/images/Tent.png"
		}
	   ]
	},
	
	{
		orders : {
			"cart" : 0,
			"total" : 0
		}
	}

	], function(err, result) {
		assert.equal(err, null);
		console.log("Uploaded Shop Collection!");
		callback(result);
	});
	
	
};


