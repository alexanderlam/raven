var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI + '/doctors';
var ObjectID = require('mongodb').ObjectID;

//insert doctor
var insert = function(doctor, cb){
    var operation = function(db, callback) {
        db.collection('doctors').insert(doctor,

            function(err, result) {
                console.log("Inserted a document into the doctors collection.\n");
                callback(err,result);
            }
        );
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        operation(db, function(err,result){
            cb(err,result);
            db.close();
        })
    });
};

var update = function(info, cb){
    var operation = function(db, callback) {
        db.collection('doctors').updateOne(
            { "userId": info.userId },
            {
                $set:{ 
                    "institution": info.institution,
                    "degree": info.degree,
                    "year": info.year,
                    "state": info.state
                }
            }, function(err, results) {
                callback(err, results);
            });
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        operation(db, function(foundItem){
            cb(null, foundItem);
            db.close();
        });
    });
};

var find = function(userId, cb){
    var operation = function(db, callback) {
        var foundItem = null;
        var cursor = db.collection('doctors').find( { "userId": userId } );
        cursor.each(function(err, doc) {
            if (doc != null) {
                foundItem = doc;
            } else {
                callback(err, foundItem);
            }
        });
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        operation(db, function(err, foundItem){
            cb(err, foundItem);
            db.close();
        })
    });
};

module.exports = {
    insert: insert,
    update: update,
    find: find
};