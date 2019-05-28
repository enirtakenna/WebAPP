var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var router = express.Router();

var app = express();

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
const port=process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    fs.readFile('public/index.html', null, function(error, data){ // callback function
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }
        else {res.write(data);}
        res.end();
    });
    fs.readFile('public/main.js', null, function(error, data){ // callback function
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }
        else {res.write(data);}
        res.end();
    });

});

server.listen(port,() => {
    console.log('Server running at port '+port);

});


// ROUTES
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.

    res.readFile('sockets.js', null, function(error, data){ // callback function
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }
        else {
            res.write(data);
            res.send('sockets.js read');
        }
    });
    res.end();
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




