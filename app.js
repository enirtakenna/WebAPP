var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var path = require('path');

var routes = require('../api/routes/index');
//var users = require('.routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname + '.../views')));
app.use(express.json());
app.use('/', routes);
//app.use('/users', users);

module.exports = app;


const port=process.env.PORT || 3000;

// SERVER
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('./views/index.html', null, function(error, data){
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
