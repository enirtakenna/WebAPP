var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var path = require('path');
var router = express.Router();
var app = express();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

const port=process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('./views/index.html', null, function(error, data){ //callback function
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }
        else {
            res.write(data);
        }
        res.end();
    });

});

server.listen(port,() => {
    console.log('Server running at port '+port);
});

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/dashboard',function(req,res){
    res.sendFile(path.join(__dirname+'/dashboard.html'));
});

router.get('/goals',function(req,res){
    res.sendFile(path.join(__dirname+'/goals.html'));
});

//add the router
app.use(express.static(__dirname + '/View'));
app.use('/', router);

require('./sockets.js').initialize(server); //sockets for showing "active" users real-time

module.exports = app;


