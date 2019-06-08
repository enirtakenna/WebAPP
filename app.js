var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var io = require('socket.io');
//var router = express.Router();

const app = express();
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));

// ERROR HANDLER

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });

});

// SERVER

let server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

require('./sockets.js').initialize(server);


/*
// ROUTES

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.

});

router.get('/dashboard',function(req,res){
    res.sendFile(path.join(__dirname+'/dashboard.html'));
});

router.get('/events',function(req,res){
    res.sendFile(path.join(__dirname+'/events.html'));
    res.write('This is events');
});

// ADD ROUTER
app.use('/', router);

*/

