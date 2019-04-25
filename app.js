var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var router = express.Router();

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
// app.use('public', express.static(path.join(__dirname, 'users_feature')));
// app.use('public', express.static(path.join(__dirname, 'todolist_feature')));
// app.use('public', express.static(path.join(__dirname, 'contact_feature')));

// ERROR HANDLERS
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

const port=process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    fs.readFile('public/index.html', null, function(error, data){ // callback function
        if (error){
            res.writeHead(404);
            res.write('File not found!'); // ANDREA
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


// ROUTES - doesn't work yet
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/users.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/dashboard',function(req,res){
    res.sendFile(path.join(__dirname+'/dashboard.html'));
});

router.get('/goals',function(req,res){
    res.sendFile(path.join(__dirname+'/goals.html'));
});
// ADD ROUTER
app.use('/', router);


// SOCKETS
require('./sockets.js').initialize(server); //sockets for showing "active" users real-time

// EXPORT app.js
module.exports = app;


