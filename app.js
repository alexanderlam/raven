var express = require("express");
var app = express();
var graph = require('fbgraph');
var doctor = require('./user/doctor');
var patient = require('./user/patient');

var bodyParser = require('body-parser')
app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get("port"), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

// this should really be in a config file!
var conf = {
    client_id:      '1037035339669877'
  , client_secret:  '2ccfaf30e7e6d727b2741b015b972d7d'
  , scope:          'email, user_about_me, user_birthday, user_location, publish_stream'
  , redirect_uri:   'http://localhost:3000/auth/facebook'
};

// Configuration

// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


// Routes

app.get('/', function(req, res){
  res.render("index", { title: "click link to connect" });
});

app.get('/graph', function(req, res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    console.log(req.params);
    console.log(req.query);

    var userId = req.query.userId;
    var token = req.query.token;
    graph.setAccessToken(token);
    graph.get("/" + userId + "/feed", function(err, response) {
        res.status(200).send(response);
    });
});

app.post('/doctor', function(req, res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    doctor.insert({
        "name":req.body.name,
        "token":req.body.token
    }, function(err){
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).send('ok');
        }
    });
});

app.post('/patient', function(req, res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    patient.insert({
        "name":req.body.name,
        "token":req.body.token
    }, function(err){
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).send('ok');
        }
    });
});