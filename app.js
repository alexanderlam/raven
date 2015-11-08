var express = require("express");
var app = express();
var graph = require('fbgraph');
var doctor = require('./user/doctor');
var patient = require('./user/patient');
var posts = require('./utils/posts');

var bodyParser = require('body-parser')
app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get("port"), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

// Configuration

// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

graph.setVersion("2.3");

// Routes

app.get('/graph/posts/tags', function(req, res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    var userId = req.query.userId;
    var token = req.query.token; 
    graph.setAccessToken(token);
    graph.get("/" + userId + "/feed", function(err, feed) {
        posts.textTags(feed.data, function(data){
            res.status(200).send(data);
        });
    });
});

app.get('/graph/posts/sentiment', function(req, res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    var userId = req.query.userId;
    var token = req.query.token; 
    graph.setAccessToken(token);
    graph.get("/" + userId + "/feed", function(err, feed) {
        posts.sentiment(feed.data, function(data){
            res.status(200).send(data);
        });
    });
});

app.get('/graph/inbox', function(req, res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    var userId = req.query.userId;
    var token = req.query.token; 
    graph.setAccessToken(token);
    graph.get("/" + userId + "/inbox", function(err, response) {
        res.status(200).send(response);
    });
});

app.post('/doctor/register', function(req, res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    var userId = req.body.userId;
    var token = req.body.token; 
    graph.setAccessToken(token);
    graph.get("/" + userId + "?fields=email,name,picture", function(err, info) {
        doctor.insert({
            "email":info.email,
            "name":info.name,
            "picture":info.picture.data.url,
            "token":token
        }, function(err, result){
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(result.ops[0]);
            }
        });
    });
});

app.post('/doctor/update', function(req, res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    doctor.update({
        "id":req.body.id,
        "institution":req.body.institution,
        "degree":req.body.degree,
        "year":req.body.year,
        "state":req.body.state
    }, function(err, result){
        console.log(result);
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).send(result);
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