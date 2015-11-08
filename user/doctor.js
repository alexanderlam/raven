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
    var operation = function(db, foundItem, callback) {
        db.collection('doctors').updateOne(
            { 
                "institution": info.institution,
                "degree": info.degree,
                "year": info.year,
                "state": info.state
            },
            {
                $currentDate: { "lastModified": true }
            }, function(err, results) {
                console.log(results);
                callback(err, results);
            });
    };

    var find = function(db, callback) {
        var foundItem = null;
        var cursor = db.collection('doctors').find( { "_id": ObjectID(info.id) } );
        cursor.each(function(err, doc) {
            if (doc != null) {
                foundItem = doc;
            } else {
                callback(foundItem);
            }
        });
    };

    var modify = function(db, callback){
        var value = db.collection('doctors').findAndModify({
            query: { "_id": ObjectID(info.id) },
            update: { 
                "institution": info.institution,
                "degree": info.degree,
                "year": info.year,
                "state": info.state
            },
            new:true 
        }, function(err, val){
            callback(val);
        });

        
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        modify(db, function(foundItem){
            cb(null, foundItem);
            db.close();
        });
    });
};

module.exports = {
    insert: insert,
    update: update
};