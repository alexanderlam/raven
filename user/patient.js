var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI + '/doctors';

//insert doctor
var insertDoctor = function(doctor){
    var operation = function(db, callback) {
        db.collection('doctors').insert(location,

            function(err, result) {
                console.log("Inserted a document into the doctors collection.\n");
                callback(result);
            }
        );
    };

    MongoClient.connect(url, function(err, db) 
        console.log("Connected correctly to server.");
        operation(db, function(){
            db.close();
        })
    });
};

var findLocations = function(cb){
    var operation = function(db, callback) {
        var cursor = db.collection('locations').find();
        var locationList = [];
        cursor.each(function(err, doc) {
            if (doc != null) {
                console.dir(doc);
                locationList.push(doc);
            } else {
                callback(locationList);
            }
        });
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        operation(db, function(locationList){
            cb(locationList);
            db.close();
        })
    });
};

var insertLocation = function(location){
    var operation = function(db, callback) {
        db.collection('locations').insert(location,

            function(err, result) {
                console.log("Inserted a document into the restaurants collection.\n");
                callback(result);
            }
        );
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        operation(db, function(){
            db.close();
        })
    });
};

var upvoteLocation = function(lookup, cb){
    var operation = function(db, foundItem, callback) {
        db.collection('locations').updateOne(
            { "name" : lookup },
            {
                $set: { "upvote": foundItem.upvote + 1 },
                $currentDate: { "lastModified": true }
            }, function(err, results) {
                callback();
            });
    };

    var find = function(db, callback) {
        var foundItem = null;
        var cursor = db.collection('locations').find( { "name": lookup } );
        cursor.each(function(err, doc) {
            if (doc != null) {
                foundItem = doc;
            } else {
                callback(foundItem);
            }
        });
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        find(db, function(foundItem){
            operation(db, foundItem, function(){
                cb(foundItem);
                db.close();
            })
        });
    });
};

var downvoteLocation = function(lookup, cb){
    var operation = function(db, foundItem, callback) {
        db.collection('locations').updateOne(
            { "name" : lookup },
            {
                $set: { "downvote": foundItem.downvote + 1 },
                $currentDate: { "lastModified": true }
            }, function(err, results) {
                callback();
            });
    };

    var find = function(db, callback) {
        var foundItem = null;
        var cursor = db.collection('locations').find( { "name": lookup } );
        cursor.each(function(err, doc) {
            if (doc != null) {
                foundItem = doc;
            } else {
                callback(foundItem);
            }
        });
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        find(db, function(foundItem){
            operation(db, foundItem, function(){
                cb(foundItem);
                db.close();
            })
        });
    });
};

//find within 10miles
var find10 = function(latitude, longitude, cb){
    var operation = function(db, callback){
        var cursor = db.collection('locations').find({
            loc: {
                $geoWithin: {
                    $centerSphere:[
                        [ parseFloat(latitude), parseFloat(longitude) ],
                        10 / 3963.2
                    ]
                }
            }
        });
        var locationList = [];
        cursor.each(function(err, doc) {
            if (doc != null) {
                locationList.push(doc);
            } else {
                callback(locationList);
            }
        });
    }

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        operation(db, function(results){
            cb(results);
            db.close();
        })
    });
}

var find1 = function(lookup, cb){
    var operation = function(db, callback) {
        var foundItem = null;
        var cursor = db.collection('locations').find( { "name": lookup } );
        cursor.each(function(err, doc) {
            if (doc != null) {
                foundItem = doc;
            } else {
                callback(foundItem);
            }
        });
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        operation(db, function(results){
            cb(results);
            db.close();
        })
    });
};

module.exports = {
    find: findLocations,
    insert: insertLocation,
    upvote: upvoteLocation,
    downvote: downvoteLocation,
    find10: find10,
    find1: find1
};