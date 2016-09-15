


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/myproject';


// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server");
  
	insertDocument(db, function(){
		updateRestaurants(db, function() {
			findRestaurants(db, function() {
				removeRestaurants(db, function() {
					dropRestaurants(db, function() {
						db.close();
					});
				});
			});
		});
	});
});



// Insertion
var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted a document into the restaurants collection.");
		callback(result);
	});
};



// Find
var findRestaurants = function(db, callback) {
   // query by top level
   var cursor1 = db.collection('restaurants').find({"borough": "Manhattan"});
   
   // query by field in an embedded document
   var cursor2 = db.collection('restaurants').find({"address.zipcode": "10075"});
   
   // query by field in an array
   var cursor3 = db.collection('restaurants').find({"grades.grade": "B"});
   
   cursor1.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
		 console.log("found top level field " + doc.borough);
      }
   });
   
   cursor2.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
		 console.log("found embedded document field " + doc.address.zipcode);
      }
	  
   });
   
   cursor3.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
		 console.log("found field in array " + doc.grades[0].grade);
      } else {
         callback();
      }
   });
};


// Update
var updateRestaurants = function(db, callback) {
   // Updating top level field
   db.collection('restaurants').updateOne(
      { "name" : "Juni" },
      {
        $set: { "cuisine": "American (New)" },
        $currentDate: { "lastModified": true }
      }, function(err, results) {
	  console.log("updated top level field");
   });
   
   // Updating an embedded field
   db.collection('restaurants').updateOne(
      { "restaurant_id" : "41156888" },
      { $set: { "address.street": "East 31st Street" } },
      function(err, results) {
        //console.log(results);
		console.log("updated embedded field");
   });
   
   // Updating Many Fields
    db.collection('restaurants').updateMany(
    { "address.zipcode": "10016", cuisine: "Other" },
      {
        $set: { cuisine: "Category To Be Determined" },
        $currentDate: { "lastModified": true }
      }
      ,
      function(err, results) {
        //console.log(results);
        console.log("updated many fields");
		callback();
   });
   
   
};


// Delete 

var removeRestaurants = function(db, callback) {
   
   // removes all docs that match a condition
   db.collection('restaurants').deleteMany(
      { "borough": "Manhattan" },
      function(err, results) {
         console.log("removed multiple docs wrt condition");
      }
   );
   
   // removes one doc that matches the condition
   db.collection('restaurants').deleteOne(
      { "borough": "Queens" },
      function(err, results) {
         console.log("remvoed one doc");
      }
   );
   
   // removes all docs in the specified collection
   db.collection('restaurants').deleteMany( {}, function(err, results) {
      console.log("removed multiple docs in a collection");
      callback();
   });
};

// drops the specified collection 
// true if successful drop, false otherwise
var dropRestaurants = function(db, callback) {
   db.collection('restaurants').drop( function(err, response) {
      console.log("removed entire collection");
      callback();
   });
};

