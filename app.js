var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
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

// Routes
var contact = require('./routes/contact.js');
app.use('/contact', contact);




/* PATHS - Where to put you?
$(document).ready(function () {
    console.log('Document Ready!');
    // PATHS
    function renderHTML(path, res){
        fs.readFile(path, null, function(error, data){
            if (error){
                res.writheHead(404);
                res.write("File not found!");
            } else {
                res.write(data);
            }
            res.end();
        });
    }

    module.exports = {
        handleRequest: function(req, res){
            res.writeHead(200, {'Content-Type': 'text/html'});

            var path = url.parse(req.url).pathname;
            switch (path) {
                case '/':
                    renderHTML('./index.html', res);
                    break;
                case '/login':
                    renderHTML('./login.html', res);
                    break;
                case '/contact':
                    renderHTML('./contact/index.html', res);
                    break;
                default:
                    res.writeHead(404);
                    res.write('Route not found!');
                    res.end();
            }
        }
    };
});
*/

