var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI + '/patients';

//insert patient
var insertPatient = function(patient, cb){
    var operation = function(db, callback) {
        db.collection('patients').insert(patient,

            function(err, result) {
                console.log("Inserted a document into the patients collection.\n");
                callback(err);
            }
        );
    };

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server.");
        operation(db, function(err){
            cb(err);
            db.close();
        })
    });
};

module.exports = {
    insert: insertPatient
};